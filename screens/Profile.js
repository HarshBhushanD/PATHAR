import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { 
  getUserProfile, 
  getUserAptitudeResults, 
  getUserFavorites, 
  getUserSearchHistory,
  saveAptitudeResults,
  addToFavorites,
  saveSearchHistory,
  updateUserProfile
} from '../services/firestore';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [aptitudeResults, setAptitudeResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    studentEmail: '',
    studentPhone: '',
    parentPhone: '',
    schoolName: '',
    studentType: ''
  });

  // Fetch all user data from database
  const fetchUserData = async () => {
    if (!user?.uid) {
      console.log('No user UID available');
      return;
    }
    
    try {
      setLoading(true);
      console.log('Fetching user data for UID:', user.uid);
      
      const [profile, aptitude, userFavorites, searches] = await Promise.all([
        getUserProfile(user.uid),
        getUserAptitudeResults(user.uid),
        getUserFavorites(user.uid),
        getUserSearchHistory(user.uid, 10)
      ]);

      console.log('Fetched data:', {
        profile,
        aptitude,
        userFavorites,
        searches
      });

      setUserProfile(profile);
      setAptitudeResults(aptitude);
      setFavorites(userFavorites);
      setSearchHistory(searches);
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', `Failed to load profile data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Refresh data
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchUserData();
  }, [user?.uid]);

  // Initialize form data when user profile is loaded
  useEffect(() => {
    if (userProfile || user) {
      setFormData({
        name: userProfile?.name || user?.name || '',
        dob: userProfile?.dob || user?.dob || '',
        studentEmail: userProfile?.studentEmail || user?.studentEmail || '',
        studentPhone: userProfile?.studentPhone || user?.studentPhone || '',
        parentPhone: userProfile?.parentPhone || user?.parentPhone || '',
        schoolName: userProfile?.schoolName || user?.schoolName || '',
        studentType: userProfile?.studentType || user?.studentType || ''
      });
    }
  }, [userProfile, user]);

  // Function to create sample data for testing
  const createSampleData = async () => {
    if (!user?.uid) return;
    
    try {
      // Create sample aptitude result
      await saveAptitudeResults(user.uid, {
        testType: "Career Interest Assessment",
        score: 85,
        results: {
          personality: "Investigative",
          strengths: ["Analytical", "Problem-solving", "Research"],
          recommendations: ["Engineering", "Medicine", "Research"]
        }
      });

      // Create sample favorite college
      await addToFavorites(user.uid, "nit-srinagar", {
        name: "NIT Srinagar",
        location: "Srinagar, J&K",
        type: "Government",
        courses: ["Computer Science", "Electrical Engineering", "Mechanical Engineering"]
      });

      // Create sample search history
      await saveSearchHistory(user.uid, "Computer Science Engineering", "course");
      await saveSearchHistory(user.uid, "NIT Srinagar", "college");

      Alert.alert('Success', 'Sample data created successfully!');
      fetchUserData(); // Refresh data
    } catch (error) {
      console.error('Error creating sample data:', error);
      Alert.alert('Error', 'Failed to create sample data');
    }
  };

  // Handle edit profile
  const handleEditProfile = () => {
    setEditModalVisible(true);
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    if (!user?.uid) return;

    try {
      setEditingProfile(true);
      
      // Validate required fields
      if (!formData.name.trim()) {
        Alert.alert('Error', 'Name is required');
        return;
      }

      // Update profile in Firestore
      await updateUserProfile(user.uid, {
        name: formData.name.trim(),
        dob: formData.dob.trim(),
        studentEmail: formData.studentEmail.trim(),
        studentPhone: formData.studentPhone.trim(),
        parentPhone: formData.parentPhone.trim(),
        schoolName: formData.schoolName.trim(),
        studentType: formData.studentType.trim()
      });

      Alert.alert('Success', 'Profile updated successfully!');
      setEditModalVisible(false);
      fetchUserData(); // Refresh data
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setEditingProfile(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert('Error', 'Failed to logout');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-textSecondary mt-4">Loading profile data...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      className="flex-1 bg-background"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="px-6 py-8">
                {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-800">Profile</Text>
          <Text className="text-gray-600 mt-1">Manage your account settings</Text>
        </View>

        {/* User Info Card */}
        <View className="bg-surface rounded-2xl p-6 mb-6 border border-primary/20 shadow-sm">
          <View className="items-center">
            <View className="bg-primary w-20 h-20 rounded-full items-center justify-center mb-4">
              <Text className="text-white text-2xl font-bold">
                {user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
              </Text>
            </View>
            <Text className="text-xl font-semibold text-textPrimary mb-1">
              {user?.displayName || 'User'}
            </Text>
            <Text className="text-textSecondary text-center">
              {user?.email}
            </Text>
          </View>
        </View>

        {/* Account Information */}
        <View className="bg-surface border border-primary/20 rounded-2xl p-6 mb-6 shadow-sm">
          <Text className="text-lg font-semibold text-textPrimary mb-4">
            Account Information
          </Text>
          
          <View className="space-y-4">
            <View className="flex-row justify-between items-center py-3 border-b border-primary/10">
              <Text className="text-textSecondary">Email</Text>
              <Text className="text-textPrimary font-medium">{user?.email}</Text>
            </View>
            
            <View className="flex-row justify-between items-center py-3 border-b border-primary/10">
              <Text className="text-textSecondary">Display Name</Text>
              <Text className="text-textPrimary font-medium">
                {user?.displayName || 'Not set'}
              </Text>
            </View>
            
            <View className="flex-row justify-between items-center py-3">
              <Text className="text-textSecondary">Account Created</Text>
              <Text className="text-textPrimary font-medium">
                {user?.metadata?.creationTime ? 
                  new Date(user.metadata.creationTime).toLocaleDateString() : 
                  'Unknown'
                }
              </Text>
            </View>
          </View>
        </View>


        {/* User Profile Data from Database */}
        {(userProfile || user) && (
          <View className="bg-surface border border-primary/20 rounded-2xl p-6 mb-6 shadow-sm">
            <Text className="text-lg font-semibold text-textPrimary mb-4">
              Profile Information
            </Text>
            
            <View className="space-y-4">
              {(userProfile?.name || user?.name) && (
                <View className="flex-row justify-between items-center py-3 border-b border-primary/10">
                  <Text className="text-textSecondary">Full Name</Text>
                  <Text className="text-textPrimary font-medium">{userProfile?.name || user?.name}</Text>
                </View>
              )}
              
              {(userProfile?.dob || user?.dob) && (
                <View className="flex-row justify-between items-center py-3 border-b border-primary/10">
                  <Text className="text-textSecondary">Date of Birth</Text>
                  <Text className="text-textPrimary font-medium">
                    {new Date(userProfile?.dob || user?.dob).toLocaleDateString()}
                  </Text>
                </View>
              )}
              
              {(userProfile?.studentEmail || user?.studentEmail) && (
                <View className="flex-row justify-between items-center py-3 border-b border-primary/10">
                  <Text className="text-textSecondary">Student Email</Text>
                  <Text className="text-textPrimary font-medium">{userProfile?.studentEmail || user?.studentEmail}</Text>
                </View>
              )}
              
              {(userProfile?.studentPhone || user?.studentPhone) && (
                <View className="flex-row justify-between items-center py-3 border-b border-primary/10">
                  <Text className="text-textSecondary">Student Phone</Text>
                  <Text className="text-textPrimary font-medium">{userProfile?.studentPhone || user?.studentPhone}</Text>
                </View>
              )}
              
              {(userProfile?.parentPhone || user?.parentPhone) && (
                <View className="flex-row justify-between items-center py-3 border-b border-primary/10">
                  <Text className="text-textSecondary">Parent Phone</Text>
                  <Text className="text-textPrimary font-medium">{userProfile?.parentPhone || user?.parentPhone}</Text>
                </View>
              )}
              
              {(userProfile?.schoolName || user?.schoolName) && (
                <View className="flex-row justify-between items-center py-3 border-b border-primary/10">
                  <Text className="text-textSecondary">School Name</Text>
                  <Text className="text-textPrimary font-medium">{userProfile?.schoolName || user?.schoolName}</Text>
                </View>
              )}
              
              {(userProfile?.studentType || user?.studentType) && (
                <View className="flex-row justify-between items-center py-3">
                  <Text className="text-textSecondary">Student Type</Text>
                  <Text className="text-textPrimary font-medium">{userProfile?.studentType || user?.studentType}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Aptitude Test Results */}
        <View className="bg-surface border border-primary/20 rounded-2xl p-6 mb-6 shadow-sm">
          <Text className="text-lg font-semibold text-textPrimary mb-4">
            Aptitude Test Results ({aptitudeResults.length})
          </Text>
          
          {aptitudeResults.length > 0 ? (
            aptitudeResults.map((result, index) => (
              <View key={result.id || index} className="mb-4 p-4 bg-background rounded-lg border border-primary/10">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-textPrimary font-medium">
                    {result.testType || 'Aptitude Test'}
                  </Text>
                  <Text className="text-primary font-semibold">
                    Score: {result.score || 'N/A'}
                  </Text>
                </View>
                
                {result.results && (
                  <View className="space-y-2">
                    {result.results.personality && (
                      <Text className="text-textSecondary">
                        <Text className="font-medium">Personality:</Text> {result.results.personality}
                      </Text>
                    )}
                    
                    {result.results.strengths && result.results.strengths.length > 0 && (
                      <Text className="text-textSecondary">
                        <Text className="font-medium">Strengths:</Text> {result.results.strengths.join(', ')}
                      </Text>
                    )}
                    
                    {result.results.recommendations && result.results.recommendations.length > 0 && (
                      <Text className="text-textSecondary">
                        <Text className="font-medium">Recommendations:</Text> {result.results.recommendations.join(', ')}
                      </Text>
                    )}
                  </View>
                )}
                
                {result.createdAt && (
                  <Text className="text-textSecondary text-xs mt-2">
                    Taken: {new Date(result.createdAt.seconds * 1000).toLocaleDateString()}
                  </Text>
                )}
              </View>
            ))
          ) : (
            <View className="p-6 bg-background rounded-lg border border-primary/10 items-center">
              <Text className="text-textSecondary text-center mb-2">
                📝 No aptitude tests taken yet
              </Text>
              <Text className="text-textSecondary text-sm text-center">
                Take an aptitude test to see your results here
              </Text>
            </View>
          )}
        </View>

        {/* Favorite Colleges */}
        <View className="bg-surface border border-primary/20 rounded-2xl p-6 mb-6 shadow-sm">
          <Text className="text-lg font-semibold text-textPrimary mb-4">
            Favorite Colleges ({favorites.length})
          </Text>
          
          {favorites.length > 0 ? (
            favorites.map((favorite, index) => (
              <View key={favorite.id || index} className="mb-4 p-4 bg-background rounded-lg border border-primary/10">
                <Text className="text-textPrimary font-medium mb-1">
                  {favorite.collegeData?.name || 'College Name'}
                </Text>
                
                {favorite.collegeData?.location && (
                  <Text className="text-textSecondary mb-1">
                    📍 {favorite.collegeData.location}
                  </Text>
                )}
                
                {favorite.collegeData?.type && (
                  <Text className="text-textSecondary mb-1">
                    🏛️ {favorite.collegeData.type}
                  </Text>
                )}
                
                {favorite.collegeData?.courses && favorite.collegeData.courses.length > 0 && (
                  <Text className="text-textSecondary">
                    📚 Courses: {favorite.collegeData.courses.join(', ')}
                  </Text>
                )}
                
                {favorite.createdAt && (
                  <Text className="text-textSecondary text-xs mt-2">
                    Added: {new Date(favorite.createdAt.seconds * 1000).toLocaleDateString()}
                  </Text>
                )}
              </View>
            ))
          ) : (
            <View className="p-6 bg-background rounded-lg border border-primary/10 items-center">
              <Text className="text-textSecondary text-center mb-2">
                ❤️ No favorite colleges yet
              </Text>
              <Text className="text-textSecondary text-sm text-center">
                Add colleges to your favorites to see them here
              </Text>
            </View>
          )}
        </View>

        {/* Search History */}
        <View className="bg-surface border border-primary/20 rounded-2xl p-6 mb-6 shadow-sm">
          <Text className="text-lg font-semibold text-textPrimary mb-4">
            Recent Searches ({searchHistory.length})
          </Text>
          
          {searchHistory.length > 0 ? (
            searchHistory.map((search, index) => (
              <View key={search.id || index} className="mb-3 p-3 bg-background rounded-lg border border-primary/10">
                <View className="flex-row justify-between items-center">
                  <Text className="text-textPrimary font-medium flex-1">
                    {search.query}
                  </Text>
                  <Text className="text-textSecondary text-xs ml-2">
                    {search.type}
                  </Text>
                </View>
                
                {search.timestamp && (
                  <Text className="text-textSecondary text-xs mt-1">
                    {new Date(search.timestamp.seconds * 1000).toLocaleDateString()}
                  </Text>
                )}
              </View>
            ))
          ) : (
            <View className="p-6 bg-background rounded-lg border border-primary/10 items-center">
              <Text className="text-textSecondary text-center mb-2">
                🔍 No search history yet
              </Text>
              <Text className="text-textSecondary text-sm text-center">
                Your recent searches will appear here
              </Text>
            </View>
          )}
        </View>

        {/* Actions */}
        <View className="space-y-4">
          {/* <TouchableOpacity 
            className="bg-blue-500 py-4 px-6 rounded-xl"
            onPress={createSampleData}
            activeOpacity={0.85}
          >
            <Text className="text-white text-lg font-medium text-center">
              Create Sample Test Data
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity 
            className="bg-primary py-4 px-6 rounded-xl"
            onPress={handleEditProfile}
            activeOpacity={0.85}
          >
            <Text className="text-white text-lg font-medium text-center">
              Edit Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-surface border border-primary/20 py-4 px-6 rounded-xl"
            onPress={() => Alert.alert('Coming Soon', 'Settings will be available soon!')}
            activeOpacity={0.85}
          >
            <Text className="text-textPrimary text-lg font-medium text-center">
              Settings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleLogout}
            className="bg-error py-4 px-6 rounded-xl"
            activeOpacity={0.85}
          >
            <Text className="text-white text-lg font-semibold text-center">
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="mt-12">
          <Text className="text-textSecondary text-xs text-center">
            One-Stop Advisor
          </Text>
          <Text className="text-textSecondary text-xs text-center mt-1">
            Government of Jammu & Kashmir
          </Text>
        </View>
      </View>

      {/* Edit Profile Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 bg-background"
        >
          <View className="flex-1">
            {/* Modal Header */}
            <View className="flex-row items-center justify-between p-6 border-b border-primary/20">
              <TouchableOpacity 
                onPress={() => setEditModalVisible(false)}
                className="bg-surface border border-primary/20 p-2 rounded-lg"
              >
                <Text className="text-textSecondary">Cancel</Text>
              </TouchableOpacity>
              <Text className="text-xl font-bold text-textPrimary">Edit Profile</Text>
              <TouchableOpacity 
                onPress={handleSaveProfile}
                disabled={editingProfile}
                className="bg-primary px-4 py-2 rounded-lg"
              >
                <Text className="text-white font-medium">
                  {editingProfile ? 'Saving...' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Form Content */}
            <ScrollView className="flex-1 p-6">
              <View className="space-y-6">
                {/* Name */}
                <View>
                  <Text className="text-textPrimary font-medium mb-2">Full Name *</Text>
                  <TextInput
                    value={formData.name}
                    onChangeText={(value) => handleInputChange('name', value)}
                    placeholder="Enter your full name"
                    className="bg-surface border border-primary/20 rounded-lg p-4 text-textPrimary"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                {/* Date of Birth */}
                <View>
                  <Text className="text-textPrimary font-medium mb-2">Date of Birth</Text>
                  <TextInput
                    value={formData.dob}
                    onChangeText={(value) => handleInputChange('dob', value)}
                    placeholder="YYYY-MM-DD"
                    className="bg-surface border border-primary/20 rounded-lg p-4 text-textPrimary"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                {/* Student Email */}
                <View>
                  <Text className="text-textPrimary font-medium mb-2">Student Email</Text>
                  <TextInput
                    value={formData.studentEmail}
                    onChangeText={(value) => handleInputChange('studentEmail', value)}
                    placeholder="student@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="bg-surface border border-primary/20 rounded-lg p-4 text-textPrimary"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                {/* Student Phone */}
                <View>
                  <Text className="text-textPrimary font-medium mb-2">Student Phone</Text>
                  <TextInput
                    value={formData.studentPhone}
                    onChangeText={(value) => handleInputChange('studentPhone', value)}
                    placeholder="+91 9876543210"
                    keyboardType="phone-pad"
                    className="bg-surface border border-primary/20 rounded-lg p-4 text-textPrimary"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                {/* Parent Phone */}
                <View>
                  <Text className="text-textPrimary font-medium mb-2">Parent Phone</Text>
                  <TextInput
                    value={formData.parentPhone}
                    onChangeText={(value) => handleInputChange('parentPhone', value)}
                    placeholder="+91 9876543210"
                    keyboardType="phone-pad"
                    className="bg-surface border border-primary/20 rounded-lg p-4 text-textPrimary"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                {/* School Name */}
                <View>
                  <Text className="text-textPrimary font-medium mb-2">School Name</Text>
                  <TextInput
                    value={formData.schoolName}
                    onChangeText={(value) => handleInputChange('schoolName', value)}
                    placeholder="Your school name"
                    className="bg-surface border border-primary/20 rounded-lg p-4 text-textPrimary"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                {/* Student Type */}
                <View>
                  <Text className="text-textPrimary font-medium mb-2">Student Type</Text>
                  <TextInput
                    value={formData.studentType}
                    onChangeText={(value) => handleInputChange('studentType', value)}
                    placeholder="e.g., Regular, Private, etc."
                    className="bg-surface border border-primary/20 rounded-lg p-4 text-textPrimary"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </ScrollView>
  );
} 