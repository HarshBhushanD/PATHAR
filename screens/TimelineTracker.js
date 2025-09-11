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

export default function TimelineTrackerScreen({ onNavigate }) {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddEvent, setShowAddEvent] = useState(false);

  const containerPadding = getContainerPadding();

  const categories = [
    { id: 'all', name: 'All Events', emoji: '📅', color: 'bg-gray-100' },
    { id: 'exams', name: 'Exams', emoji: '📝', color: 'bg-red-100' },
    { id: 'admissions', name: 'Admissions', emoji: '🎓', color: 'bg-blue-100' },
    { id: 'scholarships', name: 'Scholarships', emoji: '💰', color: 'bg-green-100' },
    { id: 'counseling', name: 'Counseling', emoji: '💬', color: 'bg-purple-100' },
    { id: 'personal', name: 'Personal', emoji: '⭐', color: 'bg-yellow-100' }
  ];

  const timelineEvents = [
    {
      id: 1,
      title: 'Class 10 Board Exams',
      description: 'CBSE Board Examination 2024',
      date: '2024-03-15',
      time: '10:00 AM',
      category: 'exams',
      priority: 'high',
      status: 'upcoming',
      reminder: true,
      location: 'Your School',
      notes: 'Bring admit card and stationery'
    },
    {
      id: 2,
      title: 'JEE Main Registration',
      description: 'Registration for JEE Main 2024',
      date: '2024-02-01',
      time: '11:59 PM',
      category: 'admissions',
      priority: 'high',
      status: 'upcoming',
      reminder: true,
      location: 'Online',
      notes: 'Register on jeemain.nta.ac.in'
    },
    {
      id: 3,
      title: 'NEET Application Form',
      description: 'NEET 2024 Application Submission',
      date: '2024-03-06',
      time: '11:59 PM',
      category: 'admissions',
      priority: 'high',
      status: 'upcoming',
      reminder: true,
      location: 'Online',
      notes: 'Submit on neet.nta.nic.in'
    },
    {
      id: 4,
      title: 'Merit Scholarship Application',
      description: 'Apply for state merit scholarship',
      date: '2024-04-15',
      time: '5:00 PM',
      category: 'scholarships',
      priority: 'medium',
      status: 'upcoming',
      reminder: true,
      location: 'Online',
      notes: 'Required documents: Marksheet, Income certificate'
    },
    {
      id: 5,
      title: 'Career Counseling Session',
      description: 'Free career guidance session',
      date: '2024-02-20',
      time: '2:00 PM',
      category: 'counseling',
      priority: 'medium',
      status: 'upcoming',
      reminder: true,
      location: 'Community Center',
      notes: 'Bring your academic records'
    },
    {
      id: 6,
      title: 'Birthday Party',
      description: 'Friend\'s birthday celebration',
      date: '2024-02-14',
      time: '6:00 PM',
      category: 'personal',
      priority: 'low',
      status: 'upcoming',
      reminder: false,
      location: 'Friend\'s House',
      notes: 'Buy a gift'
    },
    {
      id: 7,
      title: 'Class 10 Pre-Board Exam',
      description: 'Mathematics Pre-Board Test',
      date: '2024-01-25',
      time: '10:00 AM',
      category: 'exams',
      priority: 'high',
      status: 'completed',
      reminder: false,
      location: 'Your School',
      notes: 'Scored 85/100'
    },
    {
      id: 8,
      title: 'Science Exhibition',
      description: 'School Science Fair',
      date: '2024-01-15',
      time: '9:00 AM',
      category: 'exams',
      priority: 'medium',
      status: 'completed',
      reminder: false,
      location: 'School Auditorium',
      notes: 'Won 2nd prize for Physics project'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category) => {
    return categories.find(c => c.id === category)?.emoji || '📅';
  };

  const getDaysUntil = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  const filteredEvents = selectedCategory === 'all' 
    ? timelineEvents 
    : timelineEvents.filter(event => event.category === selectedCategory);

  const upcomingEvents = timelineEvents.filter(event => event.status === 'upcoming');
  const completedEvents = timelineEvents.filter(event => event.status === 'completed');

  const renderEventCard = (event) => (
    <View key={event.id} className='bg-white border border-gray-200 rounded-2xl p-4 mb-4'>
      <View className='flex-row items-start justify-between mb-3'>
        <View className='flex-1'>
          <View className='flex-row items-center mb-2'>
            <Text style={{ fontSize: isTablet() ? 20 : 16 }}>{getCategoryIcon(event.category)}</Text>
            <Text 
              className='font-bold ml-2'
              style={{ fontSize: isTablet() ? 18 : 16 }}
            >
              {event.title}
            </Text>
          </View>
          <Text 
            className='text-gray-600 mb-2'
            style={{ fontSize: isTablet() ? 14 : 12 }}
          >
            {event.description}
          </Text>
          <View className='flex-row items-center mb-2'>
            <Text style={{ fontSize: isTablet() ? 16 : 14 }}>📅</Text>
            <Text 
              className='text-gray-700 ml-2'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              {new Date(event.date).toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </View>
          <View className='flex-row items-center mb-2'>
            <Text style={{ fontSize: isTablet() ? 16 : 14 }}>🕐</Text>
            <Text 
              className='text-gray-700 ml-2'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              {event.time}
            </Text>
          </View>
          <View className='flex-row items-center mb-2'>
            <Text style={{ fontSize: isTablet() ? 16 : 14 }}>📍</Text>
            <Text 
              className='text-gray-700 ml-2'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              {event.location}
            </Text>
          </View>
        </View>
        
        <View className='items-end'>
          <View className={`px-2 py-1 rounded-full mb-2 ${getPriorityColor(event.priority)}`}>
            <Text 
              className='font-semibold'
              style={{ fontSize: isTablet() ? 12 : 10 }}
            >
              {event.priority.toUpperCase()}
            </Text>
          </View>
          <View className={`px-2 py-1 rounded-full mb-2 ${getStatusColor(event.status)}`}>
            <Text 
              className='font-semibold'
              style={{ fontSize: isTablet() ? 12 : 10 }}
            >
              {event.status.toUpperCase()}
            </Text>
          </View>
          <Text 
            className={`font-bold ${
              getDaysUntil(event.date) === 'Overdue' ? 'text-red-600' :
              getDaysUntil(event.date) === 'Today' ? 'text-orange-600' :
              'text-blue-600'
            }`}
            style={{ fontSize: isTablet() ? 14 : 12 }}
          >
            {getDaysUntil(event.date)}
          </Text>
        </View>
      </View>
      
      {event.notes && (
        <View className='bg-gray-50 rounded-xl p-3 mb-3'>
          <Text 
            className='font-semibold text-gray-700 mb-1'
            style={{ fontSize: isTablet() ? 14 : 12 }}
          >
            Notes:
          </Text>
          <Text 
            className='text-gray-600'
            style={{ fontSize: isTablet() ? 14 : 12 }}
          >
            {event.notes}
          </Text>
        </View>
      )}
      
      <View className='flex-row justify-between items-center'>
        <View className='flex-row items-center'>
          <Text 
            className={`font-semibold ${
              event.reminder ? 'text-green-600' : 'text-gray-400'
            }`}
            style={{ fontSize: isTablet() ? 14 : 12 }}
          >
            {event.reminder ? '🔔 Reminder ON' : '🔕 No Reminder'}
          </Text>
        </View>
        
        <View className='flex-row space-x-2'>
          <TouchableOpacity 
            onPress={() => Alert.alert('Edit Event', 'Edit feature coming soon!')}
            className='bg-blue-100 px-3 py-1 rounded-lg'
          >
            <Text 
              className='text-blue-700 font-semibold'
              style={{ fontSize: isTablet() ? 12 : 10 }}
            >
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => Alert.alert('Share Event', 'Share feature coming soon!')}
            className='bg-gray-100 px-3 py-1 rounded-lg'
          >
            <Text 
              className='text-gray-700 font-semibold'
              style={{ fontSize: isTablet() ? 12 : 10 }}
            >
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className='bg-rose-500 px-4 py-4'>
        <View className='flex-row items-center justify-between'>
          <TouchableOpacity onPress={() => onNavigate && onNavigate('class10')}>
            <Text style={{ fontSize: isTablet() ? 24 : 20 }} className='text-white'>←</Text>
          </TouchableOpacity>
          <View className='flex-row items-center'>
            <Text style={{ fontSize: isTablet() ? 24 : 20 }}>⏰</Text>
            <Text 
              className='text-white font-bold ml-2'
              style={{ fontSize: isTablet() ? 20 : 18 }}
            >
              Timeline Tracker
            </Text>
          </View>
          <TouchableOpacity onPress={() => setShowAddEvent(true)}>
            <Text style={{ fontSize: isTablet() ? 24 : 20 }} className='text-white'>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={{ paddingHorizontal: containerPadding, marginTop: 16 }}>
        <View className='bg-white rounded-2xl p-4 mb-4'>
          <View className='flex-row justify-between items-center'>
            <View className='items-center'>
              <Text 
                className='font-bold text-rose-600'
                style={{ fontSize: isTablet() ? 24 : 20 }}
              >
                {upcomingEvents.length}
              </Text>
              <Text 
                className='text-gray-600'
                style={{ fontSize: isTablet() ? 12 : 10 }}
              >
                Upcoming
              </Text>
            </View>
            <View className='items-center'>
              <Text 
                className='font-bold text-green-600'
                style={{ fontSize: isTablet() ? 24 : 20 }}
              >
                {completedEvents.length}
              </Text>
              <Text 
                className='text-gray-600'
                style={{ fontSize: isTablet() ? 12 : 10 }}
              >
                Completed
              </Text>
            </View>
            <View className='items-center'>
              <Text 
                className='font-bold text-blue-600'
                style={{ fontSize: isTablet() ? 24 : 20 }}
              >
                {timelineEvents.filter(e => e.reminder).length}
              </Text>
              <Text 
                className='text-gray-600'
                style={{ fontSize: isTablet() ? 12 : 10 }}
              >
                With Reminders
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Category Filter */}
      <View style={{ paddingHorizontal: containerPadding, marginBottom: 16 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              className={`border-2 rounded-xl px-4 py-3 mr-3 ${
                selectedCategory === category.id
                  ? 'border-rose-500 bg-rose-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <Text style={{ fontSize: isTablet() ? 16 : 14 }} className='text-center'>{category.emoji}</Text>
              <Text 
                className={`text-center mt-1 font-medium ${
                  selectedCategory === category.id ? 'text-rose-700' : 'text-gray-600'
                }`}
                style={{ fontSize: isTablet() ? 12 : 10 }}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Timeline Events */}
      <ScrollView 
        className='flex-1' 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: containerPadding }}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map(renderEventCard)
          ) : (
            <View className='bg-white border border-gray-200 rounded-2xl p-8 items-center'>
              <Text style={{ fontSize: isTablet() ? 48 : 40 }} className='mb-4'>📅</Text>
              <Text 
                className='font-bold text-center mb-2'
                style={{ fontSize: isTablet() ? 18 : 16 }}
              >
                No Events Found
              </Text>
              <Text 
                className='text-gray-600 text-center'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                No events in this category. Try selecting a different category or add a new event.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add Event Modal */}
      <Modal
        visible={showAddEvent}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView className='flex-1 bg-white'>
          <View className='bg-rose-500 px-4 py-4'>
            <View className='flex-row items-center justify-between'>
              <TouchableOpacity onPress={() => setShowAddEvent(false)}>
                <Text style={{ fontSize: isTablet() ? 24 : 20 }} className='text-white'>←</Text>
              </TouchableOpacity>
              <Text 
                className='text-white font-bold'
                style={{ fontSize: isTablet() ? 18 : 16 }}
              >
                Add New Event
              </Text>
              <TouchableOpacity onPress={() => {
                Alert.alert('Event Added!', 'Your event has been added to the timeline.');
                setShowAddEvent(false);
              }}>
                <Text 
                  className='text-white font-semibold'
                  style={{ fontSize: isTablet() ? 16 : 14 }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View className='flex-1 px-4 py-4'>
            <View className='bg-gray-100 rounded-2xl p-6 items-center'>
              <Text style={{ fontSize: isTablet() ? 48 : 40 }} className='mb-4'>📝</Text>
              <Text 
                className='font-bold text-center mb-2'
                style={{ fontSize: isTablet() ? 18 : 16 }}
              >
                Add Event Feature
              </Text>
              <Text 
                className='text-gray-600 text-center'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                This feature will allow you to add custom events, set reminders, and manage your personal timeline.
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
