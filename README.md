# PATHAR - Career Guidance Mobile App

<div align="center">
  <img src="./assets/icon.png" alt="PATHAR Logo" width="120" height="120" />
  
  <h3>🎯 Empowering Students with Intelligent Career Guidance</h3>
  
  [![Expo SDK](https://img.shields.io/badge/Expo%20SDK-53.0.11-blue.svg)](https://expo.dev)
  [![React Native](https://img.shields.io/badge/React%20Native-0.60%2B-green.svg)](https://reactnative.dev)
  [![Firebase](https://img.shields.io/badge/Firebase-12.2.1-orange.svg)](https://firebase.google.com)
  [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
</div>

## 📱 About PATHAR

PATHAR is a comprehensive career guidance mobile application designed to help students navigate their educational and career paths. Whether you're in 10th grade, 12th grade, or college, PATHAR provides personalized recommendations, college information, aptitude assessments, and intelligent mentoring to guide your career decisions.

### 🌟 Key Features

- **📚 Multi-Level Support**: Tailored experiences for Class 10, Class 12, and College students
- **🎯 Aptitude Assessment**: Comprehensive aptitude tests with personalized recommendations
- **🏫 College Navigator**: Detailed information about colleges with filters, ratings, and placement stats
- **🤖 Smart Mentor**: AI-powered career guidance and personalized recommendations
- **📊 Analytics Dashboard**: Track your academic progress and performance
- **👥 Peer Network**: Connect with peers and share experiences
- **🗺️ Career Mapping**: Visualize career paths and progression opportunities
- **📅 Timeline Tracker**: Plan and track your academic milestones
- **🎨 Stream Discovery**: Explore different academic streams and career options
- **📖 Board Mastery**: Exam preparation and study materials
- **🏗️ Study Architect**: Personalized study plans and schedules

## 🚀 Getting Started

### Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio) (for Android development)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development - macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/pathar-career-guidance.git
   cd pathar-career-guidance
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Firebase Setup**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Firestore Database
   - Download the configuration file and update `firebase.js`
   - Enable Authentication providers (Email/Password, Google, etc.)

4. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

5. **Run on device/emulator**
   ```bash
   # For Android
   npm run android
   
   # For iOS
   npm run ios
   
   # For Web
   npm run web
   ```

## 🏗️ Project Structure

```
PATHAR/
├── 📱 App.js                    # Main app component with navigation logic
├── 🔧 app.json                 # Expo configuration
├── 📦 package.json             # Dependencies and scripts
├── 🎨 global.css               # Global styles with NativeWind
├── 🔑 firebase.js              # Firebase configuration
├── 📂 assets/                  # Images and icons
│   ├── icon.png
│   ├── splash-icon.png
│   └── ...
├── 📂 components/              # Reusable UI components
│   ├── BottomNavigation.js
│   └── DatabaseExample.js
├── 📂 screens/                 # App screens
│   ├── 🎓 class_10.js         # Class 10 dashboard
│   ├── 🎓 class_12.js         # Class 12 dashboard
│   ├── 🏫 colleges.js         # College information browser
│   ├── 👤 Profile.js          # User profile management
│   ├── 🧠 aptitude.js         # Aptitude tests
│   ├── 🤖 SmartMentor.js      # AI-powered mentoring
│   └── ...
├── 📂 contexts/               # React Context providers
│   └── AuthContext.js         # Authentication state management
├── 📂 data/                   # Static data files
│   └── collegeData.js         # College database
├── 📂 services/               # External services
│   ├── firestore.js           # Firestore database operations
│   └── puterAI.js            # AI service integration
├── 📂 hooks/                  # Custom React hooks
│   └── useResponsive.js       # Responsive design utilities
└── 📂 utils/                  # Utility functions
    └── responsive.js          # Responsive helper functions
```

## 🎯 Features Overview

### 🎓 Student-Specific Dashboards

#### Class 10 Students
- Stream selection guidance
- Board exam preparation
- Career exploration tools
- Aptitude assessments for stream selection

#### Class 12 Students
- College recommendation engine
- Entrance exam guidance
- Career path visualization
- Advanced aptitude testing

#### College Students
- Industry insights and trends
- Skill development recommendations
- Internship and job opportunities
- Professional networking

### 🏫 College Navigator

The College Navigator provides comprehensive information about educational institutions:

- **🔍 Advanced Search & Filters**: Search by name, location, type, and category
- **🏛️ Institution Types**: Government, Private, Engineering, Medical, Commerce, Arts
- **📊 Detailed Information**: 
  - Course offerings with fees and eligibility
  - Cutoff marks for different categories
  - Placement statistics and top recruiters
  - Campus facilities and infrastructure
  - Admission process and timeline
- **🗺️ State-wise Browsing**: Explore colleges by state with regional data
- **📱 Responsive Design**: Optimized for both phones and tablets

### 🤖 Smart Mentor

AI-powered personalized guidance system:
- Career recommendations based on interests and aptitude
- Study plan generation
- Progress tracking and feedback
- Industry insights and trends

## 🔧 Technical Stack

- **Frontend**: React Native with Expo
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: React Navigation v6
- **State Management**: React Context API
- **Backend**: Firebase (Authentication, Firestore)
- **Data Storage**: AsyncStorage for local data
- **Responsive Design**: Custom responsive utilities
- **Development Tools**: Metro bundler, Expo CLI

## 🎨 Design System

The app uses a modern, responsive design system:

- **Color Scheme**: Blue primary colors with semantic color coding
- **Typography**: Responsive font sizes that adapt to device size
- **Layout**: Flexible layouts that work on phones and tablets
- **Components**: Modular, reusable UI components
- **Icons**: Emoji-based icons for better visual appeal

## 📱 Device Support

- **iOS**: iPhone and iPad with landscape/portrait support
- **Android**: Phones and tablets with adaptive layouts
- **Web**: Progressive Web App support
- **Responsive**: Automatic adaptation to different screen sizes

## 🔐 Authentication & Security

- Firebase Authentication with multiple providers
- Secure user data storage
- Role-based access control
- Data privacy compliance

## 📊 Data Management

- **Local Storage**: AsyncStorage for offline capabilities
- **Cloud Storage**: Firestore for user data synchronization
- **Static Data**: Comprehensive college and career databases
- **Real-time Updates**: Live data synchronization

## 🚀 Deployment

### Development Build
```bash
expo build:android
expo build:ios
```

### Production Deployment
```bash
expo publish
```

### App Store Deployment
1. Configure app signing
2. Build production app
3. Submit to respective app stores

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow React Native best practices
- Use TypeScript for new features (migration in progress)
- Maintain responsive design principles
- Write unit tests for new components
- Update documentation for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/your-username)

## 🙏 Acknowledgments

- Firebase for backend services
- Expo team for the amazing development platform
- React Native community for continuous support
- Contributors and beta testers

## 📞 Support

For support, email support@pathar.app or join our community discussions.

## 🗺️ Roadmap

- [ ] TypeScript migration
- [ ] Advanced AI recommendations
- [ ] Real-time chat with mentors
- [ ] Scholarship finder
- [ ] Interview preparation module
- [ ] Parent dashboard
- [ ] Offline mode enhancement
- [ ] Multi-language support

---

<div align="center">
  <p>Made with ❤️ for students by Azman & Harsh Bhushan</p>
  <p>
    <a href="https://github.com/your-username/pathar-career-guidance">⭐ Star this repo if it helped you!</a>
  </p>
</div>


