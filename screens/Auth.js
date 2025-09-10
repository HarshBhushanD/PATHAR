// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator
// } from 'react-native';
// import { useAuth } from '../contexts/AuthContext';

// export default function AuthScreen() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [displayName, setDisplayName] = useState('');
//   const [loading, setLoading] = useState(false);

//   const { login, signup } = useAuth();

//   const handleSubmit = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     if (!isLogin && password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     if (!isLogin && !displayName) {
//       Alert.alert('Error', 'Please enter your name');
//       return;
//     }

//     setLoading(true);
//     try {
//       if (isLogin) {
//         await login(email, password);
//       } else {
//         await signup(email, password, displayName);
//       }
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setEmail('');
//     setPassword('');
//     setConfirmPassword('');
//     setDisplayName('');
//   };

//   const toggleMode = () => {
//     setIsLogin(!isLogin);
//     resetForm();
//   };

//   return (
//     <KeyboardAvoidingView 
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       className="flex-1 bg-background"
//     >
//       <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
//         <View className="flex-1 justify-center px-6">
//           {/* Header */}
//           <View className="items-center mb-12">
//             <Text className="text-4xl font-extrabold text-primary mb-2">
//               One-Stop Advisor
//             </Text>
//             <Text className="text-lg text-textPrimary text-center">
//               {isLogin ? 'Welcome Back!' : 'Create Your Account'}
//             </Text>
//             <Text className="text-sm text-textSecondary text-center mt-2">
//               Your journey to the right career path starts here
//             </Text>
//           </View>

//           {/* Form */}
//           <View className="space-y-4">
//             {!isLogin && (
//               <View>
//                 <Text className="text-textPrimary text-sm font-medium mb-2">
//                   Full Name
//                 </Text>
//                 <TextInput
//                   value={displayName}
//                   onChangeText={setDisplayName}
//                   placeholder="Enter your full name"
//                   className="bg-surface border border-primary/20 rounded-xl px-4 py-3 text-textPrimary"
//                   autoCapitalize="words"
//                 />
//               </View>
//             )}

//             <View>
//               <Text className="text-textPrimary text-sm font-medium mb-2">
//                 Email Address
//               </Text>
//               <TextInput
//                 value={email}
//                 onChangeText={setEmail}
//                 placeholder="Enter your email"
//                 className="bg-surface border border-primary/20 rounded-xl px-4 py-3 text-textPrimary"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 autoCorrect={false}
//               />
//             </View>

//             <View>
//               <Text className="text-textPrimary text-sm font-medium mb-2">
//                 Password
//               </Text>
//               <TextInput
//                 value={password}
//                 onChangeText={setPassword}
//                 placeholder="Enter your password"
//                 className="bg-surface border border-primary/20 rounded-xl px-4 py-3 text-textPrimary"
//                 secureTextEntry
//                 autoCapitalize="none"
//               />
//             </View>

//             {!isLogin && (
//               <View>
//                 <Text className="text-textPrimary text-sm font-medium mb-2">
//                   Confirm Password
//                 </Text>
//                 <TextInput
//                   value={confirmPassword}
//                   onChangeText={setConfirmPassword}
//                   placeholder="Confirm your password"
//                   className="bg-surface border border-primary/20 rounded-xl px-4 py-3 text-textPrimary"
//                   secureTextEntry
//                   autoCapitalize="none"
//                 />
//               </View>
//             )}

//             {/* Submit Button */}
//             <TouchableOpacity
//               onPress={handleSubmit}
//               disabled={loading}
//               className={`py-4 rounded-xl mt-6 ${
//                 loading 
//                   ? 'bg-textSecondary' 
//                   : 'bg-primary'
//               }`}
//               activeOpacity={0.85}
//             >
//               {loading ? (
//                 <View className="flex-row justify-center items-center">
//                   <ActivityIndicator color="white" size="small" />
//                   <Text className="text-white text-lg font-semibold ml-2">
//                     Please wait...
//                   </Text>
//                 </View>
//               ) : (
//                 <Text className="text-white text-lg font-semibold text-center">
//                   {isLogin ? 'Sign In' : 'Create Account'}
//                 </Text>
//               )}
//             </TouchableOpacity>

//             {/* Toggle Mode */}
//             <View className="flex-row justify-center mt-6">
//               <Text className="text-textSecondary">
//                 {isLogin ? "Don't have an account? " : "Already have an account? "}
//               </Text>
//               <TouchableOpacity onPress={toggleMode}>
//                 <Text className="text-primary font-semibold">
//                   {isLogin ? 'Sign Up' : 'Sign In'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Footer */}
//           <View className="mt-12">
//             <Text className="text-textSecondary text-xs text-center">
//               Government of Jammu & Kashmir
//             </Text>
//             <Text className="text-textSecondary text-xs text-center">
//               Higher Education Department
//             </Text>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// // }
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator,
//   Modal
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; // or react-native-vector-icons
// import { useAuth } from '../contexts/AuthContext';

