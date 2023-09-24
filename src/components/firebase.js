import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { getStorage } from 'firebase/storage'; // Add this import


const firebaseConfig = {
  apiKey: "AIzaSyCsJKzPaMdoWYsvgA-NvJLQ0foXMPI_se0",
  authDomain: "test-c2138.firebaseapp.com",
  projectId: "test-c2138",
  storageBucket: "test-c2138.appspot.com",
  messagingSenderId: "314489068078",
  appId: "1:314489068078:web:52f88fd72a524bbd3eddbf",
  measurementId: "G-BB2PBX4LF0"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app); // Initialize Firebase Storage


const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // You can handle redirection to /home here if the sign-in is successful.
    // For example, you can use window.location.href or your React Router.
    // Replace '/home' with your actual route.
    const userName = result.user.displayName;
    window.location.href = '/home';
  } catch (error) {
    console.error('Google Sign-In Error:', error);
  }
};

const signOut = () => {
  return firebaseSignOut(auth);
};

export { auth, storage, signInWithGoogle, signOut };
