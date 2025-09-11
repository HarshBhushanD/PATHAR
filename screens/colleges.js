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
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import { 
  wp, 
  hp, 
  isTablet, 
  isLargePhone, 
  getContainerPadding, 
  responsiveFont 
} from '../utils/responsive';
import { stateCollegesData } from '../data/collegeData';

export default function CollegesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [showStateColleges, setShowStateColleges] = useState(false);

  const containerPadding = getContainerPadding();

  const filters = [
    { id: 'all', name: 'All Colleges', emoji: '🏫' },
    { id: 'government', name: 'Government', emoji: '🏛️' },
    { id: 'engineering', name: 'Engineering', emoji: '⚙️' },
    { id: 'medical', name: 'Medical', emoji: '🏥' },
    { id: 'commerce', name: 'Commerce', emoji: '💼' },
    { id: 'arts', name: 'Arts', emoji: '🎨' },
    { id: 'state-wise', name: 'State-wise', emoji: '🗺️' }
  ];

  // Flatten all state colleges into a single array for search and filtering
  const getAllStateColleges = () => {
    const allColleges = [];
    Object.values(stateCollegesData).forEach(state => {
      state.colleges.forEach(college => {
        allColleges.push({
          ...college,
          stateName: state.stateName,
          // Convert to match existing structure
          shortName: college.name.split(' ').slice(0, 3).join(' '),
          affiliation: college.type,
          placementStats: {
            averagePackage: '₹8-15 LPA',
            highestPackage: '₹25+ LPA',
            placementRate: '85%',
            topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Government Sector']
          },
          contact: {
            phone: '+91-XXX-XXX-XXXX',
            email: 'info@college.edu.in',
            website: 'www.college.edu.in',
            address: `${college.location}, ${state.stateName}`
          },
          nearbyPlaces: [`City Center: ${college.location}`, 'Airport: 15-30 km', 'Railway: 5-15 km'],
          facilities: [
            'Library', 'Computer Labs', 'Sports Complex', 'Hostels',
            'Cafeteria', 'Wi-Fi Campus', 'Laboratories', 'Auditorium'
          ],
          admissionProcess: [
            'Online Application',
            'Entrance Exam (if applicable)',
            'Merit List Publication',
            'Counseling Process',
            'Document Verification',
            'Fee Payment & Admission'
          ]
        });
      });
    });
    return allColleges;
  };

  const colleges = [
    {
      id: 1,
      name: 'Indian Institute of Technology Delhi',
      shortName: 'IIT Delhi',
      location: 'New Delhi',
      type: 'Government',
      category: 'engineering',
      rating: '4.8/5',
      rank: '#2 Engineering India',
      established: '1961',
      affiliation: 'Autonomous',
      courses: [
        {
          name: 'B.Tech Computer Science',
          duration: '4 years',
          fees: '₹2.5 LPA',
          cutoff: {
            general: 'JEE Rank: 100-500',
            obc: 'JEE Rank: 150-600',
            sc: 'JEE Rank: 50-200',
            st: 'JEE Rank: 25-100'
          },
          eligibility: 'Class 12 with PCM, 75% marks, JEE Advanced qualified',
          seats: 120
        },
        {
          name: 'B.Tech Electronics',
          duration: '4 years',
          fees: '₹2.5 LPA',
          cutoff: {
            general: 'JEE Rank: 800-1500',
            obc: 'JEE Rank: 1000-1800',
            sc: 'JEE Rank: 400-800',
            st: 'JEE Rank: 200-400'
          },
          eligibility: 'Class 12 with PCM, 75% marks, JEE Advanced qualified',
          seats: 90
        }
      ],
      facilities: [
        'World-class laboratories',
        '24/7 Library with 500k+ books',
        'High-speed WiFi campus',
        'Sports complex with pool',
        'Modern hostels',
        'Industry partnerships',
        'Research centers',
        'Placement cell'
      ],
      admissionProcess: [
        'JEE Main qualification (99+ percentile)',
        'JEE Advanced examination',
        'Counseling through JoSAA',
        'Document verification',
        'Seat allotment',
        'Fee payment & admission'
      ],
      placementStats: {
        averagePackage: '₹15.2 LPA',
        highestPackage: '₹1.2+ Crore',
        placementRate: '95%',
        topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs']
      },
      contact: {
        phone: '+91-11-2659-1999',
        email: 'admission@iitd.ac.in',
        website: 'www.iitd.ac.in',
        address: 'Hauz Khas, New Delhi - 110016'
      },
      nearbyPlaces: ['Metro: Hauz Khas (500m)', 'Airport: 12 km', 'Railway: New Delhi (8 km)']
    },
    {
      id: 2,
      name: 'All India Institute of Medical Sciences',
      shortName: 'AIIMS Delhi',
      location: 'New Delhi',
      type: 'Government',
      category: 'medical',
      rating: '4.9/5',
      rank: '#1 Medical India',
      established: '1956',
      affiliation: 'Autonomous',
      courses: [
        {
          name: 'MBBS',
          duration: '5.5 years',
          fees: '₹1,500 per year',
          cutoff: {
            general: 'NEET Score: 720+',
            obc: 'NEET Score: 700+',
            sc: 'NEET Score: 650+',
            st: 'NEET Score: 600+'
          },
          eligibility: 'Class 12 with PCB, 50% marks (40% SC/ST), NEET qualified',
          seats: 125
        },
        {
          name: 'B.Sc Nursing',
          duration: '4 years',
          fees: '₹3,000 per year',
          cutoff: {
            general: 'NEET Score: 600+',
            obc: 'NEET Score: 580+',
            sc: 'NEET Score: 520+',
            st: 'NEET Score: 480+'
          },
          eligibility: 'Class 12 with PCB, 45% marks, NEET qualified',
          seats: 60
        }
      ],
      facilities: [
        'Super-specialty hospital',
        'Advanced medical equipment',
        'Research laboratories',
        'Digital library',
        'Simulation labs',
        'Anatomy museum',
        'Hostels for students',
        'Sports facilities'
      ],
      admissionProcess: [
        'NEET examination',
        'Counseling through MCC',
        'Choice filling',
        'Document verification',
        'Seat allotment',
        'Admission & fee payment'
      ],
      placementStats: {
        averagePackage: '₹8-12 LPA',
        highestPackage: '₹25+ LPA',
        placementRate: '100%',
        topRecruiters: ['Fortis', 'Apollo', 'Max Healthcare', 'Medanta']
      },
      contact: {
        phone: '+91-11-2659-3333',
        email: 'dean.admissions@aiims.edu',
        website: 'www.aiims.edu',
        address: 'Ansari Nagar, New Delhi - 110029'
      },
      nearbyPlaces: ['Metro: AIIMS (100m)', 'Airport: 15 km', 'Railway: New Delhi (12 km)']
    },
    {
      id: 3,
      name: 'Shri Ram College of Commerce',
      shortName: 'SRCC',
      location: 'New Delhi',
      type: 'Government',
      category: 'commerce',
      rating: '4.6/5',
      rank: '#1 Commerce Delhi University',
      established: '1926',
      affiliation: 'University of Delhi',
      courses: [
        {
          name: 'B.Com (Hons)',
          duration: '3 years',
          fees: '₹35,000 per year',
          cutoff: {
            general: '99.5%+ in best 4',
            obc: '99%+ in best 4',
            sc: '97%+ in best 4',
            st: '95%+ in best 4'
          },
          eligibility: 'Class 12 with Maths/Business Studies, 45% aggregate',
          seats: 126
        },
        {
          name: 'B.A. Economics (Hons)',
          duration: '3 years',
          fees: '₹35,000 per year',
          cutoff: {
            general: '99.75%+ in best 4',
            obc: '99.25%+ in best 4',
            sc: '98%+ in best 4',
            st: '96%+ in best 4'
          },
          eligibility: 'Class 12 with Maths, 45% aggregate',
          seats: 84
        }
      ],
      facilities: [
        'Well-equipped library',
        'Computer labs',
        'Auditorium',
        'Sports grounds',
        'Cafeteria',
        'Wi-Fi campus',
        'Seminar halls',
        'Career counseling'
      ],
      admissionProcess: [
        'Online application on DU portal',
        'Class 12 merit-based selection',
        'Document verification',
        'Seat allotment',
        'Admission confirmation',
        'Fee payment'
      ],
      placementStats: {
        averagePackage: '₹12.5 LPA',
        highestPackage: '₹58+ LPA',
        placementRate: '98%',
        topRecruiters: ['Goldman Sachs', 'McKinsey', 'Deloitte', 'EY']
      },
      contact: {
        phone: '+91-11-2766-7936',
        email: 'principal@srcc.du.ac.in',
        website: 'www.srcc.edu',
        address: 'Maurice Nagar, New Delhi - 110007'
      },
      nearbyPlaces: ['Metro: Vishwavidyalaya (2 km)', 'Airport: 20 km', 'Railway: Old Delhi (8 km)']
    },
    {
      id: 4,
      name: 'Jamia Millia Islamia',
      shortName: 'JMI',
      location: 'New Delhi',
      type: 'Government',
      category: 'arts',
      rating: '4.3/5',
      rank: '#12 University India',
      established: '1920',
      affiliation: 'Central University',
      courses: [
        {
          name: 'B.A. English (Hons)',
          duration: '3 years',
          fees: '₹15,000 per year',
          cutoff: {
            general: '85%+ in best 4',
            obc: '82%+ in best 4',
            sc: '78%+ in best 4',
            st: '75%+ in best 4'
          },
          eligibility: 'Class 12 with English, 45% aggregate',
          seats: 90
        },
        {
          name: 'B.A. Political Science (Hons)',
          duration: '3 years',
          fees: '₹15,000 per year',
          cutoff: {
            general: '88%+ in best 4',
            obc: '85%+ in best 4',
            sc: '80%+ in best 4',
            st: '78%+ in best 4'
          },
          eligibility: 'Class 12 any stream, 45% aggregate',
          seats: 75
        }
      ],
      facilities: [
        'Central library',
        'Computer center',
        'Sports complex',
        'Hostels',
        'Medical center',
        'Cafeteria',
        'Cultural center',
        'Research facilities'
      ],
      admissionProcess: [
        'JMI Entrance Test',
        'Merit-based selection',
        'Document verification',
        'Counseling',
        'Seat allotment',
        'Admission & fee payment'
      ],
      placementStats: {
        averagePackage: '₹6.5 LPA',
        highestPackage: '₹25+ LPA',
        placementRate: '85%',
        topRecruiters: ['TCS', 'Wipro', 'Infosys', 'Accenture']
      },
      contact: {
        phone: '+91-11-2698-1717',
        email: 'info@jmi.ac.in',
        website: 'www.jmi.ac.in',
        address: 'Jamia Nagar, New Delhi - 110025'
      },
      nearbyPlaces: ['Metro: Okhla (3 km)', 'Airport: 18 km', 'Railway: Nizamuddin (10 km)']
    },
    {
      id: 5,
      name: 'National Institute of Technology Kurukshetra',
      shortName: 'NIT Kurukshetra',
      location: 'Kurukshetra, Haryana',
      type: 'Government',
      category: 'engineering',
      rating: '4.4/5',
      rank: '#25 Engineering India',
      established: '1963',
      affiliation: 'NIT (Institute of National Importance)',
      courses: [
        {
          name: 'B.Tech Mechanical Engineering',
          duration: '4 years',
          fees: '₹1.8 LPA',
          cutoff: {
            general: 'JEE Rank: 8000-15000',
            obc: 'JEE Rank: 12000-20000',
            sc: 'JEE Rank: 3000-8000',
            st: 'JEE Rank: 1500-4000'
          },
          eligibility: 'Class 12 with PCM, 75% marks, JEE Main qualified',
          seats: 120
        }
      ],
      facilities: [
        'Modern laboratories',
        'Central library',
        'High-speed internet',
        'Sports facilities',
        'Hostels',
        'Medical facilities',
        'Training & placement cell',
        'Innovation center'
      ],
      admissionProcess: [
        'JEE Main examination',
        'Counseling through JoSAA',
        'Choice filling',
        'Document verification',
        'Seat allotment',
        'Admission confirmation'
      ],
      placementStats: {
        averagePackage: '₹10.2 LPA',
        highestPackage: '₹39+ LPA',
        placementRate: '90%',
        topRecruiters: ['TCS', 'Infosys', 'L&T', 'Microsoft']
      },
      contact: {
        phone: '+91-1744-233-208',
        email: 'registrar@nitkkr.ac.in',
        website: 'www.nitkkr.ac.in',
        address: 'Kurukshetra, Haryana - 136119'
      },
      nearbyPlaces: ['Railway: Kurukshetra (2 km)', 'Airport: Chandigarh (90 km)', 'Delhi: 160 km']
    },
    {
      id: 6,
      name: 'Government Medical College Chandigarh',
      shortName: 'GMCH',
      location: 'Chandigarh',
      type: 'Government',
      category: 'medical',
      rating: '4.2/5',
      rank: '#15 Medical India',
      established: '1962',
      affiliation: 'Punjab University',
      courses: [
        {
          name: 'MBBS',
          duration: '5.5 years',
          fees: '₹50,000 per year',
          cutoff: {
            general: 'NEET Score: 650+',
            obc: 'NEET Score: 620+',
            sc: 'NEET Score: 580+',
            st: 'NEET Score: 550+'
          },
          eligibility: 'Class 12 with PCB, 50% marks, NEET qualified',
          seats: 150
        }
      ],
      facilities: [
        'Teaching hospital',
        'Modern equipment',
        'Research labs',
        'Library',
        'Hostels',
        'Sports facilities',
        'Cafeteria',
        'Ambulance service'
      ],
      admissionProcess: [
        'NEET examination',
        'State counseling',
        'Choice filling',
        'Document verification',
        'Seat allotment',
        'Admission process'
      ],
      placementStats: {
        averagePackage: '₹6-10 LPA',
        highestPackage: '₹20+ LPA',
        placementRate: '95%',
        topRecruiters: ['PGI', 'AIIMS', 'Government Hospitals', 'Private Hospitals']
      },
      contact: {
        phone: '+91-172-2601-023',
        email: 'principal@gmch.gov.in',
        website: 'www.gmch.gov.in',
        address: 'Sector 32, Chandigarh - 160030'
      },
      nearbyPlaces: ['Airport: Chandigarh (12 km)', 'Railway: Chandigarh (5 km)', 'Delhi: 250 km']
    },
    ...getAllStateColleges()
  ];

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         college.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (college.stateName && college.stateName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         college.type.toLowerCase() === selectedFilter ||
                         college.category === selectedFilter ||
                         selectedFilter === 'state-wise';
    
    return matchesSearch && matchesFilter;
  });

  const handleCollegePress = (college) => {
    setSelectedCollege(college);
    setShowDetails(true);
  };

  const renderFilterChip = (filter) => (
    <TouchableOpacity
      key={filter.id}
      onPress={() => setSelectedFilter(filter.id)}
      className={`border-2 rounded-xl px-4 py-3 mr-3 ${
        selectedFilter === filter.id
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 bg-white'
      }`}
    >
      <Text style={{ fontSize: isTablet() ? 16 : 14 }} className='text-center'>{filter.emoji}</Text>
      <Text 
        className={`text-center mt-1 font-medium ${
          selectedFilter === filter.id ? 'text-blue-700' : 'text-gray-600'
        }`}
        style={{ fontSize: isTablet() ? 12 : 10 }}
      >
        {filter.name}
      </Text>
    </TouchableOpacity>
  );

  const renderCollegeCard = (college) => (
    <TouchableOpacity
      key={college.id}
      onPress={() => handleCollegePress(college)}
      className='bg-white border border-gray-200 rounded-2xl p-4 mb-4 shadow-sm'
    >
      <View className='flex-row items-start justify-between mb-3'>
        <View className='flex-1'>
          <Text 
            className='font-bold mb-1'
            style={{ fontSize: isTablet() ? 18 : 16 }}
          >
            {college.shortName}
          </Text>
          <Text 
            className='text-gray-600 mb-2'
            style={{ fontSize: isTablet() ? 14 : 12 }}
          >
            {college.name}
          </Text>
          <View className='flex-row items-center mb-1'>
            <Text style={{ fontSize: isTablet() ? 14 : 12 }}>📍</Text>
            <Text 
              className='text-gray-600 ml-1'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              {college.location}
            </Text>
          </View>
          <View className='flex-row items-center'>
            <Text style={{ fontSize: isTablet() ? 14 : 12 }}>🏛️</Text>
            <Text 
              className='text-gray-600 ml-1'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              {college.type} • Est. {college.established}
            </Text>
          </View>
        </View>
        
        <View className='items-end'>
          <View className='bg-green-100 px-2 py-1 rounded mb-2'>
            <Text 
              className='text-green-700 font-semibold'
              style={{ fontSize: isTablet() ? 12 : 10 }}
            >
              {college.rating}
            </Text>
          </View>
          <Text 
            className='text-blue-600 font-semibold text-right'
            style={{ fontSize: isTablet() ? 12 : 10 }}
          >
            {college.rank}
          </Text>
        </View>
        </View>

      <View className='flex-row flex-wrap mb-3'>
        {college.courses.slice(0, 2).map((course, index) => (
          <View key={index} className='bg-gray-100 rounded-full px-2 py-1 mr-2 mb-1'>
            <Text 
              className='text-gray-700'
              style={{ fontSize: isTablet() ? 10 : 8 }}
            >
              {course.name}
            </Text>
          </View>
        ))}
        {college.courses.length > 2 && (
          <View className='bg-gray-100 rounded-full px-2 py-1 mr-2 mb-1'>
            <Text 
              className='text-gray-700'
              style={{ fontSize: isTablet() ? 10 : 8 }}
            >
              +{college.courses.length - 2} more
            </Text>
          </View>
        )}
      </View>
      
      <View className='flex-row justify-between items-center'>
        <View className='flex-row space-x-3'>
          <View className='items-center'>
            <Text 
              className='font-semibold text-blue-600'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              {college.placementStats.averagePackage}
            </Text>
            <Text 
              className='text-gray-500'
              style={{ fontSize: isTablet() ? 10 : 8 }}
            >
              Avg Package
            </Text>
          </View>
          <View className='items-center'>
            <Text 
              className='font-semibold text-green-600'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              {college.placementStats.placementRate}
            </Text>
            <Text 
              className='text-gray-500'
              style={{ fontSize: isTablet() ? 10 : 8 }}
            >
              Placement
            </Text>
          </View>
        </View>

        <Text 
          className='text-blue-600 font-semibold'
          style={{ fontSize: isTablet() ? 14 : 12 }}
        >
          View Details →
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderCollegeDetails = () => {
    if (!selectedCollege) return null;

    return (
      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className='bg-blue-50 p-4 mb-4'>
          <Text 
            className='font-bold mb-2'
            style={{ fontSize: isTablet() ? 24 : 20 }}
          >
            {selectedCollege.name}
          </Text>
          <View className='flex-row items-center mb-2'>
            <Text style={{ fontSize: isTablet() ? 16 : 14 }}>📍</Text>
            <Text 
              className='text-gray-700 ml-2'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              {selectedCollege.location}
            </Text>
          </View>
          <View className='flex-row items-center justify-between'>
            <Text 
              className='text-gray-600'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              {selectedCollege.type} • Est. {selectedCollege.established}
            </Text>
            <View className='bg-green-500 px-3 py-1 rounded'>
              <Text 
                className='text-white font-semibold'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                {selectedCollege.rating}
              </Text>
            </View>
          </View>
                </View>

        {/* Courses & Cutoffs */}
        <View className='px-4 mb-6'>
          <Text 
            className='font-bold mb-4'
            style={{ fontSize: isTablet() ? 20 : 18 }}
          >
            📚 Courses & Cutoffs
          </Text>
          {selectedCollege.courses.map((course, index) => (
            <View key={index} className='bg-white border border-gray-200 rounded-2xl p-4 mb-4'>
              <Text 
                className='font-bold mb-2'
                style={{ fontSize: isTablet() ? 18 : 16 }}
              >
                {course.name}
              </Text>
              <View className='flex-row justify-between mb-3'>
                <Text 
                  className='text-gray-600'
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  Duration: {course.duration}
                </Text>
                <Text 
                  className='text-green-600 font-semibold'
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  Fees: {course.fees}
                </Text>
              </View>
              
              <Text 
                className='font-semibold mb-2'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                Cutoff Marks:
              </Text>
              {Object.entries(course.cutoff).map(([category, marks]) => (
                <View key={category} className='flex-row justify-between py-1'>
                  <Text 
                    className='text-gray-700'
                    style={{ fontSize: isTablet() ? 14 : 12 }}
                  >
                    {category.toUpperCase()}:
                  </Text>
                  <Text 
                    className='font-semibold'
                    style={{ fontSize: isTablet() ? 14 : 12 }}
                  >
                    {marks}
                  </Text>
                </View>
              ))}
              
              <View className='mt-3 pt-3 border-t border-gray-200'>
                <Text 
                  className='font-semibold mb-1'
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  Eligibility:
                </Text>
                <Text 
                  className='text-gray-700'
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  {course.eligibility}
                </Text>
                <Text 
                  className='text-blue-600 font-semibold mt-1'
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  Total Seats: {course.seats}
                </Text>
              </View>
                  </View>
                ))}
              </View>
              
        {/* Facilities */}
        <View className='px-4 mb-6'>
          <Text 
            className='font-bold mb-4'
            style={{ fontSize: isTablet() ? 20 : 18 }}
          >
            🏗️ Facilities
          </Text>
          <View className='bg-white border border-gray-200 rounded-2xl p-4'>
            <View className='flex-row flex-wrap'>
              {selectedCollege.facilities.map((facility, index) => (
                <View key={index} className='w-1/2 mb-2'>
                  <Text 
                    className='text-gray-700'
                    style={{ fontSize: isTablet() ? 14 : 12 }}
                  >
                    ✓ {facility}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Admission Process */}
        <View className='px-4 mb-6'>
          <Text 
            className='font-bold mb-4'
            style={{ fontSize: isTablet() ? 20 : 18 }}
          >
            📝 Admission Process
          </Text>
          <View className='bg-white border border-gray-200 rounded-2xl p-4'>
            {selectedCollege.admissionProcess.map((step, index) => (
              <View key={index} className='flex-row items-start mb-3'>
                <View className='w-6 h-6 bg-blue-500 rounded-full items-center justify-center mr-3 mt-1'>
                  <Text 
                    className='text-white font-bold'
                    style={{ fontSize: isTablet() ? 12 : 10 }}
                  >
                    {index + 1}
                  </Text>
                </View>
                <Text 
                  className='text-gray-700 flex-1'
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  {step}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Placement Statistics */}
        <View className='px-4 mb-6'>
          <Text 
            className='font-bold mb-4'
            style={{ fontSize: isTablet() ? 20 : 18 }}
          >
            💼 Placement Statistics
          </Text>
          <View className='bg-white border border-gray-200 rounded-2xl p-4'>
            <View className='flex-row justify-between mb-4'>
              <View className='items-center'>
                <Text 
                  className='font-bold text-green-600'
                  style={{ fontSize: isTablet() ? 18 : 16 }}
                >
                  {selectedCollege.placementStats.averagePackage}
                </Text>
                <Text 
                  className='text-gray-600'
                  style={{ fontSize: isTablet() ? 12 : 10 }}
                >
                  Average Package
                </Text>
              </View>
              <View className='items-center'>
                <Text 
                  className='font-bold text-blue-600'
                  style={{ fontSize: isTablet() ? 18 : 16 }}
                >
                  {selectedCollege.placementStats.highestPackage}
                </Text>
                <Text 
                  className='text-gray-600'
                  style={{ fontSize: isTablet() ? 12 : 10 }}
                >
                  Highest Package
                </Text>
              </View>
              <View className='items-center'>
                <Text 
                  className='font-bold text-purple-600'
                  style={{ fontSize: isTablet() ? 18 : 16 }}
                >
                  {selectedCollege.placementStats.placementRate}
                </Text>
                <Text 
                  className='text-gray-600'
                  style={{ fontSize: isTablet() ? 12 : 10 }}
                >
                  Placement Rate
                </Text>
              </View>
            </View>
            
            <Text 
              className='font-semibold mb-2'
              style={{ fontSize: isTablet() ? 16 : 14 }}
            >
              Top Recruiters:
            </Text>
            <View className='flex-row flex-wrap'>
              {selectedCollege.placementStats.topRecruiters.map((recruiter, index) => (
                <View key={index} className='bg-gray-100 rounded-full px-3 py-1 mr-2 mb-2'>
                  <Text 
                    className='text-gray-700'
                    style={{ fontSize: isTablet() ? 12 : 10 }}
                  >
                    {recruiter}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View className='px-4 mb-6'>
          <Text 
            className='font-bold mb-4'
            style={{ fontSize: isTablet() ? 20 : 18 }}
          >
            📞 Contact Information
          </Text>
          <View className='bg-white border border-gray-200 rounded-2xl p-4'>
            <View className='mb-3'>
              <Text 
                className='font-semibold mb-1'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                Address:
              </Text>
              <Text 
                className='text-gray-700'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                {selectedCollege.contact.address}
              </Text>
            </View>
            
            <View className='flex-row justify-between mb-3'>
              <View className='flex-1'>
                <Text 
                  className='font-semibold mb-1'
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  Phone:
                </Text>
                <Text 
                  className='text-blue-600'
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  {selectedCollege.contact.phone}
                </Text>
              </View>
              <View className='flex-1'>
                <Text 
                  className='font-semibold mb-1'
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  Email:
                </Text>
                <Text 
                  className='text-blue-600'
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  {selectedCollege.contact.email}
                </Text>
              </View>
            </View>
            
            <Text 
              className='font-semibold mb-1'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              Website:
            </Text>
            <Text 
              className='text-blue-600 mb-3'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              {selectedCollege.contact.website}
            </Text>
            
            <Text 
              className='font-semibold mb-2'
              style={{ fontSize: isTablet() ? 14 : 12 }}
            >
              Nearby Places:
            </Text>
            {selectedCollege.nearbyPlaces.map((place, index) => (
              <Text 
                key={index}
                className='text-gray-700'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                • {place}
              </Text>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View className='px-4 pb-6'>
          <View className='flex-row space-x-3'>
            <TouchableOpacity 
              className='flex-1 bg-blue-500 rounded-xl py-4'
              onPress={() => Alert.alert('Application', 'Opening application portal...')}
            >
              <Text 
                className='text-white font-bold text-center'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                Apply Now
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className='flex-1 bg-green-500 rounded-xl py-4'
              onPress={() => Alert.alert('Directions', 'Opening maps for directions...')}
            >
              <Text 
                className='text-white font-bold text-center'
                style={{ fontSize: isTablet() ? 16 : 14 }}
              >
                Get Directions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderStateWiseView = () => {
    const availableStates = Object.keys(stateCollegesData).map(key => ({
      id: key,
      name: stateCollegesData[key].stateName,
      collegeCount: stateCollegesData[key].colleges.length
    }));

    return (
      <View style={{ paddingHorizontal: containerPadding }}>
        <Text 
          className='font-bold mb-4'
          style={{ fontSize: isTablet() ? 20 : 18 }}
        >
          🗺️ State-wise Government Colleges
        </Text>
        
        <Text 
          className='text-gray-600 mb-6'
          style={{ fontSize: isTablet() ? 14 : 12 }}
        >
          Select your state to explore government colleges
        </Text>

        {availableStates.map((state) => (
          <TouchableOpacity
            key={state.id}
            onPress={() => {
              setSelectedState(state.id);
              setShowStateColleges(true);
            }}
            className='bg-white border border-gray-200 rounded-2xl p-4 mb-4'
          >
            <View className='flex-row items-center justify-between'>
              <View className='flex-1'>
                <Text 
                  className='font-bold mb-1'
                  style={{ fontSize: isTablet() ? 18 : 16 }}
                >
                  {state.name}
                </Text>
                <Text 
                  className='text-gray-600'
                  style={{ fontSize: isTablet() ? 14 : 12 }}
                >
                  {state.collegeCount} Government Colleges
                </Text>
              </View>
              <View className='items-center'>
                <Text 
                  className='font-bold text-green-600'
                  style={{ fontSize: isTablet() ? 20 : 18 }}
                >
                  {state.collegeCount}
                </Text>
                <Text 
                  className='text-gray-500'
                  style={{ fontSize: isTablet() ? 10 : 8 }}
                >
                  Colleges
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <StatusBar style="dark" />

      {/* Header */}
      <View className='bg-blue-500 px-4 py-4 mt-10'>
        <Text 
          className='text-white font-bold text-center'
          style={{ fontSize: isTablet() ? 24 : 20 }}
        >
          🏫 College Navigator
        </Text>
        <Text 
          className='text-blue-100 text-center mt-1'
          style={{ fontSize: isTablet() ? 16 : 14 }}
        >
          Find your perfect college with detailed information
        </Text>
      </View>

      {/* Search and Filters */}
      <View style={{ paddingHorizontal: containerPadding, marginTop: 16 }}>
        {/* Search Bar */}
        <View className='bg-white rounded-xl border border-gray-200 px-4 py-3 mb-4'>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search colleges by name or location..."
            className='text-gray-800'
            style={{ fontSize: isTablet() ? 16 : 14 }}
          />
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mb-4'>
          {filters.map(renderFilterChip)}
        </ScrollView>

        {/* Results Count */}
        <Text 
          className='text-gray-600 mb-4'
          style={{ fontSize: isTablet() ? 14 : 12 }}
        >
          Found {filteredColleges.length} colleges
        </Text>
      </View>

      {/* College List */}
      <ScrollView 
        className='flex-1' 
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: containerPadding }}>
          {selectedFilter === 'state-wise' ? (
            renderStateWiseView()
          ) : filteredColleges.length > 0 ? (
            filteredColleges.map(renderCollegeCard)
          ) : (
            <View className='bg-white border border-gray-200 rounded-2xl p-8 items-center'>
              <Text style={{ fontSize: isTablet() ? 48 : 40 }} className='mb-4'>🔍</Text>
              <Text 
                className='font-bold text-center mb-2'
                style={{ fontSize: isTablet() ? 18 : 16 }}
              >
                No Colleges Found
              </Text>
              <Text 
                className='text-gray-600 text-center'
                style={{ fontSize: isTablet() ? 14 : 12 }}
              >
                Try adjusting your search terms or filters
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* College Details Modal */}
      <Modal
        visible={showDetails}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <SafeAreaView className='flex-1 bg-gray-50'>
          <View className='bg-blue-500 px-4 py-4'>
            <View className='flex-row items-center justify-between'>
              <TouchableOpacity onPress={() => setShowDetails(false)}>
                <Text style={{ fontSize: isTablet() ? 24 : 20 }} className='text-white'>←</Text>
              </TouchableOpacity>
              <Text 
                className='text-white font-bold'
                style={{ fontSize: isTablet() ? 18 : 16 }}
              >
                College Details
              </Text>
              <TouchableOpacity onPress={() => Alert.alert('Bookmark', 'College bookmarked!')}>
                <Text style={{ fontSize: isTablet() ? 24 : 20 }} className='text-white'>🔖</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {renderCollegeDetails()}
        </SafeAreaView>
      </Modal>

      {/* State-wise Colleges Modal */}
      <Modal
        visible={showStateColleges}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <SafeAreaView className='flex-1 bg-gray-50'>
          <View className='bg-blue-500 px-4 py-4'>
            <View className='flex-row items-center justify-between'>
              <TouchableOpacity onPress={() => setShowStateColleges(false)}>
                <Text style={{ fontSize: isTablet() ? 24 : 20 }} className='text-white'>←</Text>
              </TouchableOpacity>
              <Text 
                className='text-white font-bold'
                style={{ fontSize: isTablet() ? 18 : 16 }}
              >
                {selectedState ? stateCollegesData[selectedState].stateName : 'Select a State'}
              </Text>
              <TouchableOpacity onPress={() => Alert.alert('Bookmark', 'State colleges bookmarked!')}>
                <Text style={{ fontSize: isTablet() ? 24 : 20 }} className='text-white'>🔖</Text>
              </TouchableOpacity>
            </View>
          </View>
          
                     <ScrollView 
             className='flex-1' 
             contentContainerStyle={{ paddingBottom: 20 }}
             showsVerticalScrollIndicator={false}
           >
             <View style={{ paddingHorizontal: containerPadding, marginTop: 20 }}>
               {selectedState && stateCollegesData[selectedState] && (
                 <>
                   <Text 
                     className='font-bold mb-4'
                     style={{ fontSize: isTablet() ? 20 : 18 }}
                   >
                     Top Government Colleges in {stateCollegesData[selectedState].stateName}
                   </Text>
                   
                   {stateCollegesData[selectedState].colleges.map((college) => (
                     <TouchableOpacity
                       key={college.id}
                       onPress={() => {
                         const formattedCollege = {
                           ...college,
                           shortName: college.name.split(' ').slice(0, 3).join(' '),
                           affiliation: college.type,
                           placementStats: {
                             averagePackage: '₹8-15 LPA',
                             highestPackage: '₹25+ LPA',
                             placementRate: '85%',
                             topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Government Sector']
                           },
                           contact: {
                             phone: '+91-XXX-XXX-XXXX',
                             email: 'info@college.edu.in',
                             website: 'www.college.edu.in',
                             address: `${college.location}, ${stateCollegesData[selectedState].stateName}`
                           },
                           nearbyPlaces: [`City Center: ${college.location}`, 'Airport: 15-30 km', 'Railway: 5-15 km'],
                           facilities: [
                             'Library', 'Computer Labs', 'Sports Complex', 'Hostels',
                             'Cafeteria', 'Wi-Fi Campus', 'Laboratories', 'Auditorium'
                           ],
                           admissionProcess: [
                             'Online Application',
                             'Entrance Exam (if applicable)',
                             'Merit List Publication',
                             'Counseling Process',
                             'Document Verification',
                             'Fee Payment & Admission'
                           ]
                         };
                         setSelectedCollege(formattedCollege);
                         setShowDetails(true);
                         setShowStateColleges(false);
                       }}
                       className='bg-white border border-gray-200 rounded-2xl p-4 mb-4 shadow-sm'
                     >
                       <View className='flex-row items-start justify-between mb-3'>
                         <View className='flex-1'>
                           <Text 
                             className='font-bold mb-1'
                             style={{ fontSize: isTablet() ? 18 : 16 }}
                           >
                             {college.name.split(' ').slice(0, 3).join(' ')}
                           </Text>
                           <Text 
                             className='text-gray-600 mb-2'
                             style={{ fontSize: isTablet() ? 14 : 12 }}
                           >
                             {college.name}
                           </Text>
                           <View className='flex-row items-center mb-1'>
                             <Text style={{ fontSize: isTablet() ? 14 : 12 }}>📍</Text>
                             <Text 
                               className='text-gray-600 ml-1'
                               style={{ fontSize: isTablet() ? 14 : 12 }}
                             >
                               {college.location}
                             </Text>
                           </View>
                           <View className='flex-row items-center'>
                             <Text style={{ fontSize: isTablet() ? 14 : 12 }}>🏛️</Text>
                             <Text 
                               className='text-gray-600 ml-1'
                               style={{ fontSize: isTablet() ? 14 : 12 }}
                             >
                               {college.type} • Est. {college.established}
                             </Text>
                           </View>
                         </View>
                         
                         <View className='items-end'>
                           <View className='bg-green-100 px-2 py-1 rounded mb-2'>
                             <Text 
                               className='text-green-700 font-semibold'
                               style={{ fontSize: isTablet() ? 12 : 10 }}
                             >
                               {college.rating}
                             </Text>
                           </View>
                           <Text 
                             className='text-blue-600 font-semibold text-right'
                             style={{ fontSize: isTablet() ? 12 : 10 }}
                           >
                             {college.rank}
                           </Text>
                         </View>
                       </View>
   
                       <View className='flex-row flex-wrap mb-3'>
                         {college.courses.slice(0, 2).map((course, index) => (
                           <View key={index} className='bg-gray-100 rounded-full px-2 py-1 mr-2 mb-1'>
                             <Text 
                               className='text-gray-700'
                               style={{ fontSize: isTablet() ? 10 : 8 }}
                             >
                               {course.name}
                             </Text>
                           </View>
                         ))}
                         {college.courses.length > 2 && (
                           <View className='bg-gray-100 rounded-full px-2 py-1 mr-2 mb-1'>
                             <Text 
                               className='text-gray-700'
                               style={{ fontSize: isTablet() ? 10 : 8 }}
                             >
                               +{college.courses.length - 2} more
                             </Text>
                           </View>
                         )}
                       </View>
                       
                       <View className='flex-row justify-between items-center'>
                         <View className='flex-row space-x-3'>
                           <View className='items-center'>
                             <Text 
                               className='font-semibold text-blue-600'
                               style={{ fontSize: isTablet() ? 14 : 12 }}
                             >
                               ₹8-15 LPA
                             </Text>
                             <Text 
                               className='text-gray-500'
                               style={{ fontSize: isTablet() ? 10 : 8 }}
                             >
                               Avg Package
                             </Text>
                           </View>
                           <View className='items-center'>
                             <Text 
                               className='font-semibold text-green-600'
                               style={{ fontSize: isTablet() ? 14 : 12 }}
                             >
                               85%
                             </Text>
                             <Text 
                               className='text-gray-500'
                               style={{ fontSize: isTablet() ? 10 : 8 }}
                             >
                               Placement
                             </Text>
                           </View>
                         </View>
   
                         <Text 
                           className='text-blue-600 font-semibold'
                           style={{ fontSize: isTablet() ? 14 : 12 }}
                         >
                           View Details →
                         </Text>
                       </View>
                     </TouchableOpacity>
                   ))}
                 </>
               )}
             </View>
           </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
} 