// export default function AuthScreen() {
//   const [currentView, setCurrentView] = useState('login'); // 'login', 'signup'
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const [formData, setFormData] = useState({
//     name: '',
//     dob: '',
//     studentEmail: '',
//     studentPhone: '',
//     parentPhone: '',
//     schoolName: '',
//     studentType: '10th',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const { login, signup } = useAuth();

//   const handleInputChange = (name, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user starts typing
//     if (error) setError('');
//   };

//   const handleLogin = async () => {
//     setLoading(true);
//     setError('');
    
//     try {
//       if (!formData.email || !formData.password) {
//         setError('Please fill in all fields');
//         setLoading(false);
//         return;
//       }
      
//       await login(formData.email, formData.password);
//       // Navigation would be handled by the auth context
//     } catch (error) {
//       console.error('Login error:', error);
//       let errorMessage = 'Login failed. Please try again.';
      
//       switch (error.code) {
//         case 'auth/user-not-found':
//           errorMessage = 'No account found with this email.';
//           break;
//         case 'auth/wrong-password':
//           errorMessage = 'Incorrect password.';
//           break;
//         case 'auth/invalid-email':
//           errorMessage = 'Invalid email address.';
//           break;
//         case 'auth/too-many-requests':
//           errorMessage = 'Too many failed attempts. Please try again later.';
//           break;
//         default:
//           errorMessage = error.message || 'Login failed. Please try again.';
//       }
      
//       setError(errorMessage);
//     }
    
//     setLoading(false);
//   };

//   const handleSignup = async () => {
//     setError('');
    
//     // Validation
//     if (!formData.name || !formData.dob || !formData.studentEmail || 
//         !formData.studentPhone || !formData.parentPhone || !formData.schoolName ||
//         !formData.password || !formData.confirmPassword) {
//       setError('Please fill in all fields');
//       return;
//     }
    
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match!');
//       return;
//     }
    
//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return;
//     }
    
//     setLoading(true);
    
//     try {
//       const userData = {
//         name: formData.name,
//         dob: formData.dob,
//         studentEmail: formData.studentEmail,
//         studentPhone: formData.studentPhone,
//         parentPhone: formData.parentPhone,
//         schoolName: formData.schoolName,
//         studentType: formData.studentType
//       };
      
//       await signup(formData.studentEmail, formData.password, userData);
//       setShowModal(true);
//     } catch (error) {
//       console.error('Signup error:', error);
//       let errorMessage = 'Registration failed. Please try again.';
      
//       switch (error.code) {
//         case 'auth/email-already-in-use':
//           errorMessage = 'An account with this email already exists.';
//           break;
//         case 'auth/invalid-email':
//           errorMessage = 'Invalid email address.';
//           break;
//         case 'auth/weak-password':
//           errorMessage = 'Password is too weak. Please choose a stronger password.';
//           break;
//         default:
//           errorMessage = error.message || 'Registration failed. Please try again.';
//       }
      
//       setError(errorMessage);
//     }
    
//     setLoading(false);
//   };

//   const handleStudentTypeSelection = () => {
//     setShowModal(false);
//     // Navigation to dashboard would be handled by auth context
//   };

//   const SuccessModal = () => (
//     <Modal
//       visible={showModal}
//       transparent={true}
//       animationType="slide"
//       onRequestClose={() => setShowModal(false)}
//     >
//       <View className="flex-1 justify-center items-center bg-black/50 px-4">
//         <View className="bg-white rounded-2xl p-8 w-full max-w-sm">
//           <View className="items-center mb-8">
//             <View className="w-16 h-16 bg-blue-500 rounded-full items-center justify-center mb-4">
//               <Ionicons name="school" size={32} color="white" />
//             </View>
//             <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
//               Welcome to One-Stop Advisor!
//             </Text>
//             <Text className="text-gray-600 text-center">
//               Registration successful! Continue to your dashboard.
//             </Text>
//           </View>
          
//           <TouchableOpacity
//             onPress={handleStudentTypeSelection}
//             className="bg-blue-500 py-4 px-6 rounded-xl"
//             activeOpacity={0.8}
//           >
//             <View className="flex-row items-center justify-center space-x-3">
//               <Ionicons name="school" size={24} color="white" />
//               <Text className="text-white font-semibold text-lg">
//                 Continue to Dashboard
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );

//   const InputField = ({ icon, placeholder, value, onChangeText, secureTextEntry, keyboardType, multiline }) => (
//     <View className="relative mb-4">
//       <View className="absolute left-4 top-4 z-10">
//         <Ionicons name={icon} size={20} color="#616161" />
//       </View>
//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         secureTextEntry={secureTextEntry}
//         keyboardType={keyboardType}
//         multiline={multiline}
//         className="bg-gray-100 border border-gray-300 rounded-xl pl-12 pr-4 py-4 text-gray-800 focus:bg-white focus:border-blue-500"
//         placeholderTextColor="#9E9E9E"
//         editable={!loading}
//       />
//     </View>
//   );

//   const PasswordField = ({ placeholder, value, onChangeText, showPassword, toggleShowPassword }) => (
//     <View className="relative mb-4">
//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         secureTextEntry={!showPassword}
//         className="bg-gray-100 border border-gray-300 rounded-xl pl-4 pr-12 py-4 text-gray-800 focus:bg-white focus:border-blue-500"
//         placeholderTextColor="#9E9E9E"
//         editable={!loading}
//       />
//       <TouchableOpacity
//         onPress={toggleShowPassword}
//         className="absolute right-4 top-4"
//         disabled={loading}
//       >
//         <Ionicons 
//           name={showPassword ? "eye-off" : "eye"} 
//           size={20} 
//           color="#616161" 
//         />
//       </TouchableOpacity>
//     </View>
//   );

//   const StudentTypeOption = ({ value, label, icon, color, isSelected, onSelect }) => (
//     <TouchableOpacity
//       onPress={() => onSelect(value)}
//       className={`flex-row items-center space-x-3 p-4 rounded-xl border-2 mb-3 ${
//         isSelected ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-200'
//       }`}
//       disabled={loading}
//     >
//       <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
//         isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-400'
//       }`}>
//         {isSelected && <View className="w-2 h-2 rounded-full bg-white" />}
//       </View>
//       <Ionicons name={icon} size={20} color={color} />
//       <Text className={`font-medium ${isSelected ? 'text-blue-600' : 'text-gray-800'}`}>
//         {label}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <KeyboardAvoidingView 
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       className="flex-1 bg-gray-50"
//     >
//       <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//         <View className="px-4 py-8">
//           {/* Header */}
//           <View className="items-center mb-8">
//             <View className="w-16 h-16 bg-blue-500 rounded-full items-center justify-center mb-4 shadow-lg">
//               <Ionicons name="school" size={32} color="white" />
//             </View>
//             <Text className="text-4xl font-bold text-gray-800 text-center mb-2">
//               One-Stop Advisor
//             </Text>
//             <Text className="text-lg text-gray-600 text-center">
//               Your academic journey starts here
//             </Text>
//           </View>

//           {/* Error Message */}
//           {error ? (
//             <View className="mb-6 p-4 bg-red-100 border border-red-400 rounded-xl">
//               <Text className="text-red-700 text-center">{error}</Text>
//             </View>
//           ) : null}

//           {/* Toggle Buttons */}
//           <View className="flex-row bg-white rounded-xl p-2 mb-8 shadow-lg">
//             <TouchableOpacity
//               onPress={() => {
//                 setCurrentView('login');
//                 setError('');
//               }}
//               className={`flex-1 py-4 px-6 rounded-lg ${
//                 currentView === 'login' ? 'bg-blue-500' : 'bg-transparent'
//               }`}
//               disabled={loading}
//             >
//               <Text className={`font-semibold text-center ${
//                 currentView === 'login' ? 'text-white' : 'text-gray-600'
//               }`}>
//                 Login
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => {
//                 setCurrentView('signup');
//                 setError('');
//               }}
//               className={`flex-1 py-4 px-6 rounded-lg ${
//                 currentView === 'signup' ? 'bg-blue-500' : 'bg-transparent'
//               }`}
//               disabled={loading}
//             >
//               <Text className={`font-semibold text-center ${
//                 currentView === 'signup' ? 'text-white' : 'text-gray-600'
//               }`}>
//                 Sign Up
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* Login Form */}
//           {currentView === 'login' && (
//             <View className="bg-white rounded-2xl p-8 shadow-xl">
//               <Text className="text-3xl font-bold text-center text-gray-800 mb-8">
//                 Welcome Back!
//               </Text>

//               <InputField
//                 icon="mail"
//                 placeholder="Email address"
//                 value={formData.email}
//                 onChangeText={(value) => handleInputChange('email', value)}
//                 keyboardType="email-address"
//               />

//               <PasswordField
//                 placeholder="Password"
//                 value={formData.password}
//                 onChangeText={(value) => handleInputChange('password', value)}
//                 showPassword={showPassword}
//                 toggleShowPassword={() => setShowPassword(!showPassword)}
//               />
              
//               <TouchableOpacity
//                 onPress={handleLogin}
//                 disabled={loading}
//                 className={`py-4 px-6 rounded-xl shadow-lg ${
//                   loading ? 'bg-gray-400' : 'bg-blue-500'
//                 }`}
//               >
//                 {loading ? (
//                   <View className="flex-row items-center justify-center">
//                     <ActivityIndicator color="white" size="small" />
//                     <Text className="text-white font-semibold ml-2">Logging in...</Text>
//                   </View>
//                 ) : (
//                   <Text className="text-white font-semibold text-center text-lg">Login</Text>
//                 )}
//               </TouchableOpacity>
              
//               <View className="flex-row justify-center mt-8">
//                 <Text className="text-gray-600">Don't have an account? </Text>
//                 <TouchableOpacity
//                   onPress={() => {
//                     setCurrentView('signup');
//                     setError('');
//                   }}
//                   disabled={loading}
//                 >
//                   <Text className="text-blue-500 font-semibold">Sign up here</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}

//           {/* Signup Form */}
//           {currentView === 'signup' && (
//             <View className="bg-white rounded-2xl p-8 shadow-xl">
//               <Text className="text-3xl font-bold text-center text-gray-800 mb-8">
//                 Join Us Today!
//               </Text>

//               {/* Personal Information */}
//               <InputField
//                 icon="person"
//                 placeholder="Full Name"
//                 value={formData.name}
//                 onChangeText={(value) => handleInputChange('name', value)}
//               />

//               <InputField
//                 icon="calendar"
//                 placeholder="Date of Birth (YYYY-MM-DD)"
//                 value={formData.dob}
//                 onChangeText={(value) => handleInputChange('dob', value)}
//               />

//               <InputField
//                 icon="mail"
//                 placeholder="Your Email Address"
//                 value={formData.studentEmail}
//                 onChangeText={(value) => handleInputChange('studentEmail', value)}
//                 keyboardType="email-address"
//               />

//               <InputField
//                 icon="call"
//                 placeholder="Your Phone Number"
//                 value={formData.studentPhone}
//                 onChangeText={(value) => handleInputChange('studentPhone', value)}
//                 keyboardType="phone-pad"
//               />

//               <InputField
//                 icon="call"
//                 placeholder="Parent/Guardian Phone"
//                 value={formData.parentPhone}
//                 onChangeText={(value) => handleInputChange('parentPhone', value)}
//                 keyboardType="phone-pad"
//               />

//               <InputField
//                 icon="school"
//                 placeholder="School/College Name"
//                 value={formData.schoolName}
//                 onChangeText={(value) => handleInputChange('schoolName', value)}
//               />

//               <PasswordField
//                 placeholder="Create Password"
//                 value={formData.password}
//                 onChangeText={(value) => handleInputChange('password', value)}
//                 showPassword={showPassword}
//                 toggleShowPassword={() => setShowPassword(!showPassword)}
//               />

//               <PasswordField
//                 placeholder="Confirm Password"
//                 value={formData.confirmPassword}
//                 onChangeText={(value) => handleInputChange('confirmPassword', value)}
//                 showPassword={showConfirmPassword}
//                 toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
//               />

//               {/* Student Type Selection */}
//               <View className="mb-8">
//                 <View className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
//                   <View className="flex-row items-center mb-4">
//                     <Ionicons name="people" size={20} color="#1E88E5" />
//                     <Text className="font-semibold text-gray-800 ml-2">I am a:</Text>
//                   </View>
                  
//                   <StudentTypeOption
//                     value="10th"
//                     label="10th Student"
//                     icon="book"
//                     color="#1E88E5"
//                     isSelected={formData.studentType === '10th'}
//                     onSelect={(value) => handleInputChange('studentType', value)}
//                   />

//                   <StudentTypeOption
//                     value="12th"
//                     label="12th Student"
//                     icon="school"
//                     color="#FFC107"
//                     isSelected={formData.studentType === '12th'}
//                     onSelect={(value) => handleInputChange('studentType', value)}
//                   />

//                   <StudentTypeOption
//                     value="college"
//                     label="College Student"
//                     icon="library"
//                     color="#4CAF50"
//                     isSelected={formData.studentType === 'college'}
//                     onSelect={(value) => handleInputChange('studentType', value)}
//                   />
//                 </View>
//               </View>

//               <TouchableOpacity
//                 onPress={handleSignup}
//                 disabled={loading}
//                 className={`py-4 px-6 rounded-xl shadow-lg ${
//                   loading ? 'bg-gray-400' : 'bg-blue-500'
//                 }`}
//               >
//                 {loading ? (
//                   <View className="flex-row items-center justify-center">
//                     <ActivityIndicator color="white" size="small" />
//                     <Text className="text-white font-semibold ml-2">Creating Account...</Text>
//                   </View>
//                 ) : (
//                   <Text className="text-white font-semibold text-center text-lg">Create Account</Text>
//                 )}
//               </TouchableOpacity>

//               <View className="flex-row justify-center mt-8">
//                 <Text className="text-gray-600">Already have an account? </Text>
//                 <TouchableOpacity
//                   onPress={() => {
//                     setCurrentView('login');
//                     setError('');
//                   }}
//                   disabled={loading}
//                 >
//                   <Text className="text-blue-500 font-semibold">Login here</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}

//           {/* Footer */}
//           <View className="mt-12">
//             <Text className="text-gray-500 text-xs text-center">
//               Government of Jammu & Kashmir
//             </Text>
//             <Text className="text-gray-500 text-xs text-center">
//               Higher Education Department
//             </Text>
//           </View>
//         </View>
//       </ScrollView>
      
//       <SuccessModal />
//     </KeyboardAvoidingView>
//   );
// }


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator,
//   Modal
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; 
// import { useAuth } from '../contexts/AuthContext';
// import DateTimePicker from '@react-native-community/datetimepicker';


// export default function AuthScreen() {
//   const [currentView, setCurrentView] = useState('login');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   // remove selectedDate state
// // const [selectedDate, setSelectedDate] = useState(new Date());

// // keep dob only inside formData
// const [formData, setFormData] = useState({
//   name: '',
//   dob: '',
//   studentEmail: '',
//   studentPhone: '',
//   parentPhone: '',
//   schoolName: '',
//   studentType: '10th',
//   email: '',
//   password: '',
//   confirmPassword: '',
// });

// const handleDateChange = (event, selectedDate) => {
//   if (Platform.OS === 'android') {
//     setShowDatePicker(false); // close after pick
//   }
//   if (selectedDate) {
//     setFormData(prev => ({
//       ...prev,
//       dob: selectedDate.toISOString().split('T')[0], // store YYYY-MM-DD
//     }));
//   }
// };

// const getDisplayDate = (dob) => {
//   if (!dob) return 'Select Date of Birth';
//   return new Date(dob).toLocaleDateString('en-GB', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric',
//   });
// };

// const calculateAge = (dob) => {
//   if (!dob) return '';
//   const today = new Date();
//   const birthDate = new Date(dob);
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const monthDiff = today.getMonth() - birthDate.getMonth();
//   if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }
//   return age;
// };

// const DatePickerField = () => (
//   <View className="relative mb-4">
//     <TouchableOpacity
//       onPress={() => setShowDatePicker(true)}
//       className="bg-gray-100 border border-gray-300 rounded-xl pl-12 pr-4 py-4 flex-row items-center justify-between"
//       disabled={loading}
//     >
//       <View className="absolute left-4 top-4">
//         <Ionicons name="calendar" size={20} color="#616161" />
//       </View>
//       <Text className={`${formData.dob ? 'text-gray-800' : 'text-gray-500'}`}>
//         {getDisplayDate(formData.dob)}
//       </Text>
//       <Ionicons name="chevron-down" size={20} color="#616161" />
//     </TouchableOpacity>

//     {formData.dob && (
//       <Text className="text-sm text-blue-600 mt-1 ml-2">
//         Age: {calculateAge(formData.dob)} years
//       </Text>
//     )}

//     {showDatePicker && (
//       <DateTimePicker
//         value={formData.dob ? new Date(formData.dob) : new Date()}
//         mode="date"
//         display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//         onChange={handleDateChange}
//         maximumDate={new Date()}
//         minimumDate={new Date(1970, 0, 1)}
//       />
//     )}
//   </View>
// );


//   // const getDisplayDate = (date) => {
//   //   if (!date) return "";
//   //   return new Date(date).toLocaleDateString(); // or custom format
//   // };
//   // const calculateAge = (date) => {
//   //   if (!date) return "";
//   //   const today = new Date();
//   //   const birthDate = new Date(date);
//   //   let age = today.getFullYear() - birthDate.getFullYear();
//   //   const monthDiff = today.getMonth() - birthDate.getMonth();
//   //   if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//   //     age--;
//   //   }
//   //   return age;
//   // };
  
//   // const handleDateChange = (event, selectedDate) => {
//   //   if (Platform.OS === 'ios') {
//   //     setShowDatePicker(false);
//   //   }
//   //   if (selectedDate) {
//   //     setSelectedDate(selectedDate);
//   //     setFormData(prev => ({
//   //       ...prev,
//   //       dob: selectedDate.toISOString().split('T')[0]
//   //     }));
//   //   }
//   // };

//   // const [formData, setFormData] = useState({
//   //   name: '',
//   //   dob: '',
//   //   studentEmail: '',
//   //   studentPhone: '',
//   //   parentPhone: '',
//   //   schoolName: '',
//   //   studentType: '10th',
//   //   email: '',
//   //   password: '',
//   //   confirmPassword: '',
//   // });

//   const { login, signup } = useAuth();

//   const handleInputChange = (name, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user starts typing
//     if (error) setError('');
//   };

//   const handleLogin = async () => {
//     setLoading(true);
//     setError('');
    
//     try {
//       if (!formData.email || !formData.password) {
//         setError('Please fill in all fields');
//         setLoading(false);
//         return;
//       }
      
//       await login(formData.email, formData.password);
//       // Navigation would be handled by the auth context
//     } catch (error) {
//       console.error('Login error:', error);
//       let errorMessage = 'Login failed. Please try again.';
      
//       switch (error.code) {
//         case 'auth/user-not-found':
//           errorMessage = 'No account found with this email.';
//           break;
//         case 'auth/wrong-password':
//           errorMessage = 'Incorrect password.';
//           break;
//         case 'auth/invalid-email':
//           errorMessage = 'Invalid email address.';
//           break;
//         case 'auth/too-many-requests':
//           errorMessage = 'Too many failed attempts. Please try again later.';
//           break;
//         default:
//           errorMessage = error.message || 'Login failed. Please try again.';
//       }
      
//       setError(errorMessage);
//     }
    
//     setLoading(false);
//   };

//   const handleSignup = async () => {
//     setError('');
    
//     // Validation
//     if (!formData.name || !formData.dob || !formData.studentEmail || 
//         !formData.studentPhone || !formData.parentPhone || !formData.schoolName ||
//         !formData.password || !formData.confirmPassword) {
//       setError('Please fill in all fields');
//       return;
//     }
    
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match!');
//       return;
//     }
    
//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return;
//     }
    
//     setLoading(true);
    
//     try {
//       const userData = {
//         name: formData.name,
//         dob: formData.dob,
//         studentEmail: formData.studentEmail,
//         studentPhone: formData.studentPhone,
//         parentPhone: formData.parentPhone,
//         schoolName: formData.schoolName,
//         studentType: formData.studentType
//       };
      
//       await signup(formData.studentEmail, formData.password, userData);
//       setShowModal(true);
//     } catch (error) {
//       console.error('Signup error:', error);
//       let errorMessage = 'Registration failed. Please try again.';
      
//       switch (error.code) {
//         case 'auth/email-already-in-use':
//           errorMessage = 'An account with this email already exists.';
//           break;
//         case 'auth/invalid-email':
//           errorMessage = 'Invalid email address.';
//           break;
//         case 'auth/weak-password':
//           errorMessage = 'Password is too weak. Please choose a stronger password.';
//           break;
//         default:
//           errorMessage = error.message || 'Registration failed. Please try again.';
//       }
      
//       setError(errorMessage);
//     }
    
//     setLoading(false);
//   };

//   const handleStudentTypeSelection = () => {
//     setShowModal(false);
//     // Navigation to dashboard would be handled by auth context
//   };

//   const SuccessModal = () => (
//     <Modal
//       visible={showModal}
//       transparent={true}
//       animationType="slide"
//       onRequestClose={() => setShowModal(false)}
//     >
//       <View className="flex-1 justify-center items-center bg-black/50 px-4">
//         <View className="bg-white rounded-2xl p-8 w-full max-w-sm">
//           <View className="items-center mb-8">
//             <View className="w-16 h-16 bg-blue-500 rounded-full items-center justify-center mb-4">
//               <Ionicons name="school" size={32} color="white" />
//             </View>
//             <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
//               Welcome to One-Stop Advisor!
//             </Text>
//             <Text className="text-gray-600 text-center">
//               Registration successful! Continue to your dashboard.
//             </Text>
//           </View>
          
//           <TouchableOpacity
//             onPress={handleStudentTypeSelection}
//             className="bg-blue-500 py-4 px-6 rounded-xl"
//             activeOpacity={0.8}
//           >
//             <View className="flex-row items-center justify-center space-x-3">
//               <Ionicons name="school" size={24} color="white" />
//               <Text className="text-white font-semibold text-lg">
//                 Continue to Dashboard
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );

