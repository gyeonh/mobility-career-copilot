import {
  TrendsResponse,
  ManufacturingProcessResponse,
  InterviewQuestionsResponse,
  MatchingResultResponse,
} from '../types';

export const INITIAL_TRENDS_PRESET: Record<string, TrendsResponse> = {
  '자동차 전체': {
    category: '자동차 전체',
    keywords: [
      {
        keyword: 'SDV 중앙 집중형 아키텍처',
        importanceScore: 98,
        oneLineSummary: '차량 내 수십 개 분산 ECU를 2~3개의 고성능 제어기(HPC)로 통합하는 소프트웨어 중심 차량 전환',
        whyImportant: 'OTA 무선 업데이트 및 차량용 OS 표준화가 가속되면서, 기존 기계 중심 설계에서 E/E(전기/전자) 아키텍처 및 소프트웨어 기반 생산 검증 역량이 면접의 핵심 평가 요소로 급부상함.',
        relatedCompanies: ['현대자동차', '현대모비스', 'LG전자 VS사업본부', '테슬라'],
        sourceLinks: [
          { title: '글로벌 완성차 SDV 전환 로드맵 및 기술 분석', url: 'https://www.katech.re.kr' },
          { title: '현대차그룹 글로벌 소프트웨어 센터 포티투닷(42dot) 전략', url: 'https://www.hyundaimotorgroup.com' },
        ],
      },
      {
        keyword: '스마트팩토리 SDF (Software Defined Factory)',
        importanceScore: 94,
        oneLineSummary: '디지털 트윈, AI 비전, 무인 AMR 물류가 통합된 지능형 소프트웨어 기반 자율 제조 공장',
        whyImportant: '다품종 소량 유연 생산과 전기차/PBV 생산을 위해 공장 라인 변경을 코드와 시뮬레이션으로 제어하는 기술이 양산 혁신의 핵심 화두임.',
        relatedCompanies: ['현대자동차 HMGICS', '포스코DX', 'LG CNS', '현대오토에버'],
        sourceLinks: [
          { title: '싱가포르 글로벌 혁신센터(HMGICS) 스마트 제조 기술 분석', url: 'https://www.hyundai.com' },
        ],
      },
      {
        keyword: '800V 고전압 전동화 파워트레인',
        importanceScore: 91,
        oneLineSummary: '초급속 충전(18분 내 80%) 및 인버터 효율 극대화를 위한 차세대 SiC(탄화규소) 전력반도체 기반 파워트레인',
        whyImportant: '전기차 화재 안전성 및 주행거리 확보를 위한 열관리(TMS)와 배터리 직결 기술이 R&D 및 생산기술 면접 단골 질문임.',
        relatedCompanies: ['현대모비스', '한온시스템', 'SK온', 'LG에너지솔루션'],
        sourceLinks: [
          { title: '전기차 전력변환 및 초고전압 배터리 시스템 동향', url: 'https://www.kpea.kr' },
        ],
      },
      {
        keyword: '기가캐스팅 (대형 다이캐스팅 일체화 성형)',
        importanceScore: 89,
        oneLineSummary: '수백 개의 차체 부품을 알루미늄 일체형 단일 주조물로 대체하여 공정 단축 및 차체 경량화 달성',
        whyImportant: '프레스 및 차체 용접 라인을 획기적으로 줄여 제조원가를 40% 이상 절감하는 신공법으로, 생산기술 직무의 핫 토픽.',
        relatedCompanies: ['현대자동차', '테슬라', '현대위아'],
        sourceLinks: [
          { title: '차세대 알루미늄 일체 주조 차체 기술 동향', url: 'https://www.autojournal.or.kr' },
        ],
      },
      {
        keyword: '셀투팩(CTP) 및 LFP 배터리 포트폴리오',
        importanceScore: 86,
        oneLineSummary: '배터리 모듈 단계를 생략하고 팩에 직접 셀을 집적하여 에너지 밀도와 경제성을 동시에 확보하는 기술',
        whyImportant: '보급형 전기차 경쟁력 확보를 위해 모듈 조립 라인 생략 및 팩 단위 열폭주 방지 설계가 제조 현장의 핵심 과제.',
        relatedCompanies: ['LG에너지솔루션', '삼성SDI', '현대케피코'],
        sourceLinks: [
          { title: '배터리 구조 혁신 CTP 기술 현황 분석', url: 'https://www.k-battery.or.kr' },
        ],
      },
      {
        keyword: '레벨 3+ 조건부 자율주행 & 엔드투엔드(E2E) AI',
        importanceScore: 85,
        oneLineSummary: '인식-판단-제어를 단일 신경망 모델로 처리하는 차세대 자율주행 파운데이션 모델 도입',
        whyImportant: '기존 규칙 기반 제어에서 대규모 주행 데이터 기반 생성형 AI 제어로 전환되면서 차량 데이터 파이프라인 구축 능력이 중요해짐.',
        relatedCompanies: ['현대모비스', 'HL만도', '스트라드비젼'],
        sourceLinks: [
          { title: '자율주행 E2E 딥러닝 아키텍처 및 안전 검증', url: 'https://www.autojournal.or.kr' },
        ],
      },
      {
        keyword: '설비 예지보전 (PdM) & 진동 음향 AI',
        importanceScore: 82,
        oneLineSummary: '공장 내 모터, 감속기, 로봇 관절의 진동·전류 데이터를 실시간 분석해 고장을 사전 예측하는 스마트 보전',
        whyImportant: '생산 라인의 비계획 정지(Line Stop)를 방지하여 수백억 원의 손실을 방어하므로, 제조 데이터 엔지니어 및 보전 기술자의 필수 지식.',
        relatedCompanies: ['포스코', '현대제철', '원프레딕트', 'LG전자'],
        sourceLinks: [
          { title: '스마트 제조 예지보전 산업 가이드라인', url: 'https://www.smart-factory.kr' },
        ],
      },
      {
        keyword: '탄소국경조정제(CBAM) & Scope 3 친환경 공급망',
        importanceScore: 80,
        oneLineSummary: '철강, 알루미늄, 배터리 등 차량 부품 생산 전주기(LCA)의 탄소 배출량을 데이터로 추적하고 인증받는 규제',
        whyImportant: '해외 수출 완성차 및 부품사 취업 시 ESG 품질 관리 및 친환경 소재 대체 공정 이해도가 면접 변별력으로 작용.',
        relatedCompanies: ['포스코', '현대제철', '고려아연', '현대글로비스'],
        sourceLinks: [
          { title: 'EU CBAM 대응 자동차 공급망 탄소관리 전략', url: 'https://www.kora.or.kr' },
        ],
      },
      {
        keyword: '비전 AI 기반 무인 표면 결함 검사',
        importanceScore: 78,
        oneLineSummary: '도장 표면 미세 스크래치, 금형 스탬핑 크랙, 용접 비드 결함을 밀리초 단위로 판독하는 고해상도 머신비전',
        whyImportant: '육안 검사의 한계를 극복하고 수율(Yield)을 99.9%로 끌어올리는 기술로 품질관리(QC) 및 생산기술 직무의 단골 과제.',
        relatedCompanies: ['수아랩/코그넥스', '마키나락스', '현대자동차'],
        sourceLinks: [
          { title: '제조 비전 검사 딥러닝 적용 사례 연구', url: 'https://www.koreascience.or.kr' },
        ],
      },
      {
        keyword: '초경량 복합소재 (CFRP/엔지니어링 플라스틱)',
        importanceScore: 76,
        oneLineSummary: '배터리 무게 증가를 상쇄하기 위한 이종 접합, 연속 섬유 강화 열가소성 복합재 및 친환경 바이오 소재 적용',
        whyImportant: '차량 경량화는 전비 향상과 직결되며 이종 소재 간 접합(SPR, 구조용 접착제) 기술이 생산 라인에서 활발히 도입 중임.',
        relatedCompanies: ['효성첨단소재', '도레이첨단소재', '코오롱인더스트리'],
        sourceLinks: [
          { title: '미래 모빌리티 복합소재 성형 기술 동향', url: 'https://www.kims.re.kr' },
        ],
      },
    ],
  },

  '전동화': {
    category: '전동화',
    keywords: [
      {
        keyword: 'SiC 전력반도체 기반 800V 인버터',
        importanceScore: 97,
        oneLineSummary: '기존 Si 대비 전력 손실을 70% 줄이고 충전 속도를 3배 높이는 고효율 탄화규소(SiC) 구동계 시스템',
        whyImportant: '인버터 스위칭 손실 저감 및 고온 내구성 확보가 전동화 PE(Power Electric) 시스템 엔지니어의 핵심 과제입니다.',
        relatedCompanies: ['현대모비스', 'LG마그나 이파워트레인', '한온시스템'],
        sourceLinks: [
          { title: '전기차 전력반도체 기술 동향 및 국산화 현황', url: 'https://www.kpea.kr' },
        ],
      },
      {
        keyword: '각형·원통형(4680) 배터리 폼팩터 다변화',
        importanceScore: 95,
        oneLineSummary: '파우치형 중심에서 구조적 강성과 공정 자동화 효율이 뛰어난 4680 원통형 및 알루미늄 각형 캔 배터리 양산 확대',
        whyImportant: '초고속 권취(Winding) 및 탭리스(Tabless) 레이저 용접 등 대량 양산 공정 기술이 배터리 및 부품사 면접의 필수 질문입니다.',
        relatedCompanies: ['LG에너지솔루션', '삼성SDI', 'SK온', '금양'],
        sourceLinks: [
          { title: '차세대 46-시리즈 배터리 셀 제조 공정 혁신', url: 'https://www.k-battery.or.kr' },
        ],
      },
      {
        keyword: '통합 열관리 시스템 (ITMS) & 히트펌프',
        importanceScore: 92,
        oneLineSummary: '배터리 팩, 구동 모터, 실내 냉난방 폐열을 통합 제어하여 겨울철 주행거리 저하를 20% 이상 방어하는 시스템',
        whyImportant: '배터리 급속 충전 시 냉각 성능과 승객 쾌적성을 동시에 만족시키는 냉각 유로 밸브 제어 및 열해석 역량이 중시됩니다.',
        relatedCompanies: ['한온시스템', '현대모비스', '우리산업'],
        sourceLinks: [
          { title: '전기차 통합 열관리 기술 동향 - 자동차공학회', url: 'https://www.ksae.org' },
        ],
      },
      {
        keyword: '모터 헤어핀(Hairpin) 각선 권선 공법',
        importanceScore: 89,
        oneLineSummary: '둥근 구리선 대신 직사각형 각선을 꽂아 용접하여 슬롯 점적률을 70% 이상으로 극대화하는 고출력 모터 제작 기술',
        whyImportant: '모터 소형화 및 출력 밀도 향상을 위해 필수적인 공법으로, 권선 정밀 벤딩 및 레이저 용접 품질 관리가 핵심입니다.',
        relatedCompanies: ['현대모비스', 'LG전자 VS사업본부', 'SNT모티브'],
        sourceLinks: [
          { title: '고출력 구동모터 권선 기술 동향 리포트', url: 'https://www.katech.re.kr' },
        ],
      },
      {
        keyword: 'LFP(리튬인산철) 및 망간리치 보급형 배터리',
        importanceScore: 88,
        oneLineSummary: '코발트·니켈 등 고가 희소금속을 줄여 가격 경쟁력을 확보하고 화재 안정성을 높인 보급형 셀 양산 기술',
        whyImportant: '완성차의 캐즘(Chasm) 극복을 위한 중저가 EV 출시 전략과 직결되며, 원가 절감형 전극 슬러리 배합 기술이 화두입니다.',
        relatedCompanies: ['LG에너지솔루션', '에코프로비엠', '엘앤에프'],
        sourceLinks: [
          { title: 'K-배터리 3사 LFP 양산 전략 보고서', url: 'https://www.k-battery.or.kr' },
        ],
      },
      {
        keyword: '무선 배터리 관리 시스템 (Wireless BMS)',
        importanceScore: 84,
        oneLineSummary: '배터리 모듈 간의 수백 미터에 달하는 와이어링 하네스를 무선 통신 칩셋으로 대체해 무게를 줄이고 신뢰성 향상',
        whyImportant: '와이어 단선 리스크를 제거하고 팩 내부 공간 활용도를 높여 생산 조립 공정을 대폭 단순화하는 차세대 전장 기술입니다.',
        relatedCompanies: ['현대케피코', 'LG이노텍', 'TI 코리아'],
        sourceLinks: [
          { title: '차량용 무선 BMS 신뢰성 검증 가이드', url: 'https://www.auto-electronics.com' },
        ],
      },
      {
        keyword: '배터리 열폭주 방지 팩 에어로겔/난연 차단재',
        importanceScore: 83,
        oneLineSummary: '특정 셀에서 열폭주 발생 시 인접 셀로 열이 전이되는 것을 차단하는 실리카 에어로겔 및 세라믹 복합 패드 기술',
        whyImportant: '전기차 화재 안전 규제(UN R100 Rev.3) 강화에 따라 팩 레벨의 화염 전파 방지 구조 설계가 기계/재료 엔지니어의 핵심 과제입니다.',
        relatedCompanies: ['포스코퓨처엠', 'LG화학', '동원시스템즈'],
        sourceLinks: [
          { title: '전기차 배터리 열전이 방지 기술 동향', url: 'https://www.autojournal.or.kr' },
        ],
      },
      {
        keyword: 'V2G (Vehicle to Grid) 양방향 충방전',
        importanceScore: 81,
        oneLineSummary: '전기차 배터리를 이동형 에너지 저장 장치(ESS)로 활용해 전력망에 전기를 공급하고 피크 전력을 분산하는 스마트 충전',
        whyImportant: '스마트 그리드 연동 전력변환 제어 알고리즘과 배터리 수명(SoH) 열화 억제 소프트웨어 역량이 부각됩니다.',
        relatedCompanies: ['현대자동차', '한전', '원익피앤이'],
        sourceLinks: [
          { title: 'V2G 표준화 로드맵 및 실증 연구 보고서', url: 'https://www.keei.re.kr' },
        ],
      },
      {
        keyword: '건식 전극(Dry Electrode) 제조 혁신 공정',
        importanceScore: 80,
        oneLineSummary: '유기 용매(NMP)와 건조로를 사용하지 않고 파우더를 롤 압연하여 전극을 제조하는 친환경·초저원가 배터리 공법',
        whyImportant: '전극 제조 공장 부지와 에너지 소비를 50% 절감하는 미래 게임체인저 기술로, 공정기술 면접의 최고 차별화 키워드입니다.',
        relatedCompanies: ['LG에너지솔루션', '삼성SDI', '피엔티'],
        sourceLinks: [
          { title: '차세대 2차전지 건식 공정 기술 현황', url: 'https://www.k-battery.or.kr' },
        ],
      },
      {
        keyword: '전고체 배터리(All Solid State) 파일럿 검증',
        importanceScore: 78,
        oneLineSummary: '가연성 액체 전해질을 황화물계 고체 전해질로 대체하여 화재 위험을 원천 차단하고 에너지 밀도를 극대화하는 차세대 셀',
        whyImportant: '고체-고체 계면 저항 극복 및 등방압 프레스(WIP) 대형 장비 공정 기술이 R&D 연구직 면접의 핵심 토론 주제입니다.',
        relatedCompanies: ['삼성SDI', '현대자동차 남양연구소', '이수스페셜티케미컬'],
        sourceLinks: [
          { title: '황화물계 전고체 전지 파일럿 라인 기술 보고서', url: 'https://www.kims.re.kr' },
        ],
      },
    ],
  },

  '자율주행': {
    category: '자율주행',
    keywords: [
      {
        keyword: '엔드투엔드(E2E) 자율주행 파운데이션 모델',
        importanceScore: 98,
        oneLineSummary: '카메라 센서 입력부터 조향·가속 제어 출력까지 거대 신경망 모델이 단일 루프로 직접 추론하는 AI 패러다임',
        whyImportant: '기존의 [인식→추적→예측→경로계획] 분할 구조의 규칙 한계를 뛰어넘는 최신 자율주행 트렌드로 AI/SW 엔지니어의 핵심 역량입니다.',
        relatedCompanies: ['현대모비스', '테슬라', '포티투닷(42dot)', '스트라드비젼'],
        sourceLinks: [
          { title: 'E2E 자율주행 신경망 아키텍처 및 안전 검증 분석', url: 'https://www.autojournal.or.kr' },
        ],
      },
      {
        keyword: '4D 이미징 레이더 (Imaging Radar)',
        importanceScore: 93,
        oneLineSummary: '기존 레이더의 거리·속도·방위각에 고도(Elevation) 정보를 추가하고 수천 개 포인트클라우드를 형성하는 악천후 센서',
        whyImportant: '안개, 폭우, 야간 환경에서 라이다의 약점을 보완하는 필수 센서로 센서 퓨전 알고리즘 설계 역량이 면접에서 높게 평가됩니다.',
        relatedCompanies: ['스마트레이더시스템', 'HL클레무브', '현대모비스'],
        sourceLinks: [
          { title: '자율주행용 4D 이미징 레이더 기술 동향', url: 'https://www.katech.re.kr' },
        ],
      },
      {
        keyword: '섀시 바이 와이어 (X-by-Wire: SbW / BbW)',
        importanceScore: 91,
        oneLineSummary: '스티어링 휠과 바퀴 간의 기계적 샤프트를 제거하고 전기 신호와 모터 액추에이터로만 조향과 제동을 수행하는 시스템',
        whyImportant: '자율주행 시 실내 공간 재배치와 즉각적인 조향 보정을 가능하게 하며, 이중화(Redundancy) 안전 설계가 핵심 평가 포인트입니다.',
        relatedCompanies: ['HL만도', '현대모비스', '보쉬'],
        sourceLinks: [
          { title: '차세대 바이와이어 샤시 제어 기술 및 기능안전', url: 'https://www.ksae.org' },
        ],
      },
      {
        keyword: '3D 오큐펀시 네트워크 (Occupancy Grid)',
        importanceScore: 89,
        oneLineSummary: '차량 주변 3차원 공간을 복셀(Voxel) 단위로 쪼개어 물체의 형태와 이동 점유 확률을 실시간 복원하는 비전 딥러닝',
        whyImportant: '사전 학습되지 않은 낙하물이나 특이 형태 장애물도 완벽히 감지하여 자율주행의 안전성을 획기적으로 개선합니다.',
        relatedCompanies: ['포티투닷', '스트라드비젼', '현대오토에버'],
        sourceLinks: [
          { title: '비전 기반 3D 점유 공간 복원 딥러닝 연구', url: 'https://www.koreascience.or.kr' },
        ],
      },
      {
        keyword: '기능안전 ISO 26262 & SOTIF (ISO 21448)',
        importanceScore: 88,
        oneLineSummary: '하드웨어/소프트웨어 고장(Fault) 방지뿐 아니라 AI 알고리즘의 의도된 기능 안전성 한계를 다루는 국제 규격',
        whyImportant: '자율주행 완성차 양산을 위한 필수 인증 기준으로, 제어 로직과 테스트 시나리오 작성 시 ASIL-D 등급 달성이 요구됩니다.',
        relatedCompanies: ['현대자동차 남양연구소', 'HL클레무브', 'LG전자'],
        sourceLinks: [
          { title: '자율주행차 SOTIF 안전성 평가 가이드라인', url: 'https://www.katri.or.kr' },
        ],
      },
      {
        keyword: '차량용 엣지 NPU 가속기 및 AI 경량화',
        importanceScore: 86,
        oneLineSummary: '차량 내 30W 미만의 제한된 전력 환경에서 초당 100회 이상의 멀티 센서 딥러닝 추론을 수행하는 전용 반도체',
        whyImportant: '양자화(INT8), 프루닝(Pruning), TensorRT 최적화 등 실무 임베디드 딥러닝 서빙 기술이 현업 팀장 면접에서 결정적입니다.',
        relatedCompanies: ['리벨리온', '퓨리오사AI', '텔레칩스', '현대모비스'],
        sourceLinks: [
          { title: '차량용 온디바이스 NPU 아키텍처 연구', url: 'https://www.etri.re.kr' },
        ],
      },
      {
        keyword: '시뮬레이션 기반 가상 검증 (SIL/HIL 테스트)',
        importanceScore: 85,
        oneLineSummary: '수십억 km의 엣지 케이스 주행 환경을 Carla, IPG CarMaker 등 가상 환경에서 사전 검증하는 소프트웨어 엔지니어링',
        whyImportant: '실차 주행 테스트 비용을 90% 이상 절감하며, 시뮬레이터와 실차 제어기 연동(HIL) 경험이 R&D 지원자의 무기입니다.',
        relatedCompanies: ['현대모비스', '모라이(MORAI)', '현대오토에버'],
        sourceLinks: [
          { title: '디지털 트윈 기반 자율주행 가상 주행 검증', url: 'https://www.morai.ai' },
        ],
      },
      {
        keyword: 'V2X (Vehicle to Everything) 통신 융합',
        importanceScore: 82,
        oneLineSummary: '신호등, 교차로 사각지대 보행자 정보를 C-V2X 5G 통신으로 수신해 차량 센서의 가시거리 한계를 극복하는 기술',
        whyImportant: '차량 단독 인지 한계를 극복하는 인프라 협조 자율주행의 핵심으로 스마트 시티 실증 사업과 연계됩니다.',
        relatedCompanies: ['LG이노텍', '켐트로닉스', '현대오토에버'],
        sourceLinks: [
          { title: '차세대 C-V2X 표준 및 스마트 교차로 실증 동향', url: 'https://www.tta.or.kr' },
        ],
      },
      {
        keyword: '솔리드스테이트(고체형) 소형 라이다',
        importanceScore: 80,
        oneLineSummary: '회전하는 기계 모터를 없애고 반도체 칩 형태로 제작해 크기와 가격을 1/10로 줄이고 내구성을 높인 차세대 라이다',
        whyImportant: '레벨 3 이상 양산차의 헤드램프나 범퍼에 티 안 나게 매립할 수 있는 패키징 설계 능력이 중요합니다.',
        relatedCompanies: ['에스오에스랩', '현대모비스', '루미나'],
        sourceLinks: [
          { title: '차량용 고정형 라이다 반도체 기술 분석', url: 'https://www.kims.re.kr' },
        ],
      },
      {
        keyword: '섀시 통합 도메인 제어기 (DCU)',
        importanceScore: 77,
        oneLineSummary: '제동, 조향, 현가(에어 서스펜션)를 하나의 제어기에서 통합 연산하여 승차감과 긴급 회피 조향을 동시에 제어',
        whyImportant: '개별 제어기 간의 통신 지연을 없애 차량의 운동 궤적을 통합 최적화하는 차량 동역학 제어 기술입니다.',
        relatedCompanies: ['HL만도', '현대모비스', '한온시스템'],
        sourceLinks: [
          { title: '통합 섀시 제어 아키텍처 및 실차 평가', url: 'https://www.ksae.org' },
        ],
      },
    ],
  },

  'SDV': {
    category: 'SDV',
    keywords: [
      {
        keyword: 'Zonal(구역형) E/E 아키텍처',
        importanceScore: 98,
        oneLineSummary: '차량을 전/후/좌/우 구역(Zone) 제어기로 단순화하고 고속 이더넷 백본망으로 연결해 배선 하네스를 50% 감축',
        whyImportant: '소프트웨어 중심 자동차(SDV)의 물리적 기반으로, 전장 설계 및 생산라인 하네스 조립 공수를 혁신하는 핵심 주제입니다.',
        relatedCompanies: ['현대자동차', '현대모비스', '포티투닷', '테슬라'],
        sourceLinks: [
          { title: 'Zonal E/E 아키텍처 표준화 및 이더넷 네트워크', url: 'https://www.katech.re.kr' },
        ],
      },
      {
        keyword: 'OTA (Over-The-Air) 무선 소프트웨어 업데이트',
        importanceScore: 96,
        oneLineSummary: '내비게이션뿐 아니라 제동, 서스펜션, 배터리 충전 등 안전 핵심 제어기까지 원격으로 펌웨어를 무선 업데이트',
        whyImportant: '차량 출고 후에도 성능이 진화하는 SDV 비즈니스의 핵심으로, 롤백(Rollback) 및 A/B 파티션 무중단 업데이트 검증이 중요합니다.',
        relatedCompanies: ['현대오토에버', '현대자동차', 'LG전자'],
        sourceLinks: [
          { title: 'OTA 펌웨어 무선 업데이트 신뢰성 및 보안 표준', url: 'https://www.autojournal.or.kr' },
        ],
      },
      {
        keyword: 'AUTOSAR Adaptive 플랫폼',
        importanceScore: 93,
        oneLineSummary: '고성능 컴퓨터(HPC) 환경에서 C++, POSIX OS, 서비스 지향 통신(SOME/IP)을 지원하는 차세대 자동차 소프트웨어 표준',
        whyImportant: '기존 Classic AUTOSAR와 차별화되는 객체지향 및 동적 메모리 할당 표준으로 차량용 SW 엔지니어의 핵심 스킬셋입니다.',
        relatedCompanies: ['현대오토에버', 'LG전자', '콘티넨탈'],
        sourceLinks: [
          { title: 'AUTOSAR Adaptive 플랫폼 아키텍처 심층 해설', url: 'https://www.autosar.org' },
        ],
      },
      {
        keyword: '차량용 고성능 컴퓨터 (HPC: High Performance Computer)',
        importanceScore: 91,
        oneLineSummary: '인포테인먼트, 자율주행, 커넥티비티 연산을 단일 보드에서 분할 처리하는 서버급 멀티코어 차량 중앙 두뇌',
        whyImportant: '차량용 방열(방열판/수냉) 설계와 실시간성 보장을 위한 RTOS 하이퍼바이저 가상화 기술이 요구됩니다.',
        relatedCompanies: ['현대모비스', 'LG전자 VS사업본부', '퀄컴'],
        sourceLinks: [
          { title: '차량용 HPC 하드웨어 및 열관리 기술 동향', url: 'https://www.auto-electronics.com' },
        ],
      },
      {
        keyword: '차량 사이버보안 규제 (UNECE R155 / CSMS)',
        importanceScore: 89,
        oneLineSummary: '차량 개발부터 양산, 폐차까지 전 수명주기 동안 해킹 위협을 감시하고 방어하는 보안 관리 체계 인증 의무화',
        whyImportant: '인증 미획득 시 유럽 등 주요 시장 수출이 전면 금지되므로, 침입탐지시스템(IDS)과 보안 부팅(Secure Boot)이 필수입니다.',
        relatedCompanies: ['페스카로', '아우토크립트', '현대오토에버'],
        sourceLinks: [
          { title: 'UNECE R155 차량 사이버보안 관리체계 가이드라인', url: 'https://www.kotsa.or.kr' },
        ],
      },
      {
        keyword: '차량용 차량 내부 이더넷 (1000BASE-T1)',
        importanceScore: 87,
        oneLineSummary: '단 한 쌍의 꼬임선(UTP)으로 기가비트급 고속 데이터를 차량 내에서 노이즈 없이 전송하는 네트워크 표준',
        whyImportant: '기존 CAN 통신의 1Mbps 한계를 넘어 고화질 카메라와 라이다의 대용량 데이터를 지연 없이 전송합니다.',
        relatedCompanies: ['텔레칩스', '현대모비스', 'NXP코리아'],
        sourceLinks: [
          { title: '차량용 고속 이더넷 인터페이스 물리계층 규격', url: 'https://www.ieee802.org' },
        ],
      },
      {
        keyword: '안드로이드 오토모티브 OS (AAOS) & 인포테인먼트',
        importanceScore: 85,
        oneLineSummary: '스마트폰 미러링을 넘어 차량 하드웨어에 네이티브로 탑재되는 오픈소스 기반 차세대 디지털 콕핏 운영체제',
        whyImportant: '차량 공조, 차량 설정 등 CAN 버스와 앱 생태계를 잇는 HAL(하드웨어 추상화 계층) 개발 역량이 중시됩니다.',
        relatedCompanies: ['LG전자', '현대오토에버', '네이버 클라우드'],
        sourceLinks: [
          { title: 'Android Automotive OS 아키텍처 및 앱 개발 동향', url: 'https://source.android.com' },
        ],
      },
      {
        keyword: '가상화 하이퍼바이저 (Hypervisor)',
        importanceScore: 82,
        oneLineSummary: '단일 AP에서 안전성이 중요한 클러스터(RTOS)와 엔터테인먼트(Android)를 충돌 없이 독립 실행시키는 가상화 SW',
        whyImportant: '화면 먹통 시 계기판 안전 표시는 0.1초도 멈추지 않도록 보장하는 안전 격리(Safety Isolation) 기술입니다.',
        relatedCompanies: ['LG전자', '오픈시너지', 'QNX/블랙베리'],
        sourceLinks: [
          { title: '차량용 임베디드 하이퍼바이저 안전 격리 기술', url: 'https://www.autojournal.or.kr' },
        ],
      },
      {
        keyword: '차량용 표준 API 표준 (COVESA / VSS)',
        importanceScore: 80,
        oneLineSummary: '차량의 속도, 배터리 잔량, 문 열림 상태 등을 표준 데이터 모델(VSS)로 정의하여 클라우드 앱을 쉽게 연동',
        whyImportant: '차종마다 다른 신호 규격을 표준화하여 써드파티 앱 개발과 구독형 서비스(FoD) 확장을 가능케 합니다.',
        relatedCompanies: ['현대자동차', '포티투닷', 'AWS 코리아'],
        sourceLinks: [
          { title: 'COVESA 차량 신호 사양(VSS) 글로벌 표준', url: 'https://www.covesa.global' },
        ],
      },
      {
        keyword: '커넥티드 카 빅데이터 파이프라인 (클라우드 MLOps)',
        importanceScore: 78,
        oneLineSummary: '수백만 대 주행 차량에서 발생하는 실시간 센서 로그를 클라우드로 전송해 이상 징후 분석 및 지도 업데이트 수행',
        whyImportant: '주행 엣지 케이스 수집과 모델 재학습을 자동화하는 클라우드 데이터 파이프라인 엔지니어링 역량입니다.',
        relatedCompanies: ['현대오토에버', 'LG유플러스', '마이크로소프트'],
        sourceLinks: [
          { title: '커넥티드 카 차량 데이터 수집 및 클라우드 아키텍처', url: 'https://www.hyundaimotorgroup.com' },
        ],
      },
    ],
  },

  '제조 혁신': {
    category: '제조 혁신',
    keywords: [
      {
        keyword: '소프트웨어 정의 공장 (SDF: Software Defined Factory)',
        importanceScore: 97,
        oneLineSummary: '공장 라인 재편을 설비 재배치가 아닌 소프트웨어 파라미터 변경과 가상 시뮬레이션으로 수행하는 차세대 생산 방식',
        whyImportant: '신차종 투입 시 수개월 걸리던 라인 개조 기간을 수일로 단축하여 유연 다품종 생산을 완성하는 생산기술 핵심 화두입니다.',
        relatedCompanies: ['현대자동차 HMGICS', '포스코DX', 'LG CNS'],
        sourceLinks: [
          { title: '글로벌 제조 패러다임 SDF 구축 가이드라인', url: 'https://www.smart-factory.kr' },
        ],
      },
      {
        keyword: '대형 일체 주조 (기가캐스팅 / 하이퍼캐스팅)',
        importanceScore: 94,
        oneLineSummary: '6,000톤 이상의 초대형 알루미늄 다이캐스팅 장비로 리어 언더바디 등 수십 개 부품을 단 하나의 주조품으로 일체 성형',
        whyImportant: '프레스 및 차체 용접 로봇 공정을 획기적으로 줄여 투자비와 생산 시간을 40% 절감하는 생산기술 최대 혁신 공법입니다.',
        relatedCompanies: ['현대자동차', '현대위아', '테슬라'],
        sourceLinks: [
          { title: '기가캐스팅 공법의 경제성 및 차체 강성 평가', url: 'https://www.autojournal.or.kr' },
        ],
      },
      {
        keyword: '자율이동로봇 (AMR) & 군집 플릿 매니지먼트',
        importanceScore: 92,
        oneLineSummary: '마그네틱 라인 없이 라이다·카메라 SLAM으로 스스로 길을 찾아 부품을 이송하는 무인 로봇과 실시간 교통 제어 시스템',
        whyImportant: '컨베이어 벨트 종속을 탈피하고 유연 셀 생산을 가능하게 하며, 물류 병목 해소 알고리즘이 면접 단골 주제입니다.',
        relatedCompanies: ['현대위아', 'LG전자', '티로보틱스', '유진로봇'],
        sourceLinks: [
          { title: '물류 자동화 AMR 군집 제어 알고리즘 분석', url: 'https://www.ksae.org' },
        ],
      },
      {
        keyword: '비전 AI 기반 초고속 인라인 표면 결함 검사',
        importanceScore: 90,
        oneLineSummary: '도장 표면 미세 오렌지필, 먼지 티끌, 용접 비드 불량을 딥러닝 비지도 학습으로 밀리초 단위로 자동 판별',
        whyImportant: '작업자의 육안 피로도에 따른 검사 편차를 없애고 100% 전수 검사를 달성하여 품질 비용을 획기적으로 절감합니다.',
        relatedCompanies: ['코그넥스(수아랩)', '마키나락스', '현대자동차'],
        sourceLinks: [
          { title: '딥러닝 머신비전을 이용한 제조 결함 검출 연구', url: 'https://www.koreascience.or.kr' },
        ],
      },
      {
        keyword: '디지털 트윈 (Digital Twin) 공정 시뮬레이션',
        importanceScore: 88,
        oneLineSummary: '실제 공장의 모든 설비와 로봇 동역학을 1:1 3D 가상 공간에 복제하여 사전 간섭 검증 및 사이클 타임을 최적화',
        whyImportant: '라인 양산 착공 전 가상 커미셔닝(Virtual Commissioning)을 통해 설비 충돌 위험을 사전 100% 제거합니다.',
        relatedCompanies: ['엔비디아 옴니버스', '현대오토에버', '다쏘시스템코리아'],
        sourceLinks: [
          { title: '스마트팩토리 디지털 트윈 가상 시운전 사례', url: 'https://www.smart-factory.kr' },
        ],
      },
      {
        keyword: '스마트 토크 너트러너 & 체결 추적성 (Traceability)',
        importanceScore: 86,
        oneLineSummary: '배터리 팩 및 섀시 볼트 체결 시 토크(Torque)와 각도(Angle) 파형 데이터를 전수 기록하고 MES로 실시간 연동',
        whyImportant: '체결 불량(나사산 뭉개짐, 덜조임)을 0.01초 내 감지해 라인 인터록을 걸며, 법적 리콜 증빙 데이터로 활용됩니다.',
        relatedCompanies: ['아트라스콥코코리아', '현대자동차', '현대모비스'],
        sourceLinks: [
          { title: '자동차 조립 라인 토크-각도 체결 보증 시스템', url: 'https://www.ksae.org' },
        ],
      },
      {
        keyword: '설비 예지보전 (PdM) 및 진동·전류 분석',
        importanceScore: 84,
        oneLineSummary: '모터, 펌프, 로봇 감속기의 미세 진동 스펙트럼(FFT)과 전류를 분석해 베어링 파손을 수주일 전 조기 경보',
        whyImportant: '돌발 설비 고장으로 인한 라인 스탑(Line Stop) 손실을 원천 차단하는 생산기술/보전 직무의 필수 역량입니다.',
        relatedCompanies: ['원프레딕트', '포스코DX', 'SK C&C'],
        sourceLinks: [
          { title: '제조 설비 상태 진단 및 예지보전 실무 지침', url: 'https://www.smart-factory.kr' },
        ],
      },
      {
        keyword: '착용형 외골격 웨어러블 로봇 (VEX / CEX)',
        importanceScore: 81,
        oneLineSummary: '차량 하부 의장 작업 시 작업자의 어깨와 무릎 관절 부하를 분산해 근골격계 질환을 방지하는 무동력/모터형 보조 기기',
        whyImportant: '현장 작업자의 안전 복지 향상과 노동 강도 저감을 실현하는 인체공학적 스마트 제조 기술입니다.',
        relatedCompanies: ['현대자동차 로보틱스랩', '현대위아', '레인보우로보틱스'],
        sourceLinks: [
          { title: '현대차 웨어러블 로봇 VEX 산업 현장 적용 성과', url: 'https://www.hyundaimotorgroup.com' },
        ],
      },
      {
        keyword: '금형 쾌속 제작을 위한 대형 금속 3D 프린팅',
        importanceScore: 80,
        oneLineSummary: '복잡한 냉각 유로를 갖는 다이캐스팅 금형 인서트를 금속 적층 제조(DED/PBF)로 제작해 금형 수명을 2배 연장',
        whyImportant: '냉각 속도를 균일화하여 성형 사이클 타임을 20% 단축시키는 차세대 금형 기술입니다.',
        relatedCompanies: ['현대위아', '센트롤', '포스코'],
        sourceLinks: [
          { title: '금속 적층제조를 활용한 자동차 금형 냉각 채널 최적화', url: 'https://www.kims.re.kr' },
        ],
      },
      {
        keyword: '다품종 혼류 생산을 위한 플렉서블 지그(Flexible Jig)',
        importanceScore: 78,
        oneLineSummary: '세단, SUV, PBV 등 서로 다른 차종을 한 라인에서 조립할 수 있도록 서보 모터로 위치를 가변하는 지능형 지그',
        whyImportant: '차종 교체 시 금형/지그 교체 시간(C/O Time)을 제로화하여 생산 유연성을 극대화합니다.',
        relatedCompanies: ['현대위아', '성우하이텍', '신영'],
        sourceLinks: [
          { title: '가변 지그 시스템을 적용한 차체 혼류 조립 라인', url: 'https://www.autojournal.or.kr' },
        ],
      },
    ],
  },

  '부품·소재': {
    category: '부품·소재',
    keywords: [
      {
        keyword: '초고장력 강판(AHSS) 핫스탬핑 성형',
        importanceScore: 97,
        oneLineSummary: '강판을 900℃ 이상으로 가열해 금형 내에서 성형과 동시 급랭하여 1,500~2,000MPa급 승객실 보호 골격 제작',
        whyImportant: '차체 경량화와 충돌 안전성을 동시에 달성하는 핵심 공법으로, 스프링백 제어 및 금형 냉각 채널 설계가 중요합니다.',
        relatedCompanies: ['현대제철', '포스코', '성우하이텍', '신영'],
        sourceLinks: [
          { title: '초고강도 핫스탬핑 부품 제조 및 열처리 공정', url: 'https://www.autojournal.or.kr' },
        ],
      },
      {
        keyword: '이종 재료 접합 (SPR 및 구조용 접착제)',
        importanceScore: 94,
        oneLineSummary: '용접이 불가능한 알루미늄과 강판을 고속 관통 리벳(SPR)과 에폭시 접착제로 화학·기계적 복합 접합하는 공법',
        whyImportant: '갈바닉 부식(Galvanic Corrosion) 방지와 충돌 비틀림 강성 증대를 위해 차체 조립 공정에서 필수적인 기술입니다.',
        relatedCompanies: ['현대자동차', '한온시스템', '삼화페인트'],
        sourceLinks: [
          { title: '이종 소재 복합 접합 기술 및 내구성 평가', url: 'https://www.ksae.org' },
        ],
      },
      {
        keyword: '탄소국경조정제(CBAM) 대응 저탄소 전기로 강판',
        importanceScore: 92,
        oneLineSummary: '석탄 고로 대신 수소환원제철 및 전기로를 활용해 제조 공정의 탄소 배출량을 30% 이상 줄인 친환경 자동차 강판',
        whyImportant: '유럽 수출 완성차의 Scope 3 탄소 배출 규제 만족을 위해 철강/부품사 품질 면접의 최신 핵심 화두입니다.',
        relatedCompanies: ['포스코', '현대제철', '동국제강'],
        sourceLinks: [
          { title: '글로벌 탄소중립 대응 자동차용 저탄소 강판 로드맵', url: 'https://www.kora.or.kr' },
        ],
      },
      {
        keyword: 'SiC / GaN 차세대 화합물 전력반도체 기판',
        importanceScore: 90,
        oneLineSummary: '고온·고전압에서도 물리적 파괴 없이 동작하는 탄화규소(SiC) 및 질화갈륨(GaN) 단결정 웨이퍼 소재',
        whyImportant: '전기차 전력변환 효율과 주행거리 향상의 근본 소재로, 기판 에피택시 결함률 관리가 생산 수율의 열쇠입니다.',
        relatedCompanies: ['SK실트론', 'DB하이텍', '현대모비스'],
        sourceLinks: [
          { title: '화합물 반도체 소재 공급망 및 국산화 동향', url: 'https://www.etri.re.kr' },
        ],
      },
      {
        keyword: '연속 섬유 강화 열가소성 복합재 (CFRTP)',
        importanceScore: 87,
        oneLineSummary: '재활용이 어렵던 기존 탄소섬유 복합재를 열가소성 수지로 개선해 수분 내 고속 프레스 성형이 가능한 경량 소재',
        whyImportant: '전기차 배터리 케이스 및 범퍼 빔 경량화를 위한 신소재로, 재활용성과 생산 사이클 타임 단축이 강점입니다.',
        relatedCompanies: ['효성첨단소재', '도레이첨단소재', '코오롱인더스트리'],
        sourceLinks: [
          { title: '미래 모빌리티 복합소재 성형 기술 동향', url: 'https://www.kims.re.kr' },
        ],
      },
      {
        keyword: '배터리 고열전도 열계면소재 (TIM)',
        importanceScore: 85,
        oneLineSummary: '배터리 셀과 냉각 플레이트 사이의 미세 공극을 메워 열을 신속히 방출하는 난연성 써멀 갭필러(Thermal Gap Filler)',
        whyImportant: '배터리 급속 충전 시 온도 편차를 3℃ 이내로 유지하고 충격 진동을 흡수하는 정밀 디스펜싱 공정이 중요합니다.',
        relatedCompanies: ['LG화학', 'SK엔무브', '아모그린텍'],
        sourceLinks: [
          { title: '전기차 배터리 팩 방열 소재 기술 동향', url: 'https://www.k-battery.or.kr' },
        ],
      },
      {
        keyword: '초저구름저항 & 흡음 전기차 전용 타이어',
        importanceScore: 83,
        oneLineSummary: '무거운 배터리 하중을 견디는 고강성 벨트 구조와 모터 고주파 소음을 줄이는 흡음 폴리우레탄 폼 내장 타이어',
        whyImportant: '내연기관 엔진음이 사라진 전기차의 정숙성(NVH)과 전비 향상을 결정짓는 핵심 부품 기술입니다.',
        relatedCompanies: ['넥센타이어', '한국타이어앤테크놀로지', '금호타이어'],
        sourceLinks: [
          { title: '전기차 전용 타이어 트레드 배합 및 소음 저감 기술', url: 'https://www.tireindustry.or.kr' },
        ],
      },
      {
        keyword: '스마트 글라스 및 광학 코팅 필름',
        importanceScore: 81,
        oneLineSummary: '전기 신호에 따라 투과율을 조절하는 전자식 틴팅(SPD/EC) 및 적외선 차단으로 냉방 부하를 줄이는 윈드실드',
        whyImportant: '파노라마 선루프의 롤러 블라인드를 없애 실내 헤드룸을 확보하고 연비를 개선하는 프리미엄 소재입니다.',
        relatedCompanies: ['KCC글라스', '한솔케미칼', 'LG화학'],
        sourceLinks: [
          { title: '자동차용 스마트 윈도우 광학 코팅 기술 동향', url: 'https://www.kims.re.kr' },
        ],
      },
      {
        keyword: '친환경 바이오 및 식물성 비건 가죽 시트재',
        importanceScore: 79,
        oneLineSummary: '버섯 균사체, 옥수수 추출물 및 폐플라스틱 원사를 활용해 동물 가죽 이상의 내마모성과 질감을 구현한 내장재',
        whyImportant: '글로벌 완성차의 ESG 탄소 배출 저감 및 유기화합물(VOC) 냄새 규제를 만족시키는 친환경 감성 품질 요소입니다.',
        relatedCompanies: ['현대트랜시스', '동진써모텍', '코오롱글로텍'],
        sourceLinks: [
          { title: '친환경 모빌리티 내장 소재 개발 동향', url: 'https://www.katech.re.kr' },
        ],
      },
      {
        keyword: '고내식 아연-마그네슘-알루미늄 합금 도금강판 (PosMAC)',
        importanceScore: 78,
        oneLineSummary: '기존 용융아연도금강판 대비 내식성이 5배 이상 우수하여 염화칼슘 제설제 환경에서도 20년 이상 녹슬지 않는 강판',
        whyImportant: '섀시 서브프레임 및 배터리 보호 하부 커버에 적용되어 후도장 공정을 생략할 수 있는 원가 절감형 소재입니다.',
        relatedCompanies: ['포스코', '현대제철'],
        sourceLinks: [
          { title: '고내식 삼원계 합금도금강판의 자동차 적용', url: 'https://www.autojournal.or.kr' },
        ],
      },
    ],
  },
};

