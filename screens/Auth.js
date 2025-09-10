import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AuthScreen() {
  const [currentView, setCurrentView] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Individual states for each field
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [studentType, setStudentType] = useState('10th');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { login, signup } = useAuth();

  // Auto-close modal and let AuthContext handle redirection
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 2000); // Auto-close after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  const getDisplayDate = (dob) => {
    if (!dob) return 'Select Date of Birth';
    const d = new Date(dob);
    if (isNaN(d)) return 'Select Date of Birth';
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const calculateAge = (dob) => {
    if (!dob) return '';
    const today = new Date();
    const birthDate = new Date(dob);
    if (isNaN(birthDate)) return '';
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleDateChange = (event, selected) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      if (event?.type === 'dismissed') return;
    }

    const pickedDate = selected || (event && event.nativeEvent && event.nativeEvent.timestamp ? new Date(event.nativeEvent.timestamp) : null);

    if (pickedDate && !isNaN(pickedDate)) {
      const iso = pickedDate.toISOString().split('T')[0];
      setDob(iso);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }
      await login(email, password);
    } catch (err) {
      let errorMessage = 'Login failed. Please try again.';
      switch (err.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address.';
          break;
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password. Please check and try again.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed login attempts. Please try again later.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled. Please contact support.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        default:
          errorMessage = 'Unable to log in at the moment. Please try again.';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setError('');
    if (!name || !dob || !studentEmail || !studentPhone || !parentPhone || !schoolName || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const userData = {
        name,
        dob,
        studentEmail,
        studentPhone,
        parentPhone,
        schoolName,
        studentType
      };
      await signup(studentEmail, password, userData);
      // Note: Signup function will handle navigation based on student type
      setShowModal(true);
    } catch (err) {
      let errorMessage = 'Registration failed. Please try again.';
      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists. Please use a different email or try logging in.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please use at least 6 characters with a mix of letters and numbers.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection and try again.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email registration is currently disabled. Please contact support.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many registration attempts. Please try again later.';
          break;
        default:
          errorMessage = 'Unable to create account at the moment. Please try again later.';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50"
    >
      <ScrollView className="flex-1 mt-20" showsVerticalScrollIndicator={false}>
        <View className="px-4 py-8">
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-16 h-16 bg-blue-500 rounded-full items-center justify-center mb-4 shadow-lg">
              <Ionicons name="school" size={32} color="white" />
            </View>
            <Text className="text-4xl font-bold text-gray-800 text-center mb-2">
              One-Stop Advisor
            </Text>
            <Text className="text-lg text-gray-600 text-center">
              Your academic journey starts here
            </Text>
          </View>

          {/* Error Message */}
          {error ? (
            <View className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <View className="flex-row items-center">
                <View className="w-6 h-6 bg-red-500 rounded-full items-center justify-center mr-3">
                  <Text className="text-white text-xs font-bold">!</Text>
                </View>
                <Text className="text-red-700 flex-1 text-sm leading-5">{error}</Text>
              </View>
            </View>
          ) : null}

          {/* Toggle Buttons */}
          <View className="flex-row bg-white rounded-xl p-2 mb-8 shadow-lg">
            <TouchableOpacity
              onPress={() => { setCurrentView('login'); setError(''); }}
              className={`flex-1 py-4 px-6 rounded-lg ${currentView === 'login' ? 'bg-blue-500' : 'bg-transparent'}`}
              disabled={loading}
            >
              <Text className={`font-semibold text-center ${currentView === 'login' ? 'text-white' : 'text-gray-600'}`}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { setCurrentView('signup'); setError(''); }}
              className={`flex-1 py-4 px-6 rounded-lg ${currentView === 'signup' ? 'bg-blue-500' : 'bg-transparent'}`}
              disabled={loading}
            >
              <Text className={`font-semibold text-center ${currentView === 'signup' ? 'text-white' : 'text-gray-600'}`}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Form */}
          {currentView === 'login' && (
            <View className="bg-white rounded-2xl p-8 shadow-xl">
              <Text className="text-3xl font-bold text-center text-gray-800 mb-8">
                Welcome Back!
              </Text>

              {/* Email Input */}
              <View className="relative mb-4">
                <View className="absolute left-4 top-4 z-10">
                  <Ionicons name="mail" size={20} color="#616161" />
                </View>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email address"
                  keyboardType="email-address"
                  className="bg-gray-100 border border-gray-300 rounded-xl pl-12 pr-4 py-4 text-gray-800"
                  placeholderTextColor="#9E9E9E"
                  editable={!loading}
                />
              </View>

              {/* Password Input */}
              <View className="relative mb-4">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  className="bg-gray-100 border border-gray-300 rounded-xl pl-4 pr-12 py-4 text-gray-800"
                  placeholderTextColor="#9E9E9E"
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4"
                  disabled={loading}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#616161"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={handleLogin}
                disabled={loading}
                className={`py-4 px-6 rounded-xl shadow-lg ${loading ? 'bg-gray-400' : 'bg-blue-500'}`}
              >
                {loading ? (
                  <View className="flex-row items-center justify-center">
                    <ActivityIndicator color="white" size="small" />
                    <Text className="text-white font-semibold ml-2">Logging in...</Text>
                  </View>
                ) : (
                  <Text className="text-white font-semibold text-center text-lg">Login</Text>
                )}
              </TouchableOpacity>

              <View className="flex-row justify-center mt-8">
                <Text className="text-gray-600">Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => { setCurrentView('signup'); setError(''); }}
                  disabled={loading}
                >
                  <Text className="text-blue-500 font-semibold">Sign up here</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Signup Form */}
          {currentView === 'signup' && (
            <View className="bg-white rounded-2xl p-8 shadow-xl">
              <Text className="text-3xl font-bold text-center text-gray-800 mb-8">
                Join Us Today!
              </Text>

              {/* Name Input */}
              <View className="relative mb-4">
                <View className="absolute left-4 top-4 z-10">
                  <Ionicons name="person" size={20} color="#616161" />
                </View>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Full Name"
                  className="bg-gray-100 border border-gray-300 rounded-xl pl-12 pr-4 py-4 text-gray-800"
                  placeholderTextColor="#9E9E9E"
                  editable={!loading}
                />
              </View>

              {/* DOB Picker */}
              <View className="relative mb-4">
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  className="bg-gray-100 border border-gray-300 rounded-xl pl-12 pr-4 py-4 flex-row items-center justify-between"
                  disabled={loading}
                >
                  <View className="absolute left-4 top-4">
                    <Ionicons name="calendar" size={20} color="#616161" />
                  </View>
                  <Text className={`${dob ? 'text-gray-800' : 'text-gray-500'}`}>
                    {getDisplayDate(dob)}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#616161" />
                </TouchableOpacity>

                {dob && (
                  <Text className="text-sm text-blue-600 mt-1 ml-2">
                    Age: {calculateAge(dob)} years
                  </Text>
                )}

                {showDatePicker && (
                  <DateTimePicker
                    value={dob ? new Date(dob) : new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                    maximumDate={new Date()}
                    minimumDate={new Date(1970, 0, 1)}
                  />
                )}
              </View>

              {/* Student Email */}
              <View className="relative mb-4">
                <View className="absolute left-4 top-4 z-10">
                  <Ionicons name="mail" size={20} color="#616161" />
                </View>
                <TextInput
                  value={studentEmail}
                  onChangeText={setStudentEmail}
                  placeholder="Your Email Address"
                  keyboardType="email-address"
                  className="bg-gray-100 border border-gray-300 rounded-xl pl-12 pr-4 py-4 text-gray-800"
                  placeholderTextColor="#9E9E9E"
                  editable={!loading}
                />
              </View>

              {/* Student Phone */}
              <View className="relative mb-4">
                <View className="absolute left-4 top-4 z-10">
                  <Ionicons name="call" size={20} color="#616161" />
                </View>
                <TextInput
                  value={studentPhone}
                  onChangeText={setStudentPhone}
                  placeholder="Your Phone Number"
                  keyboardType="phone-pad"
                  className="bg-gray-100 border border-gray-300 rounded-xl pl-12 pr-4 py-4 text-gray-800"
                  placeholderTextColor="#9E9E9E"
                  editable={!loading}
                />
              </View>

              {/* Parent Phone */}
              <View className="relative mb-4">
                <View className="absolute left-4 top-4 z-10">
                  <Ionicons name="call" size={20} color="#616161" />
                </View>
                <TextInput
                  value={parentPhone}
                  onChangeText={setParentPhone}
                  placeholder="Parent/Guardian Phone"
                  keyboardType="phone-pad"
                  className="bg-gray-100 border border-gray-300 rounded-xl pl-12 pr-4 py-4 text-gray-800"
                  placeholderTextColor="#9E9E9E"
                  editable={!loading}
                />
              </View>

              {/* School Name */}
              <View className="relative mb-4">
                <View className="absolute left-4 top-4 z-10">
                  <Ionicons name="school" size={20} color="#616161" />
                </View>
                <TextInput
                  value={schoolName}
                  onChangeText={setSchoolName}
                  placeholder="School/College Name"
                  className="bg-gray-100 border border-gray-300 rounded-xl pl-12 pr-4 py-4 text-gray-800"
                  placeholderTextColor="#9E9E9E"
                  editable={!loading}
                />
              </View>

              {/* Password */}
              <View className="relative mb-4">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create Password"
                  secureTextEntry={!showPassword}
                  className="bg-gray-100 border border-gray-300 rounded-xl pl-4 pr-12 py-4 text-gray-800"
                  placeholderTextColor="#9E9E9E"
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4"
                  disabled={loading}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#616161"
                  />
                </TouchableOpacity>
              </View>

              {/* Confirm Password */}
              <View className="relative mb-4">
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm Password"
                  secureTextEntry={!showConfirmPassword}
                  className="bg-gray-100 border border-gray-300 rounded-xl pl-4 pr-12 py-4 text-gray-800"
                  placeholderTextColor="#9E9E9E"
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-4"
                  disabled={loading}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#616161"
                  />
                </TouchableOpacity>
              </View>

              {/* Student Type Selection */}
              <View className="mb-8">
                <View className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                  <View className="flex-row items-center mb-4">
                    <Ionicons name="people" size={20} color="#1E88E5" />
                    <Text className="font-semibold text-gray-800 ml-2">I am a:</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => setStudentType('10th')}
                    className={`flex-row items-center space-x-3 p-4 rounded-xl border-2 mb-3 ${
                      studentType === '10th' ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-200'
                    }`}
                    disabled={loading}
                  >
                    <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                      studentType === '10th' ? 'border-blue-500 bg-blue-500' : 'border-gray-400'
                    }`}>
                      {studentType === '10th' && <View className="w-2 h-2 rounded-full bg-white" />}
                    </View>
                    <Ionicons name="book" size={20} color="#1E88E5" />
                    <Text className={`font-medium ${studentType === '10th' ? 'text-blue-600' : 'text-gray-800'}`}>
                      10th Student
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setStudentType('12th')}
                    className={`flex-row items-center space-x-3 p-4 rounded-xl border-2 mb-3 ${
                      studentType === '12th' ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-200'
                    }`}
                    disabled={loading}
                  >
                    <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                      studentType === '12th' ? 'border-blue-500 bg-blue-500' : 'border-gray-400'
                    }`}>
                      {studentType === '12th' && <View className="w-2 h-2 rounded-full bg-white" />}
                    </View>
                    <Ionicons name="school" size={20} color="#FFC107" />
                    <Text className={`font-medium ${studentType === '12th' ? 'text-blue-600' : 'text-gray-800'}`}>
                      12th Student
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setStudentType('college')}
                    className={`flex-row items-center space-x-3 p-4 rounded-xl border-2 mb-3 ${
                      studentType === 'college' ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-200'
                    }`}
                    disabled={loading}
                  >
                    <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                      studentType === 'college' ? 'border-blue-500 bg-blue-500' : 'border-gray-400'
                    }`}>
                      {studentType === 'college' && <View className="w-2 h-2 rounded-full bg-white" />}
                    </View>
                    <Ionicons name="library" size={20} color="#4CAF50" />
                    <Text className={`font-medium ${studentType === 'college' ? 'text-blue-600' : 'text-gray-800'}`}>
                      College Student
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleSignup}
                disabled={loading}
                className={`py-4 px-6 rounded-xl shadow-lg ${loading ? 'bg-gray-400' : 'bg-blue-500'}`}
              >
                {loading ? (
                  <View className="flex-row items-center justify-center">
                    <ActivityIndicator color="white" size="small" />
                    <Text className="text-white font-semibold ml-2">Creating Account...</Text>
                  </View>
                ) : (
                  <Text className="text-white font-semibold text-center text-lg">Create Account</Text>
                )}
              </TouchableOpacity>

              <View className="flex-row justify-center mt-8">
                <Text className="text-gray-600">Already have an account? </Text>
                <TouchableOpacity
                  onPress={() => { setCurrentView('login'); setError(''); }}
                  disabled={loading}
                >
                  <Text className="text-blue-500 font-semibold">Login here</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Footer */}
          <View className="mt-12">
            <Text className="text-gray-500 text-xs text-center">
              Government of Jammu & Kashmir
            </Text>
            <Text className="text-gray-500 text-xs text-center">
              Higher Education Department
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Success Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-4">
          <View className="bg-white rounded-2xl p-8 w-full max-w-sm">
            <View className="items-center mb-8">
              <View className="w-16 h-16 bg-blue-500 rounded-full items-center justify-center mb-4">
                <Ionicons name="school" size={32} color="white" />
              </View>
              <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
                Welcome to One-Stop Advisor!
              </Text>
              <Text className="text-gray-600 text-center">
                Registration successful! Redirecting to your {studentType === '10th' ? 'Class 10' : studentType === '12th' ? 'Class 12' : 'College Student'} dashboard...
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setShowModal(false)}
              className="bg-blue-500 py-4 px-6 rounded-xl"
              activeOpacity={0.8}
            >
              <View className="flex-row items-center justify-center space-x-3">
                <Ionicons name="school" size={24} color="white" />
                <Text className="text-white font-semibold text-lg">
                  Continue to Your Dashboard
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}