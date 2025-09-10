import { StatusBar } from 'expo-status-bar';
import '../global.css';
import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function Class10Screen() {
  const { user } = useAuth();

  const onPrimaryCta = () => {
    Alert.alert('Aptitude Quiz', 'Launching the interest & aptitude quiz...');
  };

  const onSecondaryCta = () => {
    Alert.alert('Nearby Colleges', 'Showing government colleges near you...');
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style="light" />

      <ScrollView className='flex-1' contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Hero Section */}
        <View className='relative'>
          <ImageBackground
            source={require('../assets/splash-icon.png')}
            resizeMode='cover'
            className='w-full'
            style={{ height: 280 }}
          >
            <View className='absolute inset-0 bg-black/40' />
            <View className='px-6 pt-10'>
              <View className='flex-row items-center'>
                <Image source={require('../assets/icon.png')} className='w-10 h-10 rounded-lg mr-3' />
                <Text className='text-white text-2xl font-extrabold tracking-tight'>
                  PATHAR - Class 10
                </Text>
              </View>
              <View className='mt-6'>
                <Text className='text-white text-3xl font-extrabold leading-tight'>
                  Your Career Journey Starts Here
                </Text>
                <Text className='text-white/90 mt-2 text-base'>
                  Explore streams and career paths after completing Class 10 in Jammu & Kashmir.
                </Text>
              </View>
              <View className='mt-5 flex-row'>
                <TouchableOpacity
                  onPress={onPrimaryCta}
                  className='bg-emerald-500 px-4 py-3 rounded-xl mr-3 shadow-lg shadow-emerald-800/30'
                >
                  <Text className='text-white font-semibold'>Start Aptitude Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onSecondaryCta}
                  className='bg-white/90 px-4 py-3 rounded-xl'
                >
                  <Text className='text-emerald-700 font-semibold'>Colleges Near Me</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Impact badges */}
        <View className='px-6 -mt-6'>
          <View className='bg-white rounded-2xl p-4 shadow-md shadow-black/10 border border-black/5'>
            <View className='flex-row justify-between'>
              <View className='items-center flex-1'>
                <Text className='text-2xl font-extrabold text-emerald-600'>↑</Text>
                <Text className='text-base font-semibold'>Enrollment</Text>
                <Text className='text-xs text-gray-500'>Informed choices</Text>
              </View>
              <View className='w-px bg-gray-200 mx-3' />
              <View className='items-center flex-1'>
                <Text className='text-2xl font-extrabold text-emerald-600'>✓</Text>
                <Text className='text-base font-semibold'>Retention</Text>
                <Text className='text-xs text-gray-500'>Fewer dropouts</Text>
              </View>
              <View className='w-px bg-gray-200 mx-3' />
              <View className='items-center flex-1'>
                <Text className='text-2xl font-extrabold text-emerald-600'>🎯</Text>
                <Text className='text-base font-semibold'>Outcomes</Text>
                <Text className='text-xs text-gray-500'>Career‑aligned</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Features grid */}
        <View className='px-6 mt-8'>
          <Text className='text-xl font-extrabold'>Explore Features</Text>
          <View className='mt-4 flex-row flex-wrap -mx-2'>
            <FeatureCard
              emoji='🧭'
              title='Aptitude & Interest'
              subtitle='Short quiz to discover the right stream'
              color='bg-emerald-50'
            />
            <FeatureCard
              emoji='🗺️'
              title='Course → Career Map'
              subtitle='See jobs, exams, higher studies for each degree'
              color='bg-sky-50'
            />
            <FeatureCard
              emoji='🏫'
              title='Nearby Govt. Colleges'
              subtitle='Programs, cut‑offs, facilities, medium'
              color='bg-amber-50'
            />
            <FeatureCard
              emoji='⏰'
              title='Timeline Tracker'
              subtitle='Admissions, scholarships, tests — never miss a date'
              color='bg-rose-50'
            />
          </View>
        </View>

        {/* Quick actions */}
        <View className='px-6 mt-6'>
          <View className='bg-gray-900 rounded-2xl p-5'>
            <Text className='text-white text-lg font-bold'>Get Personalized Recommendations</Text>
            <Text className='text-white/80 mt-1 text-sm'>
              Create your profile to unlock tailored courses, colleges, and study materials.
            </Text>
            <View className='mt-4 flex-row'>
              <TouchableOpacity onPress={() => Alert.alert('Create Profile')}
                className='bg-white px-4 py-3 rounded-xl mr-3'>
                <Text className='text-gray-900 font-semibold'>Create Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Alert.alert('Sign In')}
                className='bg-transparent border border-white/40 px-4 py-3 rounded-xl'>
                <Text className='text-white font-semibold'>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Streams carousel (chips) */}
        <View className='mt-6'>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className='px-6'>
            {[
              { label: 'Science', desc: 'Physics, Chemistry, Biology/Math' },
              { label: 'Commerce', desc: 'Accounts, Economics, Business Studies' },
              { label: 'Arts', desc: 'History, Geography, Political Science' },
              { label: 'Vocational', desc: 'Skill‑based programs' },
            ].map((item) => (
              <View key={item.label} className='mr-3'>
                <View className='bg-white border border-gray-200 rounded-2xl px-4 py-3'>
                  <Text className='font-semibold'>{item.label}</Text>
                  <Text className='text-xs text-gray-500 mt-0.5'>{item.desc}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Footer */}
        <View className='px-6 mt-8 mb-4'>
          <Text className='text-gray-700 font-semibold'>
            Government of Jammu & Kashmir — Higher Education Department
          </Text>
          <Text className='text-gray-500 text-sm mt-1'>
            Smart Education Initiative • Digital Guidance Platform
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeatureCard({ emoji, title, subtitle, color }) {
  return (
    <View className='w-1/2 px-2 mb-4'>
      <View className={`rounded-2xl p-4 ${color} border border-black/5`}>
        <Text className='text-2xl'>{emoji}</Text>
        <Text className='mt-2 font-bold'>{title}</Text>
        <Text className='text-xs text-gray-600 mt-1'>{subtitle}</Text>
      </View>
    </View>
  );
}
