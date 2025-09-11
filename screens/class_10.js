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
import { 
  wp, 
  hp, 
  isTablet, 
  isLargePhone, 
  getContainerPadding, 
  getHeroHeight,
  responsiveFont 
} from '../utils/responsive';

export default function Class10Screen({ onNavigate }) {
  const { user } = useAuth();

  const onPrimaryCta = () => {
    if (onNavigate) {
      onNavigate('aptitude');
    } else {
      Alert.alert('Aptitude Quiz', 'Launching the interest & aptitude quiz...');
    }
  };

  const onSecondaryCta = () => {
    Alert.alert('Nearby Colleges', 'Showing government colleges near you...');
  };

  const containerPadding = getContainerPadding();
  const heroHeight = getHeroHeight();

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style="light" />

      <ScrollView 
        className='flex-1' 
        contentContainerStyle={{ paddingBottom: isTablet() ? 48 : 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View className='relative'>
          <ImageBackground
            source={require('../assets/splash-icon.png')}
            resizeMode='cover'
            className='w-full'
            style={{ height: heroHeight }}
          >
            <View className='absolute inset-0 bg-black/40' />
            <View style={{ paddingHorizontal: containerPadding, paddingTop: isTablet() ? 60 : 40 }}>
              <View className='flex-row items-center'>
                <Image 
                  source={require('../assets/icon.png')} 
                  className={`${isTablet() ? 'w-12 h-12' : 'w-10 h-10'} rounded-lg mr-3`} 
                />
                <Text 
                  className='text-white font-extrabold tracking-tight'
                  style={{ fontSize: isTablet() ? 28 : isLargePhone() ? 24 : 20 }}
                >
                  PATHAR - Class 10
                </Text>
              </View>
              <View className={`${isTablet() ? 'mt-8' : 'mt-5'} ${isTablet() ? 'flex-row' : 'flex-col'}`}>
                <TouchableOpacity
                  onPress={onPrimaryCta}
                  className={`bg-emerald-500 rounded-xl shadow-lg shadow-emerald-800/30 ${
                    isTablet() ? 'px-6 py-4 mr-4' : 'px-4 py-3 mb-3'
                  }`}
                  style={{ minHeight: isTablet() ? 52 : 44 }}
                >
                  <Text 
                    className='text-white font-semibold text-center'
                    style={{ fontSize: isTablet() ? 16 : 14 }}
                  >
                    Start Aptitude Quiz
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onSecondaryCta}
                  className={`bg-white/90 rounded-xl ${
                    isTablet() ? 'px-6 py-4' : 'px-4 py-3'
                  }`}
                  style={{ minHeight: isTablet() ? 52 : 44 }}
                >
                  <Text 
                    className='text-emerald-700 font-semibold text-center'
                    style={{ fontSize: isTablet() ? 16 : 14 }}
                  >
                    Colleges Near Me
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Impact badges */}
        <View style={{ paddingHorizontal: containerPadding, marginTop: -40 }}>
          <View className='bg-white rounded-2xl shadow-md shadow-black/10 border border-black/5' style={{ padding: isTablet() ? 24 : 16 }}>
            <View className={`flex-row justify-between ${isTablet() ? 'px-4' : ''}`}>
              <View className='items-center flex-1'>
                <Text style={{ fontSize: isTablet() ? 32 : 24 }} className='font-extrabold text-emerald-600'>95%</Text>
                <Text style={{ fontSize: isTablet() ? 18 : 16 }} className='font-semibold'>Accuracy</Text>
                <Text style={{ fontSize: isTablet() ? 14 : 12 }} className='text-gray-500'>Stream suggestions</Text>
              </View>
              <View className='w-px bg-gray-200 mx-3' />
              <View className='items-center flex-1'>
                <Text style={{ fontSize: isTablet() ? 32 : 24 }} className='font-extrabold text-emerald-600'>3x</Text>
                <Text style={{ fontSize: isTablet() ? 18 : 16 }} className='font-semibold'>Efficiency</Text>
                <Text style={{ fontSize: isTablet() ? 14 : 12 }} className='text-gray-500'>Study planning</Text>
              </View>
              <View className='w-px bg-gray-200 mx-3' />
              <View className='items-center flex-1'>
                <Text style={{ fontSize: isTablet() ? 32 : 24 }} className='font-extrabold text-emerald-600'>10K+</Text>
                <Text style={{ fontSize: isTablet() ? 18 : 16 }} className='font-semibold'>Students</Text>
                <Text style={{ fontSize: isTablet() ? 14 : 12 }} className='text-gray-500'>Peer network</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Features grid */}
        <View style={{ paddingHorizontal: containerPadding, marginTop: isTablet() ? 32 : 24 }}>
          <Text 
            className='font-extrabold'
            style={{ fontSize: isTablet() ? 24 : 20 }}
          >
            Class 10th Journey Features
          </Text>
          <Text 
            className='text-gray-600 mt-1'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            Everything you need for your career journey after Class 10
          </Text>
          <View className={`mt-4 flex-row flex-wrap ${isTablet() ? '-mx-3' : '-mx-2'}`}>
            <FeatureCard
              emoji='🔍'
              title='Stream Discovery'
              subtitle='AI-powered stream recommendation (95% accurate)'
              color='bg-emerald-50'
              onPress={() => onNavigate && onNavigate('streamDiscovery')}
            />
            <FeatureCard
              emoji='🤖'
              title='Smart Mentor'
              subtitle='Personal AI career guide available 24/7'
              color='bg-blue-50'
              onPress={() => onNavigate && onNavigate('smartMentor', { studentClass: '10th' })}
            />
            <FeatureCard
              emoji='📚'
              title='Board Mastery'
              subtitle='Identify weak areas & get practice questions'
              color='bg-purple-50'
              onPress={() => onNavigate && onNavigate('boardMastery')}
            />
            <FeatureCard
              emoji='📅'
              title='Study Architect'
              subtitle='AI timetable maker for 3x efficiency'
              color='bg-orange-50'
              onPress={() => onNavigate && onNavigate('studyArchitect')}
            />
            <FeatureCard
              emoji='📊'
              title='Subject Analytics'
              subtitle='Detailed progress tracking for each subject'
              color='bg-indigo-50'
              onPress={() => onNavigate && onNavigate('subjectAnalytics')}
            />
            <FeatureCard
              emoji='👥'
              title='Peer Network'
              subtitle='Connect with 10,000+ students across India'
              color='bg-pink-50'
              onPress={() => onNavigate && onNavigate('peerNetwork')}
            />
            <FeatureCard
              emoji='🧭'
              title='Aptitude Quiz'
              subtitle='Fun quizzes to discover your strengths'
              color='bg-teal-50'
              onPress={onPrimaryCta}
            />
            <FeatureCard
              emoji='🗺️'
              title='Career Mapping'
              subtitle='See career paths for each stream'
              color='bg-cyan-50'
              onPress={() => onNavigate && onNavigate('careerMapping')}
            />
            <FeatureCard
              emoji='🏫'
              title='School Directory'
              subtitle='Find schools, programs & facilities nearby'
              color='bg-amber-50'
              onPress={() => onNavigate && onNavigate('colleges')}
            />
            <FeatureCard
              emoji='⏰'
              title='Timeline Tracker'
              subtitle='Never miss important dates & deadlines'
              color='bg-rose-50'
              onPress={() => onNavigate && onNavigate('timelineTracker')}
            />
          </View>
        </View>

        {/* Quick actions */}
        <View style={{ paddingHorizontal: containerPadding, marginTop: isTablet() ? 32 : 24 }}>
          <View className='bg-gray-900 rounded-2xl' style={{ padding: isTablet() ? 24 : 20 }}>
            <Text 
              className='text-white font-bold'
              style={{ fontSize: isTablet() ? 22 : 18 }}
            >
              Get Personalized Recommendations
            </Text>
            <Text 
              className='text-white/80 mt-1'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              Create your profile to unlock tailored courses, colleges, and study materials.
            </Text>
            <View className={`mt-4 ${isTablet() ? 'flex-row' : 'flex-col'}`}>
              <TouchableOpacity 
                onPress={() => Alert.alert('Create Profile')}
                className={`bg-white rounded-xl ${
                  isTablet() ? 'px-6 py-4 mr-4' : 'px-4 py-3 mb-3'
                }`}
                style={{ minHeight: isTablet() ? 52 : 44 }}
              >
                <Text 
                  className='text-gray-900 font-semibold text-center'
                  style={{ fontSize: isTablet() ? 16 : 14 }}
                >
                  Create Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => Alert.alert('Sign In')}
                className={`bg-transparent border border-white/40 rounded-xl ${
                  isTablet() ? 'px-6 py-4' : 'px-4 py-3'
                }`}
                style={{ minHeight: isTablet() ? 52 : 44 }}
              >
                <Text 
                  className='text-white font-semibold text-center'
                  style={{ fontSize: isTablet() ? 16 : 14 }}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Streams carousel (chips) */}
        <View className={`${isTablet() ? 'mt-8' : 'mt-6'}`}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={{ paddingLeft: containerPadding }}
            contentContainerStyle={{ paddingRight: containerPadding }}
          >
            {[
              { label: 'Science', desc: 'Physics, Chemistry, Biology/Math' },
              { label: 'Commerce', desc: 'Accounts, Economics, Business Studies' },
              { label: 'Arts', desc: 'History, Geography, Political Science' },
              { label: 'Vocational', desc: 'Skill‑based programs' },
            ].map((item) => (
              <View key={item.label} className={isTablet() ? 'mr-4' : 'mr-3'}>
                <View 
                  className='bg-white border border-gray-200 rounded-2xl'
                  style={{ 
                    paddingHorizontal: isTablet() ? 20 : 16,
                    paddingVertical: isTablet() ? 16 : 12,
                    minWidth: isTablet() ? 200 : 160
                  }}
                >
                  <Text 
                    className='font-semibold'
                    style={{ fontSize: isTablet() ? 16 : 14 }}
                  >
                    {item.label}
                  </Text>
                  <Text 
                    className='text-gray-500 mt-0.5'
                    style={{ fontSize: isTablet() ? 13 : 12 }}
                  >
                    {item.desc}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Footer */}
        <View style={{ paddingHorizontal: containerPadding, marginTop: isTablet() ? 40 : 32, marginBottom: 16 }}>
          <Text 
            className='text-gray-700 font-semibold'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            Government of Jammu & Kashmir — Higher Education Department
          </Text>
          <Text 
            className='text-gray-500 mt-1'
            style={{ fontSize: isTablet() ? 14 : 12 }}
          >
            Smart Education Initiative • Digital Guidance Platform
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeatureCard({ emoji, title, subtitle, color, onPress }) {
  const cardWidth = isTablet() ? '33.33%' : '50%';
  const cardPadding = isTablet() ? 12 : 8;
  
  return (
    <View 
      className={isTablet() ? 'px-3 mb-6' : 'px-2 mb-4'}
      style={{ width: cardWidth }}
    >
      <TouchableOpacity 
        onPress={onPress}
        className={`rounded-2xl ${color} border border-black/5 active:scale-95`}
        style={{ padding: isTablet() ? 20 : 16 }}
        activeOpacity={0.8}
      >
        <Text style={{ fontSize: isTablet() ? 32 : 24 }}>{emoji}</Text>
        <Text 
          className='mt-2 font-bold'
          style={{ fontSize: isTablet() ? 16 : 14 }}
        >
          {title}
        </Text>
        <Text 
          className='text-gray-600 mt-1'
          style={{ fontSize: isTablet() ? 13 : 12 }}
        >
          {subtitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
