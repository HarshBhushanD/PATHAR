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
import { 
  getSubjectsByClass, 
  getPracticeQuestionsByClass, 
  getMockQuestionsByClass, 
  getMockTestsByClass 
} from '../constants';

export default function BoardMasteryScreen({ onNavigate }) {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState([]); // New state for random questions
  const [mockStatsBySubject, setMockStatsBySubject] = useState({}); // Track mock results per subject

  const containerPadding = getContainerPadding();

  // Get subjects based on user's class
  const subjects = getSubjectsByClass(user?.studentType);
  const practiceQuestions = {};
  const mockQuestionBank = {};
  const mockTests = getMockTestsByClass(user?.studentType);

  // Initialize practice questions and mock question bank for all subjects
  subjects.forEach(subject => {
    practiceQuestions[subject.id] = getPracticeQuestionsByClass(user?.studentType, subject.id);
    mockQuestionBank[subject.id] = getMockQuestionsByClass(user?.studentType, subject.id);
  });







  // Function to get 5 random questions from a subject
  const getRandomQuestions = (subjectQuestions, count = 5) => {
    const shuffled = [...subjectQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Ensure we always return exactly `count` questions
  const selectExactlyNQuestions = (primaryPool, count, fallbackPool = []) => {
    const uniqueSet = new Set();
    const result = [];

    const addFrom = (arr) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      for (let i = 0; i < shuffled.length && result.length < count; i++) {
        const q = shuffled[i];
        const key = `${q.question}__${Array.isArray(q.options) ? q.options.join('|') : ''}`;
        if (!uniqueSet.has(key)) {
          uniqueSet.add(key);
          result.push(q);
        }
      }
    };

    addFrom(primaryPool || []);
    if (result.length < count) addFrom(fallbackPool || []);

    // As a last resort, allow repeats to reach exact count
    while (result.length < count && (primaryPool?.length || 0) > 0) {
      result.push(primaryPool[Math.floor(Math.random() * primaryPool.length)]);
    }
    while (result.length < count && (fallbackPool?.length || 0) > 0) {
      result.push(fallbackPool[Math.floor(Math.random() * fallbackPool.length)]);
    }

    return result.slice(0, count);
  };

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
      // Get 5 random questions from the subject
      const randomQuestions = getRandomQuestions(practiceQuestions[subjectId], 5);
      
      setSelectedSubject(subject);
      setSelectedTopic(topic);
      setRandomQuestions(randomQuestions);
      setShowQuiz(true);
      setCurrentQuestion(0);
      setScore(0);
      setQuizCompleted(false);
    } else {
      Alert.alert('Coming Soon', 'Practice questions for this subject are being prepared!');
    }
  };

  const startMockTest = (test) => {
    const begin = () => {
      let pool = [];
      let combined = [];
      
      // Build combined question pool from all available subjects
      Object.keys(mockQuestionBank).forEach(subjectId => {
        if (mockQuestionBank[subjectId] && mockQuestionBank[subjectId].length > 0) {
          combined = [...combined, ...mockQuestionBank[subjectId]];
        }
      });

      if (test.subject === 'all') {
        pool = combined;
      } else if (test.subject === 'pcm') {
        // Physics, Chemistry, Math combination for class 12
        pool = [
          ...(mockQuestionBank.physics || []),
          ...(mockQuestionBank.chemistry || []),
          ...(mockQuestionBank.math || [])
        ];
      } else if (test.subject === 'pcb') {
        // Physics, Chemistry, Biology combination for class 12
        pool = [
          ...(mockQuestionBank.physics || []),
          ...(mockQuestionBank.chemistry || []),
          ...(mockQuestionBank.biology || [])
        ];
      } else if (mockQuestionBank[test.subject]) {
        pool = mockQuestionBank[test.subject];
      } else {
        pool = combined; // Fallback to all questions
      }

      // Pick exactly the required number of questions
      const questionCount = test.subject === 'all' ? (user?.studentType?.includes('12') ? 150 : 80) : 
                          (test.subject === 'pcm' || test.subject === 'pcb') ? 90 : 30;
      const selected = selectExactlyNQuestions(pool, questionCount, combined);

      const subjectObj = subjects.find(s => s.id === (test.subject === 'all' ? subjects[0].id : test.subject)) || subjects[0];
      setSelectedSubject(subjectObj);
      setSelectedTopic(null);
      setRandomQuestions(selected);
      setShowQuiz(true);
      setCurrentQuestion(0);
      setScore(0);
      setQuizCompleted(false);
    };

    const questionCount = test.subject === 'all' ? (user?.studentType?.includes('12') ? 150 : 80) : 
                        (test.subject === 'pcm' || test.subject === 'pcb') ? 90 : test.questions;
    
    Alert.alert(
      'Start Mock Test',
      `Are you ready to start "${test.name}"?\n\nDuration: ${test.duration}\nQuestions: ${questionCount}\nDifficulty: ${test.difficulty}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Start Test', onPress: begin }
      ]
    );
  };

  const handleAnswer = (selectedOption) => {
    const question = randomQuestions[currentQuestion];
    
    if (selectedOption === question.correct) {
      setScore(score + 1);
    }
    
    if (currentQuestion < randomQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const finalScore = score + (selectedOption === question.correct ? 1 : 0);
      setQuizCompleted(true);
      // Save last mock result for selected subject
      if (selectedSubject && randomQuestions && randomQuestions.length > 0) {
        const total = randomQuestions.length;
        const percent = Math.round((finalScore / total) * 100);
        setMockStatsBySubject((prev) => ({
          ...prev,
          [selectedSubject.id]: {
            attempts: (prev?.[selectedSubject.id]?.attempts || 0) + 1,
            lastScore: finalScore,
            total,
            percent,
            updatedAt: new Date().toISOString(),
          },
        }));
      }
    }
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setSelectedSubject(null);
    setSelectedTopic(null);
    setRandomQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
  };

  const renderQuiz = () => {
    if (!selectedSubject || !randomQuestions.length) return null;
    
    const question = randomQuestions[currentQuestion];
    
    if (quizCompleted) {
      const percentage = Math.round((score / randomQuestions.length) * 100);
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
            You scored {score} out of {randomQuestions.length} questions
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
          <View className='flex-row space-x-4'>
            <TouchableOpacity
              onPress={() => startPractice(selectedSubject.id)}
              className='bg-green-500 px-6 py-3 rounded-xl'
            >
              <Text 
                className='text-white font-semibold'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                Practice Again
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={resetQuiz}
              className='bg-blue-500 px-6 py-3 rounded-xl'
            >
              <Text 
                className='text-white font-semibold'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                Back to Menu
              </Text>
            </TouchableOpacity>
          </View>
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
            Question {currentQuestion + 1} of {randomQuestions.length}
          </Text>
          <View className='bg-gray-200 rounded-full h-2'>
            <View 
              className='bg-blue-500 rounded-full h-2'
              style={{ width: `${((currentQuestion + 1) / randomQuestions.length) * 100}%` }}
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
              className='bg-white border border-gray-200 rounded-xl p-4 mb-3 shadow-sm'
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
      <View className='bg-purple-500 px-4 py-4 mt-10'>
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
              {user?.studentType?.includes('12') ? 'Class 12 Board Mastery' : 'Class 10 Board Mastery'}
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

              {/* Latest Mock Test Result (if any) */}
              {mockStatsBySubject[subject.id] && (
                <View className='mb-3'>
                  <View className='flex-row items-center justify-between'>
                    <Text 
                      className='text-gray-700 font-semibold'
                      style={{ fontSize: isTablet() ? 14 : 12 }}
                    >
                      Last Mock Test
                    </Text>
                    <Text 
                      className='text-gray-500'
                      style={{ fontSize: isTablet() ? 12 : 10 }}
                    >
                      {mockStatsBySubject[subject.id].attempts} attempt{mockStatsBySubject[subject.id].attempts > 1 ? 's' : ''}
                    </Text>
                  </View>
                  <View className='flex-row items-center mt-1'>
                    <View className={`px-3 py-1 rounded-full ${getStrengthBg(mockStatsBySubject[subject.id].percent)}`}>
                      <Text 
                        className={`font-bold ${getStrengthColor(mockStatsBySubject[subject.id].percent)}`}
                        style={{ fontSize: isTablet() ? 14 : 12 }}
                      >
                        {mockStatsBySubject[subject.id].percent}% ({mockStatsBySubject[subject.id].lastScore}/{mockStatsBySubject[subject.id].total})
                      </Text>
                    </View>
                    <Text 
                      className='text-gray-500 ml-2'
                      style={{ fontSize: isTablet() ? 12 : 10 }}
                    >
                      Updated {new Date(mockStatsBySubject[subject.id].updatedAt).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              )}

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
                  Practice 5 Questions - {subject.name}
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
              💡 AI Recommendations for {user?.studentType || 'Class 10'}:
            </Text>
            {user?.studentType?.includes('12') ? (
              <>
                <Text 
                  className='text-gray-700 mb-2'
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  • Focus on Calculus and Integration - practice derivatives daily
                </Text>
                <Text 
                  className='text-gray-700 mb-2'
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  • Physics concepts need attention - master electromagnetic induction
                </Text>
                <Text 
                  className='text-gray-700 mb-2'
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  • Chemistry organic reactions - practice mechanism daily
                </Text>
                <Text 
                  className='text-gray-700 mb-2'
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  • Biology genetics and evolution topics need more practice
                </Text>
                <Text 
                  className='text-gray-700'
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  • Take PCM/PCB mock tests twice weekly for board preparation
                </Text>
              </>
            ) : (
              <>
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
              </>
            )}
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
                {selectedSubject?.name} Practice Quiz
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