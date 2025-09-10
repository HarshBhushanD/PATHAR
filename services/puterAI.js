// Puter AI Service for generating aptitude test questions
// This service handles the integration with Puter.js AI capabilities

/**
 * Generate aptitude test questions using Puter AI
 * @param {string} studentType - Type of student (e.g., '12th', '10th', 'college')
 * @param {number} questionCount - Number of questions to generate (default: 10)
 * @returns {Promise<Array>} Array of generated questions
 */
export const generateAptitudeQuestions = async (studentType = '12th', questionCount = 10) => {
  try {
    // Check if Puter is available (web environment)
    if (typeof window === 'undefined' || !window.puter) {
      console.log('Puter AI not available, using fallback questions');
      return null;
    }

    const categoryMap = {
      '12th': {
        categories: ['Engineering', 'Medical', 'Commerce', 'Arts'],
        description: 'Class 12th students choosing college streams',
        context: `
        - Post-12th career choices and college entrance exam preferences
        - Subject interests at 12th grade level (PCM, PCB, Commerce, Humanities)
        - Future career aspirations in Engineering, Medical, Commerce, or Arts
        - Learning styles and work environment preferences
        - Entrance exam preparation interests (JEE, NEET, CA, etc.)
        `
      },
      '10th': {
        categories: ['Science', 'Commerce', 'Arts', 'Vocational'],
        description: 'Class 10th students choosing 11th-12th streams',
        context: `
        - Subject preferences and academic interests
        - Career exploration and future planning
        - Learning styles and skill development
        - Interest in practical vs theoretical subjects
        - Extracurricular activities and hobbies
        `
      },
      'college': {
        categories: ['Technical', 'Management', 'Research', 'Creative'],
        description: 'College students exploring specializations',
        context: `
        - Academic specialization choices
        - Career development and industry preferences
        - Skill enhancement and professional growth
        - Higher education and research interests
        - Industry trends and job market alignment
        `
      }
    };

    const config = categoryMap[studentType] || categoryMap['12th'];
    
    const prompt = `Generate exactly ${questionCount} aptitude test questions for ${config.description}. Each question should help determine their best fit among these categories: ${config.categories.join(', ')}.

Context for questions:${config.context}

IMPORTANT: Return ONLY a valid JSON array with this exact structure:
[
  {
    "id": 1,
    "question": "Question text ending with a question mark?",
    "options": [
      { "text": "Option 1 text", "category": "${config.categories[0]}" },
      { "text": "Option 2 text", "category": "${config.categories[1]}" },
      { "text": "Option 3 text", "category": "${config.categories[2]}" },
      { "text": "Option 4 text", "category": "${config.categories[3]}" }
    ]
  }
]

Requirements:
- Exactly ${questionCount} questions
- Each question must have exactly 4 options
- Each option must belong to one of the 4 categories
- Questions should be relevant to Indian education system
- Use clear, engaging language appropriate for the age group
- Focus on practical scenarios and real-world applications
- Avoid gender bias and cultural stereotypes

Return only the JSON array, no additional text or formatting.`;

    console.log('Calling Puter AI for question generation...');
    
    const response = await window.puter.ai.chat(prompt, false, {
      model: 'gpt-4',
      temperature: 0.7,
      max_tokens: 4000
    });

    if (response && response.message) {
      try {
        // Clean the response and extract JSON
        let jsonText = response.message.trim();
        
        // Remove any markdown formatting
        jsonText = jsonText.replace(/```json\s*/, '').replace(/```\s*$/, '');
        
        // Find JSON array
        const jsonMatch = jsonText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const generatedQuestions = JSON.parse(jsonMatch[0]);
          
          // Validate the structure
          if (Array.isArray(generatedQuestions) && generatedQuestions.length === questionCount) {
            const isValid = generatedQuestions.every(q => 
              q.id && 
              q.question && 
              Array.isArray(q.options) && 
              q.options.length === 4 &&
              q.options.every(opt => opt.text && opt.category && config.categories.includes(opt.category))
            );
            
            if (isValid) {
              console.log(`Successfully generated ${questionCount} questions with Puter AI`);
              return generatedQuestions;
            } else {
              console.log('Generated questions failed validation');
            }
          } else {
            console.log(`Expected ${questionCount} questions, got ${generatedQuestions?.length || 0}`);
          }
        } else {
          console.log('Could not extract JSON from response');
        }
      } catch (parseError) {
        console.log('Error parsing AI response:', parseError);
      }
    } else {
      console.log('No valid response from Puter AI');
    }

    return null;
  } catch (error) {
    console.error('Error calling Puter AI:', error);
    return null;
  }
};

