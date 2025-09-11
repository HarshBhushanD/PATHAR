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

export default function PeerNetworkScreen({ onNavigate }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('feed');
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');

  const containerPadding = getContainerPadding();

  const categories = [
    { id: 'general', name: 'General', emoji: '💬', color: 'bg-gray-100' },
    { id: 'study', name: 'Study Tips', emoji: '📚', color: 'bg-blue-100' },
    { id: 'doubts', name: 'Doubts', emoji: '❓', color: 'bg-red-100' },
    { id: 'notes', name: 'Notes', emoji: '📝', color: 'bg-green-100' },
    { id: 'motivation', name: 'Motivation', emoji: '💪', color: 'bg-yellow-100' },
    { id: 'career', name: 'Career', emoji: '🎯', color: 'bg-purple-100' }
  ];

  const posts = [
    {
      id: 1,
      user: 'Priya Sharma',
      avatar: '👩‍🎓',
      location: 'Delhi',
      time: '2 hours ago',
      category: 'study',
      title: 'Mathematics Tips for Board Exams',
      content: 'Hey everyone! I found these amazing math shortcuts that helped me improve my scores. The key is to practice quadratic equations daily and understand the concepts rather than memorizing formulas. Anyone else struggling with trigonometry?',
      likes: 24,
      comments: 8,
      isLiked: false,
      tags: ['mathematics', 'board-exams', 'study-tips']
    },
    {
      id: 2,
      user: 'Arjun Singh',
      avatar: '👨‍🎓',
      location: 'Mumbai',
      time: '4 hours ago',
      category: 'doubts',
      title: 'Science Doubt - Light Reflection',
      content: 'Can someone explain the difference between regular and irregular reflection? I have my physics exam tomorrow and this concept is confusing me. Any help would be appreciated!',
      likes: 12,
      comments: 15,
      isLiked: true,
      tags: ['physics', 'light', 'reflection']
    },
    {
      id: 3,
      user: 'Sneha Patel',
      avatar: '👩‍🎓',
      location: 'Ahmedabad',
      time: '6 hours ago',
      category: 'notes',
      title: 'English Literature Notes - Class 10',
      content: 'Sharing my comprehensive notes on "The Letter" by Dhumketu. Includes character analysis, themes, and important questions. Hope this helps! 📚',
      likes: 45,
      comments: 12,
      isLiked: false,
      tags: ['english', 'literature', 'notes']
    },
    {
      id: 4,
      user: 'Rahul Kumar',
      avatar: '👨‍🎓',
      location: 'Bangalore',
      time: '8 hours ago',
      category: 'motivation',
      title: 'Don\'t Give Up!',
      content: 'Just wanted to remind everyone that board exams are tough but you\'re tougher! I was failing in math 3 months ago, now I\'m scoring 85+. Consistency is key! 💪',
      likes: 67,
      comments: 23,
      isLiked: true,
      tags: ['motivation', 'success', 'consistency']
    },
    {
      id: 5,
      user: 'Ananya Gupta',
      avatar: '👩‍🎓',
      location: 'Kolkata',
      time: '1 day ago',
      category: 'career',
      title: 'Stream Selection After Class 10',
      content: 'I\'m confused between Science and Commerce. I love math but also enjoy business studies. What factors should I consider? Any advice from seniors?',
      likes: 34,
      comments: 28,
      isLiked: false,
      tags: ['stream-selection', 'career-guidance', 'science', 'commerce']
    }
  ];

  const studyGroups = [
    {
      id: 1,
      name: 'Math Warriors',
      members: 156,
      subject: 'Mathematics',
      emoji: '📐',
      description: 'Daily practice problems and doubt solving',
      isJoined: true
    },
    {
      id: 2,
      name: 'Science Explorers',
      members: 203,
      subject: 'Science',
      emoji: '🔬',
      description: 'Physics, Chemistry, Biology discussions',
      isJoined: false
    },
    {
      id: 3,
      name: 'English Literature Club',
      members: 89,
      subject: 'English',
      emoji: '📚',
      description: 'Poetry, prose, and writing tips',
      isJoined: true
    },
    {
      id: 4,
      name: 'Social Studies Squad',
      members: 124,
      subject: 'Social Studies',
      emoji: '🌍',
      description: 'History, Geography, and Civics',
      isJoined: false
    }
  ];

  const topContributors = [
    { name: 'Priya Sharma', avatar: '👩‍🎓', points: 1250, rank: 1 },
    { name: 'Arjun Singh', avatar: '👨‍🎓', points: 1180, rank: 2 },
    { name: 'Sneha Patel', avatar: '👩‍🎓', points: 1100, rank: 3 },
    { name: 'Rahul Kumar', avatar: '👨‍🎓', points: 980, rank: 4 },
    { name: 'Ananya Gupta', avatar: '👩‍🎓', points: 920, rank: 5 }
  ];

  const handleLike = (postId) => {
    // In a real app, this would update the backend
    Alert.alert('Liked!', 'Thanks for your support!');
  };

  const handleComment = (postId) => {
    Alert.alert('Comments', 'Comment feature coming soon!');
  };

  const handleShare = (postId) => {
    Alert.alert('Share', 'Share feature coming soon!');
  };

  const handleJoinGroup = (groupId) => {
    Alert.alert('Joined!', 'Welcome to the study group!');
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      Alert.alert('Posted!', 'Your post has been shared with the community!');
      setNewPost('');
      setShowPostModal(false);
    }
  };

  const renderPost = (post) => (
    <View key={post.id} className='bg-white border border-gray-200 rounded-2xl p-4 mb-4'>
      <View className='flex-row items-center mb-3'>
        <Text style={{ fontSize: isTablet() ? 32 : 24 }}>{post.avatar}</Text>
        <View className='ml-3 flex-1'>
          <Text 
            className='font-bold'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          >
            {post.user}
          </Text>
          <Text 
            className='text-gray-500'
            style={{ fontSize: isTablet() ? 12 : 10 }}
          >
            {post.location} • {post.time}
          </Text>
        </View>
        <View className={`px-2 py-1 rounded-full ${categories.find(c => c.id === post.category)?.color}`}>
          <Text 
            className='text-gray-700'
            style={{ fontSize: isTablet() ? 12 : 10 }}
          >
            {categories.find(c => c.id === post.category)?.name}
          </Text>
        </View>
      </View>
      
      <Text 
        className='font-bold mb-2'
        style={{ fontSize: isTablet() ? 18 : 16 }}
      >
        {post.title}
      </Text>
      
      <Text 
        className='text-gray-700 mb-3'
        style={{ fontSize: isTablet() ? 16 : 14 }}
      >
        {post.content}
      </Text>
      
      <View className='flex-row flex-wrap mb-3'>
        {post.tags.map((tag, index) => (
          <View key={index} className='bg-gray-100 rounded-full px-2 py-1 mr-2 mb-1'>
            <Text 
              className='text-gray-600'
              style={{ fontSize: isTablet() ? 12 : 10 }}
            >
              #{tag}
            </Text>
          </View>
        ))}
      </View>
      
      <View className='flex-row justify-between items-center'>
        <View className='flex-row items-center space-x-4'>
          <TouchableOpacity 
            onPress={() => handleLike(post.id)}
            className='flex-row items-center'
          >
            <Text style={{ fontSize: isTablet() ? 20 : 16 }}>
              {post.isLiked ? '❤️' : '🤍'}
            </Text>
            <Text 
              className='ml-1 text-gray-600'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              {post.likes}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => handleComment(post.id)}
            className='flex-row items-center'
          >
            <Text style={{ fontSize: isTablet() ? 20 : 16 }}>💬</Text>
            <Text 
              className='ml-1 text-gray-600'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              {post.comments}
            </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={() => handleShare(post.id)}>
          <Text style={{ fontSize: isTablet() ? 20 : 16 }}>📤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStudyGroups = () => (
    <View>
      <Text 
        className='font-extrabold mb-4'
        style={{ fontSize: isTablet() ? 24 : 20 }}
      >
        Study Groups
      </Text>
      {studyGroups.map((group) => (
        <View key={group.id} className='bg-white border border-gray-200 rounded-2xl p-4 mb-4'>
          <View className='flex-row items-center justify-between mb-3'>
            <View className='flex-row items-center'>
              <Text style={{ fontSize: isTablet() ? 32 : 24 }}>{group.emoji}</Text>
              <View className='ml-3'>
                <Text 
                  className='font-bold'
                  style={{ fontSize: isTablet() ? 18 : 16 }}
                >
                  {group.name}
                </Text>
                <Text 
                  className='text-gray-500'
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  {group.members} members • {group.subject}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => handleJoinGroup(group.id)}
              className={`px-4 py-2 rounded-xl ${
                group.isJoined ? 'bg-gray-200' : 'bg-pink-500'
              }`}
            >
              <Text 
                className={`font-semibold ${
                  group.isJoined ? 'text-gray-700' : 'text-white'
                }`}
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                {group.isJoined ? 'Joined' : 'Join'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text 
            className='text-gray-600'
            style={{ fontSize: isTablet() ? 14 : 12 }}
          >
            {group.description}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderLeaderboard = () => (
    <View>
      <Text 
        className='font-extrabold mb-4'
        style={{ fontSize: isTablet() ? 24 : 20 }}
      >
        Top Contributors
      </Text>
      <View className='bg-white border border-gray-200 rounded-2xl p-4'>
        {topContributors.map((contributor, index) => (
          <View key={index} className='flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0'>
            <View className='flex-row items-center'>
              <View className={`w-8 h-8 rounded-full items-center justify-center ${
                index === 0 ? 'bg-yellow-100' : 
                index === 1 ? 'bg-gray-100' : 
                index === 2 ? 'bg-orange-100' : 'bg-gray-50'
              }`}>
                <Text 
                  className={`font-bold ${
                    index === 0 ? 'text-yellow-600' : 
                    index === 1 ? 'text-gray-600' : 
                    index === 2 ? 'text-orange-600' : 'text-gray-500'
                  }`}
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  {index + 1}
                </Text>
              </View>
              <Text style={{ fontSize: isTablet() ? 24 : 20 }} className='ml-3'>{contributor.avatar}</Text>
              <Text 
                className='font-semibold ml-2'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                {contributor.name}
              </Text>
            </View>
            <Text 
              className='font-bold text-pink-600'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              {contributor.points} pts
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderFeed = () => (
    <View>
      <View className='flex-row items-center justify-between mb-4'>
        <Text 
          className='font-extrabold'
          style={{ fontSize: isTablet() ? 24 : 20 }}
        >
          Community Feed
        </Text>
        <TouchableOpacity
          onPress={() => setShowPostModal(true)}
          className='bg-pink-500 px-4 py-2 rounded-xl'
        >
          <Text 
            className='text-white font-semibold'
            style={{ fontSize: isTablet() ? 14 : 12 }}
          >
            + Post
          </Text>
        </TouchableOpacity>
      </View>
      
      {posts.map(renderPost)}
    </View>
  );

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'feed': return renderFeed();
      case 'groups': return renderStudyGroups();
      case 'leaderboard': return renderLeaderboard();
      default: return renderFeed();
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className='bg-pink-500 px-4 py-4'>
        <View className='flex-row items-center justify-between'>
          <TouchableOpacity onPress={() => onNavigate && onNavigate('class10')}>
            <Text style={{ fontSize: isTablet() ? 24 : 20 }} className='text-white'>←</Text>
          </TouchableOpacity>
          <View className='flex-row items-center'>
            <Text style={{ fontSize: isTablet() ? 24 : 20 }}>👥</Text>
            <Text 
              className='text-white font-bold ml-2'
              style={{ fontSize: isTablet() ? 20 : 18 }}
            >
              Peer Network
            </Text>
          </View>
          <View style={{ width: 24 }} />
        </View>
      </View>

      {/* Stats */}
      <View style={{ paddingHorizontal: containerPadding, marginTop: 16 }}>
        <View className='bg-white rounded-2xl p-4 mb-4'>
          <View className='flex-row justify-between items-center'>
            <View className='items-center'>
              <Text 
                className='font-bold text-pink-600'
                style={{ fontSize: isTablet() ? 24 : 20 }}
              >
                10,000+
              </Text>
              <Text 
                className='text-gray-600'
                style={{ fontSize: isTablet() ? 12 : 10 }}
              >
                Students
              </Text>
            </View>
            <View className='items-center'>
              <Text 
                className='font-bold text-pink-600'
                style={{ fontSize: isTablet() ? 24 : 20 }}
              >
                500+
              </Text>
              <Text 
                className='text-gray-600'
                style={{ fontSize: isTablet() ? 12 : 10 }}
              >
                Study Groups
              </Text>
            </View>
            <View className='items-center'>
              <Text 
                className='font-bold text-pink-600'
                style={{ fontSize: isTablet() ? 24 : 20 }}
              >
                1,000+
              </Text>
              <Text 
                className='text-gray-600'
                style={{ fontSize: isTablet() ? 12 : 10 }}
              >
                Posts Daily
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={{ paddingHorizontal: containerPadding, marginBottom: 16 }}>
        <View className='flex-row bg-white rounded-xl p-1'>
          {[
            { id: 'feed', name: 'Feed', emoji: '📱' },
            { id: 'groups', name: 'Groups', emoji: '👥' },
            { id: 'leaderboard', name: 'Top', emoji: '🏆' }
          ].map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              className={`flex-1 flex-row items-center justify-center py-3 rounded-lg ${
                activeTab === tab.id ? 'bg-pink-500' : 'bg-transparent'
              }`}
            >
              <Text style={{ fontSize: isTablet() ? 16 : 14 }}>{tab.emoji}</Text>
              <Text 
                className={`ml-2 font-semibold ${
                  activeTab === tab.id ? 'text-white' : 'text-gray-600'
                }`}
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content */}
      <ScrollView 
        className='flex-1' 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: containerPadding }}>
          {renderCurrentTab()}
        </View>
      </ScrollView>

      {/* Create Post Modal */}
      <Modal
        visible={showPostModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView className='flex-1 bg-white'>
          <View className='bg-pink-500 px-4 py-4'>
            <View className='flex-row items-center justify-between'>
              <TouchableOpacity onPress={() => setShowPostModal(false)}>
                <Text style={{ fontSize: isTablet() ? 24 : 20 }} className='text-white'>←</Text>
              </TouchableOpacity>
              <Text 
                className='text-white font-bold'
                style={{ fontSize: isTablet() ? 18 : 16 }}
              >
                Create Post
              </Text>
              <TouchableOpacity onPress={handleCreatePost}>
                <Text 
                  className='text-white font-semibold'
                  style={{ fontSize: isTablet() ? 16 : 14 }}
                >
                  Post
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View className='flex-1 px-4 py-4'>
            <View className='mb-4'>
              <Text 
                className='font-semibold mb-2'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                Category
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => setSelectedCategory(category.id)}
                    className={`border-2 rounded-xl px-4 py-2 mr-3 ${
                      selectedCategory === category.id
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <Text style={{ fontSize: isTablet() ? 16 : 14 }}>{category.emoji}</Text>
                    <Text 
                      className={`text-center mt-1 font-medium ${
                        selectedCategory === category.id ? 'text-pink-700' : 'text-gray-600'
                      }`}
                      style={{ fontSize: isTablet() ? 12 : 10 }}
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            
            <View className='mb-4'>
              <Text 
                className='font-semibold mb-2'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                What's on your mind?
              </Text>
              <TextInput
                value={newPost}
                onChangeText={setNewPost}
                placeholder="Share your thoughts, ask questions, or help others..."
                multiline
                numberOfLines={8}
                className='border border-gray-300 rounded-xl p-4 bg-gray-50'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
