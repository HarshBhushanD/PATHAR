import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { 
  isTablet, 
  isLargePhone, 
  getContainerPadding 
} from '../utils/responsive';

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
  const containerPadding = getContainerPadding();

  return (
    <View 
      className='bg-white border-t border-gray-200'
      style={{ 
        paddingHorizontal: containerPadding,
        paddingVertical: isTablet() ? 12 : 8,
        paddingBottom: isTablet() ? 12 : 8 + 8, // Extra padding for safe area on phones
      }}
    >
      <View 
        className={`flex-row ${isTablet() ? 'justify-center' : 'justify-around'} items-center`}
        style={{ 
          maxWidth: isTablet() ? 600 : '100%',
          alignSelf: 'center',
          width: '100%'
        }}
      >
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          const isPrimary = item.id === primaryScreen;
          
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => onNavigate(item.id)}
              className={`items-center rounded-lg ${
                isActive ? 'bg-gray-100' : ''
              }`}
              style={{ 
                paddingVertical: isTablet() ? 12 : 8,
                paddingHorizontal: isTablet() ? 16 : 12,
                minWidth: isTablet() ? 100 : 60,
                marginHorizontal: isTablet() ? 8 : 0,
                flex: isTablet() ? 0 : 1,
              }}
              activeOpacity={0.7}
            >
              <View className='relative items-center'>
                <Ionicons
                  name={isActive ? item.activeIcon : item.icon}
                  size={isTablet() ? 28 : isLargePhone() ? 26 : 24}
                  color={isActive ? item.color : '#9CA3AF'}
                />
                {/* Show a small dot for user's primary screen */}
                {isPrimary && !isActive && (
                  <View 
                    className={`absolute ${isTablet() ? '-top-1 -right-1 w-3 h-3' : '-top-1 -right-1 w-2 h-2'} rounded-full`}
                    style={{ backgroundColor: item.color }}
                  />
                )}
              </View>
              <Text
                className={`font-medium ${
                  isActive 
                    ? 'text-gray-800' 
                    : 'text-gray-500'
                } ${isTablet() ? 'mt-2' : 'mt-1'}`}
                style={{ 
                  fontSize: isTablet() ? 14 : isLargePhone() ? 12 : 11,
                  textAlign: 'center'
                }}
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