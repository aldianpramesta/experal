// toggle pilihan part dari modul
function toggleVideo(id) {
    const videoEl = document.getElementById(id);
    videoEl.style.display = videoEl.style.display === 'block' ? 'none' : 'block';
  }

// toggle pilihan akses saat masuk
  function showOptions() {
    document.getElementById('options').style.display = 'block';
  }
