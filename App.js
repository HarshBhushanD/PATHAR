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
import Aptitude10Screen from './screens/aptitude10';
import AuthScreen from './screens/Auth';
import ProfileScreen from './screens/Profile';
import StreamDiscoveryScreen from './screens/StreamDiscovery';
import SmartMentorScreen from './screens/SmartMentor';
import BoardMasteryScreen from './screens/BoardMastery';
import StudyArchitectScreen from './screens/StudyArchitect';
import SubjectAnalyticsScreen from './screens/SubjectAnalytics';
import PeerNetworkScreen from './screens/PeerNetwork';
import CareerMappingScreen from './screens/CareerMapping';
import TimelineTrackerScreen from './screens/TimelineTracker';

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
  const handleNavigation = (screenName, params = {}) => {
    if (screenName) {
      setCurrentScreen(screenName);
    } else {
      setCurrentScreen(getUserScreen());
    }
  };

  // Render appropriate aptitude screen based on user type
  const renderAptitudeScreen = () => {
    const userScreen = getUserScreen();
    switch (userScreen) {
      case 'class10':
        return <Aptitude10Screen />;
      case 'class12':
        return <AptitudeScreen />;
      case 'collegeStudent':
        return <AptitudeScreen />; // Use class 12th version for college students
      default:
        return <Aptitude10Screen />;
    }
  };

  // Render screens for authenticated users
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return renderUserTypeScreen();
      case 'aptitude':
        return renderAptitudeScreen();
      case 'colleges':
        return <CollegesScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'streamDiscovery':
        return <StreamDiscoveryScreen onNavigate={handleNavigation} />;
      case 'smartMentor':
        // Determine student class based on user type for Smart Mentor
        const getStudentClass = () => {
          if (user && user.studentType) {
            return user.studentType;
          }
          // Default based on current user screen
          const userScreen = getUserScreen();
          switch (userScreen) {
            case 'class10': return '10th';
            case 'class12': return '12th';
            case 'collegeStudent': return 'college';
            default: return '10th';
          }
        };
        return <SmartMentorScreen onNavigate={handleNavigation} studentClass={getStudentClass()} />;
      case 'boardMastery':
        return <BoardMasteryScreen onNavigate={handleNavigation} />;
      case 'studyArchitect':
        return <StudyArchitectScreen onNavigate={handleNavigation} />;
      case 'subjectAnalytics':
        return <SubjectAnalyticsScreen onNavigate={handleNavigation} />;
      case 'peerNetwork':
        return <PeerNetworkScreen onNavigate={handleNavigation} />;
      case 'careerMapping':
        return <CareerMappingScreen onNavigate={handleNavigation} />;
      case 'timelineTracker':
        return <TimelineTrackerScreen onNavigate={handleNavigation} />;
      default:
        return renderUserTypeScreen();
    }
  };

  // Render the appropriate screen based on user type
  const renderUserTypeScreen = () => {
    const userScreen = getUserScreen();
    switch (userScreen) {
      case 'class10':
        return <Class10Screen onNavigate={handleNavigation} />;
      case 'class12':
        return <Class12Screen onNavigate={handleNavigation} />;
      case 'collegeStudent':
        return <CollegeStudentScreen onNavigate={handleNavigation} />;
      default:
        return <Class10Screen onNavigate={handleNavigation} />;
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



