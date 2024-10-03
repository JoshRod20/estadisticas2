import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtK3EdAOPmBrZEJkC8dc_A2ggZXCXRdrw",
  authDomain: "estadisticas2-fb949.firebaseapp.com",
  projectId: "estadisticas2-fb949",
  storageBucket: "estadisticas2-fb949.appspot.com",
  messagingSenderId: "746037129368",
  appId: "1:746037129368:web:ed29f18dd4c6f99b78a0ed",
  measurementId: "G-VFFXXZTCBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
