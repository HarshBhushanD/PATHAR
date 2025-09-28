import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  getDoc, 
  setDoc,
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

// User Profile Operations
export const createUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return userRef;
  } catch (error) {
    // If document doesn't exist, create it
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return userRef;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId, updates) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Aptitude Test Results
export const saveAptitudeResults = async (userId, testResults) => {
  try {
    console.log('Attempting to save aptitude results for user:', userId);
    console.log('Test results data:', testResults);
    
    const resultsRef = collection(db, 'aptitudeResults');
    const docRef = await addDoc(resultsRef, {
      userId,
      ...testResults,
      createdAt: serverTimestamp()
    });
    
    console.log('Successfully saved aptitude results with ID:', docRef.id);
    return docRef;
  } catch (error) {
    console.error('Detailed error saving aptitude results:', {
      error: error,
      code: error.code,
      message: error.message,
      userId: userId,
      testResults: testResults
    });
    throw error;
  }
};

export const getUserAptitudeResults = async (userId) => {
  try {
    const resultsRef = collection(db, 'aptitudeResults');
    const q = query(
      resultsRef, 
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    const results = [];
    
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    
    // Sort by createdAt in descending order (newest first)
    return results.sort((a, b) => {
      const aTime = a.createdAt?.seconds || 0;
      const bTime = b.createdAt?.seconds || 0;
      return bTime - aTime;
    });
  } catch (error) {
    console.error('Error getting aptitude results:', error);
    throw error;
  }
};

// Career Preferences
export const saveCareerPreferences = async (userId, preferences) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      careerPreferences: preferences,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error saving career preferences:', error);
    throw error;
  }
};

// College Favorites
export const addToFavorites = async (userId, collegeId, collegeData) => {
  try {
    const favoritesRef = collection(db, 'favorites');
    const docRef = await addDoc(favoritesRef, {
      userId,
      collegeId,
      collegeData,
      createdAt: serverTimestamp()
    });
    return docRef;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

export const removeFromFavorites = async (favoriteId) => {
  try {
    const favoriteRef = doc(db, 'favorites', favoriteId);
    await deleteDoc(favoriteRef);
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};

export const getUserFavorites = async (userId) => {
  try {
    const favoritesRef = collection(db, 'favorites');
    const q = query(
      favoritesRef, 
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    const favorites = [];
    
    querySnapshot.forEach((doc) => {
      favorites.push({ id: doc.id, ...doc.data() });
    });
    
    // Sort by createdAt in descending order (newest first)
    return favorites.sort((a, b) => {
      const aTime = a.createdAt?.seconds || 0;
      const bTime = b.createdAt?.seconds || 0;
      return bTime - aTime;
    });
  } catch (error) {
    console.error('Error getting user favorites:', error);
    throw error;
  }
};

// Activity Tracking
export const trackUserActivity = async (userId, activity) => {
  try {
    const activitiesRef = collection(db, 'userActivities');
    const docRef = await addDoc(activitiesRef, {
      userId,
      activity,
      timestamp: serverTimestamp()
    });
    return docRef;
  } catch (error) {
    console.error('Error tracking user activity:', error);
    throw error;
  }
};

// Search History
export const saveSearchHistory = async (userId, searchQuery, searchType) => {
  try {
    const searchRef = collection(db, 'searchHistory');
    const docRef = await addDoc(searchRef, {
      userId,
      query: searchQuery,
      type: searchType,
      timestamp: serverTimestamp()
    });
    return docRef;
  } catch (error) {
    console.error('Error saving search history:', error);
    throw error;
  }
};

export const getUserSearchHistory = async (userId, limitCount = 10) => {
  try {
    const searchRef = collection(db, 'searchHistory');
    const q = query(
      searchRef,
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    const history = [];
    
    querySnapshot.forEach((doc) => {
      history.push({ id: doc.id, ...doc.data() });
    });
    
    // Sort by timestamp in descending order (newest first) and limit results
    return history
      .sort((a, b) => {
        const aTime = a.timestamp?.seconds || 0;
        const bTime = b.timestamp?.seconds || 0;
        return bTime - aTime;
      })
      .slice(0, limitCount);
  } catch (error) {
    console.error('Error getting search history:', error);
    throw error;
  }
}; 