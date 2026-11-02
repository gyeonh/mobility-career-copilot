import React, { useState } from 'react';
import {
  InterviewFeedbackResponse,
  InterviewQuestionItem,
  InterviewQuestionsResponse,
} from '../types';
import { INITIAL_INTERVIEW_PRESET } from '../data/mockPresets';
import { SkeletonLoader } from './SkeletonLoader';
import {
  GraduationCap,
  Sparkles,
  Search,
  ChevronDown,
  ChevronUp,
  Send,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  MessageSquare,
  Building2,
  Briefcase,
  Check,
  RefreshCw,
  Lightbulb,
} from 'lucide-react';

interface Tab3InterviewProps {
  companyName: string;
  setCompanyName: (name: string) => void;
  presetJobRole?: string;
}

const COMMON_JOB_ROLES = [
  '생산기술 엔지니어',
  '품질관리/품질보증',
  '스마트팩토리 AI 엔지니어',
  'MLOps / 데이터 엔지니어',
  '차량 전동화 PE시스템 R&D',
  '차량 제어기 / 임베디드 SW',
];

export const Tab3Interview: React.FC<Tab3InterviewProps> = ({
  companyName,
  setCompanyName,
  presetJobRole,
}) => {
  const [jobRole, setJobRole] = useState<string>(
    presetJobRole || '생산기술 엔지니어'
  );
  const [inputCompany, setInputCompany] = useState<string>(companyName);
  const [activeCategoryTab, setActiveCategoryTab] = useState<'basic' | 'tech'>('basic');
  const [interviewData, setInterviewData] = useState<InterviewQuestionsResponse>(
    INITIAL_INTERVIEW_PRESET
  );
  const [isLoadingQuestions, setIsLoadingQuestions] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Accordion state for "답 보기" (revealed question IDs)
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({
    'bq-1': true, // default first one opened
  });

  // State for user answers & evaluations per question ID
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({
    'bq-1': '오스테나이트를 고온에서 급랭하면 마르텐사이트 조직으로 변태되어 높은 강도를 얻게 됩니다. 자동차 핫스탬핑에서는 가열된 강판을 금형에서 성형과 냉각을 동시에 진행하여 1500MPa 이상의 초고장력 부품을 만들고 스프링백을 억제합니다.',
  });
  const [feedbacks, setFeedbacks] = useState<Record<string, InterviewFeedbackResponse>>({});
  const [isEvaluating, setIsEvaluating] = useState<Record<string, boolean>>({});

  // Sync prop company changes
  React.useEffect(() => {
    setInputCompany(companyName);
  }, [companyName]);

  // Sync prop job role changes
  React.useEffect(() => {
    if (presetJobRole) {
      setJobRole(presetJobRole);
    }
  }, [presetJobRole]);

  // Request 10 Questions from Gemini
  const handleGenerateQuestions = async () => {
    if (!inputCompany.trim() || !jobRole.trim()) return;

    setCompanyName(inputCompany.trim());
    setIsLoadingQuestions(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/interview-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: inputCompany.trim(),
          jobRole: jobRole.trim(),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || '면접 질문을 생성하지 못했습니다.');
      }
      setInterviewData(json.data);
      // Reset answered state
      setRevealedAnswers({});
      setFeedbacks({});
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || '면접 질문 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  // Submit User Answer to Gemini for 10-point evaluation
  const handleSubmitAnswer = async (q: InterviewQuestionItem) => {
    const text = userAnswers[q.id]?.trim();
    if (!text) {
      alert('답변을 작성해주세요.');
      return;
    }

    setIsEvaluating((prev) => ({ ...prev, [q.id]: true }));

    try {
      const res = await fetch('/api/interview-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: interviewData.companyName,
          jobRole: interviewData.jobRole,
          question: q.question,
          userAnswer: text,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || '답변 첨삭에 실패했습니다.');
      }
      setFeedbacks((prev) => ({
        ...prev,
        [q.id]: json.data,
      }));
    } catch (err: any) {
      console.error(err);
      alert(err.message || '답변 평가 중 오류가 발생했습니다.');
    } finally {
      setIsEvaluating((prev) => ({ ...prev, [q.id]: false }));
    }
  };

  const toggleRevealAnswer = (id: string) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const activeQuestions =
    activeCategoryTab === 'basic'
      ? interviewData.basicQuestions || []
      : interviewData.techQuestions || [];

  return (
    <div className="space-y-6">
      {/* Top Search & Filter Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="p-1 rounded-md bg-blue-100 text-blue-900">
                <GraduationCap className="w-4 h-4" />
              </span>
              <span>기업·직무 맞춤 면접 학습 & AI 첨삭</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              기업명과 지원 직무를 기반으로 전공 기초 질문 5개와 실무 직무 기술 질문 5개를 생성하고, 직접 작성한 답변을 10점 만점으로 엄격히 평가합니다.
            </p>
          </div>

          {/* Input Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={inputCompany}
                onChange={(e) => setInputCompany(e.target.value)}
                placeholder="기업명 (예: 현대자동차)"
                className="w-28 sm:w-32 bg-transparent font-semibold text-slate-900 outline-hidden"
              />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs">
              <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                placeholder="지원 직무 (예: AI 엔지니어)"
                className="w-32 sm:w-36 bg-transparent font-semibold text-slate-900 outline-hidden"
              />
            </div>

            <button
              onClick={handleGenerateQuestions}
              disabled={isLoadingQuestions}
              className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold transition shadow-xs disabled:opacity-50 flex items-center justify-center gap-1.5 shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingQuestions ? 'animate-spin' : ''}`} />
              <span>면접 질문 생성</span>
            </button>
          </div>
        </div>

        {/* Quick Job Chips */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium mr-1">직무 추천:</span>
          {COMMON_JOB_ROLES.map((role) => (
            <button
              key={role}
              onClick={() => {
                setJobRole(role);
              }}
              className={`px-2.5 py-1 rounded-lg border transition ${
                jobRole === role
                  ? 'bg-blue-900 text-white border-blue-950 font-bold'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Category Tabs: ① 전공 기초 5개 vs ② 직무 기술 5개 */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-1">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveCategoryTab('basic')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
              activeCategoryTab === 'basic'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <span>① 전공 기초 질문</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeCategoryTab === 'basic' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              5문항
            </span>
          </button>

          <button
            onClick={() => setActiveCategoryTab('tech')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
              activeCategoryTab === 'tech'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <span>② 직무 기술 질문</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeCategoryTab === 'tech' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              5문항
            </span>
          </button>
        </div>

        <div className="text-xs text-slate-500 hidden sm:block">
          <strong className="text-slate-900">{interviewData.companyName}</strong> ·{' '}
          <span className="text-blue-900 font-semibold">{interviewData.jobRole}</span>
        </div>
      </div>

      {/* Main Questions List */}
      {isLoadingQuestions ? (
        <SkeletonLoader
          type="interview"
          message={`[${inputCompany} - ${jobRole}] 맞춤형 전공/실무 기술 면접 질문과 모범 가이드라인을 생성 중...`}
        />
      ) : (
        <div className="space-y-4">
          {activeQuestions.map((q, idx) => {
            const isRevealed = !!revealedAnswers[q.id];
            const feedback = feedbacks[q.id];
            const evaluating = !!isEvaluating[q.id];
            const answerText = userAnswers[q.id] || '';

            return (
              <div
                key={q.id || idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition duration-150 overflow-hidden"
              >
                {/* Question Header & Prompt */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-900 text-xs font-black flex items-center justify-center shrink-0">
                        Q{idx + 1}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {q.category}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                          q.difficulty === '심화'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : q.difficulty === '중급'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        난이도: {q.difficulty}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleRevealAnswer(q.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        isRevealed
                          ? 'bg-slate-100 text-slate-800'
                          : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                      }`}
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      <span>{isRevealed ? '답변 가이드 접기' : '답 보기 & 꼬리 질문'}</span>
                      {isRevealed ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {q.question}
                  </h3>
                </div>

                {/* Collapsible Section: Model Answer Key Points & Tail Questions */}
                {isRevealed && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-slate-100 bg-slate-50/60 space-y-4">
                    {/* Model Answer Key Points */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-950 uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4 text-blue-900" />
                        <span>모범 답변 핵심 포인트 (STAR & 필수 키워드)</span>
                      </div>
                      <ul className="space-y-1.5 pl-1">
                        {q.modelAnswerKeyPoints?.map((pt, i) => (
                          <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-900 mt-1.5 shrink-0" />
                            <span className="leading-relaxed">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tail Questions (꼬리 질문 2개) */}
                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                        <HelpCircle className="w-4 h-4 text-amber-700" />
                        <span>예상 꼬리 질문 (2문항)</span>
                      </div>
                      <div className="space-y-2 pl-1">
                        {q.tailQuestions?.map((tq, i) => (
                          <div
                            key={i}
                            className="text-xs text-amber-950 flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-amber-100"
                          >
                            <span className="font-bold text-amber-800 shrink-0">꼬리 {i + 1}:</span>
                            <span className="leading-relaxed font-medium">{tq}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Direct Answer Field & AI Feedback */}
                <div className="p-5 sm:p-6 border-t border-slate-100 bg-white space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-900" />
                      <span>직접 답변하기 (실전 모의 면접)</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {answerText.length}자 입력됨
                    </span>
                  </div>

                  <textarea
                    rows={3}
                    value={answerText}
                    onChange={(e) =>
                      setUserAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                    }
                    placeholder="면접관 앞에서 구술하듯 본인의 답변을 작성해보세요. (근거, 수치, 공학적 원리 포함 시 고득점)"
                    className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-hidden transition leading-relaxed"
                  />

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleSubmitAnswer(q)}
                      disabled={evaluating || !answerText.trim()}
                      className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition shadow-xs disabled:opacity-40 flex items-center gap-1.5"
                    >
                      {evaluating ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Gemini 면접관 평가 중...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>답변 제출 및 첨삭 받기</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* AI Evaluation Feedback Card */}
                  {feedback && (
                    <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-slate-50 via-blue-50/30 to-white border border-blue-200/80 shadow-xs space-y-4 animate-in fade-in duration-200">
                      {/* Score Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-blue-100">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex flex-col items-center justify-center font-black shadow-xs">
                            <span className="text-base leading-none">{feedback.score}</span>
                            <span className="text-[9px] text-blue-200 font-normal">/ 10점</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900">
                                AI 현업 면접관 평가
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  feedback.score >= 8
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : feedback.score >= 6
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {feedback.score >= 8
                                  ? '우수 (합격권)'
                                  : feedback.score >= 6
                                  ? '보통 (보완 권장)'
                                  : '노력 요함'}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5">
                              {feedback.scoreSummary}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Good Points vs Improvements Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* 잘한 점 */}
                        <div className="p-3.5 rounded-xl bg-white border border-emerald-200/80 space-y-1.5">
                          <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>잘한 점</span>
                          </div>
                          <ul className="space-y-1">
                            {feedback.goodPoints?.map((gp, i) => (
                              <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                                <span>{gp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 보완할 점 */}
                        <div className="p-3.5 rounded-xl bg-white border border-amber-200/80 space-y-1.5">
                          <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                            <span>보완할 점</span>
                          </div>
                          <ul className="space-y-1">
                            {feedback.improvements?.map((imp, i) => (
                              <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                                <span>{imp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Revised High-Score Sentence Example */}
                      <div className="p-3.5 rounded-xl bg-blue-900 text-white space-y-1.5">
                        <div className="flex items-center gap-1.5 text-sky-300 text-xs font-bold">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>10점 만점을 위한 모범 구술 예시</span>
                        </div>
                        <p className="text-xs sm:text-sm text-blue-50 leading-relaxed font-medium">
                          &ldquo;{feedback.revisedSentenceExample}&rdquo;
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
