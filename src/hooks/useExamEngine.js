import { useState, useEffect, useRef, useCallback } from 'react';

export const Q_STATUS = {
  NOT_VISITED: 'not_visited',
  NOT_ANSWERED: 'not_answered',
  ANSWERED: 'answered',
  MARKED: 'marked',
  ANSWERED_MARKED: 'answered_marked',
};

export function useExamEngine(examData, onAutoSubmit) {
  const storageKey = `rankpulse_attempt_${examData.id}`;

  // Load saved state or initialize fresh state
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [language, setLanguage] = useState('en'); // 'en' or 'hi'
  const [tabWarnings, setTabWarnings] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentSection = examData.sections[activeSectionIdx];
  const currentQuestion = currentSection.questions[activeQuestionIdx];

  // Initialize responses map for all questions across all sections
  const [responses, setResponses] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved).responses;
      } catch (e) {
        console.error(e);
      }
    }
    const init = {};
    examData.sections.forEach((sec, sIdx) => {
      sec.questions.forEach((q, qIdx) => {
        init[q.id] = {
          status: sIdx === 0 && qIdx === 0 ? Q_STATUS.NOT_ANSWERED : Q_STATUS.NOT_VISITED,
          selectedOption: null,
          timeSpent: 0,
        };
      });
    });
    return init;
  });

  // Sectional remaining time in seconds
  const [sectionTimeLeft, setSectionTimeLeft] = useState(currentSection.durationSeconds);
  const questionEnterTimeRef = useRef(Date.now());

  // Sync selectedOption radio button when switching questions
  useEffect(() => {
    if (!currentQuestion) return;
    const qState = responses[currentQuestion.id];
    setSelectedOption(qState?.selectedOption ?? null);

    // If arriving on a NOT_VISITED question, turn it into NOT_ANSWERED
    if (qState?.status === Q_STATUS.NOT_VISITED) {
      setResponses((prev) => ({
        ...prev,
        [currentQuestion.id]: {
          ...prev[currentQuestion.id],
          status: Q_STATUS.NOT_ANSWERED,
        },
      }));
    }
    questionEnterTimeRef.current = Date.now();
  }, [currentQuestion?.id]);

  // Save to localStorage whenever responses change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ responses, updatedAt: Date.now() }));
  }, [responses, storageKey]);

  // Record time spent on current question before leaving it
  const recordTimeSpent = useCallback(() => {
    if (!currentQuestion) return;
    const elapsedSeconds = Math.round((Date.now() - questionEnterTimeRef.current) / 1000);
    questionEnterTimeRef.current = Date.now();

    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        timeSpent: (prev[currentQuestion.id]?.timeSpent || 0) + elapsedSeconds,
      },
    }));
  }, [currentQuestion]);

  // Advance to next section or submit exam when section timer expires
  const handleSectionAdvance = useCallback(() => {
    recordTimeSpent();
    if (activeSectionIdx + 1 < examData.sections.length) {
      const nextIdx = activeSectionIdx + 1;
      setActiveSectionIdx(nextIdx);
      setActiveQuestionIdx(0);
      setSectionTimeLeft(examData.sections[nextIdx].durationSeconds);
    } else {
      setIsSubmitted(true);
      if (onAutoSubmit) onAutoSubmit(responses);
    }
  }, [activeSectionIdx, examData.sections, onAutoSubmit, recordTimeSpent, responses]);

  // 1-second sectional countdown timer
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setSectionTimeLeft((prev) => {
        if (prev <= 1) {
          handleSectionAdvance();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, handleSectionAdvance]);

  // Tab switch / blur detection
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && !isSubmitted) {
        setTabWarnings((prev) => prev + 1);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isSubmitted]);

  // Move to next question within the current section (loops to Q1 if at end of section)
  const moveToNextQuestion = () => {
    if (activeQuestionIdx + 1 < currentSection.questions.length) {
      setActiveQuestionIdx((prev) => prev + 1);
    } else {
      setActiveQuestionIdx(0);
    }
  };

  // Button 1: Save & Next
  const saveAndNext = () => {
    recordTimeSpent();
    const hasChoice = selectedOption !== null;
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        selectedOption,
        status: hasChoice ? Q_STATUS.ANSWERED : Q_STATUS.NOT_ANSWERED,
      },
    }));
    moveToNextQuestion();
  };

  // Button 2: Mark for Review & Next
  const markForReviewAndNext = () => {
    recordTimeSpent();
    const hasChoice = selectedOption !== null;
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        selectedOption,
        status: hasChoice ? Q_STATUS.ANSWERED_MARKED : Q_STATUS.MARKED,
      },
    }));
    moveToNextQuestion();
  };

  // Button 3: Clear Response
  const clearResponse = () => {
    setSelectedOption(null);
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        selectedOption: null,
        status: Q_STATUS.NOT_ANSWERED,
      },
    }));
  };

  // Palette click navigation
  const jumpToQuestion = (qIndex) => {
    recordTimeSpent();
    setActiveQuestionIdx(qIndex);
  };

  return {
    activeSectionIdx,
    activeQuestionIdx,
    currentSection,
    currentQuestion,
    responses,
    selectedOption,
    setSelectedOption,
    language,
    setLanguage,
    sectionTimeLeft,
    tabWarnings,
    isSubmitted,
    saveAndNext,
    markForReviewAndNext,
    clearResponse,
    jumpToQuestion,
    submitCurrentSection: handleSectionAdvance,
  };
}