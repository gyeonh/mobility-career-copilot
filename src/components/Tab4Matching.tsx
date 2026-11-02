import React, { useState } from 'react';
import {
  CompetencyMatchItem,
  MatchingResultResponse,
} from '../types';
import { INITIAL_MATCHING_PRESET } from '../data/mockPresets';
import { SkeletonLoader } from './SkeletonLoader';
import {
  FileCheck,
  Search,
  Sparkles,
  Copy,
  Download,
  Check,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  HelpCircle,
  Building2,
  RefreshCw,
  ArrowRight,
  TrendingUp,
  Award,
} from 'lucide-react';

interface Tab4MatchingProps {
  companyName: string;
  setCompanyName: (name: string) => void;
}

const SAMPLE_JOB_POSTINGS: Record<string, { title: string; text: string }> = {
  hyundai_smart_factory: {
    title: '현대자동차 스마트팩토리 AI 엔지니어 공고',
    text: `[현대자동차] 스마트팩토리 제조 AI/DX 엔지니어 채용

[담당 업무]
1. 프레스/차체/도장/의장 제조 라인 실시간 시계열 센서 데이터 수집 및 예지보전(PdM) 모델 개발
2. 머신비전 딥러닝 기반 제품 표면 불량(스크래치, 도막 불균일, 조립 갭) 자동 검사 시스템 구축
3. 제조 현장 에지(Edge) 디바이스 배포를 위한 딥러닝 모델 경량화(TensorRT) 및 저지연 추론 파이프라인
4. 산업용 통신(OPC-UA, Modbus, MQTT) 연동 및 MES/SCADA 데이터베이스 적재
5. 생산기술 및 품질 관리 현업 부서와의 원활한 협업을 통한 PoC 검증 및 양산 전개

[지원 자격 및 우대 사항]
- 컴퓨터공학, 기계공학, 산업공학 또는 관련 분야 전공자
- PyTorch/TensorFlow 기반 실무 모델 개발 및 서빙 경험자
- 제조 데이터 불균형(Anomaly Detection) 해결 경험 우대
- IATF 16949 자동차 품질 표준 및 통계적 공정관리(SPC) 이해자 우대`,
  },
  kia_production_tech: {
    title: '기아 AutoLand 생산기술 엔지니어 공고',
    text: `[기아] AutoLand 화성/광명 생산기술(전동화/차체) 엔지니어 채용

[담당 업무]
1. 차세대 전용 전기차(PBV) 전용 양산 라인 설비 셋업 및 공정 설계
2. 대형 기가캐스팅 및 알루미늄-초고장력강 이종 접합(SPR, 레이저) 공법 개발
3. 생산 라인 라인 밸런싱(Line Balancing) 최적화 및 택트 타임(Tact Time) 단축
4. AMR/AGV 무인 물류 반송 시스템과 유연 셀(Cell) 생산 체계 안정화
5. 신차 개발 단계 품질 육성(Cpk 1.67 달성) 및 4M 변화점 관리

[지원 자격 및 우대 사항]
- 기계공학, 금속/재료공학, 메카트로닉스 관련 전공자
- 3D CAD(CATIA, NX) 및 소성가공/유동 시뮬레이션 활용 가능자 우대
- Six Sigma Green Belt 이상 또는 품질관리기사 자격 보유자 우대`,
  },
};

const SAMPLE_USER_EXPERIENCES = `1. [스마트 모빌리티 캡스톤 디자인]:
- 모터 가속도계 센서의 진동 데이터 20만 건을 수집하고, FFT 변환 후 LSTM Autoencoder 이상치 탐지 모델을 개발함. 베어링 결함 사전 감지 F1-Score 0.93 달성.
- 연구실 소형 CNC 선반에 아두이노와 라즈베리파이를 연결하여 OPC-UA 프로토콜 기반 실시간 온도/전류 대시보드 구축.

2. [제조 AI 데이터 해커톤 우수상]:
- 금속 표면 스크래치 결함 검출 과제에서 비지도 학습(PatchCore)과 CutPaste 증강 기법을 도입하여 소량의 불량 데이터만으로 정상 대비 결함 판정 과검률 3.2% 달성.
- YOLOv8 모델을 NVIDIA Jetson Orin Nano에 배포하기 위해 TensorRT INT8 양자화를 수행해 추론 속도를 4배 향상(11ms).

3. [부품사 공정 인터뷰 및 산학 협력]:
- 지역 중소 자동차 부품 가공 업체를 방문하여 작업자와 현장 관리자의 피로도 유발 요인을 청취하고, 텍스트 대신 직관적인 터치 GUI 검사기 프로토타입 제작.

4. [전공 과목 및 자격증]:
- 기계공작법, 재료역학, 열역학, 통계학 A+ 이수.
- Python, C++, SQL 능숙.`;

