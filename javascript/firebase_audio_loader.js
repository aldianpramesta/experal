// Import yang dibutuhkan dari firebase.js
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js";
import { app } from './firebase.js'; // Import instance Firebase App dari firebase.js

// Inisialisasi Storage
const storage = getStorage(app); // Menghubungkan ke Storage dari project Firebase

// Fungsi untuk load audio dari Storage
async function loadAudio(filePath, audioElementId) {
  try {
    const audioRef = ref(storage, filePath); // Membuat referensi ke file audio di Storage
    const url = await getDownloadURL(audioRef); // Mengambil URL downloadnya
    const audioElement = document.getElementById(audioElementId); // Cari elemen audio berdasarkan ID

    audioElement.src = url; // Set sumber audio
  } catch (error) {
    console.error("Gagal load audio:", error);
    alert("Gagal memuat audio.");
  }
}

// Jalankan fungsi setelah halaman siap
document.addEventListener("DOMContentLoaded", () => {
  loadAudio("audio_modul_a_part1.opus", "audio-player-1"); 
});
