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

export default function CollegesScreen() {
  const colleges = [
    {
      name: 'University of Kashmir',
      location: 'Srinagar',
      type: 'State University',
      courses: ['Arts', 'Science', 'Commerce', 'Management'],
      rating: '4.2/5'
    },
    {
      name: 'University of Jammu',
      location: 'Jammu',
      type: 'State University', 
      courses: ['Engineering', 'Arts', 'Science', 'Law'],
      rating: '4.1/5'
    },
    {
      name: 'SMVD University',
      location: 'Katra',
      type: 'State University',
      courses: ['Engineering', 'Management', 'Pharmacy'],
      rating: '4.0/5'
    },
    {
      name: 'Central University of Kashmir',
      location: 'Ganderbal',
      type: 'Central University',
      courses: ['Arts', 'Science', 'Social Sciences'],
      rating: '4.3/5'
    },
    {
      name: 'NIT Srinagar',
      location: 'Srinagar',
      type: 'National Institute',
      courses: ['Engineering', 'Technology'],
      rating: '4.5/5'
    },
    {
      name: 'Government Medical College',
      location: 'Srinagar',
      type: 'Medical College',
      courses: ['Medicine', 'Nursing', 'Paramedical'],
      rating: '4.2/5'
    }
  ];

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style="auto" />
      


      <ScrollView className='flex-1' contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Header */}
        <View className='px-6 py-8 bg-emerald-500'>
          <Text className='text-white text-3xl font-extrabold mb-2'>
            Career Map
          </Text>
          <Text className='text-emerald-100 text-base'>
            Discover career paths, colleges, and opportunities
          </Text>
        </View>

        {/* Filter Options */}
        <View className='px-6 mt-6'>
          <Text className='text-lg font-bold mb-3'>Explore by Field</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['All', 'Technology', 'Medical', 'Business', 'Arts & Design', 'Science'].map((filter) => (
              <TouchableOpacity
                key={filter}
                className='bg-emerald-100 border border-emerald-300 px-4 py-2 rounded-lg mr-3'
              >
                <Text className='text-emerald-700 font-medium'>{filter}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Colleges List */}
        <View className='px-6 mt-6'>
          <Text className='text-lg font-bold mb-4'>Colleges Near You</Text>
          {colleges.map((college, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => Alert.alert(college.name, `More details about ${college.name}`)}
              className='bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm'
            >
              <View className='flex-row justify-between items-start mb-2'>
                <Text className='text-lg font-bold flex-1 mr-2'>{college.name}</Text>
                <View className='bg-green-100 px-2 py-1 rounded'>
                  <Text className='text-green-700 text-xs font-semibold'>{college.rating}</Text>
                </View>
              </View>
              
              <Text className='text-gray-600 text-sm mb-1'>📍 {college.location}</Text>
              <Text className='text-gray-600 text-sm mb-3'>🏛️ {college.type}</Text>
              
              <View className='flex-row flex-wrap'>
                {college.courses.map((course, courseIndex) => (
                  <View key={courseIndex} className='bg-gray-100 px-2 py-1 rounded mr-2 mb-1'>
                    <Text className='text-gray-700 text-xs'>{course}</Text>
                  </View>
                ))}
              </View>
              
              <View className='mt-3 flex-row justify-between'>
                <TouchableOpacity className='bg-amber-500 px-3 py-2 rounded-lg'>
                  <Text className='text-white text-sm font-semibold'>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity className='bg-gray-200 px-3 py-2 rounded-lg'>
                  <Text className='text-gray-700 text-sm font-semibold'>Get Directions</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View className='px-6 mt-6'>
          <View className='bg-blue-500 rounded-xl p-5'>
            <Text className='text-white text-lg font-bold mb-2'>Need Help Choosing?</Text>
            <Text className='text-blue-100 text-sm mb-4'>
              Get personalized college recommendations based on your interests and academic performance
            </Text>
            <TouchableOpacity
              onPress={() => Alert.alert('College Advisor', 'Connecting you with our college advisor...')}
              className='bg-white px-4 py-3 rounded-lg self-start'
            >
              <Text className='text-blue-700 font-semibold'>Talk to Advisor</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 