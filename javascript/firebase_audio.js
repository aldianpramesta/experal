import { storage } from './firebase.js'; // Mengambil modul storage dari Firebase
    import { ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

    async function loadAudio() {
      try {
        // Membuat referensi ke file audio di Firebase Storage
        const audioRef1 = ref(storage, 'audio_modul_a_part1.opus');
        const audioRef2 = ref(storage, 'audio/a/part2.mp3');

        // Mengambil URL download untuk masing-masing file
        const url1 = await getDownloadURL(audioRef1);
        const url2 = await getDownloadURL(audioRef2);

        // Men-set src dari elemen <audio> supaya bisa diputar
        document.getElementById('audioAPart1').src = url1;
        document.getElementById('audioAPart2').src = url2;
        
      } catch (error) {
        console.error('Gagal memuat audio:', error);
      }
    }

    loadAudio(); // Memanggil fungsi untuk load audio saat halaman dibuka
