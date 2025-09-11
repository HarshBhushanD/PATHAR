import { StatusBar } from 'expo-status-bar';
import '../global.css';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  ActivityIndicator,
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
import { useState, useEffect } from 'react';

export default function Class12Screen({ onNavigate }) {
  const { user } = useAuth();
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    marks: 85,
    interests: ['Science', 'Technology'],
    goals: 'Engineering',
    stream: 'PCM'
  });

  const containerPadding = getContainerPadding();

  // Main features for Class 12 students
  const features = [
    {
      id: 'career-compass',
      title: 'Career Compass',
      subtitle: 'AI-powered career path recommendations',
      emoji: '🧭',
      color: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'Get personalized career suggestions based on aptitude tests and interests. Discover the best career paths after Class 12.',
      benefits: ['95% accuracy in career matching', 'Based on aptitude & interests', 'Updated with latest trends']
    },
    {
      id: 'smart-mentor',
      title: 'Smart Mentor',
      subtitle: '24/7 AI counselor for career guidance',
      emoji: '🤖',
      color: 'bg-green-50',
      borderColor: 'border-green-200',
      description: 'Your personal AI counselor available round the clock for career advice, exam strategies, and college selection.',
      benefits: ['Available 24/7', 'Personalized advice', 'Exam strategy tips']
    },
    {
      id: 'exam-mastery',
      title: 'Exam Mastery',
      subtitle: 'Board & competitive exam preparation',
      emoji: '📚',
      color: 'bg-purple-50',
      borderColor: 'border-purple-200',
      description: 'Comprehensive preparation for board exams and competitive exams like JEE, NEET, CUET, NDA with smart practice papers.',
      benefits: ['Board + Competitive exams', 'Smart practice papers', 'Performance tracking']
    },
    {
      id: 'college-navigator',
      title: 'College Navigator',
      subtitle: 'Find nearby colleges with detailed info',
      emoji: '🏫',
      color: 'bg-orange-50',
      borderColor: 'border-orange-200',
      description: 'Discover colleges near you with complete details including cutoff marks, eligibility criteria, admission process, and facilities.',
      benefits: ['Location-based search', 'Cutoff marks & eligibility', 'Admission process details']
    },
    {
      id: 'timeline-tracker',
      title: 'Timeline Tracker',
      subtitle: 'Never miss important dates',
      emoji: '📅',
      color: 'bg-red-50',
      borderColor: 'border-red-200',
      description: 'Stay updated with admission dates, exam schedules, scholarships, and counseling sessions with smart reminders.',
      benefits: ['Exam schedules', 'Admission deadlines', 'Scholarship alerts']
    },
    {
      id: 'subject-analytics',
      title: 'Subject Analytics',
      subtitle: 'Connect strengths to careers',
      emoji: '📊',
      color: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      description: 'Analyze how your subject strengths connect to career opportunities. Good at Physics → Engineering; Biology → Medicine.',
      benefits: ['Strength analysis', 'Career connections', 'Subject-wise insights']
    },
    {
      id: 'peer-network',
      title: 'Peer Network',
      subtitle: 'Connect with exam peers',
      emoji: '👥',
      color: 'bg-pink-50',
      borderColor: 'border-pink-200',
      description: 'Connect with students preparing for the same exams. Share strategies, discuss college choices, and motivate each other.',
      benefits: ['Same exam groups', 'Strategy sharing', 'Peer motivation']
    },
    {
      id: 'aptitude-test',
      title: 'Aptitude & Interest Test',
      subtitle: 'Quiz-based course suggestions',
      emoji: '🧠',
      color: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      description: 'Take comprehensive quizzes to get suitable course suggestions like B.Tech, B.Com, B.Sc, Law, Design based on your aptitude.',
      benefits: ['Comprehensive testing', 'Multiple course options', 'Interest-based matching']
    },
    {
      id: 'course-mapping',
      title: 'Course-to-Career Mapping',
      subtitle: 'Step-by-step career charts',
      emoji: '🗺️',
      color: 'bg-teal-50',
      borderColor: 'border-teal-200',
      description: 'See detailed career paths. Example: Commerce → B.Com → MBA → Chartered Accountant or Financial Analyst.',
      benefits: ['Step-by-step paths', 'Multiple career options', 'Clear progression']
    },
    {
      id: 'personalization',
      title: 'Personalization',
      subtitle: 'Customized recommendations',
      emoji: '⚙️',
      color: 'bg-gray-50',
      borderColor: 'border-gray-200',
      description: 'Get personalized advice based on your marks, interests, and goals. Tailored college and course recommendations.',
      benefits: ['Based on your profile', 'Tailored suggestions', 'Goal-oriented advice']
    },
    {
      id: 'govt-colleges',
      title: 'Government Colleges',
      subtitle: 'Local government college database',
      emoji: '🏛️',
      color: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      description: 'Comprehensive database of nearby government colleges with programs offered, eligibility, facilities, and cutoff history.',
      benefits: ['Government colleges only', 'Detailed information', 'Cutoff history']
    },
    {
      id: 'scholarships',
      title: 'Scholarship Portal',
      subtitle: 'Financial assistance opportunities',
      emoji: '💰',
      color: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      description: 'Discover scholarship opportunities, eligibility criteria, and application processes for financial assistance in education.',
      benefits: ['Multiple scholarships', 'Eligibility checker', 'Application guidance']
    }
  ];

  // Quick stats for dashboard
  const stats = [
    { label: 'Career Options', value: '500+', emoji: '🎯' },
    { label: 'Colleges', value: '2000+', emoji: '🏫' },
    { label: 'Scholarships', value: '100+', emoji: '💰' },
    { label: 'Exam Alerts', value: '50+', emoji: '📢' }
  ];

  // Recent activities/updates
  const recentUpdates = [
    {
      title: 'JEE Main 2024 Registration Open',
      time: '2 hours ago',
      type: 'exam',
      urgent: true
    },
    {
      title: 'New Scholarship Program Available',
      time: '1 day ago',
      type: 'scholarship',
      urgent: false
    },
    {
      title: 'NEET Counseling Dates Announced',
      time: '2 days ago',
      type: 'counseling',
      urgent: true
    }
  ];

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
    setShowModal(true);
    
    // Handle navigation to specific screens
    switch (feature.id) {
      case 'smart-mentor':
        if (onNavigate) onNavigate('smartMentor', { studentClass: '12th' });
        break;
      case 'exam-mastery':
        if (onNavigate) onNavigate('boardMastery');
        break;
      case 'college-navigator':
        if (onNavigate) onNavigate('colleges');
        break;
      case 'timeline-tracker':
        if (onNavigate) onNavigate('timelineTracker');
        break;
      case 'subject-analytics':
        if (onNavigate) onNavigate('subjectAnalytics');
        break;
      case 'peer-network':
        if (onNavigate) onNavigate('peerNetwork');
        break;
      case 'aptitude-test':
        if (onNavigate) onNavigate('aptitude');
        break;
      case 'course-mapping':
        if (onNavigate) onNavigate('careerMapping');
        break;
      default:
        // For features without dedicated screens, show detailed modal
        break;
    }
  };

  const renderFeatureCard = (feature) => (
    <TouchableOpacity
      key={feature.id}
      onPress={() => handleFeatureClick(feature)}
      className={`${feature.color} ${feature.borderColor} border-2 rounded-2xl p-4 mb-4 shadow-sm`}
      style={{ minHeight: isTablet() ? 120 : 100 }}
    >
      <View className='flex-row items-start justify-between mb-3'>
        <View className='flex-1'>
          <View className='flex-row items-center mb-2'>
            <Text style={{ fontSize: isTablet() ? 28 : 24 }}>{feature.emoji}</Text>
            <Text 
              className='font-bold ml-3 flex-1'
              style={{ fontSize: isTablet() ? 18 : 16 }}
            >
              {feature.title}
            </Text>
          </View>
          <Text 
            className='text-gray-600 mb-2'
            style={{ fontSize: isTablet() ? 14 : 12 }}
          >
            {feature.subtitle}
          </Text>
        </View>
        <Text 
          className='text-blue-600 font-semibold'
          style={{ fontSize: isTablet() ? 14 : 12 }}
        >
          Explore →
        </Text>
      </View>
      
      <View className='flex-row flex-wrap'>
        {feature.benefits?.slice(0, 3).map((benefit, index) => (
          <View key={index} className='bg-white/70 rounded-full px-2 py-1 mr-2 mb-1'>
            <Text 
              className='text-gray-700'
              style={{ fontSize: isTablet() ? 10 : 8 }}
            >
              • {benefit}
            </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  const renderStatsCard = (stat, index) => (
    <View key={index} className='bg-white rounded-xl p-3 items-center border border-gray-100 shadow-sm'>
      <Text style={{ fontSize: isTablet() ? 24 : 20 }} className='mb-1'>{stat.emoji}</Text>
      <Text 
        className='font-bold text-blue-600'
        style={{ fontSize: isTablet() ? 18 : 16 }}
      >
        {stat.value}
      </Text>
      <Text 
        className='text-gray-600 text-center'
        style={{ fontSize: isTablet() ? 12 : 10 }}
      >
        {stat.label}
      </Text>
    </View>
  );

  const renderUpdateCard = (update, index) => (
    <View key={index} className='bg-white border border-gray-200 rounded-xl p-3 mb-3'>
      <View className='flex-row items-center justify-between mb-1'>
        <Text 
          className='font-semibold flex-1'
          style={{ fontSize: isTablet() ? 14 : 12 }}
        >
          {update.title}
        </Text>
        {update.urgent && (
          <View className='bg-red-100 px-2 py-1 rounded-full'>
            <Text 
              className='text-red-600 font-semibold'
              style={{ fontSize: isTablet() ? 10 : 8 }}
            >
              URGENT
            </Text>
          </View>
        )}
      </View>
      <Text 
        className='text-gray-500'
        style={{ fontSize: isTablet() ? 12 : 10 }}
      >
        {update.time}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <StatusBar style="auto" />

      <ScrollView 
        className='flex-1' 
        contentContainerStyle={{ paddingBottom: isTablet() ? 48 : 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View 
          className='bg-gradient-to-r from-blue-500 to-purple-600'
          style={{ 
            paddingHorizontal: containerPadding, 
            paddingVertical: isTablet() ? 40 : 32 
          }}
        >
          <Text 
            className='text-black font-extrabold mb-2 text-center'
            style={{ fontSize: isTablet() ? 36 : 28 }}
          >
            Class 12 Journey 
          </Text>
          <Text 
            className='text-black mb-4'
            style={{ fontSize: isTablet() ? 18 : 16 }}
          >
            Your complete guide to college admissions and career planning
          </Text>
          
        </View>

        {/* Quick Stats */}
        <View style={{ paddingHorizontal: containerPadding, marginTop: -20 }}>
          <View className='bg-white rounded-2xl p-4 shadow-lg border border-gray-100 mb-6'>
            <Text 
              className='font-bold mb-3 text-center'
              style={{ fontSize: isTablet() ? 18 : 16 }}
            >
              📊 Your Dashboard
            </Text>
            <View className='flex-row justify-between'>
              {stats.map(renderStatsCard)}
            </View>
          </View>
        </View>

        {/* Recent Updates */}
        <View style={{ paddingHorizontal: containerPadding, marginBottom: 24 }}>
          <Text 
            className='font-extrabold mb-4'
            style={{ fontSize: isTablet() ? 20 : 18 }}
          >
            🔔 Recent Updates
              </Text>
          {recentUpdates.map(renderUpdateCard)}
        </View>

        {/* Main Features Grid */}
        <View style={{ paddingHorizontal: containerPadding }}>
          <Text 
            className='font-extrabold mb-4'
            style={{ fontSize: isTablet() ? 24 : 20 }}
          >
            🌟 Complete Feature Suite
          </Text>
                <Text 
            className='text-gray-600 mb-6'
            style={{ fontSize: isTablet() ? 16 : 14 }}
                >
            Everything you need for your Class 12 journey and beyond
                </Text>
          
          {features.map(renderFeatureCard)}
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: containerPadding, marginTop: 32 }}>
          <Text 
            className='font-extrabold mb-4'
            style={{ fontSize: isTablet() ? 20 : 18 }}
          >
            ⚡ Quick Actions
          </Text>
          
          <View className='flex-row space-x-3 mb-4'>
            <TouchableOpacity
              onPress={() => onNavigate && onNavigate('aptitude')}
              className='flex-1 bg-purple-500 rounded-xl py-4'
            >
              <Text 
                className='text-white font-bold text-center'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                🧠 Take Aptitude Test
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => onNavigate && onNavigate('colleges')}
              className='flex-1 bg-blue-500 rounded-xl py-4'
            >
              <Text 
                className='text-white font-bold text-center'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                🏫 Find Colleges
              </Text>
            </TouchableOpacity>
        </View>

          <TouchableOpacity
            onPress={() => onNavigate && onNavigate('smartMentor', { studentClass: '12th' })}
            className='w-full bg-green-500 rounded-xl py-4 mb-4'
          >
            <Text 
              className='text-white font-bold text-center'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              🤖 Chat with Smart Mentor
            </Text>
          </TouchableOpacity>
        </View>

        {/* Motivational Section */}
        <View style={{ paddingHorizontal: containerPadding, marginTop: 24 }}>
          <View className='bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-6'>
            <Text 
              className='text-white font-bold text-center mb-2'
              style={{ fontSize: isTablet() ? 20 : 18 }}
            >
              🚀 Your Success Journey Starts Here!
            </Text>
            <Text 
              className='text-green-100 text-center'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              With AI-powered guidance, comprehensive resources, and personalized recommendations, 
              you're equipped for success in your academic and career journey.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Feature Detail Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView className='flex-1 bg-white'>
          <View className='bg-blue-500 px-4 py-4'>
            <View className='flex-row items-center justify-between'>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={{ fontSize: isTablet() ? 24 : 20 }} className='text-white'>←</Text>
              </TouchableOpacity>
              <Text 
                className='text-white font-bold'
                style={{ fontSize: isTablet() ? 18 : 16 }}
              >
                {selectedFeature?.title}
              </Text>
              <View style={{ width: 24 }} />
            </View>
          </View>
          
          {selectedFeature && (
            <ScrollView className='flex-1 px-4 py-6'>
              <View className='items-center mb-6'>
                <Text style={{ fontSize: isTablet() ? 64 : 48 }} className='mb-4'>
                  {selectedFeature.emoji}
                </Text>
                <Text 
                  className='font-bold text-center mb-2'
                  style={{ fontSize: isTablet() ? 24 : 20 }}
                >
                  {selectedFeature.title}
                </Text>
                <Text 
                  className='text-gray-600 text-center'
                  style={{ fontSize: isTablet() ? 16 : 14 }}
                >
                  {selectedFeature.subtitle}
                </Text>
              </View>

              <View className='bg-gray-50 rounded-2xl p-4 mb-6'>
                <Text 
                  className='font-semibold mb-3'
                  style={{ fontSize: isTablet() ? 18 : 16 }}
                >
                  📖 Description
                </Text>
                <Text 
                  className='text-gray-700'
                  style={{ fontSize: isTablet() ? 16 : 14 }}
                >
                  {selectedFeature.description}
                </Text>
              </View>

              <View className='bg-blue-50 rounded-2xl p-4 mb-6'>
                <Text 
                  className='font-semibold mb-3'
                  style={{ fontSize: isTablet() ? 18 : 16 }}
                >
                  ✨ Key Benefits
                </Text>
                {selectedFeature.benefits?.map((benefit, index) => (
                  <Text 
                    key={index}
                    className='text-blue-700 mb-2'
                    style={{ fontSize: isTablet() ? 16 : 14 }}
                  >
                    • {benefit}
                  </Text>
                ))}
        </View>

              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                  handleFeatureClick(selectedFeature);
                }}
                className='bg-blue-500 rounded-xl py-4'
              >
                <Text 
                  className='text-white font-bold text-center'
                  style={{ fontSize: isTablet() ? 18 : 16 }}
                >
                  Get Started →
                </Text>
              </TouchableOpacity>
      </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
} 