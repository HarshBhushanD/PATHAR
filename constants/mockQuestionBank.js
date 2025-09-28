export const class10MockQuestionBank = {
  math: [
    { id: 1, question: "Solve for x: If 3x – 7 = 11, then x = ?", options: ["4", "5", "6", "7"], correct: 2, explanation: "3x – 7 = 11 → 3x = 18 → x = 6." },
    { id: 2, question: "The roots of the quadratic equation x² – 5x + 6 = 0 are:", options: ["2 and 3", "3 and 4", "1 and 6", "–2 and –3"], correct: 0, explanation: "x² – 5x + 6 = 0 → (x – 2)(x – 3) = 0." },
    { id: 3, question: "If sin A = 3/5, then cos A equals:", options: ["4/5", "5/4", "12/13", "√2/2"], correct: 0, explanation: "cosA = 4/5." },
    { id: 4, question: "The sum of first 20 natural numbers is:", options: ["200", "190", "210", "220"], correct: 2, explanation: "20×21/2 = 210." },
    { id: 5, question: "The value of (1 + tan²45°) is:", options: ["1", "0", "2", "∞"], correct: 2, explanation: "=2." },
    { id: 6, question: "The distance between points (3, –4) and (0, 0) is:", options: ["3", "4", "5", "6"], correct: 2, explanation: "=5." },
    { id: 7, question: "In an AP, if a = 2, d = 3, find the 10th term.", options: ["27", "28", "29", "30"], correct: 2, explanation: "29." },
    { id: 8, question: "If the probability of winning a game is 0.65, the probability of losing is:", options: ["0.25", "0.30", "0.35", "0.45"], correct: 2, explanation: "0.35." },
    { id: 9, question: "If a card is drawn from a well-shuffled deck, probability of getting a king is:", options: ["1/13", "1/26", "1/52", "4/13"], correct: 0, explanation: "1/13." },
    { id: 10, question: "The curved surface area of a cylinder of radius 7 cm and height 10 cm is:", options: ["220 cm²", "440 cm²", "220π cm²", "440π cm²"], correct: 3, explanation: "440π." },
    // Add more questions up to 100...
    { id: 100, question: "The median of 3,7,9,15,20 is:", options: ["7", "9", "15", "12"], correct: 1, explanation: "9." }
  ],
  science: [
    { id: 1, question: "The SI unit of electric current is:", options: ["Volt", "Ampere", "Ohm", "Coulomb"], correct: 1, explanation: "Ampere." },
    { id: 2, question: "Which gas is released during photosynthesis?", options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"], correct: 1, explanation: "Oxygen." },
    { id: 3, question: "The functional group –COOH is called:", options: ["Alcohol", "Aldehyde", "Carboxyl", "Ketone"], correct: 2, explanation: "Carboxyl." },
    { id: 4, question: "Which part of the human eye controls the amount of light entering?", options: ["Cornea", "Lens", "Iris", "Retina"], correct: 2, explanation: "Iris." },
    { id: 5, question: "The atomic number of calcium is:", options: ["18", "19", "20", "21"], correct: 2, explanation: "20." },
    // Add more questions up to 100...
    { id: 100, question: "Which blood vessels carry blood to the heart?", options: ["Arteries", "Veins", "Capillaries", "Nerves"], correct: 1, explanation: "Veins." }
  ]
};

export const class12MockQuestionBank = {
  math: [
    { id: 1, question: "Find the derivative of f(x) = x³ + 2x² - 5x + 3", options: ["3x² + 4x - 5", "x² + 4x - 5", "3x² + 2x - 5", "3x + 4"], correct: 0, explanation: "Using power rule: d/dx[xⁿ] = nxⁿ⁻¹" },
    { id: 2, question: "Evaluate ∫(2x + 3)dx", options: ["x² + 3x + C", "2x² + 3x + C", "x² + 3 + C", "2x + 3x + C"], correct: 0, explanation: "∫2x dx + ∫3 dx = x² + 3x + C" },
    { id: 3, question: "If A = [1 2; 3 4], find det(A)", options: ["-2", "2", "10", "-10"], correct: 0, explanation: "det(A) = (1)(4) - (2)(3) = -2" },
    { id: 4, question: "Solve the equation log₂(x) = 3", options: ["6", "8", "9", "16"], correct: 1, explanation: "log₂(x) = 3 means 2³ = x, so x = 8" },
    { id: 5, question: "Find lim(x→0) sin(x)/x", options: ["0", "1", "∞", "undefined"], correct: 1, explanation: "This is a standard limit equal to 1" },
    { id: 6, question: "If P(A) = 0.3, P(B) = 0.4, and A,B independent, find P(A∩B)", options: ["0.12", "0.7", "0.1", "0.06"], correct: 0, explanation: "For independent events: P(A∩B) = P(A) × P(B) = 0.3 × 0.4 = 0.12" },
    { id: 7, question: "Find equation of line through (1,2) with slope 3", options: ["y = 3x - 1", "y = 3x + 2", "y = x + 3", "y = 2x + 3"], correct: 0, explanation: "Using point-slope form: y - 2 = 3(x - 1)" },
    { id: 8, question: "If vectors a⃗ = (1,2,3), b⃗ = (2,1,0), find a⃗·b⃗", options: ["4", "5", "6", "7"], correct: 0, explanation: "a⃗·b⃗ = (1)(2) + (2)(1) + (3)(0) = 4" },
    { id: 9, question: "Find area under y = x² from x = 0 to x = 2", options: ["8/3", "4", "6", "8"], correct: 0, explanation: "∫₀² x² dx = [x³/3]₀² = 8/3" },
    { id: 10, question: "Solve 2^(x+1) = 16", options: ["2", "3", "4", "5"], correct: 1, explanation: "2^(x+1) = 2⁴, so x+1 = 4, x = 3" },
    { id: 11, question: "Find d/dx[ln(x)]", options: ["x", "1/x", "ln(x)", "e^x"], correct: 1, explanation: "Derivative of natural log is 1/x" },
    { id: 12, question: "If f(x) = e^x, find f'(x)", options: ["e^x", "xe^(x-1)", "x", "1"], correct: 0, explanation: "Derivative of e^x is e^x itself" },
    { id: 13, question: "Find inverse of matrix [2 1; 1 1]", options: ["[1 -1; -1 2]", "[1/2 -1/2; -1/2 1]", "[1 -1; -1 2]/1", "Cannot find"], correct: 0, explanation: "A⁻¹ = (1/det(A)) × adj(A)" },
    { id: 14, question: "Maximum value of 3sin(x) + 4cos(x) is:", options: ["5", "7", "3", "4"], correct: 0, explanation: "Maximum = √(a² + b²) = √(9 + 16) = 5" },
    { id: 15, question: "Find ∫e^x dx", options: ["e^x + C", "xe^x + C", "e^(x+1) + C", "x + C"], correct: 0, explanation: "Integral of e^x is e^x + C" },
    { id: 16, question: "If y = x^x, find dy/dx at x = e", options: ["e^e(1 + ln(e))", "e^e", "2e^e", "e^(e-1)"], correct: 2, explanation: "dy/dx = x^x(1 + ln(x)), at x=e: e^e(2) = 2e^e" },
    { id: 17, question: "Distance between (1,2,3) and (4,6,8):", options: ["5√2", "√50", "√34", "√26"], correct: 1, explanation: "d = √[(4-1)² + (6-2)² + (8-3)²] = √50" },
    { id: 18, question: "Critical points of f(x) = x³ - 6x² + 9x:", options: ["x = 1, 3", "x = 0, 2", "x = 2, 4", "x = 1, 2"], correct: 0, explanation: "f'(x) = 3x² - 12x + 9 = 0 gives x = 1, 3" },
    { id: 19, question: "If |a⃗| = 3, |b⃗| = 4, a⃗·b⃗ = 6, find angle:", options: ["60°", "45°", "30°", "90°"], correct: 0, explanation: "cos θ = 6/(3×4) = 1/2, so θ = 60°" },
    { id: 20, question: "Value of ∫₀^π sin(x) dx:", options: ["0", "1", "2", "-2"], correct: 2, explanation: "[-cos(x)]₀^π = -(-1) - (-1) = 2" },
    // Continue with more advanced calculus, vectors, probability questions...
    { id: 50, question: "If f(x) = |x|, then f'(0) is:", options: ["0", "1", "-1", "Does not exist"], correct: 3, explanation: "Absolute value function is not differentiable at x = 0" }
  ],

  physics: [
    { id: 1, question: "SI unit of electric field is:", options: ["N/C", "C/N", "V/m", "Both N/C and V/m"], correct: 3, explanation: "Electric field = Force/Charge = Voltage/distance" },
    { id: 2, question: "Which shows wave nature of light?", options: ["Photoelectric effect", "Interference", "Compton effect", "Pair production"], correct: 1, explanation: "Interference demonstrates wave properties" },
    { id: 3, question: "Capacitance of parallel plate capacitor:", options: ["ε₀A/d", "ε₀d/A", "A/ε₀d", "ε₀/Ad"], correct: 0, explanation: "C = ε₀A/d" },
    { id: 4, question: "Work function in photoelectric effect:", options: ["Max KE of electrons", "Min energy to remove electron", "Energy of photon", "Stopping potential"], correct: 1, explanation: "Minimum energy to remove electron from surface" },
    { id: 5, question: "Lenz's law conserves:", options: ["Charge", "Energy", "Momentum", "Mass"], correct: 1, explanation: "Based on conservation of energy" },
    { id: 6, question: "Young's double slit fringe width:", options: ["λD/d", "λd/D", "Dd/λ", "D/λd"], correct: 0, explanation: "β = λD/d" },
    { id: 7, question: "Dimensional formula of magnetic flux:", options: ["[ML²T⁻²A⁻¹]", "[MLT⁻²A⁻¹]", "[ML²T⁻¹A⁻¹]", "[MLT⁻¹A⁻¹]"], correct: 0, explanation: "Φ = BA gives [ML²T⁻²A⁻¹]" },
    { id: 8, question: "Most penetrating radiation:", options: ["Alpha", "Beta", "Gamma", "Neutrons"], correct: 2, explanation: "Gamma rays have highest penetration" },
    { id: 9, question: "Earth's escape velocity:", options: ["9.8 m/s", "11.2 km/s", "7.9 km/s", "15.0 km/s"], correct: 1, explanation: "v = √(2GM/R) ≈ 11.2 km/s" },
    { id: 10, question: "AC circuit power factor:", options: ["sin φ", "cos φ", "tan φ", "cot φ"], correct: 1, explanation: "Power factor = cos φ" },
    // Continue with more physics questions...
    { id: 50, question: "Photoelectric effect proves:", options: ["Wave nature", "Particle nature", "Both", "Neither"], correct: 1, explanation: "Einstein explained it using photon concept" }
  ],

  chemistry: [
    { id: 1, question: "IUPAC name of CH₃CH₂CH₂OH:", options: ["Propanol", "1-Propanol", "Propan-1-ol", "n-Propanol"], correct: 2, explanation: "IUPAC naming: propan-1-ol" },
    { id: 2, question: "Shows geometrical isomerism:", options: ["CH₃CH₂CHO", "CH₃CH=CHCH₃", "CH₃CH₂CH₃", "CH₃COCH₃"], correct: 1, explanation: "But-2-ene shows cis-trans isomerism" },
    { id: 3, question: "Oxidation state of Mn in KMnO₄:", options: ["+6", "+7", "+5", "+4"], correct: 1, explanation: "K(+1) + Mn(+7) + 4O(-2) = 0" },
    { id: 4, question: "Markovnikov addition reagent:", options: ["HBr with peroxide", "HBr without peroxide", "B₂H₆", "O₃"], correct: 1, explanation: "HBr follows Markovnikov without peroxide" },
    { id: 5, question: "Hybridization in benzene:", options: ["sp", "sp²", "sp³", "sp³d"], correct: 1, explanation: "All carbons are sp² hybridized" },
    // Continue with more chemistry questions...
    { id: 50, question: "SN1 rate determining step:", options: ["Nucleophile attack", "Carbocation formation", "Rearrangement", "Product formation"], correct: 1, explanation: "Formation of carbocation is slowest" }
  ],

  biology: [
    { id: 1, question: "DNA replication enzyme:", options: ["RNA polymerase", "DNA polymerase", "Helicase", "Ligase"], correct: 1, explanation: "DNA polymerase synthesizes new strands" },
    { id: 2, question: "Location of glycolysis:", options: ["Mitochondria", "Nucleus", "Cytoplasm", "Ribosome"], correct: 2, explanation: "Glycolysis occurs in cytoplasm" },
    { id: 3, question: "Golgi apparatus function:", options: ["Protein synthesis", "Packaging and shipping", "Energy production", "DNA storage"], correct: 1, explanation: "Modifies and packages proteins" },
    { id: 4, question: "Universal blood acceptor:", options: ["A", "B", "AB", "O"], correct: 2, explanation: "AB can receive from all groups" },
    { id: 5, question: "Photosynthesis products:", options: ["CO₂ and H₂O", "Glucose and O₂", "ATP and NADPH", "Starch"], correct: 1, explanation: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂" },
    // Continue with more biology questions...
    { id: 50, question: "PCR is used for:", options: ["DNA sequencing", "DNA amplification", "Protein synthesis", "Gene therapy"], correct: 1, explanation: "PCR amplifies DNA sequences" }
  ],

  english: [
    { id: 1, question: "Literary device: 'The classroom was a zoo':", options: ["Simile", "Metaphor", "Personification", "Alliteration"], correct: 1, explanation: "Direct comparison without like/as" },
    { id: 2, question: "Shakespearean sonnet rhyme scheme:", options: ["ABAB CDCD EFEF GG", "ABBA ABBA CDECDE", "ABAB BCBC CDCD EE", "AABB CCDD EEFF GG"], correct: 0, explanation: "14 lines with ABAB CDCD EFEF GG pattern" },
    { id: 3, question: "Subjunctive: 'I wish I _____ rich':", options: ["am", "was", "were", "will be"], correct: 2, explanation: "Subjunctive uses 'were' for all persons" },
    { id: 4, question: "Sentence type: 'Although it rained, we went out':", options: ["Simple", "Compound", "Complex", "Compound-complex"], correct: 2, explanation: "One independent + one dependent clause" },
    { id: 5, question: "Figure: 'Wind whispered through trees':", options: ["Metaphor", "Simile", "Personification", "Hyperbole"], correct: 2, explanation: "Giving human qualities to wind" },
    // Continue with more English questions...
    { id: 50, question: "Antonym of 'ephemeral':", options: ["Temporary", "Brief", "Permanent", "Quick"], correct: 2, explanation: "Ephemeral means short-lived" }
  ],

  economics: [
    { id: 1, question: "Law of demand states:", options: ["Price and demand positive", "Price and demand inverse", "Price and demand unrelated", "Demand constant"], correct: 1, explanation: "Inverse relationship between price and quantity demanded" },
    { id: 2, question: "GDP stands for:", options: ["Gross Domestic Product", "General Development Plan", "Government Debt Percentage", "Global Development Program"], correct: 0, explanation: "Measures total economic output" },
    { id: 3, question: "Not a factor of production:", options: ["Land", "Labor", "Capital", "Money"], correct: 3, explanation: "Money is medium of exchange" },
    { id: 4, question: "Inflation is:", options: ["Fall in prices", "Rise in prices", "Constant prices", "Price of one good"], correct: 1, explanation: "Sustained increase in general price level" },
    { id: 5, question: "Opportunity cost is:", options: ["Money cost", "Real cost", "Next best alternative", "Total cost"], correct: 2, explanation: "Value of next best alternative foregone" },
    // Continue with more economics questions...
    { id: 50, question: "WTO main objective:", options: ["Provide loans", "Promote free trade", "Control exchange rates", "Reduce poverty"], correct: 1, explanation: "World Trade Organization promotes free trade" }
  ]
};

export const getMockQuestionsByClass = (studentType, subject) => {
  const questionBank = studentType && studentType.includes('12') 
    ? class12MockQuestionBank 
    : class10MockQuestionBank;
  
  return questionBank[subject] || [];
}; 