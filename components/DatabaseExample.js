import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import {
  getUserProfile,
  updateUserProfile,
  saveAptitudeResults,
  getUserAptitudeResults,
  addToFavorites,
  getUserFavorites,
  trackUserActivity
} from '../services/firestore';

export default function DatabaseExample() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [aptitudeResults, setAptitudeResults] = useState([]);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      // Load user profile
      const profile = await getUserProfile(user.uid);
      setUserProfile(profile);

      // Load favorites
      const userFavorites = await getUserFavorites(user.uid);
      setFavorites(userFavorites);

      // Load aptitude results
      const results = await getUserAptitudeResults(user.uid);
      setAptitudeResults(results);

      // Track this activity
      await trackUserActivity(user.uid, {
        type: 'view',
        page: 'DatabaseExample',
        data: { timestamp: new Date().toISOString() }
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateUserProfile(user.uid, {
        class: '12',
        stream: 'Science',
        careerPreferences: {
          interests: ['Technology', 'Innovation'],
          subjects: ['Mathematics', 'Physics'],
          preferredLocations: ['Srinagar', 'Jammu']
        }
      });
      
      Alert.alert('Success', 'Profile updated successfully!');
      loadUserData(); // Reload data
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleSaveAptitudeTest = async () => {
    try {
      const testResults = {
        testType: 'career-interest',
        score: 85,
        results: {
          personality: 'Investigative',
          strengths: ['Analytical', 'Problem-solving', 'Research'],
          recommendations: ['Engineering', 'Computer Science', 'Research']
        }
      };

      await saveAptitudeResults(user.uid, testResults);
      Alert.alert('Success', 'Aptitude test results saved!');
      loadUserData(); // Reload data
    } catch (error) {
      Alert.alert('Error', 'Failed to save test results');
    }
  };

  const handleAddFavorite = async () => {
    try {
      const collegeData = {
        name: 'NIT Srinagar',
        location: 'Srinagar, J&K',
        type: 'Government',
        courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering']
      };

      await addToFavorites(user.uid, 'nit-srinagar', collegeData);
      Alert.alert('Success', 'College added to favorites!');
      loadUserData(); // Reload data
    } catch (error) {
      Alert.alert('Error', 'Failed to add to favorites');
    }
  };

  return (
    <View className="p-6 bg-white">
      <Text className="text-2xl font-bold text-gray-900 mb-6">
        Database Example
      </Text>

      {/* User Profile Section */}
      <View className="mb-6 p-4 bg-blue-50 rounded-lg">
        <Text className="text-lg font-semibold text-blue-900 mb-2">
          User Profile
        </Text>
        {userProfile ? (
          <View>
            <Text className="text-blue-800">Name: {userProfile.displayName}</Text>
            <Text className="text-blue-800">Email: {userProfile.email}</Text>
            <Text className="text-blue-800">Class: {userProfile.class || 'Not set'}</Text>
            <Text className="text-blue-800">Stream: {userProfile.stream || 'Not set'}</Text>
          </View>
        ) : (
          <Text className="text-blue-800">No profile data found</Text>
        )}
        
        <TouchableOpacity
          onPress={handleUpdateProfile}
          className="bg-blue-500 py-2 px-4 rounded mt-2"
        >
          <Text className="text-white text-center">Update Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Aptitude Results Section */}
      <View className="mb-6 p-4 bg-green-50 rounded-lg">
        <Text className="text-lg font-semibold text-green-900 mb-2">
          Aptitude Results ({aptitudeResults.length})
        </Text>
        {aptitudeResults.length > 0 ? (
          <View>
            {aptitudeResults.slice(0, 2).map((result, index) => (
              <Text key={index} className="text-green-800">
                {result.testType}: {result.score}% - {result.results.personality}
              </Text>
            ))}
          </View>
        ) : (
          <Text className="text-green-800">No test results found</Text>
        )}
        
        <TouchableOpacity
          onPress={handleSaveAptitudeTest}
          className="bg-green-500 py-2 px-4 rounded mt-2"
        >
          <Text className="text-white text-center">Save Test Result</Text>
        </TouchableOpacity>
      </View>

      {/* Favorites Section */}
      <View className="mb-6 p-4 bg-purple-50 rounded-lg">
        <Text className="text-lg font-semibold text-purple-900 mb-2">
          Favorite Colleges ({favorites.length})
        </Text>
        {favorites.length > 0 ? (
          <View>
            {favorites.slice(0, 3).map((fav, index) => (
              <Text key={index} className="text-purple-800">
                {fav.collegeData.name} - {fav.collegeData.location}
              </Text>
            ))}
          </View>
        ) : (
          <Text className="text-purple-800">No favorites found</Text>
        )}
        
        <TouchableOpacity
          onPress={handleAddFavorite}
          className="bg-purple-500 py-2 px-4 rounded mt-2"
        >
          <Text className="text-white text-center">Add NIT Srinagar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={loadUserData}
        className="bg-gray-500 py-3 px-6 rounded-lg"
      >
        <Text className="text-white text-center font-semibold">
          Refresh Data
        </Text>
      </TouchableOpacity>
    </View>
  );
} 