export const Tab4Matching: React.FC<Tab4MatchingProps> = ({
  companyName,
  setCompanyName,
}) => {
  const [jobPostingText, setJobPostingText] = useState<string>(
    SAMPLE_JOB_POSTINGS.hyundai_smart_factory.text
  );
  const [userExperiencesText, setUserExperiencesText] = useState<string>(
    SAMPLE_USER_EXPERIENCES
  );
  const [matchingResult, setMatchingResult] = useState<MatchingResultResponse>(
    INITIAL_MATCHING_PRESET
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const handleRunMatching = async () => {
    if (!jobPostingText.trim()) {
      alert('채용 공고 내용을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/match-experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: companyName || '미지정',
          jobPostingText: jobPostingText.trim(),
          userExperiencesText: userExperiencesText.trim(),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || '공고 매칭 분석에 실패했습니다.');
      }
      setMatchingResult(json.data);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || '매칭 분석 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthBadge = (strength: string) => {
    switch (strength) {
      case '상':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case '중':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case '하':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case '보완 필요':
      default:
        return 'bg-rose-100 text-rose-800 border-rose-300 font-bold';
    }
  };

  // Generate text report for clipboard or download
  const generateFormattedReport = (): string => {
    let report = `==========================================================\n`;
    report += `[오토커리어] 채용 공고 맞춤 경험 정리 리포트\n`;
    report += `기업명: ${companyName}\n`;
    report += `분석 직무: ${matchingResult.extractedRoleTitle}\n`;
    report += `전체 매칭률: ${matchingResult.overallMatchRate}%\n`;
    report += `총평: ${matchingResult.summaryAnalysis}\n`;
    report += `==========================================================\n\n`;

    matchingResult.competencyMatches.forEach((item, idx) => {
      report += `[역량 0${idx + 1}] ${item.competency} (${item.importance})\n`;
      report += `- 매칭 강도: ${item.matchStrength}\n`;
      report += `- 매칭 경험: ${item.matchedExperience}\n`;
      report += `- 실전 어필 문장: "${item.appealSentenceExample}"\n`;
      if (item.gapSuggestion) {
        report += `- 보완 방법 제안: ${item.gapSuggestion}\n`;
      }
      report += `----------------------------------------------------------\n`;
    });

    return report;
  };

  // Action: Copy to clipboard
  const handleCopyReport = async () => {
    try {
      const text = generateFormattedReport();
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  // Action: Download text file
  const handleDownloadReport = () => {
    const text = generateFormattedReport();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `오토커리어_경험매칭리포트_${companyName || '기업'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Preset Loader */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="p-1 rounded-md bg-blue-100 text-blue-900">
                <FileCheck className="w-4 h-4" />
              </span>
              <span>채용 공고 맞춤 경험 정리 & 역량 매칭 분석기</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              공고 본문에서 요구 역량 5~7개를 자동 추출하고, 나의 경험과 1:1 매칭하여 [강도(상/중/하/보완필요)] 및 [실전 어필 문장]을 제시합니다.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto flex-wrap">
            <span className="text-xs text-slate-400 font-medium">샘플 공고:</span>
            <button
              onClick={() => {
                setJobPostingText(SAMPLE_JOB_POSTINGS.hyundai_smart_factory.text);
                setCompanyName('현대자동차');
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition"
            >
              현대차 스마트팩토리
            </button>
            <button
              onClick={() => {
                setJobPostingText(SAMPLE_JOB_POSTINGS.kia_production_tech.text);
                setCompanyName('기아');
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition"
            >
              기아 생산기술
            </button>
          </div>
        </div>

        {/* 2-Column Input Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          {/* Left Input: Job Posting */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-900" />
                <span>채용 공고 텍스트 (JD 붙여넣기)</span>
              </label>
              <span className="text-[11px] text-slate-400">
                {jobPostingText.length}자
              </span>
            </div>
            <textarea
              rows={7}
              value={jobPostingText}
              onChange={(e) => setJobPostingText(e.target.value)}
              placeholder="채용 공고의 담당 업무, 지원 자격, 우대 사항을 그대로 복사해 붙여넣으세요."
              className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-hidden transition leading-relaxed font-mono"
            />
          </div>

          {/* Right Input: User Experiences */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-blue-900" />
                  <span>내 경험 목록 (프로젝트, 인턴, 학과 실습 등)</span>
                </label>
                <button
                  onClick={() => setUserExperiencesText(SAMPLE_USER_EXPERIENCES)}
                  className="text-[10px] text-blue-900 hover:underline font-semibold"
                >
                  (샘플 경험 채우기)
                </button>
              </div>
              <span className="text-[11px] text-slate-400">
                {userExperiencesText.length}자
              </span>
            </div>
            <textarea
              rows={7}
              value={userExperiencesText}
              onChange={(e) => setUserExperiencesText(e.target.value)}
              placeholder="참여한 프로젝트, 인턴, 연구, 동아리, 전공 실습 경험을 자유로운 개조식으로 입력하세요."
              className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-hidden transition leading-relaxed"
            />
          </div>
        </div>

        {/* Analyze Button */}
        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={handleRunMatching}
            disabled={isLoading || !jobPostingText.trim()}
            className="px-6 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs sm:text-sm font-bold transition shadow-sm disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Gemini가 공고 역량 추출 및 경험 매칭 중...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-sky-300" />
                <span>공고 역량 추출 및 1:1 매칭 분석 실행</span>
              </>
            )}
          </button>
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

      {/* Main Matching Output Section */}
      {isLoading ? (
        <SkeletonLoader
          type="matching"
          message="채용 공고에서 5~7개의 직무 역량을 추출하고, 지원자 경험과의 일치도 및 보완점을 분석 중..."
        />
      ) : matchingResult ? (
        <div className="space-y-6">
          {/* Summary Dashboard Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-100 text-blue-900">
                    분석 직무
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {matchingResult.extractedRoleTitle}
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  타깃 기업: <strong className="text-blue-950">{companyName || '미지정'}</strong>
                </p>
              </div>

              {/* Match Rate Gauge */}
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
                <div className="text-right">
                  <div className="text-[11px] text-slate-500 font-medium">종합 매칭 일치도</div>
                  <div className="text-xl font-black text-blue-950">
                    {matchingResult.overallMatchRate}%
                  </div>
                </div>
                <div className="w-14 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-700 to-sky-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, matchingResult.overallMatchRate)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900 font-bold block mb-1">
                📌 종합 컨설팅 총평
              </strong>
              {matchingResult.summaryAnalysis}
            </div>

            {/* Export Action Buttons */}
            <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={handleCopyReport}
                className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5 shadow-xs"
              >
                {copySuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">복사 완료!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>결과 전체 복사</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadReport}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-blue-950 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>텍스트 파일로 내려받기</span>
              </button>
            </div>
          </div>

          {/* 1:1 Matching Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-900" />
                <span>
                  공고 요구 역량 5~7개 vs 내 경험 1:1 매칭 & 어필 문장 표
                </span>
              </h4>
              <span className="text-xs text-slate-400">
                총 {matchingResult.competencyMatches?.length || 0}개 요구 역량 분석
              </span>
            </div>

            {/* Desktop Table View */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                    <th className="py-3 px-4 w-1/4">공고 요구 역량</th>
                    <th className="py-3 px-4 w-1/4">매칭된 내 경험</th>
                    <th className="py-3 px-3 w-24 text-center">매칭 강도</th>
                    <th className="py-3 px-4 w-1/3">실전 어필 문장 예시 & 보완점</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {matchingResult.competencyMatches?.map((item, idx) => {
                    const isWeak = item.matchStrength === '보완 필요' || item.matchStrength === '하';
                    return (
                      <tr
                        key={item.id || idx}
                        className={`hover:bg-slate-50/70 transition ${
                          isWeak ? 'bg-amber-50/20' : ''
                        }`}
                      >
                        {/* Col 1: 요구 역량 */}
                        <td className="py-4 px-4 align-top">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                item.importance === '필수'
                                  ? 'bg-rose-100 text-rose-800'
                                  : item.importance === '우대'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {item.importance}
                            </span>
                          </div>
                          <div className="font-bold text-slate-900 leading-snug">
                            {item.competency}
                          </div>
                        </td>

                        {/* Col 2: 매칭 경험 */}
                        <td className="py-4 px-4 align-top text-slate-700 leading-relaxed">
                          {item.matchStrength === '보완 필요' ? (
                            <span className="text-rose-600 font-semibold italic flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>직접 매칭 경험 없음 (보완 필요)</span>
                            </span>
                          ) : (
                            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-800">
                              {item.matchedExperience}
                            </div>
                          )}
                        </td>

                        {/* Col 3: 매칭 강도 */}
                        <td className="py-4 px-3 align-top text-center">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${getStrengthBadge(
                              item.matchStrength
                            )}`}
                          >
                            {item.matchStrength}
                          </span>
                        </td>

                        {/* Col 4: 어필 문장 & 보완 방법 제안 */}
                        <td className="py-4 px-4 align-top space-y-2">
                          <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100 text-blue-950 leading-relaxed font-medium">
                            <span className="text-[10px] font-bold text-blue-800 block mb-0.5 uppercase tracking-wide">
                              💬 실전 어필 문장 예시:
                            </span>
                            &ldquo;{item.appealSentenceExample}&rdquo;
                          </div>

                          {/* Gap Suggestion if Weak or Missing */}
                          {item.gapSuggestion && (
                            <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                              <span className="font-bold block mb-0.5 text-amber-800 flex items-center gap-1">
                                <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                                <span>보완 방법 제안:</span>
                              </span>
                              {item.gapSuggestion}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
