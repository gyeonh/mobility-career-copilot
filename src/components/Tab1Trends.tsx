import React, { useState } from 'react';
import { TrendCategory, TrendKeywordItem, TrendsResponse } from '../types';
import { INITIAL_TRENDS_PRESET } from '../data/mockPresets';
import { safeApiPost } from '../utils/apiClient';
import { SkeletonLoader } from './SkeletonLoader';
import {
  TrendingUp,
  Search,
  ExternalLink,
  Sparkles,
  Building2,
  RefreshCw,
  X,
  Layers,
  ArrowRight,
  ArrowUpRight,
  Info,
  CheckCircle2,
  ChevronRight,
  Flame,
  Target,
  BookOpen,
} from 'lucide-react';

interface Tab1TrendsProps {
  onSelectCompany: (company: string) => void;
  onNavigateToInterview: (company: string, topic?: string) => void;
}

const CATEGORIES: { id: TrendCategory; label: string; desc: string }[] = [
  { id: '자동차 전체', label: '자동차 전체', desc: '산업 전반 패러다임' },
  { id: '전동화', label: '전동화 (EV/배터리)', desc: '800V·배터리·모터' },
  { id: '자율주행', label: '자율주행 (ADAS/AI)', desc: 'E2E·센서퓨전·제어' },
  { id: 'SDV', label: 'SDV (소프트웨어)', desc: 'Zonal·HPC·OTA' },
  { id: '제조 혁신', label: '제조 혁신 (스마트공장)', desc: 'SDF·AI검사·예지보전' },
  { id: '부품·소재', label: '부품·소재 (경량화)', desc: '핫스탬핑·이종접합' },
];