//   const InputField = ({ icon, placeholder, value, onChangeText, secureTextEntry, keyboardType, multiline }) => (
//     <View className="relative mb-4">
//       <View className="absolute left-4 top-4 z-10">
//         <Ionicons name={icon} size={20} color="#616161" />
//       </View>
//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         secureTextEntry={secureTextEntry}
//         keyboardType={keyboardType}
//         multiline={multiline}
//         className="bg-gray-100 border border-gray-300 rounded-xl pl-12 pr-4 py-4 text-gray-800 focus:bg-white focus:border-blue-500"
//         placeholderTextColor="#9E9E9E"
//         editable={!loading}
//       />
//     </View>
//   );

//   const PasswordField = ({ placeholder, value, onChangeText, showPassword, toggleShowPassword }) => (
//     <View className="relative mb-4">
//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         secureTextEntry={!showPassword}
//         className="bg-gray-100 border border-gray-300 rounded-xl pl-4 pr-12 py-4 text-gray-800 focus:bg-white focus:border-blue-500"
//         placeholderTextColor="#9E9E9E"
//         editable={!loading}
//       />
//       <TouchableOpacity
//         onPress={toggleShowPassword}
//         className="absolute right-4 top-4"
//         disabled={loading}
//       >
//         <Ionicons 
//           name={showPassword ? "eye-off" : "eye"} 
//           size={20} 
//           color="#616161" 
//         />
//       </TouchableOpacity>
//     </View>
//   );

