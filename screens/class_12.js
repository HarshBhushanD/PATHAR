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

export default function Class12Screen({ onBack }) {
  const onPrimaryCta = () => {
    Alert.alert('College Applications', 'Opening college application portal...');
  };

  const onSecondaryCta = () => {
    Alert.alert('Entrance Exams', 'Showing available entrance exams...');
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style="auto" />
      
      {/* Back Button */}
      <View className='px-6 pt-4 pb-2'>
        <TouchableOpacity
          onPress={onBack}
          className='bg-gray-100 px-4 py-2 rounded-lg self-start flex-row items-center'
        >
          <Text className='text-gray-700 font-semibold'>← Back to Home</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className='flex-1' contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Header */}
        <View className='px-6 py-8 bg-sky-500'>
          <Text className='text-white text-3xl font-extrabold mb-2'>
            Class 12 - College Guidance
          </Text>
          <Text className='text-sky-100 text-base'>
            Discover the best colleges and courses for your future career
          </Text>
        </View>

        {/* Action Buttons */}
        <View className='px-6 mt-6 flex-row space-x-3'>
          <TouchableOpacity
            onPress={onPrimaryCta}
            className='flex-1 bg-sky-500 py-4 px-4 rounded-xl'
          >
            <Text className='text-white font-semibold text-center'>Apply to Colleges</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSecondaryCta}
            className='flex-1 bg-orange-500 py-4 px-4 rounded-xl'
          >
            <Text className='text-white font-semibold text-center'>Entrance Exams</Text>
          </TouchableOpacity>
        </View>

        {/* Popular Courses */}
        <View className='px-6 mt-8'>
          <Text className='text-xl font-extrabold mb-4'>Popular Courses</Text>
          <View className='space-y-3'>
            {[
              { name: 'Engineering', desc: 'B.Tech, B.E in various specializations', color: 'bg-blue-50 border-blue-200' },
              { name: 'Medical', desc: 'MBBS, BDS, Nursing, Pharmacy', color: 'bg-red-50 border-red-200' },
              { name: 'Commerce', desc: 'B.Com, BBA, CA, CS', color: 'bg-green-50 border-green-200' },
              { name: 'Arts & Humanities', desc: 'B.A, B.Sc, Social Sciences', color: 'bg-purple-50 border-purple-200' },
            ].map((course) => (
              <TouchableOpacity 
                key={course.name}
                className={`p-4 rounded-xl border ${course.color}`}
              >
                <Text className='font-bold text-lg'>{course.name}</Text>
                <Text className='text-gray-600 text-sm mt-1'>{course.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Important Dates */}
        <View className='px-6 mt-8'>
          <Text className='text-xl font-extrabold mb-4'>Important Dates</Text>
          <View className='bg-amber-50 border border-amber-200 rounded-xl p-4'>
            <Text className='font-semibold text-amber-800'>Admission Timeline 2024-25</Text>
            <View className='mt-3 space-y-2'>
              <Text className='text-sm text-amber-700'>• Application Forms: March - May</Text>
              <Text className='text-sm text-amber-700'>• Entrance Exams: April - June</Text>
              <Text className='text-sm text-amber-700'>• Merit Lists: June - July</Text>
              <Text className='text-sm text-amber-700'>• Admissions: July - August</Text>
            </View>
          </View>
        </View>

        {/* Scholarship Info */}
        <View className='px-6 mt-8'>
          <View className='bg-emerald-500 rounded-xl p-5'>
            <Text className='text-white text-lg font-bold'>Scholarship Opportunities</Text>
            <Text className='text-emerald-100 mt-1 text-sm'>
              Get financial assistance for your education through various government schemes
            </Text>
            <TouchableOpacity
              onPress={() => Alert.alert('Scholarships', 'Opening scholarship portal...')}
              className='bg-white mt-3 px-4 py-2 rounded-lg self-start'
            >
              <Text className='text-emerald-700 font-semibold'>View Scholarships</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 