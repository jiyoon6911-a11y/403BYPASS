import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ticket, Calendar, Clock, MapPin, Search, ChevronRight, ArrowRight, User, MousePointerClick, Heart, Share2, Navigation, AlertCircle, Info, Activity, Shield, Eye, BarChart3, PieChart as PieChartIcon, X, Code, Palette, Rocket } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

import { GlossaryPanel } from './components/GlossaryPanel';
// Character maps for pixel text (0: empty, 1: solid)
const CHARS: Record<string, number[][]> = {
  '4': [[1,0,1],[1,0,1],[1,1,1],[0,0,1],[0,0,1]],
  '0': [[1,1,1],[1,0,1],[1,0,1],[1,0,1],[1,1,1]],
  '3': [[1,1,1],[0,0,1],[1,1,1],[0,0,1],[1,1,1]],
  'B': [[1,1,0],[1,0,1],[1,1,0],[1,0,1],[1,1,0]],
  'Y': [[1,0,1],[1,0,1],[0,1,0],[0,1,0],[0,1,0]],
  'P': [[1,1,1],[1,0,1],[1,1,1],[1,0,0],[1,0,0]],
  'A': [[0,1,0],[1,0,1],[1,1,1],[1,0,1],[1,0,1]],
  'S': [[1,1,1],[1,0,0],[1,1,1],[0,0,1],[1,1,1]],
  ' ': [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
};

const NAMES = ['김율', '신송희', '심예은', '이수민', '이효성', '조윤솔', '홍지윤'];
const GRID_ROWS = 13;
const GRID_COLS = 26;

interface CellData { active: boolean; charRowIdx: number; }

const generateGrid = (): CellData[][] => {
  const grid: CellData[][] = Array.from({ length: GRID_ROWS }, () =>
    Array.from({ length: GRID_COLS }, () => ({ active: false, charRowIdx: -1 }))
  );
  const writeText = (str: string, startRow: number, startCol: number) => {
    let col = startCol;
    for (const char of str) {
      const shape = CHARS[char] || CHARS[' '];
      for (let cr = 0; cr < 5; cr++) for (let cc = 0; cc < 3; cc++) {
        if (shape[cr][cc] === 1) grid[startRow + cr][col + cc] = { active: true, charRowIdx: cr };
      }
      col += 4;
    }
  };
  writeText('403', 1, 1);
  writeText('BYPASS', 7, 1);
  return grid;
};

const Seat = ({ active, rowIdx, delay }: { active: boolean; rowIdx: number; delay: number; key?: string|number|React.Key }) => {
  // Real ticketing site colors (VIP: Purple, R: Green, S: Blue, A: Orange, B: Yellow)
  const activeColors = [
    'bg-purple-500 border border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]',
    'bg-green-500 border border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.5)]',
    'bg-blue-500 border border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]',
    'bg-orange-500 border border-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.5)]',
    'bg-yellow-400 border border-yellow-300 shadow-[0_0_10px_rgba(250,204,21,0.5)]',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay * 0.005, duration: 0.3 }}
      whileHover={{ scale: 1.2, zIndex: 10, y: -2 }}
      className={`w-[14px] h-[12px] sm:w-[18px] sm:h-[16px] md:w-[24px] md:h-[20px] rounded-t-sm rounded-b-none cursor-pointer transition-colors shrink-0
        ${active ? activeColors[rowIdx] : 'bg-white/5 border border-white/20'}`}
    />
  );
};