//   const StudentTypeOption = ({ value, label, icon, color, isSelected, onSelect }) => (
//     <TouchableOpacity
//       onPress={() => onSelect(value)}
//       className={`flex-row items-center space-x-3 p-4 rounded-xl border-2 mb-3 ${
//         isSelected ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-200'
//       }`}
//       disabled={loading}
//     >
//       <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
//         isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-400'
//       }`}>
//         {isSelected && <View className="w-2 h-2 rounded-full bg-white" />}
//       </View>
//       <Ionicons name={icon} size={20} color={color} />
//       <Text className={`font-medium ${isSelected ? 'text-blue-600' : 'text-gray-800'}`}>
//         {label}
//       </Text>
//     </TouchableOpacity>
//   );

//   const DatePickerField = () => (
//     <View className="relative mb-4">
//       <TouchableOpacity
//         onPress={() => setShowDatePicker(true)}
//         className="bg-gray-100 border border-gray-300 rounded-xl pl-12 pr-4 py-4 flex-row items-center justify-between"
//         disabled={loading}
//       >
//         <View className="absolute left-4 top-4">
//           <Ionicons name="calendar" size={20} color="#616161" />
//         </View>
//         <Text className={`${formData.dob ? 'text-gray-800' : 'text-gray-500'}`}>
//           {getDisplayDate(formData.dob)}
//         </Text>
//         <Ionicons name="chevron-down" size={20} color="#616161" />
//       </TouchableOpacity>
      