export const INITIAL_MANUFACTURING_PROCESS_PRESET: ManufacturingProcessResponse = {
  companyName: '현대자동차',
  productName: '아이오닉 5 / 6 (E-GMP 전용 전기차 플랫폼 완성차)',
  processOverview: '원자재 강판 및 알루미늄 코일 입고부터 프레스 가공, 차체 용접 일체화, 전착 도장, E-GMP 전용 배터리/PE시스템 모듈 의장 조립, 지능형 전장/휠 검사 및 주행 테스트 후 최종 출하까지 이어지는 최첨단 친환경 자동차 스마트 공정입니다.',
  steps: [
    {
      stepNumber: 1,
      stepName: '프레스 (Stamping) 공정',
      phaseTag: '원료준비 & 소성가공',
      description: '거대한 코일 형태의 초고장력 강판(AHSS)과 경량 알루미늄 판재를 절단(블랭킹)한 후 수천 톤 규모의 프레스 금형으로 압력을 가해 도어, 후드, 펜더 등 차량 외형 패널을 정밀 성형합니다.',
      equipment: ['5400톤 탠덤 서보 프레스 라인', '고속 블랭킹 머신', '자동 금형 교환 장치(QDC)'],
      qualityPoints: ['성형 크랙 및 네킹(Necking) 불량 제로화', '스프링백(Springback) 탄성 복원 치수 공차 ±0.3mm 이내 관리', '금형 스크랩 끼임 흔적(Burr) 제거'],
      aiAutomationPoints: ['서보 프레스 모터 전류 파형 기반 금형 마모 예측 AI', '초고속 레이저 3차원 광학 스캐너를 통한 실시간 패널 치수 전수 검사', 'AMR을 통한 금형 자동 이송 시스템'],
      interviewTip: '초고장력 강판 적용 시 발생하는 스프링백 현상을 어떻게 시뮬레이션(AutoForm 등)으로 보정하는지 이해하고 있음을 언급하면 생산기술 직무에서 높은 점수를 받습니다.',
    },
    {
      stepNumber: 2,
      stepName: '차체 (Body Assembly) 공정',
      phaseTag: '조립 및 접합',
      description: '프레스 공정에서 가공된 수백 개의 개별 패널들을 로봇이 스폿 용접, 레이저 브레이징, 구조용 접착제 도포 등을 통해 하나의 견고한 차량 골격(BIW: Body In White)으로 조립합니다.',
      equipment: ['고가반하중 다관절 산업용 로봇 (100% 자동화)', '인버터 스폿 용접기', '루프 레이저 용접 시스템', '구조용 접착제 디스펜서'],
      qualityPoints: ['용접 타점 누락 방지 및 너깃(Nugget) 직경 품질 확보', '차체 비틀림 및 대각선 대칭 정밀도 측정', '접착제 도포 단선 및 폭 균일도 모니터링'],
      aiAutomationPoints: ['용접 전류/전압 실시간 데이터 분석을 통한 가상 비파괴 용접 품질 판정 AI', '3D 비전 로봇의 실시간 홀/위치 보정 자동 얼라인먼트', '디지털 트윈 기반 차체 라인 병목 시뮬레이션'],
      interviewTip: '이종 재료(강판+알루미늄) 접합 시 SPR(Self-Piercing Rivet)과 구조용 접착제의 복합 사용 원리를 설명할 수 있으면 차체 공정 이해도가 매우 탁월해 보입니다.',
    },
    {
      stepNumber: 3,
      stepName: '도장 (Paint) 공정',
      phaseTag: '표면처리 및 방청',
      description: '완성된 차체 골격의 부식을 방지하고 고객이 원하는 미려한 색상을 입힙니다. 전착도장(방청) → 실러 도포(수밀) → 중도 → 상도(베이스+클리어코트) → 고온 건조 공정으로 진행됩니다.',
      equipment: ['전자동 전착 수조 시스템', '차체 바닥 실링 방음 로봇', '정전 스프레이 도장 로봇(Bell Type)', 'RTO(축열식 연소산화장치)'],
      qualityPoints: ['도막 두께 균일도(총 100~120㎛)', '도장 표면 먼지/오렌지필(Orange Peel) 결함 최소화', '도어 갭 및 실러 누수 방지 기밀성 확보'],
      aiAutomationPoints: ['AI 기반 표면 미세 결함 광학 스캔 및 자동 샌딩/폴리싱 로봇', '도료 분사량 및 부스 내 온습도 최적 제어 알고리즘', 'VOCs 친환경 배출 저감 자동 모니터링'],
      interviewTip: '전착 도장의 양극/음극 원리와 전착액 순환 필터 관리, 그리고 친환경 수성 도료 전환에 따른 플래시 오프(Flash-off) 시간 제어 중요성을 어필하세요.',
    },
    {
      stepNumber: 4,
      stepName: '의장 및 E-GMP 배터리 합체 (Trim & Assembly)',
      phaseTag: '전장 & 모듈 모듈 조립',
      description: '도장된 차체에 내장 트림, 와이어링 하네스, 칵핏 모듈, 시트 등을 장착하고, 차체 하부에 고전압 대용량 배터리 팩과 전후륜 PE시스템(모터+인버터+감속기)을 일체 결합(샤시 메리지)합니다.',
      equipment: ['샤시 자동 메리지(Chassis Marriage) 설비', 'AGV 무인 섀시 운반차', '너트러너(전동 토크 렌치 및 조임 토크 기록 장치)', '글라스 자동 도포 부착 로봇'],
      qualityPoints: ['고전압 배터리 체결 볼트 토크 및 각도 전수 모니터링(100% 추적 기록)', '고전압 커넥터 절연 저항 및 방수 방진 결합성', '와이어링 하네스 간섭 및 소음(NVH) 유발 방지'],
      aiAutomationPoints: ['작업자 스마트 글래스 및 착용형 외골격 웨어러블 로봇(VEX/CEX)', '스마트 토크 렌치 IoT 데이터 자동 MES(제조실행시스템) 연동', '비전 카메라를 통한 부품 조립 누락 실시간 인터록(Interlock)'],
      interviewTip: '전기차 의장 공정의 핵심은 내연기관 엔진 장착 대신 배터리 팩 결합과 고전압 안전 관리입니다. 체결 이력 추적성(Traceability)과 MES 연계 경험을 강조하세요.',
    },
    {
      stepNumber: 5,
      stepName: '종합 검사 및 전장 보정 (Final Inspection & Calibration)',
      phaseTag: '품질 검사 및 ADAS 보정',
      description: '휠 얼라인먼트, 제동력(브레이크 테스트), 헤드램프 조사각을 맞추고, 자율주행 카메라/레이더 ADAS 센서 타깃 캘리브레이션 및 수밀(방수) 테스트를 실시합니다.',
      equipment: ['휠 얼라인먼트 콤비네이션 테스터', 'ADAS 전방 센서 다이내믹 캘리브레이션 룸', '고압 샤워 수밀 시험 설비(Shower Tester)', '섀시 다이나모미터'],
      qualityPoints: ['휠 토우/캠버 값 정밀 허용치 이내 정렬', 'ADAS 센서 오차각 0.1도 이내 정밀 보정', '고압 20bar 수압 살수 시 차실 내 누수 0건 검증'],
      aiAutomationPoints: ['딥러닝 기반 주행 센서 신호 이상치 자가 진단', 'AI 마이크 음향 분석을 통한 차량 실내 BSR(잡음/이음) 판별', '검사 데이터 클라우드 자동 적재 및 예방 품질 분석'],
      interviewTip: '센서 퓨전 시스템에서 조립 편차에 따른 센서 보정(Calibration) 기술과 방수 누설 시험 불량 발생 시 트러블슈팅 절차를 설명할 수 있으면 품질 직무 면접에서 확실한 차별화가 됩니다.',
    },
    {
      stepNumber: 6,
      stepName: '주행 시험 및 최종 출하 (Road Test & Shipping)',
      phaseTag: '최종 평가 & 출하',
      description: '사내 주행 시험장에서 실제 급가속, 급제동, 요철 주행 및 NVH 이음을 최종 점검한 후, 보호 필름 래핑 및 선적/탁송 대기장으로 출고합니다.',
      equipment: ['사내 특수 주행 시험 코스(벨지언 로드, 험로, 고속 서킷)', '최종 외관 검사 광학 터널', '차량 물류 관제 RFID/GPS 시스템'],
      qualityPoints: ['실차 주행 시 조향 쏠림 및 하체 이상 이음 발생 여부', '최종 도막 광택도 및 오염 검사', '선적 전 배터리 충전 잔량(SoC) 50% 이상 유지'],
      aiAutomationPoints: ['스마트 팩토리 야적장 무인 자율 탁송 시스템', '출고 게이트 RFID 전수 자동 등록 및 물류 관제'],
      interviewTip: '생산기술 및 품질 엔지니어는 고객 인도 직전의 최종 품질 게이트키퍼입니다. 불량이 발견되었을 때 피드백 루프(어느 공정으로 거슬러 올라가 개선할 것인지)를 설명하세요.',
    },
  ],
};