export const Tab1Trends: React.FC<Tab1TrendsProps> = ({
  onSelectCompany,
  onNavigateToInterview,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<TrendCategory>('자동차 전체');
  const [trendsData, setTrendsData] = useState<Record<string, TrendsResponse>>(INITIAL_TRENDS_PRESET);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedKeyword, setSelectedKeyword] = useState<TrendKeywordItem | null>(
    INITIAL_TRENDS_PRESET['자동차 전체']?.keywords[0] || null
  );
  const [viewMode, setViewMode] = useState<'ranked' | 'bubble'>('ranked');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [noticeMsg, setNoticeMsg] = useState<string | null>(null);

  const currentTrends = trendsData[selectedCategory] || INITIAL_TRENDS_PRESET[selectedCategory] || {
    category: selectedCategory,
    keywords: [],
  };

  const fetchTrendsForCategory = async (cat: TrendCategory, forceRefresh = false) => {
    // If not a force refresh and we already have curated keywords for this category, switch immediately!
    if (!forceRefresh && trendsData[cat]?.keywords?.length > 0) {
      setSelectedCategory(cat);
      setSelectedKeyword(trendsData[cat].keywords[0]);
      setErrorMsg(null);
      setNoticeMsg(null);
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setNoticeMsg(null);
    setSelectedCategory(cat);

    const fallback = INITIAL_TRENDS_PRESET[cat] || INITIAL_TRENDS_PRESET['자동차 전체'];

    try {
      const response = await safeApiPost<TrendsResponse>(
        '/api/trends',
        { category: cat },
        fallback,
        6000
      );

      const targetData = response.data || fallback;
      setTrendsData((prev) => ({
        ...prev,
        [cat]: targetData,
      }));
      if (targetData.keywords?.length > 0) {
        setSelectedKeyword(targetData.keywords[0]);
      }
      if (response.notice) {
        setNoticeMsg(response.notice);
      }
    } catch (err: any) {
      console.warn('API error in fetchTrendsForCategory:', err);
      setTrendsData((prev) => ({
        ...prev,
        [cat]: fallback,
      }));
      if (fallback?.keywords?.length > 0) {
        setSelectedKeyword(fallback.keywords[0]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Category Selection & Clear Intro Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-950 text-white flex items-center justify-center text-xs font-black">
                1
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                산업 트렌드 분야 선택
              </h2>
              <span className="text-xs text-blue-900 font-semibold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                2025~2026 최신 기술 이슈
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              관심 있는 세부 도메인을 선택하면, 실제 채용 서류 및 기술면접에서 가장 많이 질문받는 핵심 키워드 10개를 중요도 순으로 분석합니다.
            </p>
          </div>

          {/* Action Tools: View Mode Toggle & Live Search */}
          <div className="flex items-center gap-2 self-start lg:self-auto flex-wrap">
            <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1 text-xs font-medium">
              <button
                onClick={() => setViewMode('ranked')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  viewMode === 'ranked'
                    ? 'bg-white text-blue-950 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                순위별 카드 뷰
              </button>
              <button
                onClick={() => setViewMode('bubble')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  viewMode === 'bubble'
                    ? 'bg-white text-blue-950 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                버블 클라우드 뷰
              </button>
            </div>

            <button
              onClick={() => fetchTrendsForCategory(selectedCategory, true)}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold transition shadow-xs disabled:opacity-50"
              title="Google Search 기반 최신 기사 및 기술 리포트 재검색"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Google 실시간 검색 갱신</span>
            </button>
          </div>
        </div>

        {/* Horizontal Category Selection: 가로형 배치로 글자가 한 줄로 편안하게 읽히도록 구성 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-3 border-t border-slate-100">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => fetchTrendsForCategory(cat.id)}
                disabled={isLoading}
                className={`px-4 py-2.5 rounded-xl text-left border transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-blue-950 text-white border-blue-900 shadow-sm ring-2 ring-blue-900/30'
                    : 'bg-slate-50/80 hover:bg-white text-slate-800 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                      isSelected ? 'bg-sky-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isSelected ? '선택됨' : '분야'}
                  </span>
                  <span className="font-extrabold text-xs sm:text-sm tracking-tight truncate">
                    {cat.label}
                  </span>
                </div>
                <span
                  className={`text-[11px] font-medium shrink-0 ${
                    isSelected ? 'text-sky-200' : 'text-slate-400'
                  }`}
                >
                  {cat.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notifications / Errors */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{errorMsg}</span>
          </div>
          <button
            onClick={() => setErrorMsg(null)}
            className="text-amber-600 hover:text-amber-900 ml-1 p-0.5 rounded"
            title="닫기"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {noticeMsg && (
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0 text-blue-600" />
            <span>{noticeMsg}</span>
          </div>
          <button
            onClick={() => setNoticeMsg(null)}
            className="text-blue-600 hover:text-blue-900 ml-2 p-0.5 rounded"
            title="닫기"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Content Area */}
      {isLoading ? (
        <SkeletonLoader
          type="trends"
          message={`[${selectedCategory}] 분야의 최신 뉴스 및 산업 기술 리포트를 Google 검색으로 수집 중...`}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 cols): Keyword List or Bubble Cloud */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-600" />
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    {selectedCategory} 핵심 키워드 TOP 10
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  키워드를 클릭하면 오른쪽 카드에 <strong className="text-blue-950">[면접 출제 포인트]</strong>와 <strong className="text-blue-950">[출처 링크]</strong>가 열립니다.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                총 {currentTrends.keywords.length}개
              </span>
            </div>

            {viewMode === 'ranked' ? (
              /* Scannable Ranked Card View (Crystal Clear!) */
              <div className="space-y-2.5">
                {currentTrends.keywords.map((item, idx) => {
                  const isSelected = selectedKeyword?.keyword === item.keyword;
                  const isTop3 = idx < 3;
                  return (
                    <button
                      key={item.keyword + idx}
                      onClick={() => setSelectedKeyword(item)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-150 flex items-start gap-3.5 cursor-pointer ${
                        isSelected
                          ? 'bg-blue-950 text-white border-blue-900 shadow-md ring-2 ring-blue-900/30'
                          : 'bg-slate-50/70 hover:bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Rank Indicator */}
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${
                          isSelected
                            ? 'bg-sky-400 text-slate-950'
                            : isTop3
                            ? 'bg-blue-900 text-white shadow-xs'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        #{idx + 1}
                      </div>

                      {/* Content Summary */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-extrabold text-xs sm:text-sm tracking-tight truncate">
                            {item.keyword}
                          </h4>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                              isSelected
                                ? 'bg-white/20 text-sky-200'
                                : 'bg-blue-100 text-blue-900'
                            }`}
                          >
                            중요도 {item.importanceScore}점
                          </span>
                        </div>

                        <p
                          className={`text-xs line-clamp-1 leading-relaxed ${
                            isSelected ? 'text-blue-100' : 'text-slate-600'
                          }`}
                        >
                          {item.oneLineSummary}
                        </p>

                        <div className="flex items-center gap-1.5 mt-2 text-[11px] truncate">
                          <span className={isSelected ? 'text-blue-300' : 'text-slate-400'}>
                            관련 기업:
                          </span>
                          <span className={`font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                            {item.relatedCompanies.slice(0, 3).join(', ')}
                          </span>
                        </div>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 shrink-0 mt-2 transition ${
                          isSelected ? 'text-sky-300' : 'text-slate-400'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Bubble Cloud View */
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {currentTrends.keywords.map((item, index) => {
                  const isSelected = selectedKeyword?.keyword === item.keyword;
                  return (
                    <button
                      key={item.keyword + index}
                      onClick={() => setSelectedKeyword(item)}
                      className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all duration-150 min-h-[110px] ${
                        isSelected
                          ? 'bg-blue-950 text-white border-blue-900 shadow-md ring-2 ring-blue-900/30'
                          : 'bg-slate-50 hover:bg-white text-slate-800 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            isSelected ? 'bg-sky-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          #{index + 1}
                        </span>
                        <span
                          className={`text-[10px] font-semibold ${
                            isSelected ? 'text-sky-200' : 'text-blue-900'
                          }`}
                        >
                          {item.importanceScore}점
                        </span>
                      </div>
                      <h4 className="font-bold text-xs line-clamp-2">{item.keyword}</h4>
                      <p
                        className={`text-[10px] line-clamp-1 mt-1 ${
                          isSelected ? 'text-blue-200' : 'text-slate-500'
                        }`}
                      >
                        {item.relatedCompanies[0]}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column (5 cols): Deep Dive Keyword Guide (Sticky) */}
          <div className="lg:col-span-5 sticky top-24">
            {selectedKeyword ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-5">
                {/* Header of Detail Card */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-blue-950 text-white">
                      업계 주목도 {selectedKeyword.importanceScore}점
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      분야: {selectedCategory}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug tracking-tight">
                    {selectedKeyword.keyword}
                  </h3>
                </div>

                {/* 1. What is this? One Line Summary */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-900" />
                    <span>기술 정의 및 핵심 설명</span>
                  </div>
                  <p className="font-medium text-slate-900">{selectedKeyword.oneLineSummary}</p>
                </div>

                {/* 2. Most Important: Why it matters for job seekers (Interview Strategy) */}
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 space-y-2">
                  <div className="text-xs font-bold text-blue-950 flex items-center gap-1.5 uppercase tracking-wider">
                    <Target className="w-4 h-4 text-blue-900" />
                    <span>면접관 질문 의도 & 자소서 어필 전략</span>
                  </div>
                  <p className="text-xs sm:text-sm text-blue-950 leading-relaxed font-medium">
                    {selectedKeyword.whyImportant}
                  </p>
                </div>

                {/* 3. Related Companies */}
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-900" />
                    <span>관련 주요 기업 (클릭 시 제조공정 분석 이동)</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedKeyword.relatedCompanies.map((comp) => (
                      <button
                        key={comp}
                        onClick={() => onSelectCompany(comp)}
                        className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-800 hover:text-blue-950 border border-slate-200 transition flex items-center gap-1"
                        title={`${comp} 공정 흐름도 분석으로 이동`}
                      >
                        <span>{comp}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Sources */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-blue-900" />
                    <span>출처 링크 및 기술 리포트</span>
                  </div>
                  <div className="space-y-1.5">
                    {selectedKeyword.sourceLinks?.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 group transition font-medium"
                      >
                        <span className="truncate pr-2 group-hover:text-blue-900">
                          {link.title}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-900 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* 5. Fast Action to Jump to Interview */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      const firstComp = selectedKeyword.relatedCompanies[0] || '현대자동차';
                      onNavigateToInterview(firstComp, selectedKeyword.keyword);
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>이 키워드로 모의 면접 질문 풀기</span>
                    <ArrowRight className="w-4 h-4 text-sky-300" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
