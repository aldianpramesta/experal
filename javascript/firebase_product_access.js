   // Inisialisasi firebase
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
    import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
    import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

    // Konfigurasi firebase project kamu
    const firebaseConfig = {
      apiKey: "AIzaSyBUmWClLRONCLocqLMfbhjVNZAG0srp1sQ",
      authDomain: "aldian-pramesta-temter.firebaseapp.com",
      projectId: "aldian-pramesta-temter",
      storageBucket: "aldian-pramesta-temter.firebasestorage.app",
      messagingSenderId: "467001407990",
      appId: "1:467001407990:web:706a8a91e27e971b562fd7",
      measurementId: "G-RD75GDJX53"
    };

    const app = initializeApp(firebaseConfig); // Menyalakan firebase
    const auth = getAuth(app); // Inisialisasi auth
    const db = getFirestore(app); // Inisialisasi firestore
    const provider = new GoogleAuthProvider(); // Login Google
    provider.setCustomParameters({
      prompt: 'select_account' // ← Ini memaksa pemilihan akun setiap login
    });

    // Fungsi umum untuk login ke modul manapun
    window.loginModul = async function(namaModul) {
      try {
        const result = await signInWithPopup(auth, provider); // Popup login Google
        const email = result.user.email; // Ambil email user
        const userRef = doc(db, "users", email); // Referensi dokumen user di Firestore
        const userSnap = await getDoc(userRef); // Ambil data user dari Firestore

        // Kalau data gak ada di Firestore
        if (!userSnap.exists()) {
          alert("Email Anda belum terdaftar.");
          await signOut(auth); // Logout user
          return;
        }

        const userData = userSnap.data(); // Ambil semua data user
        const modulData = userData[namaModul]; // Ambil data field modul yang diminta (modula, modulb, dll)

        // Kalau user belum  atau belum beli modul
        if (!modulData || !modulData.active) {
          alert(`Anda tidak memiliki akses ke ${namaModul}.`);
          await signOut(auth);
          return;
        }

        const now = new Date(); // Waktu sekarang
        const expiredDate = modulData.expired.toDate(); // Waktu kedaluwarsa dari firebase

        // Kalau sudah lewat tanggal expired
        if (now > expiredDate) {
          alert(`Langganan Anda untuk ${namaModul} telah habis.`);
          await signOut(auth);
          return;
        }

        // Kalau semua aman, redirect ke halaman modul
        const halamanTujuan = `${namaModul}.html`; // Nama file yang konsisten dengan field Firestore
        alert(`Akses diberikan! Masuk ke ${namaModul}`);
        window.location.href = halamanTujuan;

      } catch (error) {
        console.error("Login error", error); // Tangkap error login
        alert("Terjadi kesalahan saat login.");
      }
    };
