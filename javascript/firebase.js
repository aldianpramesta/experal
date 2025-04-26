// loginModul connected to html

// Inisialisasi Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Konfigurasi proyek Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBUmWClLRONCLocqLMfbhjVNZAG0srp1sQ",
  authDomain: "aldian-pramesta-temter.firebaseapp.com",
  projectId: "aldian-pramesta-temter",
  storageBucket: "aldian-pramesta-temter.firebasestorage.app",
  messagingSenderId: "467001407990",
  appId: "1:467001407990:web:706a8a91e27e971b562fd7",
  measurementId: "G-RD75GDJX53"
};

const app = initializeApp(firebaseConfig); // Menginisialisasi Firebase App
const auth = getAuth(app); // Menginisialisasi modul autentikasi
const db = getFirestore(app); // Menginisialisasi modul database Firestore
const provider = new GoogleAuthProvider(); // Menyiapkan metode login dengan Google

provider.setCustomParameters({
  prompt: 'select_account' // Memaksa pengguna memilih akun setiap login
});

// Fungsi global untuk login ke modul tertentu berdasarkan nama
window.loginModul = async function(namaModul) {
  try {
    const result = await signInWithPopup(auth, provider); // Menampilkan popup login Google
    const email = result.user.email; // Mengambil email pengguna dari hasil login
    const userRef = doc(db, "users", email); // Referensi ke dokumen user di Firestore
    const userSnap = await getDoc(userRef); // Mengambil data user dari Firestore

    // Jika data pengguna tidak ditemukan di database
    if (!userSnap.exists()) {
      alert("Email Anda belum terdaftar.");
      await signOut(auth); // Logout dari Firebase Auth
      return;
    }

    const userData = userSnap.data(); // Mengambil semua data user
    const modulData = userData[namaModul]; // Mengambil data khusus untuk modul yang diminta

    // Jika data modul tidak tersedia atau akses belum aktif
    if (!modulData || !modulData.active) {
      alert(`Anda tidak memiliki akses ke ${namaModul}.`);
      await signOut(auth);
      return;
    }

    const now = new Date(); // Waktu saat ini
    const expiredDate = modulData.expired.toDate(); // Tanggal kedaluwarsa dari data Firestore

    // Jika modul sudah kedaluwarsa
    if (now > expiredDate) {
      alert(`Langganan Anda untuk ${namaModul} telah habis.`);
      await signOut(auth);
      return;
    }

    // Jika semua pengecekan lolos, arahkan ke halaman modul
    const halamanTujuan = `${namaModul}.html`; // Tentukan halaman tujuan berdasarkan nama modul
    alert(`Akses diberikan! Masuk ke ${namaModul}`);
    window.location.href = halamanTujuan; // Redirect ke halaman modul

  } catch (error) {
    console.error("Login error", error); // Menangani error saat login
    alert("Terjadi kesalahan saat login.");
  }
};


// --- wajib paling bawah ---
export { auth, db };
