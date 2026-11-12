function detectTopicMetadata(text) {
  const t = text.toLowerCase()

  if (t.includes('circular') || t.includes('linear') || t.includes('floor') || t.includes('sitting') || t.includes('sit around') || t.includes('boxes')) {
    return { section: 'Reasoning', topic: 'Puzzles & Seating Arrangement', archetype: 'core_puzzle', targetSec: 35 }
  }
  if (t.includes('syllogism') || t.includes('statements:') || t.includes('conclusions:') || t.includes('only a few')) {
    return { section: 'Reasoning', topic: 'Syllogism', archetype: 'speed_booster', targetSec: 25 }
  }
  if (t.includes('≥') || t.includes('≤') || t.includes('inequality')) {
    return { section: 'Reasoning', topic: 'Inequalities', archetype: 'speed_booster', targetSec: 20 }
  }
  if (t.includes('blood') || t.includes('mother of') || t.includes('father of') || t.includes('brother-in-law')) {
    return { section: 'Reasoning', topic: 'Blood Relations & Direction', archetype: 'speed_booster', targetSec: 30 }
  }
  if (t.includes('table') || t.includes('chart') || t.includes('graph') || t.includes('production') || t.includes('ratio of')) {
    return { section: 'Quant', topic: 'Data Interpretation (DI)', archetype: 'core_di', targetSec: 40 }
  }
  if (t.includes('x^2') || t.includes('x²') || t.includes('y²') || t.includes('quadratic')) {
    return { section: 'Quant', topic: 'Quadratic Equations', archetype: 'speed_booster', targetSec: 22 }
  }
  if (t.includes('missing number') || t.includes('wrong number') || t.includes('?')) {
    return { section: 'Quant', topic: 'Simplification & Number Series', archetype: 'speed_booster', targetSec: 20 }
  }
  if (t.includes('profit') || t.includes('interest') || t.includes('stream') || t.includes('train') || t.includes('invested')) {
    return { section: 'Quant', topic: 'Arithmetic Word Problems', archetype: 'conceptual_depth', targetSec: 55 }
  }

  return { section: 'Reasoning & Quant', topic: 'General Banking Aptitude', archetype: 'core_puzzle', targetSec: 36 }
}

function isStandaloneQuestion(qText, topic) {
  const standaloneTopics = ['Quadratic Equations', 'Simplification & Number Series', 'Inequalities', 'Arithmetic Word Problems', 'Syllogism']
  if (standaloneTopics.includes(topic)) return true
  const t = qText.toLowerCase()
  return t.includes('x^2') || t.includes('x²') || t.includes('train') || t.includes('km/hr') || t.includes('profit') || t.includes('invested')
}

// 1. REAL GEMINI 2.5 FLASH AI PARSER (Auto-Formats Messy PDFs + Generates Hindi & Explanations)
async function parseWithGeminiAI(rawText, apiKey) {
  const prompt = `You are an expert Indian Banking Exam (IBPS PO / SBI PO / TCS iON) question parser.
Convert the following raw teacher question text into a strict JSON object.
Rules:
1. Identify if questions share a common passage/puzzle/directions. Attach "passageEN" and its Hindi translation "passageHI" ONLY to questions that belong to that passage. For standalone questions (like Quadratic, Number Series, Arithmetic), set "passageEN": "" and "passageHI": "".
2. Every question MUST have exactly 5 options in "optionsEN" and "optionsHI".
3. Translate questions, passages, and options into natural Hindi for "questionHI", "passageHI", and "optionsHI".
4. Auto-detect "topic" from: ["Puzzles & Seating Arrangement", "Syllogism", "Inequalities", "Blood Relations & Direction", "Data Interpretation (DI)", "Quadratic Equations", "Simplification & Number Series", "Arithmetic Word Problems"].
5. Set "targetSec" (ideal IBPS time in seconds, between 20 and 55).
6. Provide a clear, shortcut banking "explanation" for each question.
7. "correctOption" must be a 0-based integer (0 for A, 1 for B, 2 for C, 3 for D, 4 for E).

Return ONLY valid JSON matching this schema:
{
  "setTitle": "Summary title",
  "questions": [
    {
      "questionEN": "...",
      "questionHI": "...",
      "passageEN": "...",
      "passageHI": "...",
      "topic": "...",
      "targetSec": 35,
      "optionsEN": ["...", "...", "...", "...", "..."],
      "optionsHI": ["...", "...", "...", "...", "..."],
      "correctOption": 1,
      "explanation": "..."
    }
  ]
}

Raw Text:
${rawText}`

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json' }
      })
    }
  )

  if (!response.ok) throw new Error('Gemini API request failed')
  const data = await response.json()
  const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text
  const parsed = JSON.parse(jsonText)

  return {
    setTitle: parsed.setTitle || `AI Parsed (${parsed.questions?.length || 0} Questions)`,
    passageEN: parsed.questions?.[0]?.passageEN || '',
    passageHI: parsed.questions?.[0]?.passageHI || '',
    questions: parsed.questions || []
  }
}

