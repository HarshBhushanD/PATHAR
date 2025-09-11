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

export default function BoardMasteryScreen({ onNavigate }) {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const containerPadding = getContainerPadding();

  const subjects = [
    {
      id: 'math',
      name: 'Mathematics',
      emoji: '📐',
      color: 'bg-blue-50',
      borderColor: 'border-blue-200',
      strength: 75,
      weakTopics: ['Quadratic Equations', 'Trigonometry', 'Statistics'],
      strongTopics: ['Algebra', 'Geometry', 'Arithmetic']
    },
    {
      id: 'science',
      name: 'Science',
      emoji: '🔬',
      color: 'bg-green-50',
      borderColor: 'border-green-200',
      strength: 68,
      weakTopics: ['Light Reflection', 'Chemical Reactions', 'Heredity'],
      strongTopics: ['Force & Motion', 'Acids & Bases', 'Life Processes']
    },
    {
      id: 'english',
      name: 'English',
      emoji: '📚',
      color: 'bg-purple-50',
      borderColor: 'border-purple-200',
      strength: 82,
      weakTopics: ['Grammar', 'Essay Writing'],
      strongTopics: ['Reading Comprehension', 'Literature', 'Vocabulary']
    },
    {
      id: 'social',
      name: 'Social Studies',
      emoji: '🌍',
      color: 'bg-orange-50',
      borderColor: 'border-orange-200',
      strength: 71,
      weakTopics: ['History Dates', 'Geography Maps', 'Civics'],
      strongTopics: ['Economics', 'General Knowledge', 'Current Affairs']
    },
    {
      id: 'hindi',
      name: 'Hindi',
      emoji: '📖',
      color: 'bg-red-50',
      borderColor: 'border-red-200',
      strength: 79,
      weakTopics: ['Grammar', 'Poetry Analysis'],
      strongTopics: ['Reading', 'Writing', 'Vocabulary']
    }
  ];

  const practiceQuestions = {
    math: [
      {
        id: 1,
        question: "What is the value of x in the equation 2x + 5 = 13?",
        options: ["x = 3", "x = 4", "x = 5", "x = 6"],
        correct: 1,
        explanation: "2x + 5 = 13, so 2x = 8, therefore x = 4"
      },
      {
        id: 2,
        question: "In a right triangle, if one angle is 30°, what is the other acute angle?",
        options: ["45°", "60°", "90°", "120°"],
        correct: 1,
        explanation: "In a right triangle, the sum of acute angles is 90°. So 30° + 60° = 90°"
      }
    ],
    science: [
      {
        id: 1,
        question: "What is the chemical formula for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        correct: 0,
        explanation: "Water is composed of 2 hydrogen atoms and 1 oxygen atom, so its formula is H2O"
      },
      {
        id: 2,
        question: "Which force keeps planets in orbit around the sun?",
        options: ["Magnetic force", "Gravitational force", "Electric force", "Frictional force"],
        correct: 1,
        explanation: "Gravitational force between the sun and planets keeps them in orbit"
      }
    ],
    english: [
      {
        id: 1,
        question: "Choose the correct form: 'She _____ to school every day.'",
        options: ["go", "goes", "going", "gone"],
        correct: 1,
        explanation: "With singular subject 'She' and present tense, we use 'goes'"
      },
      {
        id: 2,
        question: "What is the synonym of 'beautiful'?",
        options: ["ugly", "pretty", "bad", "terrible"],
        correct: 1,
        explanation: "Pretty is a synonym of beautiful, meaning attractive or pleasing"
      }
    ]
  };

  const mockTests = [
    {
      id: 1,
      name: 'Mathematics Mock Test 1',
      duration: '3 hours',
      questions: 30,
      difficulty: 'Medium',
      subject: 'math'
    },
    {
      id: 2,
      name: 'Science Mock Test 1',
      duration: '3 hours',
      questions: 30,
      difficulty: 'Medium',
      subject: 'science'
    },
    {
      id: 3,
      name: 'Full Syllabus Test',
      duration: '3 hours',
      questions: 80,
      difficulty: 'Hard',
      subject: 'all'
    }
  ];

  const getStrengthColor = (strength) => {
    if (strength >= 80) return 'text-green-600';
    if (strength >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStrengthBg = (strength) => {
    if (strength >= 80) return 'bg-green-100';
    if (strength >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const startPractice = (subjectId, topic = null) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (subject && practiceQuestions[subjectId]) {
      setSelectedSubject(subject);
      setSelectedTopic(topic);
      setShowQuiz(true);
      setCurrentQuestion(0);
      setScore(0);
      setQuizCompleted(false);
    } else {
      Alert.alert('Coming Soon', 'Practice questions for this subject are being prepared!');
    }
  };

  const startMockTest = (test) => {
    Alert.alert(
      'Start Mock Test',
      `Are you ready to start "${test.name}"?\n\nDuration: ${test.duration}\nQuestions: ${test.questions}\nDifficulty: ${test.difficulty}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Start Test', onPress: () => {
          Alert.alert('Mock Test', 'Mock test feature will be available soon!');
        }}
      ]
    );
  };

  const handleAnswer = (selectedOption) => {
    const questions = practiceQuestions[selectedSubject.id];
    const question = questions[currentQuestion];
    
    if (selectedOption === question.correct) {
      setScore(score + 1);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setSelectedSubject(null);
    setSelectedTopic(null);
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
  };

  const renderQuiz = () => {
    if (!selectedSubject || !practiceQuestions[selectedSubject.id]) return null;
    
    const questions = practiceQuestions[selectedSubject.id];
    const question = questions[currentQuestion];
    
    if (quizCompleted) {
      const percentage = Math.round((score / questions.length) * 100);
      return (
        <View className='flex-1 justify-center items-center px-6'>
          <Text style={{ fontSize: isTablet() ? 32 : 24 }} className='mb-4'>🎉</Text>
          <Text 
            className='font-bold text-center mb-2'
            style={{ fontSize: isTablet() ? 24 : 20 }}
          >
            Quiz Completed!
          </Text>
          <Text 
            className='text-gray-600 text-center mb-6'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            You scored {score} out of {questions.length} questions
          </Text>
          <View className={`rounded-xl p-4 mb-6 ${getStrengthBg(percentage)}`}>
            <Text 
              className={`font-bold text-center ${getStrengthColor(percentage)}`}
              style={{ fontSize: isTablet() ? 32 : 28 }}
            >
              {percentage}%
            </Text>
          </View>
          <Text 
            className='text-gray-600 text-center mb-6'
            style={{ fontSize: isTablet() ? 14 : 12 }}
          >
            {percentage >= 80 ? 'Excellent! Keep up the great work!' : 
             percentage >= 60 ? 'Good job! Practice more to improve.' : 
             'Keep practicing! You can do better.'}
          </Text>
          <TouchableOpacity
            onPress={resetQuiz}
            className='bg-blue-500 px-6 py-3 rounded-xl'
          >
            <Text 
              className='text-white font-semibold'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              Try Again
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    return (
      <View className='flex-1 px-6'>
        <View className='mb-6'>
          <Text 
            className='font-bold mb-2'
            style={{ fontSize: isTablet() ? 18 : 16 }}
          >
            Question {currentQuestion + 1} of {questions.length}
          </Text>
          <View className='bg-gray-200 rounded-full h-2'>
            <View 
              className='bg-blue-500 rounded-full h-2'
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </View>
        </View>
        
        <View className='mb-6'>
          <Text 
            className='font-semibold mb-4'
            style={{ fontSize: isTablet() ? 18 : 16 }}
          >
            {question.question}
          </Text>
          
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleAnswer(index)}
              className='bg-white border border-gray-200 rounded-xl p-4 mb-3'
            >
              <Text 
                className='text-gray-800'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className='bg-purple-500 px-4 py-4'>
        <View className='flex-row items-center justify-between'>
          <TouchableOpacity onPress={() => onNavigate && onNavigate('class10')}>
            <Text style={{ fontSize: isTablet() ? 24 : 20 }} className='text-white'>←</Text>
          </TouchableOpacity>
          <View className='flex-row items-center'>
            <Text style={{ fontSize: isTablet() ? 24 : 20 }}>📚</Text>
            <Text 
              className='text-white font-bold ml-2'
              style={{ fontSize: isTablet() ? 20 : 18 }}
            >
              Board Mastery
            </Text>
          </View>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <ScrollView 
        className='flex-1' 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Performance Overview */}
        <View style={{ paddingHorizontal: containerPadding, marginTop: 24 }}>
          <Text 
            className='font-extrabold mb-4'
            style={{ fontSize: isTablet() ? 24 : 20 }}
          >
            Your Performance Overview
          </Text>
          <Text 
            className='text-gray-600 mb-6'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            AI analysis of your strengths and areas for improvement
          </Text>
          
          {subjects.map((subject) => (
            <View 
              key={subject.id}
              className={`${subject.color} ${subject.borderColor} border rounded-2xl p-4 mb-4`}
            >
              <View className='flex-row items-center justify-between mb-3'>
                <View className='flex-row items-center'>
                  <Text style={{ fontSize: isTablet() ? 24 : 20 }}>{subject.emoji}</Text>
                  <Text 
                    className='font-bold ml-3'
                    style={{ fontSize: isTablet() ? 18 : 16 }}
                  >
                    {subject.name}
                  </Text>
                </View>
                <View className={`${getStrengthBg(subject.strength)} px-3 py-1 rounded-full`}>
                  <Text 
                    className={`font-bold ${getStrengthColor(subject.strength)}`}
                    style={{ fontSize: isTablet() ? 16 : 14 }}
                  >
                    {subject.strength}%
                  </Text>
                </View>
              </View>
              
              <View className='mb-3'>
                <View className='bg-gray-200 rounded-full h-2'>
                  <View 
                    className={`rounded-full h-2 ${
                      subject.strength >= 80 ? 'bg-green-500' :
                      subject.strength >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${subject.strength}%` }}
                  />
                </View>
              </View>
              
              <View className='flex-row justify-between'>
                <View className='flex-1'>
                  <Text 
                    className='font-semibold text-green-700 mb-1'
                    style={{ fontSize: isTablet() ? 14 : 12 }}
                  >
                    Strong Areas:
                  </Text>
                  {subject.strongTopics.map((topic, index) => (
                    <Text 
                      key={index}
                      className='text-green-600'
                      style={{ fontSize: isTablet() ? 12 : 10 }}
                    >
                      • {topic}
                    </Text>
                  ))}
                </View>
                <View className='flex-1 ml-4'>
                  <Text 
                    className='font-semibold text-red-700 mb-1'
                    style={{ fontSize: isTablet() ? 14 : 12 }}
                  >
                    Need Practice:
                  </Text>
                  {subject.weakTopics.map((topic, index) => (
                    <Text 
                      key={index}
                      className='text-red-600'
                      style={{ fontSize: isTablet() ? 12 : 10 }}
                    >
                      • {topic}
                    </Text>
                  ))}
                </View>
              </View>
              
              <TouchableOpacity
                onPress={() => startPractice(subject.id)}
                className='bg-purple-500 rounded-xl py-3 mt-4'
              >
                <Text 
                  className='text-white font-semibold text-center'
                  style={{ fontSize: isTablet() ? 16 : 14 }}
                >
                  Practice {subject.name}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Mock Tests */}
        <View style={{ paddingHorizontal: containerPadding, marginTop: 32 }}>
          <Text 
            className='font-extrabold mb-4'
            style={{ fontSize: isTablet() ? 24 : 20 }}
          >
            Mock Tests
          </Text>
          <Text 
            className='text-gray-600 mb-6'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            Practice with real exam-like conditions
          </Text>
          
          {mockTests.map((test) => (
            <View 
              key={test.id}
              className='bg-white border border-gray-200 rounded-2xl p-4 mb-4'
            >
              <View className='flex-row items-center justify-between mb-3'>
                <Text 
                  className='font-bold'
                  style={{ fontSize: isTablet() ? 18 : 16 }}
                >
                  {test.name}
                </Text>
                <View className={`px-3 py-1 rounded-full ${
                  test.difficulty === 'Easy' ? 'bg-green-100' :
                  test.difficulty === 'Medium' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  <Text 
                    className={`font-semibold ${
                      test.difficulty === 'Easy' ? 'text-green-700' :
                      test.difficulty === 'Medium' ? 'text-yellow-700' : 'text-red-700'
                    }`}
                    style={{ fontSize: isTablet() ? 12 : 10 }}
                  >
                    {test.difficulty}
                  </Text>
                </View>
              </View>
              
              <View className='flex-row justify-between mb-4'>
                <View className='flex-row items-center'>
                  <Text style={{ fontSize: isTablet() ? 16 : 14 }}>⏱️</Text>
                  <Text 
                    className='text-gray-600 ml-2'
                    style={{ fontSize: isTablet() ? 14 : 12 }}
                  >
                    {test.duration}
                  </Text>
                </View>
                <View className='flex-row items-center'>
                  <Text style={{ fontSize: isTablet() ? 16 : 14 }}>❓</Text>
                  <Text 
                    className='text-gray-600 ml-2'
                    style={{ fontSize: isTablet() ? 14 : 12 }}
                  >
                    {test.questions} Questions
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity
                onPress={() => startMockTest(test)}
                className='bg-blue-500 rounded-xl py-3'
              >
                <Text 
                  className='text-white font-semibold text-center'
                  style={{ fontSize: isTablet() ? 16 : 14 }}
                >
                  Start Mock Test
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Study Tips */}
        <View style={{ paddingHorizontal: containerPadding, marginTop: 32 }}>
          <Text 
            className='font-extrabold mb-4'
            style={{ fontSize: isTablet() ? 24 : 20 }}
          >
            Study Tips
          </Text>
          
          <View className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4'>
            <Text 
              className='font-semibold mb-3'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              💡 AI Recommendations for You:
            </Text>
            <Text 
              className='text-gray-700 mb-2'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              • Focus more on Mathematics - practice quadratic equations daily
            </Text>
            <Text 
              className='text-gray-700 mb-2'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              • Science needs attention - revise chemical reactions and light reflection
            </Text>
            <Text 
              className='text-gray-700 mb-2'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              • English is your strength - maintain the momentum
            </Text>
            <Text 
              className='text-gray-700'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              • Take mock tests weekly to track progress
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Quiz Modal */}
      <Modal
        visible={showQuiz}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView className='flex-1 bg-white'>
          <View className='bg-purple-500 px-4 py-4'>
            <View className='flex-row items-center justify-between'>
              <TouchableOpacity onPress={resetQuiz}>
                <Text style={{ fontSize: isTablet() ? 24 : 20 }} className='text-white'>←</Text>
              </TouchableOpacity>
              <Text 
                className='text-white font-bold'
                style={{ fontSize: isTablet() ? 18 : 16 }}
              >
                {selectedSubject?.name} Practice
              </Text>
              <View style={{ width: 24 }} />
            </View>
          </View>
          {renderQuiz()}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
