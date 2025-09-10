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

export default function CollegeStudentScreen() {
  const onPrimaryCta = () => {
    Alert.alert('Career Guidance', 'Opening career guidance portal...');
  };

  const onSecondaryCta = () => {
    Alert.alert('Industry Connections', 'Connecting with industry professionals...');
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style="auto" />

      <ScrollView className='flex-1' contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Header */}
        <View className='px-6 py-8 bg-purple-500'>
          <Text className='text-white text-3xl font-extrabold mb-2'>
            College Student - Career Hub
          </Text>
          <Text className='text-purple-100 text-base'>
            Navigate your career path and industry connections
          </Text>
        </View>

        {/* Action Buttons */}
        <View className='px-6 mt-6 flex-row space-x-3'>
          <TouchableOpacity
            onPress={onPrimaryCta}
            className='flex-1 bg-purple-500 py-4 px-4 rounded-xl'
          >
            <Text className='text-white font-semibold text-center'>Career Guidance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSecondaryCta}
            className='flex-1 bg-green-500 py-4 px-4 rounded-xl'
          >
            <Text className='text-white font-semibold text-center'>Industry Connect</Text>
          </TouchableOpacity>
        </View>

        {/* Career Options */}
        <View className='px-6 mt-8'>
          <Text className='text-xl font-extrabold mb-4'>Career Opportunities</Text>
          <View className='space-y-3'>
            {[
              { name: 'Technology', desc: 'Software Development, Data Science, AI/ML', color: 'bg-blue-50 border-blue-200' },
              { name: 'Finance', desc: 'Banking, Investment, Financial Analysis', color: 'bg-green-50 border-green-200' },
              { name: 'Consulting', desc: 'Management, Strategy, Business Analysis', color: 'bg-purple-50 border-purple-200' },
              { name: 'Public Service', desc: 'Civil Services, Administrative roles', color: 'bg-orange-50 border-orange-200' },
            ].map((career) => (
              <TouchableOpacity 
                key={career.name}
                className={`p-4 rounded-xl border ${career.color}`}
              >
                <Text className='font-bold text-lg'>{career.name}</Text>
                <Text className='text-gray-600 text-sm mt-1'>{career.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Skill Development */}
        <View className='px-6 mt-8'>
          <Text className='text-xl font-extrabold mb-4'>Skill Development</Text>
          <View className='bg-indigo-50 border border-indigo-200 rounded-xl p-4'>
            <Text className='font-semibold text-indigo-800'>Professional Skills Program</Text>
            <View className='mt-3 space-y-2'>
              <Text className='text-sm text-indigo-700'>• Communication & Leadership</Text>
              <Text className='text-sm text-indigo-700'>• Industry-specific Training</Text>
              <Text className='text-sm text-indigo-700'>• Internship Opportunities</Text>
              <Text className='text-sm text-indigo-700'>• Placement Assistance</Text>
            </View>
          </View>
        </View>

        {/* Resources */}
        <View className='px-6 mt-8'>
          <View className='bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-5'>
            <Text className='text-white text-lg font-bold'>Career Resources</Text>
            <Text className='text-purple-100 mt-1 text-sm'>
              Access resume building tools, interview preparation, and industry insights
            </Text>
            <TouchableOpacity
              onPress={() => Alert.alert('Resources', 'Opening career resources...')}
              className='bg-white mt-3 px-4 py-2 rounded-lg self-start'
            >
              <Text className='text-purple-700 font-semibold'>Explore Resources</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
