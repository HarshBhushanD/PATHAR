import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNavigation({ currentScreen, onNavigate, user }) {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: 'home-outline',
      activeIcon: 'home',
      color: '#3B82F6', // blue-500
    },
    {
      id: 'aptitude',
      label: 'Aptitude',
      icon: 'bulb-outline',
      activeIcon: 'bulb',
      color: '#8B5CF6', // purple-500
    },
    {
      id: 'colleges',
      label: 'Career Map',
      icon: 'map-outline',
      activeIcon: 'map',
      color: '#10B981', // emerald-500
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'person-outline',
      activeIcon: 'person',
      color: '#6B7280', // gray-500
    },
  ];

  // Determine which screen should be highlighted based on user type
  const getUserPrimaryScreen = () => {
    // Home is now the primary screen for all users
    return 'home';
  };

  const primaryScreen = getUserPrimaryScreen();

  return (
    <View className='bg-white border-t border-gray-200 px-4 py-2'>
      <View className='flex-row justify-around items-center'>
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          const isPrimary = item.id === primaryScreen;
          
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => onNavigate(item.id)}
              className={`items-center py-2 px-3 rounded-lg ${
                isActive ? 'bg-gray-100' : ''
              }`}
              activeOpacity={0.7}
            >
              <View className='relative'>
                <Ionicons
                  name={isActive ? item.activeIcon : item.icon}
                  size={24}
                  color={isActive ? item.color : '#9CA3AF'}
                />
                {/* Show a small dot for user's primary screen */}
                {isPrimary && !isActive && (
                  <View 
                    className='absolute -top-1 -right-1 w-2 h-2 rounded-full'
                    style={{ backgroundColor: item.color }}
                  />
                )}
              </View>
              <Text
                className={`text-xs mt-1 font-medium ${
                  isActive 
                    ? 'text-gray-800' 
                    : 'text-gray-500'
                }`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
} 