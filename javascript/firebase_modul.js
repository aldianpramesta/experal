// WAJIB PALING ATAS Import auth dan db dari firebase.js
import { auth, db, storage } from './firebase.js'; // ← Tambahkan storage
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js"; // Import ref dan getDownloadURL untuk ambil file

const namaModul = "dalam_modul_a"; // ← Tetap sesuaikan nama modul di sini

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("Anda belum login.");
    window.location.href = "index.html";
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
  const modul = userData[namaModul];

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

  // ✅ Semua valid, tampilkan konten
  document.getElementById("judul").textContent = `Modul ${namaModul.toUpperCase()}`;
  document.getElementById("konten").style.display = "block";

  // --- 🔥 Mulai Upgrade Audio ---
  try {
    // Buat referensi ke file audio di Storage (path disesuaikan ya, misal di folder "audio/nama_modul.mp3")
    const audioRef = ref(storage, `audio/${namaModul}.mp3`);
    
    // Ambil URL download untuk file audio
    const audioURL = await getDownloadURL(audioRef);
    
    // Setel URL ke elemen audio
    const audioElement = document.getElementById("audio");
    if (audioElement) {
      audioElement.src = audioURL;
      audioElement.style.display = "block"; // Tampilkan audio player
    }
  } catch (error) {
    console.error("Gagal memuat audio:", error);
    // Optional: Kasih fallback atau kasih tau user
  }
});
