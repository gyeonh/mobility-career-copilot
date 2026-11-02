import React, { useState, useEffect } from 'react';
import { TabType } from './types';
import { Header } from './components/Header';
import { Tab1Trends } from './components/Tab1Trends';
import { Tab2Process } from './components/Tab2Process';
import { Tab3Interview } from './components/Tab3Interview';
import { Tab4Matching } from './components/Tab4Matching';
import {
  TrendingUp,
  Factory,
  GraduationCap,
  FileCheck,
  Building2,
  Sparkles,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('trends');
  const [companyName, setCompanyNameState] = useState<string>(() => {
    try {
      return localStorage.getItem('autocareer_company') || '현대자동차';
    } catch {
      return '현대자동차';
    }
  });
  const [presetJobRole, setPresetJobRole] = useState<string>('생산기술 엔지니어');

  const setCompanyName = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setCompanyNameState(trimmed);
    try {
      localStorage.setItem('autocareer_company', trimmed);
    } catch {
      // ignore
    }
  };

  const handleNavigateToInterview = (comp: string, topicOrRole?: string) => {
    if (comp) setCompanyName(comp);
    if (topicOrRole) {
      if (topicOrRole.includes('엔지니어') || topicOrRole.includes('품질') || topicOrRole.includes('기술')) {
        setPresetJobRole(topicOrRole);
      } else {
        setPresetJobRole(`${topicOrRole} 담당 엔지니어`);
      }
    }
    setActiveTab('interview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCompanyFromTrends = (comp: string) => {
    setCompanyName(comp);
    setActiveTab('process');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header with Tab Switcher & Global Company Synchronizer */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        companyName={companyName}
        setCompanyName={setCompanyName}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {activeTab === 'trends' && (
          <Tab1Trends
            onSelectCompany={handleSelectCompanyFromTrends}
            onNavigateToInterview={handleNavigateToInterview}
          />
        )}

        {activeTab === 'process' && (
          <Tab2Process
            companyName={companyName}
            setCompanyName={setCompanyName}
            onNavigateToInterview={handleNavigateToInterview}
          />
        )}

        {activeTab === 'interview' && (
          <Tab3Interview
            companyName={companyName}
            setCompanyName={setCompanyName}
            presetJobRole={presetJobRole}
          />
        )}

        {activeTab === 'matching' && (
          <Tab4Matching
            companyName={companyName}
            setCompanyName={setCompanyName}
          />
        )}
      </main>

      {/* Bottom Sticky Tab Bar on Mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActiveTab('trends')}
          className={`flex flex-col items-center py-1.5 px-2 rounded-lg text-[10px] font-medium transition ${
            activeTab === 'trends' ? 'text-blue-900 font-bold' : 'text-slate-500'
          }`}
        >
          <TrendingUp className="w-4 h-4 mb-0.5" />
          <span>트렌드</span>
        </button>
        <button
          onClick={() => setActiveTab('process')}
          className={`flex flex-col items-center py-1.5 px-2 rounded-lg text-[10px] font-medium transition ${
            activeTab === 'process' ? 'text-blue-900 font-bold' : 'text-slate-500'
          }`}
        >
          <Factory className="w-4 h-4 mb-0.5" />
          <span>제조공정</span>
        </button>
        <button
          onClick={() => setActiveTab('interview')}
          className={`flex flex-col items-center py-1.5 px-2 rounded-lg text-[10px] font-medium transition ${
            activeTab === 'interview' ? 'text-blue-900 font-bold' : 'text-slate-500'
          }`}
        >
          <GraduationCap className="w-4 h-4 mb-0.5" />
          <span>면접학습</span>
        </button>
        <button
          onClick={() => setActiveTab('matching')}
          className={`flex flex-col items-center py-1.5 px-2 rounded-lg text-[10px] font-medium transition ${
            activeTab === 'matching' ? 'text-blue-900 font-bold' : 'text-slate-500'
          }`}
        >
          <FileCheck className="w-4 h-4 mb-0.5" />
          <span>경험매칭</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">오토커리어 (AutoCareer)</span>
            <span>·</span>
            <span>자동차·제조업 취업 준비 올인원 어시스턴트</span>
          </div>
          <div className="text-slate-400 text-center sm:text-right">
            구글 검색 그라운딩 및 Gemini 기술 분석 모델 기반 실시간 산업 리포트
          </div>
        </div>
      </footer>
    </div>
  );
}
