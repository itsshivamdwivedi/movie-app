import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { auth } from "../services/firebase"; // Ensure this path is correct for your firebase.js file
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useFirestore } from "../services/firestore"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { syncWatchlist } = useFirestore();

  // Function for logging in with Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      await syncWatchlist(result.user.uid); 
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  // Function for logging out
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
      if (currentUser) {
        await syncWatchlist(currentUser.uid); 
      }
    });

    // Clean up subscription
    return () => unsubscribe();
  }, [syncWatchlist]);

  return (
    <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