// 2. SMART REGEX FALLBACK (Works Offline / With Zero API Keys)
export async function parseTeacherTextToJSON(rawText) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('ibps_gemini_key')
  if (apiKey && apiKey.trim().length > 10) {
    try {
      return await parseWithGeminiAI(rawText, apiKey.trim())
    } catch (e) {
      console.warn('Gemini AI fallback to local regex parser:', e.message)
    }
  }

  // Pre-normalize inline options like "(A) Opt1 (B) Opt2" onto separate lines
  const normalizedText = rawText.replace(/\s+(\([a-eA-E]\)|[a-eA-E][\.\)])\s+/g, '\n$1 ')
  const lines = normalizedText.split('\n').map(l => l.trim()).filter(Boolean)

  let currentPassageLines = []
  let activePassageText = ''
  const questions = []
  let currentQ = null
  let manualTopicOverride = null

  lines.forEach((line) => {
    const tagMatch = line.match(/^\[(.*?)\]$/)
    if (tagMatch) {
      if (currentQ) {
        questions.push(currentQ)
        currentQ = null
      }
      manualTopicOverride = tagMatch[1].split('|').pop().trim()
      currentPassageLines = []
      activePassageText = ''
      return
    }

    if (/^(Q\d+|\d+[\.\)])/i.test(line)) {
      if (currentQ) questions.push(currentQ)
      if (currentPassageLines.length > 0) {
        activePassageText = currentPassageLines.join('\n')
        currentPassageLines = []
      }

      const qClean = line.replace(/^(Q\d+|\d+[\.\)])\s*/i, '')
      const meta = detectTopicMetadata(activePassageText + ' ' + qClean)
      const finalTopic = manualTopicOverride || meta.topic
      const hasPassage = !isStandaloneQuestion(qClean, finalTopic) && activePassageText.length > 20

      currentQ = {
        questionEN: qClean,
        questionHI: qClean,
        passageEN: hasPassage ? activePassageText : '',
        passageHI: hasPassage ? activePassageText : '',
        topic: finalTopic,
        section: meta.section,
        archetype: meta.archetype,
        targetSec: meta.targetSec,
        optionsEN: [],
        optionsHI: [],
        correctOption: 0,
        explanation: 'Apply standard IBPS elimination and speed-math method to reach the correct option under benchmark time.'
      }
    } else if (/^(\(?[a-eA-E][\.\)])/.test(line) && currentQ) {
      const cleanOpt = line.replace(/^(\(?[a-eA-E][\.\)])\s*/, '')
      currentQ.optionsEN.push(cleanOpt)
      currentQ.optionsHI.push(cleanOpt)
    } else if (/^(Ans|Answer|Correct)/i.test(line) && currentQ) {
      const match = line.match(/[a-eA-E]/i)
      if (match) {
        currentQ.correctOption = match[0].toUpperCase().charCodeAt(0) - 65
      }
    } else if (/^(Sol|Solution|Exp)/i.test(line) && currentQ) {
      currentQ.explanation = line.replace(/^(Sol|Solution|Exp)[:\.\-]?\s*/i, '')
    } else {
      if (currentQ && currentQ.optionsEN.length > 0) {
        questions.push(currentQ)
        currentQ = null
        manualTopicOverride = null
        activePassageText = ''
      }
      currentPassageLines.push(line)
    }
  })

  if (currentQ) questions.push(currentQ)

  questions.forEach(q => {
    while (q.optionsEN.length < 5) {
      const fallback = `Option ${String.fromCharCode(65 + q.optionsEN.length)}`
      q.optionsEN.push(fallback)
      q.optionsHI.push(fallback)
    }
  })

  return {
    setTitle: `Parsed ${questions.length} Questions`,
    passageEN: questions[0]?.passageEN || '',
    passageHI: questions[0]?.passageHI || '',
    questions
  }
}