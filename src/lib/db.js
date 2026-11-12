import { supabase } from './supabase'

const getLocal = (key) => JSON.parse(localStorage.getItem(key) || '[]')
const setLocal = (key, data) => localStorage.setItem(key, JSON.stringify(data))

export const DEFAULT_TESTS = [
  {
    id: 'default-ibps-po-1',
    title: 'IBPS PO Prelims: Mixed Reasoning & Quant Checklist #1',
    creator_name: 'Harshal Sir • Learning Capsules',
    exam_target: 'IBPS PO Prelims',
    duration_minutes: 15,
    is_paid: false,
    created_at: '2026-11-01T10:00:00Z'
  },
  {
    id: 'default-sbi-clerk-2',
    title: 'SBI & IBPS Clerk Speed Booster (Quant + Reasoning)',
    creator_name: 'banking_prep_official',
    exam_target: 'IBPS Clerk Prelims',
    duration_minutes: 12,
    is_paid: false,
    created_at: '2026-11-02T10:00:00Z'
  }
]

const PASSAGE_CIRCULAR = `Directions (Q1-Q2): Eight persons - P, Q, R, S, T, U, V and W sit around a circular table facing the center.\n• R sits second to the right of P.\n• Two persons sit between R and V.\n• S sits immediate left of V.\n• T is not an immediate neighbor of P or V.\n• U sits third to the right of S.\n• W is not an immediate neighbor of Q.`

