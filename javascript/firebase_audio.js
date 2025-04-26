import { initializeApp, auth, db, getAuth, onAuthStateChanged } from './firebase.js'; // ← sesuaikan path kalau perlu (misal "../javascript/firebase.js")
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js";

    // 3. Inisialisasi Firebase
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const auth = getAuth(app);

    // 4. Pastikan user sudah login
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // 5. Ambil URL download file audio dari Storage
        const audioRef = ref(storage, 'audio_modul_a_part1.opus'); // Ganti path sesuai lokasi file kamu

        getDownloadURL(audioRef)
          .then((url) => {
            // 6. Set URL ke elemen audio
            const audioPlayer = document.getElementById('audioPlayer');
            audioPlayer.src = url;
          })
          .catch((error) => {
            console.error('Gagal ambil audio:', error);
          });
      } else {
        // 7. Kalau belum login, bisa redirect ke login page
        window.location.href = 'login.html';
      }
    });
