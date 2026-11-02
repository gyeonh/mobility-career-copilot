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
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  companyName,
  setCompanyName,
}) => {
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [tempCompany, setTempCompany] = useState(companyName);

  const tabs: { id: TabType; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'trends',
      label: '산업 트렌드 키워드',
      icon: <TrendingUp className="w-4 h-4" />,
      desc: '실시간 검색 & 버블 클라우드',
    },
    {
      id: 'process',
      label: '기업별 제조 공정',
      icon: <Factory className="w-4 h-4" />,
      desc: '원료→출하 흐름도 & AI 자동화',
    },
    {
      id: 'interview',
      label: '면접 학습',
      icon: <GraduationCap className="w-4 h-4" />,
      desc: '전공·직무 질문 & AI 모의답변',
    },
    {
      id: 'matching',
      label: '공고 맞춤 경험 정리',
      icon: <FileCheck className="w-4 h-4" />,
      desc: '요구역량 추출 & 매칭 리포트',
    },
  ];

  const handleSaveCompany = () => {
    if (tempCompany.trim()) {
      setCompanyName(tempCompany.trim());
    }
    setIsEditingCompany(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner / Brand & Global Company Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 gap-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 flex items-center justify-center text-white shadow-sm ring-2 ring-blue-900/10">
              <Factory className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-slate-900">
                  오토커리어 <span className="text-blue-900">AutoCareer</span>
                </h1>
                <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200/60">
                  제조업 취업 도우미
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                자동차·부품·소재 맞춤형 트렌드 / 공정 / 면접 / 역량 매칭 올인원 플랫폼
              </p>
            </div>
          </div>

          {/* Synchronized Company Selector */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <Building2 className="w-3.5 h-3.5 text-blue-900 shrink-0" />
              <span className="text-slate-500 font-medium shrink-0">타깃 기업:</span>
              {isEditingCompany ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={tempCompany}
                    onChange={(e) => setTempCompany(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveCompany()}
                    autoFocus
                    placeholder="기업명 입력"
                    className="w-28 px-2 py-0.5 text-xs font-semibold bg-white border border-blue-600 rounded text-slate-900 outline-hidden"
                  />
                  <button
                    onClick={handleSaveCompany}
                    className="p-1 rounded bg-blue-900 text-white hover:bg-blue-800 transition"
                    title="저장"
                  >
                    <Check className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setTempCompany(companyName);
                    setIsEditingCompany(true);
                  }}
                  className="group flex items-center gap-1.5 text-blue-950 font-bold hover:text-blue-700 transition"
                  title="클릭하여 기업명 수정 (모든 탭에 자동 연동)"
                >
                  <span className="underline decoration-blue-300 underline-offset-2">
                    {companyName}
                  </span>
                  <Edit2 className="w-3 h-3 text-slate-400 group-hover:text-blue-700 transition" />
                </button>
              )}
            </div>

            {/* Quick popular chips dropdown / pills */}
            <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-500">
              <span className="text-slate-400">추천:</span>
              {POPULAR_COMPANIES.slice(0, 4).map((comp) => (
                <button
                  key={comp}
                  onClick={() => setCompanyName(comp)}
                  className={`px-2 py-0.5 rounded transition ${
                    companyName === comp
                      ? 'bg-blue-900 text-white font-medium shadow-xs'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {comp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Navigation Tabs */}
        <nav className="flex items-center justify-between overflow-x-auto no-scrollbar pt-1">
          <div className="flex space-x-1 sm:space-x-2 min-w-max py-2">
            {tabs.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-900 text-white shadow-sm ring-1 ring-blue-950'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <span
                    className={`p-1.5 rounded-lg transition-colors ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.icon}
                  </span>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5 leading-tight">
                      <span className={`text-[11px] font-bold ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>
                        0{idx + 1}
                      </span>
                      <span className="font-semibold">{tab.label}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};
