import { StatusBar } from 'expo-status-bar';
import '../global.css';
import React, { useState, useEffect } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { 
  wp, 
  hp, 
  isTablet, 
  isLargePhone, 
  getContainerPadding, 
  getButtonHeight 
} from '../utils/responsive';
import { useAuth } from '../contexts/AuthContext';
import { saveAptitudeResults } from '../services/firestore';
import { generateAptitudeQuestions, getDefaultQuestions, isPuterAvailable } from '../services/puterAI';

export default function AptitudeScreen() {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatingQuestions, setGeneratingQuestions] = useState(false);

  const containerPadding = getContainerPadding();
  const buttonHeight = getButtonHeight();

  // Function to call Puter AI for generating questions
  const generateQuestionsWithPuter = async () => {
    try {
      setGeneratingQuestions(true);
      
      // Try to generate questions with Puter AI
      const aiQuestions = await generateAptitudeQuestions('12th', 10);
      
      if (aiQuestions && aiQuestions.length === 10) {
        setQuestions(aiQuestions);
        console.log('Successfully loaded AI-generated questions');
      } else {
        // Fallback to default questions
        console.log('Using default questions as fallback');
        setQuestions(getDefaultQuestions('12th'));
      }
      
    } catch (error) {
      console.log('Error generating questions:', error);
      setQuestions(getDefaultQuestions('12th'));
    } finally {
      setGeneratingQuestions(false);
      setLoading(false);
    }
  };

  // Load questions when component mounts
  useEffect(() => {
    generateQuestionsWithPuter();
  }, []);

  const handleAnswer = (option) => {
    const newAnswers = { ...answers, [currentQuestion]: option };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = async (finalAnswers) => {
    const scores = { Engineering: 0, Medical: 0, Commerce: 0, Arts: 0 };
    
    Object.values(finalAnswers).forEach(answer => {
      scores[answer.category]++;
    });

    const topCategory = Object.keys(scores).reduce((a, b) => 
      scores[a] > scores[b] ? a : b
    );

    const results = { topCategory, scores, totalQuestions: questions.length };
    setShowResults(results);

    // Save results to Firestore with better error handling
    if (user) {
      try {
        console.log('Saving aptitude results for user:', user.uid);
        const docRef = await saveAptitudeResults(user.uid, {
          ...results,
          completedAt: new Date().toISOString(),
          studentType: '12th',
          answers: finalAnswers
        });
        console.log('Aptitude results saved successfully with ID:', docRef.id);
        
        // Show success message to user
        Alert.alert(
          'Results Saved!', 
          'Your aptitude test results have been saved successfully.',
          [{ text: 'OK' }]
        );
      } catch (error) {
        console.error('Failed to save aptitude results:', error);
        
        // Show detailed error message to user
        let errorMessage = 'Failed to save your results. ';
        if (error.code === 'permission-denied') {
          errorMessage += 'Please make sure you are logged in and try again.';
        } else if (error.code === 'unavailable') {
          errorMessage += 'Network error. Please check your internet connection.';
        } else {
          errorMessage += 'Please try again later.';
        }
        
        Alert.alert(
          'Save Failed', 
          errorMessage,
          [{ text: 'OK' }]
        );
      }
    } else {
      console.warn('No user logged in, cannot save results');
      Alert.alert(
        'Not Logged In', 
        'Please log in to save your results.',
        [{ text: 'OK' }]
      );
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const regenerateQuestions = async () => {
    setLoading(true);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    await generateQuestionsWithPuter();
  };

  const getRecommendations = (category) => {
    const recommendations = {
      Engineering: {
        streams: ["Computer Science Engineering", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering"],
        exams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE"],
        careers: ["Software Engineer", "Data Scientist", "Mechanical Engineer", "Research Scientist"],
        colleges: ["IITs", "NITs", "BITS Pilani", "Top Engineering Colleges"]
      },
      Medical: {
        streams: ["MBBS", "BDS", "BAMS", "BHMS"],
        exams: ["NEET UG", "AIIMS", "JIPMER", "State Medical Exams"],
        careers: ["Doctor", "Surgeon", "Medical Researcher", "Healthcare Administrator"],
        colleges: ["AIIMS", "Medical Colleges", "Dental Colleges", "Ayurveda Colleges"]
      },
      Commerce: {
        streams: ["B.Com", "BBA", "Economics Honors", "CA Foundation"],
        exams: ["DU Entrance", "IPM", "SET", "NPAT"],
        careers: ["Chartered Accountant", "Investment Banker", "Business Analyst", "Entrepreneur"],
        colleges: ["Delhi University", "Shri Ram College", "IIMs", "Business Schools"]
      },
      Arts: {
        streams: ["BA English", "BA History", "BA Psychology", "Mass Communication"],
        exams: ["DU Entrance", "BHU UET", "DUET", "University Specific"],
        careers: ["Civil Servant", "Journalist", "Teacher", "Content Creator"],
        colleges: ["Delhi University", "JNU", "BHU", "Liberal Arts Colleges"]
      }
    };
    return recommendations[category] || recommendations.Engineering;
  };

  // Loading state
  if (loading) {
    return (
      <SafeAreaView className='flex-1 bg-white'>
        <StatusBar style="dark" />
        <View className='flex-1 justify-center items-center' style={{ paddingHorizontal: containerPadding }}>
          <ActivityIndicator size="large" color="#8B5CF6" />
          <Text 
            className='text-gray-600 text-center mt-4'
            style={{ fontSize: isTablet() ? 18 : 16 }}
          >
            {generatingQuestions 
              ? `Generating personalized questions with ${isPuterAvailable() ? 'Puter AI' : 'fallback system'}...` 
              : 'Loading aptitude test...'
            }
          </Text>
          {generatingQuestions && isPuterAvailable() && (
            <Text 
              className='text-purple-600 text-center mt-2'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              🤖 AI-powered questions for better accuracy
            </Text>
          )}
        </View>
      </SafeAreaView>
    );
  }

  if (showResults) {
    const recommendations = getRecommendations(showResults.topCategory);
    
    return (
      <SafeAreaView className='flex-1 bg-white'>
        <StatusBar style="dark" />
        
        <ScrollView 
          className='flex-1 mt-10' 
          style={{ paddingHorizontal: containerPadding }}
          contentContainerStyle={{ paddingBottom: isTablet() ? 48 : 32 }}
          showsVerticalScrollIndicator={false}
        >
          <View 
            className='bg-purple-500 rounded-2xl mb-6'
            style={{ 
              paddingVertical: isTablet() ? 40 : 32,
              paddingHorizontal: isTablet() ? 32 : 24,
              marginHorizontal: -containerPadding,
              marginTop: isTablet() ? 0 : 0
            }}
          >
            <Text 
              className='text-white font-extrabold mb-2'
              style={{ fontSize: isTablet() ? 36 : isLargePhone() ? 32 : 28 }}
            >
              Your Class 12th Path!
            </Text>
            <Text 
              className='text-purple-100'
              style={{ fontSize: isTablet() ? 18 : 16 }}
            >
              Based on your responses, here's your recommended college stream:
            </Text>
          </View>

          <View 
            className='bg-purple-50 border border-purple-200 rounded-xl mb-6'
            style={{ padding: isTablet() ? 24 : 20 }}
          >
            <Text 
              className='font-bold text-purple-800 mb-2'
              style={{ fontSize: isTablet() ? 28 : 24 }}
            >
              Best Match: {showResults.topCategory}
            </Text>
            <Text 
              className='text-purple-600'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              You scored {showResults.scores[showResults.topCategory]}/{showResults.totalQuestions} points in {showResults.topCategory}, showing strong alignment with this field.
            </Text>
          </View>

          <View className='mb-6'>
            <Text 
              className='font-bold mb-4'
              style={{ fontSize: isTablet() ? 24 : 20 }}
            >
              Score Breakdown
            </Text>
            <View className={isTablet() ? 'flex-row flex-wrap -mx-2' : ''}>
              {Object.entries(showResults.scores).map(([category, score]) => (
                <View 
                  key={category} 
                  className={`flex-row justify-between items-center mb-3 ${
                    isTablet() ? 'w-1/2 px-2' : ''
                  }`}
                >
                  <Text 
                    className='font-semibold'
                    style={{ fontSize: isTablet() ? 16 : 14 }}
                  >
                    {category}
                  </Text>
                  <View className='flex-row'>
                    {[...Array(10)].map((_, i) => (
                      <View
                        key={i}
                        className={`rounded-full mr-1 ${
                          i < score ? 'bg-purple-500' : 'bg-gray-200'
                        }`}
                        style={{ 
                          width: isTablet() ? 12 : 10,
                          height: isTablet() ? 12 : 10
                        }}
                      />
                    ))}
                    <Text 
                      className='ml-2 text-gray-600'
                      style={{ fontSize: isTablet() ? 14 : 12 }}
                    >
                      {score}/10
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View className='mb-6'>
            <Text 
              className='font-bold mb-4'
              style={{ fontSize: isTablet() ? 24 : 20 }}
            >
              Recommended Courses
            </Text>
            <View className={isTablet() ? 'flex-row flex-wrap -mx-2' : 'space-y-2'}>
              {recommendations.streams.map((stream, index) => (
                <View 
                  key={index} 
                  className={`bg-blue-50 border border-blue-200 rounded-xl ${
                    isTablet() ? 'w-1/2 px-2 mb-3' : 'mb-2'
                  }`}
                  style={{ padding: isTablet() ? 16 : 12 }}
                >
                  <Text 
                    className='text-blue-800 font-medium'
                    style={{ fontSize: isTablet() ? 15 : 14 }}
                  >
                    • {stream}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className='mb-6'>
            <Text 
              className='font-bold mb-4'
              style={{ fontSize: isTablet() ? 24 : 20 }}
            >
              Entrance Exams to Focus On
            </Text>
            <View className={isTablet() ? 'flex-row flex-wrap -mx-2' : 'space-y-2'}>
              {recommendations.exams.map((exam, index) => (
                <View 
                  key={index} 
                  className={`bg-orange-50 border border-orange-200 rounded-xl ${
                    isTablet() ? 'w-1/2 px-2 mb-3' : 'mb-2'
                  }`}
                  style={{ padding: isTablet() ? 16 : 12 }}
                >
                  <Text 
                    className='text-orange-800 font-medium'
                    style={{ fontSize: isTablet() ? 15 : 14 }}
                  >
                    • {exam}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className='mb-6'>
            <Text 
              className='font-bold mb-4'
              style={{ fontSize: isTablet() ? 24 : 20 }}
            >
              Career Opportunities
            </Text>
            <View className={isTablet() ? 'flex-row flex-wrap -mx-2' : 'space-y-2'}>
              {recommendations.careers.map((career, index) => (
                <View 
                  key={index} 
                  className={`bg-green-50 border border-green-200 rounded-xl ${
                    isTablet() ? 'w-1/2 px-2 mb-3' : 'mb-2'
                  }`}
                  style={{ padding: isTablet() ? 16 : 12 }}
                >
                  <Text 
                    className='text-green-800 font-medium'
                    style={{ fontSize: isTablet() ? 15 : 14 }}
                  >
                    • {career}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className='mb-8'>
            <Text 
              className='font-bold mb-4'
              style={{ fontSize: isTablet() ? 24 : 20 }}
            >
              Top Colleges to Target
            </Text>
            <View className={isTablet() ? 'flex-row flex-wrap -mx-2' : 'space-y-2'}>
              {recommendations.colleges.map((college, index) => (
                <View 
                  key={index} 
                  className={`bg-amber-50 border border-amber-200 rounded-xl ${
                    isTablet() ? 'w-1/2 px-2 mb-3' : 'mb-2'
                  }`}
                  style={{ padding: isTablet() ? 16 : 12 }}
                >
                  <Text 
                    className='text-amber-800 font-medium'
                    style={{ fontSize: isTablet() ? 15 : 14 }}
                  >
                    • {college}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className={`${isTablet() ? 'flex-row justify-center space-x-4' : 'space-y-3'}`}>
            <TouchableOpacity
              onPress={resetQuiz}
              className={`bg-purple-500 rounded-xl shadow-lg ${
                isTablet() ? 'px-8' : 'w-full'
              }`}
              style={{ 
                paddingVertical: isTablet() ? 16 : 12,
                minHeight: buttonHeight,
                minWidth: isTablet() ? 160 : 'auto'
              }}
            >
              <Text 
                className='text-white font-semibold text-center'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                Retake Test
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={regenerateQuestions}
              className={`bg-green-500 rounded-xl shadow-lg ${
                isTablet() ? 'px-8' : 'w-full'
              }`}
              style={{ 
                paddingVertical: isTablet() ? 16 : 12,
                minHeight: buttonHeight,
                minWidth: isTablet() ? 160 : 'auto'
              }}
            >
              <Text 
                className='text-white font-semibold text-center'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                New AI Questions
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => Alert.alert('College Search', 'Opening college search based on your results...')}
              className={`bg-blue-500 rounded-xl shadow-lg ${
                isTablet() ? 'px-8' : 'w-full'
              }`}
              style={{ 
                paddingVertical: isTablet() ? 16 : 12,
                minHeight: buttonHeight,
                minWidth: isTablet() ? 160 : 'auto'
              }}
            >
              <Text 
                className='text-white font-semibold text-center'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                Find Colleges
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Quiz Interface
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (!currentQ) {
    return (
      <SafeAreaView className='flex-1 bg-white'>
        <StatusBar style="dark" />
        <View className='flex-1 justify-center items-center' style={{ paddingHorizontal: containerPadding }}>
          <Text className='text-gray-600 text-center'>Error loading questions. Please try again.</Text>
          <TouchableOpacity
            onPress={regenerateQuestions}
            className='bg-purple-500 rounded-xl mt-4 px-6 py-3'
          >
            <Text className='text-white font-semibold'>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style="auto" />
      
      <ScrollView 
        className='flex-1'
        style={{ paddingHorizontal: containerPadding }}
        contentContainerStyle={{ 
          paddingVertical: isTablet() ? 40 : 24,
          paddingBottom: isTablet() ? 48 : 32 
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className='mb-8 mt-10'>
          <Text 
            className='font-extrabold text-center mb-2'
            style={{ fontSize: isTablet() ? 32 : 24 }}
          >
            Class 12th Stream Selector
          </Text>
          <Text 
            className='text-purple-600 text-center mb-2'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            AI-Powered Aptitude Test
          </Text>
          <Text 
            className='text-gray-600 text-center mb-6'
            style={{ fontSize: isTablet() ? 18 : 16 }}
          >
            Find your perfect college stream and career path
          </Text>
          
          {/* Progress Bar */}
          <View className='bg-gray-200 rounded-full h-3 mb-2'>
            <View 
              className='bg-purple-500 h-3 rounded-full transition-all duration-300'
              style={{ width: `${progress}%` }}
            />
          </View>
          <Text 
            className='text-center text-gray-500'
            style={{ fontSize: isTablet() ? 14 : 12 }}
          >
            Question {currentQuestion + 1} of {questions.length}
          </Text>
        </View>

        {/* Question Card */}
        <View 
          className='bg-white border border-gray-200 rounded-2xl shadow-lg mb-8'
          style={{ 
            padding: isTablet() ? 32 : 24,
            maxWidth: isTablet() ? 600 : '100%',
            alignSelf: 'center',
            width: '100%'
          }}
        >
          <Text 
            className='font-bold text-gray-800 mb-6 text-center'
            style={{ 
              fontSize: isTablet() ? 24 : 20,
              lineHeight: isTablet() ? 32 : 28
            }}
          >
            {currentQ.question}
          </Text>

          <View className='space-y-4'>
            {currentQ.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleAnswer(option)}
                className='bg-gray-50 border-2 border-gray-200 rounded-xl p-4 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200'
                style={{ 
                  paddingVertical: isTablet() ? 20 : 16,
                  paddingHorizontal: isTablet() ? 24 : 16,
                  minHeight: isTablet() ? 64 : 56
                }}
                activeOpacity={0.7}
              >
                <View className='flex-row items-center'>
                  <View 
                    className='rounded-full border-2 border-gray-400 mr-4 items-center justify-center'
                    style={{ 
                      width: isTablet() ? 24 : 20,
                      height: isTablet() ? 24 : 20
                    }}
                  >
                    <Text 
                      className='font-bold text-gray-600'
                      style={{ fontSize: isTablet() ? 14 : 12 }}
                    >
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>
                  <Text 
                    className='flex-1 text-gray-700 font-medium'
                    style={{ 
                      fontSize: isTablet() ? 16 : 14,
                      lineHeight: isTablet() ? 24 : 20
                    }}
                  >
                    {option.text}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Navigation Buttons */}
        <View className={`${isTablet() ? 'flex-row justify-center space-x-4' : 'space-y-3'}`}>
          {currentQuestion > 0 && (
            <TouchableOpacity
              onPress={() => setCurrentQuestion(currentQuestion - 1)}
              className={`bg-gray-500 rounded-xl shadow-lg ${
                isTablet() ? 'px-8' : 'w-full'
              }`}
              style={{ 
                paddingVertical: isTablet() ? 16 : 12,
                minHeight: buttonHeight,
                minWidth: isTablet() ? 160 : 'auto'
              }}
            >
              <Text 
                className='text-white font-semibold text-center'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                Previous
              </Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            onPress={regenerateQuestions}
            className={`bg-green-500 rounded-xl shadow-lg ${
              isTablet() ? 'px-8' : 'w-full'
            }`}
            style={{ 
              paddingVertical: isTablet() ? 16 : 12,
              minHeight: buttonHeight,
              minWidth: isTablet() ? 160 : 'auto'
            }}
          >
            <Text 
              className='text-white font-semibold text-center'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              Generate New Questions
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 