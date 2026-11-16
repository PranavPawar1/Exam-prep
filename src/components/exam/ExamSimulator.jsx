import React from 'react';
import { useExamEngine, Q_STATUS } from '../../hooks/useExamEngine';

const STATUS_STYLES = {
  [Q_STATUS.NOT_VISITED]: 'bg-slate-100 text-slate-700 border border-slate-300 rounded',
  [Q_STATUS.NOT_ANSWERED]: 'bg-red-600 text-white rounded-t-lg rounded-bl-lg font-semibold',
  [Q_STATUS.ANSWERED]: 'bg-emerald-600 text-white rounded-t-lg rounded-br-lg font-semibold',
  [Q_STATUS.MARKED]: 'bg-purple-600 text-white rounded-full font-semibold',
  [Q_STATUS.ANSWERED_MARKED]:
    'bg-purple-600 text-white rounded-full font-semibold ring-2 ring-emerald-400 ring-offset-1',
};

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function ExamSimulator({ examData }) {
  const {
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
    submitCurrentSection,
  } = useExamEngine(examData);

  // Calculate status counts for the active section
  const counts = currentSection.questions.reduce(
    (acc, q) => {
      const st = responses[q.id]?.status || Q_STATUS.NOT_VISITED;
      acc[st] = (acc[st] || 0) + 1;
      return acc;
    },
    {
      [Q_STATUS.ANSWERED]: 0,
      [Q_STATUS.NOT_ANSWERED]: 0,
      [Q_STATUS.NOT_VISITED]: 0,
      [Q_STATUS.MARKED]: 0,
      [Q_STATUS.ANSWERED_MARKED]: 0,
    }
  );

  // Post-Submit Scorecard View
  if (isSubmitted) {
    let totalScore = 0;
    let correct = 0;
    let wrong = 0;

    examData.sections.forEach((sec) => {
      sec.questions.forEach((q) => {
        const resp = responses[q.id];
        if (
          resp &&
          (resp.status === Q_STATUS.ANSWERED || resp.status === Q_STATUS.ANSWERED_MARKED) &&
          resp.selectedOption !== null
        ) {
          if (resp.selectedOption === q.correctOption) {
            correct += 1;
            totalScore += sec.positiveMarks;
          } else {
            wrong += 1;
            totalScore -= sec.negativeMarks;
          }
        }
      });
    });

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Mock Test Submitted</h2>
          <p className="text-sm text-slate-500 mt-1">{examData.title}</p>

          <div className="grid grid-cols-3 gap-4 my-6">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-xs text-slate-500 uppercase">Net Score</div>
              <div className="text-2xl font-bold text-blue-600 mt-1">{totalScore.toFixed(2)}</div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="text-xs text-emerald-700 uppercase">Correct</div>
              <div className="text-2xl font-bold text-emerald-700 mt-1">{correct}</div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-xs text-red-700 uppercase">Incorrect</div>
              <div className="text-2xl font-bold text-red-700 mt-1">{wrong}</div>
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem(`rankpulse_attempt_${examData.id}`);
              window.location.reload();
            }}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Re-attempt Mock Test
          </button>
        </div>
      </div>
    );
  }

  const passageText = language === 'hi' && currentQuestion.passageHi ? currentQuestion.passageHi : currentQuestion.passageEn;
  const questionText = language === 'hi' && currentQuestion.questionHi ? currentQuestion.questionHi : currentQuestion.questionEn;
  const optionsList = language === 'hi' && currentQuestion.optionsHi ? currentQuestion.optionsHi : currentQuestion.optionsEn;

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="h-screen w-screen overflow-hidden flex flex-col bg-white select-none font-sans"
    >
      {/* Top Bar */}
      <header className="h-12 bg-slate-900 text-white px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-tight text-blue-400">RankPulse</span>
          <span className="text-slate-400">|</span>
          <span className="text-sm font-medium">{examData.title}</span>
        </div>

        <div className="flex items-center gap-4">
          {tabWarnings > 0 && (
            <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-400/40 px-2.5 py-1 rounded">
              Tab Switch Warnings: {tabWarnings}/3
            </span>
          )}
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded border border-slate-700">
            <span className="text-xs text-slate-300">Section Time Left:</span>
            <span
              className={`font-mono text-sm font-bold ${
                sectionTimeLeft < 120 ? 'text-red-400 animate-pulse' : 'text-emerald-400'
              }`}
            >
              {formatTime(sectionTimeLeft)}
            </span>
          </div>
        </div>
      </header>

      {/* Main Split Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left 75%: Section Bar + Question Workspace + Action Footer */}
        <div className="flex-1 flex flex-col border-r border-slate-300 overflow-hidden">
          {/* Section Tabs (Locked per IBPS Sectional Timing rules) */}
          <div className="h-10 bg-slate-100 border-b border-slate-300 px-3 flex items-center gap-1 shrink-0">
            {examData.sections.map((sec, idx) => {
              const isActive = idx === activeSectionIdx;
              return (
                <div
                  key={sec.id}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-t border-t border-x flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-200 text-slate-500 border-slate-300 cursor-not-allowed'
                  }`}
                  title={!isActive ? 'Sectional timing is locked in IBPS exams' : ''}
                >
                  <span>{sec.name}</span>
                  {!isActive && <span className="text-[10px]">🔒</span>}
                </div>
              );
            })}
          </div>

          {/* Question Meta Strip */}
          <div className="h-10 bg-white border-b border-slate-200 px-4 flex items-center justify-between shrink-0">
            <div className="text-sm font-bold text-slate-800">
              Question No. {activeQuestionIdx + 1}
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-slate-600">
                Marks:{' '}
                <strong className="text-emerald-600">+{currentSection.positiveMarks}</strong> |{' '}
                <strong className="text-red-600">-{currentSection.negativeMarks}</strong>
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">View In:</span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border border-slate-300 rounded px-2 py-0.5 text-xs bg-white text-slate-800"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>
            </div>
          </div>

          {/* Question Content Area (Split-screen if passage/DI exists) */}
          <div className="flex-1 overflow-hidden flex">
            {passageText && (
              <div className="w-1/2 h-full overflow-y-auto p-5 border-r border-slate-200 bg-slate-50/50">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Directions / Data Set
                </div>
                <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                  {passageText}
                </div>
              </div>
            )}

            <div className={`${passageText ? 'w-1/2' : 'w-full'} h-full overflow-y-auto p-5`}>
              <div className="text-sm text-slate-900 leading-relaxed font-medium mb-6 whitespace-pre-line">
                {questionText}
              </div>

              {/* 5 IBPS Options */}
              <div className="space-y-3 max-w-2xl">
                {optionsList.map((opt, idx) => {
                  const isChecked = selectedOption === idx;
                  return (
                    <label
                      key={idx}
                      onClick={() => setSelectedOption(idx)}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition ${
                        isChecked
                          ? 'border-blue-600 bg-blue-50/60'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q_${currentQuestion.id}`}
                        checked={isChecked}
                        onChange={() => setSelectedOption(idx)}
                        className="mt-0.5 h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-800">
                        <strong className="mr-1.5 text-slate-500">
                          ({String.fromCharCode(65 + idx)})
                        </strong>
                        {opt}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="h-14 bg-slate-100 border-t border-slate-300 px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={markForReviewAndNext}
                className="px-4 py-2 text-xs font-medium bg-white border border-slate-300 rounded hover:bg-slate-50 text-slate-800"
              >
                Mark for Review & Next
              </button>
              <button
                onClick={clearResponse}
                className="px-4 py-2 text-xs font-medium bg-white border border-slate-300 rounded hover:bg-slate-50 text-slate-800"
              >
                Clear Response
              </button>
            </div>

            <button
              onClick={saveAndNext}
              className="px-6 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded shadow-sm"
            >
              Save & Next
            </button>
          </div>
        </div>

        {/* Right 25% (Fixed 300px): Candidate Profile + Status Legend + Question Palette */}
        <aside className="w-80 bg-slate-50 flex flex-col shrink-0">
          {/* Candidate Info */}
          <div className="p-3 bg-white border-b border-slate-200 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
              RP
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">Candidate</div>
              <div className="text-[11px] text-slate-500">{currentSection.name}</div>
            </div>
          </div>

          {/* 5-Status Legend */}
          <div className="p-3 border-b border-slate-200 grid grid-cols-2 gap-2 text-[11px] text-slate-700 bg-white">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 flex items-center justify-center text-xs bg-emerald-600 text-white rounded-t-md rounded-br-md font-semibold">
                {counts[Q_STATUS.ANSWERED]}
              </span>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 flex items-center justify-center text-xs bg-red-600 text-white rounded-t-md rounded-bl-md font-semibold">
                {counts[Q_STATUS.NOT_ANSWERED]}
              </span>
              <span>Not Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 flex items-center justify-center text-xs bg-slate-100 text-slate-700 border border-slate-300 rounded">
                {counts[Q_STATUS.NOT_VISITED]}
              </span>
              <span>Not Visited</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 flex items-center justify-center text-xs bg-purple-600 text-white rounded-full font-semibold">
                {counts[Q_STATUS.MARKED]}
              </span>
              <span>Marked for Review</span>
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <span className="h-6 w-6 shrink-0 flex items-center justify-center text-xs bg-purple-600 text-white rounded-full font-semibold ring-2 ring-emerald-400">
                {counts[Q_STATUS.ANSWERED_MARKED]}
              </span>
              <span className="leading-tight">
                Answered & Marked for Review (will be evaluated)
              </span>
            </div>
          </div>

          {/* Question Number Grid */}
          <div className="flex-1 overflow-y-auto p-3">
            <div className="text-xs font-semibold text-slate-600 mb-2">
              Choose a Question ({currentSection.questions.length})
            </div>
            <div className="grid grid-cols-5 gap-2">
              {currentSection.questions.map((q, idx) => {
                const status = responses[q.id]?.status || Q_STATUS.NOT_VISITED;
                const isCurrent = idx === activeQuestionIdx;
                return (
                  <button
                    key={q.id}
                    onClick={() => jumpToQuestion(idx)}
                    className={`h-9 text-xs flex items-center justify-center transition ${
                      STATUS_STYLES[status]
                    } ${isCurrent ? 'ring-2 ring-blue-600 ring-offset-2' : ''}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Section / Exam Footer */}
          <div className="p-3 bg-slate-100 border-t border-slate-300">
            <button
              onClick={submitCurrentSection}
              className="w-full py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded shadow-sm"
            >
              {activeSectionIdx + 1 < examData.sections.length
                ? 'Submit Section & Proceed'
                : 'Final Submit Test'}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}