const DEFAULT_QUESTIONS = {
  'default-ibps-po-1': [
    {
      id: 'dq-1',
      test_id: 'default-ibps-po-1',
      topic: 'Puzzles & Seating Arrangement',
      targetSec: 35,
      passageEN: PASSAGE_CIRCULAR,
      passageHI: 'निर्देश (Q1-Q2): आठ व्यक्ति P, Q, R, S, T, U, V और W केंद्र की ओर मुख करके एक वृत्ताकार मेज के चारों ओर बैठे हैं। R, P के दाईं ओर दूसरे स्थान पर बैठा है। R और V के बीच दो व्यक्ति बैठे हैं। S, V के ठीक बाईं ओर बैठा है।',
      question_en: 'Who among the following sits immediate right of P?',
      question_hi: 'निम्नलिखित में से कौन P के ठीक दाईं ओर बैठा है?',
      options_en: ['W', 'T', 'Q', 'S', 'None of these'],
      options_hi: ['W', 'T', 'Q', 'S', 'इनमें से कोई नहीं'],
      correct_option: 1,
      order_index: 1
    },
    {
      id: 'dq-2',
      test_id: 'default-ibps-po-1',
      topic: 'Puzzles & Seating Arrangement',
      targetSec: 35,
      passageEN: PASSAGE_CIRCULAR,
      passageHI: 'निर्देश (Q1-Q2): आठ व्यक्ति P, Q, R, S, T, U, V और W केंद्र की ओर मुख करके एक वृत्ताकार मेज के चारों ओर बैठे हैं। R, P के दाईं ओर दूसरे स्थान पर बैठा है। R और V के बीच दो व्यक्ति बैठे हैं। S, V के ठीक बाईं ओर बैठा है।',
      question_en: 'How many persons sit between P and V when counted from the right of P?',
      question_hi: 'P के दाईं ओर से गिनने पर P और V के बीच कितने व्यक्ति बैठे हैं?',
      options_en: ['One', 'Two', 'Three', 'Four', 'None'],
      options_hi: ['एक', 'दो', 'तीन', 'चार', 'कोई नहीं'],
      correct_option: 2,
      order_index: 2
    },
    {
      id: 'dq-3',
      test_id: 'default-ibps-po-1',
      topic: 'Quadratic Equations',
      targetSec: 22,
      passageEN: '',
      passageHI: '',
      question_en: 'Solve the given equations and compare x and y:\nI. x² - 11x + 30 = 0\nII. y² - 15y + 56 = 0',
      question_hi: 'दिए गए समीकरणों को हल करें:\nI. x² - 11x + 30 = 0\nII. y² - 15y + 56 = 0',
      options_en: ['x > y', 'x < y', 'x ≥ y', 'x ≤ y', 'x = y or no relation'],
      options_hi: ['x > y', 'x < y', 'x ≥ y', 'x ≤ y', 'x = y या कोई संबंध नहीं'],
      correct_option: 1,
      order_index: 3
    },
    {
      id: 'dq-4',
      test_id: 'default-ibps-po-1',
      topic: 'Arithmetic Word Problems',
      targetSec: 50,
      passageEN: '',
      passageHI: '',
      question_en: 'A train running at 72 km/hr crosses a pole in 15 seconds. Find the length of the train in meters.',
      question_hi: '72 किमी/घंटा की गति से चलने वाली एक ट्रेन एक खंभे को 15 सेकंड में पार करती है। ट्रेन की लंबाई (मीटर में) ज्ञात कीजिए।',
      options_en: ['250 m', '300 m', '350 m', '400 m', 'None of these'],
      options_hi: ['250 मीटर', '300 मीटर', '350 मीटर', '400 मीटर', 'इनमें से कोई नहीं'],
      correct_option: 1,
      order_index: 4
    }
  ],
  'default-sbi-clerk-2': [
    {
      id: 'dq-201',
      test_id: 'default-sbi-clerk-2',
      topic: 'Simplification & Number Series',
      targetSec: 20,
      passageEN: '',
      passageHI: '',
      question_en: 'Find the missing number in the series: 12, 25, 51, 103, 207, ?',
      question_hi: 'श्रृंखला में लुप्त संख्या ज्ञात कीजिए: 12, 25, 51, 103, 207, ?',
      options_en: ['412', '415', '420', '409', 'None of these'],
      options_hi: ['412', '415', '420', '409', 'इनमें से कोई नहीं'],
      correct_option: 1,
      order_index: 1
    },
    {
      id: 'dq-202',
      test_id: 'default-sbi-clerk-2',
      topic: 'Inequalities',
      targetSec: 20,
      passageEN: '',
      passageHI: '',
      question_en: 'Statements: A ≥ B > C = D ≤ E\nConclusions:\nI. A > D\nII. E ≥ C',
      question_hi: 'कथन: A ≥ B > C = D ≤ E\nनिष्कर्ष:\nI. A > D\nII. E ≥ C',
      options_en: ['Only I follows', 'Only II follows', 'Either I or II follows', 'Neither I nor II follows', 'Both I and II follow'],
      options_hi: ['केवल I अनुसरण करता है', 'केवल II अनुसरण करता है', 'या तो I या II', 'न तो I न ही II', 'I और II दोनों अनुसरण करते हैं'],
      correct_option: 4,
      order_index: 2
    }
  ]
}

const unpackQuestions = (questions = []) =>
  questions.map((q) => {
    if (q.metadata && typeof q.metadata === 'object' && q.metadata.topic) {
      return {
        ...q,
        topic: q.metadata.topic,
        targetSec: Number(q.metadata.targetSec || 35),
        passageEN: q.metadata.passageEN || '',
        passageHI: q.metadata.passageHI || q.metadata.passageEN || ''
      }
    }
    if (q.passageEN !== undefined) return q
    return { ...q, topic: 'General Banking Aptitude', targetSec: 35, passageEN: '', passageHI: '' }
  })

