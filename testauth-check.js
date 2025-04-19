// Firebase setup
const firebaseConfig = {
  apiKey: "AIzaSyDAjJ-_jTNh7HucY66o1A6PZh-ohrpETVY",
  authDomain: "temter-df972.firebaseapp.com",
  projectId: "temter-df972",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Data langganan manual
const akses = {
  "aldianpramesta@gmail.com": {
    produk: ["produkA"],
    expiredAt: "2025-05-10"
  },
  "email2@gmail.com": {
    produk: ["produkB"],
    expiredAt: "2025-06-01"
  },
  "email3@gmail.com": {
    produk: ["produkA", "produkB"],
    expiredAt: "2025-12-31"
  }
};

// Fungsi cek tanggal
function isStillActive(expiredAt) {
  const today = new Date().toISOString().split("T")[0];
  return expiredAt >= today;
}

// Fungsi utama pengecekan akses
function checkAccess(produkYangDiminta) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const email = user.email;
      const userData = akses[email];

      if (
        userData &&
        userData.produk.includes(produkYangDiminta) &&
        isStillActive(userData.expiredAt)
      ) {
        console.log("Akses diberikan untuk:", produkYangDiminta);
      } else {
        alert("Akses kamu tidak valid untuk produk ini.");
        window.location.href = "no-access.html";
      }
    } else {
      alert("Silakan login terlebih dahulu.");
      window.location.href = "index.html";
    }
  });
}
