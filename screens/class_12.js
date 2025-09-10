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
  responsiveFont 
} from '../utils/responsive';

export default function Class12Screen({ onNavigate }) {
  const onPrimaryCta = () => {
    Alert.alert('College Applications', 'Opening college application portal...');
  };

  const onSecondaryCta = () => {
    Alert.alert('Entrance Exams', 'Showing available entrance exams...');
  };

  const onAptitudeTest = () => {
    if (onNavigate) {
      onNavigate('aptitude');
    } else {
      Alert.alert('Aptitude Test', 'Launching the stream selection aptitude test...');
    }
  };

  const containerPadding = getContainerPadding();

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
          className='bg-sky-500'
          style={{ 
            paddingHorizontal: containerPadding, 
            paddingVertical: isTablet() ? 40 : 32 
          }}
        >
          <Text 
            className='text-white font-extrabold mb-2'
            style={{ fontSize: isTablet() ? 36 : isLargePhone() ? 32 : 28 }}
          >
            Class 12 - College Guidance
          </Text>
          <Text 
            className='text-sky-100'
            style={{ fontSize: isTablet() ? 18 : 16 }}
          >
            Discover the best colleges and courses for your future career
          </Text>
        </View>

        {/* Action Buttons */}
        <View 
          className={`mt-6 ${isTablet() ? 'flex-row justify-center' : 'flex-row'}`}
          style={{ paddingHorizontal: containerPadding }}
        >
          <TouchableOpacity
            onPress={onPrimaryCta}
            className={`${isTablet() ? 'mx-2' : 'flex-1 mr-3'} bg-sky-500 rounded-xl`}
            style={{ 
              paddingHorizontal: isTablet() ? 32 : 16,
              paddingVertical: isTablet() ? 16 : 16,
              minHeight: isTablet() ? 56 : 48,
              minWidth: isTablet() ? 180 : 'auto'
            }}
          >
            <Text 
              className='text-white font-semibold text-center'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              Apply to Colleges
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSecondaryCta}
            className={`${isTablet() ? 'mx-2' : 'flex-1'} bg-orange-500 rounded-xl`}
            style={{ 
              paddingHorizontal: isTablet() ? 32 : 16,
              paddingVertical: isTablet() ? 16 : 16,
              minHeight: isTablet() ? 56 : 48,
              minWidth: isTablet() ? 180 : 'auto'
            }}
          >
            <Text 
              className='text-white font-semibold text-center'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              Entrance Exams
            </Text>
          </TouchableOpacity>
        </View>

        {/* Aptitude Test Section */}
        <View style={{ paddingHorizontal: containerPadding, marginTop: isTablet() ? 24 : 20 }}>
          <TouchableOpacity
            onPress={onAptitudeTest}
            className='bg-purple-500 rounded-xl border-2 border-purple-300'
            style={{ 
              paddingHorizontal: isTablet() ? 24 : 16,
              paddingVertical: isTablet() ? 20 : 16,
              minHeight: isTablet() ? 64 : 56
            }}
          >
            <View className='flex-row items-center justify-center'>
              <Text 
                className='text-white font-bold text-center mr-2'
                style={{ fontSize: isTablet() ? 18 : 16 }}
              >
                🧠 Take Stream Selection Test
              </Text>
            </View>
            <Text 
              className='text-purple-100 text-center mt-1'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              AI-powered aptitude test to find your ideal college stream
            </Text>
          </TouchableOpacity>
        </View>

        {/* Popular Courses */}
        <View style={{ paddingHorizontal: containerPadding, marginTop: isTablet() ? 40 : 32 }}>
          <Text 
            className='font-extrabold mb-4'
            style={{ fontSize: isTablet() ? 24 : 20 }}
          >
            Popular Courses
          </Text>
          <View className={`${isTablet() ? 'flex-row flex-wrap -mx-2' : 'space-y-3'}`}>
            {[
              { name: 'Engineering', desc: 'B.Tech, B.E in various specializations', color: 'bg-blue-50 border-blue-200' },
              { name: 'Medical', desc: 'MBBS, BDS, Nursing, Pharmacy', color: 'bg-red-50 border-red-200' },
              { name: 'Commerce', desc: 'B.Com, BBA, CA, CS', color: 'bg-green-50 border-green-200' },
              { name: 'Arts & Humanities', desc: 'B.A, B.Sc, Social Sciences', color: 'bg-purple-50 border-purple-200' },
            ].map((course) => (
              <TouchableOpacity 
                key={course.name}
                className={`border ${course.color} rounded-xl ${
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
                  {course.name}
                </Text>
                <Text 
                  className='text-gray-600 mt-1'
                  style={{ fontSize: isTablet() ? 15 : 14 }}
                >
                  {course.desc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Important Dates */}
        <View style={{ paddingHorizontal: containerPadding, marginTop: isTablet() ? 40 : 32 }}>
          <Text 
            className='font-extrabold mb-4'
            style={{ fontSize: isTablet() ? 24 : 20 }}
          >
            Important Dates
          </Text>
          <View 
            className='bg-amber-50 border border-amber-200 rounded-xl'
            style={{ padding: isTablet() ? 24 : 16 }}
          >
            <Text 
              className='font-semibold text-amber-800'
              style={{ fontSize: isTablet() ? 18 : 16 }}
            >
              Admission Timeline 2024-25
            </Text>
            <View className={`mt-3 ${isTablet() ? 'space-y-3' : 'space-y-2'}`}>
              <Text 
                className='text-amber-700'
                style={{ fontSize: isTablet() ? 15 : 14 }}
              >
                • Application Forms: March - May
              </Text>
              <Text 
                className='text-amber-700'
                style={{ fontSize: isTablet() ? 15 : 14 }}
              >
                • Entrance Exams: April - June
              </Text>
              <Text 
                className='text-amber-700'
                style={{ fontSize: isTablet() ? 15 : 14 }}
              >
                • Merit Lists: June - July
              </Text>
              <Text 
                className='text-amber-700'
                style={{ fontSize: isTablet() ? 15 : 14 }}
              >
                • Admissions: July - August
              </Text>
            </View>
          </View>
        </View>

        {/* Scholarship Info */}
        <View style={{ paddingHorizontal: containerPadding, marginTop: isTablet() ? 40 : 32 }}>
          <View 
            className='bg-emerald-500 rounded-xl'
            style={{ padding: isTablet() ? 28 : 20 }}
          >
            <Text 
              className='text-white font-bold'
              style={{ fontSize: isTablet() ? 22 : 18 }}
            >
              Scholarship Opportunities
            </Text>
            <Text 
              className='text-emerald-100 mt-1'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              Get financial assistance for your education through various government schemes
            </Text>
            <TouchableOpacity
              onPress={() => Alert.alert('Scholarships', 'Opening scholarship portal...')}
              className={`bg-white mt-3 rounded-lg ${isTablet() ? 'self-start' : 'self-start'}`}
              style={{ 
                paddingHorizontal: isTablet() ? 24 : 16,
                paddingVertical: isTablet() ? 12 : 8,
                minHeight: isTablet() ? 48 : 40
              }}
            >
              <Text 
                className='text-emerald-700 font-semibold'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                View Scholarships
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 