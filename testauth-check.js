const firebaseConfig = {
  apiKey: "AIzaSyDAjJ-_jTNh7HucY66o1A6PZh-ohrpETVY",
  authDomain: "temter-df972.firebaseapp.com",
  projectId: "temter-df972",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

const akses = {
  "aldianpramesta@gmail.com": {
    produk: ["produkA"],
    expiredAt: "2025-05-10"
  }
};

function isStillActive(expiredAt) {
  const today = new Date().toISOString().split("T")[0];
  return expiredAt >= today;
}

function checkAccess(produkYangDiminta) {
  console.log("⏳ Menunggu status login...");
  const unsubscribe = auth.onAuthStateChanged((user) => {
    console.log("✅ Firebase auth state berubah");

    if (!user) {
      console.log("❌ Belum login, redirect ke index.html");
      alert("Silakan login terlebih dahulu.");
      window.location.href = "index.html";
      return;
    }

    const email = user.email;
    console.log("🔐 Login sebagai:", email);

    const userData = akses[email];
    if (
      userData &&
      userData.produk.includes(produkYangDiminta) &&
      isStillActive(userData.expiredAt)
    ) {
      console.log("✅ Akses valid untuk", produkYangDiminta);
    } else {
      console.log("❌ Tidak punya akses atau expired");
      alert("Akses kamu tidak valid untuk produk ini.");
      window.location.href = "no-access.html";
    }

    unsubscribe();
  });
}
