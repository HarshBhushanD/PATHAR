// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { 
//   onAuthStateChanged, 
//   createUserWithEmailAndPassword, 
//   signInWithEmailAndPassword, 
//   signOut,
//   updateProfile
// } from 'firebase/auth';
// import { auth } from '../firebase';
// import { createUserProfile } from '../services/firestore';

// const AuthContext = createContext({});

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const signup = async (email, password, displayName) => {
//     try {
//       const result = await createUserWithEmailAndPassword(auth, email, password);
//       await updateProfile(result.user, { displayName });
      
//       // Create user profile in Firestore
//       await createUserProfile(result.user.uid, {
//         displayName,
//         email,
//         profileComplete: false
//       });
      
//       return result;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const result = await signInWithEmailAndPassword(auth, email, password);
//       return result;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       throw error;
//     }
//   };

//   const value = {
//     user,
//     signup,
//     login,
//     logout,
//     loading
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }; 


// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { 
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   updateProfile 
// } from 'firebase/auth';
// import { doc, setDoc, getDoc } from 'firebase/firestore';
// import { auth, db } from '../firebase';
// // import { auth, db } from '../firebaseConfig';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Sign up function
//   const signup = async (email, password, userData) => {
//     try {
//       const result = await createUserWithEmailAndPassword(auth, email, password);
      
//       // Update user profile with display name
//       await updateProfile(result.user, {
//         displayName: userData.name
//       });

//       // Save additional user data to Firestore
//       await setDoc(doc(db, 'users', result.user.uid), {
//         uid: result.user.uid,
//         email: result.user.email,
//         displayName: userData.name,
//         name: userData.name,
//         dob: userData.dob,
//         studentEmail: userData.studentEmail,
//         studentPhone: userData.studentPhone,
//         parentPhone: userData.parentPhone,
//         schoolName: userData.schoolName,
//         studentType: userData.studentType,
//         createdAt: new Date().toISOString(),
//       });

//       return result.user;
//     } catch (error) {
//       throw error;
//     }
//   };

//   // Sign in function
//   const login = async (email, password) => {
//     try {
//       const result = await signInWithEmailAndPassword(auth, email, password);
      
//       // Get additional user data from Firestore
//       const userDoc = await getDoc(doc(db, 'users', result.user.uid));
//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         setUser({ ...result.user, ...userData });
//       }
      
//       return result.user;
//     } catch (error) {
//       throw error;
//     }
//   };

//   // Sign out function
//   const logout = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//     } catch (error) {
//       throw error;
//     }
//   };

//   // Listen for authentication state changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         // Get additional user data from Firestore
//         try {
//           const userDoc = await getDoc(doc(db, 'users', user.uid));
//           if (userDoc.exists()) {
//             const userData = userDoc.data();
//             setUser({ ...user, ...userData });
//           } else {
//             setUser(user);
//           }
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//           setUser(user);
//         }
//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   const value = {
//     user,
//     login,
//     signup,
//     logout,
//     loading
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up new user
  const signup = async (email, password, userData) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Update Firebase Auth profile
      await updateProfile(result.user, {
        displayName: userData.name,
      });

      // Save user data to Firestore
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        email: result.user.email,
        name: userData.name,
        dob: userData.dob,
        studentEmail: userData.studentEmail || "",
        studentPhone: userData.studentPhone || "",
        parentPhone: userData.parentPhone || "",
        schoolName: userData.schoolName || "",
        studentType: userData.studentType || "",
        createdAt: new Date().toISOString(),
      });



      return result.user;
    } catch (error) {
      // Re-throw the error so it can be handled by the component
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Fetch user document from Firestore
      const userDoc = await getDoc(doc(db, "users", result.user.uid));
      if (userDoc.exists()) {
        setUser({ ...result.user, ...userDoc.data() });
      } else {
        setUser(result.user);
      }

      return result.user;
    } catch (error) {
      // Re-throw the error so it can be handled by the component
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      // Re-throw the error so it can be handled by the component
      throw error;
    }
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUser({ ...currentUser, ...userDoc.data() });
          } else {
            setUser(currentUser);
          }
        } catch (error) {
          // If there's an error fetching user data, still set the basic user info
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
