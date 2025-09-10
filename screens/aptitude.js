import { StatusBar } from 'expo-status-bar';
import '../global.css';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AptitudeScreen({ onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What type of activities do you enjoy most?",
      options: [
        { text: "Solving mathematical problems", category: "Science" },
        { text: "Reading and writing stories", category: "Arts" },
        { text: "Managing money and budgets", category: "Commerce" },
        { text: "Working with tools and machinery", category: "Vocational" }
      ]
    },
    {
      id: 2,
      question: "Which subjects do you find most interesting?",
      options: [
        { text: "Physics and Chemistry", category: "Science" },
        { text: "History and Literature", category: "Arts" },
        { text: "Economics and Accounting", category: "Commerce" },
        { text: "Computer Applications", category: "Vocational" }
      ]
    },
    {
      id: 3,
      question: "What kind of career appeals to you?",
      options: [
        { text: "Doctor or Engineer", category: "Science" },
        { text: "Teacher or Journalist", category: "Arts" },
        { text: "Banker or Businessman", category: "Commerce" },
        { text: "Technician or Craftsperson", category: "Vocational" }
      ]
    },
    {
      id: 4,
      question: "How do you prefer to learn?",
      options: [
        { text: "Through experiments and research", category: "Science" },
        { text: "Through reading and discussion", category: "Arts" },
        { text: "Through practical examples", category: "Commerce" },
        { text: "Through hands-on practice", category: "Vocational" }
      ]
    },
    {
      id: 5,
      question: "What motivates you most?",
      options: [
        { text: "Discovering new things", category: "Science" },
        { text: "Expressing creativity", category: "Arts" },
        { text: "Financial success", category: "Commerce" },
        { text: "Building something useful", category: "Vocational" }
      ]
    }
  ];

  const handleAnswer = (option) => {
    const newAnswers = { ...answers, [currentQuestion]: option };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers) => {
    const scores = { Science: 0, Arts: 0, Commerce: 0, Vocational: 0 };
    
    Object.values(finalAnswers).forEach(answer => {
      scores[answer.category]++;
    });

    const topCategory = Object.keys(scores).reduce((a, b) => 
      scores[a] > scores[b] ? a : b
    );

    setShowResults({ topCategory, scores });
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const getRecommendations = (category) => {
    const recommendations = {
      Science: {
        streams: ["PCM (Physics, Chemistry, Math)", "PCB (Physics, Chemistry, Biology)"],
        careers: ["Doctor", "Engineer", "Researcher", "Pharmacist"],
        colleges: ["Medical Colleges", "Engineering Colleges", "Science Colleges"]
      },
      Arts: {
        streams: ["Humanities", "Social Sciences", "Languages"],
        careers: ["Teacher", "Journalist", "Lawyer", "Civil Servant"],
        colleges: ["Arts Colleges", "Liberal Arts Universities"]
      },
      Commerce: {
        streams: ["Commerce with Math", "Commerce without Math"],
        careers: ["Chartered Accountant", "Banker", "Business Analyst", "Entrepreneur"],
        colleges: ["Commerce Colleges", "Business Schools"]
      },
      Vocational: {
        streams: ["Technical Courses", "Skill Development Programs"],
        careers: ["Technician", "IT Professional", "Craftsperson", "Skilled Worker"],
        colleges: ["Polytechnics", "ITIs", "Skill Development Centers"]
      }
    };
    return recommendations[category] || recommendations.Science;
  };

  if (showResults) {
    const recommendations = getRecommendations(showResults.topCategory);
    
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

        <ScrollView className='flex-1 px-6' contentContainerStyle={{ paddingBottom: 32 }}>
          <View className='py-8 bg-purple-500 -mx-6 px-6 mb-6'>
            <Text className='text-white text-3xl font-extrabold mb-2'>Your Results!</Text>
            <Text className='text-purple-100'>Based on your responses, here's what we recommend:</Text>
          </View>

          <View className='bg-purple-50 border border-purple-200 rounded-xl p-6 mb-6'>
            <Text className='text-2xl font-bold text-purple-800 mb-2'>
              Best Match: {showResults.topCategory}
            </Text>
            <Text className='text-purple-600'>
              You showed strong interest in {showResults.topCategory.toLowerCase()} related activities and subjects.
            </Text>
          </View>

          <View className='mb-6'>
            <Text className='text-xl font-bold mb-4'>Score Breakdown</Text>
            {Object.entries(showResults.scores).map(([category, score]) => (
              <View key={category} className='flex-row justify-between items-center mb-2'>
                <Text className='font-semibold'>{category}</Text>
                <View className='flex-row'>
                  {[...Array(5)].map((_, i) => (
                    <View
                      key={i}
                      className={`w-4 h-4 rounded-full mr-1 ${
                        i < score ? 'bg-purple-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>

          <View className='mb-6'>
            <Text className='text-xl font-bold mb-4'>Recommended Streams</Text>
            {recommendations.streams.map((stream, index) => (
              <View key={index} className='bg-green-50 border border-green-200 rounded-lg p-3 mb-2'>
                <Text className='text-green-800 font-semibold'>{stream}</Text>
              </View>
            ))}
          </View>

          <View className='mb-6'>
            <Text className='text-xl font-bold mb-4'>Career Options</Text>
            <View className='flex-row flex-wrap'>
              {recommendations.careers.map((career, index) => (
                <View key={index} className='bg-blue-100 rounded-lg px-3 py-2 mr-2 mb-2'>
                  <Text className='text-blue-800'>{career}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className='mb-6'>
            <Text className='text-xl font-bold mb-4'>Suitable Colleges</Text>
            {recommendations.colleges.map((college, index) => (
              <Text key={index} className='text-gray-700 mb-1'>• {college}</Text>
            ))}
          </View>

          <View className='flex-row space-x-3'>
            <TouchableOpacity
              onPress={resetQuiz}
              className='flex-1 bg-purple-500 py-4 rounded-xl'
            >
              <Text className='text-white font-semibold text-center'>Retake Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Alert.alert('Counselor', 'Connecting you with a career counselor...')}
              className='flex-1 bg-green-500 py-4 rounded-xl'
            >
              <Text className='text-white font-semibold text-center'>Talk to Counselor</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

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

      <View className='flex-1 px-6'>
        {/* Header */}
        <View className='py-8 bg-purple-500 -mx-6 px-6 mb-6'>
          <Text className='text-white text-3xl font-extrabold mb-2'>Aptitude Test</Text>
          <Text className='text-purple-100'>
            Discover your interests and find the right stream for you
          </Text>
        </View>

        {/* Progress */}
        <View className='mb-6'>
          <Text className='text-sm text-gray-600 mb-2'>
            Question {currentQuestion + 1} of {questions.length}
          </Text>
          <View className='bg-gray-200 rounded-full h-2'>
            <View 
              className='bg-purple-500 h-2 rounded-full transition-all duration-300'
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </View>
        </View>

        {/* Question */}
        <View className='flex-1'>
          <Text className='text-xl font-bold mb-6'>
            {questions[currentQuestion].question}
          </Text>

          <View className='space-y-3'>
            {questions[currentQuestion].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleAnswer(option)}
                className='bg-white border-2 border-gray-200 rounded-xl p-4 active:border-purple-500'
              >
                <Text className='text-gray-800 font-medium'>{option.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Progress Info */}
        <View className='py-4'>
          <Text className='text-center text-gray-500 text-sm'>
            Choose the option that best describes you
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
} 