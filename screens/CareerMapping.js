import { StatusBar } from 'expo-status-bar';
import '../global.css';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Modal,
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
import { useState } from 'react';
import { stateCollegesData, stateSchoolsData, scholarshipData } from '../data/collegeData';

export default function CareerMappingScreen({ onNavigate }) {
  const { user } = useAuth();
  const [selectedStream, setSelectedStream] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [showCareerDetails, setShowCareerDetails] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [showStateColleges, setShowStateColleges] = useState(false);
  const [showScholarships, setShowScholarships] = useState(false);
  const [currentView, setCurrentView] = useState('main'); // 'main', 'streams', 'colleges', 'scholarships'

  const containerPadding = getContainerPadding();

  const streams = [
    {
      id: 'science',
      name: 'Science Stream',
      emoji: '🔬',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      description: 'Physics, Chemistry, Mathematics, Biology/Computer Science',
      careers: [
        {
          id: 'doctor',
          name: 'Doctor',
          emoji: '👨‍⚕️',
          description: 'Medical professional who diagnoses and treats patients',
          education: 'MBBS (5.5 years) + MD/MS (3 years)',
          salary: '₹8-25 LPA',
          skills: ['Biology', 'Chemistry', 'Problem Solving', 'Empathy'],
          exams: ['NEET', 'AIIMS', 'JIPMER'],
          duration: '8-10 years',
          demand: 'High',
          difficulty: 'Very High'
        },
        {
          id: 'engineer',
          name: 'Engineer',
          emoji: '⚙️',
          description: 'Design and develop solutions to technical problems',
          education: 'B.Tech (4 years) + M.Tech (2 years)',
          salary: '₹6-20 LPA',
          skills: ['Mathematics', 'Physics', 'Logic', 'Creativity'],
          exams: ['JEE Main', 'JEE Advanced', 'BITSAT'],
          duration: '4-6 years',
          demand: 'High',
          difficulty: 'High'
        },
        {
          id: 'scientist',
          name: 'Scientist',
          emoji: '🔬',
          description: 'Conduct research and experiments to advance knowledge',
          education: 'B.Sc (3 years) + M.Sc (2 years) + Ph.D (3-5 years)',
          salary: '₹5-15 LPA',
          skills: ['Research', 'Analysis', 'Critical Thinking', 'Patience'],
          exams: ['CSIR NET', 'GATE', 'JEST'],
          duration: '8-12 years',
          demand: 'Medium',
          difficulty: 'Very High'
        },
        {
          id: 'pharmacist',
          name: 'Pharmacist',
          emoji: '💊',
          description: 'Prepare and dispense medications, provide health advice',
          education: 'B.Pharm (4 years) + M.Pharm (2 years)',
          salary: '₹4-12 LPA',
          skills: ['Chemistry', 'Biology', 'Attention to Detail', 'Communication'],
          exams: ['GPAT', 'NIPER'],
          duration: '4-6 years',
          demand: 'Medium',
          difficulty: 'Medium'
        }
      ]
    },
    {
      id: 'commerce',
      name: 'Commerce Stream',
      emoji: '📊',
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      description: 'Accountancy, Business Studies, Economics, Mathematics/Informatics',
      careers: [
        {
          id: 'ca',
          name: 'Chartered Accountant',
          emoji: '📋',
          description: 'Financial expert who handles accounting, auditing, and taxation',
          education: 'CA Foundation + Intermediate + Final (3-4 years)',
          salary: '₹6-25 LPA',
          skills: ['Mathematics', 'Analytical Skills', 'Attention to Detail', 'Ethics'],
          exams: ['CA Foundation', 'CA Intermediate', 'CA Final'],
          duration: '3-4 years',
          demand: 'High',
          difficulty: 'High'
        },
        {
          id: 'banker',
          name: 'Banker',
          emoji: '🏦',
          description: 'Manage financial services and customer relationships',
          education: 'B.Com (3 years) + MBA (2 years)',
          salary: '₹4-15 LPA',
          skills: ['Mathematics', 'Communication', 'Customer Service', 'Sales'],
          exams: ['IBPS', 'SBI PO', 'RBI Grade B'],
          duration: '3-5 years',
          demand: 'High',
          difficulty: 'Medium'
        },
        {
          id: 'business_analyst',
          name: 'Business Analyst',
          emoji: '📈',
          description: 'Analyze business processes and recommend improvements',
          education: 'B.Com/BBA (3 years) + MBA (2 years)',
          salary: '₹5-18 LPA',
          skills: ['Analytics', 'Problem Solving', 'Communication', 'Technology'],
          exams: ['CAT', 'XAT', 'GMAT'],
          duration: '3-5 years',
          demand: 'High',
          difficulty: 'Medium'
        },
        {
          id: 'entrepreneur',
          name: 'Entrepreneur',
          emoji: '🚀',
          description: 'Start and run your own business venture',
          education: 'Any degree + Business experience',
          salary: 'Variable (₹0-∞)',
          skills: ['Leadership', 'Risk Taking', 'Innovation', 'Networking'],
          exams: ['No specific exams'],
          duration: 'Lifetime',
          demand: 'Variable',
          difficulty: 'Very High'
        }
      ]
    },
    {
      id: 'arts',
      name: 'Arts/Humanities Stream',
      emoji: '📚',
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      description: 'History, Political Science, Geography, Psychology/Sociology',
      careers: [
        {
          id: 'lawyer',
          name: 'Lawyer',
          emoji: '⚖️',
          description: 'Legal professional who represents clients in court',
          education: 'LLB (3 years) + LLM (2 years)',
          salary: '₹5-20 LPA',
          skills: ['Critical Thinking', 'Communication', 'Research', 'Ethics'],
          exams: ['CLAT', 'AILET', 'LSAT'],
          duration: '3-5 years',
          demand: 'High',
          difficulty: 'High'
        },
        {
          id: 'journalist',
          name: 'Journalist',
          emoji: '📰',
          description: 'Report news and create content for media outlets',
          education: 'B.A Journalism (3 years) + M.A (2 years)',
          salary: '₹3-12 LPA',
          skills: ['Writing', 'Communication', 'Research', 'Curiosity'],
          exams: ['No specific exams'],
          duration: '3-5 years',
          demand: 'Medium',
          difficulty: 'Medium'
        },
        {
          id: 'teacher',
          name: 'Teacher',
          emoji: '👩‍🏫',
          description: 'Educate students and shape young minds',
          education: 'B.A/B.Sc (3 years) + B.Ed (2 years)',
          salary: '₹3-10 LPA',
          skills: ['Communication', 'Patience', 'Subject Knowledge', 'Empathy'],
          exams: ['CTET', 'TET', 'NET'],
          duration: '3-5 years',
          demand: 'High',
          difficulty: 'Medium'
        },
        {
          id: 'civil_servant',
          name: 'Civil Servant',
          emoji: '🏛️',
          description: 'Serve the government and work for public welfare',
          education: 'Any degree + Civil Services preparation',
          salary: '₹8-20 LPA',
          skills: ['General Knowledge', 'Leadership', 'Decision Making', 'Ethics'],
          exams: ['UPSC CSE', 'State PSC'],
          duration: '1-3 years preparation',
          demand: 'High',
          difficulty: 'Very High'
        }
      ]
    }
  ];

  // Available states from our data
  const availableStates = Object.keys(stateCollegesData).map(key => ({
    id: key,
    name: stateCollegesData[key].stateName,
    collegeCount: stateCollegesData[key].colleges.length
  }));

  const renderMainMenu = () => (
    <View>
      {/* Main Navigation Cards */}
      <View className='mb-6'>
        <TouchableOpacity
          onPress={() => setCurrentView('streams')}
          className='bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 mb-4'
        >
          <View className='flex-row items-center'>
            <Text style={{ fontSize: isTablet() ? 32 : 24 }}>🎯</Text>
            <View className='ml-4 flex-1'>
              <Text 
                className='text-white font-bold mb-1'
                style={{ fontSize: isTablet() ? 20 : 18 }}
              >
                Career Streams Explorer
              </Text>
              <Text 
                className='text-blue-100'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                Explore career paths for Science, Commerce & Arts
              </Text>
            </View>
            <Text 
              className='text-white'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              →
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCurrentView('colleges')}
          className='bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-6 mb-4'
        >
          <View className='flex-row items-center'>
            <Text style={{ fontSize: isTablet() ? 32 : 24 }}>🏛️</Text>
            <View className='ml-4 flex-1'>
              <Text 
                className='text-white font-bold mb-1'
                style={{ fontSize: isTablet() ? 20 : 18 }}
              >
                Government Colleges
              </Text>
              <Text 
                className='text-green-100'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                State-wise government college database
              </Text>
            </View>
            <View className='items-center'>
              <Text 
                className='text-white font-bold'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                {Object.keys(stateCollegesData).length}
              </Text>
              <Text 
                className='text-green-100'
                style={{ fontSize: isTablet() ? 10 : 8 }}
              >
                States
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCurrentView('scholarships')}
          className='bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-6'
        >
          <View className='flex-row items-center'>
            <Text style={{ fontSize: isTablet() ? 32 : 24 }}>💰</Text>
            <View className='ml-4 flex-1'>
              <Text 
                className='text-white font-bold mb-1'
                style={{ fontSize: isTablet() ? 20 : 18 }}
              >
                Scholarship Portal
              </Text>
              <Text 
                className='text-yellow-100'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                Financial assistance & scholarship opportunities
              </Text>
            </View>
            <Text 
              className='text-white'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              →
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View className='bg-white border border-gray-200 rounded-2xl p-4'>
        <Text 
          className='font-bold mb-3'
          style={{ fontSize: isTablet() ? 18 : 16 }}
        >
          Career Statistics
        </Text>
        <View className='flex-row justify-between'>
          <View className='items-center'>
            <Text 
              className='font-bold text-cyan-600'
              style={{ fontSize: isTablet() ? 20 : 18 }}
            >
              50+
            </Text>
            <Text 
              className='text-gray-600'
              style={{ fontSize: isTablet() ? 12 : 10 }}
            >
              Career Options
            </Text>
          </View>
          <View className='items-center'>
            <Text 
              className='font-bold text-cyan-600'
              style={{ fontSize: isTablet() ? 20 : 18 }}
            >
              {Object.keys(stateCollegesData).reduce((total, state) => 
                total + stateCollegesData[state].colleges.length, 0)}
            </Text>
            <Text 
              className='text-gray-600'
              style={{ fontSize: isTablet() ? 12 : 10 }}
            >
              Govt Colleges
            </Text>
          </View>
          <View className='items-center'>
            <Text 
              className='font-bold text-cyan-600'
              style={{ fontSize: isTablet() ? 20 : 18 }}
            >
              100+
            </Text>
            <Text 
              className='text-gray-600'
              style={{ fontSize: isTablet() ? 12 : 10 }}
            >
              Scholarships
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderStateColleges = () => (
    <View>
      <View className='flex-row items-center mb-4'>
        <TouchableOpacity onPress={() => setCurrentView('main')}>
          <Text style={{ fontSize: isTablet() ? 24 : 20 }}>←</Text>
        </TouchableOpacity>
        <Text 
          className='font-extrabold ml-3'
          style={{ fontSize: isTablet() ? 24 : 20 }}
        >
          Government Colleges by State
        </Text>
      </View>
      
      <Text 
        className='text-gray-600 mb-6'
        style={{ fontSize: isTablet() ? 16 : 14 }}
      >
        Select your state to explore government colleges
      </Text>

      {availableStates.map((state) => (
        <TouchableOpacity
          key={state.id}
          onPress={() => {
            setSelectedState(state.id);
            setShowStateColleges(true);
          }}
          className='bg-white border border-gray-200 rounded-2xl p-4 mb-4'
        >
          <View className='flex-row items-center justify-between'>
            <View className='flex-1'>
              <Text 
                className='font-bold mb-1'
                style={{ fontSize: isTablet() ? 18 : 16 }}
              >
                {state.name}
              </Text>
              <Text 
                className='text-gray-600'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                {state.collegeCount} Government Colleges
              </Text>
            </View>
            <View className='items-center'>
              <Text 
                className='font-bold text-green-600'
                style={{ fontSize: isTablet() ? 20 : 18 }}
              >
                {state.collegeCount}
              </Text>
              <Text 
                className='text-gray-500'
                style={{ fontSize: isTablet() ? 10 : 8 }}
              >
                Colleges
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderScholarships = () => (
    <View>
      <View className='flex-row items-center mb-4'>
        <TouchableOpacity onPress={() => setCurrentView('main')}>
          <Text style={{ fontSize: isTablet() ? 24 : 20 }}>←</Text>
        </TouchableOpacity>
        <Text 
          className='font-extrabold ml-3'
          style={{ fontSize: isTablet() ? 24 : 20 }}
        >
          Scholarship Portal
        </Text>
      </View>

      <Text 
        className='text-gray-600 mb-6'
        style={{ fontSize: isTablet() ? 16 : 14 }}
      >
        Explore scholarships available after Class 12
      </Text>

      {Object.entries(scholarshipData).map(([key, data]) => (
        <View key={key} className='bg-white border border-gray-200 rounded-2xl p-4 mb-4'>
          <Text 
            className='font-bold mb-3'
            style={{ fontSize: isTablet() ? 18 : 16 }}
          >
            💰 {data.name}
          </Text>
          
          {data.scholarships.map((scholarship, index) => (
            <View key={index} className='bg-gray-50 rounded-xl p-3 mb-3'>
              <Text 
                className='font-semibold mb-2'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                {scholarship.name}
              </Text>
              
              <View className='space-y-1'>
                <Text 
                  className='text-gray-700'
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  <Text className='font-semibold'>Eligibility: </Text>
                  {scholarship.eligibility}
                </Text>
                
                <Text 
                  className='text-green-600 font-semibold'
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  <Text className='text-gray-700 font-semibold'>Amount: </Text>
                  {scholarship.amount}
                </Text>
                
                <Text 
                  className='text-blue-600'
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  <Text className='text-gray-700 font-semibold'>Duration: </Text>
                  {scholarship.duration}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );

  const renderStreamCard = (stream) => (
    <TouchableOpacity
      key={stream.id}
      onPress={() => setSelectedStream(stream)}
      className={`${stream.lightColor} border border-gray-200 rounded-2xl p-4 mb-4`}
    >
      <View className='flex-row items-center mb-3'>
        <Text style={{ fontSize: isTablet() ? 32 : 24 }}>{stream.emoji}</Text>
        <View className='ml-3 flex-1'>
          <Text 
            className='font-bold'
            style={{ fontSize: isTablet() ? 18 : 16 }}
          >
            {stream.name}
          </Text>
          <Text 
            className='text-gray-600'
            style={{ fontSize: isTablet() ? 14 : 12 }}
          >
            {stream.description}
          </Text>
        </View>
      </View>
      
      <View className='flex-row justify-between items-center'>
        <Text 
          className='text-gray-600'
          style={{ fontSize: isTablet() ? 14 : 12 }}
        >
          {stream.careers.length} Career Options
        </Text>
        <Text 
          className='text-blue-600 font-semibold'
          style={{ fontSize: isTablet() ? 14 : 12 }}
        >
          Explore →
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderCareerCard = (career) => (
    <TouchableOpacity
      key={career.id}
      onPress={() => {
        setSelectedCareer(career);
        setShowCareerDetails(true);
      }}
      className='bg-white border border-gray-200 rounded-2xl p-4 mb-4'
    >
      <View className='flex-row items-center mb-3'>
        <Text style={{ fontSize: isTablet() ? 32 : 24 }}>{career.emoji}</Text>
        <View className='ml-3 flex-1'>
          <Text 
            className='font-bold'
            style={{ fontSize: isTablet() ? 18 : 16 }}
          >
            {career.name}
          </Text>
          <Text 
            className='text-gray-600'
            style={{ fontSize: isTablet() ? 14 : 12 }}
          >
            {career.description}
          </Text>
        </View>
      </View>
      
      <View className='flex-row justify-between items-center mb-3'>
        <View className='items-center'>
          <Text 
            className='font-semibold text-green-600'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            {career.salary}
          </Text>
          <Text 
            className='text-gray-500'
            style={{ fontSize: isTablet() ? 12 : 10 }}
          >
            Salary
          </Text>
        </View>
        <View className='items-center'>
          <Text 
            className='font-semibold text-blue-600'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            {career.duration}
          </Text>
          <Text 
            className='text-gray-500'
            style={{ fontSize: isTablet() ? 12 : 10 }}
          >
            Duration
          </Text>
        </View>
        <View className='items-center'>
          <Text 
            className={`font-semibold ${
              career.demand === 'High' ? 'text-green-600' :
              career.demand === 'Medium' ? 'text-yellow-600' : 'text-red-600'
            }`}
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            {career.demand}
          </Text>
          <Text 
            className='text-gray-500'
            style={{ fontSize: isTablet() ? 12 : 10 }}
          >
            Demand
          </Text>
        </View>
      </View>
      
      <View className='flex-row flex-wrap'>
        {career.skills.slice(0, 3).map((skill, index) => (
          <View key={index} className='bg-gray-100 rounded-full px-2 py-1 mr-2 mb-1'>
            <Text 
              className='text-gray-600'
              style={{ fontSize: isTablet() ? 12 : 10 }}
            >
              {skill}
            </Text>
          </View>
        ))}
        {career.skills.length > 3 && (
          <View className='bg-gray-100 rounded-full px-2 py-1 mr-2 mb-1'>
            <Text 
              className='text-gray-600'
              style={{ fontSize: isTablet() ? 12 : 10 }}
            >
              +{career.skills.length - 3} more
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderCareerDetails = () => {
    if (!selectedCareer) return null;

    return (
      <View className='flex-1 px-4'>
        <View className='mb-6'>
          <Text 
            className='font-bold text-center mb-2'
            style={{ fontSize: isTablet() ? 24 : 20 }}
          >
            {selectedCareer.name}
          </Text>
          <Text 
            className='text-gray-600 text-center'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            {selectedCareer.description}
          </Text>
        </View>

        {/* Key Information */}
        <View className='bg-white border border-gray-200 rounded-2xl p-4 mb-4'>
          <Text 
            className='font-bold mb-3'
            style={{ fontSize: isTablet() ? 18 : 16 }}
          >
            Key Information
          </Text>
          <View className='space-y-3'>
            <View className='flex-row justify-between'>
              <Text 
                className='text-gray-600'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                Education Required:
              </Text>
              <Text 
                className='font-semibold text-right flex-1 ml-2'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                {selectedCareer.education}
              </Text>
            </View>
            <View className='flex-row justify-between'>
              <Text 
                className='text-gray-600'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                Average Salary:
              </Text>
              <Text 
                className='font-semibold text-green-600'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                {selectedCareer.salary}
              </Text>
            </View>
            <View className='flex-row justify-between'>
              <Text 
                className='text-gray-600'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                Study Duration:
              </Text>
              <Text 
                className='font-semibold text-blue-600'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                {selectedCareer.duration}
              </Text>
            </View>
            <View className='flex-row justify-between'>
              <Text 
                className='text-gray-600'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                Job Demand:
              </Text>
              <Text 
                className={`font-semibold ${
                  selectedCareer.demand === 'High' ? 'text-green-600' :
                  selectedCareer.demand === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                }`}
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                {selectedCareer.demand}
              </Text>
            </View>
            <View className='flex-row justify-between'>
              <Text 
                className='text-gray-600'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                Difficulty Level:
              </Text>
              <Text 
                className={`font-semibold ${
                  selectedCareer.difficulty === 'Very High' ? 'text-red-600' :
                  selectedCareer.difficulty === 'High' ? 'text-orange-600' : 'text-yellow-600'
                }`}
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                {selectedCareer.difficulty}
              </Text>
            </View>
          </View>
        </View>

        {/* Required Skills */}
        <View className='bg-white border border-gray-200 rounded-2xl p-4 mb-4'>
          <Text 
            className='font-bold mb-3'
            style={{ fontSize: isTablet() ? 18 : 16 }}
          >
            Required Skills
          </Text>
          <View className='flex-row flex-wrap'>
            {selectedCareer.skills.map((skill, index) => (
              <View key={index} className='bg-blue-100 rounded-full px-3 py-2 mr-2 mb-2'>
                <Text 
                  className='text-blue-700 font-medium'
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  {skill}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Entrance Exams */}
        <View className='bg-white border border-gray-200 rounded-2xl p-4 mb-4'>
          <Text 
            className='font-bold mb-3'
            style={{ fontSize: isTablet() ? 18 : 16 }}
          >
            Entrance Exams
          </Text>
          {selectedCareer.exams.map((exam, index) => (
            <View key={index} className='flex-row items-center mb-2'>
              <Text style={{ fontSize: isTablet() ? 16 : 14 }}>📝</Text>
              <Text 
                className='ml-2 font-semibold'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                {exam}
              </Text>
            </View>
          ))}
        </View>

        {/* Career Path */}
        <View className='bg-white border border-gray-200 rounded-2xl p-4'>
          <Text 
            className='font-bold mb-3'
            style={{ fontSize: isTablet() ? 18 : 16 }}
          >
            Career Path
          </Text>
          <View className='space-y-2'>
            <View className='flex-row items-center'>
              <View className='w-3 h-3 bg-blue-500 rounded-full mr-3' />
              <Text 
                className='text-gray-700'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                Complete Class 12 with required subjects
              </Text>
            </View>
            <View className='flex-row items-center'>
              <View className='w-3 h-3 bg-blue-500 rounded-full mr-3' />
              <Text 
                className='text-gray-700'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                Prepare for entrance exams
              </Text>
            </View>
            <View className='flex-row items-center'>
              <View className='w-3 h-3 bg-blue-500 rounded-full mr-3' />
              <Text 
                className='text-gray-700'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                Complete undergraduate degree
              </Text>
            </View>
            <View className='flex-row items-center'>
              <View className='w-3 h-3 bg-blue-500 rounded-full mr-3' />
              <Text 
                className='text-gray-700'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                Gain practical experience through internships
              </Text>
            </View>
            <View className='flex-row items-center'>
              <View className='w-3 h-3 bg-green-500 rounded-full mr-3' />
              <Text 
                className='text-gray-700'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                Start your career journey!
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderStateCollegeDetails = () => {
    if (!selectedState || !stateCollegesData[selectedState]) return null;

    const stateData = stateCollegesData[selectedState];

    return (
      <ScrollView 
        className='flex-1' 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: containerPadding, marginTop: 24 }}>
          <View className='flex-row items-center mb-4'>
            <TouchableOpacity onPress={() => setShowStateColleges(false)}>
              <Text style={{ fontSize: isTablet() ? 24 : 20 }}>←</Text>
            </TouchableOpacity>
            <Text 
              className='font-extrabold ml-3'
              style={{ fontSize: isTablet() ? 24 : 20 }}
            >
              {stateData.stateName} Colleges
            </Text>
          </View>

          <Text 
            className='text-gray-600 mb-6'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            Top government colleges in {stateData.stateName}
          </Text>

          {stateData.colleges.map((college) => (
            <View key={college.id} className='bg-white border border-gray-200 rounded-2xl p-4 mb-4'>
              <View className='mb-4'>
                <Text 
                  className='font-bold mb-2'
                  style={{ fontSize: isTablet() ? 18 : 16 }}
                >
                  {college.name}
                </Text>
                <View className='flex-row items-center justify-between mb-2'>
                  <Text 
                    className='text-gray-600'
                    style={{ fontSize: isTablet() ? 14 : 12 }}
                  >
                    📍 {college.location} • Est. {college.established}
                  </Text>
                  <View className='bg-green-100 px-2 py-1 rounded'>
                    <Text 
                      className='text-green-700 font-semibold'
                      style={{ fontSize: isTablet() ? 12 : 10 }}
                    >
                      {college.rating}
                    </Text>
                  </View>
                </View>
                <Text 
                  className='text-blue-600 font-semibold'
                  style={{ fontSize: isTablet() ? 12 : 10 }}
                >
                  {college.rank}
                </Text>
              </View>

              <Text 
                className='font-semibold mb-3'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                📚 Courses Offered:
              </Text>

              {college.courses.map((course, index) => (
                <View key={index} className='bg-gray-50 rounded-xl p-3 mb-3'>
                  <Text 
                    className='font-semibold mb-2'
                    style={{ fontSize: isTablet() ? 16 : 14 }}
                  >
                    {course.name}
                  </Text>
                  <View className='space-y-1'>
                    <Text 
                      className='text-gray-700'
                      style={{ fontSize: isTablet() ? 14 : 12 }}
                    >
                      <Text className='font-semibold'>Duration: </Text>
                      {course.duration}
                    </Text>
                    <Text 
                      className='text-green-600'
                      style={{ fontSize: isTablet() ? 14 : 12 }}
                    >
                      <Text className='text-gray-700 font-semibold'>Fees: </Text>
                      {course.fees}
                    </Text>
                    <Text 
                      className='text-blue-600'
                      style={{ fontSize: isTablet() ? 14 : 12 }}
                    >
                      <Text className='text-gray-700 font-semibold'>Eligibility: </Text>
                      {course.eligibility}
                    </Text>
                    <Text 
                      className='text-purple-600'
                      style={{ fontSize: isTablet() ? 14 : 12 }}
                    >
                      <Text className='text-gray-700 font-semibold'>Total Seats: </Text>
                      {course.seats}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  const getCurrentContent = () => {
    if (showCareerDetails) {
      return (
        <ScrollView 
          className='flex-1' 
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {renderCareerDetails()}
        </ScrollView>
      );
    }

    if (showStateColleges) {
      return renderStateCollegeDetails();
    }

    if (selectedStream) {
      return (
        <ScrollView 
          className='flex-1' 
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ paddingHorizontal: containerPadding, marginTop: 24 }}>
            <View className='flex-row items-center mb-4'>
              <TouchableOpacity onPress={() => setSelectedStream(null)}>
                <Text style={{ fontSize: isTablet() ? 24 : 20 }}>←</Text>
              </TouchableOpacity>
              <Text 
                className='font-extrabold ml-3'
                style={{ fontSize: isTablet() ? 24 : 20 }}
              >
                {selectedStream.name}
              </Text>
            </View>
            <Text 
              className='text-gray-600 mb-6'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              {selectedStream.description}
            </Text>
            
            {selectedStream.careers.map(renderCareerCard)}
          </View>
        </ScrollView>
      );
    }

    return (
      <ScrollView 
        className='flex-1' 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: containerPadding, marginTop: 24 }}>
          {currentView === 'main' && renderMainMenu()}
          {currentView === 'streams' && (
            <>
              <View className='flex-row items-center mb-4'>
                <TouchableOpacity onPress={() => setCurrentView('main')}>
                  <Text style={{ fontSize: isTablet() ? 24 : 20 }}>←</Text>
                </TouchableOpacity>
                <Text 
                  className='font-extrabold ml-3'
                  style={{ fontSize: isTablet() ? 24 : 20 }}
                >
                  Choose Your Stream
                </Text>
              </View>
              <Text 
                className='text-gray-600 mb-6'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                Explore career paths for each stream after Class 10
              </Text>
              
              {streams.map(renderStreamCard)}
            </>
          )}
          {currentView === 'colleges' && renderStateColleges()}
          {currentView === 'scholarships' && renderScholarships()}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className='bg-cyan-500 px-4 py-4'>
        <View className='flex-row items-center justify-between'>
          <TouchableOpacity onPress={() => onNavigate && onNavigate('class10')}>
            <Text style={{ fontSize: isTablet() ? 24 : 20 }} className='text-white'>←</Text>
          </TouchableOpacity>
          <View className='flex-row items-center'>
            <Text style={{ fontSize: isTablet() ? 24 : 20 }}>🗺️</Text>
            <Text 
              className='text-white font-bold ml-2'
              style={{ fontSize: isTablet() ? 20 : 18 }}
            >
              Career Mapping
            </Text>
          </View>
          <View style={{ width: 24 }} />
        </View>
      </View>

      {getCurrentContent()}

      {/* Back Button for Career Details */}
      {showCareerDetails && (
        <View 
          className='bg-white border-t border-gray-200 px-4 py-4'
          style={{ paddingHorizontal: containerPadding }}
        >
          <TouchableOpacity
            onPress={() => setShowCareerDetails(false)}
            className='bg-cyan-500 px-6 py-3 rounded-xl'
          >
            <Text 
              className='text-white font-semibold text-center'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              Back to Careers
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
