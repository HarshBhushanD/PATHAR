import { StatusBar } from 'expo-status-bar';
import '../global.css';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
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

export default function StudyArchitectScreen({ onNavigate }) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showTimetable, setShowTimetable] = useState(false);
  const [formData, setFormData] = useState({
    wakeUpTime: '06:00',
    sleepTime: '22:00',
    schoolHours: '08:00-15:00',
    tuitionHours: '',
    breakTime: 30,
    studySessions: 3,
    subjects: [],
    priorities: {},
    examDate: '',
    currentLevel: 'average'
  });

  const containerPadding = getContainerPadding();

  const subjects = [
    { id: 'math', name: 'Mathematics', emoji: '📐', color: 'bg-blue-100' },
    { id: 'science', name: 'Science', emoji: '🔬', color: 'bg-green-100' },
    { id: 'english', name: 'English', emoji: '📚', color: 'bg-purple-100' },
    { id: 'social', name: 'Social Studies', emoji: '🌍', color: 'bg-orange-100' },
    { id: 'hindi', name: 'Hindi', emoji: '📖', color: 'bg-red-100' }
  ];

  const priorityLevels = [
    { id: 'high', name: 'High Priority', emoji: '🔴', color: 'bg-red-100', textColor: 'text-red-700' },
    { id: 'medium', name: 'Medium Priority', emoji: '🟡', color: 'bg-yellow-100', textColor: 'text-yellow-700' },
    { id: 'low', name: 'Low Priority', emoji: '🟢', color: 'bg-green-100', textColor: 'text-green-700' }
  ];

  const currentLevels = [
    { id: 'weak', name: 'Need More Practice', emoji: '📈' },
    { id: 'average', name: 'Average', emoji: '📊' },
    { id: 'strong', name: 'Strong', emoji: '💪' }
  ];

  const handleSubjectToggle = (subjectId) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subjectId)
        ? prev.subjects.filter(id => id !== subjectId)
        : [...prev.subjects, subjectId]
    }));
  };

  const handlePriorityChange = (subjectId, priority) => {
    setFormData(prev => ({
      ...prev,
      priorities: {
        ...prev.priorities,
        [subjectId]: priority
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      generateTimetable();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateTimetable = async () => {
    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setLoading(false);
      setShowTimetable(true);
    }, 2000);
  };

  const getGeneratedTimetable = () => {
    return {
      monday: [
        { time: '06:00-07:00', activity: 'Morning Routine & Breakfast', type: 'routine' },
        { time: '07:00-08:00', activity: 'Mathematics Practice', type: 'study', subject: 'math' },
        { time: '08:00-15:00', activity: 'School Hours', type: 'school' },
        { time: '15:00-16:00', activity: 'Lunch & Rest', type: 'break' },
        { time: '16:00-17:30', activity: 'Science Revision', type: 'study', subject: 'science' },
        { time: '17:30-18:00', activity: 'Short Break', type: 'break' },
        { time: '18:00-19:00', activity: 'English Practice', type: 'study', subject: 'english' },
        { time: '19:00-20:00', activity: 'Dinner & Family Time', type: 'break' },
        { time: '20:00-21:00', activity: 'Social Studies', type: 'study', subject: 'social' },
        { time: '21:00-22:00', activity: 'Free Time & Relaxation', type: 'break' }
      ],
      tuesday: [
        { time: '06:00-07:00', activity: 'Morning Routine & Breakfast', type: 'routine' },
        { time: '07:00-08:00', activity: 'Science Practice', type: 'study', subject: 'science' },
        { time: '08:00-15:00', activity: 'School Hours', type: 'school' },
        { time: '15:00-16:00', activity: 'Lunch & Rest', type: 'break' },
        { time: '16:00-17:30', activity: 'Mathematics Problem Solving', type: 'study', subject: 'math' },
        { time: '17:30-18:00', activity: 'Short Break', type: 'break' },
        { time: '18:00-19:00', activity: 'Hindi Practice', type: 'study', subject: 'hindi' },
        { time: '19:00-20:00', activity: 'Dinner & Family Time', type: 'break' },
        { time: '20:00-21:00', activity: 'English Literature', type: 'study', subject: 'english' },
        { time: '21:00-22:00', activity: 'Free Time & Relaxation', type: 'break' }
      ],
      wednesday: [
        { time: '06:00-07:00', activity: 'Morning Routine & Breakfast', type: 'routine' },
        { time: '07:00-08:00', activity: 'Mathematics Practice', type: 'study', subject: 'math' },
        { time: '08:00-15:00', activity: 'School Hours', type: 'school' },
        { time: '15:00-16:00', activity: 'Lunch & Rest', type: 'break' },
        { time: '16:00-17:30', activity: 'Science Experiments & Theory', type: 'study', subject: 'science' },
        { time: '17:30-18:00', activity: 'Short Break', type: 'break' },
        { time: '18:00-19:00', activity: 'Social Studies Map Work', type: 'study', subject: 'social' },
        { time: '19:00-20:00', activity: 'Dinner & Family Time', type: 'break' },
        { time: '20:00-21:00', activity: 'English Grammar & Writing', type: 'study', subject: 'english' },
        { time: '21:00-22:00', activity: 'Free Time & Relaxation', type: 'break' }
      ],
      thursday: [
        { time: '06:00-07:00', activity: 'Morning Routine & Breakfast', type: 'routine' },
        { time: '07:00-08:00', activity: 'Science Practice', type: 'study', subject: 'science' },
        { time: '08:00-15:00', activity: 'School Hours', type: 'school' },
        { time: '15:00-16:00', activity: 'Lunch & Rest', type: 'break' },
        { time: '16:00-17:30', activity: 'Mathematics Advanced Problems', type: 'study', subject: 'math' },
        { time: '17:30-18:00', activity: 'Short Break', type: 'break' },
        { time: '18:00-19:00', activity: 'Hindi Literature', type: 'study', subject: 'hindi' },
        { time: '19:00-20:00', activity: 'Dinner & Family Time', type: 'break' },
        { time: '20:00-21:00', activity: 'Social Studies History', type: 'study', subject: 'social' },
        { time: '21:00-22:00', activity: 'Free Time & Relaxation', type: 'break' }
      ],
      friday: [
        { time: '06:00-07:00', activity: 'Morning Routine & Breakfast', type: 'routine' },
        { time: '07:00-08:00', activity: 'Mathematics Practice', type: 'study', subject: 'math' },
        { time: '08:00-15:00', activity: 'School Hours', type: 'school' },
        { time: '15:00-16:00', activity: 'Lunch & Rest', type: 'break' },
        { time: '16:00-17:30', activity: 'Science Revision & Notes', type: 'study', subject: 'science' },
        { time: '17:30-18:00', activity: 'Short Break', type: 'break' },
        { time: '18:00-19:00', activity: 'English Reading & Comprehension', type: 'study', subject: 'english' },
        { time: '19:00-20:00', activity: 'Dinner & Family Time', type: 'break' },
        { time: '20:00-21:00', activity: 'Weekly Review & Planning', type: 'review' },
        { time: '21:00-22:00', activity: 'Free Time & Relaxation', type: 'break' }
      ],
      saturday: [
        { time: '08:00-09:00', activity: 'Late Wake Up & Breakfast', type: 'break' },
        { time: '09:00-11:00', activity: 'Mathematics Mock Test', type: 'test', subject: 'math' },
        { time: '11:00-11:30', activity: 'Break', type: 'break' },
        { time: '11:30-13:30', activity: 'Science Practice Test', type: 'test', subject: 'science' },
        { time: '13:30-15:00', activity: 'Lunch & Rest', type: 'break' },
        { time: '15:00-17:00', activity: 'English & Hindi Practice', type: 'study' },
        { time: '17:00-18:00', activity: 'Social Studies Revision', type: 'study', subject: 'social' },
        { time: '18:00-20:00', activity: 'Family Time & Hobbies', type: 'break' },
        { time: '20:00-21:00', activity: 'Weekend Review', type: 'review' },
        { time: '21:00-22:00', activity: 'Free Time', type: 'break' }
      ],
      sunday: [
        { time: '08:00-09:00', activity: 'Late Wake Up & Breakfast', type: 'break' },
        { time: '09:00-11:00', activity: 'Weak Subject Focus - Mathematics', type: 'study', subject: 'math' },
        { time: '11:00-11:30', activity: 'Break', type: 'break' },
        { time: '11:30-13:30', activity: 'Science Experiments & Practical', type: 'study', subject: 'science' },
        { time: '13:30-15:00', activity: 'Lunch & Rest', type: 'break' },
        { time: '15:00-17:00', activity: 'English Creative Writing', type: 'study', subject: 'english' },
        { time: '17:00-18:00', activity: 'Social Studies Current Affairs', type: 'study', subject: 'social' },
        { time: '18:00-20:00', activity: 'Family Time & Relaxation', type: 'break' },
        { time: '20:00-21:00', activity: 'Next Week Planning', type: 'planning' },
        { time: '21:00-22:00', activity: 'Free Time', type: 'break' }
      ]
    };
  };

  const renderStep1 = () => (
    <View style={{ paddingHorizontal: containerPadding }}>
      <Text 
        className='font-extrabold text-center mb-2'
        style={{ fontSize: isTablet() ? 24 : 20 }}
      >
        Step 1: Your Daily Schedule
      </Text>
      <Text 
        className='text-gray-600 text-center mb-6'
        style={{ fontSize: isTablet() ? 16 : 14 }}
      >
        Tell us about your daily routine
      </Text>
      
      <View className='space-y-4'>
        <View>
          <Text 
            className='font-semibold mb-2'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            Wake Up Time
          </Text>
          <TextInput
            value={formData.wakeUpTime}
            onChangeText={(value) => setFormData(prev => ({ ...prev, wakeUpTime: value }))}
            placeholder="06:00"
            className='border border-gray-300 rounded-xl px-4 py-3 bg-white'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          />
        </View>
        
        <View>
          <Text 
            className='font-semibold mb-2'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            Sleep Time
          </Text>
          <TextInput
            value={formData.sleepTime}
            onChangeText={(value) => setFormData(prev => ({ ...prev, sleepTime: value }))}
            placeholder="22:00"
            className='border border-gray-300 rounded-xl px-4 py-3 bg-white'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          />
        </View>
        
        <View>
          <Text 
            className='font-semibold mb-2'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            School Hours
          </Text>
          <TextInput
            value={formData.schoolHours}
            onChangeText={(value) => setFormData(prev => ({ ...prev, schoolHours: value }))}
            placeholder="08:00-15:00"
            className='border border-gray-300 rounded-xl px-4 py-3 bg-white'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          />
        </View>
        
        <View>
          <Text 
            className='font-semibold mb-2'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            Tuition Hours (Optional)
          </Text>
          <TextInput
            value={formData.tuitionHours}
            onChangeText={(value) => setFormData(prev => ({ ...prev, tuitionHours: value }))}
            placeholder="16:00-18:00"
            className='border border-gray-300 rounded-xl px-4 py-3 bg-white'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          />
        </View>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={{ paddingHorizontal: containerPadding }}>
      <Text 
        className='font-extrabold text-center mb-2'
        style={{ fontSize: isTablet() ? 24 : 20 }}
      >
        Step 2: Select Subjects
      </Text>
      <Text 
        className='text-gray-600 text-center mb-6'
        style={{ fontSize: isTablet() ? 16 : 14 }}
      >
        Choose subjects you want to focus on
      </Text>
      
      <View className='space-y-3'>
        {subjects.map((subject) => (
          <TouchableOpacity
            key={subject.id}
            onPress={() => handleSubjectToggle(subject.id)}
            className={`border-2 rounded-xl p-4 ${
              formData.subjects.includes(subject.id)
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <View className='flex-row items-center'>
              <Text style={{ fontSize: isTablet() ? 24 : 20 }}>{subject.emoji}</Text>
              <Text 
                className='font-semibold ml-3'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                {subject.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={{ paddingHorizontal: containerPadding }}>
      <Text 
        className='font-extrabold text-center mb-2'
        style={{ fontSize: isTablet() ? 24 : 20 }}
      >
        Step 3: Set Priorities
      </Text>
      <Text 
        className='text-gray-600 text-center mb-6'
        style={{ fontSize: isTablet() ? 16 : 14 }}
      >
        Mark priority level for each subject
      </Text>
      
      <View className='space-y-4'>
        {formData.subjects.map((subjectId) => {
          const subject = subjects.find(s => s.id === subjectId);
          return (
            <View key={subjectId} className='bg-white border border-gray-200 rounded-xl p-4'>
              <View className='flex-row items-center mb-3'>
                <Text style={{ fontSize: isTablet() ? 24 : 20 }}>{subject.emoji}</Text>
                <Text 
                  className='font-semibold ml-3'
                  style={{ fontSize: isTablet() ? 16 : 14 }}
                >
                  {subject.name}
                </Text>
              </View>
              
              <View className='flex-row space-x-2'>
                {priorityLevels.map((level) => (
                  <TouchableOpacity
                    key={level.id}
                    onPress={() => handlePriorityChange(subjectId, level.id)}
                    className={`flex-1 border-2 rounded-xl p-3 ${
                      formData.priorities[subjectId] === level.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <Text style={{ fontSize: isTablet() ? 20 : 16 }} className='text-center'>{level.emoji}</Text>
                    <Text 
                      className={`text-center mt-1 font-medium ${
                        formData.priorities[subjectId] === level.id ? 'text-orange-700' : 'text-gray-600'
                      }`}
                      style={{ fontSize: isTablet() ? 12 : 10 }}
                    >
                      {level.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={{ paddingHorizontal: containerPadding }}>
      <Text 
        className='font-extrabold text-center mb-2'
        style={{ fontSize: isTablet() ? 24 : 20 }}
      >
        Step 4: Additional Info
      </Text>
      <Text 
        className='text-gray-600 text-center mb-6'
        style={{ fontSize: isTablet() ? 16 : 14 }}
      >
        Help us create the perfect schedule
      </Text>
      
      <View className='space-y-4'>
        <View>
          <Text 
            className='font-semibold mb-2'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            Board Exam Date
          </Text>
          <TextInput
            value={formData.examDate}
            onChangeText={(value) => setFormData(prev => ({ ...prev, examDate: value }))}
            placeholder="March 2024"
            className='border border-gray-300 rounded-xl px-4 py-3 bg-white'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          />
        </View>
        
        <View>
          <Text 
            className='font-semibold mb-3'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            Your Current Academic Level
          </Text>
          <View className='flex-row space-x-2'>
            {currentLevels.map((level) => (
              <TouchableOpacity
                key={level.id}
                onPress={() => setFormData(prev => ({ ...prev, currentLevel: level.id }))}
                className={`flex-1 border-2 rounded-xl p-3 ${
                  formData.currentLevel === level.id
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <Text style={{ fontSize: isTablet() ? 20 : 16 }} className='text-center'>{level.emoji}</Text>
                <Text 
                  className={`text-center mt-1 font-medium ${
                    formData.currentLevel === level.id ? 'text-orange-700' : 'text-gray-600'
                  }`}
                  style={{ fontSize: isTablet() ? 12 : 10 }}
                >
                  {level.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  const renderTimetable = () => {
    const timetable = getGeneratedTimetable();
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
      <View className='flex-1 px-4'>
        <View className='mb-4'>
          <Text 
            className='font-bold text-center mb-2'
            style={{ fontSize: isTablet() ? 24 : 20 }}
          >
            Your AI-Generated Study Timetable
          </Text>
          <Text 
            className='text-gray-600 text-center mb-4'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            Optimized for 3x efficiency with balanced study and rest
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {days.map((day, index) => (
            <View key={day} className='mb-6'>
              <Text 
                className='font-bold mb-3 text-orange-600'
                style={{ fontSize: isTablet() ? 18 : 16 }}
              >
                {dayNames[index]}
              </Text>
              
              {timetable[day].map((activity, activityIndex) => (
                <View 
                  key={activityIndex}
                  className={`border-l-4 rounded-r-xl p-3 mb-2 ${
                    activity.type === 'study' ? 'border-blue-500 bg-blue-50' :
                    activity.type === 'school' ? 'border-green-500 bg-green-50' :
                    activity.type === 'test' ? 'border-red-500 bg-red-50' :
                    activity.type === 'review' ? 'border-purple-500 bg-purple-50' :
                    activity.type === 'planning' ? 'border-indigo-500 bg-indigo-50' :
                    'border-gray-400 bg-gray-50'
                  }`}
                >
                  <Text 
                    className='font-semibold'
                    style={{ fontSize: isTablet() ? 14 : 12 }}
                  >
                    {activity.time}
                  </Text>
                  <Text 
                    className='text-gray-800'
                    style={{ fontSize: isTablet() ? 16 : 14 }}
                  >
                    {activity.activity}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

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
      <View className='bg-orange-500 px-4 py-4'>
        <View className='flex-row items-center justify-between'>
          <TouchableOpacity onPress={() => onNavigate && onNavigate('class10')}>
            <Text style={{ fontSize: isTablet() ? 24 : 20 }} className='text-white'>←</Text>
          </TouchableOpacity>
          <View className='flex-row items-center'>
            <Text style={{ fontSize: isTablet() ? 24 : 20 }}>📅</Text>
            <Text 
              className='text-white font-bold ml-2'
              style={{ fontSize: isTablet() ? 20 : 18 }}
            >
              Study Architect
            </Text>
          </View>
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

      {loading ? (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size="large" color="#F97316" />
          <Text 
            className='text-gray-600 mt-4 text-center'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            AI is creating your personalized timetable...
          </Text>
          <Text 
            className='text-gray-500 mt-2 text-center'
            style={{ fontSize: isTablet() ? 14 : 12 }}
          >
            This may take a few moments
          </Text>
        </View>
      ) : showTimetable ? (
        renderTimetable()
      ) : (
        <ScrollView 
          className='flex-1' 
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {renderCurrentStep()}
        </ScrollView>
      )}

      {/* Navigation Buttons */}
      {!loading && !showTimetable && (
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
              className='bg-orange-500 px-6 py-3 rounded-xl'
            >
              <Text 
                className='text-white font-semibold'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                {currentStep === 4 ? 'Generate Timetable' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Timetable Actions */}
      {showTimetable && (
        <View 
          className='bg-white border-t border-gray-200 px-4 py-4'
          style={{ paddingHorizontal: containerPadding }}
        >
          <View className='flex-row justify-between'>
            <TouchableOpacity
              onPress={() => setShowTimetable(false)}
              className='bg-gray-200 px-6 py-3 rounded-xl'
            >
              <Text 
                className='text-gray-700 font-semibold'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                Edit Schedule
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => Alert.alert('Export', 'Timetable export feature coming soon!')}
              className='bg-orange-500 px-6 py-3 rounded-xl'
            >
              <Text 
                className='text-white font-semibold'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                Export PDF
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
