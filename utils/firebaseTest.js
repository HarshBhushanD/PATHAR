import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Test Firebase connection and permissions
export const testFirebaseConnection = async () => {
  console.log('🔍 Testing Firebase connection...');
  
  try {
    // Test 1: Check if db is initialized
    if (!db) {
      throw new Error('Firebase database not initialized');
    }
    console.log('✅ Firebase database initialized');

    // Test 2: Try to read from a collection
    const testCollection = collection(db, 'test');
    const snapshot = await getDocs(testCollection);
    console.log('✅ Successfully read from Firestore');

    // Test 3: Try to write a test document
    const testDoc = await addDoc(testCollection, {
      test: true,
      timestamp: serverTimestamp(),
      message: 'Firebase connection test'
    });
    console.log('✅ Successfully wrote to Firestore with ID:', testDoc.id);

    return {
      success: true,
      message: 'Firebase connection working properly',
      testDocId: testDoc.id
    };

  } catch (error) {
    console.error('❌ Firebase connection test failed:', error);
    
    let errorMessage = 'Firebase connection failed: ';
    if (error.code === 'permission-denied') {
      errorMessage += 'Permission denied. Check Firestore security rules.';
    } else if (error.code === 'unavailable') {
      errorMessage += 'Service unavailable. Check internet connection.';
    } else if (error.code === 'unauthenticated') {
      errorMessage += 'User not authenticated.';
    } else {
      errorMessage += error.message;
    }

    return {
      success: false,
      message: errorMessage,
      error: error
    };
  }
};

// Test user authentication status
export const testUserAuth = (user) => {
  console.log('🔍 Testing user authentication...');
  
  if (!user) {
    console.log('❌ No user logged in');
    return {
      success: false,
      message: 'No user logged in'
    };
  }

  if (!user.uid) {
    console.log('❌ User has no UID');
    return {
      success: false,
      message: 'User has no UID'
    };
  }

  console.log('✅ User authenticated:', user.uid);
  return {
    success: true,
    message: 'User properly authenticated',
    uid: user.uid
  };
};

// Test saving aptitude results specifically
export const testAptitudeSave = async (userId) => {
  console.log('🔍 Testing aptitude results save...');
  
  try {
    const testResults = {
      topCategory: 'Test',
      scores: { Test: 1 },
      totalQuestions: 1,
      completedAt: new Date().toISOString(),
      studentType: 'test',
      answers: { 0: { category: 'Test' } }
    };

    const resultsRef = collection(db, 'aptitudeResults');
    const docRef = await addDoc(resultsRef, {
      userId,
      ...testResults,
      createdAt: serverTimestamp()
    });

    console.log('✅ Successfully saved test aptitude results with ID:', docRef.id);
    return {
      success: true,
      message: 'Aptitude results save working',
      docId: docRef.id
    };

  } catch (error) {
    console.error('❌ Aptitude results save test failed:', error);
    return {
      success: false,
      message: 'Aptitude results save failed: ' + error.message,
      error: error
    };
  }
};

// Run all Firebase tests
export const runAllFirebaseTests = async (user) => {
  console.log('🚀 Running comprehensive Firebase tests...');
  
  const results = {
    connection: await testFirebaseConnection(),
    auth: testUserAuth(user),
    aptitudeSave: null
  };

  if (results.auth.success) {
    results.aptitudeSave = await testAptitudeSave(user.uid);
  }

  console.log('📊 Firebase test results:', results);
  return results;
};
