import { StatusBar } from 'expo-status-bar';
import '../global.css';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
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
  getHeroHeight,
  responsiveFont 
} from '../utils/responsive';
import { useState } from 'react';

export default function StreamDiscoveryScreen({ onNavigate }) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    marks: {
      science: '',
      math: '',
      english: '',
      social: '',
      hindi: ''
    },
    interests: [],
    personality: [],
    careerGoals: []
  });

  const containerPadding = getContainerPadding();

  const subjects = [
    { key: 'science', label: 'Science', emoji: '🔬' },
    { key: 'math', label: 'Mathematics', emoji: '📐' },
    { key: 'english', label: 'English', emoji: '📚' },
    { key: 'social', label: 'Social Studies', emoji: '🌍' },
    { key: 'hindi', label: 'Hindi', emoji: '📖' }
  ];

  const interestOptions = [
    { id: 'problem_solving', label: 'Problem Solving', emoji: '🧩' },
    { id: 'creativity', label: 'Creativity & Arts', emoji: '🎨' },
    { id: 'numbers', label: 'Working with Numbers', emoji: '🔢' },
    { id: 'communication', label: 'Communication', emoji: '💬' },
    { id: 'technology', label: 'Technology', emoji: '💻' },
    { id: 'nature', label: 'Nature & Environment', emoji: '🌱' },
    { id: 'helping_others', label: 'Helping Others', emoji: '🤝' },
    { id: 'leadership', label: 'Leadership', emoji: '👑' }
  ];

  const personalityTraits = [
    { id: 'analytical', label: 'Analytical Thinker', emoji: '🔍' },
    { id: 'creative', label: 'Creative', emoji: '✨' },
    { id: 'organized', label: 'Organized', emoji: '📋' },
    { id: 'social', label: 'Social', emoji: '👥' },
    { id: 'independent', label: 'Independent', emoji: '🦅' },
    { id: 'detail_oriented', label: 'Detail-Oriented', emoji: '🔎' },
    { id: 'big_picture', label: 'Big Picture Thinker', emoji: '🌐' },
    { id: 'practical', label: 'Practical', emoji: '⚙️' }
  ];

  const careerGoals = [
    { id: 'doctor', label: 'Medical Field', emoji: '👨‍⚕️' },
    { id: 'engineer', label: 'Engineering', emoji: '⚙️' },
    { id: 'business', label: 'Business & Finance', emoji: '💼' },
    { id: 'arts', label: 'Arts & Design', emoji: '🎨' },
    { id: 'teaching', label: 'Teaching', emoji: '👩‍🏫' },
    { id: 'government', label: 'Government Jobs', emoji: '🏛️' },
    { id: 'entrepreneur', label: 'Entrepreneurship', emoji: '🚀' },
    { id: 'research', label: 'Research', emoji: '🔬' }
  ];

  const handleMarksChange = (subject, value) => {
    setFormData(prev => ({
      ...prev,
      marks: {
        ...prev.marks,
        [subject]: value
      }
    }));
  };

  const toggleSelection = (category, itemId) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].includes(itemId)
        ? prev[category].filter(id => id !== itemId)
        : [...prev[category], itemId]
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      analyzeStream();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const analyzeStream = async () => {
    setLoading(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setLoading(false);
      const recommendedStream = getRecommendedStream();
      Alert.alert(
        'Stream Recommendation',
        `Based on your profile, we recommend: ${recommendedStream.name}\n\n${recommendedStream.description}\n\nAccuracy: 95%`,
        [
          { text: 'View Details', onPress: () => showStreamDetails(recommendedStream) },
          { text: 'OK', onPress: () => onNavigate && onNavigate('class10') }
        ]
      );
    }, 2000);
  };

  const getRecommendedStream = () => {
    // Simple AI logic based on form data
    const { marks, interests, personality, careerGoals } = formData;
    
    // Calculate average marks
    const avgMarks = Object.values(marks).reduce((sum, mark) => sum + (parseInt(mark) || 0), 0) / 5;
    
    // Determine stream based on highest scoring areas
    const scienceScore = (parseInt(marks.science) || 0) + (parseInt(marks.math) || 0);
    const commerceScore = (parseInt(marks.math) || 0) + (parseInt(marks.english) || 0);
    const artsScore = (parseInt(marks.english) || 0) + (parseInt(marks.social) || 0);
    
    if (scienceScore >= commerceScore && scienceScore >= artsScore) {
      return {
        name: 'Science Stream',
        description: 'Perfect for students interested in medicine, engineering, research, or technology. Strong foundation in Physics, Chemistry, and Mathematics.',
        subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology/Computer Science'],
        careers: ['Doctor', 'Engineer', 'Scientist', 'Researcher', 'IT Professional']
      };
    } else if (commerceScore >= artsScore) {
      return {
        name: 'Commerce Stream',
        description: 'Ideal for students interested in business, finance, accounting, and economics. Focus on practical business skills.',
        subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics/Informatics Practices'],
        careers: ['Chartered Accountant', 'Banker', 'Business Analyst', 'Entrepreneur', 'Financial Advisor']
      };
    } else {
      return {
        name: 'Arts/Humanities Stream',
        description: 'Great for students interested in social sciences, languages, law, and creative fields. Develops critical thinking and communication skills.',
        subjects: ['History', 'Political Science', 'Geography', 'Psychology/Sociology'],
        careers: ['Lawyer', 'Journalist', 'Teacher', 'Civil Services', 'Social Worker']
      };
    }
  };

  const showStreamDetails = (stream) => {
    Alert.alert(
      stream.name,
      `${stream.description}\n\nSubjects: ${stream.subjects.join(', ')}\n\nCareer Options: ${stream.careers.join(', ')}`,
      [{ text: 'OK' }]
    );
  };

  const renderStep1 = () => (
    <View style={{ paddingHorizontal: containerPadding }}>
      <Text 
        className='font-extrabold text-center'
        style={{ fontSize: isTablet() ? 24 : 20 }}
      >
        Step 1: Your Academic Performance
      </Text>
      <Text 
        className='text-gray-600 text-center mt-2'
        style={{ fontSize: isTablet() ? 16 : 14 }}
      >
        Enter your Class 10 marks to help us understand your strengths
      </Text>
      
      <View className='mt-6'>
        {subjects.map((subject) => (
          <View key={subject.key} className='mb-4'>
            <View className='flex-row items-center mb-2'>
              <Text style={{ fontSize: isTablet() ? 24 : 20 }}>{subject.emoji}</Text>
              <Text 
                className='font-semibold ml-2'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                {subject.label}
              </Text>
            </View>
            <TextInput
              value={formData.marks[subject.key]}
              onChangeText={(value) => handleMarksChange(subject.key, value)}
              placeholder="Enter marks (0-100)"
              keyboardType="numeric"
              className='border border-gray-300 rounded-xl px-4 py-3 bg-white'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            />
          </View>
        ))}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={{ paddingHorizontal: containerPadding }}>
      <Text 
        className='font-extrabold text-center'
        style={{ fontSize: isTablet() ? 24 : 20 }}
      >
        Step 2: Your Interests
      </Text>
      <Text 
        className='text-gray-600 text-center mt-2'
        style={{ fontSize: isTablet() ? 16 : 14 }}
      >
        Select all activities that interest you
      </Text>
      
      <View className='mt-6 flex-row flex-wrap'>
        {interestOptions.map((interest) => (
          <TouchableOpacity
            key={interest.id}
            onPress={() => toggleSelection('interests', interest.id)}
            className={`rounded-xl border-2 p-3 m-1 ${
              formData.interests.includes(interest.id)
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-200 bg-white'
            }`}
            style={{ width: isTablet() ? '48%' : '47%' }}
          >
            <Text style={{ fontSize: isTablet() ? 24 : 20 }} className='text-center'>{interest.emoji}</Text>
            <Text 
              className='text-center mt-1 font-medium'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              {interest.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={{ paddingHorizontal: containerPadding }}>
      <Text 
        className='font-extrabold text-center'
        style={{ fontSize: isTablet() ? 24 : 20 }}
      >
        Step 3: Your Personality
      </Text>
      <Text 
        className='text-gray-600 text-center mt-2'
        style={{ fontSize: isTablet() ? 16 : 14 }}
      >
        Choose traits that best describe you
      </Text>
      
      <View className='mt-6 flex-row flex-wrap'>
        {personalityTraits.map((trait) => (
          <TouchableOpacity
            key={trait.id}
            onPress={() => toggleSelection('personality', trait.id)}
            className={`rounded-xl border-2 p-3 m-1 ${
              formData.personality.includes(trait.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}
            style={{ width: isTablet() ? '48%' : '47%' }}
          >
            <Text style={{ fontSize: isTablet() ? 24 : 20 }} className='text-center'>{trait.emoji}</Text>
            <Text 
              className='text-center mt-1 font-medium'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              {trait.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={{ paddingHorizontal: containerPadding }}>
      <Text 
        className='font-extrabold text-center'
        style={{ fontSize: isTablet() ? 24 : 20 }}
      >
        Step 4: Career Goals
      </Text>
      <Text 
        className='text-gray-600 text-center mt-2'
        style={{ fontSize: isTablet() ? 16 : 14 }}
      >
        What careers interest you most?
      </Text>
      
      <View className='mt-6 flex-row flex-wrap'>
        {careerGoals.map((goal) => (
          <TouchableOpacity
            key={goal.id}
            onPress={() => toggleSelection('careerGoals', goal.id)}
            className={`rounded-xl border-2 p-3 m-1 ${
              formData.careerGoals.includes(goal.id)
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 bg-white'
            }`}
            style={{ width: isTablet() ? '48%' : '47%' }}
          >
            <Text style={{ fontSize: isTablet() ? 24 : 20 }} className='text-center'>{goal.emoji}</Text>
            <Text 
              className='text-center mt-1 font-medium'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              {goal.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className='bg-emerald-500 px-4 py-4'>
        <View className='flex-row items-center justify-between'>
          <TouchableOpacity onPress={() => onNavigate && onNavigate('class10')}>
            <Text style={{ fontSize: isTablet() ? 24 : 20 }}>←</Text>
          </TouchableOpacity>
          <Text 
            className='text-white font-bold'
            style={{ fontSize: isTablet() ? 20 : 18 }}
          >
            Stream Discovery
          </Text>
          <View style={{ width: 24 }} />
        </View>
        
        {/* Progress Bar */}
        <View className='mt-4 bg-white/20 rounded-full h-2'>
          <View 
            className='bg-white rounded-full h-2'
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </View>
        <Text 
          className='text-white/90 text-center mt-2'
          style={{ fontSize: isTablet() ? 14 : 12 }}
        >
          Step {currentStep} of 4
        </Text>
      </View>

      <ScrollView 
        className='flex-1' 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View className='flex-1 justify-center items-center py-20'>
            <ActivityIndicator size="large" color="#10B981" />
            <Text 
              className='text-gray-600 mt-4 text-center'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              AI is analyzing your profile...
            </Text>
            <Text 
              className='text-gray-500 mt-2 text-center'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              This may take a few moments
            </Text>
          </View>
        ) : (
          renderCurrentStep()
        )}
      </ScrollView>

      {/* Navigation Buttons */}
      {!loading && (
        <View 
          className='bg-white border-t border-gray-200 px-4 py-4'
          style={{ paddingHorizontal: containerPadding }}
        >
          <View className='flex-row justify-between'>
            <TouchableOpacity
              onPress={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-xl ${
                currentStep === 1 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              <Text 
                className={`font-semibold ${
                  currentStep === 1 ? 'text-gray-400' : 'text-gray-700'
                }`}
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                Back
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleNext}
              className='bg-emerald-500 px-6 py-3 rounded-xl'
            >
              <Text 
                className='text-white font-semibold'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                {currentStep === 4 ? 'Get Recommendation' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
