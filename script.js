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
