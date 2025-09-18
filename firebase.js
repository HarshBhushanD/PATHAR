// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDLFO-hxE7wNzSKAeEfUIp5Pyrw3gChcIQ",
//   authDomain: "pathar-d68ca.firebaseapp.com",
//   projectId: "pathar-d68ca",
//   storageBucket: "pathar-d68ca.firebasestorage.app",
//   messagingSenderId: "534190904787",
//   appId: "1:534190904787:web:6219b44edbc48d15730b26"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);

// // Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);

// export { auth, db };
// export default app; 



import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//  Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDLFO-hxE7wNzSKAeEfUIp5Pyrw3gChcIQ",
//   authDomain: "pathar-d68ca.firebaseapp.com",
//   projectId: "pathar-d68ca",
//   storageBucket: "pathar-d68ca.appspot.com", 
//   messagingSenderId: "534190904787",
//   appId: "1:534190904787:web:6219b44edbc48d15730b26"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDq0W1cUcgXppi0n-djWf5GtAhpXyz66eg",
  authDomain: "pathar-c2e42.firebaseapp.com",
  projectId: "pathar-c2e42",
  storageBucket: "pathar-c2e42.firebasestorage.app",
  messagingSenderId: "257970921464",
  appId: "1:257970921464:web:d9333a09149191e106c00d",
  measurementId: "G-ZFREPCCKCP"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;