//       {formData.dob && (
//         <Text className="text-sm text-blue-600 mt-1 ml-2">
//           Age: {calculateAge(formData.dob)} years
//         </Text>
//       )}
      
//       {showDatePicker && (
//         <DateTimePicker
//           value={selectedDate}
//           mode="date"
//           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//           onChange={handleDateChange}
//           maximumDate={new Date()} // Can't select future dates
//           minimumDate={new Date(1970, 0, 1)} // Reasonable minimum date
//           textColor="#000000"
//         />
//       )}
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView 
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       className="flex-1 bg-gray-50"
//     >
//       <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//         <View className="px-4 py-8">
//           {/* Header */}
//           <View className="items-center mb-8">
//             <View className="w-16 h-16 bg-blue-500 rounded-full items-center justify-center mb-4 shadow-lg">
//               <Ionicons name="school" size={32} color="white" />
//             </View>
//             <Text className="text-4xl font-bold text-gray-800 text-center mb-2">
//               One-Stop Advisor
//             </Text>
//             <Text className="text-lg text-gray-600 text-center">
//               Your academic journey starts here
//             </Text>
//           </View>

//           {/* Error Message */}
//           {error ? (
//             <View className="mb-6 p-4 bg-red-100 border border-red-400 rounded-xl">
//               <Text className="text-red-700 text-center">{error}</Text>
//             </View>
//           ) : null}