/**
 * Get default fallback questions for when AI generation fails
 * @param {string} studentType - Type of student
 * @returns {Array} Array of default questions
 */
export const getDefaultQuestions = (studentType = '12th') => {
  const defaultQuestions = {
    '12th': [
      {
        id: 1,
        question: "After completing 12th grade, what type of career path interests you most?",
        options: [
          { text: "Engineering and Technology", category: "Engineering" },
          { text: "Medical and Healthcare", category: "Medical" },
          { text: "Business and Management", category: "Commerce" },
          { text: "Arts and Creative Fields", category: "Arts" }
        ]
      },
      {
        id: 2,
        question: "Which subjects did you enjoy most in your 12th grade studies?",
        options: [
          { text: "Mathematics and Physics", category: "Engineering" },
          { text: "Biology and Chemistry", category: "Medical" },
          { text: "Economics and Business Studies", category: "Commerce" },
          { text: "Literature and Social Sciences", category: "Arts" }
        ]
      },
      {
        id: 3,
        question: "What kind of work environment appeals to you after graduation?",
        options: [
          { text: "Tech companies and innovation labs", category: "Engineering" },
          { text: "Hospitals and research facilities", category: "Medical" },
          { text: "Corporate offices and startups", category: "Commerce" },
          { text: "Creative studios and cultural institutions", category: "Arts" }
        ]
      },
      {
        id: 4,
        question: "Which entrance exam are you most interested in preparing for?",
        options: [
          { text: "JEE Main/Advanced for Engineering", category: "Engineering" },
          { text: "NEET for Medical courses", category: "Medical" },
          { text: "CAT/MAT for Management studies", category: "Commerce" },
          { text: "DUET/BHU for Humanities", category: "Arts" }
        ]
      },
      {
        id: 5,
        question: "What motivates you most about higher education?",
        options: [
          { text: "Solving complex technical problems", category: "Engineering" },
          { text: "Helping people and society", category: "Medical" },
          { text: "Building successful businesses", category: "Commerce" },
          { text: "Expressing creativity and ideas", category: "Arts" }
        ]
      },
      {
        id: 6,
        question: "Which type of college degree program interests you?",
        options: [
          { text: "B.Tech/B.E. in Engineering", category: "Engineering" },
          { text: "MBBS/BDS/BAMS in Medical", category: "Medical" },
          { text: "BBA/B.Com/Economics", category: "Commerce" },
          { text: "BA/B.Fine Arts/Mass Communication", category: "Arts" }
        ]
      },
      {
        id: 7,
        question: "What kind of skills do you want to develop in college?",
        options: [
          { text: "Programming and technical skills", category: "Engineering" },
          { text: "Medical diagnosis and treatment", category: "Medical" },
          { text: "Leadership and business strategy", category: "Commerce" },
          { text: "Creative and communication skills", category: "Arts" }
        ]
      },
      {
        id: 8,
        question: "Which career outcome excites you most?",
        options: [
          { text: "Creating innovative technology solutions", category: "Engineering" },
          { text: "Saving lives and improving health", category: "Medical" },
          { text: "Leading teams and growing businesses", category: "Commerce" },
          { text: "Influencing culture and society", category: "Arts" }
        ]
      },
      {
        id: 9,
        question: "What type of further studies interest you after graduation?",
        options: [
          { text: "M.Tech/MS in specialized engineering", category: "Engineering" },
          { text: "MD/MS in medical specialization", category: "Medical" },
          { text: "MBA or business specialization", category: "Commerce" },
          { text: "MA/MFA in creative fields", category: "Arts" }
        ]
      },
      {
        id: 10,
        question: "Which extracurricular activities did you enjoy in school?",
        options: [
          { text: "Science fairs and robotics clubs", category: "Engineering" },
          { text: "Health awareness and first aid programs", category: "Medical" },
          { text: "Business competitions and entrepreneurship", category: "Commerce" },
          { text: "Cultural events and creative clubs", category: "Arts" }
        ]
      }
    ],
          '10th': [
        {
          id: 1,
          question: "After completing 10th grade, which stream interests you most for 11th-12th?",
          options: [
            { text: "Science (PCM/PCB) for engineering or medical", category: "Science" },
            { text: "Humanities for civil services or teaching", category: "Arts" },
            { text: "Commerce for business or CA", category: "Commerce" },
            { text: "Vocational courses for immediate job skills", category: "Vocational" }
          ]
        },
        {
          id: 2,
          question: "Which subjects do you find most engaging in Class 10th?",
          options: [
            { text: "Mathematics and Science experiments", category: "Science" },
            { text: "Social Studies and Literature", category: "Arts" },
            { text: "Mathematics and understanding business concepts", category: "Commerce" },
            { text: "Computer applications and practical work", category: "Vocational" }
          ]
        },
        {
          id: 3,
          question: "What type of learning environment do you prefer?",
          options: [
            { text: "Laboratory work and scientific research", category: "Science" },
            { text: "Group discussions and creative expression", category: "Arts" },
            { text: "Case studies and real-world business scenarios", category: "Commerce" },
            { text: "Hands-on workshops and practical training", category: "Vocational" }
          ]
        },
        {
          id: 4,
          question: "Which career path excites you most for the future?",
          options: [
            { text: "Doctor, Engineer, or Research Scientist", category: "Science" },
            { text: "Teacher, Journalist, or Government Officer", category: "Arts" },
            { text: "Chartered Accountant, Banker, or Entrepreneur", category: "Commerce" },
            { text: "Software Developer, Designer, or Technical Expert", category: "Vocational" }
          ]
        },
        {
          id: 5,
          question: "What motivates you most in your studies?",
          options: [
            { text: "Understanding how things work scientifically", category: "Science" },
            { text: "Learning about people, culture, and society", category: "Arts" },
            { text: "Understanding business and financial concepts", category: "Commerce" },
            { text: "Learning practical skills for immediate application", category: "Vocational" }
          ]
        },
        {
          id: 6,
          question: "Which type of problem-solving appeals to you?",
          options: [
            { text: "Mathematical equations and scientific theories", category: "Science" },
            { text: "Social issues and human behavior analysis", category: "Arts" },
            { text: "Business challenges and financial puzzles", category: "Commerce" },
            { text: "Technical problems and hands-on fixes", category: "Vocational" }
          ]
        },
        {
          id: 7,
          question: "What kind of books or content do you enjoy reading?",
          options: [
            { text: "Science magazines and discovery shows", category: "Science" },
            { text: "Stories, history, and current affairs", category: "Arts" },
            { text: "Business news and success stories", category: "Commerce" },
            { text: "Technology guides and how-to tutorials", category: "Vocational" }
          ]
        },
        {
          id: 8,
          question: "Which extracurricular activity interests you most?",
          options: [
            { text: "Science olympiads and quiz competitions", category: "Science" },
            { text: "Debate club and cultural activities", category: "Arts" },
            { text: "Business plan competitions and entrepreneurship clubs", category: "Commerce" },
            { text: "Coding clubs and technical workshops", category: "Vocational" }
          ]
        },
        {
          id: 9,
          question: "How do you see yourself contributing to society?",
          options: [
            { text: "Through scientific research and medical breakthroughs", category: "Science" },
            { text: "Through education, governance, and social change", category: "Arts" },
            { text: "Through job creation and economic development", category: "Commerce" },
            { text: "Through innovation and technical solutions", category: "Vocational" }
          ]
        },
        {
          id: 10,
          question: "What type of work environment would suit you best?",
          options: [
            { text: "Research labs, hospitals, or engineering firms", category: "Science" },
            { text: "Schools, government offices, or media houses", category: "Arts" },
            { text: "Corporate offices, banks, or your own business", category: "Commerce" },
            { text: "Tech companies, studios, or workshops", category: "Vocational" }
          ]
        }
      ]
  };

  return defaultQuestions[studentType] || defaultQuestions['12th'];
};

/**
 * Test if Puter AI is available
 * @returns {boolean} True if Puter AI is available
 */
export const isPuterAvailable = () => {
  return typeof window !== 'undefined' && window.puter && window.puter.ai;
};

/**
 * Get AI model information
 * @returns {Object} Information about available AI models
 */
export const getAIModelInfo = async () => {
  try {
    if (!isPuterAvailable()) {
      return { available: false, models: [] };
    }

    // This would depend on Puter's API for listing available models
    return {
      available: true,
      models: ['gpt-4', 'gpt-3.5-turbo'],
      currentModel: 'gpt-4'
    };
  } catch (error) {
    console.error('Error getting AI model info:', error);
    return { available: false, models: [] };
  }
}; 