export const class10MockTests = [
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
    name: 'English Mock Test 1',
    duration: '3 hours',
    questions: 30,
    difficulty: 'Medium',
    subject: 'english'
  },
  {
    id: 4,
    name: 'Social Studies Mock Test 1',
    duration: '3 hours',
    questions: 30,
    difficulty: 'Medium',
    subject: 'social'
  },
  {
    id: 5,
    name: 'Full Syllabus Test',
    duration: '3 hours',
    questions: 80,
    difficulty: 'Hard',
    subject: 'all'
  }
];

export const class12MockTests = [
  {
    id: 1,
    name: 'Mathematics Mock Test 1',
    duration: '3 hours',
    questions: 30,
    difficulty: 'Hard',
    subject: 'math'
  },
  {
    id: 2,
    name: 'Physics Mock Test 1',
    duration: '3 hours',
    questions: 30,
    difficulty: 'Hard',
    subject: 'physics'
  },
  {
    id: 3,
    name: 'Chemistry Mock Test 1',
    duration: '3 hours',
    questions: 30,
    difficulty: 'Hard',
    subject: 'chemistry'
  },
  {
    id: 4,
    name: 'Biology Mock Test 1',
    duration: '3 hours',
    questions: 30,
    difficulty: 'Hard',
    subject: 'biology'
  },
  {
    id: 5,
    name: 'English Mock Test 1',
    duration: '3 hours',
    questions: 30,
    difficulty: 'Medium',
    subject: 'english'
  },
  {
    id: 6,
    name: 'Economics Mock Test 1',
    duration: '3 hours',
    questions: 30,
    difficulty: 'Medium',
    subject: 'economics'
  },
  {
    id: 7,
    name: 'PCM Full Test (Physics, Chemistry, Math)',
    duration: '3 hours',
    questions: 90,
    difficulty: 'Hard',
    subject: 'pcm'
  },
  {
    id: 8,
    name: 'PCB Full Test (Physics, Chemistry, Biology)',
    duration: '3 hours',
    questions: 90,
    difficulty: 'Hard',
    subject: 'pcb'
  },
  {
    id: 9,
    name: 'Complete Board Mock Test',
    duration: '6 hours',
    questions: 150,
    difficulty: 'Hard',
    subject: 'all'
  }
];

export const getMockTestsByClass = (studentType) => {
  if (studentType && studentType.includes('12')) {
    return class12MockTests;
  }
  return class10MockTests;
}; 