//           {/* Toggle Buttons */}
//           <View className="flex-row bg-white rounded-xl p-2 mb-8 shadow-lg">
//             <TouchableOpacity
//               onPress={() => {
//                 setCurrentView('login');
//                 setError('');
//               }}
//               className={`flex-1 py-4 px-6 rounded-lg ${
//                 currentView === 'login' ? 'bg-blue-500' : 'bg-transparent'
//               }`}
//               disabled={loading}
//             >
//               <Text className={`font-semibold text-center ${
//                 currentView === 'login' ? 'text-white' : 'text-gray-600'
//               }`}>
//                 Login
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => {
//                 setCurrentView('signup');
//                 setError('');
//               }}
//               className={`flex-1 py-4 px-6 rounded-lg ${
//                 currentView === 'signup' ? 'bg-blue-500' : 'bg-transparent'
//               }`}
//               disabled={loading}
//             >
//               <Text className={`font-semibold text-center ${
//                 currentView === 'signup' ? 'text-white' : 'text-gray-600'
//               }`}>
//                 Sign Up
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* Login Form */}
//           {currentView === 'login' && (
//             <View className="bg-white rounded-2xl p-8 shadow-xl">
//               <Text className="text-3xl font-bold text-center text-gray-800 mb-8">
//                 Welcome Back!
//               </Text>

