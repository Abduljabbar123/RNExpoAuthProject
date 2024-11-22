import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBuAScOwqNlwwF4gmjhYAzo3_VfAjoDLms",
  authDomain: "exporn-1f540.firebaseapp.com",
  projectId: "exporn-1f540",
  storageBucket: "exporn-1f540.firebasestorage.app",
  messagingSenderId: "378318264522",
  appId: "1:378318264522:web:cb24f4344bd7a78a993c33",
  measurementId: "G-DL2M9PNTDS",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
