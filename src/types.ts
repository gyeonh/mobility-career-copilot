export type TabType = 'trends' | 'process' | 'interview' | 'matching';

export type TrendCategory =
  | '자동차 전체'
  | '전동화'
  | '자율주행'
  | 'SDV'
  | '제조 혁신'
  | '부품·소재';

export interface SourceLink {
  title: string;
  url: string;
}

export interface TrendKeywordItem {
  keyword: string;
  importanceScore: number;
  oneLineSummary: string;
  whyImportant: string;
  relatedCompanies: string[];
  sourceLinks: SourceLink[];
}

export interface TrendsResponse {
  category: string;
  keywords: TrendKeywordItem[];
}

export interface CompanyProduct {
  id: string;
  name: string;
  category: string;
  description: string;
}

export interface CompanyProductsResponse {
  companyName: string;
  companyDescription: string;
  products: CompanyProduct[];
}

export interface ProcessStep {
  stepNumber: number;
  stepName: string;
  phaseTag: string;
  description: string;
  equipment: string[];
  qualityPoints: string[];
  aiAutomationPoints: string[];
  interviewTip: string;
}

export interface ManufacturingProcessResponse {
  companyName: string;
  productName: string;
  processOverview: string;
  steps: ProcessStep[];
}

export interface InterviewQuestionItem {
  id: string;
  category: string;
  question: string;
  difficulty: string;
  modelAnswerKeyPoints: string[];
  tailQuestions: string[];
}

export interface InterviewQuestionsResponse {
  companyName: string;
  jobRole: string;
  basicQuestions: InterviewQuestionItem[];
  techQuestions: InterviewQuestionItem[];
}

export interface InterviewFeedbackResponse {
  score: number;
  scoreSummary: string;
  goodPoints: string[];
  improvements: string[];
  revisedSentenceExample: string;
}

export interface CompetencyMatchItem {
  id: string;
  competency: string;
  importance: string;
  matchedExperience: string;
  matchStrength: '상' | '중' | '하' | '보완 필요';
  appealSentenceExample: string;
  gapSuggestion: string;
}

export interface MatchingResultResponse {
  extractedRoleTitle: string;
  overallMatchRate: number;
  summaryAnalysis: string;
  competencyMatches: CompetencyMatchItem[];
}