export const db = {
  // 0ms synchronous getter so UI never shows a blank/slow state on initial load
  getInstantTests() {
    return [...getLocal('ibps_tests'), ...DEFAULT_TESTS]
  },

  async getTests() {
    let customTests = getLocal('ibps_tests')
    try {
      const { data, error } = await supabase.from('tests').select('*').order('created_at', { ascending: false })
      if (!error && data) {
        const localIds = new Set(customTests.map(t => t.id))
        customTests = [...data.filter(d => !localIds.has(d.id)), ...customTests]
        setLocal('ibps_tests', customTests) // Cache locally for 0ms next load
      }
    } catch {}
    return [...customTests, ...DEFAULT_TESTS]
  },

  async createFullTest({ test, set, questions }) {
    const formatQ = (q, testId, setId, i) => ({
      test_id: testId,
      set_id: setId,
      question_en: q.questionEN,
      question_hi: q.questionHI || q.questionEN,
      options_en: q.optionsEN,
      options_hi: q.optionsHI,
      correct_option: q.correctOption,
      explanation: q.explanation,
      order_index: i + 1,
      metadata: {
        topic: q.topic || 'General Banking Aptitude',
        targetSec: q.targetSec || 35,
        passageEN: q.passageEN || '',
        passageHI: q.passageHI || q.passageEN || ''
      }
    })

    // Always save locally first for 0ms instant navigation
    const fallbackId = 'test-' + Date.now()
    const fallbackSetId = 'set-' + Date.now()
    const localTest = { id: fallbackId, ...test, created_at: new Date().toISOString() }
    const localSet = { id: fallbackSetId, test_id: fallbackId, ...set }
    const localQs = questions.map((q, i) => ({ id: `q-${Date.now()}-${i}`, ...formatQ(q, fallbackId, fallbackSetId, i) }))

    try {
      const { data: tData, error: tErr } = await supabase.from('tests').insert({
        title: test.title,
        creator_name: test.creator_name,
        exam_target: test.exam_target,
        duration_minutes: test.duration_minutes,
        is_paid: Boolean(test.is_paid)
      }).select().single()
      if (tErr) throw tErr

      const { data: sData, error: sErr } = await supabase.from('question_sets').insert({ ...set, test_id: tData.id }).select().single()
      if (sErr) throw sErr

      const qPayload = questions.map((q, i) => formatQ(q, tData.id, sData.id, i))
      const { error: qErr } = await supabase.from('questions').insert(qPayload)
      if (qErr) throw qErr

      // Also cache cloud test locally for 0ms opening
      setLocal('ibps_tests', [tData, ...getLocal('ibps_tests')])
      setLocal('ibps_sets', [...getLocal('ibps_sets'), sData])
      setLocal('ibps_questions', [...getLocal('ibps_questions'), ...qPayload.map((q, i) => ({ ...q, id: `cq-${i}` }))])
      return tData.id
    } catch {
      setLocal('ibps_tests', [localTest, ...getLocal('ibps_tests')])
      setLocal('ibps_sets', [...getLocal('ibps_sets'), localSet])
      setLocal('ibps_questions', [...getLocal('ibps_questions'), ...localQs])
      return fallbackId
    }
  },

  async getExamById(testId) {
    // 1. Instant 0ms check for built-in default tests
    const defaultTest = DEFAULT_TESTS.find(t => t.id === testId)
    if (defaultTest) {
      return {
        test: defaultTest,
        questionSet: { title: defaultTest.title, chart_image_url: null },
        questions: DEFAULT_QUESTIONS[testId] || []
      }
    }

    // 2. Instant 0ms check in localStorage cache before waiting on network
    const cachedTest = getLocal('ibps_tests').find(t => String(t.id) === String(testId))
    const cachedQuestions = getLocal('ibps_questions').filter(q => String(q.test_id) === String(testId))
    if (cachedTest && cachedQuestions.length > 0) {
      const cachedSet = getLocal('ibps_sets').find(s => String(s.test_id) === String(testId))
      return {
        test: cachedTest,
        questionSet: cachedSet || { title: cachedTest.title },
        questions: unpackQuestions(cachedQuestions)
      }
    }

    // 3. Fallback to Supabase Cloud fetch for shared cross-device links
    try {
      const { data: tData, error } = await supabase.from('tests').select('*').eq('id', testId).single()
      if (!error && tData) {
        const { data: sData } = await supabase.from('question_sets').select('*').eq('test_id', testId).single()
        const { data: qData } = await supabase.from('questions').select('*').eq('test_id', testId).order('order_index')
        return { test: tData, questionSet: sData, questions: unpackQuestions(qData || []) }
      }
    } catch {}

    return { test: null, questionSet: null, questions: [] }
  },

  async saveAttempt(attemptPayload) {
    const attemptId = 'att-' + Date.now()
    const newAttempt = { id: attemptId, ...attemptPayload, created_at: new Date().toISOString() }
    setLocal('ibps_attempts', [newAttempt, ...getLocal('ibps_attempts')])

    if (!String(attemptPayload.test_id).startsWith('test-') && !String(attemptPayload.test_id).startsWith('default-')) {
      try {
        const { data, error } = await supabase.from('test_attempts').insert({
          test_id: attemptPayload.test_id,
          student_name: attemptPayload.student_name,
          student_email: attemptPayload.student_email || null,
          score: attemptPayload.score,
          total_questions: attemptPayload.total_questions,
          accuracy: attemptPayload.accuracy,
          time_logs: attemptPayload.time_logs,
          responses: attemptPayload.responses
        }).select().single()
        if (!error && data) {
          setLocal('ibps_attempts', [{ ...attemptPayload, id: data.id, created_at: data.created_at }, ...getLocal('ibps_attempts')])
          return data.id
        }
      } catch {}
    }
    return attemptId
  },

  async getResultData(attemptId) {
    const localAtt = getLocal('ibps_attempts').find(a => String(a.id) === String(attemptId))
    if (localAtt) {
      const allTests = this.getInstantTests()
      const test = allTests.find(t => String(t.id) === String(localAtt.test_id)) || DEFAULT_TESTS[0]
      const examData = await this.getExamById(localAtt.test_id)
      const leaderboard = getLocal('ibps_attempts')
        .filter(a => String(a.test_id) === String(localAtt.test_id))
        .sort((a, b) => b.score - a.score)
      return { attempt: localAtt, test, questions: examData.questions || [], leaderboard }
    }

    try {
      const { data: att, error } = await supabase.from('test_attempts').select('*').eq('id', attemptId).single()
      if (!error && att) {
        const { data: tData } = await supabase.from('tests').select('*').eq('id', att.test_id).single()
        const { data: qData } = await supabase.from('questions').select('*').eq('test_id', att.test_id).order('order_index')
        const { data: lbData } = await supabase.from('test_attempts').select('*').eq('test_id', att.test_id).order('score', { ascending: false })
        return { attempt: att, test: tData, questions: unpackQuestions(qData || []), leaderboard: lbData || [] }
      }
    } catch {}
    return { attempt: null, test: null, questions: [], leaderboard: [] }
  },

  async getStudentHistory(studentName) {
    const tests = this.getInstantTests()
    const allAttempts = getLocal('ibps_attempts')
    const myAttempts = studentName
      ? allAttempts.filter(a => a.student_name?.toLowerCase() === studentName.toLowerCase())
      : allAttempts

    return myAttempts.map(att => ({
      ...att,
      testTitle: tests.find(t => String(t.id) === String(att.test_id))?.title || 'IBPS Practice Checklist',
      examTarget: tests.find(t => String(t.id) === String(att.test_id))?.exam_target || 'IBPS PO Prelims'
    }))
  },

  async getTestAnalytics(testId) {
    let attempts = getLocal('ibps_attempts').filter(a => String(a.test_id) === String(testId))
    if (!String(testId).startsWith('test-') && !String(testId).startsWith('default-')) {
      try {
        const { data } = await supabase.from('test_attempts').select('*').eq('test_id', testId).order('score', { ascending: false })
        if (data && data.length > 0) attempts = data
      } catch {}
    }
    const count = attempts.length
    const avgScore = count > 0 ? (attempts.reduce((s, a) => s + Number(a.score || 0), 0) / count).toFixed(2) : 0
    const avgAcc = count > 0 ? Math.round(attempts.reduce((s, a) => s + Number(a.accuracy || 0), 0) / count) : 0
    return { count, avgScore, avgAcc, attempts }
  }
}