import React from 'react';
import { motion } from 'motion/react';
import { 
  Smartphone, 
  User, 
  Ticket, 
  Mic, 
  Map as MapIcon, 
  Home, 
  Settings, 
  Eye
} from 'lucide-react';

const IA_THEME = {
  entry: "bg-neutral-900 text-white",
  main: "bg-blue-600 text-white",
  sub: "bg-white text-gray-900 border-gray-200",
  detail: "bg-rose-500 text-white"
};

const Node = ({ 
  title, 
  items, 
  type = "sub",
  icon: Icon,
  className = "" 
}: { 
  title: string; 
  items?: { id: string; name: string; desc?: string }[]; 
  type?: keyof typeof IA_THEME;
  icon?: any;
  className?: string;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`flex flex-col rounded-xl overflow-hidden shadow-sm border transition-all hover:shadow-md ${IA_THEME[type]} ${className}`}
  >
    <div className="px-4 py-2.5 flex items-center justify-between border-b border-black/5">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={14} className="opacity-80" />}
        <span className="text-[11px] font-black tracking-tight uppercase">{title}</span>
      </div>
      <div className="w-1.5 h-1.5 rounded-full bg-current opacity-30"></div>
    </div>
    <div className={`p-1 ${type === 'sub' ? 'bg-white' : 'bg-white/5 backdrop-blur-sm'}`}>
      {items?.map((item, i) => (
        <div key={i} className={`flex items-start gap-2 p-2 rounded-lg ${type === 'sub' ? 'hover:bg-gray-50' : 'hover:bg-white/10'} transition-colors mb-0.5 last:mb-0`}>
          <span className={`text-[10px] font-bold shrink-0 mt-0.5 ${type === 'sub' ? 'text-blue-600' : 'text-current opacity-60'}`}>
            {item.id}
          </span>
          <div className="flex flex-col">
            <span className={`text-[11px] font-bold leading-tight ${type === 'sub' ? 'text-gray-800' : 'text-current'}`}>
              {item.name}
            </span>
            {item.desc && (
              <span className={`text-[9px] mt-0.5 leading-tight ${type === 'sub' ? 'text-gray-400' : 'text-current opacity-70'}`}>
                {item.desc}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

export const InformationArchitecture = () => {
  return (
    <div className="w-full bg-white border border-gray-100 rounded-[3rem] p-10 lg:p-16 shadow-2xl shadow-blue-900/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] -mr-48 -mt-48 opacity-50"></div>
      
      <div className="relative z-10 min-w-[900px]">
        {/* Step 1: Entry */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex gap-4 items-center">
             <Node 
                title="1.0 ENTRY FLOW" 
                type="entry"
                icon={Smartphone}
                items={[
                  { id: "1.1", name: "Splash / Onboarding", desc: "핵심 가치 소개 및 진입" },
                  { id: "1.2", name: "Social Login & Setup", desc: "접근성 프로필 초기 설정" }
                ]}
                className="w-64"
             />
          </div>
          <div className="h-12 w-px bg-gradient-to-b from-neutral-900 to-blue-600"></div>
          <div className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] shadow-lg shadow-blue-200">
            MAIN NAVIGATION
          </div>
        </div>

        {/* Step 2: Tabs */}
        <div className="grid grid-cols-5 gap-6 relative">
          {/* Horizontal connecting line */}
          <div className="absolute top-[-32px] left-[10%] right-[10%] h-[2px] bg-blue-100"></div>

          {/* Home */}
          <div className="flex flex-col items-center">
            <div className="absolute top-[-32px] w-[2px] h-8 bg-blue-100"></div>
            <Node 
              title="2.1 HOME" 
              type="sub"
              icon={Home}
              items={[
                { id: "01", name: "맞춤형 추천 (큐레이션)", desc: "접근성 필터 기반 노출" },
                { id: "02", name: "내 주변 공연 (LBS)", desc: "위치 기반 실시간 추천" },
                { id: "03", name: "신규/오픈 예정 라인업" },
                { id: "04", name: "TTS 보이스 가이드" }
              ]}
              className="w-full"
            />
          </div>

          {/* Search/Map */}
          <div className="flex flex-col items-center">
            <div className="absolute top-[-32px] w-[2px] h-8 bg-blue-100"></div>
            <Node 
              title="2.2 MAP" 
              type="sub"
              icon={MapIcon}
              items={[
                { id: "01", name: "대화형 극장 매핑", desc: "현재 위치 주변 극장 시각화" },
                { id: "02", name: "목록 보기 & 필터링", desc: "유형별/거리별 조건 탐색" }
              ]}
              className="w-full"
            />
          </div>

          {/* AI Helper */}
          <div className="flex flex-col items-center">
            <div className="absolute top-[-32px] w-[2px] h-8 bg-blue-100"></div>
            <Node 
              title="2.3 SUPPORT" 
              type="sub"
              icon={Mic}
              items={[
                { id: "01", name: "AI 음성 예매 도우미", desc: "Chat/Voice 인터페이스" },
                { id: "02", name: "동행/서포터즈 매칭", desc: "관람 보조원 모집 시스템" }
              ]}
              className="w-full border-blue-200 ring-2 ring-blue-50 ring-offset-2"
            />
          </div>

          {/* Tickets - Connects to Detail */}
          <div className="flex flex-col items-center relative">
            <div className="absolute top-[-32px] w-[2px] h-8 bg-blue-100"></div>
            <Node 
              title="2.4 TICKET" 
              type="sub"
              icon={Ticket}
              items={[
                { id: "01", name: "외부 예매처 연동", desc: "계정 통합 관리 기능" },
                { id: "02", name: "나의 관람 캘린더", desc: "시간순 일정 리스트" },
                { id: "03", name: "찜/오픈 알림 목록" }
              ]}
              className="w-full"
            />
            
            {/* Arrow to Detail */}
            <div className="flex flex-col items-center mt-6">
               <div className="h-10 w-[2px] bg-gradient-to-b from-gray-200 to-rose-500"></div>
               <Node 
                title="3.1 공연 상세 (Details)" 
                type="detail"
                icon={Eye}
                items={[
                  { id: "1", name: "편의시설 뱃지 정보", desc: "휠체어/자막/수어 지원 여부" },
                  { id: "2", name: "VR 좌석 시야 체험", desc: "360도 공간 뷰어 탑재" },
                  { id: "3", name: "하이브리드 리뷰", desc: "작품평 + 접근성 평가 분리" }
                ]}
                className="w-full"
              />
            </div>
          </div>

          {/* More */}
          <div className="flex flex-col items-center">
            <div className="absolute top-[-32px] w-[2px] h-8 bg-blue-100"></div>
            <Node 
              title="2.5 MY" 
              type="sub"
              icon={Settings}
              items={[
                { id: "01", name: "맞춤 접근성 프로필", desc: "장애 유형별 상세 상시 설정" },
                { id: "02", name: "나의 활동 기록", desc: "작성 후기 및 동선 보관함" }
              ]}
              className="w-full"
            />
          </div>
        </div>

        {/* Legend / Key Features */}
        <div className="mt-20 flex flex-wrap items-center justify-between gap-10 pt-10 border-t border-gray-100">
           <div className="flex gap-8">
              {[
                { label: "Core Journey", color: "bg-blue-600" },
                { label: "Special Support", color: "bg-blue-200" },
                { label: "Accessibility Info", color: "bg-rose-500" }
              ].map((l, i) => (
                <div key={i} className="flex items-center gap-3">
                   <div className={`w-3 h-3 rounded-full ${l.color}`}></div>
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{l.label}</span>
                </div>
              ))}
           </div>
           
           <div className="flex items-center gap-6">
              <div className="flex flex-col items-end">
                
                <div className="flex gap-2">
                   
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
