export const class10Subjects = [
  {
    id: 'math',
    name: 'Mathematics',
    emoji: '📐',
    color: 'bg-blue-50',
    borderColor: 'border-blue-200',
    strength: 0,
    weakTopics: ['Quadratic Equations', 'Coordinate Geometry'],
    strongTopics: ['Linear Equations', 'Statistics']
  },
  {
    id: 'science',
    name: 'Science',
    emoji: '🔬',
    color: 'bg-green-50',
    borderColor: 'border-green-200',
    strength: 0,
    weakTopics: ['Chemical Reactions', 'Light Reflection'],
    strongTopics: ['Life Processes', 'Periodic Classification']
  },
  {
    id: 'english',
    name: 'English',
    emoji: '📚',
    color: 'bg-purple-50',
    borderColor: 'border-purple-200',
    strength: 0,
    weakTopics: ['Grammar', 'Comprehension'],
    strongTopics: ['Literature', 'Writing']
  },
  {
    id: 'social',
    name: 'Social Studies',
    emoji: '🌍',
    color: 'bg-orange-50',
    borderColor: 'border-orange-200',
    strength: 0,
    weakTopics: ['Economics', 'Political Science'],
    strongTopics: ['History', 'Geography']
  }
];

export const class12Subjects = [
  {
    id: 'math',
    name: 'Mathematics',
    emoji: '📐',
    color: 'bg-blue-50',
    borderColor: 'border-blue-200',
    strength: 0,
    weakTopics: ['Calculus', 'Vector Algebra'],
    strongTopics: ['Probability', 'Linear Programming']
  },
  {
    id: 'physics',
    name: 'Physics',
    emoji: '⚛️',
    color: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    strength: 0,
    weakTopics: ['Electromagnetic Induction', 'Wave Optics'],
    strongTopics: ['Mechanics', 'Thermodynamics']
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    emoji: '🧪',
    color: 'bg-green-50',
    borderColor: 'border-green-200',
    strength: 0,
    weakTopics: ['Organic Chemistry', 'Chemical Kinetics'],
    strongTopics: ['Atomic Structure', 'Coordination Compounds']
  },
  {
    id: 'biology',
    name: 'Biology',
    emoji: '🧬',
    color: 'bg-teal-50',
    borderColor: 'border-teal-200',
    strength: 0,
    weakTopics: ['Genetics', 'Evolution'],
    strongTopics: ['Reproduction', 'Human Physiology']
  },
  {
    id: 'english',
    name: 'English',
    emoji: '📚',
    color: 'bg-purple-50',
    borderColor: 'border-purple-200',
    strength: 0,
    weakTopics: ['Advanced Grammar', 'Poetry Analysis'],
    strongTopics: ['Prose', 'Writing Skills']
  },
  {
    id: 'economics',
    name: 'Economics',
    emoji: '💰',
    color: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    strength: 0,
    weakTopics: ['Macroeconomics', 'Statistics'],
    strongTopics: ['Microeconomics', 'Indian Economy']
  }
];

export const getSubjectsByClass = (studentType) => {
  // Extract class number from studentType (e.g., "Class 10", "Class 12")
  if (studentType && studentType.includes('12')) {
    return class12Subjects;
  }
  return class10Subjects; // Default to class 10
}; 