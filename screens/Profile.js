import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen({ onBack }) {
  const { user, logout } = useAuth();

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

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="px-6 py-8">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <TouchableOpacity 
            onPress={onBack}
            className="bg-surface border border-primary/20 p-2 rounded-lg"
            activeOpacity={0.85}
          >
            <Text className="text-textSecondary text-lg">← Back</Text>
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-textPrimary">Profile</Text>
          <View className="w-16" />
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

        {/* Actions */}
        <View className="space-y-4">
          <TouchableOpacity 
            className="bg-surface border border-primary/20 py-4 px-6 rounded-xl"
            onPress={() => Alert.alert('Coming Soon', 'Edit profile feature will be available soon!')}
            activeOpacity={0.85}
          >
            <Text className="text-textPrimary text-lg font-medium text-center">
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
    </ScrollView>
  );
} 