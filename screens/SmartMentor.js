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
  KeyboardAvoidingView,
  Platform,
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
import { useState, useRef, useEffect } from 'react';

export default function SmartMentorScreen({ onNavigate }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your Smart Mentor 🤖\n\nI'm here to help you with:\n• Career guidance\n• Subject doubts\n• Study tips\n• Stream selection\n• Board exam preparation\n\nWhat would you like to know?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef(null);

  const containerPadding = getContainerPadding();

  const quickQuestions = [
    "Which stream should I choose after Class 10?",
    "How to prepare for board exams?",
    "What are the career options in Science?",
    "How to improve my English marks?",
    "What subjects should I focus on?",
    "Tell me about Commerce stream",
    "How to manage study time?",
    "What are the best study techniques?"
  ];

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText.trim());
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Scroll to bottom after AI response
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1500);
  };

  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Stream selection responses
    if (input.includes('stream') || input.includes('science') || input.includes('commerce') || input.includes('arts')) {
      if (input.includes('science')) {
        return "Science stream is perfect for students interested in:\n\n🔬 **Subjects:** Physics, Chemistry, Mathematics, Biology/Computer Science\n\n🎯 **Career Options:**\n• Medical: Doctor, Dentist, Pharmacist\n• Engineering: Software, Mechanical, Civil\n• Research: Scientist, Researcher\n• Technology: IT Professional, Data Scientist\n\n💡 **Best for:** Students who enjoy problem-solving, logical thinking, and have strong math/science skills.\n\nWould you like to know more about any specific career path?";
      } else if (input.includes('commerce')) {
        return "Commerce stream offers excellent opportunities:\n\n📊 **Subjects:** Accountancy, Business Studies, Economics, Mathematics/Informatics\n\n🎯 **Career Options:**\n• Finance: Chartered Accountant, Banker, Financial Advisor\n• Business: Business Analyst, Entrepreneur, Manager\n• Government: Banking, Finance, Economics roles\n• Corporate: HR, Marketing, Operations\n\n💡 **Best for:** Students who enjoy working with numbers, have analytical skills, and are interested in business.\n\nWould you like details about any specific career?";
      } else if (input.includes('arts')) {
        return "Arts/Humanities stream is versatile and rewarding:\n\n📚 **Subjects:** History, Political Science, Geography, Psychology/Sociology\n\n🎯 **Career Options:**\n• Law: Lawyer, Judge, Legal Advisor\n• Media: Journalist, Content Writer, Editor\n• Government: Civil Services, Administrative roles\n• Social Work: Counselor, Social Worker, NGO roles\n• Teaching: Professor, School Teacher\n\n💡 **Best for:** Students who enjoy reading, writing, critical thinking, and social issues.\n\nWhat specific area interests you most?";
      } else {
        return "Great question! Here's a quick guide to choosing your stream:\n\n🔬 **Science:** Choose if you love math, science, problem-solving, and want careers in medicine, engineering, or research.\n\n📊 **Commerce:** Choose if you enjoy numbers, business, economics, and want careers in finance, business, or corporate world.\n\n📚 **Arts:** Choose if you love reading, writing, social issues, and want careers in law, media, government, or social work.\n\n💡 **Tip:** Consider your interests, strengths, and career goals. You can also take our Stream Discovery quiz for personalized recommendations!\n\nWhich stream interests you most?";
      }
    }
    
    // Study tips responses
    else if (input.includes('study') || input.includes('prepare') || input.includes('exam')) {
      return "Here are my top study tips for Class 10 students:\n\n📅 **Time Management:**\n• Create a daily study schedule\n• Study 2-3 hours daily consistently\n• Take breaks every 45-60 minutes\n\n📚 **Study Techniques:**\n• Active reading with notes\n• Practice previous year papers\n• Group study for difficult topics\n• Use visual aids and mind maps\n\n🎯 **Board Exam Preparation:**\n• Start early (6 months before)\n• Focus on NCERT books first\n• Practice sample papers regularly\n• Revise weekly\n\n💡 **Subject-Specific Tips:**\n• Math: Practice daily, understand concepts\n• Science: Learn formulas, do experiments\n• English: Read daily, practice writing\n• Social: Make notes, understand concepts\n\nWhich subject do you need help with?";
    }
    
    // Career guidance responses
    else if (input.includes('career') || input.includes('job') || input.includes('future')) {
      return "I'm excited to help with your career planning! 🚀\n\n**Key Steps for Career Planning:**\n\n1️⃣ **Self-Assessment:**\n• Identify your interests and strengths\n• Take aptitude tests\n• Consider your personality type\n\n2️⃣ **Research Careers:**\n• Explore different career options\n• Understand job requirements\n• Check salary expectations\n\n3️⃣ **Education Path:**\n• Choose the right stream\n• Plan for higher education\n• Consider skill development\n\n4️⃣ **Action Plan:**\n• Set short and long-term goals\n• Build relevant skills\n• Gain experience through internships\n\n**Popular Career Paths:**\n• Medical & Healthcare\n• Engineering & Technology\n• Business & Finance\n• Arts & Media\n• Government & Civil Services\n\nWhat specific career area interests you?";
    }
    
    // Subject-specific help
    else if (input.includes('math') || input.includes('mathematics')) {
      return "Mathematics can be challenging but very rewarding! Here's how to excel:\n\n📐 **Study Strategy:**\n• Practice daily - consistency is key\n• Understand concepts, don't just memorize\n• Start with easier problems, then move to complex ones\n• Review mistakes and learn from them\n\n📚 **Important Topics:**\n• Algebra and Quadratic Equations\n• Geometry and Trigonometry\n• Statistics and Probability\n• Coordinate Geometry\n\n💡 **Tips:**\n• Use visual aids and diagrams\n• Practice with previous year papers\n• Join study groups for difficult topics\n• Don't skip any topic - everything is important\n\nWhat specific math topic are you struggling with?";
    }
    
    else if (input.includes('english')) {
      return "English is crucial for all streams! Here's how to improve:\n\n📖 **Reading Skills:**\n• Read newspapers, novels, articles daily\n• Practice comprehension passages\n• Learn new vocabulary regularly\n• Understand different writing styles\n\n✍️ **Writing Skills:**\n• Practice essay writing weekly\n• Learn proper grammar rules\n• Use varied sentence structures\n• Proofread your work\n\n🎯 **Board Exam Tips:**\n• Read questions carefully\n• Manage time effectively\n• Write legibly and clearly\n• Use examples to support your points\n\n💡 **Resources:**\n• NCERT textbooks\n• Previous year papers\n• Grammar workbooks\n• English newspapers\n\nWhich area of English do you want to focus on?";
    }
    
    else if (input.includes('science') && (input.includes('subject') || input.includes('physics') || input.includes('chemistry') || input.includes('biology'))) {
      return "Science subjects require both understanding and application! Here's my advice:\n\n🔬 **Physics:**\n• Understand concepts first, then apply formulas\n• Practice numerical problems regularly\n• Learn derivations step by step\n• Use diagrams and graphs\n\n⚗️ **Chemistry:**\n• Memorize periodic table and reactions\n• Practice balancing equations\n• Understand chemical bonding concepts\n• Do practical experiments\n\n🧬 **Biology:**\n• Create flowcharts and diagrams\n• Understand processes step by step\n• Practice labeling diagrams\n• Connect concepts to real life\n\n💡 **General Tips:**\n• Study NCERT thoroughly\n• Practice previous year papers\n• Make notes for quick revision\n• Join practical classes if available\n\nWhich science subject needs more attention?";
    }
    
    // Default response
    else {
      return "That's a great question! I'm here to help you with all aspects of your Class 10 journey.\n\nI can assist you with:\n• 🎯 Stream selection and career guidance\n• 📚 Study tips and exam preparation\n• 📖 Subject-specific help\n• ⏰ Time management strategies\n• 🎓 Higher education planning\n\nCould you be more specific about what you'd like to know? For example:\n• \"How to choose between Science and Commerce?\"\n• \"Best study techniques for board exams\"\n• \"Career options in Arts stream\"\n• \"How to improve my math scores\"\n\nWhat would you like to explore?";
    }
  };

  const handleQuickQuestion = (question) => {
    setInputText(question);
    sendMessage();
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className='bg-blue-500 px-4 py-4'>
        <View className='flex-row items-center justify-between'>
          <TouchableOpacity onPress={() => onNavigate && onNavigate('class10')}>
            <Text style={{ fontSize: isTablet() ? 24 : 20 }} className='text-white'>←</Text>
          </TouchableOpacity>
          <View className='flex-row items-center'>
            <Text style={{ fontSize: isTablet() ? 24 : 20 }}>🤖</Text>
            <Text 
              className='text-white font-bold ml-2'
              style={{ fontSize: isTablet() ? 20 : 18 }}
            >
              Smart Mentor
            </Text>
          </View>
          <TouchableOpacity onPress={() => setMessages([messages[0]])}>
            <Text 
              className='text-white/80'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              Clear
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Questions */}
      <View className='bg-gray-50 px-4 py-3'>
        <Text 
          className='text-gray-600 font-medium mb-2'
          style={{ fontSize: isTablet() ? 14 : 12 }}
        >
          Quick Questions:
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quickQuestions.map((question, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleQuickQuestion(question)}
              className='bg-white border border-gray-200 rounded-full px-3 py-2 mr-2'
            >
              <Text 
                className='text-gray-700'
                style={{ fontSize: isTablet() ? 12 : 10 }}
              >
                {question}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Chat Messages */}
      <KeyboardAvoidingView 
        className='flex-1' 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          ref={scrollViewRef}
          className='flex-1 px-4'
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              className={`mb-4 ${message.isUser ? 'items-end' : 'items-start'}`}
            >
              <View
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.isUser
                    ? 'bg-blue-500'
                    : 'bg-gray-100'
                }`}
              >
                <Text
                  className={`${
                    message.isUser ? 'text-white' : 'text-gray-800'
                  }`}
                  style={{ fontSize: isTablet() ? 16 : 14, lineHeight: 20 }}
                >
                  {message.text}
                </Text>
                <Text
                  className={`mt-1 ${
                    message.isUser ? 'text-blue-100' : 'text-gray-500'
                  }`}
                  style={{ fontSize: isTablet() ? 12 : 10 }}
                >
                  {formatTime(message.timestamp)}
                </Text>
              </View>
            </View>
          ))}
          
          {isTyping && (
            <View className='mb-4 items-start'>
              <View className='bg-gray-100 rounded-2xl px-4 py-3'>
                <View className='flex-row items-center'>
                  <ActivityIndicator size="small" color="#6B7280" />
                  <Text 
                    className='text-gray-500 ml-2'
                    style={{ fontSize: isTablet() ? 14 : 12 }}
                  >
                    Smart Mentor is typing...
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View className='bg-white border-t border-gray-200 px-4 py-3'>
          <View className='flex-row items-center'>
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask me anything about your career journey..."
              className='flex-1 border border-gray-300 rounded-xl px-4 py-3 mr-3 bg-gray-50'
              style={{ fontSize: isTablet() ? 16 : 14 }}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              onPress={sendMessage}
              disabled={!inputText.trim()}
              className={`w-12 h-12 rounded-xl items-center justify-center ${
                inputText.trim() ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <Text 
                className='text-white font-bold'
                style={{ fontSize: isTablet() ? 18 : 16 }}
              >
                →
              </Text>
            </TouchableOpacity>
          </View>
          <Text 
            className='text-gray-400 text-right mt-1'
            style={{ fontSize: isTablet() ? 12 : 10 }}
          >
            {inputText.length}/500
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
