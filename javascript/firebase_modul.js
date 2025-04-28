// WAJIB PALING ATAS Import auth dan db dari firebase.js
import { auth, db } from './firebase.js'; // ← sesuaikan path kalau perlu (misal "../javascript/firebase.js")
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { storage } from "./firebase.js";
import { ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js";

// ⚠️ Ganti ini sesuai field modul di Firestore, misalnya: "modula", "modulB", "modulZ"
    const namaModul = "dalam_modul_a"; // ← GANTI INI SAJA untuk menyesuaikan dengan nama field di Firestore

    // 🔐 verified firebase subscription, kick jika belum login
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        alert("Anda belum login.");
        window.location.href = "index.html"; // ⛔ kick balik ke halaman login
        return;
      }

      const email = user.email;
      const userRef = doc(db, "users", email);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        alert("Data Anda tidak ditemukan.");
        await signOut(auth);
        window.location.href = "index.html";
        return;
      }

      const userData = userSnap.data();
      const modul = userData[namaModul]; // ✅ ambil data berdasarkan nama modul yang kita tentukan

      if (!modul || !modul.active) {
        alert("Anda tidak memiliki akses ke modul ini.");
        await signOut(auth);
        window.location.href = "index.html";
        return;
      }

      const now = new Date();
      const expiredDate = modul.expired.toDate();

      if (now > expiredDate) {
        alert("Langganan Anda untuk modul ini sudah habis.");
        await signOut(auth);
        window.location.href = "index.html";
        return;
      }

      // ✅ semua valid, tampilkan konten
      document.getElementById("judul").textContent = `Modul ${namaModul.toUpperCase()}`;
      document.getElementById("konten").style.display = "block";
        // 🔥 panggil loadAllAudios() setelah lolos verifikasi
    loadAllAudios();

    });

async function loadAudio(filename, audioElementId) {
  const audioRef = ref(storage, filename); // Buat referensi ke file di storage
  const audioUrl = await getDownloadURL(audioRef); // Ambil URL download dari storage

  const audioElement = document.getElementById(audioElementId);
  audioElement.src = audioUrl; // Set sumber audio
}

// Kalau kamu mau load beberapa file audio
export function loadAllAudios() {
  loadAudio('audio_modul_a_part1.opus', 'audio_modul_a_part1');
  loadAudio('audio_modul_a_part2.opus', 'audio_modul_a_part2');
  loadAudio('audio_modul_b_part1.opus', 'audio_modul_b_part1');
  loadAudio('audio_modul_b_part2.opus', 'audio_modul_b_part2');
}
