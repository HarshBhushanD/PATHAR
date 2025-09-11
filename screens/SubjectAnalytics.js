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

export default function SubjectAnalyticsScreen({ onNavigate }) {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [showDetailedView, setShowDetailedView] = useState(false);

  const containerPadding = getContainerPadding();

  const subjects = [
    {
      id: 'math',
      name: 'Mathematics',
      emoji: '📐',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      currentScore: 78,
      previousScore: 72,
      trend: 'up',
      topics: [
        { name: 'Algebra', score: 85, trend: 'up', lastStudied: '2 days ago' },
        { name: 'Geometry', score: 72, trend: 'down', lastStudied: '1 week ago' },
        { name: 'Trigonometry', score: 65, trend: 'up', lastStudied: '3 days ago' },
        { name: 'Statistics', score: 80, trend: 'stable', lastStudied: '1 day ago' }
      ],
      studyTime: 12.5,
      practiceQuestions: 45,
      mockTests: 3,
      improvement: '+6%'
    },
    {
      id: 'science',
      name: 'Science',
      emoji: '🔬',
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      currentScore: 82,
      previousScore: 79,
      trend: 'up',
      topics: [
        { name: 'Physics', score: 78, trend: 'up', lastStudied: '1 day ago' },
        { name: 'Chemistry', score: 85, trend: 'stable', lastStudied: '2 days ago' },
        { name: 'Biology', score: 83, trend: 'up', lastStudied: '1 day ago' }
      ],
      studyTime: 15.2,
      practiceQuestions: 52,
      mockTests: 4,
      improvement: '+3%'
    },
    {
      id: 'english',
      name: 'English',
      emoji: '📚',
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      currentScore: 88,
      previousScore: 85,
      trend: 'up',
      topics: [
        { name: 'Reading Comprehension', score: 90, trend: 'up', lastStudied: '1 day ago' },
        { name: 'Grammar', score: 82, trend: 'down', lastStudied: '3 days ago' },
        { name: 'Writing', score: 92, trend: 'up', lastStudied: '2 days ago' },
        { name: 'Literature', score: 88, trend: 'stable', lastStudied: '1 day ago' }
      ],
      studyTime: 8.7,
      practiceQuestions: 28,
      mockTests: 2,
      improvement: '+3%'
    },
    {
      id: 'social',
      name: 'Social Studies',
      emoji: '🌍',
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50',
      currentScore: 75,
      previousScore: 78,
      trend: 'down',
      topics: [
        { name: 'History', score: 72, trend: 'down', lastStudied: '4 days ago' },
        { name: 'Geography', score: 78, trend: 'stable', lastStudied: '2 days ago' },
        { name: 'Civics', score: 75, trend: 'down', lastStudied: '5 days ago' }
      ],
      studyTime: 6.3,
      practiceQuestions: 22,
      mockTests: 1,
      improvement: '-3%'
    },
    {
      id: 'hindi',
      name: 'Hindi',
      emoji: '📖',
      color: 'bg-red-500',
      lightColor: 'bg-red-50',
      currentScore: 80,
      previousScore: 77,
      trend: 'up',
      topics: [
        { name: 'Reading', score: 85, trend: 'up', lastStudied: '1 day ago' },
        { name: 'Grammar', score: 75, trend: 'down', lastStudied: '3 days ago' },
        { name: 'Writing', score: 80, trend: 'up', lastStudied: '2 days ago' }
      ],
      studyTime: 7.8,
      practiceQuestions: 31,
      mockTests: 2,
      improvement: '+3%'
    }
  ];

  const timeframes = [
    { id: 'week', name: 'This Week', emoji: '📅' },
    { id: 'month', name: 'This Month', emoji: '📊' },
    { id: 'quarter', name: 'This Quarter', emoji: '📈' },
    { id: 'year', name: 'This Year', emoji: '🗓️' }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 85) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const calculateOverallProgress = () => {
    const totalScore = subjects.reduce((sum, subject) => sum + subject.currentScore, 0);
    return Math.round(totalScore / subjects.length);
  };

  const getTopPerformingSubject = () => {
    return subjects.reduce((top, subject) => 
      subject.currentScore > top.currentScore ? subject : top
    );
  };

  const getNeedsAttentionSubject = () => {
    return subjects.reduce((bottom, subject) => 
      subject.currentScore < bottom.currentScore ? subject : bottom
    );
  };

  const renderSubjectCard = (subject) => (
    <TouchableOpacity
      key={subject.id}
      onPress={() => {
        setSelectedSubject(subject);
        setShowDetailedView(true);
      }}
      className={`${subject.lightColor} border border-gray-200 rounded-2xl p-4 mb-4`}
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
        <View className='flex-row items-center'>
          <Text 
            className={`font-bold ${getTrendColor(subject.trend)}`}
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            {getTrendIcon(subject.trend)}
          </Text>
          <Text 
            className={`font-bold ml-1 ${getTrendColor(subject.trend)}`}
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            {subject.improvement}
          </Text>
        </View>
      </View>
      
      <View className='mb-3'>
        <View className='flex-row justify-between items-center mb-1'>
          <Text 
            className='text-gray-600'
            style={{ fontSize: isTablet() ? 14 : 12 }}
          >
            Current Score
          </Text>
          <Text 
            className={`font-bold ${getScoreColor(subject.currentScore)}`}
            style={{ fontSize: isTablet() ? 18 : 16 }}
          >
            {subject.currentScore}%
          </Text>
        </View>
        <View className='bg-gray-200 rounded-full h-2'>
          <View 
            className={`rounded-full h-2 ${subject.color.replace('bg-', 'bg-').replace('-500', '-400')}`}
            style={{ width: `${subject.currentScore}%` }}
          />
        </View>
      </View>
      
      <View className='flex-row justify-between'>
        <View className='items-center'>
          <Text 
            className='font-semibold text-gray-800'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            {subject.studyTime}h
          </Text>
          <Text 
            className='text-gray-600'
            style={{ fontSize: isTablet() ? 12 : 10 }}
          >
            Study Time
          </Text>
        </View>
        <View className='items-center'>
          <Text 
            className='font-semibold text-gray-800'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            {subject.practiceQuestions}
          </Text>
          <Text 
            className='text-gray-600'
            style={{ fontSize: isTablet() ? 12 : 10 }}
          >
            Questions
          </Text>
        </View>
        <View className='items-center'>
          <Text 
            className='font-semibold text-gray-800'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            {subject.mockTests}
          </Text>
          <Text 
            className='text-gray-600'
            style={{ fontSize: isTablet() ? 12 : 10 }}
          >
            Mock Tests
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderDetailedView = () => {
    if (!selectedSubject) return null;

    return (
      <View className='flex-1 px-4'>
        <View className='mb-6'>
          <Text 
            className='font-bold text-center mb-2'
            style={{ fontSize: isTablet() ? 24 : 20 }}
          >
            {selectedSubject.name} Analytics
          </Text>
          <Text 
            className='text-gray-600 text-center'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            Detailed performance breakdown
          </Text>
        </View>

        {/* Overall Performance */}
        <View className='bg-white border border-gray-200 rounded-2xl p-4 mb-4'>
          <Text 
            className='font-bold mb-3'
            style={{ fontSize: isTablet() ? 18 : 16 }}
          >
            Overall Performance
          </Text>
          <View className='flex-row justify-between items-center mb-3'>
            <View>
              <Text 
                className='text-gray-600'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                Current Score
              </Text>
              <Text 
                className={`font-bold ${getScoreColor(selectedSubject.currentScore)}`}
                style={{ fontSize: isTablet() ? 24 : 20 }}
              >
                {selectedSubject.currentScore}%
              </Text>
            </View>
            <View>
              <Text 
                className='text-gray-600'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                Previous Score
              </Text>
              <Text 
                className='font-bold text-gray-800'
                style={{ fontSize: isTablet() ? 24 : 20 }}
              >
                {selectedSubject.previousScore}%
              </Text>
            </View>
            <View>
              <Text 
                className='text-gray-600'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                Improvement
              </Text>
              <Text 
                className={`font-bold ${getTrendColor(selectedSubject.trend)}`}
                style={{ fontSize: isTablet() ? 24 : 20 }}
              >
                {selectedSubject.improvement}
              </Text>
            </View>
          </View>
        </View>

        {/* Topic-wise Performance */}
        <View className='bg-white border border-gray-200 rounded-2xl p-4 mb-4'>
          <Text 
            className='font-bold mb-3'
            style={{ fontSize: isTablet() ? 18 : 16 }}
          >
            Topic-wise Performance
          </Text>
          {selectedSubject.topics.map((topic, index) => (
            <View key={index} className='mb-3'>
              <View className='flex-row justify-between items-center mb-1'>
                <Text 
                  className='font-semibold'
                  style={{ fontSize: isTablet() ? 16 : 14 }}
                >
                  {topic.name}
                </Text>
                <View className='flex-row items-center'>
                  <Text 
                    className={`font-bold ${getTrendColor(topic.trend)}`}
                    style={{ fontSize: isTablet() ? 14 : 12 }}
                  >
                    {getTrendIcon(topic.trend)}
                  </Text>
                  <Text 
                    className={`font-bold ml-1 ${getScoreColor(topic.score)}`}
                    style={{ fontSize: isTablet() ? 16 : 14 }}
                  >
                    {topic.score}%
                  </Text>
                </View>
              </View>
              <View className='bg-gray-200 rounded-full h-2'>
                <View 
                  className={`rounded-full h-2 ${getScoreBg(topic.score).replace('bg-', 'bg-').replace('-100', '-400')}`}
                  style={{ width: `${topic.score}%` }}
                />
              </View>
              <Text 
                className='text-gray-500 mt-1'
                style={{ fontSize: isTablet() ? 12 : 10 }}
              >
                Last studied: {topic.lastStudied}
              </Text>
            </View>
          ))}
        </View>

        {/* Study Statistics */}
        <View className='bg-white border border-gray-200 rounded-2xl p-4'>
          <Text 
            className='font-bold mb-3'
            style={{ fontSize: isTablet() ? 18 : 16 }}
          >
            Study Statistics
          </Text>
          <View className='flex-row justify-between'>
            <View className='items-center flex-1'>
              <Text 
                className='font-bold text-blue-600'
                style={{ fontSize: isTablet() ? 20 : 18 }}
              >
                {selectedSubject.studyTime}h
              </Text>
              <Text 
                className='text-gray-600 text-center'
                style={{ fontSize: isTablet() ? 12 : 10 }}
              >
                Total Study Time
              </Text>
            </View>
            <View className='items-center flex-1'>
              <Text 
                className='font-bold text-green-600'
                style={{ fontSize: isTablet() ? 20 : 18 }}
              >
                {selectedSubject.practiceQuestions}
              </Text>
              <Text 
                className='text-gray-600 text-center'
                style={{ fontSize: isTablet() ? 12 : 10 }}
              >
                Practice Questions
              </Text>
            </View>
            <View className='items-center flex-1'>
              <Text 
                className='font-bold text-purple-600'
                style={{ fontSize: isTablet() ? 20 : 18 }}
              >
                {selectedSubject.mockTests}
              </Text>
              <Text 
                className='text-gray-600 text-center'
                style={{ fontSize: isTablet() ? 12 : 10 }}
              >
                Mock Tests
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className='bg-indigo-500 px-4 py-4'>
        <View className='flex-row items-center justify-between'>
          <TouchableOpacity onPress={() => onNavigate && onNavigate('class10')}>
            <Text style={{ fontSize: isTablet() ? 24 : 20 }} className='text-white'>←</Text>
          </TouchableOpacity>
          <View className='flex-row items-center'>
            <Text style={{ fontSize: isTablet() ? 24 : 20 }}>📊</Text>
            <Text 
              className='text-white font-bold ml-2'
              style={{ fontSize: isTablet() ? 20 : 18 }}
            >
              Subject Analytics
            </Text>
          </View>
          <View style={{ width: 24 }} />
        </View>
      </View>

      {showDetailedView ? (
        <ScrollView 
          className='flex-1' 
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {renderDetailedView()}
        </ScrollView>
      ) : (
        <ScrollView 
          className='flex-1' 
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Timeframe Selector */}
          <View style={{ paddingHorizontal: containerPadding, marginTop: 24 }}>
            <Text 
              className='font-extrabold mb-4'
              style={{ fontSize: isTablet() ? 24 : 20 }}
            >
              Performance Overview
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {timeframes.map((timeframe) => (
                <TouchableOpacity
                  key={timeframe.id}
                  onPress={() => setSelectedTimeframe(timeframe.id)}
                  className={`border-2 rounded-xl px-4 py-3 mr-3 ${
                    selectedTimeframe === timeframe.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <Text style={{ fontSize: isTablet() ? 20 : 16 }} className='text-center'>{timeframe.emoji}</Text>
                  <Text 
                    className={`text-center mt-1 font-medium ${
                      selectedTimeframe === timeframe.id ? 'text-indigo-700' : 'text-gray-600'
                    }`}
                    style={{ fontSize: isTablet() ? 12 : 10 }}
                  >
                    {timeframe.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Overall Stats */}
          <View style={{ paddingHorizontal: containerPadding, marginTop: 24 }}>
            <View className='bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 mb-6'>
              <Text 
                className='font-bold text-center mb-3'
                style={{ fontSize: isTablet() ? 20 : 18 }}
              >
                Overall Performance
              </Text>
              <View className='flex-row justify-between items-center'>
                <View className='items-center'>
                  <Text 
                    className='font-bold text-indigo-600'
                    style={{ fontSize: isTablet() ? 24 : 20 }}
                  >
                    {calculateOverallProgress()}%
                  </Text>
                  <Text 
                    className='text-gray-600'
                    style={{ fontSize: isTablet() ? 12 : 10 }}
                  >
                    Average Score
                  </Text>
                </View>
                <View className='items-center'>
                  <Text 
                    className='font-bold text-green-600'
                    style={{ fontSize: isTablet() ? 24 : 20 }}
                  >
                    {getTopPerformingSubject().name}
                  </Text>
                  <Text 
                    className='text-gray-600'
                    style={{ fontSize: isTablet() ? 12 : 10 }}
                  >
                    Best Subject
                  </Text>
                </View>
                <View className='items-center'>
                  <Text 
                    className='font-bold text-red-600'
                    style={{ fontSize: isTablet() ? 24 : 20 }}
                  >
                    {getNeedsAttentionSubject().name}
                  </Text>
                  <Text 
                    className='text-gray-600'
                    style={{ fontSize: isTablet() ? 12 : 10 }}
                  >
                    Needs Focus
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Subject Cards */}
          <View style={{ paddingHorizontal: containerPadding }}>
            <Text 
              className='font-extrabold mb-4'
              style={{ fontSize: isTablet() ? 24 : 20 }}
            >
              Subject-wise Performance
            </Text>
            {subjects.map(renderSubjectCard)}
          </View>

          {/* AI Recommendations */}
          <View style={{ paddingHorizontal: containerPadding, marginTop: 32 }}>
            <Text 
              className='font-extrabold mb-4'
              style={{ fontSize: isTablet() ? 24 : 20 }}
            >
              AI Recommendations
            </Text>
            <View className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4'>
              <Text 
                className='font-semibold mb-3'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                💡 Personalized Study Tips:
              </Text>
              <Text 
                className='text-gray-700 mb-2'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                • Focus more on Social Studies - your scores are declining
              </Text>
              <Text 
                className='text-gray-700 mb-2'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                • Mathematics is improving well - maintain the momentum
              </Text>
              <Text 
                className='text-gray-700 mb-2'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                • English is your strongest subject - use it to boost confidence
              </Text>
              <Text 
                className='text-gray-700'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                • Take more mock tests for Science to improve exam readiness
              </Text>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Back Button for Detailed View */}
      {showDetailedView && (
        <View 
          className='bg-white border-t border-gray-200 px-4 py-4'
          style={{ paddingHorizontal: containerPadding }}
        >
          <TouchableOpacity
            onPress={() => setShowDetailedView(false)}
            className='bg-indigo-500 px-6 py-3 rounded-xl'
          >
            <Text 
              className='text-white font-semibold text-center'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              Back to Overview
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
