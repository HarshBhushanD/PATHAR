import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!isLogin && !displayName) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, displayName);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDisplayName('');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center px-6">
          {/* Header */}
          <View className="items-center mb-12">
            <Text className="text-4xl font-extrabold text-primary mb-2">
              One-Stop Advisor
            </Text>
            <Text className="text-lg text-textPrimary text-center">
              {isLogin ? 'Welcome Back!' : 'Create Your Account'}
            </Text>
            <Text className="text-sm text-textSecondary text-center mt-2">
              Your journey to the right career path starts here
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            {!isLogin && (
              <View>
                <Text className="text-textPrimary text-sm font-medium mb-2">
                  Full Name
                </Text>
                <TextInput
                  value={displayName}
                  onChangeText={setDisplayName}
                  placeholder="Enter your full name"
                  className="bg-surface border border-primary/20 rounded-xl px-4 py-3 text-textPrimary"
                  autoCapitalize="words"
                />
              </View>
            )}

            <View>
              <Text className="text-textPrimary text-sm font-medium mb-2">
                Email Address
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                className="bg-surface border border-primary/20 rounded-xl px-4 py-3 text-textPrimary"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View>
              <Text className="text-textPrimary text-sm font-medium mb-2">
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                className="bg-surface border border-primary/20 rounded-xl px-4 py-3 text-textPrimary"
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            {!isLogin && (
              <View>
                <Text className="text-textPrimary text-sm font-medium mb-2">
                  Confirm Password
                </Text>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm your password"
                  className="bg-surface border border-primary/20 rounded-xl px-4 py-3 text-textPrimary"
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading}
              className={`py-4 rounded-xl mt-6 ${
                loading 
                  ? 'bg-textSecondary' 
                  : 'bg-primary'
              }`}
              activeOpacity={0.85}
            >
              {loading ? (
                <View className="flex-row justify-center items-center">
                  <ActivityIndicator color="white" size="small" />
                  <Text className="text-white text-lg font-semibold ml-2">
                    Please wait...
                  </Text>
                </View>
              ) : (
                <Text className="text-white text-lg font-semibold text-center">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Text>
              )}
            </TouchableOpacity>

            {/* Toggle Mode */}
            <View className="flex-row justify-center mt-6">
              <Text className="text-textSecondary">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </Text>
              <TouchableOpacity onPress={toggleMode}>
                <Text className="text-primary font-semibold">
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View className="mt-12">
            <Text className="text-textSecondary text-xs text-center">
              Government of Jammu & Kashmir
            </Text>
            <Text className="text-textSecondary text-xs text-center">
              Higher Education Department
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