const StageMap = ({ grid }: { grid: CellData[][] }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-4 sm:p-10 flex flex-col items-center">
      <div className="flex border-b border-gray-200 pb-4 mb-10 w-full justify-between items-end">
        <h3 className="text-xl font-bold text-gray-900">
          좌석배치도
        </h3>
        <div className="hidden sm:flex gap-4 text-xs font-semibold text-gray-600">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-[#A445D1] rounded-sm"></div>VIP석</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-[#069D42] rounded-sm"></div>R석</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-[#1F6EEE] rounded-sm"></div>S석</div>
        </div>
      </div>

      <div className="w-full max-w-3xl h-10 sm:h-12 bg-gray-100 border border-gray-200 rounded-t-[100px] mb-12 flex justify-center items-center">
        <span className="text-gray-400 font-bold tracking-[0.3em] text-sm">STAGE</span>
      </div>

      <div className="flex flex-col gap-[3px] sm:gap-[4px] items-center relative">
        {grid.map((row, rIdx) => (
          <div key={rIdx} className="flex gap-[3px] sm:gap-[4px] justify-center relative">
            <div className="absolute right-[100%] mr-3 sm:mr-6 flex items-center h-full">
              <span className="text-[10px] sm:text-xs font-bold text-gray-400 w-4 text-right">{String.fromCharCode(65 + rIdx)}</span>
            </div>
            {row.map((cell, cIdx) => (
              <Seat key={cIdx} active={cell.active} rowIdx={cell.charRowIdx} delay={rIdx * 26 + cIdx} />
            ))}
             <div className="absolute left-[100%] ml-3 sm:ml-6 flex items-center h-full">
              <span className="text-[10px] sm:text-xs font-bold text-gray-400 w-4">{String.fromCharCode(65 + rIdx)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      setDisplayValue(Math.floor(easeProgress * value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value]);

  return <>{displayValue}</>;
};

const ROADMAP_PHASES = [
  {
    phase: "Phase 1",
    subtitle: "The Foundation",
    title: "리서치 및 문제 발굴",
    progress: 100,
    details: [
      "실태 조사: 전국 공연장 중 휠체어석 보유율 20%, 민간 공연장 필수 편의시설 설치율 단 1%라는 열악한 인프라 현실을 데이터로 확인했습니다.",
      "환경 분석: 대학로 소극장 65%가 접근조차 불가능한 물리적 장벽과, 파편화된 공연 정보가 만드는 '정보 빈곤' 문제를 정의했습니다.",
      "개념 재정립: 기존의 시혜적 '배리어 프리'를 넘어, 모든 관객의 권리를 보장하는 '유니버설 서비스'로 프로젝트의 방향성을 확립했습니다."
    ]
  },
  {
    phase: "Phase 2",
    subtitle: "The Insight",
    title: "핵심 인사이트 도출",
    progress: 50,
    details: [
      "커브컷 효과 발견: 휠체어용 경사로가 모두에게 편리함을 주듯, 접근성 강화가 전체 관객의 경험을 상향 평준화한다는 '커브컷 효과'를 핵심 전략으로 삼았습니다.",
      "데이터 검증: 배리어프리 오페라 관객의 80%가 비장애인이었으며, 이들 중 98%가 서비스에 만족했다는 연구 결과를 통해 유니버설 서비스의 시장성을 확인했습니다.",
      "글로벌 벤치마킹: 뉴욕 브로드웨이의 'Theatre Access NYC' 등 해외 성공 사례를 분석하여 서비스 모델의 기틀을 마련했습니다."
    ]
  },
  {
    phase: "Phase 3",
    subtitle: "The Blueprint",
    title: "서비스 기획 및 UX 디자인",
    progress: 0,
    details: [
      "4대 솔루션 설계: 관람 여정의 단절을 막기 위한 [이동, 시야, 흐름, 안전] 중심의 핵심 기능을 도출했습니다.",
      "디자인 시스템: Google Stitch를 활용하여 고대비(High Contrast) UI와 픽셀 아트 감성을 결합한 사용자 중심의 인터페이스를 시각화했습니다.",
      "여정 고도화: 예매부터 귀가까지 누군가의 도움 없이 스스로 해내는 '독립적 관람' 프로세스를 설계했습니다."
    ]
  },
  {
    phase: "Phase 4",
    subtitle: "The Prototype",
    title: "기술 구현 및 프로토타입",
    progress: 0,
    details: [
      "지능형 로직 구축: Google AI Studio를 활용해 복잡한 상황별 맞춤 경로와 실시간 정보를 제공하는 서비스 알고리즘을 구현했습니다.",
      "웹사이트 런칭: Vercel을 통해 프로젝트의 철학과 진행 과정을 공유하는 공식 소개 사이트를 배포했습니다.",
      "기능 검증: 기획된 솔루션이 실제 관객의 불편함을 어떻게 해소하는지 프로토타입을 통해 테스트하고 보완합니다."
    ]
  },
  {
    phase: "Phase 5",
    subtitle: "The Horizon",
    title: "리서치 보강 및 앱 완성",
    progress: 0,
    details: [
      "실무 리서치 고도화: 실제 이용자 인터뷰와 추가 조사를 통해 서비스 디테일을 정교하게 다듬는 과정을 거칩니다.",
      "애플리케이션 완성: 고도화된 리서치 결과를 반영하여 누구나 차별 없이 공연의 감동에 닿을 수 있는 최종 앱을 제작합니다.",
      "생태계 확장: 궁극적으로 시설 운영자의 자발적 개선을 유도하는 '접근성 랭킹 시스템'을 도입하여 지속 가능한 공연 문화를 만듭니다."
    ]
  }
];

const ProjectRoadmap = () => {
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);

  const totalProgress = Math.round(ROADMAP_PHASES.reduce((acc, p) => acc + p.progress, 0) / ROADMAP_PHASES.length);
  
  const currentPhaseIdx = ROADMAP_PHASES.findIndex(p => p.progress < 100);
  const safeCurrentIdx = currentPhaseIdx === -1 ? ROADMAP_PHASES.length - 1 : currentPhaseIdx;
  const displayPhaseIdx = hoveredPhase !== null ? hoveredPhase : safeCurrentIdx;
  const activePhase = ROADMAP_PHASES[displayPhaseIdx];

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl p-4 sm:p-10 mb-16 overflow-hidden relative font-sans text-gray-900 shadow-sm mt-16 max-w-[1240px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-gray-100 pb-6 mb-12 gap-8 relative z-10">
        <div>
          <h3 className="font-display text-2xl sm:text-4xl font-black tracking-tight text-gray-900 flex flex-col sm:flex-row sm:items-center gap-2">
            <span>프로젝트 로드맵</span> 
            <span className="hidden sm:inline-block text-gray-300 font-light mx-2">|</span> 
            <span className="text-blue-600">403 BYPASS</span>
          </h3>
          <div className="flex items-center gap-2 mt-4 text-gray-500 font-medium">
            공연 예술의 접근성 향상을 위한 단계별 추진 현황
          </div>
        </div>
        <div className="sm:text-right bg-blue-50 border border-blue-100 px-6 py-4 rounded-xl">
          <div className="text-xs text-blue-600 font-bold mb-1">전체 진행률</div>
          <div className="flex items-baseline justify-start sm:justify-end gap-1">
            <span className="text-4xl sm:text-5xl font-black text-blue-600 tracking-tighter">
               <AnimatedNumber value={totalProgress} />
            </span>
            <span className="text-blue-600 font-bold">%</span>
          </div>
        </div>
      </div>

      {/* OVERALL TIMELINE PROGRESS BAR */}
      <div className="w-full overflow-x-auto hide-scrollbar pb-16 relative z-10">
        <div className="min-w-[700px] sm:min-w-full relative pt-12 px-6 sm:px-12">
          
          <div className="w-full h-2 bg-gray-100 rounded-full relative overflow-hidden">
            <motion.div 
               className="h-full bg-blue-600 relative"
               initial={{ width: 0 }}
               animate={{ width: `${totalProgress}%` }}
               transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          <div className="absolute top-[44px] left-0 w-full h-1 px-6 sm:px-12 pointer-events-none">
            {ROADMAP_PHASES.map((phase, idx) => {
               const centerPos = idx * 20 + 10; // Distribute evenly
               const isCompleted = phase.progress === 100;
               const isCurrent = phase.progress > 0 && phase.progress < 100;
               const isActive = displayPhaseIdx === idx;

               return (
                 <div 
                    key={idx}
                    className="absolute top-0 h-full flex flex-col items-center pointer-events-auto cursor-pointer group transition-transform"
                    style={{ left: `${centerPos}%`, transform: 'translateX(-50%)' }}
                    onMouseEnter={() => setHoveredPhase(idx)}
                    onMouseLeave={() => setHoveredPhase(null)}
                    onClick={() => setHoveredPhase(idx)}
                 >
                   <div className={`w-5 h-5 border-4 flex items-center justify-center transition-all z-10 rounded-full
                     ${isActive ? 'border-blue-200 bg-blue-600 scale-125' : 
                       isCompleted ? 'border-blue-600 bg-white' : 
                       isCurrent ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'
                     }
                   `}>
                   </div>
                   
                   <div className="absolute top-full mt-4 text-center flex flex-col items-center w-32 sm:w-40">
                      <div className={`text-xs font-bold mb-1 transition-colors ${
                         isActive ? 'text-blue-600' :
                         isCompleted ? 'text-gray-700' : 
                         isCurrent ? 'text-blue-500' : 'text-gray-400'
                      }`}>
                        {phase.phase}
                      </div>
                      <div className={`hidden sm:block text-sm leading-tight tracking-tight break-keep text-center w-full transition-colors ${
                         isActive ? 'text-gray-900 font-bold' : 'text-gray-500 font-medium'
                      }`}>
                         {phase.title}
                      </div>
                   </div>
                 </div>
               );
            })}
          </div>
        </div>
      </div>

      {/* DYNAMIC DETAIL PANEL */}
      <AnimatePresence mode="wait">
         <motion.div 
           key={activePhase.phase}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -10 }}
           transition={{ duration: 0.2 }}
           className="bg-gray-50 border border-gray-200 p-6 sm:p-10 relative z-10 rounded-xl mt-4"
         >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 mb-8 border-b border-gray-200 pb-6">
               <div className="flex flex-col gap-1">
                 <span className="text-blue-600 font-bold text-sm">
                   {activePhase.phase} | {activePhase.subtitle}
                 </span>
                 <h4 className="text-gray-900 font-display font-black text-2xl sm:text-4xl tracking-tight">
                   {activePhase.title}
                 </h4>
               </div>
               <div className="lg:ml-auto w-full lg:w-auto">
                 <div className="flex items-center gap-4 bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                   <div className="text-sm text-gray-500 font-medium">단계 진행률</div>
                   <div className="text-lg font-black text-gray-900">{activePhase.progress}%</div>
                   <div className="w-full lg:w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${activePhase.progress}%` }} />
                   </div>
                 </div>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {activePhase.details.map((detail, idx) => {
                  const [title, ...rest] = detail.split(':');
                  const content = rest.join(':');
                  return (
                    <div key={idx} className="bg-white border border-gray-100 p-6 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow flex flex-col gap-3">
                      <h5 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        {title}
                      </h5>
                      {content && <p className="text-sm text-gray-600 leading-relaxed font-medium break-keep">{content}</p>}
                    </div>
                  )
               })}
            </div>
         </motion.div>
      </AnimatePresence>
    </div>
  );
};

const SectionStorefront = ({ setActiveTab, grid }: { setActiveTab: (v: string) => void, grid: CellData[][] }) => {
  return (
    <div className="w-full pb-16 bg-gray-50 pt-8">
       <div className="max-w-[1240px] px-4 mx-auto mb-8">
         {/* Large Banner */}
         <div 
           className="w-full h-[400px] sm:h-[480px] relative bg-white border border-gray-200 cursor-pointer overflow-hidden flex rounded-2xl group shadow-sm hover:shadow-lg transition-shadow duration-500"
           onClick={() => setActiveTab('ticket')}
         >
           <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white to-transparent z-0 pointer-events-none" />
           <div className="w-full h-full flex relative px-8 sm:px-16 mx-auto">
               {/* Content */}
               <div className="flex flex-col justify-center z-20 w-full md:w-1/2">
                  <motion.h2 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5 }}
                     className="text-5xl sm:text-6xl font-black text-gray-900 tracking-tight mb-4 font-display drop-shadow-sm"
                  >
                    403: BYPASS
                  </motion.h2>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-1 h-6 bg-blue-600"></div>
                    <motion.p 
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.5, delay: 0.1 }}
                       className="text-2xl text-blue-600 font-bold"
                    >
                      단독 예매 오픈
                    </motion.p>
                  </div>
                  <motion.p 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: 0.2 }}
                     className="text-gray-600 text-lg max-w-md leading-relaxed"
                  >
                    장애 유무와 관계없이 모두가 오픈된 무대의 감동에 닿을 수 있는 유니버설 서비스. 새로운 기준을 제시하는 디지털 인문예술입문 프로젝트.
                  </motion.p>
                  <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: 0.3 }}
                     className="mt-8 flex gap-3"
                  >
                    <span className="text-xs border border-blue-200 text-blue-600 px-4 py-1.5 bg-blue-50 rounded-full font-bold shadow-sm">GOOGLE AI STUDIO</span>
                    <span className="text-xs border border-blue-200 text-blue-600 px-4 py-1.5 bg-blue-50 rounded-full font-bold shadow-sm">UNIVERSAL SERVICE</span>
                  </motion.div>
               </div>

               {/* Right Graphic (Seats) */}
               <div className="hidden lg:flex absolute right-4 xl:right-12 top-1/2 -translate-y-1/2 z-10 w-1/2 justify-end">
                 <div className="flex flex-col items-center opacity-100 origin-right transition-transform duration-700 scale-[0.85] group-hover:scale-[0.9] drop-shadow-sm">
                   <div className="w-[80%] max-w-[500px] h-10 bg-gray-100 border border-gray-200 rounded-t-[40px] mb-8 flex justify-center items-center">
                     <span className="text-gray-400 font-bold tracking-[0.4em] text-xs">STAGE</span>
                   </div>
                   <div className="flex flex-col gap-[4px] items-center">
                     {grid.map((row, rIdx) => (
                        <div key={rIdx} className="flex gap-[4px] justify-center relative w-full px-8">
                          <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-6">
                            <span className="text-[11px] font-bold text-gray-400">{String.fromCharCode(65 + rIdx)}</span>
                          </div>
                          {row.map((cell, cIdx) => {
                             const isActive = cell.active;
                             const colorClass = isActive 
                               ? ['bg-[#A445D1] shadow-[0_0_12px_rgba(164,69,209,0.5)]', 'bg-[#069D42] shadow-[0_0_12px_rgba(6,157,66,0.5)]', 'bg-[#1F6EEE] shadow-[0_0_12px_rgba(31,110,238,0.5)]', 'bg-[#E77F00] shadow-[0_0_12px_rgba(231,127,0,0.5)]', 'bg-[#EAC700] shadow-[0_0_12px_rgba(234,199,0,0.5)]'][cell.charRowIdx]
                               : 'bg-transparent';
                             return (
                               <div key={`bg-${rIdx}-${cIdx}`} 
                                  className={`w-[15px] h-[15px] rounded-[3px] transition-colors duration-300 ${colorClass}`} 
                               />
                             );
                          })}
                          <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center w-6">
                            <span className="text-[11px] font-bold text-gray-400">{String.fromCharCode(65 + rIdx)}</span>
                          </div>
                        </div>
                     ))}
                   </div>
                 </div>
               </div>
               
               {/* Bottom right hint */}
               <div className="absolute bottom-6 right-8 z-20 flex items-center gap-2 text-blue-600 font-bold tracking-widest text-sm group-hover:text-blue-700 transition-colors">
                 RESERVATION NOW <ChevronRight size={18} />
               </div>
           </div>
         </div>
       </div>

       {/* Small Banners */}
       <div className="max-w-[1240px] mx-auto px-4 bg-gray-50 pb-8">
         <h3 className="text-xl font-bold mb-4 text-gray-900">프로젝트 둘러보기</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <SmallBanner 
             title="아이디어 발표" 
             subtitle="PROJECT THESIS" 
             imgBg="bg-blue-600/10"
             iconColor="text-blue-600"
             icon={Info}
             onClick={() => setActiveTab('idea')} 
           />
           <SmallBanner 
             title="중간 현황" 
             subtitle="SYSTEM LOGS" 
             imgBg="bg-indigo-600/10"
             iconColor="text-indigo-600"
             icon={Activity}
             onClick={() => setActiveTab('mid')} 
           />
           <SmallBanner 
             title="최종 발표" 
             subtitle="USER GUIDE" 
             imgBg="bg-sky-600/10"
             iconColor="text-sky-600"
             icon={Navigation}
             onClick={() => setActiveTab('final')} 
           />
         </div>
       </div>
    </div>
  )
}

