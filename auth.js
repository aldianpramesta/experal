import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

signInWithPopup(auth, provider)
  .then((result) => {
    const email = result.user.email;
    const allowedEmails = ["aldianpramesta@gmail.com", "pembeli2@gmail.com"];
    if (allowedEmails.includes(email)) {
      window.location.href = "experal1.html";
    } else {
      alert("Akun ini belum terdaftar sebagai pembeli.");
      auth.signOut();
    }
  })
  .catch((error) => {
    console.error(error);
  });
