import React, { useState } from 'react';
import {
  CompanyProduct,
  ManufacturingProcessResponse,
  ProcessStep,
} from '../types';
import { INITIAL_MANUFACTURING_PROCESS_PRESET } from '../data/mockPresets';
import { SkeletonLoader } from './SkeletonLoader';
import {
  Factory,
  Search,
  ArrowRight,
  Cpu,
  ShieldCheck,
  Wrench,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertCircle,
  Building2,
  ChevronRight,
  Info,
  PackageCheck,
} from 'lucide-react';

interface Tab2ProcessProps {
  companyName: string;
  setCompanyName: (name: string) => void;
  onNavigateToInterview: (company: string, jobRole?: string) => void;
}

const PRESET_COMPANIES = [
  '현대자동차',
  '넥센타이어',
  '현대모비스',
  'LG에너지솔루션',
  '포스코퓨처엠',
  'HL만도',
  '현대위아',
];

export const Tab2Process: React.FC<Tab2ProcessProps> = ({
  companyName,
  setCompanyName,
  onNavigateToInterview,
}) => {
  const [inputCompany, setInputCompany] = useState(companyName);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingProcess, setIsLoadingProcess] = useState(false);
  const [products, setProducts] = useState<CompanyProduct[]>([
    {
      id: 'egmp_ev',
      name: '아이오닉 5 / 6 (E-GMP 전용 전기차 플랫폼 완성차)',
      category: '친환경 완성차',
      description: '초고장력 강판 차체와 800V 초고전압 배터리 및 PE 시스템이 탑재되는 현대자동차의 주력 글로벌 전기차 플랫폼.',
    },
    {
      id: 'hybrid_engine',
      name: '스마트스트림 하이브리드 파워트레인 / 변속기',
      category: '파워트레인',
      description: '연비와 주행 성능을 양립시킨 엔진 및 구동 모터 일체형 친환경 하이브리드 구동계 부품.',
    },
    {
      id: 'nexo_fcev',
      name: '넥쏘(NEXO) 2세대 수소전기차 연료전지 시스템',
      category: '수소 모빌리티',
      description: '수소와 산소의 전기화학 반응을 통해 전기를 생산하는 막전극접합체(MEA) 및 스택 모듈.',
    },
  ]);
  const [selectedProduct, setSelectedProduct] = useState<string>(
    INITIAL_MANUFACTURING_PROCESS_PRESET.productName
  );
  const [processData, setProcessData] = useState<ManufacturingProcessResponse | null>(
    INITIAL_MANUFACTURING_PROCESS_PRESET
  );
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Synchronize local input if prop companyName changes from other tabs
  React.useEffect(() => {
    setInputCompany(companyName);
  }, [companyName]);

  // Request representative products 1~3 for company
  const handleSearchCompanyProducts = async (compToSearch: string) => {
    const targetComp = compToSearch.trim();
    if (!targetComp) return;

    setCompanyName(targetComp);
    setInputCompany(targetComp);
    setIsLoadingProducts(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/company-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName: targetComp }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || '대표 제품을 불러오지 못했습니다.');
      }

      setProducts(json.data.products || []);
      if (json.data.products?.length > 0) {
        // Automatically fetch process for the first suggested product
        handleSelectProductAndFetchProcess(targetComp, json.data.products[0].name);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || '제품 정보 검색에 실패했습니다.');
    } finally {
      setIsLoadingProducts(false);
    }
  };

  // Fetch manufacturing flowchart for selected product
  const handleSelectProductAndFetchProcess = async (comp: string, prodName: string) => {
    setSelectedProduct(prodName);
    setIsLoadingProcess(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/manufacturing-process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName: comp, productName: prodName }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || '공정 흐름도를 생성하지 못했습니다.');
      }
      setProcessData(json.data);
      setActiveStepIndex(0);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || '공정 흐름도 생성에 실패했습니다.');
    } finally {
      setIsLoadingProcess(false);
    }
  };

  const currentStep: ProcessStep | undefined = processData?.steps?.[activeStepIndex];

  return (
    <div className="space-y-6">
      {/* Search & Input Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="p-1 rounded-md bg-blue-100 text-blue-900">
                <Factory className="w-4 h-4" />
              </span>
              <span>기업별 제조 공정 분석기</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              기업명을 입력하면 Gemini가 대표 제품 1~3개를 제안하고, 선택한 제품의 [원료 → 출하] 공정 흐름도를 분석합니다.
            </p>
          </div>

          {/* Company Search Form */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={inputCompany}
                onChange={(e) => setInputCompany(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchCompanyProducts(inputCompany)}
                placeholder="기업명 입력 (예: 넥센타이어)"
                className="w-56 sm:w-64 pl-9 pr-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-hidden transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
            <button
              onClick={() => handleSearchCompanyProducts(inputCompany)}
              disabled={isLoadingProducts || isLoadingProcess}
              className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold transition shadow-xs disabled:opacity-50"
            >
              {isLoadingProducts ? '검색 중...' : '대표 제품 탐색'}
            </button>
          </div>
        </div>

        {/* Quick Click Preset Companies */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium mr-1">빠른 선택:</span>
          {PRESET_COMPANIES.map((comp) => (
            <button
              key={comp}
              onClick={() => handleSearchCompanyProducts(comp)}
              className={`px-2.5 py-1 rounded-lg border transition ${
                companyName === comp
                  ? 'bg-blue-900 text-white border-blue-950 font-bold'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {comp}
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

      {/* Suggested Representative Products (1~3 items) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-900" />
            <span>
              <strong className="text-blue-950 font-extrabold">{companyName}</strong>의 대표 제품을 선택하세요
            </span>
          </h3>
          <span className="text-[11px] text-slate-400">하나를 선택하면 공정 흐름도가 생성됩니다</span>
        </div>

        {isLoadingProducts ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-xl bg-slate-100 animate-pulse p-4 space-y-2">
                <div className="h-4 w-1/3 bg-slate-200 rounded" />
                <div className="h-3 w-3/4 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {products.map((prod) => {
              const isSelected = selectedProduct === prod.name;
              return (
                <button
                  key={prod.id}
                  onClick={() => handleSelectProductAndFetchProcess(companyName, prod.name)}
                  disabled={isLoadingProcess}
                  className={`p-4 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-900 text-white border-blue-950 shadow-md ring-2 ring-blue-900/30'
                      : 'bg-slate-50/70 hover:bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-white/20 text-blue-100' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {prod.category}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-sky-400" />}
                    </div>
                    <h4 className="font-bold text-sm tracking-tight line-clamp-2">{prod.name}</h4>
                    <p
                      className={`text-xs mt-1.5 line-clamp-2 leading-relaxed ${
                        isSelected ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
                      {prod.description}
                    </p>
                  </div>
                  <div
                    className={`mt-3 pt-2 border-t text-[11px] font-semibold flex items-center justify-between ${
                      isSelected ? 'border-white/20 text-sky-300' : 'border-slate-200 text-blue-900'
                    }`}
                  >
                    <span>공정 흐름도 보기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Flowchart & Deep Dive Section */}
      {isLoadingProcess ? (
        <SkeletonLoader
          type="process"
          message={`[${companyName} - ${selectedProduct}]의 원료 투입부터 출하까지의 표준 제조 공정 분석 중...`}
        />
      ) : processData && processData.steps?.length > 0 ? (
        <div className="space-y-6">
          {/* Process Overview Card */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-5 text-white shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-white/10 text-sky-400">
                  <Factory className="w-4 h-4" />
                </span>
                <h3 className="font-bold text-base tracking-tight">
                  {processData.companyName} : {processData.productName}
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-blue-800 text-blue-100 font-medium">
                총 {processData.steps.length}단계 제조 파이프라인
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              {processData.processOverview}
            </p>
          </div>

          {/* Interactive Horizontal / Responsive Step Flow */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-900" />
                <span>원료 → 가공 → 조립 → 검사 → 출하 단계별 흐름도</span>
              </h4>
              <span className="text-xs text-slate-400">각 공정을 클릭하면 상세 분석이 열립니다</span>
            </div>

            {/* Scrollable Flowchart Nodes */}
            <div className="overflow-x-auto pb-4 pt-1 no-scrollbar">
              <div className="flex items-stretch gap-2 min-w-max">
                {processData.steps.map((step, idx) => {
                  const isActive = activeStepIndex === idx;
                  const isLast = idx === processData.steps.length - 1;
                  return (
                    <React.Fragment key={step.stepNumber || idx}>
                      <button
                        onClick={() => setActiveStepIndex(idx)}
                        className={`relative w-44 sm:w-52 p-4 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between ${
                          isActive
                            ? 'bg-blue-900 text-white border-blue-950 shadow-md ring-2 ring-blue-900/40'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                                isActive ? 'bg-white text-blue-950' : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {idx + 1}
                            </span>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                isActive ? 'bg-white/20 text-sky-200' : 'bg-slate-200/80 text-slate-600'
                              }`}
                            >
                              {step.phaseTag || '제조 단계'}
                            </span>
                          </div>
                          <h5 className="font-bold text-xs sm:text-sm line-clamp-2 leading-snug">
                            {step.stepName}
                          </h5>
                        </div>

                        <p
                          className={`text-[11px] line-clamp-2 mt-2 leading-tight ${
                            isActive ? 'text-blue-100' : 'text-slate-500'
                          }`}
                        >
                          {step.description}
                        </p>
                      </button>

                      {!isLast && (
                        <div className="flex items-center justify-center px-1 text-slate-300">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Deep-Dive Active Step Card */}
          {currentStep && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              {/* Step Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-blue-900 text-white font-black text-base flex items-center justify-center shrink-0 shadow-xs">
                    {currentStep.stepNumber || activeStepIndex + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-100 text-blue-900">
                        {currentStep.phaseTag}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900">
                        {currentStep.stepName}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Quick Step Navigator buttons */}
                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  <button
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-30"
                  >
                    이전 공정
                  </button>
                  <button
                    disabled={activeStepIndex === processData.steps.length - 1}
                    onClick={() =>
                      setActiveStepIndex((prev) =>
                        Math.min(processData.steps.length - 1, prev + 1)
                      )
                    }
                    className="px-3 py-1.5 rounded-lg bg-blue-900 text-white text-xs font-medium hover:bg-blue-800 disabled:opacity-30"
                  >
                    다음 공정
                  </button>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  공정 상세 개요
                </h5>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {currentStep.description}
                </p>
              </div>

              {/* 3 Core Engineering Columns: Equipment, Quality Points, AI/Automation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Key Equipment */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-xs pb-2 border-b border-slate-100">
                    <Wrench className="w-4 h-4 text-blue-900" />
                    <span>주요 설비 및 장비</span>
                  </div>
                  <ul className="space-y-1.5">
                    {currentStep.equipment?.map((eq, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-900 mt-1.5 shrink-0" />
                        <span>{eq}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Quality Control Points */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-xs pb-2 border-b border-slate-100">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>품질 관리 (QC) 핵심 포인트</span>
                  </div>
                  <ul className="space-y-1.5">
                    {currentStep.qualityPoints?.map((qp, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <span>{qp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. AI / Automation Points */}
                <div className="p-4 rounded-xl border border-blue-200/80 bg-blue-50/40 space-y-2.5">
                  <div className="flex items-center gap-2 text-blue-950 font-bold text-xs pb-2 border-b border-blue-100">
                    <Cpu className="w-4 h-4 text-blue-900" />
                    <span>AI / 자동화 & 스마트팩토리</span>
                  </div>
                  <ul className="space-y-1.5">
                    {currentStep.aiAutomationPoints?.map((ai, i) => (
                      <li key={i} className="text-xs text-blue-950 flex items-start gap-1.5">
                        <Sparkles className="w-3 h-3 text-amber-600 mt-0.5 shrink-0" />
                        <span className="font-medium">{ai}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Interview Application Tip Card */}
              {currentStep.interviewTip && (
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-amber-900">
                      현업 면접관 질문 대비 팁 (생산기술/품질 직무)
                    </h5>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      {currentStep.interviewTip}
                    </p>
                  </div>
                </div>
              )}

              {/* Fast Button to Jump to Interview with this Company */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onNavigateToInterview(processData.companyName, '생산기술 엔지니어')}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-950 text-white text-xs font-bold transition flex items-center gap-2 shadow-xs"
                >
                  <span>{processData.companyName} 맞춤형 면접 질문 학습하러 가기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
