import { StatusBar } from 'expo-status-bar';
import './global.css';
import React, { useState } from 'react';
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
import AptitudeScreen from './screens/aptitude';
import AuthScreen from './screens/Auth';
import ProfileScreen from './screens/Profile';

// Import Auth Context
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const { user, loading } = useAuth();

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

  // Render screens for authenticated users
  const renderScreen = () => {
    switch (currentScreen) {
      case 'class10':
        return <Class10Screen onBack={() => setCurrentScreen('home')} />;
      case 'class12':
        return <Class12Screen onBack={() => setCurrentScreen('home')} />;
      case 'colleges':
        return <CollegesScreen onBack={() => setCurrentScreen('home')} />;
      case 'aptitude':
        return <AptitudeScreen onBack={() => setCurrentScreen('home')} />;
      case 'profile':
        return <ProfileScreen onBack={() => setCurrentScreen('home')} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} user={user} />;
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <StatusBar style="auto" />
      {renderScreen()}
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

function HomeScreen({ onNavigate, user }) {
  return (
    <View className='flex-1 justify-center items-center px-6 bg-background'>
      {/* Header with Profile Button */}
      <View className='absolute top-12 right-6 z-10'>
        <TouchableOpacity
          onPress={() => onNavigate('profile')}
          className='bg-primary w-12 h-12 rounded-full items-center justify-center shadow-lg'
          activeOpacity={0.8}
        >
          <Text className='text-white text-lg font-bold'>
            {user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>

      <View className='items-center mb-12'>
        <Text className='text-4xl font-extrabold text-primary mb-2'>
          PATHAR
        </Text>
        <Text className='text-lg text-textPrimary text-center'>
          Your One-Stop Advisor for Careers & Colleges
        </Text>
        <Text className='text-sm text-textSecondary text-center mt-2'>
          Built for students in Jammu & Kashmir
        </Text>
      </View>

      <View className='w-full space-y-4'>
        <TouchableOpacity
          onPress={() => onNavigate('class10')}
          className='bg-primary py-4 px-6 rounded-xl shadow-lg active:bg-secondary'
          activeOpacity={0.85}
        >
          <Text className='text-white text-lg font-semibold text-center'>
            Class 10 Students
          </Text>
          <Text className='text-white/80 text-sm text-center mt-1'>
            Explore career options after 10th
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onNavigate('class12')}
          className='bg-primary py-4 px-6 rounded-xl shadow-lg active:bg-secondary'
          activeOpacity={0.85}
        >
          <Text className='text-white text-lg font-semibold text-center'>
            Class 12 Students
          </Text>
          <Text className='text-white/80 text-sm text-center mt-1'>
            College and career guidance
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onNavigate('colleges')}
          className='bg-primary py-4 px-6 rounded-xl shadow-lg active:bg-secondary'
          activeOpacity={0.85}
        >
          <Text className='text-white text-lg font-semibold text-center'>
            Browse Colleges
          </Text>
          <Text className='text-white/80 text-sm text-center mt-1'>
            Find government colleges nearby
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onNavigate('aptitude')}
          className='bg-primary py-4 px-6 rounded-xl shadow-lg active:bg-secondary'
          activeOpacity={0.85}
        >
          <Text className='text-white text-lg font-semibold text-center'>
            Aptitude Test
          </Text>
          <Text className='text-white/80 text-sm text-center mt-1'>
            Discover your interests and strengths
          </Text>
        </TouchableOpacity>
      </View>

      <View className='mt-12'>
        <Text className='text-textSecondary text-xs text-center'>
          Government of Jammu & Kashmir
        </Text>
        <Text className='text-textSecondary text-xs text-center'>
          Higher Education Department
        </Text>
      </View>
    </View>
  );
}

