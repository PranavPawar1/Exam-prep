import { create } from 'zustand'

export const useExamStore = create((set, get) => ({
  activeTab: 'exam', // 'exam', 'creator', 'diagnostic'
  currentQuestionIndex: 0,
  language: 'EN', // 'EN' or 'HI'
  timeLeft: 1200, // 20 minutes sectional timer
  
  // Creator state: questions uploaded by teacher
  creatorQuestions: [],

  // Initial IBPS Sample Question Set (1 Set of Seating Arrangement + 1 Set of DI)
  questions: [
    {
      id: 1,
      section: 'Reasoning Ability',
      passageTitle: 'Set 1: Circular Seating Arrangement (Q1-Q5)',
      passageContent: {
        EN: 'Eight persons - P, Q, R, S, T, U, V and W are sitting around a circular table facing the center. R sits second to the right of P. Two persons sit between R and V. S sits to the immediate left of V. T is not an immediate neighbor of P or V. U sits third to the right of S. W is not an immediate neighbor of Q.',
        HI: 'आठ व्यक्ति - P, Q, R, S, T, U, V और W केंद्र की ओर मुख करके एक वृत्ताकार मेज के चारों ओर बैठे हैं। R, P के दाईं ओर दूसरे स्थान पर बैठा है। R और V के बीच दो व्यक्ति बैठे हैं। S, V के ठीक बाईं ओर बैठा है। T, P या V का निकटतम पड़ोसी नहीं है। U, S के दाईं ओर तीसरे स्थान पर बैठा है। W, Q का निकटतम पड़ोसी नहीं है।'
      },
      questionText: {
        EN: 'Who among the following sits immediate right of P?',
        HI: 'निम्नलिखित में से कौन P के ठीक दाईं ओर बैठा है?'
      },
      options: {
        EN: ['W', 'T', 'Q', 'S', 'None of these'],
        HI: ['W', 'T', 'Q', 'S', 'इनमें से कोई नहीं']
      },
      correctAnswer: 1, // Index of 'T'
      status: 'not-visited', // 'not-visited', 'not-answered', 'answered', 'marked'
      selectedAnswer: null
    },
    {
      id: 2,
      section: 'Reasoning Ability',
      passageTitle: 'Set 1: Circular Seating Arrangement (Q1-Q5)',
      passageContent: {
        EN: 'Eight persons - P, Q, R, S, T, U, V and W are sitting around a circular table facing the center. R sits second to the right of P. Two persons sit between R and V. S sits to the immediate left of V. T is not an immediate neighbor of P or V. U sits third to the right of S. W is not an immediate neighbor of Q.',
        HI: 'आठ व्यक्ति - P, Q, R, S, T, U, V और W केंद्र की ओर मुख करके एक वृत्ताकार मेज के चारों ओर बैठे हैं। R, P के दाईं ओर दूसरे स्थान पर बैठा है। R और V के बीच दो व्यक्ति बैठे हैं। S, V के ठीक बाईं ओर बैठा है। T, P या V का निकटतम पड़ोसी नहीं है। U, S के दाईं ओर तीसरे स्थान पर बैठा है। W, Q का निकटतम पड़ोसी नहीं है।'
      },
      questionText: {
        EN: 'How many persons sit between Q and U when counted from the left of Q?',
        HI: 'Q के बाईं ओर से गिनने पर Q और U के बीच कितने व्यक्ति बैठे हैं?'
      },
      options: {
        EN: ['None', 'One', 'Two', 'Three', 'More than three'],
        HI: ['कोई नहीं', 'एक', 'दो', 'तीन', 'तीन से अधिक']
      },
      correctAnswer: 2,
      status: 'not-visited',
      selectedAnswer: null
    },
    {
      id: 3,
      section: 'Quantitative Aptitude',
      passageTitle: 'Set 2: Data Interpretation Table (Q6-Q10)',
      passageContent: {
        EN: 'Study the following table showing production of cars (in thousands) by 3 companies (A, B, C) over 5 years (2020-2024).\n2020: A=45, B=60, C=30\n2021: A=50, B=55, C=40\n2022: A=65, B=70, C=50\n2023: A=80, B=75, C=60\n2024: A=90, B=85, C=75',
        HI: '5 वर्षों (2020-2024) में 3 कंपनियों (A, B, C) द्वारा कारों के उत्पादन (हजारों में) को दर्शाने वाली तालिका का अध्ययन करें।\n2020: A=45, B=60, C=30\n2021: A=50, B=55, C=40\n2022: A=65, B=70, C=50\n2023: A=80, B=75, C=60\n2024: A=90, B=85, C=75'
      },
      questionText: {
        EN: 'What is the average production of Company A across all 5 years?',
        HI: 'सभी 5 वर्षों में कंपनी A का औसत उत्पादन कितना है?'
      },
      options: {
        EN: ['65 thousand', '68 thousand', '72 thousand', '76 thousand', '80 thousand'],
        HI: ['65 हजार', '68 हजार', '72 हजार', '76 हजार', '80 हजार']
      },
      correctAnswer: 1, // 68
      status: 'not-visited',
      selectedAnswer: null
    }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setLanguage: (lang) => set({ language: lang }),
  selectQuestion: (index) => set((state) => {
    const updated = [...state.questions]
    if (updated[index].status === 'not-visited') {
      updated[index].status = 'not-answered'
    }
    return { currentQuestionIndex: index, questions: updated }
  }),
  setAnswer: (optionIndex) => set((state) => {
    const updated = [...state.questions]
    updated[state.currentQuestionIndex].selectedAnswer = optionIndex
    updated[state.currentQuestionIndex].status = 'answered'
    return { questions: updated }
  }),
  clearResponse: () => set((state) => {
    const updated = [...state.questions]
    updated[state.currentQuestionIndex].selectedAnswer = null
    updated[state.currentQuestionIndex].status = 'not-answered'
    return { questions: updated }
  }),
  markForReview: () => set((state) => {
    const updated = [...state.questions]
    updated[state.currentQuestionIndex].status = 'marked'
    return { questions: updated }
  }),
  saveAndNext: () => set((state) => {
    const updated = [...state.questions]
    const nextIdx = Math.min(state.currentQuestionIndex + 1, updated.length - 1)
    if (updated[nextIdx].status === 'not-visited') {
      updated[nextIdx].status = 'not-answered'
    }
    return { currentQuestionIndex: nextIdx, questions: updated }
  }),
  addCreatorQuestion: (newQ) => set((state) => ({
    creatorQuestions: [...state.creatorQuestions, newQ],
    questions: [...state.questions, newQ]
  }))
}))