export const INITIAL_INTERVIEW_PRESET: InterviewQuestionsResponse = {
  companyName: '현대자동차',
  jobRole: '생산기술 엔지니어 (스마트팩토리 / 공정 최적화)',
  basicQuestions: [
    {
      id: 'bq-1',
      category: '전공 기초',
      difficulty: '기초',
      question: '철-탄소(Fe-C) 상태도에서 오스테나이트에서 마르텐사이트로 변태할 때의 원리와, 이 과정이 자동차 초고장력 강판 열처리(Hot Stamping)에 어떻게 응용되는지 설명해보세요.',
      modelAnswerKeyPoints: [
        '오스테나이트를 고온(900℃ 이상)에서 급랭(Quenching)할 때 탄소 원자가 확산할 시간 없이 체심정방격자(BCT)로 갇히면서 매우 높은 경도와 인장강도를 갖는 마르텐사이트 조직 형성',
        '핫스탬핑 공정: 강판을 가열해 연성이 높은 상태에서 금형 내에서 성형과 동시에 급냉하여 1500MPa 이상의 초고강도 차체 멤버 제작',
        '스프링백 현상을 획기적으로 줄여 충돌 안전성 확보 및 경량화 달성',
      ],
      tailQuestions: [
        '핫스탬핑 시 금형 냉각 채널의 열전도 불균일로 인해 국소적인 강도 편차가 발생한다면 냉각 라인을 어떻게 설계하고 보정하시겠습니까?',
        '마르텐사이트 강판은 강도가 높은 반면 연신율이 낮아 취성 파괴의 위험이 있는데, 이를 보완하는 복합조직강(DP, TRIP)과의 차이점은 무엇인가요?',
      ],
    },
    {
      id: 'bq-2',
      category: '전공 기초',
      difficulty: '중급',
      question: '공정 능력 지수(Process Capability Index)인 Cp와 Cpk의 정의와 차이점을 설명하고, Cpk가 1.33 미만으로 떨어졌을 때 현장에서 취해야 할 조치는 무엇인가요?',
      modelAnswerKeyPoints: [
        'Cp는 규격 상하한 폭 대비 공정의 산포(6시그마) 비율로 공정 잠재력을 의미하며 치우침(Centering)을 반영하지 못함',
        'Cpk는 공정 평균이 규격 중심에서 벗어난 치우침을 반영한 실제 공정 능력 지수 (Cpk = min(USL - μ, μ - LSL) / 3σ)',
        'Cpk < 1.33 발생 시: 1) 평균 이동(금형 마모, 툴 오프셋 등) 원인 규명 후 보정, 2) 산포 증가(원자재 물성 편차, 온도/압력 노이즈) 제어 요인 분석 및 DOE(실험계획법) 적용',
      ],
      tailQuestions: [
        '단기 공정능력(Cpk)과 장기 공정능력(Ppk)의 차이는 무엇이며, 양산 승인(PPAP) 단계에서 둘 중 무엇을 기준으로 삼아야 할까요?',
        '데이터가 정규분포를 따르지 않을 때(예: 마모나 마이크로 크랙 빈도) Cpk를 그대로 계산해도 되는지와 그 대안을 말씀해주세요.',
      ],
    },
    {
      id: 'bq-3',
      category: '전공 기초',
      difficulty: '기초',
      question: 'PLC(Programmable Logic Controller)의 동작 원리(스캔 사이클: 입력 읽기 → 프로그램 실행 → 출력 쓰기)와 생산 라인의 안전 인터록(Interlock) 회로 설계 시 유의점을 설명하세요.',
      modelAnswerKeyPoints: [
        'PLC 스캔 사이클: Input Scan → Logic Program Execution → Output Scan의 무한 반복 주기 (보통 수 밀리초 단위)',
        '안전 인터록: 비상 정지(E-Stop)나 안전 펜스 도어 오픈 시 소프트웨어 로직뿐 아니라 하드웨어적 접점(하드와이어드 Fail-Safe 릴레이)으로 이중 차단 설계 필수',
        '입출력 지연 시간(Response Time)과 스캔 타임 불일치로 인한 채터링 및 오작동 방지 필터링 설정',
      ],
      tailQuestions: [
        '생산 라인 속도가 빨라져 센서 신호 검출 시간이 PLC 1 스캔 타임보다 짧은 경우 신호 누락을 방지하기 위해 어떤 기법을 사용하나요?',
        '공정 설비 네트워크에서 모드버스(Modbus)나 이더넷/IP와 같은 산업용 필드버스 프로토콜 간의 지연시간(Jitter) 문제를 어떻게 관리할 것인가요?',
      ],
    },
    {
      id: 'bq-4',
      category: '전공 기초',
      difficulty: '중급',
      question: '생산 라인의 택트 타임(Tact Time)과 사이클 타임(Cycle Time), 라인 밸런싱(Line Balancing) 효율을 수식으로 설명하고, 특정 병목 공정(Bottleneck) 해소 전략을 제시하세요.',
      modelAnswerKeyPoints: [
        'Tact Time = 가동 가능 시간 / 고객 요구 수량, Cycle Time = 각 공정별 순수 단위 작업 소요 시간',
        'Line Balancing 효율 = (총 공정 작업 시간의 합) / (공정 수 × 최대 사이클 타임) × 100',
        '병목 해소: 1) 작업 요소 분할 및 비병목 공정으로 작업 이관, 2) 지그(Jig) 개선 및 서브 조립 라인 자동화, 3) 2열 병렬 배치(Dual Station) 적용',
      ],
      tailQuestions: [
        '라인 밸런싱 효율을 95% 이상으로 높였음에도 불구하고 실제 완제품 일일 생산량이 목표치에 도달하지 못하는 주된 현장 요인은 무엇일까요?',
        '다품종 혼류 생산 라인에서 차종별 작업 시간 편차가 클 때 택트 타임을 유지하기 위한 작업 편성 방식을 설명해보세요.',
      ],
    },
    {
      id: 'bq-5',
      category: '전공 기초',
      difficulty: '기초',
      question: '금속 재료의 인장시험 시 응력-변형률 선도(Stress-Strain Curve) 상의 탄성계수, 항복강도, 인장강도, 연신율의 의미를 자동차 충돌 부재 선택 관점에서 설명해주세요.',
      modelAnswerKeyPoints: [
        '탄성계수(영률): 변형에 저항하는 강성(Stiffness) 지표',
        '항복강도: 영구 변형이 시작되는 응력으로 프론트 사이드 멤버 등 충돌 에너지 흡수 구간과 승객실 캐빈 보호 프레임의 강도 분할 기준',
        '인장강도: 파단 전 견디는 최대 응력, 연신율: 파단까지 늘어나는 비율로 성형성과 에너지 흡수율을 결정',
        '승객실 보호에는 고항복강도 초고장력강을 쓰고, 충격 흡수 크럼플 존에는 적절한 연신율로 주름 접힘(Crush)이 발생하는 소재를 복합 배치',
      ],
      tailQuestions: [
        '가공 경화(Strain Hardening) 지수인 n값과 이방성 지수인 r값이 프레스 성형성(Drawability)에 미치는 영향은 무엇인가요?',
        '알루미늄 6000계열 합금의 시효경화(Bake Hardening) 현상이 도장 건조 공정 후 차체 패널 강도에 미치는 이점을 설명하세요.',
      ],
    },
  ],
  techQuestions: [
    {
      id: 'tq-1',
      category: '직무 기술',
      difficulty: '심화',
      question: '현대자동차 E-GMP 전기차 라인에서 고전압 배터리 팩과 차체 하부를 체결하는 볼팅(Bolting) 공정의 자동화 시, 조임 토크 불량 및 나사산 끼임(Cross-thread)을 실시간으로 감지하고 방지하기 위한 제어 방안을 구체적으로 설명하세요.',
      modelAnswerKeyPoints: [
        '너트러너(Nutrunner)의 다축 서보 제어기에서 각도-토크 곡선(Angle vs Torque curve) 실시간 모니터링',
        '초기 진입 구간에서 토크가 급상승하면 크로스 스레드로 판정하여 역회전 후 재시도 알고리즘 구현',
        '최종 체결 단계에서 토크 제어-각도 감시법(Torque Control & Angle Monitoring)을 통해 항복점 부근까지 안정적 소성 체결',
        '체결 데이터(토크, 각도, 시간, 바코드)를 MES 및 품질 DB에 실시간 전송하여 100% 추적성(Traceability) 확보',
      ],
      tailQuestions: [
        '체결 중 체결 토크는 합격 범위에 도달했으나 조임 각도가 기준치보다 현저히 미달된 경우, 실제 기계적 원인은 무엇으로 추정할 수 있나요?',
        '배터리 케이스의 알루미늄 재질과 스틸 볼트 간의 갈바닉 부식(Galvanic Corrosion)을 방지하기 위해 공정에서 적용하는 표면 처리나 절연 와셔 공정은 어떻게 관리하나요?',
      ],
    },
    {
      id: 'tq-2',
      category: '직무 기술',
      difficulty: '심화',
      question: '스마트팩토리 라인에서 비전 AI를 활용한 표면 결함(스크래치, 찍힘, 덴트) 검사기를 도입할 때, 양품 데이터는 수만 장이지만 불량 데이터는 극소수인 데이터 불균형(Imbalance) 문제를 해결하기 위해 어떤 모델링 기법과 데이터 엔지니어링을 적용하시겠습니까?',
      modelAnswerKeyPoints: [
        '비지도 학습 기반 이상치 탐지(Anomaly Detection) 모델(예: PatchCore, FastFlow, AutoEncoder)을 적용하여 정상 데이터의 특징 분포만으로 이상 영역 검출',
        'Defect-GAN이나 Diffusion 기반 합성 기법을 활용하여 실제 발생 가능한 불량 패치를 물리적으로 사실감 있게 증강(Augmentation)',
        '검사 조명 조건(동축 조명, 돔 조명, 다각도 편광)을 최적화하여 광학 단계에서 결함 대비비(Contrast)를 선제적으로 극대화',
        '현장 작업자 피드백을 수용하는 Active Learning 파이프라인을 구축해 엣지 케이스를 재학습 모델에 주기적 반영',
      ],
      tailQuestions: [
        '공정 라인 속도가 분당 60대(초당 1초 미만)인 상황에서 고해상도 이미지 추론 지연 시간(Latency)을 단축하기 위한 경량화(TensorRT, 양자화) 전략은 무엇인가요?',
        '과검(False Positive)과 미검(False Negative) 중 자동차 안전 핵심 부품 공정에서 어느 쪽에 더 가중치를 두어야 하며, 임계값(Threshold)을 어떻게 튜닝하시겠습니까?',
      ],
    },
    {
      id: 'tq-3',
      category: '직무 기술',
      difficulty: '중급',
      question: '현대자동차 싱가포르 글로벌 혁신센터(HMGICS)처럼 컨베이어 벨트를 없애고 셀(Cell) 생산 방식과 자율이동로봇(AMR) 물류로 전환했을 때의 장점과, 생산기술 엔지니어로서 해결해야 할 라인 통제 과제는 무엇인가요?',
      modelAnswerKeyPoints: [
        '장점: 차종별 조립 시간 편차에 구애받지 않는 다품종 유연 생산(전기차, PBV, 로보택시 동시 생산), 라인 증설 없이 유연한 공정 추가/변경',
        '과제 1: 다수 AMR의 경로 충돌 회피 및 최적 디스패칭(Fleet Management System) 알고리즘 구축',
        '과제 2: 각 작업 셀 간 버퍼(Buffer) 재고 최적화 및 정밀 도킹(Docking) 위치 반복 정밀도(±1mm 이내) 확보',
        '과제 3: 디지털 트윈 기반 실시간 병목 감시 및 동적 작업 분배 로직 설계',
      ],
      tailQuestions: [
        '작업 셀 내에서 특정 로봇 설비에 순간 정지가 발생했을 때 전체 셀 물류 흐름이 마비되지 않도록 하는 동적 라우팅(Rerouting) 알고리즘의 원리를 설명해주세요.',
        '기존 컨베이어 라인 대비 AMR 기반 셀 생산 방식의 투자비(CAPEX)와 유지관리비(OPEX) 상의 트레이드오프는 무엇인가요?',
      ],
    },
    {
      id: 'tq-4',
      category: '직무 기술',
      difficulty: '중급',
      question: '사출/프레스 설비 또는 로봇 감속기의 모터 전류 및 진동 신호를 수집하여 예지보전(Predictive Maintenance) 시스템을 구축하고자 합니다. 센서 선정부터 신호 처리(FFT, 웨이블릿), 알람 룰셋 설정까지의 전체 구축 파이프라인을 설명하세요.',
      modelAnswerKeyPoints: [
        '데이터 수집: 가속도계 진동 센서(고주파 10kHz 이상 샘플링) 및 모터 3상 CT(전류 센서) 부착',
        '전처리 및 특징 추출: 시계열 노이즈 필터링, FFT(고속 푸리에 변환)를 통해 베어링 외륜/내륜/볼 결함 주파수 성분 분석, 웨이블릿 변환으로 비정상 충격 신호 포착',
        '진단 및 모델링: 통계적 특징치(RMS, 첨도 Kurtosis, 파고율) 기반 관리 상한선(UCL) 설정 및 머신러닝 이상치 점수화',
        '알람 및 연동: 이상 징후 발생 시 현장 안돈(Andon) 시스템 및 정비 담당자 태블릿 알림 자동 발송, 점검 계획 자동 스케줄링',
      ],
      tailQuestions: [
        '기어박스처럼 백그라운드 기계 소음이 매우 심한 환경에서 마이크로 베어링 크랙 신호만 정밀하게 분리해내기 위한 신호 필터링 기법은 무엇인가요?',
        '단순히 임계치를 넘었을 때 알람을 울리는 것을 넘어, 잔여 유효 수명(RUL: Remaining Useful Life)을 예측하기 위해 어떤 모델을 활용할 수 있을까요?',
      ],
    },
    {
      id: 'tq-5',
      category: '직무 기술',
      difficulty: '심화',
      question: '신차 양산 6개월 전 파일럿(Pilot) 생산 단계에서 차체 도어 단차(Gap) 및 틈새(Flushness) 치수 산포가 스펙(Spec)을 벗어나는 문제가 발생했습니다. 원인 분석을 위한 4M1E(인력, 설비, 재료, 방법, 환경) 트러블슈팅 접근법을 구체적으로 제시하세요.',
      modelAnswerKeyPoints: [
        'Man: 작업자별 도어 힌지 체결 토크 편차 및 셋업 지그 사용 미숙 점검',
        'Machine: 용접 로봇 툴링 그리퍼 마모, 체결 지그 로케이션 핀(Pin) 치수 마모 및 유격 3차원 측정',
        'Material: 입고된 도어 이너/아우터 패널의 인장강도 로트(Lot) 편차 및 스프링백 차이 검증',
        'Method: 조립 순서(선체결/후정렬) 표준작업서(SOP) 준수 여부 및 접착제 경화 시간 영향 점검',
        'Environment: 계절/주야간 공장 내부 온도 변화에 따른 알루미늄/스틸 열팽창 수축량 편차 보정',
        '개선 후 3차원 CMM 계측 데이터로 Cpk 1.67 이상 달성 확인 후 표준화 반영',
      ],
      tailQuestions: [
        '원인이 힌지 금형의 열 변형으로 밝혀졌을 때, 금형을 즉시 수정하기 전까지 파일럿 라인에서 취할 수 있는 긴급 임시 대책(Workaround)은 무엇이 있을까요?',
        '도어 단차 검사를 육안 게이지(Feeler gauge) 대신 3D 블루라이트 광학 스캐너로 전수 자동화할 때 발생할 수 있는 현장 설치 애로사항과 해결책은 무엇인가요?',
      ],
    },
  ],
};

