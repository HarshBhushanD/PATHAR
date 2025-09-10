# Firestore Database Structure

## Collections Overview

### 1. `users` Collection
Stores user profile information and preferences.

**Document ID**: User's Firebase Auth UID

**Fields**:
```javascript
{
  displayName: string,
  email: string,
  profileComplete: boolean,
  careerPreferences: {
    interests: array,
    subjects: array,
    preferredLocations: array
  },
  class: string, // "10" or "12"
  stream: string, // "Science", "Commerce", "Arts"
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### 2. `aptitudeResults` Collection
Stores results from aptitude tests taken by users.

**Fields**:
```javascript
{
  userId: string, // Reference to user
  testType: string,
  score: number,
  results: {
    personality: string,
    strengths: array,
    recommendations: array
  },
  createdAt: timestamp
}
```

### 3. `favorites` Collection
Stores user's favorite colleges and courses.

**Fields**:
```javascript
{
  userId: string, // Reference to user
  collegeId: string,
  collegeData: {
    name: string,
    location: string,
    type: string,
    courses: array
  },
  createdAt: timestamp
}
```

### 4. `userActivities` Collection
Tracks user interactions for analytics.

**Fields**:
```javascript
{
  userId: string,
  activity: {
    type: string, // "view", "search", "favorite", "test"
    page: string,
    data: object
  },
  timestamp: timestamp
}
```

### 5. `searchHistory` Collection
Stores user search queries for personalization.

**Fields**:
```javascript
{
  userId: string,
  query: string,
  type: string, // "college", "course", "career"
  timestamp: timestamp
}
```

## Security Rules

The following Firestore security rules should be set up in the Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can only read/write their own aptitude results
    match /aptitudeResults/{documentId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Users can only read/write their own favorites
    match /favorites/{documentId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Users can only read/write their own activities
    match /userActivities/{documentId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Users can only read/write their own search history
    match /searchHistory/{documentId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Usage Examples

### Creating a User Profile
```javascript
import { createUserProfile } from '../services/firestore';

const userData = {
  displayName: "John Doe",
  email: "john@example.com",
  class: "12",
  stream: "Science"
};

await createUserProfile(userId, userData);
```

### Saving Aptitude Results
```javascript
import { saveAptitudeResults } from '../services/firestore';

const testResults = {
  testType: "career-interest",
  score: 85,
  results: {
    personality: "Investigative",
    strengths: ["Analytical", "Problem-solving"],
    recommendations: ["Engineering", "Medicine", "Research"]
  }
};

await saveAptitudeResults(userId, testResults);
```

### Adding to Favorites
```javascript
import { addToFavorites } from '../services/firestore';

const collegeData = {
  name: "NIT Srinagar",
  location: "Srinagar, J&K",
  type: "Government",
  courses: ["Computer Science", "Electrical", "Mechanical"]
};

await addToFavorites(userId, "nit-srinagar", collegeData);
``` 