//               <InputField
//                 icon="mail"
//                 placeholder="Email address"
//                 value={formData.email}
//                 onChangeText={(value) => handleInputChange('email', value)}
//                 keyboardType="email-address"
//               />

//               <PasswordField
//                 placeholder="Password"
//                 value={formData.password}
//                 onChangeText={(value) => handleInputChange('password', value)}
//                 showPassword={showPassword}
//                 toggleShowPassword={() => setShowPassword(!showPassword)}
//               />
              
//               <TouchableOpacity
//                 onPress={handleLogin}
//                 disabled={loading}
//                 className={`py-4 px-6 rounded-xl shadow-lg ${
//                   loading ? 'bg-gray-400' : 'bg-blue-500'
//                 }`}
//               >
//                 {loading ? (
//                   <View className="flex-row items-center justify-center">
//                     <ActivityIndicator color="white" size="small" />
//                     <Text className="text-white font-semibold ml-2">Logging in...</Text>
//                   </View>
//                 ) : (
//                   <Text className="text-white font-semibold text-center text-lg">Login</Text>
//                 )}
//               </TouchableOpacity>
              
//               <View className="flex-row justify-center mt-8">
//                 <Text className="text-gray-600">Don't have an account? </Text>
//                 <TouchableOpacity
//                   onPress={() => {
//                     setCurrentView('signup');
//                     setError('');
//                   }}
//                   disabled={loading}
//                 >
//                   <Text className="text-blue-500 font-semibold">Sign up here</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}

//           {/* Signup Form */}
//           {currentView === 'signup' && (
//             <View className="bg-white rounded-2xl p-8 shadow-xl">
//               <Text className="text-3xl font-bold text-center text-gray-800 mb-8">
//                 Join Us Today!
//               </Text>

