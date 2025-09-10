import { StatusBar } from 'expo-status-bar';
import './global.css';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

// Import screens
import Class10Screen from './screens/class_10';
import Class12Screen from './screens/class_12';
import CollegesScreen from './screens/colleges';
import CollegeStudentScreen from './screens/CollegeStudent';
import AptitudeScreen from './screens/aptitude';
import AuthScreen from './screens/Auth';
import ProfileScreen from './screens/Profile';

// Import components
import BottomNavigation from './components/BottomNavigation';

// Import Auth Context
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const { user, loading } = useAuth();

  // Determine the appropriate screen based on user's student type
  const getUserScreen = () => {
    if (!user || !user.studentType) {
      // Fallback to class10 if no student type is set
      return 'class10';
    }
    
    switch (user.studentType) {
      case '10th':
        return 'class10';
      case '12th':
        return 'class12';
      case 'college':
        return 'collegeStudent';
      default:
        return 'class10';
    }
  };

  // Set the current screen to home for all users
  useEffect(() => {
    if (user && currentScreen === 'home') {
      setCurrentScreen('home');
    }
  }, [user, currentScreen]);

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <SafeAreaView className='flex-1 bg-background justify-center items-center'>
        <ActivityIndicator size="large" color="#1E88E5" />
        <Text className="text-textSecondary mt-4">Loading...</Text>
      </SafeAreaView>
    );
  }

  // Show auth screen if user is not logged in
  if (!user) {
    return (
      <SafeAreaView className='flex-1 bg-background'>
        <StatusBar style="auto" />
        <AuthScreen />
      </SafeAreaView>
    );
  }

  // Handle navigation between screens
  const handleNavigation = (screenName) => {
    if (screenName) {
      setCurrentScreen(screenName);
    } else {
      setCurrentScreen(getUserScreen());
    }
  };

  // Render screens for authenticated users
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return renderUserTypeScreen();
      case 'aptitude':
        return <AptitudeScreen />;
      case 'colleges':
        return <CollegesScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return renderUserTypeScreen();
    }
  };

  // Render the appropriate screen based on user type
  const renderUserTypeScreen = () => {
    const userScreen = getUserScreen();
    switch (userScreen) {
      case 'class10':
        return <Class10Screen />;
      case 'class12':
        return <Class12Screen />;
      case 'collegeStudent':
        return <CollegeStudentScreen />;
      default:
        return <Class10Screen />;
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <StatusBar style="auto" />
      <View className='flex-1'>
        {renderScreen()}
        <BottomNavigation 
          currentScreen={currentScreen}
          onNavigate={handleNavigation}
          user={user}
        />
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}



