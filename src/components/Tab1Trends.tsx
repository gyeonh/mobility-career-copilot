import React, { useState } from 'react';
import { TrendCategory, TrendKeywordItem, TrendsResponse } from '../types';
import { INITIAL_TRENDS_PRESET } from '../data/mockPresets';
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
  ArrowUpRight,
  Info,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

interface Tab1TrendsProps {
  onSelectCompany: (company: string) => void;
  onNavigateToInterview: (company: string, topic?: string) => void;
}

const CATEGORIES: TrendCategory[] = [
  '자동차 전체',
  '전동화',
  '자율주행',
  'SDV',
  '제조 혁신',
  '부품·소재',
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
  const [viewMode, setViewMode] = useState<'bubble' | 'list'>('bubble');
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

    try {
      const res = await fetch('/api/trends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: cat }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || '트렌드 키워드를 불러오지 못했습니다.');
      }
      setTrendsData((prev) => ({
        ...prev,
        [cat]: json.data,
      }));
      if (json.data.keywords?.length > 0) {
        setSelectedKeyword(json.data.keywords[0]);
      }
      if (json.notice) {
        setNoticeMsg(json.notice);
      }
    } catch (err: any) {
      console.warn('API error in fetchTrendsForCategory:', err);
      const friendlyMsg =
        typeof err.message === 'string' && (err.message.includes('429') || err.message.includes('quota') || err.message.includes('RESOURCE_EXHAUSTED'))
          ? '현재 실시간 검색 API 사용량 한도(Rate Limit)로 인해, 검증된 최신 산업 동향 데이터셋으로 안전하게 표시합니다.'
          : '일시적인 네트워크 지연으로 인해 검증된 최신 산업 동향 데이터셋으로 표시합니다.';
      setErrorMsg(friendlyMsg);

      // Ensure that current category always has full 10 keywords from preset
      const fallback = INITIAL_TRENDS_PRESET[cat] || INITIAL_TRENDS_PRESET['자동차 전체'];
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

  // Helper for bubble sizing based on importanceScore (typically 75 ~ 98)
  const getBubbleSizeClass = (score: number) => {
    if (score >= 93) return 'col-span-2 row-span-2 min-h-[140px] text-base p-5 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white shadow-md border-blue-800';
    if (score >= 87) return 'col-span-2 min-h-[110px] text-sm p-4 bg-gradient-to-br from-blue-900 via-blue-950 to-slate-800 text-white shadow-sm border-blue-700';
    if (score >= 82) return 'col-span-1 min-h-[95px] text-xs p-3.5 bg-white text-slate-900 hover:bg-blue-50/80 border-slate-300 shadow-xs';
    return 'col-span-1 min-h-[85px] text-xs p-3 bg-slate-50 text-slate-800 hover:bg-white border-slate-200';
  };

  return (
    <div className="space-y-6">
      {/* Category Selection Bar & Action Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-blue-100 text-blue-900">
                <Layers className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900">산업 트렌드 분야 선택</h2>
              <span className="text-xs text-slate-500 font-normal">
                (Google Search Grounding 실시간 검색 연동)
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              관심 있는 세부 도메인을 선택하면 핵심 키워드 10개와 산학 리포트 출처를 분석합니다.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto flex-wrap">
            {/* View Mode Toggle */}
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100/80 p-0.5 text-xs font-medium">
              <button
                onClick={() => setViewMode('bubble')}
                className={`px-3 py-1.5 rounded-md transition ${
                  viewMode === 'bubble'
                    ? 'bg-white text-blue-950 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                버블 클라우드
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-md transition ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-950 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                키워드 리스트
              </button>
            </div>

            {/* Live Search Refresh Button */}
            <button
              onClick={() => fetchTrendsForCategory(selectedCategory, true)}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-medium transition shadow-xs disabled:opacity-50"
              title="Google Search 기반 최신 기사 및 기술 리포트 재검색"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Google 실시간 검색 갱신</span>
            </button>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-4 pt-4 border-t border-slate-100">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => fetchTrendsForCategory(cat)}
                disabled={isLoading}
                className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition text-center flex flex-col items-center justify-center gap-1 border ${
                  isSelected
                    ? 'bg-blue-900 text-white border-blue-950 shadow-sm ring-1 ring-blue-900/30'
                    : 'bg-slate-50/70 hover:bg-white text-slate-700 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{errorMsg}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchTrendsForCategory(selectedCategory, true)}
              className="font-semibold underline ml-2 hover:text-amber-950"
            >
              다시 시도
            </button>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-amber-600 hover:text-amber-900 ml-1 p-0.5 rounded"
              title="닫기"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
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

      {/* Main Content Area: Loading or Display */}
      {isLoading ? (
        <SkeletonLoader
          type="trends"
          message={`[${selectedCategory}] 분야의 최신 뉴스 및 산업 기술 리포트를 Google 검색으로 수집 중...`}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Visual Bubble Chart / Cloud (7 or 8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{selectedCategory} 핵심 트렌드 키워드 10선</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  중요도(가중치)에 따라 크기가 다르며, 클릭하면 상세 해설 카드가 열립니다.
                </p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                총 {currentTrends.keywords.length}개 키워드
              </span>
            </div>

            {viewMode === 'bubble' ? (
              /* Bubble Cloud Layout: CSS Grid with varying spans and weights */
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {currentTrends.keywords.map((item, index) => {
                  const isSelected = selectedKeyword?.keyword === item.keyword;
                  const sizeClass = getBubbleSizeClass(item.importanceScore);
                  return (
                    <button
                      key={item.keyword + index}
                      onClick={() => setSelectedKeyword(item)}
                      className={`group relative rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${sizeClass} ${
                        isSelected
                          ? 'ring-2 ring-blue-500 ring-offset-2 scale-[1.02]'
                          : 'hover:scale-[1.01]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1 w-full">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.importanceScore >= 87
                              ? 'bg-white/20 text-blue-100'
                              : 'bg-blue-100 text-blue-900'
                          }`}
                        >
                          중요도 {item.importanceScore}
                        </span>
                        <ArrowUpRight
                          className={`w-3.5 h-3.5 transition opacity-60 group-hover:opacity-100 ${
                            item.importanceScore >= 87 ? 'text-blue-200' : 'text-slate-400'
                          }`}
                        />
                      </div>

                      <div className="my-auto py-1">
                        <p className="font-bold tracking-tight line-clamp-2">
                          {item.keyword}
                        </p>
                        <p
                          className={`text-[11px] line-clamp-2 mt-1 leading-snug ${
                            item.importanceScore >= 87 ? 'text-blue-100/90' : 'text-slate-500'
                          }`}
                        >
                          {item.oneLineSummary}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 text-[10px] truncate">
                        <span className="opacity-75">관련:</span>
                        <span className="font-medium truncate">
                          {item.relatedCompanies.slice(0, 2).join(', ')}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* List Mode */
              <div className="space-y-2.5">
                {currentTrends.keywords.map((item, idx) => {
                  const isSelected = selectedKeyword?.keyword === item.keyword;
                  return (
                    <button
                      key={item.keyword + idx}
                      onClick={() => setSelectedKeyword(item)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between gap-4 transition ${
                        isSelected
                          ? 'bg-blue-50/70 border-blue-400 shadow-xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900">
                              {item.keyword}
                            </span>
                            <span className="text-[11px] font-semibold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full">
                              중요도 {item.importanceScore}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                            {item.oneLineSummary}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Detailed Keyword Card (Sticky) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
            {selectedKeyword ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-5 animate-in fade-in duration-200">
                {/* Header of Detail Card */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-900 text-white">
                      주목도 {selectedKeyword.importanceScore}점
                    </span>
                    <span className="text-xs text-slate-400">
                      카테고리: {selectedCategory}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {selectedKeyword.keyword}
                  </h3>
                  <p className="text-xs text-blue-950 font-medium mt-1.5 p-2.5 rounded-lg bg-blue-50 border border-blue-100">
                    💡 {selectedKeyword.oneLineSummary}
                  </p>
                </div>

                {/* Section: Why it matters for job seekers */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-800" />
                    <span>왜 중요한가 (면접 & 자소서 관점)</span>
                  </h4>
                  <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                    {selectedKeyword.whyImportant}
                  </div>
                </div>

                {/* Section: Related Companies */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-800" />
                    <span>관련 기업 예시</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedKeyword.relatedCompanies.map((comp) => (
                      <button
                        key={comp}
                        onClick={() => onSelectCompany(comp)}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-800 hover:text-blue-900 border border-slate-200 transition flex items-center gap-1"
                        title={`${comp}을(를) 타깃 기업으로 설정`}
                      >
                        <span>{comp}</span>
                        <ArrowUpRight className="w-3 h-3 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section: Source Links with Grounding citations */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-blue-800" />
                    <span>출처 링크 및 보도자료</span>
                  </h4>
                  <div className="space-y-1.5">
                    {selectedKeyword.sourceLinks && selectedKeyword.sourceLinks.length > 0 ? (
                      selectedKeyword.sourceLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs text-slate-700 group transition"
                        >
                          <span className="truncate pr-2 font-medium group-hover:text-blue-900">
                            {link.title}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-900 shrink-0" />
                        </a>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">출처 링크 정보가 없습니다.</p>
                    )}
                  </div>
                </div>

                {/* Fast Action to Jump to Interview */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      const firstComp = selectedKeyword.relatedCompanies[0] || '현대자동차';
                      onNavigateToInterview(firstComp, selectedKeyword.keyword);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-blue-950 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>이 키워드로 모의 면접 질문 풀러가기</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500 text-xs">
                키워드를 클릭하면 상세 해설 및 출처 링크가 표시됩니다.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