//               {/* Personal Information */}
//               <InputField
//                 icon="person"
//                 placeholder="Full Name"
//                 value={formData.name}
//                 onChangeText={(value) => handleInputChange('name', value)}
//               />

//               <DatePickerField />

//               <InputField
//                 icon="mail"
//                 placeholder="Your Email Address"
//                 value={formData.studentEmail}
//                 onChangeText={(value) => handleInputChange('studentEmail', value)}
//                 keyboardType="email-address"
//               />

//               <InputField
//                 icon="call"
//                 placeholder="Your Phone Number"
//                 value={formData.studentPhone}
//                 onChangeText={(value) => handleInputChange('studentPhone', value)}
//                 keyboardType="phone-pad"
//               />

//               <InputField
//                 icon="call"
//                 placeholder="Parent/Guardian Phone"
//                 value={formData.parentPhone}
//                 onChangeText={(value) => handleInputChange('parentPhone', value)}
//                 keyboardType="phone-pad"
//               />

//               <InputField
//                 icon="school"
//                 placeholder="School/College Name"
//                 value={formData.schoolName}
//                 onChangeText={(value) => handleInputChange('schoolName', value)}
//               />

//               <PasswordField
//                 placeholder="Create Password"
//                 value={formData.password}
//                 onChangeText={(value) => handleInputChange('password', value)}
//                 showPassword={showPassword}
//                 toggleShowPassword={() => setShowPassword(!showPassword)}
//               />

//               <PasswordField
//                 placeholder="Confirm Password"
//                 value={formData.confirmPassword}
//                 onChangeText={(value) => handleInputChange('confirmPassword', value)}
//                 showPassword={showConfirmPassword}
//                 toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
//               />

//               {/* Student Type Selection */}
//               <View className="mb-8">
//                 <View className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
//                   <View className="flex-row items-center mb-4">
//                     <Ionicons name="people" size={20} color="#1E88E5" />
//                     <Text className="font-semibold text-gray-800 ml-2">I am a:</Text>
//                   </View>
                  
//                   <StudentTypeOption
//                     value="10th"
//                     label="10th Student"
//                     icon="book"
//                     color="#1E88E5"
//                     isSelected={formData.studentType === '10th'}
//                     onSelect={(value) => handleInputChange('studentType', value)}
//                   />

//                   <StudentTypeOption
//                     value="12th"
//                     label="12th Student"
//                     icon="school"
//                     color="#FFC107"
//                     isSelected={formData.studentType === '12th'}
//                     onSelect={(value) => handleInputChange('studentType', value)}
//                   />

//                   <StudentTypeOption
//                     value="college"
//                     label="College Student"
//                     icon="library"
//                     color="#4CAF50"
//                     isSelected={formData.studentType === 'college'}
//                     onSelect={(value) => handleInputChange('studentType', value)}
//                   />
//                 </View>
//               </View>

//               <TouchableOpacity
//                 onPress={handleSignup}
//                 disabled={loading}
//                 className={`py-4 px-6 rounded-xl shadow-lg ${
//                   loading ? 'bg-gray-400' : 'bg-blue-500'
//                 }`}
//               >
//                 {loading ? (
//                   <View className="flex-row items-center justify-center">
//                     <ActivityIndicator color="white" size="small" />
//                     <Text className="text-white font-semibold ml-2">Creating Account...</Text>
//                   </View>
//                 ) : (
//                   <Text className="text-white font-semibold text-center text-lg">Create Account</Text>
//                 )}
//               </TouchableOpacity>

//               <View className="flex-row justify-center mt-8">
//                 <Text className="text-gray-600">Already have an account? </Text>
//                 <TouchableOpacity
//                   onPress={() => {
//                     setCurrentView('login');
//                     setError('');
//                   }}
//                   disabled={loading}
//                 >
//                   <Text className="text-blue-500 font-semibold">Login here</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}

//           {/* Footer */}
//           <View className="mt-12">
//             <Text className="text-gray-500 text-xs text-center">
//               Government of Jammu & Kashmir
//             </Text>
//             <Text className="text-gray-500 text-xs text-center">
//               Higher Education Department
//             </Text>
//           </View>
//         </View>
//       </ScrollView>
      
//       <SuccessModal />
//     </KeyboardAvoidingView>
//   );
// }




import React, { useState } from 'react';
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
      console.error('Login error:', err);
      let errorMessage = 'Login failed. Please try again.';
      switch (err.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        default:
          errorMessage = err.message || errorMessage;
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
      setShowModal(true);
    } catch (err) {
      console.error('Signup error:', err);
      let errorMessage = 'Registration failed. Please try again.';
      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please choose a stronger password.';
          break;
        default:
          errorMessage = err.message || errorMessage;
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
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
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
            <View className="mb-6 p-4 bg-red-100 border border-red-400 rounded-xl">
              <Text className="text-red-700 text-center">{error}</Text>
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
                Registration successful! Continue to your dashboard.
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
                  Continue to Dashboard
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}