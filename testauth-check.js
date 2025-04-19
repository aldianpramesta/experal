// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDAjJ-_jTNh7HucY66o1A6PZh-ohrpETVY",
  authDomain: "temter-df972.firebaseapp.com",
  projectId: "temter-df972",
};

// Inisialisasi Firebase sekali saja
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

// Data akses per email
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

// Fungsi cek expired
function isStillActive(expiredAt) {
  const today = new Date().toISOString().split("T")[0];
  return expiredAt >= today;
}

// Fungsi utama pengecekan akses
function checkAccess(produkYangDiminta) {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (!user) {
      alert("Silakan login terlebih dahulu.");
      window.location.href = "testfirebasegoogle.html";
      return;
    }

    const email = user.email;
    const userData = akses[email];
    console.log("Login sebagai:", email);

    if (
      userData &&
      userData.produk.includes(produkYangDiminta) &&
      isStillActive(userData.expiredAt)
    ) {
      console.log("✅ Akses diberikan.");
    } else {
      console.log("❌ Akses ditolak.");
      alert("Akses kamu tidak valid untuk produk ini.");
      window.location.href = "testno-access.html";
    }

    unsubscribe(); // Stop listener
  });
}
