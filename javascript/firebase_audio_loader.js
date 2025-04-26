import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js";
import { app } from './firebase.js'; // pastikan path ke firebase.js benar

// Inisialisasi Storage
const storage = getStorage(app);

// List audio yang mau dimuat
const audioList = [
  { filePath: "audio_modul_a_part1.opus", elementId: "audio-player-1" },
  { filePath: "audio_modul_a_part2.opus", elementId: "audio-player-2" },
  { filePath: "audio_modul_a_part3.opus", elementId: "audio-player-3" }
];

// Fungsi untuk load satu audio
async function loadAudio(filePath, elementId) {
  try {
    const audioRef = ref(storage, filePath);
    const url = await getDownloadURL(audioRef);
    const audioElement = document.getElementById(elementId);

    if (audioElement) {
      audioElement.src = url;
    }
  } catch (error) {
    console.error(`Gagal memuat ${filePath}:`, error);
  }
}

// Fungsi untuk load semua audio di list
function loadAllAudios() {
  audioList.forEach(audio => {
    loadAudio(audio.filePath, audio.elementId);
  });
}

// Jalankan saat halaman siap
document.addEventListener("DOMContentLoaded", loadAllAudios);
