document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', function(event) {
            if (!dropdownMenu.contains(event.target) && !dropdownToggle.contains(event.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
    }
});

function search() {
    const query = document.getElementById("search-bar").value;
    console.log("Mencari:", query);
    // Implementasikan logika pencarian Anda di sini
}

const firebaseConfig = {
    apiKey: "AIzaSyA-GfPSmyhcCSXQm699jcMVhHYZzOF6lvk",
    authDomain: "aldian-pramesta-firebase.firebaseapp.com",
    projectId: "aldian-pramesta-firebase",
    storageBucket: "aldian-pramesta-firebase.appspot.com",
    messagingSenderId: "19545798570",
    appId: "1:19545798570:web:ca622f81fc2c5527981dd3"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "index.html";
    }
});

function logout() {
    firebase.auth().signOut().then(() => {
        alert("Anda telah keluar.");
        window.location.href = "index.html";
    });
}
document.addEventListener('DOMContentLoaded', function() {
    // ... JavaScript sebelumnya ...

    // Tampilkan notifikasi
    displayNotifications([
        { message: "Video premium baru telah diunggah!", time: "2 jam lalu" },
        { message: "Pengumuman penting terkait akun Anda.", time: "Kemarin" }
    ]);

    // Tampilkan video terbaru
    displayLatestVideos([
        { title: "Video Premium #3", thumbnailUrl: "https://via.placeholder.com/300/007bff/FFFFFF?Text=Video+3", uploadDate: "2025-04-17", videoUrl: "#" },
        { title: "Video Premium #2", thumbnailUrl: "https://via.placeholder.com/300/6c757d/FFFFFF?Text=Video+2", uploadDate: "2025-04-15", videoUrl: "#" },
        { title: "Video Premium #1", thumbnailUrl: "https://via.placeholder.com/300/28a745/FFFFFF?Text=Video+1", uploadDate: "2025-04-10", videoUrl: "#" }
    ]);
});

function displayNotifications(notifications) {
    const notificationsList = document.getElementById('notifications-list');
    notificationsList.innerHTML = ''; // Bersihkan daftar sebelumnya

    notifications.forEach(notification => {
        const listItem = document.createElement('li');
        listItem.classList.add('notification-item');
        listItem.innerHTML = `
            <span class="notification-icon"><i class="fas fa-bell"></i></span>
            <div class="notification-message">${notification.message}</div>
            <span class="notification-time">${notification.time}</span>
        `;
        notificationsList.appendChild(listItem);
    });
}

function displayLatestVideos(videos) {
    const latestVideosGrid = document.querySelector('.latest-videos-grid');
    latestVideosGrid.innerHTML = ''; // Bersihkan grid sebelumnya

    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.classList.add('video-card');
        videoCard.innerHTML = `
            <img src="${video.thumbnailUrl}" alt="${video.title}">
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <p class="video-date">${video.uploadDate}</p>
                <a href="${video.videoUrl}" class="button">Tonton Sekarang</a>
            </div>
        `;
        latestVideosGrid.appendChild(videoCard);
    });
}

// ... Fungsi search() dan logout() sebelumnya ...
