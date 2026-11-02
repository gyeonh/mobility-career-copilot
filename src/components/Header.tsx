import React, { useState } from 'react';
import { TabType } from '../types';
import {
  TrendingUp,
  Factory,
  GraduationCap,
  FileCheck,
  Building2,
  Check,
  Edit2,
  ChevronDown,
} from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  companyName: string;
  setCompanyName: (name: string) => void;
}

const POPULAR_COMPANIES = [
  '현대자동차',
  '기아',
  '현대모비스',
  '넥센타이어',
  'LG에너지솔루션',
  'HL만도',
  '포스코퓨처엠',
  '현대위아',
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  companyName,
  setCompanyName,
}) => {
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [tempCompany, setTempCompany] = useState(companyName);
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);

  const tabs: { id: TabType; step: string; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'trends',
      step: '1단계',
      label: '산업 트렌드',
      icon: <TrendingUp className="w-4 h-4" />,
      desc: '최신 이슈 & 키워드',
    },
    {
      id: 'process',
      step: '2단계',
      label: '기업 제조공정',
      icon: <Factory className="w-4 h-4" />,
      desc: '원료→출하 흐름도',
    },
    {
      id: 'interview',
      step: '3단계',
      label: '면접 학습',
      icon: <GraduationCap className="w-4 h-4" />,
      desc: '전공·직무 기출 & AI 채점',
    },
    {
      id: 'matching',
      step: '4단계',
      label: '공고 경험매칭',
      icon: <FileCheck className="w-4 h-4" />,
      desc: '역량 매칭 & 어필 문장',
    },
  ];

  const handleSaveCompany = () => {
    if (tempCompany.trim()) {
      setCompanyName(tempCompany.trim());
    }
    setIsEditingCompany(false);
    setShowCompanyMenu(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navbar */}
        <div className="flex items-center justify-between py-3 gap-4">
          {/* Zone 1: Brand & Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-blue-950 flex items-center justify-center text-white shadow-xs">
              <Factory className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                  오토커리어 <span className="text-blue-900 font-extrabold">AutoCareer</span>
                </span>
                <span className="hidden sm:inline text-[11px] font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                  자동차·제조업 취준 도우미
                </span>
              </div>
            </div>
          </div>

          {/* Zone 2: 4-Step Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-950 text-white shadow-sm font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <span className={`text-[10px] ${isActive ? 'text-sky-300' : 'text-slate-400'}`}>
                    {tab.step}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Global Target Company Synchronizer */}
          <div className="relative shrink-0">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs shadow-xs">
              <Building2 className="w-3.5 h-3.5 text-blue-900 shrink-0" />
              <span className="text-slate-500 font-medium">분석 기업:</span>

              {isEditingCompany ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={tempCompany}
                    onChange={(e) => setTempCompany(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveCompany()}
                    autoFocus
                    placeholder="기업명 입력"
                    className="w-24 px-1.5 py-0.5 text-xs font-bold bg-white border border-blue-900 rounded text-slate-900 outline-hidden"
                  />
                  <button
                    onClick={handleSaveCompany}
                    className="p-1 rounded bg-blue-900 text-white hover:bg-blue-800 transition"
                  >
                    <Check className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowCompanyMenu(!showCompanyMenu)}
                  className="flex items-center gap-1 font-black text-blue-950 hover:text-blue-700 transition"
                  title="클릭하여 기업 변경"
                >
                  <span className="underline decoration-blue-300 underline-offset-2">
                    {companyName}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
              )}
            </div>

            {/* Dropdown Menu for Quick Company Selection */}
            {showCompanyMenu && !isEditingCompany && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 p-2 z-50 text-xs">
                <div className="px-2 py-1.5 text-slate-400 font-semibold text-[11px] border-b border-slate-100 flex items-center justify-between">
                  <span>추천 타깃 기업 선택</span>
                  <button
                    onClick={() => {
                      setTempCompany(companyName);
                      setIsEditingCompany(true);
                      setShowCompanyMenu(false);
                    }}
                    className="text-blue-900 hover:underline font-bold"
                  >
                    직접 입력
                  </button>
                </div>
                <div className="py-1 space-y-0.5 max-h-48 overflow-y-auto">
                  {POPULAR_COMPANIES.map((comp) => (
                    <button
                      key={comp}
                      onClick={() => {
                        setCompanyName(comp);
                        setShowCompanyMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                        companyName === comp
                          ? 'bg-blue-50 text-blue-950 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{comp}</span>
                      {companyName === comp && <Check className="w-3.5 h-3.5 text-blue-900" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Tab Bar Header Row */}
        <div className="md:hidden pb-2 overflow-x-auto no-scrollbar">
          <div className="flex gap-1.5 min-w-max">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-950 text-white font-bold'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <span className={`text-[10px] ${isActive ? 'text-sky-300' : 'text-slate-400'}`}>
                    {tab.step}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
