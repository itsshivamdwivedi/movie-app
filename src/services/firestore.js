import { db } from "./firebase";
import { doc, setDoc, deleteDoc, collection, getDocs, query } from "firebase/firestore";

export const useFirestore = () => {
  const getWatchlistFromFirestore = async (userId) => {
    try {
      const q = query(collection(db, "users", userId, "watchlist"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching watchlist: ", error);
      return [];
    }
  };

  const addToWatchlist = async (userId, movieId, movieData) => {
    try {
      await setDoc(doc(db, "users", userId, "watchlist", movieId), movieData);
      console.log("Movie added to watchlist");
    } catch (error) {
      console.error("Error adding to watchlist: ", error);
    }
  };

  const checkIfInWatchlist = async (userId, movieId) => {
    const watchlist = await getWatchlistFromFirestore(userId);
    return watchlist.some((movie) => movie.id === movieId);
  };

  const removeFromWatchlist = async (userId, movieId) => {
    try {
      await deleteDoc(doc(db, "users", userId, "watchlist", movieId));
      console.log("Movie removed from watchlist");
    } catch (error) {
      console.error("Error removing from watchlist: ", error);
    }
  };

  const getWatchlist = async (userId) => {
    return await getWatchlistFromFirestore(userId);
  };

  return {
    addToWatchlist,
    checkIfInWatchlist,
    removeFromWatchlist,
    getWatchlist,
  };
};
