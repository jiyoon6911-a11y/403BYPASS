import React from 'react';
import { motion } from 'motion/react';
import { 
  Home, 
  Map as MapIcon, 
  HandHeart, 
  Ticket, 
  User, 
  Smartphone, 
  Filter, 
  Users, 
  Eye, 
  Clock, 
  Navigation, 
  Layers, 
  TrainFront, 
  Headphones, 
  Sparkles,
  Calendar,
  AlertCircle
} from 'lucide-react';

const FEATURE_DATA = [
  {
    tab: "홈 화면",
    icon: <Home className="text-blue-500" size={24} />,
    color: "from-blue-50 to-white",
    items: [
      {
        title: "공연 추천",
        desc: "'나를 위한 맞춤 추천 공연' — 선호 장르 1위, 서비스 횟수 기반 AI 랭킹 반영",
        tags: ["전체", "뮤지컬", "연극", "콘서트", "클래식"]
      },
      {
        title: "접근성 필터",
        desc: "홈 화면 상단 빠른 필터 제공",
        elements: ["휠체어 접근", "자막 제공", "음성 해설", "수어 통역"]
      },
      {
        title: "공식 서포터즈",
        desc: "'403 서포터즈 1기 대모집!' — 근접성 어바이터(리워드 뱃지) 혜택 안내",
        banner: true,
        action: "지원하기"
      }
    ]
  },
  {
    tab: "안내/맵 화면",
    icon: <MapIcon className="text-emerald-500" size={24} />,
    color: "from-emerald-50 to-white",
    items: [
      {
        title: "실시간 현장 혼잡도",
        desc: "층별·공간별 현재 혼잡 상태 표시 (예: '1층 휠체어 전용 화장실 — 잔여 (현재 대기 4명)')",
        action: "스마트 웨이팅"
      },
      {
        title: "AI AR 길안내",
        desc: "'내 위치를 보며 찾아가기' — 카메라 화면 위에 AR로 안전한 단계적 안내 및 단축길 표시",
        action: "AR 길안내 시작"
      },
      {
        title: "건물 내부 S-MAP (3D)",
        desc: "S-MAP 연동 — 공연장 내부 3D 구조 시뮬레이터 (원하는 자리 둘러보기 및 간판 확인)",
        action: "건물 3D로 보기"
      },
      {
        title: "교통 연동 (또타지하철)",
        desc: "'지하철 EV 고장 현황 실시간 안내' — 공연장 인근 역 승강기 고장 여부 실시간 확인",
        action: "또타지하철 앱 연결"
      }
    ]
  },
  {
    tab: "매칭 & 예약",
    icon: <HandHeart className="text-rose-500" size={24} />,
    color: "from-rose-50 to-white",
    items: [
      {
        title: "접근성 매니저 사전 예약",
        desc: "1:1 현장 동행 지원 매니저 배정 (필요한 지원 유형 사전 선택 포함)",
        action: "통합 매니저 일정 및 예약"
      },
      {
        title: "AI 자막안경 현장 대여",
        desc: "충무아트센터 연계 AI AR 자막 안경 대여 및 실시간 자막 저장",
        action: "기기 대여 가능 시간 조회"
      }
    ]
  },
  {
    tab: "나의 티켓",
    icon: <Ticket className="text-purple-500" size={24} />,
    color: "from-purple-50 to-white",
    items: [
      {
        title: "티켓 탭 구성",
        desc: "예매 완료 / 지난 관람일 분리 관리 (다가오는 일정 상단 노출)",
        icon: <Calendar size={14} />
      },
      {
        title: "티켓 상세 정보",
        desc: "특별 연극 (VR 시범운영), 예매일시: 2026.06.01, 좌석: 한강석 10만명 등 정보 제공",
        tag: "VR TAG"
      },
      {
        title: "이번 달 일정 캘린더",
        desc: "월별 공연 일정 캘린더 뷰 및 공연 예정일 하이라이트 표시"
      },
      {
        title: "뻔한 공연 티켓팅 정보",
        desc: "취소·환불·유의사항 등 실용 정보 및 '입장마감 전 팁' 안내"
      }
    ]
  },
  {
    tab: "마이 페이지",
    icon: <User className="text-gray-600" size={24} />,
    color: "from-gray-50 to-white",
    items: [
      {
        title: "방문자 프로필",
        desc: "닉네임, 프로필 사진 및 개인 환경 설정",
        icon: <Smartphone size={14} />
      },
      {
        title: "관람 히스토리 및 리뷰",
        desc: "지난 공연 관람 이력 확인 (초기 상태: '아직 작성된 히스토리가 없습니다')",
        icon: <Clock size={14} />
      }
    ]
  }
];

