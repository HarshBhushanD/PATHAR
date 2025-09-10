import { StatusBar } from 'expo-status-bar';
import '../global.css';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { 
  wp, 
  hp, 
  isTablet, 
  isLargePhone, 
  getContainerPadding,
  getButtonHeight 
} from '../utils/responsive';

export default function CollegeStudentScreen() {
  const onPrimaryCta = () => {
    Alert.alert('Career Guidance', 'Opening career guidance portal...');
  };

  const onSecondaryCta = () => {
    Alert.alert('Industry Connections', 'Connecting with industry professionals...');
  };

  const containerPadding = getContainerPadding();
  const buttonHeight = getButtonHeight();

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style="auto" />

      <ScrollView 
        className='flex-1' 
        contentContainerStyle={{ paddingBottom: isTablet() ? 48 : 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View 
          className='bg-purple-500'
          style={{ 
            paddingHorizontal: containerPadding, 
            paddingVertical: isTablet() ? 40 : 32 
          }}
        >
          <Text 
            className='text-white font-extrabold mb-2'
            style={{ fontSize: isTablet() ? 36 : isLargePhone() ? 32 : 28 }}
          >
            College Student - Career Hub
          </Text>
          <Text 
            className='text-purple-100'
            style={{ fontSize: isTablet() ? 18 : 16 }}
          >
            Navigate your career path and industry connections
          </Text>
        </View>

        {/* Action Buttons */}
        <View 
          className={`mt-6 ${isTablet() ? 'flex-row justify-center' : 'flex-row'}`}
          style={{ paddingHorizontal: containerPadding }}
        >
          <TouchableOpacity
            onPress={onPrimaryCta}
            className={`${isTablet() ? 'mx-2' : 'flex-1 mr-3'} bg-purple-500 rounded-xl`}
            style={{ 
              paddingHorizontal: isTablet() ? 32 : 16,
              paddingVertical: isTablet() ? 16 : 16,
              minHeight: buttonHeight,
              minWidth: isTablet() ? 180 : 'auto'
            }}
          >
            <Text 
              className='text-white font-semibold text-center'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              Career Guidance
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSecondaryCta}
            className={`${isTablet() ? 'mx-2' : 'flex-1'} bg-green-500 rounded-xl`}
            style={{ 
              paddingHorizontal: isTablet() ? 32 : 16,
              paddingVertical: isTablet() ? 16 : 16,
              minHeight: buttonHeight,
              minWidth: isTablet() ? 180 : 'auto'
            }}
          >
            <Text 
              className='text-white font-semibold text-center'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              Industry Connect
            </Text>
          </TouchableOpacity>
        </View>

        {/* Career Options */}
        <View style={{ paddingHorizontal: containerPadding, marginTop: isTablet() ? 40 : 32 }}>
          <Text 
            className='font-extrabold mb-4'
            style={{ fontSize: isTablet() ? 24 : 20 }}
          >
            Career Opportunities
          </Text>
          <View className={`${isTablet() ? 'flex-row flex-wrap -mx-2' : 'space-y-3'}`}>
            {[
              { name: 'Technology', desc: 'Software Development, Data Science, AI/ML', color: 'bg-blue-50 border-blue-200' },
              { name: 'Finance', desc: 'Banking, Investment, Financial Analysis', color: 'bg-green-50 border-green-200' },
              { name: 'Consulting', desc: 'Management, Strategy, Business Analysis', color: 'bg-purple-50 border-purple-200' },
              { name: 'Healthcare', desc: 'Medical Research, Healthcare Management', color: 'bg-red-50 border-red-200' },
            ].map((career) => (
              <TouchableOpacity 
                key={career.name}
                className={`border ${career.color} rounded-xl ${
                  isTablet() ? 'w-1/2 px-2 mb-4' : 'mb-3'
                }`}
                style={{ 
                  padding: isTablet() ? 20 : 16,
                }}
              >
                <Text 
                  className='font-bold'
                  style={{ fontSize: isTablet() ? 20 : 18 }}
                >
                  {career.name}
                </Text>
                <Text 
                  className='text-gray-600 mt-1'
                  style={{ fontSize: isTablet() ? 15 : 14 }}
                >
                  {career.desc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Skill Development */}
        <View style={{ paddingHorizontal: containerPadding, marginTop: isTablet() ? 40 : 32 }}>
          <Text 
            className='font-extrabold mb-4'
            style={{ fontSize: isTablet() ? 24 : 20 }}
          >
            Skill Development
          </Text>
          <View 
            className='bg-blue-50 border border-blue-200 rounded-xl'
            style={{ padding: isTablet() ? 24 : 16 }}
          >
            <Text 
              className='font-semibold text-blue-800'
              style={{ fontSize: isTablet() ? 18 : 16 }}
            >
              Professional Development Programs
            </Text>
            <View className={`mt-3 ${isTablet() ? 'space-y-3' : 'space-y-2'}`}>
              <Text 
                className='text-blue-700'
                style={{ fontSize: isTablet() ? 15 : 14 }}
              >
                • Technical Certifications & Online Courses
              </Text>
              <Text 
                className='text-blue-700'
                style={{ fontSize: isTablet() ? 15 : 14 }}
              >
                • Leadership & Communication Skills
              </Text>
              <Text 
                className='text-blue-700'
                style={{ fontSize: isTablet() ? 15 : 14 }}
              >
                • Industry-Specific Training Programs
              </Text>
              <Text 
                className='text-blue-700'
                style={{ fontSize: isTablet() ? 15 : 14 }}
              >
                • Internship & Job Placement Support
              </Text>
            </View>
          </View>
        </View>

        {/* Industry Connections */}
        <View style={{ paddingHorizontal: containerPadding, marginTop: isTablet() ? 40 : 32 }}>
          <View 
            className='bg-green-500 rounded-xl'
            style={{ padding: isTablet() ? 28 : 20 }}
          >
            <Text 
              className='text-white font-bold'
              style={{ fontSize: isTablet() ? 22 : 18 }}
            >
              Connect with Industry Professionals
            </Text>
            <Text 
              className='text-green-100 mt-1'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              Network with professionals, get mentorship, and explore job opportunities in your field
            </Text>
            <View className={`mt-4 ${isTablet() ? 'flex-row space-x-3' : 'space-y-3'}`}>
              <TouchableOpacity
                onPress={() => Alert.alert('Mentorship', 'Finding mentors in your field...')}
                className={`bg-white rounded-lg ${isTablet() ? 'flex-1' : 'w-full'}`}
                style={{ 
                  paddingHorizontal: isTablet() ? 20 : 16,
                  paddingVertical: isTablet() ? 12 : 10,
                  minHeight: isTablet() ? 48 : 40
                }}
              >
                <Text 
                  className='text-green-700 font-semibold text-center'
                  style={{ fontSize: isTablet() ? 16 : 14 }}
                >
                  Find Mentors
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Alert.alert('Job Portal', 'Opening job opportunities...')}
                className={`bg-white rounded-lg ${isTablet() ? 'flex-1' : 'w-full'}`}
                style={{ 
                  paddingHorizontal: isTablet() ? 20 : 16,
                  paddingVertical: isTablet() ? 12 : 10,
                  minHeight: isTablet() ? 48 : 40
                }}
              >
                <Text 
                  className='text-green-700 font-semibold text-center'
                  style={{ fontSize: isTablet() ? 16 : 14 }}
                >
                  Job Opportunities
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