export const INITIAL_MATCHING_PRESET: MatchingResultResponse = {
  extractedRoleTitle: '스마트팩토리 AI/DX 엔지니어 및 생산기술 (제조 빅데이터/품질 이상감지)',
  overallMatchRate: 85,
  summaryAnalysis: '지원자의 시계열 센서 이상치 탐지 프로젝트 및 머신비전 딥러닝 경험이 공고의 핵심 요건인 [설비 예지보전] 및 [품질 검사 자동화]와 긴밀하게 일치합니다. 다만 현장 PLC/MES 제어 연동 및 현업 오퍼레이터와의 도메인 협업 경험은 보완 스토리텔링이 권장됩니다.',
  competencyMatches: [
    {
      id: 'comp-1',
      competency: '제조 설비 시계열 센서 데이터 기반 이상 감지 및 예지보전(PdM) 모델 개발',
      importance: '필수',
      matchedExperience: '대학 연구실에서 모터 진동 가속도계 센서 데이터 20만 건을 수집하여 FFT 변환 및 LSTM Autoencoder 모델을 구축, 베어링 결함 사전 탐지 F1-Score 0.93 달성',
      matchStrength: '상',
      appealSentenceExample: '모터 진동 센서의 10kHz 고주파 시계열 데이터를 FFT 주파수 스펙트럼으로 변환하고 LSTM 오토인코더를 적용해 미세 결함 탐지율을 93%까지 끌어올린 실전 모델링 역량을 보유하고 있습니다.',
      gapSuggestion: '',
    },
    {
      id: 'comp-2',
      competency: '컴퓨터 비전 딥러닝 기반 제품 표면 불량 검사 및 데이터 증강 파이프라인 구축',
      importance: '필수',
      matchedExperience: '제조 데이터 해커톤에서 금속 표면 스크래치 결함 검출 과제 참여, PatchCore 비지도 모델과 CutPaste 증강을 활용해 과검률 3.2% 미만 달성 (우수상 수상)',
      matchStrength: '상',
      appealSentenceExample: '정상 데이터 기반 비지도 이상치 탐지 알고리즘(PatchCore)과 데이터 증강 기법을 결합하여, 실제 양산 라인의 극심한 불량 데이터 불균형 환경에서도 과검률을 3%대로 억제한 성공 경험이 있습니다.',
      gapSuggestion: '',
    },
    {
      id: 'comp-3',
      competency: 'Edge 디바이스 배포를 위한 딥러닝 모델 경량화 및 추론 가속화 (TensorRT/ONNX)',
      importance: '우대',
      matchedExperience: 'YOLOv8 모델을 NVIDIA Jetson Orin 환경에 배포하기 위해 FP16 양자화 및 TensorRT 엔진 빌드를 수행하여 추론 지연 시간을 42ms에서 11ms로 73% 단축',
      matchStrength: '상',
      appealSentenceExample: '고속 생산 라인의 1초 이내 인라인 전수 검사를 충족하기 위해 TensorRT 양자화 최적화를 주도하여 추론 지연을 11ms로 대폭 단축시킨 실시간 엣지 서빙 경험이 강점입니다.',
      gapSuggestion: '',
    },
    {
      id: 'comp-4',
      competency: '생산 현장 PLC/MES 시스템과의 산업용 통신(OPC-UA, Modbus) 연동 및 데이터 파이프라인',
      importance: '필수',
      matchedExperience: '스마트공장 아카데미 실습에서 OPC-UA 프로토콜을 이용해 아두이노/라즈베리파이 센서 데이터를 InfluxDB 시계열 데이터베이스로 전송하는 파이프라인 구축 실습',
      matchStrength: '중',
      appealSentenceExample: '산업용 표준 프로토콜인 OPC-UA 기반의 데이터 수집 파이프라인을 구축해본 경험을 바탕으로, 공장 내 다양한 벤더의 PLC 및 MES 시스템과 유연하게 인터페이스할 수 있습니다.',
      gapSuggestion: '실제 양산 라인에서 사용하는 지멘스나 미쓰비시 PLC와의 통신 패킷 구조 및 통신 장애 시 페일오버(Failover) 버퍼링 메커니즘을 추가로 학습하면 면접에서 훨씬 신뢰감을 줄 수 있습니다.',
    },
    {
      id: 'comp-5',
      competency: '생산기술/품질 현업 엔지니어 및 현장 작업자와의 문제 정의 및 피드백 루프 조율',
      importance: '기본',
      matchedExperience: '산학협력 프로젝트 시 중소 부품 가공 공장을 방문해 라인 작업자 인터뷰를 진행하고 검사기 UI/UX를 터치스크린 맞춤형으로 개선',
      matchStrength: '중',
      appealSentenceExample: '직접 공장 현장을 방문하여 작업자의 피로도를 유발하는 과검 알람 패턴을 분석하고 터치 기반 즉각 보정 UI를 구현하여 현업 채택률을 극대화한 소통 경험이 있습니다.',
      gapSuggestion: '기술적 지표(정확도, AUC)만을 고집하지 않고, 현업의 핵심 KPI인 [가동률(OEE), 시간당 생산 대수(UPH), 폐기 비용 절감액]으로 변환하여 대화한 사례를 자소서에 보강하세요.',
    },
    {
      id: 'comp-6',
      competency: 'ISO 26262 또는 자동차 부품 품질 관리 표준(IATF 16949, APQP, PPAP) 프로세스 이해',
      importance: '우대',
      matchedExperience: '직접적인 프로젝트 수행 경험 미입력',
      matchStrength: '보완 필요',
      appealSentenceExample: '품질 경영 및 통계적 공정관리(SPC) 기본 지식을 바탕으로 IATF 16949 규격의 관리계획서(Control Plan)와 FMEA(고장형태영향분석) 방법론을 빠르게 습득하여 양산 품질 체계에 즉시 기여하겠습니다.',
      gapSuggestion: '자동차 품질 관리의 5대 코어 툴(APQP, FMEA, MSA, SPC, PPAP) 중 특히 FMEA(고장형태 영향분석)와 SPC(관리도 판독 규격)의 기본 원리를 정리하고, 본인의 AI 모델에 고장 원인 분석을 연계하여 답변을 준비하는 것을 추천합니다.',
    },
  ],
};