export const CoreFeatures = () => {
  const [activeIdx, setActiveIdx] = React.useState(0);

  return (
    <div className="w-full space-y-10">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-gray-100 rounded-2xl">
        {FEATURE_DATA.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all
              ${activeIdx === idx 
                ? 'bg-white text-gray-900 shadow-md scale-105' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200/50'}
            `}
          >
            {React.cloneElement(tab.icon as React.ReactElement, { size: 16 })}
            {tab.tab}
          </button>
        ))}
      </div>

      {/* Feature Content */}
      <motion.div
        key={activeIdx}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`
          relative overflow-hidden rounded-[3rem] border border-gray-100 bg-gradient-to-br ${FEATURE_DATA[activeIdx].color} 
          p-10 lg:p-16 shadow-2xl shadow-blue-900/5
        `}
      >
        <div className="flex flex-col lg:flex-row gap-12 relative z-10">
          {/* Left: Title Area */}
          <div className="lg:w-1/3">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-6">
              {FEATURE_DATA[activeIdx].icon}
            </div>
            <h4 className="text-4xl font-black text-gray-900 mb-4 font-display italic">
              {FEATURE_DATA[activeIdx].tab}
            </h4>
            <p className="text-gray-500 font-bold leading-relaxed">
              사용자 앱 화면을 기준으로 설계된 <span className="text-blue-600">{FEATURE_DATA[activeIdx].tab}</span>의 핵심 기능 고도화 내역입니다.
            </p>
          </div>

          {/* Right: Feature Cards */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURE_DATA[activeIdx].items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/80 backdrop-blur-sm border border-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  <h5 className="text-lg font-black text-gray-900">{item.title}</h5>
                </div>
                <p className="text-sm text-gray-500 font-medium leading-relaxed mb-4">
                  {item.desc}
                </p>

                {/* Specific Elements */}
                {item.tags && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-black px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {item.elements && (
                  <div className="grid grid-cols-2 gap-2">
                    {item.elements.map((el, eIdx) => (
                      <div key={eIdx} className="bg-blue-50 text-blue-600 text-[10px] font-black p-2 rounded-xl text-center">
                        {el}
                      </div>
                    ))}
                  </div>
                )}

                {item.action && (
                  <button className="w-full mt-2 py-2 bg-gray-900 text-white rounded-xl text-[10px] font-black tracking-widest uppercase hover:bg-blue-600 transition-colors">
                    {item.action}
                  </button>
                )}

                {item.banner && (
                  <div className="mt-2 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white">
                    <div className="text-[9px] font-black uppercase tracking-widest opacity-70 mb-1">Supporters</div>
                    <div className="text-xs font-black">403 서포터즈 1기 대모집!</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-[-10%] right-[-5%] text-gray-200/20 pointer-events-none">
          {React.cloneElement(FEATURE_DATA[activeIdx].icon as React.ReactElement, { size: 300 })}
        </div>
      </motion.div>

      {/* Summary info */}
      <div className="flex justify-end items-center px-4">
        <div className="text-[10px] font-black text-blue-600 italic">403BYPASS_CORE_MODULES</div>
      </div>
    </div>
  );
};
