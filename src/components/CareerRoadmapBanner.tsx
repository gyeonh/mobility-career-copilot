import React, { useState } from 'react';
import { TabType } from '../types';
import {
  TrendingUp,
  Factory,
  GraduationCap,
  FileCheck,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  Compass,
} from 'lucide-react';

interface CareerRoadmapBannerProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  companyName: string;
}

export const CareerRoadmapBanner: React.FC<CareerRoadmapBannerProps> = ({
  activeTab,
  setActiveTab,
  companyName,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const steps: {
    id: TabType;
    stepNum: string;
    title: string;
    desc: string;
    actionHint: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'trends',
      stepNum: 'STEP 1',
      title: '산업 트렌드 파악',
      desc: 'SDV, 전동화, 스마트팩토리 등 업계 최신 10대 기술 키워드 학습',
      actionHint: '면접 기출 예상 키워드 확인',
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      id: 'process',
      stepNum: 'STEP 2',
      title: '기업 제조공정 해부',
      desc: `${companyName} 대표 제품의 [원료→성형→조립→검사→출하] 6단계 공정`,
      actionHint: '설비/품질관리 포인트 파악',
      icon: <Factory className="w-4 h-4" />,
    },
    {
      id: 'interview',
      stepNum: 'STEP 3',
      title: '실전 면접 트레이닝',
      desc: '전공 기초 5문항 + 직무 실무 5문항 풀이 및 10점 만점 AI 첨삭',
      actionHint: '모범 답변 & 꼬리 질문 대비',
      icon: <GraduationCap className="w-4 h-4" />,
    },
    {
      id: 'matching',
      stepNum: 'STEP 4',
      title: '공고 경험 1:1 매칭',
      desc: '채용공고 요구 역량 5~7개 자동 추출 & 내 프로젝트 1:1 매칭표',
      actionHint: '자소서 실전 어필 문장 완성',
      icon: <FileCheck className="w-4 h-4" />,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 mb-6">
      {/* Header of Roadmap */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-blue-900 text-white">
            <Compass className="w-4 h-4 text-sky-300" />
          </span>
          <div>
            <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>자동차·제조업 취업 준비 가이드 로드맵</span>
              <span className="text-[11px] font-medium text-slate-500 hidden sm:inline">
                (4단계를 차례대로 진행하면 서류부터 1차·2차 기술면접까지 완벽 대비됩니다)
              </span>
            </h2>
          </div>
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold transition px-2 py-1 rounded-md hover:bg-slate-100"
        >
          <span>{isCollapsed ? '가이드 펼치기' : '가이드 접기'}</span>
          {isCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* 4 Steps Visual Flow */}
      {!isCollapsed && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-100">
          {steps.map((s, idx) => {
            const isActive = activeTab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`text-left p-3.5 rounded-xl border transition-all duration-150 flex flex-col justify-between ${
                  isActive
                    ? 'bg-blue-950 text-white border-blue-900 shadow-md ring-2 ring-blue-900/30'
                    : 'bg-slate-50/70 hover:bg-white text-slate-800 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded shrink-0 ${
                          isActive ? 'bg-sky-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {s.stepNum}
                      </span>
                      <h3 className="font-extrabold text-xs sm:text-sm tracking-tight truncate">
                        {s.title}
                      </h3>
                    </div>
                    <span
                      className={`p-1 rounded-md shrink-0 ${
                        isActive ? 'bg-white/10 text-sky-300' : 'bg-white text-slate-500 border border-slate-200'
                      }`}
                    >
                      {s.icon}
                    </span>
                  </div>
                  <p
                    className={`text-[11px] leading-relaxed line-clamp-2 ${
                      isActive ? 'text-blue-100' : 'text-slate-500'
                    }`}
                  >
                    {s.desc}
                  </p>
                </div>

                <div
                  className={`mt-2.5 pt-2 border-t text-[10px] font-bold flex items-center justify-between ${
                    isActive ? 'border-white/15 text-sky-300' : 'border-slate-200 text-blue-900'
                  }`}
                >
                  <span>{isActive ? '현재 단계 진행 중' : s.actionHint}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
