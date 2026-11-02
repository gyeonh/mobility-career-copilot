import React, { useState } from 'react';
import {
  CompanyProduct,
  ManufacturingProcessResponse,
  ProcessStep,
} from '../types';
import { INITIAL_MANUFACTURING_PROCESS_PRESET } from '../data/mockPresets';
import { safeApiPost } from '../utils/apiClient';
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
  Target,
  Workflow,
  Check,
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
  const [infoNotice, setInfoNotice] = useState<string | null>(null);

  React.useEffect(() => {
    setInputCompany(companyName);
  }, [companyName]);

  const handleSearchCompanyProducts = async (compToSearch: string) => {
    const targetComp = compToSearch.trim();
    if (!targetComp) return;

    setCompanyName(targetComp);
    setInputCompany(targetComp);
    setIsLoadingProducts(true);
    setErrorMessage(null);
    setInfoNotice(null);

    const fallbackProductsData = {
      companyName: targetComp,
      companyDescription: `${targetComp}의 스마트 제조 라인 및 주력 포트폴리오입니다.`,
      products: [
        {
          id: 'prod_1',
          name: `${targetComp} 친환경 스마트 모빌리티 핵심 부품`,
          category: '주력 양산 제품',
          description: `${targetComp}의 고효율 스마트 팩토리에서 양산되는 핵심 모듈입니다.`,
        },
        {
          id: 'prod_2',
          name: `${targetComp} 지능형 제어 및 차세대 시스템`,
          category: '전자/샤시',
          description: '스마트팩토리 자동화 라인과 연계된 고정밀 부품입니다.',
        },
      ],
    };

    try {
      const response = await safeApiPost(
        '/api/company-products',
        { companyName: targetComp },
        fallbackProductsData,
        6000
      );

      const prods = response.data?.products || fallbackProductsData.products;
      setProducts(prods);
      if (response.notice) {
        setInfoNotice(response.notice);
      }
      if (prods.length > 0) {
        handleSelectProductAndFetchProcess(targetComp, prods[0].name);
      }
    } catch (err: any) {
      console.warn('handleSearchCompanyProducts:', err);
      setProducts(fallbackProductsData.products);
      handleSelectProductAndFetchProcess(targetComp, fallbackProductsData.products[0].name);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleSelectProductAndFetchProcess = async (comp: string, prodName: string) => {
    setSelectedProduct(prodName);
    setIsLoadingProcess(true);
    setErrorMessage(null);

    const fallbackProcess: ManufacturingProcessResponse = {
      ...INITIAL_MANUFACTURING_PROCESS_PRESET,
      companyName: comp,
      productName: prodName,
    };

    try {
      const response = await safeApiPost<ManufacturingProcessResponse>(
        '/api/manufacturing-process',
        { companyName: comp, productName: prodName },
        fallbackProcess,
        6000
      );

      setProcessData(response.data || fallbackProcess);
      setActiveStepIndex(0);
      if (response.notice) {
        setInfoNotice(response.notice);
      }
    } catch (err: any) {
      console.warn('handleSelectProductAndFetchProcess:', err);
      setProcessData(fallbackProcess);
      setActiveStepIndex(0);
    } finally {
      setIsLoadingProcess(false);
    }
  };

  const currentStep: ProcessStep | undefined = processData?.steps?.[activeStepIndex];

  return (
    <div className="space-y-6">
      {/* Top Banner: Purpose & Company Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-950 text-white flex items-center justify-center text-xs font-black">
                2
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                기업별 대표 제조 공정 해부
              </h2>
              <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                원료 투입 → 최종 출하 순서
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              지원하려는 회사를 입력하면 Gemini가 대표 주력 생산 제품을 제시하고, 실제 양산 라인의 5~7단계 공정 흐름도와 설비/품질관리 포인트를 해설합니다.
            </p>
          </div>

          {/* Company Search Form */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            <div className="relative">
              <input
                type="text"
                value={inputCompany}
                onChange={(e) => setInputCompany(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchCompanyProducts(inputCompany)}
                placeholder="기업명 입력 (예: 현대자동차)"
                className="w-48 sm:w-56 pl-9 pr-3 py-2 text-xs sm:text-sm font-bold rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-950 focus:ring-1 focus:ring-blue-950 outline-hidden transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
            <button
              onClick={() => handleSearchCompanyProducts(inputCompany)}
              disabled={isLoadingProducts || isLoadingProcess}
              className="px-4 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs sm:text-sm font-bold transition shadow-xs disabled:opacity-50 shrink-0"
            >
              {isLoadingProducts ? '검색 중...' : '대표 제품 탐색'}
            </button>
          </div>
        </div>

        {/* Quick Click Preset Companies */}
        <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-bold mr-1">추천 기업 바로가기:</span>
          {PRESET_COMPANIES.map((comp) => (
            <button
              key={comp}
              onClick={() => handleSearchCompanyProducts(comp)}
              className={`px-2.5 py-1 rounded-lg border font-medium transition ${
                companyName === comp
                  ? 'bg-blue-950 text-white border-blue-950 font-bold shadow-xs'
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

      {infoNotice && (
        <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-900 text-xs flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0 text-blue-700" />
          <span className="font-medium">{infoNotice}</span>
        </div>
      )}

      {/* STEP 1: Representative Products Selection */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black px-2 py-0.5 rounded bg-blue-100 text-blue-950">
              STEP 1
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
              <strong className="text-blue-950 font-black">{companyName}</strong>의 대표 제품을 선택하세요
            </h3>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            제품을 클릭하면 원료부터 출하까지의 공정 흐름도가 자동 생성됩니다
          </span>
        </div>

        {isLoadingProducts ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 rounded-xl bg-slate-100 animate-pulse p-4 space-y-2">
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
                  className={`p-4 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-blue-950 text-white border-blue-900 shadow-md ring-2 ring-blue-900/40'
                      : 'bg-slate-50/70 hover:bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isSelected ? 'bg-sky-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {prod.category}
                      </span>
                      {isSelected && (
                        <span className="text-[11px] font-bold text-sky-300 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>선택됨</span>
                        </span>
                      )}
                    </div>
                    <h4 className="font-extrabold text-sm sm:text-base tracking-tight line-clamp-2">
                      {prod.name}
                    </h4>
                    <p
                      className={`text-xs mt-1.5 line-clamp-2 leading-relaxed ${
                        isSelected ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
                      {prod.description}
                    </p>
                  </div>

                  <div
                    className={`mt-3 pt-2.5 border-t text-xs font-bold flex items-center justify-between ${
                      isSelected ? 'border-white/20 text-sky-300' : 'border-slate-200 text-blue-950'
                    }`}
                  >
                    <span>{isSelected ? '공정 흐름도 분석 중' : '이 제품의 공정 흐름도 보기'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* STEP 2: Manufacturing Flowchart & In-depth Technical Cards */}
      {isLoadingProcess ? (
        <SkeletonLoader
          type="process"
          message={`[${companyName} - ${selectedProduct}]의 원료 투입부터 출하까지의 표준 제조 공정 분석 중...`}
        />
      ) : processData && processData.steps?.length > 0 ? (
        <div className="space-y-6">
          {/* Process Overview Hero Bar */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-5 sm:p-6 text-white shadow-md space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-2 py-0.5 rounded bg-sky-400 text-slate-950">
                  STEP 2
                </span>
                <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                  {processData.companyName} : {processData.productName}
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-blue-800 text-blue-100 font-semibold">
                원료 투입 → 최종 출하 (총 {processData.steps.length}단계 공정)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              {processData.processOverview}
            </p>
          </div>

          {/* Timeline Stepper Nodes */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Workflow className="w-4 h-4 text-blue-950" />
                <span>원료 → 가공 → 조립 → 검사 → 출하 단계별 공정 타임라인</span>
              </h4>
              <span className="text-xs text-slate-400">
                원하는 단계를 클릭하면 설비·QC 분석이 아래에 표시됩니다
              </span>
            </div>

            {/* Stepper Grid / Scrollable Bar */}
            <div className="overflow-x-auto pb-2 no-scrollbar">
              <div className="flex items-stretch gap-2 min-w-max">
                {processData.steps.map((step, idx) => {
                  const isActive = activeStepIndex === idx;
                  const isLast = idx === processData.steps.length - 1;
                  return (
                    <React.Fragment key={step.stepNumber || idx}>
                      <button
                        onClick={() => setActiveStepIndex(idx)}
                        className={`relative w-44 sm:w-52 p-4 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between cursor-pointer ${
                          isActive
                            ? 'bg-blue-950 text-white border-blue-900 shadow-md ring-2 ring-blue-900/40'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${
                                isActive ? 'bg-sky-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              0{idx + 1}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                isActive ? 'bg-white/15 text-sky-200' : 'bg-slate-200/80 text-slate-600'
                              }`}
                            >
                              {step.phaseTag || '제조 단계'}
                            </span>
                          </div>
                          <h5 className="font-extrabold text-xs sm:text-sm line-clamp-2 leading-snug">
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

          {/* Active Step Deep-Dive Breakdown */}
          {currentStep && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-6">
              {/* Step Title Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-blue-950 text-sky-300 font-black text-lg flex items-center justify-center shrink-0 shadow-xs">
                    {activeStepIndex + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-950">
                        {currentStep.phaseTag}
                      </span>
                      <h4 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                        {currentStep.stepName}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Prev / Next buttons */}
                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  <button
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30"
                  >
                    ← 이전 공정
                  </button>
                  <button
                    disabled={activeStepIndex === processData.steps.length - 1}
                    onClick={() =>
                      setActiveStepIndex((prev) =>
                        Math.min(processData.steps.length - 1, prev + 1)
                      )
                    }
                    className="px-3.5 py-2 rounded-xl bg-blue-950 text-white text-xs font-bold hover:bg-blue-900 disabled:opacity-30"
                  >
                    다음 공정 →
                  </button>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  공정 상세 작업 내용
                </div>
                <p className="font-medium">{currentStep.description}</p>
              </div>

              {/* 3 Core Engineering Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Equipment */}
                <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs sm:text-sm pb-2 border-b border-slate-100">
                    <Wrench className="w-4 h-4 text-blue-950" />
                    <span>주요 설비 및 장비</span>
                  </div>
                  <ul className="space-y-2">
                    {currentStep.equipment?.map((eq, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-950 mt-1.5 shrink-0" />
                        <span className="font-medium leading-relaxed">{eq}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Quality Control */}
                <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs sm:text-sm pb-2 border-b border-slate-100">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>품질 관리(QC) 포인트</span>
                  </div>
                  <ul className="space-y-2">
                    {currentStep.qualityPoints?.map((qp, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <span className="font-medium leading-relaxed">{qp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. AI / Automation */}
                <div className="p-4 sm:p-5 rounded-xl border border-blue-200 bg-blue-50/50 space-y-3">
                  <div className="flex items-center gap-2 text-blue-950 font-extrabold text-xs sm:text-sm pb-2 border-b border-blue-100">
                    <Cpu className="w-4 h-4 text-blue-900" />
                    <span>AI & 스마트팩토리 자동화</span>
                  </div>
                  <ul className="space-y-2">
                    {currentStep.aiAutomationPoints?.map((ai, i) => (
                      <li key={i} className="text-xs text-blue-950 flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                        <span className="font-semibold leading-relaxed">{ai}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Interview Application Tip */}
              {currentStep.interviewTip && (
                <div className="p-4 sm:p-5 rounded-xl bg-amber-50/90 border border-amber-200 flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-amber-100 text-amber-900 shrink-0 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs sm:text-sm font-extrabold text-amber-950">
                      기술면접관 질문 대비 핵심 답변 팁
                    </h5>
                    <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                      {currentStep.interviewTip}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Button: Jump to Interview */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onNavigateToInterview(processData.companyName, '생산기술 엔지니어')}
                  className="px-5 py-3 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs sm:text-sm font-bold transition flex items-center gap-2 shadow-xs"
                >
                  <span>{processData.companyName} 직무 면접 질문 풀러 가기</span>
                  <ArrowRight className="w-4 h-4 text-sky-300" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