const SmallBanner = ({ title, subtitle, imgBg, iconColor, icon: Icon, onClick }: any) => (
  <div 
    className={`h-[180px] rounded-[24px] bg-white border border-gray-200 relative cursor-pointer overflow-hidden p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] hover:border-blue-300 group`}
    onClick={onClick}
  >
     {/* Decorative background shapes */}
     <div className={`absolute top-0 right-0 w-48 h-48 ${imgBg} rounded-bl-[100px] group-hover:scale-110 transition-transform duration-500 origin-top-right`} />
     <div className="absolute bottom-0 right-12 w-24 h-24 bg-gradient-to-t from-gray-50 to-transparent opacity-50" />
     
     {/* Icon and tag */}
     <div className="flex justify-between items-start relative z-10 w-full">
       <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm border border-gray-100 ${iconColor} group-hover:rotate-12 transition-transform duration-300`}>
         <Icon size={24} />
       </div>
       <div className={`text-[10px] font-bold px-3 py-1.5 rounded-full border border-gray-100 ${iconColor} bg-white shadow-sm tracking-widest uppercase`}>
         {subtitle}
       </div>
     </div>
     
     {/* Title and arrow */}
     <div className="relative z-10 mt-auto flex justify-between items-end w-full">
       <h3 className="text-[26px] sm:text-[24px] lg:text-[28px] font-black text-gray-900 group-hover:text-blue-600 transition-colors tracking-tight leading-none mt-6">
         {title}
       </h3>
       <div className="w-10 h-10 shrink-0 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors shadow-sm relative overflow-hidden">
         <ArrowRight className="text-gray-400 group-hover:text-white transition-colors relative z-10" size={20} />
       </div>
     </div>
     
     {/* Minimal Ticket stub cutouts on left edge */}
     <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-50">
        <div className="w-1 h-3 bg-gray-200 rounded-r-md"></div>
        <div className="w-1 h-6 bg-gray-200 rounded-r-md"></div>
        <div className="w-1 h-3 bg-gray-200 rounded-r-md"></div>
     </div>
  </div>
);

const SectionTicket = ({ grid }: { grid: CellData[][] }) => (
  <div className="w-full max-w-[1240px] mx-auto px-4 mt-8 pb-16">
    <div className="flex text-sm text-gray-500 mb-6 font-medium">
      <span className="cursor-pointer hover:underline">홈</span> <span className="mx-2 text-gray-300">&gt;</span> <span className="text-blue-600 font-bold">전시/행사</span>
    </div>

    {/* Header Info Area */}
    <div className="flex flex-col lg:flex-row gap-10 mb-16">
      {/* Poster Placeholder */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full lg:w-[400px] shrink-0 h-[560px] bg-gray-100 border border-gray-200 rounded-xl flex flex-col items-center justify-center relative shadow-sm group"
      >
        <Ticket size={64} className="text-gray-300 mb-4 transition-colors duration-500" />
        <h2 className="text-3xl font-display font-black text-gray-400">403: BYPASS</h2>
        <p className="text-gray-500 mt-4 font-bold tracking-widest text-xs">유니버설 서비스 프로젝트</p>
      </motion.div>

      {/* Info Details */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 flex flex-col pt-4"
      >
        <div className="flex-1">
          <div className="inline-block bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 text-xs font-bold mb-3 rounded">단독예매</div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-snug mb-3">
            누구에게나 열려있는 무대: 403 BYPASS
          </h1>
          <p className="text-gray-500 mb-8 text-sm sm:text-base">디지털인문예술입문 프로젝트 전시</p>

          <div className="border-t border-b border-gray-100 py-6 space-y-4 text-sm sm:text-base text-gray-800 mb-8">
            <div className="flex items-center">
              <span className="w-24 text-gray-500 font-medium">장소</span>
              <strong className="text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">Google AI Studio (Virtual)</strong>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-gray-500 font-medium">관람시간</span>
              <span>120분 (인터미션 없음)</span>
            </div>
            <div className="flex items-baseline">
              <span className="w-24 text-gray-500 font-medium">출연진</span>
              <div className="flex flex-wrap gap-2 text-gray-900 font-medium flex-1">
                {NAMES.map((name, i) => (
                  <span key={name}>{name}{i < NAMES.length - 1 ? ', ' : ''}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg transition-colors flex justify-center items-center">
            예매하기
          </button>
          <div className="flex gap-3">
            <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-4 rounded-xl transition-colors flex justify-center items-center gap-2 text-sm font-bold">
              <Heart size={18} className="text-red-500" /> 관심등록
            </button>
            <button className="w-16 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-4 rounded-xl transition-colors flex justify-center items-center">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Project Journey Roadmap */}
    <ProjectRoadmap />

    {/* Stage Layout Area */}
    <div className="w-full mt-16">
      <StageMap grid={grid} />
    </div>

  </div>
);

const CustomRingChart = ({ data, color, title, valueStr }: any) => (
  <div className="flex flex-col items-center justify-center p-4">
    <div className="relative w-32 h-32 mb-2">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={45}
            outerRadius={60}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-xl font-black text-white" style={{ color: color }}>{valueStr}</span>
      </div>
    </div>
    <div className="text-white/60 text-xs font-bold font-mono tracking-widest text-center truncate w-full">{title}</div>
  </div>
);

const SectionIdea = () => {
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 py-16">
      <GlossaryPanel isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />
      
      <div className="mb-12 border-b-2 border-gray-200 pb-4 flex items-center gap-4">
        <h2 className="text-3xl font-display font-black text-gray-900 tracking-tight">프로젝트 소개 (Project Thesis)</h2>
      </div>

      <div className="space-y-20 text-gray-800">
        
        {/* 1. 프로젝트 정의 */}
        <section className="bg-white p-8 sm:p-12 border border-gray-200 rounded-2xl shadow-sm relative overflow-hidden group">
          <h3 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-4">
            <span className="text-blue-600 text-4xl font-display">01.</span> 
            <span className="font-display tracking-tight text-gray-900">시혜적 배려에서 '보편적 권리'로</span>
          </h3>
          <p className="text-xl text-gray-600 mb-10 font-sans tracking-tight">기존의 좁은 접근성 개념을 확장하여, 모두가 차별 없이 예술을 경험하는 새로운 기준을 제시합니다.</p>
          
          <div className="grid md:grid-cols-2 gap-6 relative z-10">
            <div className="bg-gray-50 p-6 border border-gray-100 rounded-xl">
              <h4 className="text-gray-500 font-bold mb-3 text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gray-500" /> 기존 접근성 공연의 한계</h4>
              <p className="text-gray-600 font-sans leading-relaxed">
                지금까지의 접근성 공연은 <button onClick={() => setIsGlossaryOpen(true)} className="text-gray-900 font-bold border-b border-gray-400 border-dashed hover:text-blue-600 hover:border-blue-600 transition-colors">배리어 프리(Barrier-free)</button>라는 명목 하에 장애인이나 노약자 등 특정 계층만을 위한 <strong className="text-gray-900">좁은 의미의 시혜적 배려</strong>에 초점이 맞춰져 있었습니다.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 border border-blue-100 rounded-xl">
              <h4 className="text-blue-600 font-bold mb-3 text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-600" /> 403 BYPASS의 개념 확장</h4>
              <p className="text-gray-900 font-sans leading-relaxed">
                본 프로젝트의 공연 접근성을 특별한 서비스가 아닌, 관객이라면 누구나 마땅히 누려야 할 <button onClick={() => setIsGlossaryOpen(true)} className="text-blue-700 font-bold border-b border-blue-400 border-dashed hover:text-blue-800 transition-colors">유니버설 서비스(Universal Service)</button>로 정의하며 그 개념을 확장합니다.
              </p>
            </div>
          </div>
          
          <div className="mt-8 bg-gray-50 p-6 border border-gray-200 rounded-xl flex flex-col sm:flex-row gap-6 relative z-10">
            <div className="flex-1 border-b sm:border-b-0 sm:border-r border-gray-200 pb-6 sm:pb-0 sm:pr-6">
               <h4 className="text-gray-500 font-bold mb-2 text-xs">프로젝트 지향점</h4>
               <p className="text-gray-700 font-sans text-sm leading-relaxed">물리적 장벽과 정보의 비대칭을 근본적으로 허물어, 장애 유무나 개인이 처한 상황과 관계없이 모든 관객이 공연의 감동에 온전히 닿을 수 있는 환경 구축</p>
            </div>
            <div className="flex-1">
               <h4 className="text-gray-500 font-bold mb-2 text-xs">PARADIGM</h4>
               <p className="text-gray-700 font-sans text-sm leading-relaxed">특정 관객을 향한 배려를 넘어, 모든 관객이 장벽 없이 공연을 누릴 수 있도록 보장하는 가장 기본적이고 당연한 제작 태도의 시작</p>
            </div>
          </div>
        </section>

        {/* 2. 문제 발굴 */}
        <section>
          <div className="mb-10">
            <h3 className="text-3xl font-black text-gray-900 mb-4 flex items-center gap-4">
              <span className="text-blue-600 text-4xl font-display">02.</span> 
              <span className="font-display tracking-tight">문제발굴 (Problem Discovery)</span>
            </h3>
            <p className="text-xl text-gray-600 font-sans tracking-tight leading-relaxed max-w-4xl">
              현재 공연 시장은 눈에 보이는 장벽뿐만 아니라, 보이지 않는 정보와 인식의 장벽으로 인해 수많은 관객의 발걸음을 돌리게 하고 있습니다.
            </p>
          </div>
          
          <div className="space-y-8">
            {/* 1. 시설 문제 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-2xl font-black mb-2 text-gray-900 font-display flex items-center gap-3">
                <span className="bg-purple-100 text-purple-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                [시설 문제] 턱없이 부족한 공연장 편의시설 (민간 설치율 단 1%)
              </h4>
              <p className="text-gray-500 font-bold mb-6 tracking-tight">물리적 진입 자체가 불가능한 인프라의 현실입니다.</p>
              
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <span className="font-bold text-gray-900 block mb-1">참담한 설치 지표:</span>
                    <span className="text-gray-600 text-sm leading-relaxed">전국 3,102개 공연장 중 휠체어 관객석 보유율은 단 20%(633개)에 불과합니다.</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <span className="font-bold text-gray-900 block mb-1">민간 영역의 소외:</span>
                    <span className="text-gray-600 text-sm leading-relaxed">관객석, 경사로, 승강기, 화장실, 주차장 등 필수 편의시설 5종이 모두 설치된 곳은 공공 공연장의 12%인 반면, 민간은 단 1%(30개)뿐입니다. 민간 공연장 수가 2배 더 많음에도 설치 비율은 1/10 수준입니다.</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <span className="font-bold text-gray-900 block mb-1">법적 사각지대:</span>
                    <span className="text-gray-600 text-sm leading-relaxed">1997년 제정된 '편의증진법'이 주로 신축·증축 건물에만 적용되어, 기존 건축물이나 대학로의 수많은 소규모 소극장은 의무 설치 대상에서 제외된 실정입니다.</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-8 flex flex-col items-center justify-center border border-gray-100">
                  <h5 className="font-bold text-gray-700 mb-6 text-sm text-center">필수 편의시설 5종 설치율 비교</h5>
                  <div className="w-full max-w-[280px] space-y-6">
                    <div>
                      <div className="flex justify-between text-sm font-bold mb-2">
                        <span className="text-gray-600">공공 공연장</span>
                        <span className="text-purple-600 text-xl tracking-tighter">12%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
                        <div className="bg-purple-400 h-4 rounded-full" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-bold mb-2">
                        <span className="text-gray-600">민간 공연장</span>
                        <span className="text-purple-600 text-xl tracking-tighter">1%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
                        <div className="bg-purple-600 border border-purple-800 h-4 rounded-full" style={{ width: '1%' }}></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-[11px] mt-6 text-center break-keep leading-tight">
                    * 출처: 예술경영지원센터, 『월간 공연전산망 2025년 8월호』, "공연장 장애인 편의시설 실태 분석"
                  </p>
                </div>
              </div>
            </div>

            {/* 2. 정보 문제 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-2xl font-black mb-2 text-gray-900 font-display flex items-center gap-3">
                <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                [정보 문제] 파편화된 가이드와 '정보 빈곤층'의 발생
              </h4>
              <p className="text-gray-500 font-bold mb-6 tracking-tight">예매부터 관람까지, 정보는 흩어져 있고 소통은 단절되어 있습니다.</p>
              
              <div className="grid md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-3 space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <span className="font-bold text-gray-900 block mb-1">파편화된 여정:</span>
                    <span className="text-gray-600 text-sm leading-relaxed">예매는 인터파크에서, 주차와 도면 정보는 시설 관리소 홈페이지를 직접 뒤져야 하는 등 관람 정보가 극심하게 분산되어 있습니다.</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <span className="font-bold text-gray-900 block mb-1">온라인 예매의 벽:</span>
                    <span className="text-gray-600 text-sm leading-relaxed">휠체어석은 온라인 예매가 불가능해 수수료를 내고 전화 예매에만 의존해야 하며, 실제 좌석 위치조차 확인하기 어려운 정보 비대칭이 발생합니다.</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <span className="font-bold text-gray-900 block mb-1">예술적 체험 정보 부재:</span>
                    <span className="text-gray-600 text-sm leading-relaxed">단순히 엘리베이터가 '있다/없다'는 수준을 넘어, 시설의 고장 현황이나 실제 시야, 혼잡도 등 '진짜 필요한 이용자 경험'을 공유하는 채널이 전무합니다.</span>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 relative">
                    <div className="absolute top-4 left-4 text-blue-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                    </div>
                    <p className="text-gray-700 text-sm leading-loose mt-8 font-medium break-keep italic">
                      "건물이 어떻게 생겼는지 머릿속으로 그려보고 가고 싶어요. 사전에 어디에 뭐가 있는지만 대충 알고 가도 훨씬 편할 것 같아요."
                    </p>
                    <p className="text-right text-gray-500 text-xs mt-4 block">- 시각장애인 관객 인터뷰 중 (출처: 김찬아(2023) 논문 재구성)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. 환경 문제 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-2xl font-black mb-2 text-gray-900 font-display flex items-center gap-3">
                <span className="bg-green-100 text-green-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                [환경 문제] 65%의 접근 불가, 단절된 '관람 여정 전체'
              </h4>
              <p className="text-gray-500 font-bold mb-6 tracking-tight">공연장 문을 여는 것만으로는 충분하지 않습니다.</p>
              
              <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <span className="font-bold text-gray-900 block mb-1">험난한 오프로드:</span>
                    <span className="text-gray-600 text-sm leading-relaxed block mb-2">대학로 소극장 120곳 중 휠체어 접근이 가능한 곳은 단 42곳(35%)으로, 무려 65%가 진입조차 불가능합니다.</span>
                    <span className="text-gray-400 text-xs block text-right mt-2">* 출처: 공연예술통합전산망(KOPIS), "전국 공연장 장애인 시설 유무 데이터" (2025년 7월 24일 기준 추출)</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                    <div className="flex justify-start w-1/3">
                      <CustomRingChart data={[{ name: '진입불가', value: 65, fill: '#22c55e' }, { name: '진입가능', value: 35, fill: '#f3f4f6' }]} color="#22c55e" title="대학로 접근불가율" valueStr="65%" />
                    </div>
                    <div className="w-2/3 pl-4">
                      <p className="text-sm font-bold text-green-600 mb-1">단절의 시작</p>
                      <p className="text-xs text-gray-500 leading-snug">첫 문턱부터 가로막혀 공연을 관람할 기회 자체가 주어지지 않는 현실.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <span className="font-bold text-gray-900 block mb-1">여정의 단절:</span>
                    <span className="text-gray-600 text-sm leading-relaxed">지하철역에서 공연장까지 가는 길, 주변 식당·카페의 단차, 야외 화장실 접근성 등 공연장을 둘러싼 <strong>관람 여정 전체(Total Journey)</strong>가 연결되어야 합니다.</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <span className="font-bold text-gray-900 block mb-1">위험 요소:</span>
                    <span className="text-gray-600 text-sm leading-relaxed">설치된 점자블록이 조경 시설물로 막혀 있거나 단차가 불규칙한 경우, 장애인 관객에게는 미관을 위한 설계가 오히려 사고의 위험이 됩니다.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. 인식의 장벽 */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-10 shadow-xl text-white relative overflow-hidden group hover:shadow-2xl transition-all">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 rounded-bl-[150px] opacity-10 group-hover:scale-110 transition-transform duration-700" />
              
              <h4 className="text-2xl font-black mb-2 text-white font-display flex items-center gap-3 relative z-10">
                <span className="bg-yellow-500 text-yellow-900 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                [인식의 장벽] 시혜적 배려에 갇힌 '배리어 프리'
              </h4>
              <p className="text-yellow-400 font-bold mb-6 tracking-tight relative z-10">접근성 문제를 소수만을 위한 배려로 치부하는 좁은 인식이 시장 성장을 저해합니다.</p>
              
              <div className="grid md:grid-cols-3 gap-6 relative z-10">
                <div className="bg-white/10 p-5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <span className="font-bold text-white block mb-2 text-lg">시혜적 관점의 한계</span>
                  <span className="text-gray-300 text-sm leading-relaxed">기존의 접근성 서비스는 특정 계층만을 위한 특별한 프로그램이나 시혜적 배려로 여겨져 왔습니다.</span>
                </div>
                <div className="bg-white/10 p-5 rounded-xl border border-yellow-500/30 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent"></div>
                  <span className="font-bold text-yellow-400 block mb-2 text-lg relative z-10">유니버설 서비스의 부재</span>
                  <span className="text-gray-300 text-sm leading-relaxed relative z-10">성별, 연령, 장애 유무와 관계없이 누구나 편리하게 이용해야 한다는 '보편적 설계(Universal Design)'에 대한 인식이 현저히 낮습니다.</span>
                </div>
                <div className="bg-white/10 p-5 rounded-xl border border-white/10 backdrop-blur-sm">
                  <span className="font-bold text-white block mb-2 text-lg">정보의 디지털 소외</span>
                  <span className="text-gray-300 text-sm leading-relaxed">최근 공연 홍보가 SNS나 유튜브 이미지 위주로 변하면서, 시각장애인 등 정보 약자들은 오히려 더 깊은 '정보 빈곤층'이 되고 있습니다.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 핵심 인사이트 */}
        <section className="bg-blue-50 p-8 sm:p-12 border border-blue-100 rounded-2xl relative overflow-hidden">
          <h3 className="text-3xl font-black text-gray-900 mb-4 relative z-10 flex items-center gap-4">
            <span className="text-blue-600 text-4xl font-display">03.</span> 
            <span className="font-display tracking-tight text-gray-900">모두를 위한 '커브컷 효과'</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-10 mt-8 relative z-10">
            <div className="bg-white p-6 sm:p-8 border border-gray-200 rounded-xl shadow-sm">
              <div className="font-bold text-blue-600 text-sm mb-4 flex items-center gap-2">CURB CUT EFFECT</div>
              <p className="text-gray-700 font-sans leading-relaxed text-lg pb-6 border-b border-gray-100">
                휠체어를 위해 낮춘 보도블록 턱이 유모차, 캐리어 사용자 모두의 편의가 되듯, 우리의 접근성 강화는 곧 <strong className="text-gray-900">모든 관객의 경험을 상향 평준화</strong>합니다.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                 <div className="flex gap-4">
                   <div className="text-blue-600 font-bold text-xs w-20 shrink-0 mt-1">확장된 경험</div>
                   <p className="text-gray-600 font-sans text-sm leading-snug">초행길에 매장에서 길을 잃은 비장애인 관객, 화장실 대기 줄을 피하고 싶은 관객 등 '모든 관객의 경험'을 완벽하게 이어주는 유니버설 서비스 앱 지향</p>
                 </div>
              </div>
            </div>
            
            <div className="bg-white p-6 sm:p-8 border border-gray-200 rounded-xl shadow-sm">
              <div className="font-bold text-blue-600 text-sm mb-6 flex items-center gap-2"><BarChart3 size={16} /> DATA PROOF</div>
              
              <div className="flex flex-col sm:flex-row items-center gap-8 mb-6">
                <div className="flex-1 w-full flex justify-center">
                  <CustomRingChart data={[{ name: '비장애인', value: 80, fill: '#3b82f6' }, { name: '장애인', value: 20, fill: '#f3f4f6' }]} color="#3b82f6" title="배리어 프리 공연 관람객: 비장애인" valueStr="80%" />
                </div>
                <div className="flex-1 w-full flex justify-center">
                  <CustomRingChart data={[{ name: '공감', value: 98, fill: '#3b82f6' }, { name: '기타', value: 2, fill: '#f3f4f6' }]} color="#3b82f6" title="배리어프리 필요성 공감" valueStr="98%" />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3 mt-4">
                <p className="text-gray-600 font-sans text-sm text-center leading-relaxed">
                  실제 배리어프리 오페라를 관람한 관객의 <strong className="text-gray-900">80%는 놀랍게도 비장애인</strong>이었습니다. 이들 중 대다수는 해설과 성우 연기가 작품의 몰입을 방해하는 것이 아니라, 오히려 예술적 경험을 풍부하게 했다며 <strong className="text-gray-900">98%가 배리어프리의 필요성에 공감</strong>했습니다.
                </p>
                <p className="text-right text-gray-400 text-xs">
                  - 출처: 김찬아 (2023). 「시각장애인의 공연예술 접근성 연구 : &lt;모두를 위한 오페라 La Traviata&gt;를 중심으로」. 중앙대학교 예술대학원 석사학위 논문.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 솔루션 */}
        <section>
          <h3 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-4">
            <span className="text-blue-600 text-4xl font-display">04.</span> 
            <span className="font-display tracking-tight">경험 중심의 4대 핵심 기능</span>
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Navigation, tag: "MOBILITY", title: "이동", subtitle: "맞춤형 경로 안내", desc: "단차와 점자블록의 연속성을 고려한 맞춤 경로 및 실내 AR 가이드를 통해 이동의 장벽을 제거합니다." },
              { icon: Eye, tag: "VISIBILITY", title: "시야", subtitle: "사전 정보 제공", desc: "단순 시설 유무를 넘어 실제 좌석별 무대 가시성과 단차 사진, 인물 및 세트 사전 안내를 제공하여 예술적 소외를 방지합니다." },
              { icon: Activity, tag: "FLOW", title: "흐름", subtitle: "실시간 혼잡도 파악", desc: "화장실, 매표소 등 주요 시설의 대기 현황을 안내하고 웨이팅 서비스로 대체하여 관람의 흐름을 개선합니다." },
              { icon: Shield, tag: "SAFETY", title: "안전", subtitle: "현장 연계 안전", desc: "퇴장 후 대중교통 연계 및 주변 상점 접근성 정보를 통합하여 공연 전후의 모든 여정을 케어합니다." }
            ].map((f, i) => (
              <div key={i} className="flex gap-6 bg-white border border-gray-200 p-6 sm:p-8 rounded-xl group hover:border-blue-400 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 shrink-0 bg-blue-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <f.icon className="text-blue-600" size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-blue-500 mb-2">{f.tag}</div>
                  <h4 className="font-black text-gray-900 text-xl mb-1">{f.title} <span className="text-gray-400 font-medium ml-2 text-base">| {f.subtitle}</span></h4>
                  <p className="text-gray-600 text-sm font-sans leading-relaxed mt-3">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. 가치 & 목표 */}
        <section className="border-t border-gray-200 pt-16">
          <h3 className="text-3xl font-black text-gray-900 mb-10 flex items-center gap-4">
            <span className="text-blue-600 text-4xl font-display">05.</span> 
            <span className="font-display tracking-tight text-gray-900">프로젝트 지향 가치 및 목표</span>
          </h3>
          
          <div className="flex flex-col gap-4">
            {[
              { title: "독립적 관람", en: "INDEPENDENT", desc: "타인의 도움에 의존하지 않고 관객 스스로 예매부터 귀가까지 온전하게 해낼 수 있는 '독립적 문화 향유' 환경을 구축합니다." },
              { title: "불평등 해소", en: "EQUALITY", desc: "신체적 조건이나 상황에 따라 정보의 양과 질이 달라지는 불평등을 없애고 누구나 투명한 정보를 바탕으로 공연을 100% 즐기게 합니다." },
              { title: "생태계 조성", en: "ECOSYSTEM", desc: "접근성 랭킹 시스템을 통해 공연 주최 측과 시설 운영자들이 자발적으로 환경을 개선하도록 유도하는 선순환 구조를 만듭니다." }
            ].map((item, i) => (
               <div key={i} className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-center bg-white border border-gray-200 rounded-xl p-6 sm:p-8 font-sans transition-colors relative overflow-hidden group hover:border-blue-300">
                <div className="flex flex-col w-48 shrink-0">
                  <span className="font-bold text-blue-500 text-xs tracking-widest mb-1">{item.en}</span>
                  <span className="font-black text-gray-900 text-xl">{item.title}</span>
                </div>
                <div className="w-px h-12 bg-gray-200 hidden lg:block"></div>
                <p className="text-gray-600 text-[15px] leading-relaxed">{item.desc}</p>
               </div>
            ))}
          </div>
        </section>

        {/* 6. 프로젝트 워크플로우 */}
        <section className="border-t border-gray-200 pt-16 mt-16 pb-20">
          <h3 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-4">
            <span className="text-blue-600 text-4xl font-display">06.</span> 
            <span className="font-display tracking-tight text-gray-900">프로젝트 워크플로우: 실현 가능한 무대를 위한 구체적 발걸음</span>
          </h3>
          <p className="text-xl text-gray-600 font-sans tracking-tight mb-14 max-w-4xl">
            우리는 단순한 아이디어에 그치지 않고, 철저한 검증과 구현 과정을 통해 '403 BYPASS'를 완성해 나갈 것입니다.
          </p>

          <div className="relative border-l-[3px] border-blue-100 ml-6 sm:ml-10 pl-8 sm:pl-12 space-y-12">
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute -left-[54px] sm:-left-[71px] top-0 w-12 h-12 sm:w-14 sm:h-14 bg-white border-[3px] border-blue-300 rounded-full flex items-center justify-center text-blue-500 group-hover:border-blue-600 group-hover:bg-blue-50 group-hover:text-blue-700 transition-all shadow-sm z-10">
                <Search size={22} className="sm:w-6 sm:h-6" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 relative">
                <div className="absolute top-6 -left-[13px] w-6 h-6 bg-white border-t border-l border-gray-200 rotate-[-45deg] z-10 hidden sm:block"></div>
                <h4 className="text-xl sm:text-2xl font-black text-gray-900 mb-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 font-display">
                  <span className="bg-blue-50 text-blue-600 text-sm font-bold tracking-widest uppercase px-3 py-1 rounded-md w-fit">Phase 1</span>
                  <span>리서치 고도화 및 서비스 정교화</span>
                </h4>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                    <div className="flex-1">
                      <span className="font-bold text-gray-900 block mb-1">심층 리서치 보강</span>
                      <span className="text-gray-600 font-sans text-sm leading-relaxed">기존 데이터(민간 공연장 설치율 1%, 대학로 소극장 65% 접근 불가 등)를 바탕으로, 실제 공연장 이용자(장애인 및 비장애인) 대상 인터뷰와 설문을 추가 실시하여 더욱 세밀한 니즈를 파악합니다.</span>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                    <div className="flex-1">
                      <span className="font-bold text-gray-900 block mb-1">서비스 정의 및 우선순위 확정</span>
                      <span className="text-gray-600 font-sans text-sm leading-relaxed">리서치 결과를 기반으로 4대 핵심 기능(이동, 시야, 흐름, 안전)의 세부 스펙을 확정하고, '독립적 관람'을 실현하기 위한 필수 기능을 우선적으로 정의합니다.</span>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                    <div className="flex-1">
                      <span className="font-bold text-gray-900 block mb-1">데이터베이스 설계</span>
                      <span className="text-gray-600 font-sans text-sm leading-relaxed">파편화된 공연장 접근성 정보를 체계적으로 통합하기 위해, 국내외 성공 사례(Theatre Access NYC, Sociability 등)를 벤치마킹한 고유의 데이터 구조를 설계합니다.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute -left-[54px] sm:-left-[71px] top-0 w-12 h-12 sm:w-14 sm:h-14 bg-white border-[3px] border-purple-300 rounded-full flex items-center justify-center text-purple-500 group-hover:border-purple-600 group-hover:bg-purple-50 group-hover:text-purple-700 transition-all shadow-sm z-10">
                <Palette size={22} className="sm:w-6 sm:h-6" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 relative">
                <div className="absolute top-6 -left-[13px] w-6 h-6 bg-white border-t border-l border-gray-200 rotate-[-45deg] z-10 hidden sm:block"></div>
                <h4 className="text-xl sm:text-2xl font-black text-gray-900 mb-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 font-display">
                  <span className="bg-purple-50 text-purple-600 text-sm font-bold tracking-widest uppercase px-3 py-1 rounded-md w-fit">Phase 2</span>
                  <span>UX/UI 디자인 및 프로토타입 시각화</span>
                </h4>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0"></div>
                    <div className="flex-1">
                      <span className="font-bold text-gray-900 block mb-1">사용자 여정 고도화</span>
                      <span className="text-gray-600 font-sans text-sm leading-relaxed">예매 단계부터 공연 관람 후 귀가에 이르는 전체 여정을 '유니버설 서비스' 관점에서 재설계합니다.</span>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0"></div>
                    <div className="flex-1">
                      <span className="font-bold text-gray-900 block mb-1">디자인 시스템 구축</span>
                      <span className="text-gray-600 font-sans text-sm leading-relaxed">Google Stitch를 활용하여 누구나 읽기 쉽고 조작하기 편한 고대비(High Contrast) UI와 픽셀 아트 기반의 직관적인 디자인 시스템을 완성합니다.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute -left-[54px] sm:-left-[71px] top-0 w-12 h-12 sm:w-14 sm:h-14 bg-white border-[3px] border-green-300 rounded-full flex items-center justify-center text-green-500 group-hover:border-green-600 group-hover:bg-green-50 group-hover:text-green-700 transition-all shadow-sm z-10">
                <Code size={22} className="sm:w-6 sm:h-6" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 relative">
                <div className="absolute top-6 -left-[13px] w-6 h-6 bg-white border-t border-l border-gray-200 rotate-[-45deg] z-10 hidden sm:block"></div>
                <h4 className="text-xl sm:text-2xl font-black text-gray-900 mb-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 font-display">
                  <span className="bg-green-50 text-green-600 text-sm font-bold tracking-widest uppercase px-3 py-1 rounded-md w-fit">Phase 3</span>
                  <span>애플리케이션 제작 및 기술 구현</span>
                </h4>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0"></div>
                    <div className="flex-1">
                      <span className="font-bold text-gray-900 block mb-1">핵심 로직 개발</span>
                      <span className="text-gray-600 font-sans text-sm leading-relaxed">Google AI Studio를 활용하여 복잡한 실내 동선 안내와 상황별 맞춤 정보를 제공하는 지능형 알고리즘을 구현합니다.</span>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0"></div>
                    <div className="flex-1">
                      <span className="font-bold text-gray-900 block mb-1">앱 프로토타입 완성</span>
                      <span className="text-gray-600 font-sans text-sm leading-relaxed">기획된 4대 솔루션이 실제로 작동하는 앱 프로토타입을 제작하여 서비스의 실효성을 검증합니다.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative group pt-4">
              <div className="absolute -left-[54px] sm:-left-[71px] top-4 w-12 h-12 sm:w-14 sm:h-14 bg-white border-[3px] border-yellow-300 rounded-full flex items-center justify-center text-yellow-600 group-hover:border-yellow-500 group-hover:bg-yellow-50 group-hover:text-yellow-700 transition-all shadow-md z-10">
                <Rocket size={22} className="sm:w-6 sm:h-6" />
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-yellow-300 transition-all duration-300 transform group-hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-6 -left-[13px] w-6 h-6 bg-yellow-50 border-t border-l border-yellow-200 rotate-[-45deg] z-10 hidden sm:block"></div>
                <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400 rounded-bl-[150px] opacity-[0.05] group-hover:scale-110 transition-transform duration-700"></div>
                <h4 className="text-xl sm:text-2xl font-black text-gray-900 mb-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 font-display relative z-10">
                  <span className="bg-yellow-100 text-yellow-700 text-sm font-bold tracking-widest uppercase px-3 py-1 rounded-md w-fit">Final Step</span>
                  <span>최종 발표 및 웹사이트 런칭</span>
                </h4>
                <div className="space-y-4 relative z-10">
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 shrink-0"></div>
                    <div className="flex-1">
                      <span className="font-bold text-gray-900 block mb-1">소개 웹사이트 정식 오픈</span>
                      <span className="text-gray-600 font-sans text-sm leading-relaxed">Vercel을 통해 프로젝트의 전 과정과 최종 결과물을 담은 공식 웹사이트를 배포합니다.</span>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 shrink-0"></div>
                    <div className="flex-1">
                      <span className="font-bold text-gray-900 block mb-1">최종 성과 공유</span>
                      <span className="text-gray-600 font-sans text-sm leading-relaxed">'배리어 프리를 넘어선 유니버설 서비스'로서의 성과를 정리하고, 향후 공연 문화 생태계에 미칠 기대 효과를 발표합니다.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </section>

      </div>
    </div>
  );
};

const ContentSection = ({ title, desc, icon: Icon }: { title: string; desc: string; icon: any; }) => (
  <div className="w-full max-w-5xl mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[50vh] text-center">
    <Icon size={64} className="text-gray-200 mb-6" />
    <h2 className="text-3xl font-black text-gray-900 mb-4">{title}</h2>
    <p className="text-gray-500 text-base mb-8 max-w-xl leading-relaxed">{desc}</p>
    <div className="bg-gray-50 border border-gray-200 p-6 flex flex-col items-center max-w-sm rounded-xl">
      <AlertCircle size={24} className="text-blue-500 mb-3" />
      <h3 className="font-bold text-gray-900 mb-1 text-sm">업데이트 예정</h3>
      <p className="text-gray-500 text-xs text-balance">해당 메뉴의 콘텐츠는 시스템 연동 준비 중입니다.</p>
    </div>
  </div>
);

const Header = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (v: string) => void }) => {
  const topLinks = ['로그인', '회원가입', '마이페이지', '고객센터'];
  const tabs = [
    { id: 'storefront', label: '홈' },
    { id: 'ticket', label: '티켓' },
    { id: 'idea', label: '관람정보 (아이디어)' },
    { id: 'mid', label: '관람후기 (중간현황)' },
    { id: 'final', label: '예매안내 (최종)' }
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Top bar (small) */}
        <div className="flex justify-end items-center h-10 gap-4 text-[13px] text-gray-500 border-b border-gray-100 hidden sm:flex">
           {topLinks.map((link, idx) => (
             <button key={link} className="hover:text-gray-900 flex items-center">
                {link}
             </button>
           ))}
        </div>
        
        {/* Main Header */}
        <div className="flex items-center h-20 gap-8">
           <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('storefront')}>
             <span className="font-display font-black text-3xl tracking-tighter text-blue-600">403<span className="text-gray-900">BYPASS</span></span>
           </div>
           
           <div className="hidden md:flex flex-1 max-w-sm mx-auto ml-10">
              <div className="flex items-center w-full px-4 py-2.5 bg-white border-2 border-blue-600 rounded-full">
                 <input type="text" placeholder="검색어를 입력해주세요" className="flex-1 outline-none text-sm text-gray-900 placeholder:text-gray-400" />
                 <Search className="text-blue-600 font-bold cursor-pointer" size={20} />
              </div>
           </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-8 mt-2 overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-[16px] font-bold transition-colors relative whitespace-nowrap mt-2
                ${activeTab === tab.id ? 'text-blue-600 border-b-[3px] border-blue-600' : 'text-gray-800 hover:text-blue-600'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default function App() {
  const grid = generateGrid();
  const [activeTab, setActiveTab] = useState('storefront');

  return (
    <div className="min-h-screen w-full bg-white text-gray-900 font-sans overflow-x-hidden pt-env-m">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="w-full relative min-h-[50vh]">
        <AnimatePresence mode="wait">
          {activeTab === 'storefront' && (
            <motion.div key="storefront" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SectionStorefront setActiveTab={setActiveTab} grid={grid} />
            </motion.div>
          )}
          {activeTab === 'ticket' && (
            <motion.div key="ticket" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SectionTicket grid={grid} />
            </motion.div>
          )}
          {activeTab === 'idea' && (
            <motion.div key="idea" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <SectionIdea />
            </motion.div>
          )}
          {activeTab === 'mid' && (
            <motion.div key="mid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ContentSection title="관람 후기 (중간 현황)" desc="서비스 중간 프로토타입에 대한 관객들의 다양한 피드백과 후기가 등록될 예정입니다." icon={Heart} />
            </motion.div>
          )}
          {activeTab === 'final' && (
            <motion.div key="final" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ContentSection title="예매 안내 (최종)" desc="최종 서비스가 런칭되면 실제 예매를 위한 상세 절차와 연동 규정이 안내됩니다." icon={Calendar} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer typical of ticket sites */}
      <footer className="w-full bg-gray-50 border-t border-gray-200 mt-20 py-12">
        <div className="max-w-[1240px] mx-auto px-4 text-sm text-gray-500">
           <div className="flex flex-wrap gap-4 font-bold text-gray-700 mb-6 border-b border-gray-200 pb-4">
             <a href="#" className="hover:text-blue-600 transition-colors">회사소개</a>
             <span className="text-gray-300">|</span>
             <a href="#" className="hover:text-blue-600 transition-colors">이용약관</a>
             <span className="text-gray-300">|</span>
             <a href="#" className="hover:text-blue-600 transition-colors font-bold text-gray-900">개인정보처리방침</a>
             <span className="text-gray-300">|</span>
             <a href="#" className="hover:text-blue-600 transition-colors">고객센터</a>
           </div>
           <p className="mb-1 font-bold text-gray-600">403: BYPASS | 디지털 인문예술입문 프로젝트</p>
           <p className="text-gray-500">본 사이트는 실제 상용 사이트가 아닌 프로젝트 아이디어 시연용 프로토타입입니다.</p>
           <p className="mt-8 text-xs text-gray-400">© 403 BYPASS. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
