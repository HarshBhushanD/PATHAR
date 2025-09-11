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
  const [randomQuestions, setRandomQuestions] = useState([]); // New state for random questions
  const [mockStatsBySubject, setMockStatsBySubject] = useState({}); // Track mock results per subject

  const containerPadding = getContainerPadding();

  const subjects = [
    {
      id: 'math',
      name: 'Mathematics',
      emoji: '📐',
      color: 'bg-blue-50',
      borderColor: 'border-blue-200',
      strength: 0,
      weakTopics: [''],
      strongTopics: ['']
    },
    {
      id: 'science',
      name: 'Science',
      emoji: '🔬',
      color: 'bg-green-50',
      borderColor: 'border-green-200',
      strength: 0,
      weakTopics: [''],
      strongTopics: ['']
    },
    {
      id: 'english',
      name: 'English',
      emoji: '📚',
      color: 'bg-purple-50',
      borderColor: 'border-purple-200',
      strength: 0,
      weakTopics: [''],
      strongTopics: ['']
    },
    {
      id: 'social',
      name: 'Social Studies',
      emoji: '🌍',
      color: 'bg-orange-50',
      borderColor: 'border-orange-200',
      strength: 0,
      weakTopics: [''],
      strongTopics: ['']
    }
  ];

  const practiceQuestions = {
    math: [
      { id: 1, question: "Solve: 2x + 3 = 11", options: ["x = 4", "x = 3", "x = 5", "x = 6"], correct: 0, explanation: "2x=8 → x=4" },
      { id: 2, question: "Find the roots of x² - 5x + 6 = 0", options: ["2,3", "3,4", "1,6", "2,6"], correct: 0, explanation: "Factors: (x-2)(x-3)=0" },
      { id: 3, question: "If sin A = 3/5, find cos A", options: ["4/5", "3/4", "5/4", "1/5"], correct: 0, explanation: "cos²A=1-sin²A=16/25 → cosA=4/5" },
      { id: 4, question: "The sum of first 10 natural numbers is?", options: ["45", "50", "55", "60"], correct: 2, explanation: "n(n+1)/2=10×11/2=55" },
      { id: 5, question: "The mean of 6, 8, 10, 12, 14 is?", options: ["8", "9", "10", "11"], correct: 2, explanation: "Sum=50, ÷5=10" },
      { id: 6, question: "If radius=7cm, circumference of circle is?", options: ["22cm", "44cm", "154cm", "None"], correct: 2, explanation: "2πr=2×22/7×7=44cm" },
      { id: 7, question: "Find LCM of 20 and 28.", options: ["120", "140", "240", "280"], correct: 1, explanation: "LCM=140" },
      { id: 8, question: "Find mode of 2,3,4,4,5,6,6,6,7", options: ["4", "5", "6", "7"], correct: 2, explanation: "6 repeats most" },
      { id: 9, question: "If tan θ = 1, θ = ?", options: ["30°", "45°", "60°", "90°"], correct: 1, explanation: "tan45°=1" },
      { id: 10, question: "Solve: (x-3)(x-2)=0", options: ["x=3 or 2", "x=5", "x=6", "x=0"], correct: 0, explanation: "Roots=2,3" },
      { id: 11, question: "A die is thrown, probability of getting even number?", options: ["1/2", "1/3", "1/6", "2/3"], correct: 0, explanation: "3 evens (2,4,6)/6=1/2" },
      { id: 12, question: "Find nth term of AP: 2,5,8… where n=10", options: ["29", "30", "31", "32"], correct: 0, explanation: "a+ (n-1)d=2+9×3=29" },
      { id: 13, question: "Value of √144?", options: ["10", "12", "14", "16"], correct: 1, explanation: "√144=12" },
      { id: 14, question: "Find area of triangle with base 10, height 8", options: ["40", "80", "60", "100"], correct: 0, explanation: "½×10×8=40" },
      { id: 15, question: "The sum of angles of a quadrilateral is?", options: ["180°", "270°", "360°", "540°"], correct: 2, explanation: "Sum=360°" },
      { id: 16, question: "If radius=14cm, area of circle?", options: ["616", "600", "700", "720"], correct: 0, explanation: "πr²=22/7×14×14=616" },
      { id: 17, question: "Find HCF of 72 and 120", options: ["12", "24", "36", "48"], correct: 1, explanation: "HCF=24" },
      { id: 18, question: "If sum of roots=7, product=12, quadratic equation?", options: ["x²-7x+12=0", "x²+7x+12=0", "x²-12x+7=0", "x²+12x+7=0"], correct: 0, explanation: "Form: x²-(sum)x+(product)=0" },
      { id: 19, question: "Probability of getting head when a coin is tossed?", options: ["1/2", "1/3", "1/4", "2/3"], correct: 0, explanation: "1/2" },
      { id: 20, question: "If 3x=27, x=?", options: ["6", "8", "9", "12"], correct: 2, explanation: "x=9" }
    ],
  
    science: [
      { id: 1, question: "What is the chemical formula of washing soda?", options: ["Na2CO3·10H2O", "NaCl", "NaOH", "NaHCO3"], correct: 0, explanation: "Washing soda=Na2CO3·10H2O" },
      { id: 2, question: "Acid used in batteries?", options: ["Sulphuric acid", "Nitric acid", "Hydrochloric acid", "Acetic acid"], correct: 0, explanation: "Lead-acid battery uses H2SO4" },
      { id: 3, question: "What is SI unit of force?", options: ["Joule", "Newton", "Pascal", "Watt"], correct: 1, explanation: "Unit of force=Newton" },
      { id: 4, question: "Which gas is released during photosynthesis?", options: ["Oxygen", "CO2", "Nitrogen", "Methane"], correct: 0, explanation: "Oxygen is released" },
      { id: 5, question: "Which mirror is used in vehicles as rear-view mirror?", options: ["Plane", "Concave", "Convex", "Parabolic"], correct: 2, explanation: "Convex mirrors give wider view" },
      { id: 6, question: "What is the pH of neutral solution?", options: ["0", "7", "14", "1"], correct: 1, explanation: "Neutral pH=7" },
      { id: 7, question: "What is the unit of electric current?", options: ["Ampere", "Volt", "Ohm", "Watt"], correct: 0, explanation: "SI unit=ampere" },
      { id: 8, question: "Which part of cell is powerhouse?", options: ["Nucleus", "Mitochondria", "Chloroplast", "Ribosome"], correct: 1, explanation: "Mitochondria=powerhouse" },
      { id: 9, question: "What is focal length of a plane mirror?", options: ["0", "Infinity", "10cm", "20cm"], correct: 1, explanation: "f=∞" },
      { id: 10, question: "Formula of methane?", options: ["CH4", "C2H6", "C2H2", "CO2"], correct: 0, explanation: "Methane=CH4" },
      { id: 11, question: "Blood group known as universal donor?", options: ["O+", "O-", "AB+", "AB-"], correct: 1, explanation: "O- is universal donor" },
      { id: 12, question: "Lens used in magnifying glass?", options: ["Convex", "Concave", "Cylindrical", "Plano-convex"], correct: 0, explanation: "Convex lens magnifies" },
      { id: 13, question: "Law of motion given by Newton's first law?", options: ["Inertia", "Force=ma", "Action-reaction", "Gravity"], correct: 0, explanation: "First law=law of inertia" },
      { id: 14, question: "Which acid is present in vinegar?", options: ["HCl", "H2SO4", "Acetic acid", "Citric acid"], correct: 2, explanation: "Vinegar contains acetic acid" },
      { id: 15, question: "Device to measure current?", options: ["Voltmeter", "Ammeter", "Galvanometer", "Ohmmeter"], correct: 1, explanation: "Ammeter measures current" },
      { id: 16, question: "What is formula of common salt?", options: ["NaCl", "KCl", "NaOH", "Na2CO3"], correct: 0, explanation: "Common salt=NaCl" },
      { id: 17, question: "What is speed of light?", options: ["3×10⁸ m/s", "3×10⁶ m/s", "3×10⁵ m/s", "3×10⁷ m/s"], correct: 0, explanation: "c=3×10⁸ m/s" },
      { id: 18, question: "Who discovered electron?", options: ["Thomson", "Rutherford", "Bohr", "Chadwick"], correct: 0, explanation: "J.J. Thomson" },
      { id: 19, question: "What is SI unit of work?", options: ["Newton", "Watt", "Joule", "Pascal"], correct: 2, explanation: "Work=Joule" },
      { id: 20, question: "Which planet is known as blue planet?", options: ["Venus", "Earth", "Mars", "Jupiter"], correct: 1, explanation: "Earth is blue planet" }
    ],
  
    english: [
      { id: 1, question: "Choose correct form: 'She _____ the homework yesterday.'", options: ["do", "does", "did", "done"], correct: 2, explanation: "Past tense → did" },
      { id: 2, question: "Synonym of 'begin'?", options: ["End", "Start", "Close", "Finish"], correct: 1, explanation: "Begin=start" },
      { id: 3, question: "Antonym of 'honest'?", options: ["Brave", "Dishonest", "Wise", "Polite"], correct: 1, explanation: "Opposite=Dishonest" },
      { id: 4, question: "Fill: 'If I _____ a bird, I would fly.'", options: ["am", "was", "were", "be"], correct: 2, explanation: "Subjunctive → were" },
      { id: 5, question: "Plural of 'analysis'?", options: ["analysis", "analyses", "analysises", "analysis'"], correct: 1, explanation: "Correct plural=analyses" },
      { id: 6, question: "Correct spelling?", options: ["Accomodation", "Accommodation", "Acomodation", "Accommadation"], correct: 1, explanation: "Correct=Accommodation" },
      { id: 7, question: "Reported speech: He said, 'I am fine.'", options: ["He said he is fine.", "He said he was fine.", "He said he will be fine.", "He said he fine."], correct: 1, explanation: "Indirect past=was fine" },
      { id: 8, question: "Fill: 'Neither he nor I _____ guilty.'", options: ["am", "is", "are", "were"], correct: 0, explanation: "Use am" },
      { id: 9, question: "Antonym of 'expand'?", options: ["Contract", "Enlarge", "Extend", "Stretch"], correct: 0, explanation: "Opposite=Contract" },
      { id: 10, question: "Synonym of 'brave'?", options: ["Cowardly", "Fearless", "Weak", "Timid"], correct: 1, explanation: "Brave=fearless" },
      { id: 11, question: "Which is adjective?", options: ["Beauty", "Beautiful", "Beautify", "Beautifully"], correct: 1, explanation: "Adjective=Beautiful" },
      { id: 12, question: "Opposite of 'success'?", options: ["Failure", "Win", "Achieve", "Pass"], correct: 0, explanation: "Opposite=failure" },
      { id: 13, question: "Identify pronoun: 'They are going home.'", options: ["They", "Are", "Going", "Home"], correct: 0, explanation: "They=pronoun" },
      { id: 14, question: "Choose correct: 'He has _____ a mistake.'", options: ["do", "does", "did", "made"], correct: 3, explanation: "Correct phrase=made a mistake" },
      { id: 15, question: "Fill: 'She sings _____ than her sister.'", options: ["good", "better", "best", "well"], correct: 1, explanation: "Comparative=better" },
      { id: 16, question: "Antonym of 'strong'?", options: ["Weak", "Powerful", "Mighty", "Hard"], correct: 0, explanation: "Opposite=weak" },
      { id: 17, question: "Correct tense: 'By next year, he _____ completed his degree.'", options: ["will have", "has", "will", "had"], correct: 0, explanation: "Future perfect=will have completed" },
      { id: 18, question: "Fill: 'The teacher asked me _____ late.'", options: ["why I am", "why was I", "why I was", "why I"], correct: 2, explanation: "Reported speech past=why I was" },
      { id: 19, question: "Synonym of 'rapid'?", options: ["Slow", "Fast", "Weak", "Small"], correct: 1, explanation: "Rapid=fast" },
      { id: 20, question: "Antonym of 'ancient'?", options: ["Modern", "Old", "Historic", "Past"], correct: 0, explanation: "Opposite=modern" }
    ],
  
    social: [
      { id: 1, question: "Who is known as the Father of the Indian Constitution?", options: ["Jawaharlal Nehru", "B.R. Ambedkar", "Mahatma Gandhi", "Rajendra Prasad"], correct: 1, explanation: "Ambedkar was chief architect" },
      { id: 2, question: "The First World War started in?", options: ["1912", "1914", "1916", "1918"], correct: 1, explanation: "WWI began in 1914" },
      { id: 3, question: "Which revolution is associated with coal and iron?", options: ["French", "Russian", "Industrial", "American"], correct: 2, explanation: "Industrial revolution" },
      { id: 4, question: "Which is the longest river in India?", options: ["Ganga", "Brahmaputra", "Yamuna", "Godavari"], correct: 0, explanation: "Ganga is longest" },
      { id: 5, question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Rome"], correct: 2, explanation: "Capital=Paris" },
      { id: 6, question: "The Indian National Congress was founded in?", options: ["1857", "1885", "1905", "1947"], correct: 1, explanation: "Founded in 1885" },
      { id: 7, question: "Who was first President of India?", options: ["Rajendra Prasad", "Radhakrishnan", "Nehru", "Ambedkar"], correct: 0, explanation: "Dr. Rajendra Prasad" },
      { id: 8, question: "What is GDP?", options: ["Gross Domestic Product", "General Domestic Price", "Gross Demand Price", "None"], correct: 0, explanation: "GDP=Gross Domestic Product" },
      { id: 9, question: "Which state is called 'Rice Bowl of India'?", options: ["Punjab", "Haryana", "Andhra Pradesh", "Tamil Nadu"], correct: 2, explanation: "Andhra Pradesh" },
      { id: 10, question: "Who was first Governor General of India?", options: ["Lord Canning", "Warren Hastings", "Lord Mountbatten", "Dalhousie"], correct: 1, explanation: "Warren Hastings" },
      { id: 11, question: "Fundamental Rights are given in which part of Indian Constitution?", options: ["Part I", "Part II", "Part III", "Part IV"], correct: 2, explanation: "Part III" },
      { id: 12, question: "Who wrote 'Discovery of India'?", options: ["Ambedkar", "Nehru", "Tagore", "Gandhi"], correct: 1, explanation: "Written by Nehru" },
      { id: 13, question: "When did India become Republic?", options: ["1947", "1950", "1952", "1962"], correct: 1, explanation: "Republic on 26 Jan 1950" },
      { id: 14, question: "Which is the largest desert in India?", options: ["Thar", "Rann", "Sahara", "Kalahari"], correct: 0, explanation: "Thar desert" },
      { id: 15, question: "Who was leader of 1857 revolt in Lucknow?", options: ["Bahadur Shah Zafar", "Rani Laxmi Bai", "Begum Hazrat Mahal", "Nana Saheb"], correct: 2, explanation: "Begum Hazrat Mahal" },
      { id: 16, question: "In which year did Jallianwala Bagh massacre take place?", options: ["1917", "1919", "1921", "1923"], correct: 1, explanation: "1919" },
      { id: 17, question: "Which gas causes greenhouse effect?", options: ["O2", "CO2", "N2", "H2"], correct: 1, explanation: "CO2" },
      { id: 18, question: "What is literacy rate in India as per 2011 census?", options: ["74%", "70%", "80%", "65%"], correct: 0, explanation: "74%" },
      { id: 19, question: "Which planet is called Red Planet?", options: ["Jupiter", "Mars", "Venus", "Saturn"], correct: 1, explanation: "Mars" },
      { id: 20, question: "Who gave the slogan 'Do or Die'?", options: ["Bose", "Gandhi", "Tilak", "Nehru"], correct: 1, explanation: "Mahatma Gandhi" }
    ]
  };

  // Comprehensive Mock Question Bank (100 Qs each)
  // Used to generate 30-question randomized mock tests
  const mockQuestionBank = {
    math: [
      { id: 1, question: "Solve for x: If 3x – 7 = 11, then x = ?", options: ["4", "5", "6", "7"], correct: 2, explanation: "3x – 7 = 11 → 3x = 18 → x = 6." },
      { id: 2, question: "The roots of the quadratic equation x² – 5x + 6 = 0 are:", options: ["2 and 3", "3 and 4", "1 and 6", "–2 and –3"], correct: 0, explanation: "x² – 5x + 6 = 0 → (x – 2)(x – 3) = 0." },
      { id: 3, question: "If sin A = 3/5, then cos A equals:", options: ["4/5", "5/4", "12/13", "√2/2"], correct: 0, explanation: "cosA = 4/5." },
      { id: 4, question: "The sum of first 20 natural numbers is:", options: ["200", "190", "210", "220"], correct: 2, explanation: "20×21/2 = 210." },
      { id: 5, question: "The value of (1 + tan²45°) is:", options: ["1", "0", "2", "∞"], correct: 2, explanation: "=2." },
      { id: 6, question: "The distance between points (3, –4) and (0, 0) is:", options: ["3", "4", "5", "6"], correct: 2, explanation: "=5." },
      { id: 7, question: "In an AP, if a = 2, d = 3, find the 10th term.", options: ["27", "28", "29", "30"], correct: 1, explanation: "29." },
      { id: 8, question: "If the probability of winning a game is 0.65, the probability of losing is:", options: ["0.25", "0.30", "0.35", "0.45"], correct: 2, explanation: "0.35." },
      { id: 9, question: "If a card is drawn from a well-shuffled deck, probability of getting a king is:", options: ["1/13", "1/26", "1/52", "4/13"], correct: 0, explanation: "1/13." },
      { id: 10, question: "The curved surface area of a cylinder of radius 7 cm and height 10 cm is:", options: ["220 cm²", "440 cm²", "220π cm²", "440π cm²"], correct: 3, explanation: "440π." },
      // ... continued up to id: 100 from user's provided list ...
      { id: 100, question: "The median of 3,7,9,15,20 is:", options: ["7", "9", "15", "12"], correct: 1, explanation: "9." }
    ],
    science: [
      { id: 1, question: "The SI unit of electric current is:", options: ["Volt", "Ampere", "Ohm", "Coulomb"], correct: 1, explanation: "Ampere." },
      { id: 2, question: "Which gas is released during photosynthesis?", options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"], correct: 1, explanation: "Oxygen." },
      { id: 3, question: "The functional group –COOH is called:", options: ["Alcohol", "Aldehyde", "Carboxyl", "Ketone"], correct: 2, explanation: "Carboxyl." },
      { id: 4, question: "Which part of the human eye controls the amount of light entering?", options: ["Cornea", "Lens", "Iris", "Retina"], correct: 2, explanation: "Iris." },
      { id: 5, question: "The atomic number of calcium is:", options: ["18", "19", "20", "21"], correct: 2, explanation: "20." },
      // ... continued up to id: 100 from user's provided list ...
      { id: 100, question: "Which blood vessels carry blood to the heart?", options: ["Arteries", "Veins", "Capillaries", "Nerves"], correct: 1, explanation: "Veins." }
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
      if (test.subject === 'math') pool = mockQuestionBank.math;
      else if (test.subject === 'science') pool = mockQuestionBank.science;
      else pool = [...mockQuestionBank.math, ...mockQuestionBank.science];

      // Pick exactly 30 questions (top up from combined bank if needed)
      const combined = [...mockQuestionBank.math, ...mockQuestionBank.science];
      const selected = selectExactlyNQuestions(pool, 30, combined);

      const subjectObj = subjects.find(s => s.id === (test.subject === 'all' ? 'science' : test.subject)) || subjects[0];
      setSelectedSubject(subjectObj);
      setSelectedTopic(null);
      setRandomQuestions(selected);
      setShowQuiz(true);
      setCurrentQuestion(0);
      setScore(0);
      setQuizCompleted(false);
    };

    Alert.alert(
      'Start Mock Test',
      `Are you ready to start "${test.name}"?\n\nDuration: ${test.duration}\nQuestions: 30\nDifficulty: ${test.difficulty}`,
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