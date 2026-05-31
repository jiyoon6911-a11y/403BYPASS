import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ticket, Calendar, Clock, MapPin, Search, ChevronRight, ArrowRight, User, MousePointerClick, Heart, Share2, Navigation, AlertCircle, Info, Activity, Shield, Eye, BarChart3, PieChart as PieChartIcon, X, Code, Palette, Rocket, TrainFront, Accessibility, Smartphone, Armchair, Coffee, Layers, Globe, Users, BookOpen, MessageSquare, CheckCircle2, ShieldAlert, Award, Image, Video, Megaphone } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

import { GlossaryPanel } from './components/GlossaryPanel';
import { CompetitionAnalysis } from './components/CompetitionAnalysis';
import { InformationArchitecture } from './components/InformationArchitecture';
import { CoreFeatures } from './components/CoreFeatures';
import { Partners } from './components/Partners';
import { DesignPrinciples } from './components/DesignPrinciples';
import { MarketingStrategy } from './components/MarketingStrategy';
import { joinWaitlist } from './lib/firebase';
import posterImg from './assets/poster.png'; 
import image1 from './assets/image1.png';
import image2 from './assets/image2.png';
import image3 from './assets/image3.png';
import image4 from './assets/image4.png';
import image5 from './assets/image5.png';
import image6 from './assets/image6.png';
import image7 from './assets/image7.png';
import image8 from './assets/image8.png';

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
    'from-blue-600 to-blue-700 border-blue-700 shadow-sm',
    'from-blue-500 to-blue-600 border-blue-600 shadow-sm',
    'from-blue-400 to-blue-500 border-blue-500 shadow-sm',
    'from-blue-500 to-blue-600 border-blue-600 shadow-sm',
    'from-blue-600 to-blue-700 border-blue-700 shadow-sm',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      whileInView={{
        opacity: active ? 1 : 0.2, // Active pops, inactive drops into the background
        scale: 1,
        y: 0,
        boxShadow: active ? "0px 2px 8px rgba(59,130,246,0.4)" : "none",
        transition: {
          delay: delay * 0.01 + 0.1,
          type: "spring",
          stiffness: 260,
          damping: 20
        }
      }}
      viewport={{ once: true, margin: "50px" }}
      whileHover={{ scale: 1.5, zIndex: 50, y: -5, opacity: 1, transition: { duration: 0.2 } }}
      className={`w-[11px] h-[9px] sm:w-[15px] sm:h-[13px] md:w-[22px] md:h-[18px] rounded-t-sm rounded-b-none cursor-pointer transition-colors shrink-0 relative overflow-hidden ${active ? 'bg-gradient-to-br border-transparent z-10 ' + activeColors[rowIdx] : 'bg-[#e5e7eb] border border-[#d1d5db]'}`}
    >
      {active && <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity"></div>}
    </motion.div>
  );
};

const StageMap = ({ grid }: { grid: CellData[][] }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full bg-white border border-gray-200 rounded-3xl p-6 sm:p-12 flex flex-col items-center overflow-hidden relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-500"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNmM2Y0ZjYiIGZpbGwtb3BhY2l0eT0iMSIvPjwvc3ZnPg==')] opacity-50"></div>
      
      {/* Background ambient animation */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(59,130,246,0.03)_0deg,transparent_60deg,transparent_300deg,rgba(59,130,246,0.03)_360deg)] pointer-events-none"
      />
      
      <div className="flex flex-col sm:flex-row border-b border-gray-100 pb-6 mb-12 w-full justify-between items-center sm:items-end gap-6 relative z-10">
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 font-display tracking-tight flex items-center justify-center sm:justify-start gap-3">
             <motion.span 
               initial={{ height: 0 }}
               whileInView={{ height: "2rem" }}
               transition={{ duration: 0.5, delay: 0.3 }}
               className="w-2 bg-blue-600 rounded-full inline-block"
             />
             좌석배치도
          </h3>
          <p className="text-gray-400 text-sm font-bold tracking-widest uppercase">403: Bypass Seating Plan</p>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-5 text-[11px] sm:text-xs font-bold text-gray-600">
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-600 rounded-sm"></div>VIP석</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div>R석</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-400 rounded-sm"></div>S석</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div>A석</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-600 rounded-sm"></div>B석</div>
        </div>
      </div>

      <div className="w-full max-w-4xl overflow-x-auto pb-4 hide-scrollbar flex flex-col items-center relative z-10">
        <div className="w-full min-w-max flex flex-col items-center px-4">
          
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
            className="w-full max-w-2xl h-12 sm:h-16 bg-gradient-to-b from-blue-50/50 to-white border-t border-blue-200 rounded-t-[120px] mb-[60px] flex justify-center items-center relative shadow-[0_-5px_20px_rgba(59,130,246,0.1)] overflow-hidden transform-gpu"
          >
            {/* Stage sweeping shine */}
            <motion.div 
               animate={{ x: ["-200%", "300%"] }}
               transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
               className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent opacity-80 skew-x-[-20deg]"
            />
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-blue-500 font-black tracking-[0.5em] text-sm sm:text-base relative z-10"
            >
              STAGE
            </motion.span>
            <div className="absolute top-0 left-[20%] w-4 h-1 rounded-full bg-blue-200"></div>
            <div className="absolute top-0 right-[20%] w-4 h-1 rounded-full bg-blue-200"></div>
          </motion.div>

          <div className="flex flex-col gap-[4px] sm:gap-[6px] items-center relative">
            {grid.map((row, rIdx) => (
              <div key={rIdx} className="flex gap-[4px] sm:gap-[6px] justify-center relative">
                <div className="absolute right-[100%] mr-4 sm:mr-8 flex items-center h-full">
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: rIdx * 0.05 + 0.5, duration: 0.5 }}
                    className="text-[10px] sm:text-xs font-bold text-gray-400 w-4 text-right"
                  >
                    {String.fromCharCode(65 + rIdx)}
                  </motion.span>
                </div>
                {row.map((cell, cIdx) => (
                  <Seat key={cIdx} active={cell.active} rowIdx={cell.charRowIdx} delay={rIdx * 26 + cIdx} />
                ))}
                 <div className="absolute left-[100%] ml-4 sm:ml-8 flex items-center h-full">
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: rIdx * 0.05 + 0.5, duration: 0.5 }}
                    className="text-[10px] sm:text-xs font-bold text-gray-400 w-4"
                  >
                    {String.fromCharCode(65 + rIdx)}
                  </motion.span>
                </div>
              </div>
            ))}
            {/* Column Numbers at the bottom */}
            {grid.length > 0 && (
              <div className="flex gap-[4px] sm:gap-[6px] justify-center relative mt-2">
                {grid[0].map((_, cIdx) => (
                  <motion.div
                    key={cIdx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: grid.length * 0.05 + cIdx * 0.02 + 0.5, duration: 0.5 }}
                    className="w-[11px] sm:w-[15px] md:w-[22px] shrink-0 text-center flex justify-center"
                  >
                    <span className="text-[9px] sm:text-[10px] md:text-[11px] font-bold text-gray-400">{cIdx + 1}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
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
    progress: 100,
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
    progress: 100,
    details: [
      "4대 솔루션 설계: 관람 여정의 단절을 막기 위한 [이동, 시야, 흐름, 안전] 중심의 핵심 기능을 성공적으로 도출했습니다.",
      "디자인 시스템: 고대비(High Contrast) UI와 픽셀 아트 감성을 결합한 사용자 중심의 인터페이스 가이드라인을 확정했습니다.",
      "여정 고도화: 예매부터 귀가까지 타인의 도움 없이 스스로 해내는 '독립적 관람' 프로세스 설계를 완료했습니다."
    ]
  },
  {
    phase: "Phase 4",
    subtitle: "The Prototype",
    title: "기술 구현 및 프로토타입",
    progress: 100,
    details: [
      "지능형 로직 구축: 복잡한 상황별 맞춤 경로와 실시간 정보를 제공하는 서비스 알고리즘의 핵심 로직을 구현했습니다.",
      "웹사이트 런칭: 프로젝트의 철학과 진행 과정을 생생하게 공유하기 위한 공식 소개 사이트 런칭 및 보완을 완료했습니다.",
      "기능 검증 완료: 기획된 솔루션이 실제 관객의 불편함을 해소하는지 프로토타입을 통해 검증하고 피드백을 반영했습니다."
    ]
  },
  {
    phase: "Phase 5",
    subtitle: "The Horizon",
    title: "디테일 수정 및 앱 완성",
    progress: 100,
    details: [
      "애플리케이션 완성: 앱 내 기능과 디테일, 피드백을 반영하여 누구나 차별 없이 공연의 감동에 닿을 수 있는 최종 스마트폰 앱을 출시할 예정입니다.",
      "생태계 확장: 궁극적으로 시설 운영자의 자발적 개선을 유도하는 '접근성 랭킹 시스템'을 도입하여 지속 가능한 공연 문화를 만들어갈 것입니다."
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
        <div className="min-w-[500px] sm:min-w-full relative pt-12 px-6 sm:px-12">
          
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
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           className="w-full h-[460px] sm:h-[480px] relative bg-[#0A0A15] border border-[#00BFFF]/40 cursor-pointer flex flex-col justify-center items-center rounded-3xl group shadow-[0_0_20px_rgba(0,191,255,0.1)] hover:shadow-[0_0_40px_rgba(0,191,255,0.3)] transition-all duration-500"
           onClick={() => setActiveTab('ticket')}
         >
           {/* Inner container to clip backgrounds */}
           <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
             {/* Techy background grids / lines */}
             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMEJGRkYiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-50 z-0"></div>

             {/* Animated glowing dots in background */}
             <motion.div animate={{ opacity: [0.1, 0.5, 0.1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-10 left-1/4 w-1 h-1 bg-[#00BFFF] rounded-full shadow-[0_0_5px_#00BFFF]" />
             <motion.div animate={{ opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} className="absolute bottom-20 right-1/4 w-1.5 h-1.5 bg-[#00BFFF] rounded-full shadow-[0_0_8px_#00BFFF]" />
           </div>
           
           {/* Decorative Ticket edges (cutouts on the sides) */}
           <div className="absolute left-[-1px] top-1/2 -translate-y-1/2 flex flex-col gap-6 z-0 pointer-events-none">
              <div className="w-5 h-10 bg-gray-50 rounded-r-[50px] border-t border-r border-b border-[#00BFFF]/40"></div>
              <div className="w-5 h-10 bg-gray-50 rounded-r-[50px] border-t border-r border-b border-[#00BFFF]/40"></div>
              <div className="w-5 h-10 bg-gray-50 rounded-r-[50px] border-t border-r border-b border-[#00BFFF]/40"></div>
           </div>
           <div className="absolute right-[-1px] top-1/2 -translate-y-1/2 flex flex-col gap-6 z-0 pointer-events-none">
              <div className="w-5 h-10 bg-gray-50 rounded-l-[50px] border-t border-l border-b border-[#00BFFF]/40"></div>
              <div className="w-5 h-10 bg-gray-50 rounded-l-[50px] border-t border-l border-b border-[#00BFFF]/40"></div>
              <div className="w-5 h-10 bg-gray-50 rounded-l-[50px] border-t border-l border-b border-[#00BFFF]/40"></div>
           </div>

           {/* Tech UI Overlays */}
           <div className="absolute top-6 left-12 flex flex-col gap-2 z-10 pointer-events-none opacity-60">
              <div className="text-[#00BFFF] text-[10px] sm:text-xs font-mono tracking-widest uppercase">Secure Payment</div>
              <div className="text-gray-400 text-[10px] sm:text-xs font-mono tracking-widest uppercase border-t border-gray-700 pt-2">Easy Booking</div>
           </div>
           
           <div className="absolute top-6 right-12 flex flex-col items-end gap-2 z-10 pointer-events-none opacity-60 hidden sm:flex">
              <div className="flex gap-2 items-center">
                 <div className="w-8 h-px bg-[#00BFFF]/50" />
                 <div className="text-[#00BFFF] text-[10px] xl:text-xs font-mono tracking-widest uppercase">Accessibility Info</div>
              </div>
           </div>
           
           <div className="absolute bottom-6 right-12 z-10 pointer-events-none opacity-60 hidden sm:flex flex-col gap-2 w-48">
              <div className="flex justify-between w-full">
                 <div className="w-1/3 h-1 bg-[#00BFFF] rounded-sm opacity-50" />
                 <div className="w-8 h-1 bg-[#00BFFF] rounded-sm" />
              </div>
              <div className="w-full h-2 rounded bg-gray-800 border border-gray-700/50 overflow-hidden relative">
                 <motion.div animate={{ width: ["20%", "70%", "100%"] }} transition={{ duration: 5, ease: "linear", repeat: Infinity }} className="h-full bg-[#00BFFF] shadow-[0_0_8px_#00BFFF]" />
              </div>
           </div>

           {/* Main Text Content */}
           <div className="relative z-10 flex flex-col items-center justify-center p-4 sm:p-8 sm:-mt-8 mb-12 sm:mb-0 h-full">
              <motion.div 
                 initial={{ opacity: 0, y: -20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 className="flex flex-col sm:flex-row items-center gap-0 sm:gap-6 mt-8 sm:mt-4 leading-none"
              >
                  <h2 className="text-6xl sm:text-7xl lg:text-[100px] text-[#00BFFF] font-black font-mono tracking-tighter drop-shadow-[0_0_15px_rgba(0,191,255,0.8)] filter mix-blend-screen" style={{ textShadow: "4px 4px 0px rgba(0,191,255,0.3), -2px -2px 0px rgba(0,191,255,0.2)"}}>
                    403:
                  </h2>
                  <h2 className="text-5xl sm:text-7xl lg:text-[100px] text-white font-black font-mono tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]" style={{ textShadow: "4px 4px 0px rgba(255,255,255,0.2), -2px -2px 0px rgba(255,255,255,0.1)"}}>
                    BYPASS
                  </h2>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 mb-8 flex flex-col items-center text-center gap-2"
              >
                 <div className="flex flex-col sm:flex-row items-center gap-3">
                   <span className="text-[#00BFFF] text-[10px] sm:text-sm uppercase tracking-widest sm:tracking-[0.3em] font-mono border border-[#00BFFF]/50 px-4 py-1.5 rounded bg-[#00BFFF]/10 font-bold backdrop-blur-sm whitespace-nowrap">ACCESSIBILITY INFO</span>
                   <span className="text-white text-[10px] sm:text-sm font-bold bg-[#00BFFF]/20 border border-[#00BFFF]/60 px-4 py-1.5 rounded-full shadow-[0_0_10px_rgba(0,191,255,0.3)] whitespace-nowrap">단독 예매 오픈</span>
                 </div>
                 <p className="text-gray-300 text-xs sm:text-sm max-w-[280px] sm:max-w-lg mt-4 w-full font-medium px-4">
                   장애 유무와 관계없이 모두가 오픈된 무대의 감동에 닿을 수 있는 유니버설 서비스.
                 </p>
                 <motion.button 
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   className="mt-6 sm:mt-6 flex items-center justify-center gap-2 bg-[#00BFFF] text-[#0A0A15] px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-bold text-sm tracking-wide shadow-[0_0_15px_rgba(0,191,255,0.5)] hover:shadow-[0_0_20px_rgba(0,191,255,0.8)] transition-all z-20 relative pointer-events-auto"
                   onClick={(e) => { e.stopPropagation(); setActiveTab('ticket'); }}
                 >
                   더 알아보기 <ChevronRight size={18} strokeWidth={3} />
                 </motion.button>
              </motion.div>
           </div>
           
           {/* Connected Icons Line */}
           <div className="absolute bottom-6 sm:bottom-10 lg:bottom-12 w-full flex items-center justify-center px-4 sm:px-16 z-10 pointer-events-none">
               {/* Decorative glowing SVG line connecting them */}
               <svg className="absolute w-[90%] left-1/2 -translate-x-1/2 h-16 sm:h-24 pointer-events-none drop-shadow-[0_0_8px_rgba(0,191,255,0.8)]" viewBox="0 0 1000 100" preserveAspectRatio="none">
                 <path d="M 0 50 C 200 50, 250 -30, 350 50 C 450 130, 500 50, 600 50 C 700 50, 750 -30, 850 50 C 950 130, 1000 50, 1000 50" fill="none" stroke="#00BFFF" strokeWidth="4" />
               </svg>
               
               <div className="w-full sm:w-[90%] flex justify-between items-center z-10 relative">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} className="bg-[#0A0A15] p-2.5 sm:p-3.5 rounded-xl border-2 border-[#00BFFF] shadow-[0_0_15px_rgba(0,191,255,0.5)] flex items-center justify-center group-hover:-translate-y-2 transition-transform shadow-inner">
                    <TrainFront size={24} className="text-[#00BFFF] sm:w-[32px] sm:h-[32px]" />
                  </motion.div>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1 }} className="bg-[#0A0A15] p-2.5 sm:p-3.5 rounded-xl border-2 border-[#00BFFF] shadow-[0_0_15px_rgba(0,191,255,0.5)] flex items-center justify-center xl:-translate-y-4 group-hover:xl:-translate-y-6 transition-transform shadow-inner">
                    <Accessibility size={24} className="text-[#00BFFF] sm:w-[32px] sm:h-[32px]" />
                  </motion.div>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 }} className="bg-[#0A0A15] p-2.5 sm:p-3.5 rounded-xl border-2 border-[#00BFFF] shadow-[0_0_15px_rgba(0,191,255,0.5)] flex items-center justify-center xl:translate-y-4 group-hover:xl:translate-y-2 transition-transform shadow-inner">
                    <Smartphone size={24} className="text-[#00BFFF] sm:w-[32px] sm:h-[32px]" />
                  </motion.div>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.3 }} className="bg-[#0A0A15] p-2.5 sm:p-3.5 rounded-xl border-2 border-[#00BFFF] shadow-[0_0_15px_rgba(0,191,255,0.5)] flex items-center justify-center xl:-translate-y-4 group-hover:xl:-translate-y-6 transition-transform shadow-inner">
                    <Armchair size={24} className="text-[#00BFFF] sm:w-[32px] sm:h-[32px]" />
                  </motion.div>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.4 }} className="bg-[#0A0A15] p-2.5 sm:p-3.5 rounded-xl border-2 border-[#00BFFF] shadow-[0_0_15px_rgba(0,191,255,0.5)] flex items-center justify-center group-hover:-translate-y-2 transition-transform shadow-inner">
                    <Coffee size={24} className="text-[#00BFFF] sm:w-[32px] sm:h-[32px]" />
                  </motion.div>
               </div>
           </div>
         </motion.div>
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
             title="중간 발표" 
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

const SectionTicket = ({ grid }: { grid: CellData[][] }) => {
  const [isWaitlistLoading, setIsWaitlistLoading] = useState(false);

  const handleWaitlist = async () => {
    if (isWaitlistLoading) return;
    setIsWaitlistLoading(true);
    try {
      const success = await joinWaitlist();
      if (success) {
        alert("배이패스(403 BYPASS) 정식 출시 알림 신청이 완료되었습니다!");
      }
    } finally {
      setIsWaitlistLoading(false);
    }
  };

  const handleReserve = () => {
    window.open('https://eta-403-bypass.vercel.app/', '_blank');
  };

  return (
  <div className="w-full max-w-[1240px] mx-auto px-4 mt-8 pb-16">
    <div className="flex text-sm text-gray-500 mb-6 font-medium">
      <span className="cursor-pointer hover:underline">홈</span> <span className="mx-2 text-gray-300">&gt;</span> <span className="text-blue-600 font-bold">전시/행사</span>
    </div>

    {/* Header Info Area */}
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-16">
      {/* Poster Placeholder */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full lg:w-[400px] shrink-0 h-[400px] sm:h-[560px] bg-[#0A1128] border border-gray-200 rounded-xl flex flex-col items-center justify-center relative shadow-sm overflow-hidden group"
      >
        <img src={posterImg} alt="403 BYPASS Poster" className="absolute inset-0 w-full h-full object-contain sm:object-cover" />
        
        {/* Fallback for when image is not yet uploaded */}
        <div className="z-10 flex flex-col items-center opacity-0 group-hover:opacity-0 transition-opacity">
        </div>
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
              <strong className="text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">Natural Science Museum 7105</strong>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-gray-500 font-medium">관람시간</span>
              <span>403분</span>
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
          <div className="relative group w-full">
            <button onClick={handleReserve} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg transition-colors flex justify-center items-center">
              예매하기
            </button>
          </div>
          <div className="flex gap-3">
            <div className="relative group flex-1">
              <button onClick={handleWaitlist} disabled={isWaitlistLoading} className={`w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-4 rounded-xl transition-colors flex justify-center items-center gap-2 text-sm font-bold ${isWaitlistLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                <Heart size={18} className={`text-red-500 ${isWaitlistLoading ? 'animate-pulse' : ''}`} /> {isWaitlistLoading ? '처리중...' : '관심등록'}
              </button>
              <div className="hidden lg:block absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[280px] bg-gray-900 text-white text-xs rounded py-2 px-3 z-50 pointer-events-none shadow-lg text-center break-keep">
                앱이 정식 출시되면 알림이 갈 수 있게 등록합니다.
                <div className="absolute w-2 h-2 bg-gray-900 rotate-45 transform left-1/2 -translate-x-1/2 -bottom-1"></div>
              </div>
              <div className="lg:hidden text-center text-xs text-gray-500 mt-1">앱이 정식 출시되면 알림이 갈 수 있게 등록합니다.</div>
            </div>
            <button className="w-16 h-[56px] shrink-0 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl transition-colors flex justify-center items-center">
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
};

const CustomRingChart = ({ data, color, title, valueStr }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{ duration: 0.7, type: "spring", bounce: 0.5 }}
    className="flex flex-col items-center justify-center p-4 w-full"
  >
    <div className="relative w-32 h-32 mb-4">
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
            isAnimationActive={true}
            animationDuration={1500}
            animationEasing="ease-out"
          >
            {data.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="text-2xl font-black" 
          style={{ color: color }}
        >
          {valueStr}
        </motion.span>
      </div>
    </div>
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="text-gray-600 text-xs font-bold font-mono tracking-widest text-center break-keep w-full"
    >
      {title}
    </motion.div>
  </motion.div>
);

const AnimatedStatBar = ({ label, targetValue, colorClass, barColorClass, barOuterClass = "", delay }: { label: string, targetValue: number, colorClass: string, barColorClass: string, barOuterClass?: string, delay: number }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) {
      const duration = 1200;
      const startTime = performance.now();
      
      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        if (progress < 1) {
          setDisplayValue(Math.floor(Math.random() * 100).toString());
          requestAnimationFrame(step);
        } else {
          setDisplayValue(targetValue.toString());
        }
      };
      
      const timeout = setTimeout(() => {
        requestAnimationFrame(step);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [inView, targetValue, delay]);

  return (
    <motion.div 
      onViewportEnter={() => setInView(true)} 
      viewport={{ once: true, margin: "-50px" }}
      className="w-full"
    >
      <div className="flex justify-between text-sm font-bold mb-2">
        <span className="text-gray-600">{label}</span>
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ delay: delay, duration: 0.3, type: "spring", bounce: 0.5 }}
          className={`${colorClass} text-xl tracking-tighter tabular-nums text-right min-w-[3ch]`}
        >
          {displayValue}%
        </motion.span>
      </div>
      <div className={`w-full bg-gray-200 rounded-full h-4 relative overflow-hidden ${barOuterClass}`}>
        <motion.div 
          initial={{ width: '0%' }}
          animate={inView ? { width: `${targetValue}%` } : { width: '0%' }}
          transition={{ duration: 1.5, delay: delay, ease: [0.16, 1, 0.3, 1] }}
          className={`${barColorClass} h-4 rounded-full shadow-[inset_0_0_8px_rgba(255,255,255,0.4)] relative overflow-hidden`} 
        >
          {/* Shine effect */}
          <motion.div 
            initial={{ x: "-100%" }}
            animate={inView ? { x: ["-100%", "200%"] } : {}}
            transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg]"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const SectionMid = ({ setActiveTab }: { setActiveTab: (v: string) => void }) => {
  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 py-16">
      <div className="mb-12 border-b-2 border-gray-200 pb-4 flex items-center justify-between">
        <h2 className="text-3xl font-display font-black text-gray-900 tracking-tight">관람후기 (중간 발표)</h2>
        <div className="px-3 py-1 bg-blue-100 text-blue-700 text-[11px] font-bold rounded-md">5/18 UPDATE</div>
      </div>

      <div className="space-y-24 text-gray-800">
        {/* 1. 경쟁 및 유사 서비스 분석 */}
        <section>
          <div className="mb-10">
             <h3 className="text-3xl font-black text-gray-900 mb-4 flex items-center gap-4">
               <span className="text-blue-600 text-4xl font-display">01.</span> 
               <span className="font-display tracking-tight">유사 서비스 비교 분석</span>
             </h3>
             <p className="text-xl text-gray-600 font-sans tracking-tight leading-relaxed max-w-4xl">
               국내외 다양한 접근성 및 시야 정보 서비스를 분석하여 403 BYPASS만의 차별화된 하이브리드 전략을 도출했습니다.
             </p>
          </div>

          <CompetitionAnalysis />
        </section>

        {/* 2. 우리 서비스(403bypass) IA */}
        <section>
          <div className="mb-10">
             <h3 className="text-3xl font-black text-gray-900 mb-4 flex items-center gap-4">
               <span className="text-blue-600 text-4xl font-display">02.</span> 
               <span className="font-display tracking-tight">서비스 구조 (IA)</span>
             </h3>
             <p className="text-xl text-gray-600 font-sans tracking-tight leading-relaxed max-w-4xl">
               관객의 복잡한 관람 준비 여정을 단순화하고, 필요한 정보를 필요할 때 제공하는 최적화된 정보 설계를 구축했습니다.
             </p>
          </div>

          <InformationArchitecture />
        </section>

        {/* 3. 핵심 기능 */}
        <section>
          <div className="mb-16 text-center">
             <h3 className="text-3xl font-black text-gray-900 mb-4 flex items-center justify-center gap-4">
               <span className="text-blue-600 text-4xl font-display">03.</span> 
               <span className="font-display tracking-tight">핵심 기능</span>
             </h3>
             <p className="text-xl text-gray-600 font-sans tracking-tight leading-relaxed mx-auto max-w-2xl px-4">
               앱 화면을 기준으로 구성된 5개 탭(홈 / 안내맵 / 매칭예약 / 나의티켓 / 마이페이지) 별 핵심 기능 명세입니다.
             </p>
          </div>

          <CoreFeatures />
        </section>

        {/* 4. UI 디자인 원칙 */}
        <section>
          <div className="mb-16 text-center">
             <h3 className="text-3xl font-black text-gray-900 mb-4 flex items-center justify-center gap-4">
               <span className="text-blue-600 text-4xl font-display">04.</span> 
               <span className="font-display tracking-tight">UI 디자인 원칙</span>
             </h3>
             <p className="text-xl text-gray-600 font-sans tracking-tight leading-relaxed mx-auto max-w-2xl px-4">
               배리어 프리를 넘어 모든 사용자가 직관적으로 인지할 수 있는 '403 BYPASS'만의 유니버설 디자인 언어입니다.
             </p>
          </div>
          <DesignPrinciples />
        </section>

        {/* 5. 협업 파트너 */}
        <section>
          <div className="mb-16 text-center">
             <h3 className="text-3xl font-black text-gray-900 mb-4 flex items-center justify-center gap-4">
               <span className="text-blue-600 text-4xl font-display">05.</span> 
               <span className="font-display tracking-tight">협업 파트너</span>
             </h3>
             <p className="text-xl text-gray-600 font-sans tracking-tight leading-relaxed mx-auto max-w-2xl px-4">
               403 BYPASS는 국내 유수의 공공기관 및 서비스와 협력하여 더욱 견고한 배리어 프리 생태계를 구축합니다.
             </p>
          </div>
          <Partners />
        </section>

        {/* 6. 홍보 전략 */}
        <section>
          <div className="mb-16 text-center">
             <h3 className="text-3xl font-black text-gray-900 mb-4 flex items-center justify-center gap-4">
               <span className="text-blue-600 text-4xl font-display">06.</span> 
               <span className="font-display tracking-tight">홍보 전략</span>
             </h3>
             <p className="text-xl text-gray-600 font-sans tracking-tight leading-relaxed mx-auto max-w-2xl px-4">
               신뢰할 수 있는 파트너십과 강력한 서포터즈 운영을 통해 배리어 프리의 가치를 널리 확산시킵니다.
             </p>
          </div>
          <MarketingStrategy />
        </section>
          
          <div className="mt-16 bg-gray-900 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMEJGRkYiIHN0cm9rZS1vcGFjaXR5PSIwLjI1IiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]"></div>
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl">
                   <h5 className="text-[#00BFFF] font-black text-2xl sm:text-3xl mb-4 font-display italic">403BYPASS REALIZATION</h5>
                   <p className="text-gray-300 font-sans leading-relaxed text-sm sm:text-base">
                     리서치를 바탕으로 한 403BYPASS를 구현했습니다. 추후 디테일과 기능을 더 업데이트 및 수정할 계획입니다. 장애인과 비장애인 모두를 위한 보편적 설계가 적용된 솔루션을 확인해보세요.
                   </p>
                </div>
                <button 
                  onClick={() => window.open('https://eta-403-bypass.vercel.app/', '_blank')}
                  className="bg-[#00BFFF] text-black px-8 py-4 rounded-full font-black flex items-center gap-2 whitespace-nowrap shadow-[0_0_20px_rgba(0,191,255,0.4)] hover:shadow-[0_0_40px_rgba(0,191,255,0.6)] transition-all"
                >
                  403BYPASS 미리보기 <ChevronRight size={20} strokeWidth={3} />
                </button>
             </div>
          </div>
        </div>
      </div>
    );
};

const SectionIdea = () => {
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 py-16">
      <GlossaryPanel isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />
      
      <div className="mb-12 border-b-2 border-gray-200 pb-4 flex items-center gap-4">
        <h2 className="text-3xl font-display font-black text-gray-900 tracking-tight">프로젝트 소개</h2>
      </div>

      <div className="space-y-20 text-gray-800">
        
        {/* 1. 프로젝트 정의 */}
        <section className="bg-white p-8 sm:p-12 border border-gray-200 rounded-2xl shadow-sm relative overflow-hidden group">
          <h3 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-4">
            <span className="text-blue-600 text-4xl font-display">01.</span> 
            <span className="font-display tracking-tight text-gray-900">시혜적 배려에서 <span className="text-blue-600">보편적 권리</span>로</span>
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
              <span className="font-display tracking-tight">문제발굴</span>
            </h3>
            <p className="text-xl text-gray-600 font-sans tracking-tight leading-relaxed max-w-4xl">
              현재 공연 시장은 눈에 보이는 장벽뿐만 아니라, 보이지 않는 정보와 인식의 장벽으로 인해 수많은 관객의 발걸음을 돌리게 하고 있습니다.
            </p>
          </div>
          
          <div className="space-y-8">
            {/* 1. 시설 문제 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-2xl font-black mb-2 text-gray-900 font-display flex items-center gap-3">
                <span className="bg-purple-100 text-purple-700 w-8 h-8 rounded-full flex shrink-0 items-center justify-center text-sm">1</span>
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
                    <AnimatedStatBar 
                      label="공공 공연장" 
                      targetValue={12} 
                      colorClass="text-purple-600" 
                      barColorClass="bg-purple-400" 
                      delay={0.2} 
                    />
                    <AnimatedStatBar 
                      label="민간 공연장" 
                      targetValue={1} 
                      colorClass="text-purple-600 font-black" 
                      barColorClass="bg-purple-600 border border-purple-800" 
                      delay={0.6} 
                    />
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
                <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex shrink-0 items-center justify-center text-sm">2</span>
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
                <span className="bg-green-100 text-green-700 w-8 h-8 rounded-full flex shrink-0 items-center justify-center text-sm">3</span>
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
                <span className="bg-yellow-500 text-yellow-900 w-8 h-8 rounded-full flex shrink-0 items-center justify-center text-sm font-bold">4</span>
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
                  <span className="text-gray-300 text-sm leading-relaxed relative z-10">성별, 연령, 장애 유무와 관계없이 누구나 편리하게 이용해야 한다는 '보편적 설계'에 대한 인식이 현저히 낮습니다.</span>
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

const PromoImageWithPlaceholder = ({ 
  src, 
  alt, 
  label = "",
  description = "",
  hideCardDetails = false,
  href,
  instagramId
}: { 
  src: string; 
  alt: string; 
  label?: string;
  description?: string;
  hideCardDetails?: boolean;
  href?: string;
  instagramId?: string;
}) => {
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const CardContainer = href ? 'a' : 'div';
  const containerProps = href 
    ? {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "bg-white border border-gray-200 hover:border-blue-500 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full justify-between cursor-pointer block group text-left"
      }
    : {
        className: "bg-white border border-gray-200 hover:border-blue-500 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full justify-between text-left"
      };

  return (
    <>
      <CardContainer {...containerProps}>
        <div 
          onClick={href ? undefined : () => !isError && setIsModalOpen(true)}
          className={`p-4 flex flex-col items-center justify-center bg-slate-50/50 relative flex-1 min-h-[160px] overflow-hidden ${!isError && !href ? 'cursor-zoom-in group' : 'group'}`}
        >
          {isError ? (
            <div className="text-center py-6 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 mb-2">
                <Image size={20} className="text-blue-500" />
              </div>
              <p className="text-[12px] font-bold text-gray-800 leading-tight mb-1">{alt}</p>
              <p className="text-[9px] text-blue-600 font-mono bg-blue-50 px-2.5 py-0.5 rounded-full font-bold">시안 이미지 대기 중</p>
            </div>
          ) : (
            <div className="relative w-full overflow-hidden rounded-md flex justify-center">
              <img 
                src={src} 
                alt={alt} 
                onError={() => setIsError(true)} 
                className="w-full h-auto max-h-[320px] object-contain rounded-md shadow-sm transition-all duration-500 ease-out transform group-hover:scale-108 group-hover:brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                {href ? (
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                    인스타그램 방문
                  </span>
                ) : (
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 transform translate-y-2 group-hover:translate-y-0">
                    <Search size={14} /> 크게 보기
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        {!hideCardDetails && (label || description) ? (
          <div className="p-4 bg-white border-t border-gray-100 text-[11px] space-y-1 font-sans">
            {label && (
              <p className="text-blue-600 font-extrabold text-xs tracking-wider uppercase flex items-center gap-1">
                <Image size={12} /> {label}
              </p>
            )}
            {description && <p className="text-gray-600 leading-relaxed break-keep">{description}</p>}
          </div>
        ) : null}

        {instagramId && (
          <div className="py-2.5 px-4 bg-stone-50 border-t border-gray-100 flex items-center justify-between transition-colors group-hover:bg-slate-50">
            <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium font-sans">
              <svg className="w-3.5 h-3.5 text-pink-600 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
              <span className="font-mono text-gray-800 font-bold">@{instagramId}</span>
            </span>
            <span className="text-[10px] text-blue-600 font-bold group-hover:translate-x-1 transition-transform inline-block">바로가기 &rarr;</span>
          </div>
        )}
      </CardContainer>

      <AnimatePresence>
        {!href && isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Close button at top right */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2.5 text-white/70 hover:text-white bg-slate-900/50 hover:bg-slate-800/80 rounded-full transition-all duration-200 z-[110] border border-slate-800 cursor-pointer"
              title="닫기"
            >
              <X size={22} />
            </button>

            <motion.div 
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={() => setIsModalOpen(false)}
              className="relative max-w-5xl max-h-[85vh] w-auto h-auto flex items-center justify-center cursor-zoom-out"
            >
              <img 
                src={src} 
                alt={alt} 
                className="max-h-[85vh] max-w-full w-auto object-contain rounded-xl shadow-2xl border border-slate-800 select-none pointer-events-auto"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const SectionFinal = () => {
  const [activeTab, setActiveTabTab] = useState<number | null>(null); // null means showing outer Document Outline / List
  const [isFabHovered, setIsFabHovered] = useState(false);
  const [glassSize, setGlassSize] = useState(24);
  const [glassOpacity, setGlassOpacity] = useState(90);
  const [glassFocal, setGlassFocal] = useState(1.5);
  const [qrHotspot, setQrHotspot] = useState('subway');
  const [activeStep6, setActiveStep6] = useState('6-1');
  const [youtubeUrl, setYoutubeUrl] = useState('https://www.youtube.com/watch?v=R3IuX2aGjX4');

  const getYouTubeId = (url: string) => {
    if (!url) return 'R3IuX2aGjX4';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : 'R3IuX2aGjX4';
  };



  const menuItems = [
    { label: "1. 프로젝트 개요", desc: "추진 배경, 필요성 및 프로젝트 목표" },
    { label: "2. 기획 및 요구사항", desc: "시장 조사, 타겟층 및 핵심 기능 정의" },
    { label: "3. UI/UX 디자인", desc: "정보구조도(IA) 및 접근성 디자인 가이드" },
    { label: "4. 개발 및 구현", desc: "기술 스택, DB 스키마 및 구현 프로세스" },
    { label: "5. 테스트 및 배포", desc: "웹 접근성 테스트 매트릭스 및 배포 환경" },
    { label: "6. 핵심 기능 상세", desc: "이동·현장·지원·개인화 11대 기능 상세" },
    { label: "7. 홍보 전략", desc: "SNS 전략, 크로스오버 QR 마케팅, 서포터즈" },
    { label: "8. 성과 및 회고", desc: "기대 효과, 향후 로드맵 및 팀 회고" }
  ];

  return (
    <div className="w-full bg-[#FAFAFC] min-h-screen py-10">
      <div className="max-w-[1240px] mx-auto px-4">
        
        {/* Upper Title and Slogan Portal */}
        <div className="mb-10 bg-[#0A0B14] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-blue-950 shadow-[0_10px_30px_rgba(10,11,20,0.4)]">
          <div className="absolute inset-0 opacity-15 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMEJGRkYiIHN0cm9rZS1vcGFjaXR5PSIwLjI1IiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-[#00BFFF]/20 text-[#00BFFF] px-3.5 py-1 rounded-full text-xs font-black tracking-widest font-mono border border-[#00BFFF]/30">
                  OFFICIAL ARCHIVE
                </span>
                <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-black font-sans border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> 완료 (RELEASED)
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-white mb-2">
                403 <span className="text-[#00BFFF] italic">BYPASS</span>
              </h1>
              <p className="text-xl text-[#00BFFF] font-medium font-sans mb-4">
                &ldquo;누구에게나 열려있는 무대를 위한 앱&rdquo;
              </p>
              <div className="flex flex-wrap gap-3 text-xs sm:text-sm font-mono text-gray-300">
                <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                  모바일 앱: <a href="https://eta-403-bypass.vercel.app/" target="_blank" rel="noreferrer" className="text-[#00BFFF] hover:underline font-bold">https://eta-403-bypass.vercel.app/</a>
                </span>
                <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                  프로젝트 사이트: <a href="https://403-bypass-1aug.vercel.app/" target="_blank" rel="noreferrer" className="text-[#00BFFF] hover:underline font-bold">https://403-bypass-1aug.vercel.app/</a>
                </span>
              </div>
            </div>
            
            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3">
              <button
                onClick={() => window.open('https://eta-403-bypass.vercel.app/', '_blank')}
                className="bg-[#00BFFF] text-[#05060F] hover:bg-white hover:shadow-[0_0_20px_rgba(0,191,255,0.6)] px-6 py-3.5 rounded-xl font-black text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Smartphone size={16} strokeWidth={2.5} /> 실제 앱 실행하기 <ArrowRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Major Portal Outline Index or Detailed Viewer */}
        <AnimatePresence mode="wait">
          {activeTab === null ? (
            <motion.div
              key="outline-list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8 text-left"
            >
              {/* Introduction Card */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-[#00BFFF]/10 to-transparent rounded-bl-full pointer-events-none"></div>
                <div className="max-w-3xl relative z-10">
                  <span className="inline-block bg-blue-100 text-blue-800 text-[10px] font-black px-2.5 py-1 rounded-full mb-3 uppercase tracking-wider font-mono">
                    System Architecture & Tech Specs
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-3 flex items-center gap-2">
                    <BookOpen className="text-blue-600" size={28} /> DOCUMENT OUTLINE
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-650 leading-relaxed font-sans break-keep">
                    403 BYPASS의 대장정이 집약된 공식 아카이브이자 상세 명세 백서입니다. 본 기획 규격집은 유니버설 디자인의 원칙 위에서 이동, 현장 대기, 디지털 비콘 연결, 홍보 수단 일원화까지 아우르는 8단계 전주기 프레임워크를 수록하고 있습니다.
                  </p>
                  <p className="text-xs text-blue-600 font-bold mt-2 flex items-center gap-1.5 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> 아래 단원을 선택하면 상세 보고서가 활성화되며, 우측 하단의 원형 추적 레이지 버튼을 통해 보행 시에도 연속 도약할 수 있습니다.
                  </p>
                </div>
              </div>

              {/* Grid of Outline Articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                {menuItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4, shadow: "0px 10px 30px rgba(0,0,0,0.06)", borderColor: "#2563eb" }}
                    onClick={() => {
                      setActiveTabTab(idx);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-white border border-gray-200 hover:border-blue-500 rounded-3xl p-6 sm:p-8 cursor-pointer shadow-sm transition-all duration-300 flex flex-col justify-between group text-left relative overflow-hidden min-h-[190px]"
                  >
                    {/* Watermark digit */}
                    <div className="absolute right-4 -bottom-6 text-9xl font-extrabold text-slate-100/50 select-none pointer-events-none font-mono">
                      0{idx + 1}
                    </div>

                    <div className="relative z-10 flex-1">
                      <span className="bg-blue-50 text-blue-700 text-[10px] font-black px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wider mb-3 inline-block">
                        CHAPTER 0{idx + 1}
                      </span>
                      <h3 className="text-lg font-black text-gray-900 font-sans group-hover:text-blue-600 transition-colors mb-2">
                        {item.label}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed font-sans font-medium">
                        {item.desc}
                      </p>
                    </div>

                    <div className="relative z-10 mt-6 border-t border-gray-150 pt-4 flex items-center justify-between">
                      <span className="text-[11px] text-gray-400 font-bold tracking-wider group-hover:text-blue-600 transition-colors uppercase">상세 내용 보기 &rarr;</span>
                      <span className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-600 text-gray-500 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                        <ChevronRight size={14} />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>


            </motion.div>
          ) : (
            <motion.div
              key="detail-layout"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="lg:col-span-12 max-w-4xl mx-auto w-full text-left"
            >
              <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm min-h-[600px] flex flex-col justify-between relative">
                
                {/* Dynamic Content Sections */}
                <div>
                  
                  {/* --- SECTION 1: 프로젝트 개요 --- */}
                  {activeTab === 0 && (
                    <div className="space-y-8">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          <span className="text-xs font-bold text-blue-600 font-mono uppercase tracking-wider">01. OVERVIEW</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-display">1. 프로젝트 개요</h2>
                        <span className="block w-12 h-1 bg-blue-600 mt-3 rounded-full"></span>
                      </div>

                      <div className="bg-[#0A0C16] text-white p-6 rounded-2xl border border-blue-950 shadow-inner">
                        <h3 className="text-sm font-mono font-bold text-blue-400 mb-2">1.1. 프로젝트 정의</h3>
                        <p className="text-lg font-black tracking-tight mb-2">
                          &ldquo;403 BYPASS&rdquo;
                        </p>
                        <p className="text-xs text-blue-200/80 mb-3 font-mono">
                          (403 Forbidden + BYPASS의 결합 — &apos;접근이 막혔던 것을 우회·해결한다&apos;는 의미)
                        </p>
                        <p className="text-sm font-sans text-gray-300 leading-relaxed break-keep">
                          403 BYPASS는 누구나 편리하게 문화 생활을 향유할 수 있는 공연 종합 서비스입니다. 공연 관람에서 발생하는 정보 분산, 접근성 부재, 현장 혼잡 등의 문제를 하나의 앱으로 통합 및 해결합니다.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <Activity size={18} className="text-blue-600" /> 1.2. 추진 배경 및 필요성
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed font-sans break-keep">
                          팀원들의 공연 관람 실제 경험에서 출발했습니다. 공연장을 방문하면서 겪었던 불편함과 기존 서비스들의 한계를 팀 내에서 공유하고 논의하며 개선 방향을 도출했습니다.
                        </p>

                        <div className="grid sm:grid-cols-3 gap-4 mt-2">
                          <div className="bg-red-50/50 hover:bg-red-50 border border-red-100 p-5 rounded-xl transition-colors">
                            <span className="bg-red-100 text-red-800 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">문제 01</span>
                            <h4 className="text-sm font-bold text-gray-900 mt-2 mb-1">정보의 분산</h4>
                            <p className="text-[12px] text-gray-600 leading-relaxed font-sans break-keep">
                              예매, 시야, 접근성 정보가 여러 앱·사이트에 흩어져 있어 한눈에 확인 불가
                            </p>
                          </div>
                          
                          <div className="bg-red-50/50 hover:bg-red-50 border border-red-100 p-5 rounded-xl transition-colors">
                            <span className="bg-red-100 text-red-800 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">문제 02</span>
                            <div className="flex items-baseline gap-1 mt-2 mb-1">
                              <h4 className="text-sm font-bold text-gray-900">시설의 부재</h4>
                              <span className="text-xs text-red-600 font-extrabold font-mono">20% / 1%</span>
                            </div>
                            <p className="text-[12px] text-gray-600 leading-relaxed font-sans break-keep">
                              휠체어석 보유율 전국 20%(633개), 민간 공연장 장애 편의시설 설치율 1% 수준
                            </p>
                          </div>

                          <div className="bg-red-50/50 hover:bg-red-50 border border-red-100 p-5 rounded-xl transition-colors">
                            <span className="bg-red-100 text-red-800 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">문제 03</span>
                            <div className="flex items-baseline gap-1 mt-2 mb-1">
                              <h4 className="text-sm font-bold text-gray-900">환경의 단절</h4>
                              <span className="text-xs text-red-600 font-extrabold font-mono">65%</span>
                            </div>
                            <p className="text-[12px] text-gray-600 leading-relaxed font-sans break-keep">
                              대학로 소극장 65%는 휠체어 접근 완전 불가. 이동 경로 단절.
                            </p>
                          </div>
                        </div>

                        <div className="bg-gray-50 text-gray-500 text-[11px] p-3 rounded-lg flex items-center gap-2 font-mono border border-gray-100">
                          <Info size={14} className="text-blue-500 shrink-0" />
                          <span>출처: 월간공연전산망 KOPIS, 「공연장에 당신의 자리가 있나요?」</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <CheckCircle2 size={18} className="text-blue-600" /> 1.3. 프로젝트 목표
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="bg-[#FAFAFC] border border-gray-200 p-5 rounded-xl">
                            <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-sm mb-3">01</div>
                            <h4 className="text-sm font-bold text-gray-950 mb-1">보편적 가치 향유</h4>
                            <p className="text-xs text-gray-600 leading-relaxed font-sans break-keep">인종, 장애 유무와 상관없이 누구나 쉽게 접근하여 평등한 문화 생활을 누릴 수 있는 유니버셜 디자인(Universal Design) 원칙을 실현합니다.</p>
                          </div>

                          <div className="bg-[#FAFAFC] border border-gray-200 p-5 rounded-xl">
                            <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-sm mb-3">02</div>
                            <h4 className="text-sm font-bold text-gray-950 mb-1">통합형 여정 보호</h4>
                            <p className="text-xs text-gray-600 leading-relaxed font-sans break-keep">파편화 및 단절을 차단하고, 공연 관람 전체 여정(정보 검색 → 이동 안내 → 현장 대응 → 후기 생산)을 원스톱 통합형 채널로 해결합니다.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* --- SECTION 2: 기획 및 요구사항 정의 --- */}
                  {activeTab === 1 && (
                    <div className="space-y-8">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          <span className="text-xs font-bold text-blue-600 font-mono uppercase tracking-wider">02. PLANNING & INTAKE</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-display">2. 기획 및 요구사항 정의</h2>
                        <span className="block w-12 h-1 bg-blue-600 mt-3 rounded-full"></span>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <Activity size={18} className="text-blue-600" /> 2.1. 시장 조사 및 타겟 분석
                        </h3>
                        
                        <p className="text-xs font-bold text-gray-400 font-mono uppercase tracking-widest mb-1">시장 유사 서비스 비교 조사</p>
                        <div className="overflow-x-auto border border-gray-250 rounded-xl shadow-sm">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                                <th className="p-3">서비스명</th>
                                <th className="p-3">카테고리</th>
                                <th className="p-3 text-center">좌석 시야</th>
                                <th className="p-3 text-center">접근성 정보</th>
                                <th className="p-3">한계점 및 극복</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                              {['인터파크', '놀(Nol)', '멜론티켓'].map((name) => (
                                <tr key={name} className="hover:bg-gray-50/50">
                                  <td className="p-2.5 font-bold text-gray-900">{name}</td>
                                  <td className="p-2.5 text-gray-500">예매</td>
                                  <td className="p-2.5 text-center text-red-500 font-bold">X</td>
                                  <td className="p-2.5 text-center text-red-500 font-bold">X</td>
                                  <td className="p-2.5 text-gray-600">접근성 관련 정보 자체가 완전히 전무함</td>
                                </tr>
                              ))}
                              <tr className="hover:bg-gray-50/50">
                                <td className="p-2.5 font-bold text-gray-900">자리어때</td>
                                <td className="p-2.5 text-gray-500">시야</td>
                                <td className="p-2.5 text-center text-emerald-500 font-extrabold">O (사진)</td>
                                <td className="p-2.5 text-center text-yellow-600 font-bold">일부 텍스트</td>
                                <td className="p-2.5 text-gray-600">무분별한 광고 게재 및 불편하고 구식인 UI/UX</td>
                              </tr>
                              <tr className="hover:bg-gray-50/50">
                                <td className="p-2.5 font-bold text-gray-900">오프메이트</td>
                                <td className="p-2.5 text-gray-500">시야</td>
                                <td className="p-2.5 text-center text-emerald-500 font-extrabold">O</td>
                                <td className="p-2.5 text-center text-red-500 font-bold">X</td>
                                <td className="p-2.5 text-gray-600">좌석 뷰에만 전념하여 접근성 인프라 부재</td>
                              </tr>
                              <tr className="hover:bg-gray-50/50">
                                <td className="p-2.5 font-bold text-gray-900">시야(Seeya)</td>
                                <td className="p-2.5 text-gray-500">시야</td>
                                <td className="p-2.5 text-center text-emerald-500 font-extrabold">O</td>
                                <td className="p-2.5 text-center text-yellow-600 font-bold">후기 병행</td>
                                <td className="p-2.5 text-gray-600">단순 조명·음향 후기에 국한된 좁은 반경</td>
                              </tr>
                              <tr className="hover:bg-gray-50/50">
                                <td className="p-2.5 font-bold text-gray-900">S-MAP</td>
                                <td className="p-2.5 text-gray-500">지도</td>
                                <td className="p-2.5 text-center text-red-500 font-bold">X</td>
                                <td className="p-2.5 text-center text-red-500 font-bold">X</td>
                                <td className="p-2.5 text-gray-600">광역 지도 위주로 실내 상세 모델링 부족</td>
                              </tr>
                              <tr className="hover:bg-gray-50/50">
                                <td className="p-2.5 font-bold text-gray-900">Theatre Access NYC</td>
                                <td className="p-2.5 text-gray-500">접근성</td>
                                <td className="p-2.5 text-center text-red-500 font-bold">X</td>
                                <td className="p-2.5 text-center text-emerald-500 font-extrabold">O</td>
                                <td className="p-2.5 text-gray-600">뉴욕에 국한된 해외 로컬 대상 서비스</td>
                              </tr>
                              <tr className="hover:bg-gray-50/50">
                                <td className="p-2.5 font-bold text-gray-900">Sociability</td>
                                <td className="p-2.5 text-gray-500">접근성</td>
                                <td className="p-2.5 text-center text-red-500 font-bold">X</td>
                                <td className="p-2.5 text-center text-emerald-500 font-extrabold">O</td>
                                <td className="p-2.5 text-gray-600">영국 위주이며 상호 예약 등의 생태계 미흡</td>
                              </tr>
                              <tr className="bg-blue-50/60 font-bold">
                                <td className="p-3 text-blue-600 font-black">403 BYPASS</td>
                                <td className="p-3 text-blue-500">종합 통합</td>
                                <td className="p-3 text-center text-blue-600 font-black">O (360 VR)</td>
                                <td className="p-3 text-center text-blue-600 font-black">O (필터+3D)</td>
                                <td className="p-3 text-blue-900 font-extrabold bg-blue-100/40">장벽 파괴형 모든 올인원(All-in-One) 솔루션</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="mt-6">
                          <p className="text-xs font-bold text-gray-400 font-mono uppercase tracking-widest mb-3">주요 타겟 사용자 페르소나 및 맵핑</p>
                          <div className="grid sm:grid-cols-2 gap-4">
                            {[
                              { type: "휠체어·이동 약자", text: "계단, 가파른 단차, 접근 안내 동선 협소", sol: "3D 실내 안내 지도, S-MAP 입체 안내, AR 배리어프리 전용 우회 경로" },
                              { type: "청각 장애인", text: "공연 자막 자막 누락, 현장 긴급 실시간 알림 음향 단절", sol: "충무아트센터 가상 AR 자막 안경 제어, 모바일 자막 동기화 송출" },
                              { type: "시각 장애인", text: "어두운 화면 UI 및 티켓 예매처 리더 에러", sol: "웹 접근성 준수, TTS 로컬 마크업 스피커 가이드, 음성 액션 제어" },
                              { type: "신경다양성 관람객 (ADHD 등)", text: "돌발 소음, 극도로 복잡한 인파 밀집 불안", sol: "실시간 로비·MD 부스 혼잡 지표, 한산한 최적 진입 시간대 권장" },
                              { type: "고령 관람층", text: "지나치게 축소된 텍스트 장벽, 스마트 지문 스와이프 복잡성", sol: "통합 조작 센터 가변 거대 폰트 스케일, 간편 웰컴 버튼 패널" },
                              { type: "비장애인 일반 관객", text: "시야 정보 파편화, 배리어프리 정보 부족", sol: "전 좌석 시야 확인 및 가계정 연동을 포함한 고도화 플랫폼 통합 해결" }
                            ].map((user, i) => (
                              <div key={i} className="border border-gray-150 p-4 rounded-xl hover:border-blue-300 transition-all bg-[#FAFAFC]">
                                <div className="text-xs font-black text-blue-600 mb-1">TARGET {i+1}</div>
                                <h4 className="text-sm font-bold text-gray-900 mb-2">{user.type}</h4>
                                <div className="space-y-1 text-xs">
                                  <p className="text-red-600 font-sans"><strong className="text-gray-500">한계:</strong> {user.text}</p>
                                  <p className="text-emerald-700 font-sans"><strong className="text-gray-500">솔루션:</strong> {user.sol}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <CheckCircle2 size={18} className="text-blue-600" /> 2.2. 서비스 핵심 기능 정의
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {[
                            { name: "접근성 필터링 검색", desc: "휠체어석, 자막 제공, 수어 통역, 음성해설 제공 여부 기반 세부 공연 매핑" },
                            { name: "좌석 시야 확인", desc: "360도 가상 VR 이미징 기반으로 각 구역별 시야 방해 요소 선제적 정찰" },
                            { name: "수어/자막 지원 정보", desc: "지원 정보 아이콘 및 커스텀 인포 뱃지를 통해 한눈에 배리어프리 목록 체크" },
                            { name: "편의시설 혼잡도 확인", desc: "화장실, MD 스토어, 매표 카운터 등의 로비 혼잡 정도를 정체 지수로 확인" },
                            { name: "3D 및 AR 기반 길 찾기", desc: "서울시 S-MAP 레이아웃 가상 투사 및 카메라 AR 뷰 지상 가상선 가이드" },
                            { name: "접근성 매니저 매칭", desc: "도움이 절대적으로 절실한 관객을 위해 1:1 도우미 매니저 현장 동행 예약 서비스" },
                            { name: "AR 자막안경 제어 및 대여", desc: "실제 안경형 기기 대여 상태 연동 및 디스플레이 자막 자간/크기 제어 동화" },
                            { name: "선호 맞춤 AI 알고리즘", desc: "공연 추천 유니버셜 프로파일과 사용자 데이터 장르 추천 융합 최우선 처리" }
                          ].map((f, i) => (
                            <div key={i} className="bg-white border border-gray-200 p-4 rounded-xl flex items-start gap-3">
                              <span className="bg-blue-50 text-blue-600 w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">{i+1}</span>
                              <div>
                                <h4 className="text-xs font-bold text-gray-950 mb-0.5">{f.name}</h4>
                                <p className="text-[11px] text-gray-600 font-sans leading-relaxed break-keep">{f.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* --- SECTION 3: UI/UX 디자인 및 설계 --- */}
                  {activeTab === 2 && (
                    <div className="space-y-8">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          <span className="text-xs font-bold text-blue-600 font-mono uppercase tracking-wider">03. UI/UX SYSTEM ARCHITECTURE</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-display">3. UI/UX 디자인 및 설계</h2>
                        <span className="block w-12 h-1 bg-blue-600 mt-3 rounded-full"></span>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <Layers size={18} className="text-blue-600" /> 3.1. 정보 구조도 (IA)
                        </h3>
                        <p className="text-sm text-gray-600 font-sans leading-relaxed mb-4">
                          앱은 하단 5개 핵심 탭으로 설계되었으며, 관람객 목적성에 최적화된 동선과 스탠다드 플랫 뎁스를 추구합니다.
                        </p>
                        
                        <div className="space-y-3">
                          {[
                            { tab: "홈 (Home)", spec: "공연 추천 종합 피드, 퀵 접근성 필터 바, 서포터즈 슬라이더", feats: "선호 추천 랭킹, 실시간 필터 (휠체어/자막/수어/음성해설), 가변 카드 정렬" },
                            { tab: "안내/맵 (Navigation Map)", spec: "카메라 기반 AR 배리어프리 실시간 화살표 노선, 3D S-MAP 뷰어, 시설 정체 지수", feats: "경사/장애물 우회로 탐색, 실내 고밀도 시뮬레이션, 막차/지하철 고장 통신 연동" },
                            { tab: "매칭/대여 (Care Rental)", spec: "대면 지원 도우미 요청, AR 안경 배리어프리 대여 연계, AI 보이스 오더 부스터", feats: "현장 1:1 케어 요원 매칭, 스마트 글래스 블루투스 대화 조율, 음성 티케팅 프로세서" },
                            { tab: "티켓/시야 (Ticket View)", spec: "360VR 체험구역, 글로벌 티켓 정액권 및 대행 연계 아웃링크, 모바일 예매 보드", feats: "실제 무대 조도/스탠딩 가림 가상 정찰, 티켓 오픈 비대면 알림 자동화, 가계정 결제 체크" },
                            { tab: "마이 (My Accessibility)", spec: "유니버셜 개인화 장벽 관리 대쉬보드, 실측 점검록 기록기, 환경 고대비 피팅", feats: "점검 각도계, TTS 스케일러 조정, 다크 테마 한판 전환" }
                          ].map((ia, idx) => (
                            <div key={idx} className="bg-[#FAFAFC] border border-gray-200 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="sm:w-1/4">
                                <span className="bg-blue-600 text-white text-[9px] font-black font-mono px-2 py-0.5 rounded uppercase tracking-wider block w-max mb-1">TAB 0{idx+1}</span>
                                <h4 className="text-sm font-extrabold text-blue-900">{ia.tab}</h4>
                              </div>
                              <div className="sm:w-3/4 space-y-1">
                                <p className="text-xs text-gray-800"><strong className="text-gray-400">화면 구성:</strong> {ia.spec}</p>
                                <p className="text-[11px] text-gray-500 font-sans"><strong className="text-gray-400">핵심 기능:</strong> {ia.feats}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <Palette size={18} className="text-blue-600" /> 3.2. 접근성 디자인 가이드라인
                        </h3>
                        
                        <div className="grid sm:grid-cols-3 gap-4">
                          <div className="bg-[#05060E] text-white p-5 rounded-xl border border-white/10">
                            <span className="text-[10px] font-mono text-[#00BFFF] font-black tracking-widest block uppercase mb-2">Visal Guideline</span>
                            <h4 className="text-sm font-bold mb-2">비주얼 아이덴티티</h4>
                            <ul className="text-xs text-gray-300 space-y-1.5 list-disc pl-4 font-sans">
                              <li>배경: 무대 감성을 극대화하고 저시력 및 잔존 시력 가독성을 한계까지 높이는 <span className="text-white font-bold">Midnight Dark Theme</span></li>
                              <li>포인트 컬러: 어두컴컴한 암흑 상황에서도 확실한 존재감을 뿜는 <span className="text-[#00BFFF] font-bold">네온 하늘색 (#00BFFF)</span></li>
                              <li>텍스트 밀도를 줄이고 직관적인 아이콘, 마커 중심 구조 지향</li>
                            </ul>
                          </div>

                          <div className="bg-white border border-gray-200 p-5 rounded-xl">
                            <span className="text-[10px] font-mono text-blue-600 font-black tracking-widest block uppercase mb-2">Accessibility Care</span>
                            <h4 className="text-sm font-bold text-gray-900 mb-2">적용 접근성 배려 원칙</h4>
                            <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4 font-sans break-keep">
                              <li>색맹·적록색약 관람자: 빨강과 초록을 동시 보완용 단독 마크로 제한, 오직 명도 차 및 형태소 추가로 구분</li>
                              <li>가변 거대 텍스트 조절계 지원: 렌더링 폰트를 실시간 스케일링하는 컨트롤 제공</li>
                              <li>TTS 낭독용 시맨틱 오더: 리더기가 선후 순차를 교차하지 않도록 태그 흐름 정리</li>
                              <li>고대비 모드 및 로컬 언어 가변</li>
                            </ul>
                          </div>

                          <div className="bg-white border border-gray-200 p-5 rounded-xl">
                            <span className="text-[10px] font-mono text-blue-600 font-black tracking-widest block uppercase mb-2">UX Principles</span>
                            <h4 className="text-sm font-bold text-gray-900 mb-2">유니버셜 플랫폼 설계 원칙</h4>
                            <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4 font-sans whitespace-normal break-keep">
                              <li>정밀 마우스가 어려운 수동 기민 약자를 위해 모든 버튼 영역 최소 <span className="font-bold text-gray-900">44px</span> 이상의 비대칭 터치 사각 타겟 확보</li>
                              <li>복잡한 가입 생략을 위한 온보딩 장벽 체크 프로필 초기 셋업 단계 탑재</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* --- SECTION 4: 시스템 개발 및 구현 --- */}
                  {activeTab === 3 && (
                    <div className="space-y-8">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          <span className="text-xs font-bold text-blue-600 font-mono uppercase tracking-wider">04. ENGINEERING & TECH</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-display">4. 시스템 개발 및 구현</h2>
                        <span className="block w-12 h-1 bg-blue-600 mt-3 rounded-full"></span>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <Code size={18} className="text-blue-600" /> 4.1. 개발 툴 및 기술 스택
                        </h3>
                        <div className="grid sm:grid-cols-5 gap-3">
                          {[
                            { title: "AI 개발 도구", desc: "Google AI Studio", role: "AI 어시스턴트 코드 수립 및 기능 설계 보조" },
                            { title: "프론트엔드", desc: "HTML / CSS / JS", role: "모바일 최적화 웹앱 반응형 UI 세이빙" },
                            { title: "버전 관리", desc: "GitHub", role: "안전 형상 제어 및 동기식 개발 충돌 저지" },
                            { title: "실배포 서버", desc: "Vercel", role: "클라우드 엣지 CDN 정적 라우팅 자동 검증 배포" },
                            { title: "지도/AR 연동", desc: "Seoul S-MAP", role: "서울시 공공 S-MAP API 및 3D 데이터 매핑" }
                          ].map((tool, i) => (
                            <div key={i} className="border border-gray-150 p-4 rounded-xl bg-[#FAFAFC] text-center">
                              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full block mx-auto w-max mb-2">{tool.title}</span>
                              <h4 className="text-xs font-black text-gray-950 mb-1">{tool.desc}</h4>
                              <p className="text-[10px] text-gray-500 font-sans leading-relaxed break-keep">{tool.role}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <Layers size={18} className="text-blue-600" /> 4.2. 데이터베이스 설계
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed font-sans mb-3">
                          접근성 맞춤 플랫폼 최적화 구색을 위한 관계형 구조 및 정규 데이터 구조도입니다.
                        </p>
                        
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {[
                            { name: "공연 데이터 (Performance Schema)", items: ["공연 ID (PK), 제목, 장르, 공연장 코드, 날짜", "포스터 URI, 좌석 배치 맵핑 노드 데이터", "접근성 플래그 (휠체어/자막/수어/음성)"] },
                            { name: "사용자 정보 (User Profiling)", items: ["유저 고유 ID (PK), 이름, 이메일, 인증 토큰", "장벽 프로필 (지체/초점/청각 범위 입력)", "사전 예약 및 찜 목록, 히스토리 리스트"] },
                          ].map((schema, sIdx) => (
                            <div key={sIdx} className="bg-white border border-gray-250 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                              <h4 className="text-xs font-black text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> {schema.name}
                              </h4>
                              <ul className="text-xs text-gray-700 font-mono space-y-1.5">
                                {schema.items.map((item, iIdx) => (
                                  <li key={iIdx} className="bg-gray-50 p-2 rounded-lg border border-gray-100 break-keep leading-relaxed block pl-6 relative">
                                    <span className="absolute left-2 text-blue-500 font-bold">&bull;</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <Rocket size={18} className="text-blue-600" /> 4.3. 핵심 기능 구현 과정
                        </h3>
                        <div className="border-l-2 border-blue-200 pl-4 ml-2 space-y-6 text-xs">
                          <div className="relative">
                            <span className="absolute -left-[25px] top-0.5 bg-blue-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold">1</span>
                            <h4 className="font-bold text-sm text-gray-950 mb-1">공공 데이터 연동 수립</h4>
                            <p className="text-gray-600 leading-relaxed font-sans break-keep">
                              서울시에서 승인한 고밀도 S-MAP 도심 포탈과 또타지하철 역사 실시간 승강기 오작동 여부 가용 오픈 API를 전면 수신 매핑 처리하고, 티켓 오픈 대응을 위해 인터파크·YES24 연결망을 안정적으로 가이드 아웃링크 처리했습니다.
                            </p>
                          </div>

                          <div className="relative">
                            <span className="absolute -left-[25px] top-0.5 bg-blue-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold">2</span>
                            <h4 className="font-bold text-sm text-gray-950 mb-1">웹 접근성 최우선 마크업 작업</h4>
                            <p className="text-gray-600 leading-relaxed font-sans break-keep">
                              리더기 충돌 방지를 위해 `aria-label`을 전면 도입하고 화면 낭독용 간편 합성 보조 및 다크 하이콘트라스트 토글링 연동 프로세싱을 선구적으로 작성했습니다. 색에 관계없이 요소 구분을 확실하게 처리하기 위해 텍스트 수반을 상시 병합했습니다.
                            </p>
                          </div>

                          <div className="relative">
                            <span className="absolute -left-[25px] top-0.5 bg-blue-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold">3</span>
                            <h4 className="font-bold text-sm text-gray-950 mb-1">인공지능 어시스트 최적 랭킹 알고리즘</h4>
                            <p className="text-gray-600 leading-relaxed font-sans break-keep">
                              고객이 사전에 온보딩 단계에서 설정한 접근성 등급 목록 가치와 선호 장르(뮤지컬, 연극, 콘서트 등)의 교집합 비중을 고르게 분배하여 홈화면 피드를 장식하며 최적 매각을 유도합니다.
                            </p>
                          </div>

                          <div className="relative">
                            <span className="absolute -left-[25px] top-0.5 bg-blue-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold">4</span>
                            <h4 className="font-bold text-sm text-gray-950 mb-1">카메라 AR 지상선 뷰어 및 VR 360 공간</h4>
                            <p className="text-gray-600 leading-relaxed font-sans break-keep">
                              기기의 후방 자이로/카메라 권한을 얻어 가독 지상 화살표 동행 선을 현실에 겹치고 소극장들의 인프라 단층을 VR 뷰 컴포넌트로 포장하여 방문 전에 실제 분위기를 감각적으로 체험하도록 구현을 완성했습니다.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* --- 4.4. 360도 뷰어 제작 과정 --- */}
                      <div className="space-y-6 pt-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <Globe size={18} className="text-blue-600" /> 4.4. 360도 뷰어 제작 과정
                        </h3>

                        {/* ChatGPT Recommendation Box */}
                        <div className="bg-slate-50 border border-gray-200 rounded-2xl p-5 space-y-4">
                          <p className="text-sm text-gray-750 leading-relaxed break-keep font-sans">
                            VR과 비슷한 화면을 이전에 만들어본 경험이 없어 <strong>ChatGPT</strong>에게 예시 사진을 넣어 VR을 제작하는 방법에 대해 물어봤더니 가장 추천하는 한 가지 방식을 알려주었다. GPT가 추천한 방식은 다음과 같다.
                          </p>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-white border border-gray-150 p-4 rounded-xl shadow-sm space-y-2">
                              <span className="inline-block bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">STEP 1. 파노라마 촬영</span>
                              <h4 className="text-xs font-black text-gray-950">P360 앱 &amp; 비율 변환</h4>
                              <p className="text-[11px] text-gray-500 font-sans leading-relaxed break-keep">
                                P360이라는 앱을 통해 360도 모습을 담은 파노라마를 찍은 후, 가로:세로 사진 비율을 2:1로 변환합니다.
                              </p>
                            </div>
                            <div className="bg-white border border-gray-150 p-4 rounded-xl shadow-sm space-y-2">
                              <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">STEP 2. 핫스팟/링크 삽입</span>
                              <h4 className="text-xs font-black text-gray-950">Marzipano 사이트 편집</h4>
                              <p className="text-[11px] text-gray-500 font-sans leading-relaxed break-keep">
                                Marzipano 사이트에 변환한 사진을 업로드 후, 직접 Info hotspot / link hotspot 버튼을 사진 위에 첨부 후 마우스로 위치시켜 넣고 싶은 정보를 넣거나 사진 간 화면을 연결합니다.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Production Narrative Card */}
                        <div className="bg-white border border-gray-150 rounded-2xl p-5 space-y-3 shadow-sm">
                          <span className="text-[9px] bg-slate-100 text-slate-705 px-2 py-0.5 rounded-full font-bold inline-block font-mono">BEHIND STORY &amp; SHOOTING</span>
                          <h4 className="font-extrabold text-sm text-gray-950">촬영 스토리 및 진행 과정</h4>
                          <p className="text-xs text-gray-650 leading-relaxed font-sans break-keep">
                            방식이 어렵지 않다고 판단해 다음날 수업이 끝난 후부터 본격적으로 제작을 시작했다. 빈 강의실을 찾아 이곳저곳 다니던 중 <strong>10관 3층의 10318 강의실</strong>이 비어있어 촬영을 시작하게 되었다. 촬영은 GPT가 얘기한 방식을 따라 사용자들에게 보여주고 싶은 경로별로 조금씩 이동하며 촬영하였다.
                          </p>
                        </div>

                        {/* Panoramic Shot Image Placements */}
                        <div className="space-y-6">
                          <h4 className="text-xs font-black text-slate-800 tracking-wider uppercase font-mono mb-2 flex items-center gap-1.5">
                            📸 파노라마 촬영 및 2:1 변환 결과물
                          </h4>
                          <div className="space-y-6">
                            {/* Row 1: Image 1 */}
                            <div className="space-y-2 bg-slate-50 border border-gray-150 p-4 rounded-2xl">
                              <PromoImageWithPlaceholder 
                                src={image1} 
                                label="이미지 1" 
                                alt="P360 파노라마 촬영 원본" 
                                description="P360 앱으로 촬영한 파노라마"
                                hideCardDetails={true}
                              />
                              <p className="text-[11.5px] text-center text-gray-650 font-bold font-sans pt-1">▲ P360 앱으로 촬영한 파노라마</p>
                            </div>

                            {/* Row 2: Images 2-6 (2:1 변환 파노라마들) */}
                            <div className="space-y-4 bg-slate-50 border border-gray-150 p-4 rounded-2xl">
                              <div className="space-y-4">
                                <PromoImageWithPlaceholder src={image2} label="이미지 2" alt="2:1 P360 파노라마 변환 1" hideCardDetails={true} />
                                <PromoImageWithPlaceholder src={image3} label="이미지 3" alt="2:1 P360 파노라마 변환 2" hideCardDetails={true} />
                                <PromoImageWithPlaceholder src={image4} label="이미지 4" alt="2:1 P360 파노라마 변환 3" hideCardDetails={true} />
                                <PromoImageWithPlaceholder src={image5} label="이미지 5" alt="2:1 P360 파노라마 변환 4" hideCardDetails={true} />
                                <PromoImageWithPlaceholder src={image6} label="이미지 6" alt="2:1 P360 파노라마 변환 5" hideCardDetails={true} />
                              </div>
                              <p className="text-[11.5px] text-center text-gray-650 font-bold font-sans pt-1">▲ P360 앱의 3일 무료 혜택을 이용해 2:1 비율로 변환시킨 파노라마 사진</p>
                            </div>
                          </div>
                        </div>

                        {/* Marzipano Editing Challenge Card */}
                        <div className="space-y-4">
                          <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-gray-150 p-5 rounded-2xl flex flex-col justify-center space-y-3">
                            <span className="text-[9px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold w-max font-mono">EDITING SYSTEM WARNING</span>
                            <h4 className="font-extrabold text-sm text-gray-950">Marzipano 편집 및 데이터 보존 챌린지</h4>
                            <p className="text-xs text-gray-655 leading-relaxed font-sans break-keep">
                              Marzipano 사이트는 사이트 자체에 편집 내용이 저장되는 백엔드 데이터베이스 세션 기능이 없어, 무조건 중단 없이 한 번에 완성하고 파일 다운로드를 하는 방법만을 사용해야 했다. 혹여나 브라우저 탭이 닫히거나 데이터가 증발할 위험이 있어 <strong>노트북을 3일 정도 전원을 끄지 못하고 사용하지 않을 때는 절전 모드 상태로 유지하며</strong> 극적으로 완성에 성공했습니다.
                            </p>
                          </div>
                          
                          {/* Row 3 - Image 7 */}
                          <div className="bg-slate-50 border border-gray-150 p-4 rounded-2xl">
                            <PromoImageWithPlaceholder 
                              src={image7} 
                              label="이미지 7" 
                              alt="Marzipano Info Hotspot Edit Screen" 
                              description="Marzipano에서 Info hotspot 버튼을 첨부한 화면"
                              hideCardDetails={true}
                            />
                            <p className="text-[11.5px] text-center text-gray-650 font-bold font-sans pt-1">▲ Marzipano에서 Info hotspot 버튼을 첨부한 화면</p>
                          </div>
                        </div>

                        {/* GitHub Deploy Experience Card with Desktop App */}
                        <div className="space-y-4 pt-4">
                          <div className="bg-white border border-gray-250 p-5 rounded-2xl flex flex-col justify-center space-y-3 shadow-sm">
                            <span className="text-[9px] bg-blue-50 text-blue-650 px-2 py-0.5 rounded-full font-bold w-max font-mono">VERSION CONTROL RESOLUTION</span>
                            <h4 className="font-extrabold text-sm text-gray-950">대용량 파일 깃허브 업로드 해법 수립</h4>
                            <p className="text-xs text-gray-650 leading-relaxed font-sans break-keep">
                              Marzipano 사이트 빌드 완성 후 압축 파일을 받아 깃허브 웹 인터페이스에 올리려니 예상치 못한 한계에 마주쳤습니다. 압축을 해제한 상태로 바로 폴더를 업로드할 수 없고, 수동 선택 업로드 시 100개 제한이 걸려 600개가 넘는 세부 에셋 파일을 전송할 수 없었습니다. <br />
                              이를 해결하기 위해 ChatGPT에게 방법을 문의한 결과, <strong>GitHub Desktop (깃허브 데스크톱) 앱</strong>을 로컬에 받아 연동하라는 안내를 받았습니다. GPT가 상세히 조언해준 방법을 따라 손쉽게 리포지토리를 복제하고 단 한 번의 푸시로 <strong>총 645개의 정적 가상현실 에셋 파일</strong>을 누락 없이 무사히 깃허브에 배포할 수 있었습니다.
                            </p>
                          </div>

                          {/* Row 4 - Image 8 */}
                          <div className="bg-slate-50 border border-gray-150 p-4 rounded-2xl">
                            <PromoImageWithPlaceholder 
                              src={image8} 
                              label="이미지 8" 
                              alt="GitHub Desktop File Upload Screen" 
                              description="깃허브 데스크톱을 이용하여 파일을 업로드하는 화면"
                              hideCardDetails={true}
                            />
                            <p className="text-[11.5px] text-center text-gray-650 font-bold font-sans pt-1">▲ 깃허브 데스크톱을 이용하여 파일을 업로드하는 화면</p>
                          </div>
                        </div>

                        {/* ChatGPT Log Links List */}
                        <div className="bg-[#10A37F]/5 border border-[#10A37F]/20 rounded-2xl p-5 space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-[#10A37F] flex items-center justify-center text-white">
                              <MessageSquare size={14} />
                            </div>
                            <h4 className="text-xs font-bold text-[#10A37F] font-mono tracking-widest uppercase">ChatGPT INTERACTION DIALOG LOGS</h4>
                          </div>
                          <p className="text-xs text-gray-650 leading-relaxed break-keep font-sans">
                            360도 공간 뷰어 개발 전 정보 수집 단계와 업로드 과정에서 겪었던 시행착오를 신속하게 대응하며 ChatGPT와 해결책을 수립했던 실제 대화 전문 로그입니다.
                          </p>
                          <div className="grid sm:grid-cols-2 gap-3 pt-1">
                            <a 
                              href="https://chatgpt.com/share/6a0f217e-92a8-83a3-9265-f437c753aad1" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-3.5 rounded-xl border border-[#10A37F]/10 hover:border-[#10A37F]/60 bg-white hover:bg-[#10A37F]/10 transition-colors group"
                            >
                              <div className="space-y-0.5 text-left">
                                <span className="text-[9px] text-[#10A37F] font-bold font-mono uppercase tracking-wider block">PHASE 1. 제작 착수 전</span>
                                <span className="text-xs font-black text-slate-800 group-hover:text-[#10A37F]">360도 가상공간 뷰어 제작 예시 대화</span>
                              </div>
                              <ChevronRight size={14} className="text-gray-400 group-hover:text-[#10A37F] transition-colors" />
                            </a>
                            <a 
                              href="https://chatgpt.com/c/6a0892d6-6f44-83a9-8cff-f3c0061be955" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-3.5 rounded-xl border border-[#10A37F]/10 hover:border-[#10A37F]/60 bg-white hover:bg-[#10A37F]/10 transition-colors group"
                            >
                              <div className="space-y-0.5 text-left">
                                <span className="text-[9px] text-[#10A37F] font-bold font-mono uppercase tracking-wider block">PHASE 2. 제작 진행 중</span>
                                <span className="text-xs font-black text-slate-800 group-hover:text-[#10A37F]">645개 다수 파일 업로드 오류 해결 대화</span>
                              </div>
                              <ChevronRight size={14} className="text-gray-400 group-hover:text-[#10A37F] transition-colors" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* --- SECTION 5: 테스트 및 배포 --- */}
                  {activeTab === 4 && (
                    <div className="space-y-8">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          <span className="text-xs font-bold text-blue-600 font-mono uppercase tracking-wider">05. QUALITY ASSURANCE</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-display">5. 테스트 및 배포</h2>
                        <span className="block w-12 h-1 bg-blue-600 mt-3 rounded-full"></span>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <CheckCircle2 size={18} className="text-blue-600" /> 5.1. 웹 접근성 평가 및 테스트
                        </h3>
                        <p className="text-sm text-gray-600 font-sans leading-relaxed break-keep">
                          <strong>테스트 환경:</strong> 실사용자인 모바일 환경(iOS Safari, Android Chrome)을 중심으로 가로림 없는 뷰포트 정렬을 완료했으며, 스크린 터치 딜레이 및 인프라 매칭 동작을 고르게 검사 완료했습니다.
                        </p>
                        
                        <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                                <th className="p-3">테스트 항목</th>
                                <th className="p-3">검사 및 시뮬레이션 방법</th>
                                <th className="p-3 text-center">결과 및 상태</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-150 bg-white">
                              {[
                                { title: "텍스트 가독성", test: "다크 테마 배경에 네온 계열 폰트 매치 후 WCAG 대비 매트릭스 측정", res: "충족 (대비율 4.5:1 표준 초과 달성)" },
                                { title: "터치 영역 검도", test: "모바일 기준 각 주요 동작 버튼 크기 및 좌우 패딩을 44px 이상 수동 자율 전수 체크", res: "충족 (중복 탭 해제 및 타겟 반경 안정성 확보)" },
                                { title: "TTS 호환 시맨틱", test: "iOS VoiceOver 및 안드로이드 스크린리더를 켜고 시범 조작 음성 낭독 흐름 수반 정렬", res: "충족 (페이지 리다이렉트 및 상태 바 변경 시 누락없이 피드백 보장)" },
                                { title: "접근성 필터", test: "휠체어, 실시간 수어, 현장 자막 등 4종 결합 교차 필터링 동작 시 올바른 공연장과 공연만 잔존하는지 체크", res: "충족 (데이터셋 교차 조건 로직 정확도 100%)" },
                                { title: "AR 길안내 전각", test: "카메라 센서 자이로 감도를 결합한 화살선 흐름이 가파른 계단을 쳐내고 무단차로만 돌 가상 궤도를 투하하는가 점검", res: "충족 (안정적인 카메라 렌즈 상용 투영 완료)" }
                              ].map((qa, i) => (
                                <tr key={i} className="hover:bg-gray-50/50">
                                  <td className="p-3 font-bold text-gray-900">{qa.title}</td>
                                  <td className="p-3 text-gray-600 font-sans leading-normal break-keep">{qa.test}</td>
                                  <td className="p-3 text-center">
                                    <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-200">
                                      {qa.res}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <Globe size={18} className="text-blue-600" /> 5.2. 배포 환경 사양
                        </h3>
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 font-mono text-xs text-gray-700 space-y-3">
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-bold text-gray-500">코드 저장소 원클릭</span>
                            <span className="text-gray-900 font-bold">GitHub Repository (Private Branch Sync)</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-bold text-gray-500">호스팅 및 배포 최적 클라우드</span>
                            <span className="text-gray-900 font-bold">Vercel 엣지 엔진 (Web Serverless Static Hosting)</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-bold text-gray-500">지속적인 자동 통합 (CI/CD)</span>
                            <span className="text-gray-900 font-bold">Push trigger ──&gt; Auto Build ──&gt; Instant Global Deployment (0 downtime)</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-bold text-gray-500">실서비스 가동 배포 URL (App ID)</span>
                            <a href="https://eta-403-bypass.vercel.app/" target="_blank" rel="noreferrer" className="text-blue-600 font-black underline hover:text-blue-800">https://eta-403-bypass.vercel.app/</a>
                          </div>
                          <div className="flex justify-between pb-1">
                            <span className="font-bold text-gray-500">프로젝트 홍보 및 가이드 웹페이지</span>
                            <a href="https://403-bypass-1aug.vercel.app/" target="_blank" rel="noreferrer" className="text-blue-600 font-black underline hover:text-blue-800">https://403-bypass-1aug.vercel.app/</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* --- SECTION 6: 핵심 기능 상세 소개 --- */}
                  {activeTab === 5 && (
                    <div className="space-y-8">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          <span className="text-xs font-bold text-blue-600 font-mono uppercase tracking-wider">06. CORE FEATURES DETAILED</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-display">6. 핵심 기능 상세 소개</h2>
                        <span className="block w-12 h-1 bg-blue-600 mt-3 rounded-full"></span>
                      </div>

                      {/* Sub-tabs inside Section 6 */}
                      <div className="flex border-b border-gray-200 overflow-x-auto gap-2 pb-1 scrollbar-none font-bold text-sm">
                        {[
                          { id: '6-1', label: '6-1. 이동 (안내·길안내)' },
                          { id: '6-2', label: '6-2. 현장 (혼잡도·360VR)' },
                          { id: '6-3', label: '6-3. 지원 (현장매칭·자막안경·소셜)' },
                          { id: '6-4', label: '6-4. 개인화 (접근센터·마이)' }
                        ].map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => setActiveStep6(sub.id)}
                            className={`px-4 py-2.5 rounded-t-xl transition-all whitespace-nowrap ${
                              activeStep6 === sub.id
                                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>

                      {/* 6-1. 이동 */}
                      {activeStep6 === '6-1' && (
                        <div className="space-y-6">
                          <div className="bg-white border-2 border-blue-400 p-5 rounded-2xl relative overflow-hidden">
                            <span className="absolute top-4 right-4 bg-blue-100 text-blue-800 text-[10px] font-black px-2.5 py-0.5 rounded font-mono uppercase">Feature 01</span>
                            <h4 className="text-base font-black text-blue-900 mb-2 flex items-center gap-1.5">
                              <MapPin size={18} /> ① 3D 공연장 안내지도
                            </h4>
                            <p className="text-xs text-gray-700 leading-relaxed font-sans break-keep mb-3">
                              <strong>물리적 진입 장벽의 총체적 극복:</strong> 오직 엘리베이터 유무에 매달리던 휠체어 관객들을 위해 계단 수, 보도의 턱 높이, 노상 주차장에서 문 앞까지의 휠체어 전용 경사로 각도, 수동 리프트의 운용 스피드와 대기 스폿까지 3D 다차원 실내 레이아웃에 직접 매핑 투사합니다.
                            </p>
                            <div className="bg-[#FAFBFD] p-3 rounded-lg border border-gray-100 text-[11px] text-gray-500 font-mono space-y-1">
                              <div>&bull; <strong>기술 연계:</strong> 서울시 S-MAP 3D 공간정보 아키텍처 API 수신</div>
                              <div>&bull; <strong>적용 지점:</strong> 충무아트센터 전 층 실측 좌표 매핑</div>
                            </div>
                          </div>

                          <div className="bg-white border border-gray-200 p-5 rounded-2xl relative overflow-hidden shadow-sm">
                            <span className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded font-mono uppercase">Feature 02</span>
                            <h4 className="text-base font-black text-emerald-950 mb-2 flex items-center gap-1.5">
                              <Navigation size={18} /> ② AI AR 길안내
                            </h4>
                            <p className="text-xs text-gray-750 leading-relaxed font-sans break-keep mb-3">
                              <strong>실시간 카메라 기반 길 찾기:</strong> 복잡하고 낯선 공연장 내부에서 스마트폰 카메라를 비추면 실시간 블루/라인 가이드가 단차 없는 우회로를 입체적으로 그려줍니다. 동선 상의 계단이나 오르막, 내리막 각도를 센서로 판단하여 최적 경로를 알려줍니다.
                            </p>
                            <div className="bg-[#FAFBFD] p-3 rounded-lg border border-gray-100 text-[11px] text-gray-500 font-mono space-y-1">
                              <div>&bull; <strong>기술 연계:</strong> 디바이스 지향 자이로 마운팅 & 카메라 렌더링</div>
                              <div>&bull; <strong>적용 지점:</strong> 지하철 출구부터 대극장 객석 복도까지 전체</div>
                            </div>
                          </div>

                          <div className="bg-white border border-gray-200 p-5 rounded-2xl relative overflow-hidden shadow-sm">
                            <span className="absolute top-4 right-4 bg-blue-100 text-blue-900 text-[10px] font-black px-2.5 py-0.5 rounded font-mono uppercase">Feature 03</span>
                            <h4 className="text-base font-black text-blue-955 mb-2 flex items-center gap-1.5">
                              <TrainFront size={18} /> ③ 교통 연동 (또타지하철)
                            </h4>
                            <p className="text-xs text-gray-750 leading-relaxed font-sans break-keep mb-3">
                              <strong>지하철 승강기 고장 즉각 전파:</strong> 관객이 방문 예정인 환승역 혹은 목적지역 지하철 엘리베이터 고장 돌발 상황을 서울교통공사 데이터와 직접 페어링해 사전에 노선 조정을 실시간으로 제안하여 돌발 고립 사고를 원천 방지합니다.
                            </p>
                            <div className="bg-[#FAFBFD] p-3 rounded-lg border border-gray-100 text-[11px] text-gray-500 font-mono space-y-1">
                              <div>&bull; <strong>기술 연계:</strong> 서울시 대중교통 오픈 API 실시간 수신</div>
                              <div>&bull; <strong>적용 지점:</strong> 신당역(2호선, 6호선) 실시간 가동 현황</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 6-2. 현장 */}
                      {activeStep6 === '6-2' && (
                        <div className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white border border-gray-200 p-5 rounded-2xl relative overflow-hidden shadow-sm">
                              <span className="absolute top-4 right-4 bg-rose-100 text-rose-800 text-[10px] font-black px-2.5 py-0.5 rounded font-mono uppercase">Feature 04</span>
                              <h4 className="text-base font-black text-rose-955 mb-2 flex items-center gap-1.5">
                                <Activity size={18} /> ④ 실시간 층별/공간 혼잡도
                              </h4>
                              <p className="text-xs text-gray-750 leading-relaxed font-sans break-keep mb-3">
                                <strong>장애인 전용 공간 밀집도 알림:</strong> 대기 시간이 아주 길어질 경우 휠체어 탑승 관객에게 큰 체력 부담과 난관을 주는 장애인 화장실 및 휠체어 대여 보관소 부근의 이용 관객 수, 예상 대기 줄 정량 정보를 실시간 수치 데이터로 표시해 현명한 타이밍 분산을 도와줍니다.
                              </p>
                              <div className="bg-[#FAFBFD] p-3 rounded-lg border border-gray-100 text-[11px] text-gray-500 font-mono space-y-1">
                                <div>&bull; <strong>연동 인프라:</strong> IoT 센서 모니터링 및 웨이팅 스톱워치</div>
                                <div>&bull; <strong>적용 지점:</strong> 로비 남녀 장애인 특화 간이 시설 포인트</div>
                              </div>
                            </div>

                            <div className="bg-white border border-gray-200 p-5 rounded-2xl relative overflow-hidden shadow-sm">
                              <span className="absolute top-4 right-4 bg-purple-100 text-purple-800 text-[10px] font-black px-2.5 py-0.5 rounded font-mono uppercase">Feature 05</span>
                              <h4 className="text-base font-black text-purple-950 mb-2 flex items-center gap-1.5">
                                <Eye size={18} /> ⑤ 좌석별 3D VR 입체 시야
                              </h4>
                              <p className="text-xs text-gray-750 leading-relaxed font-sans break-keep mb-3">
                                <strong>현장 착석 전 360VR 미리보기:</strong> 예매 단계 또는 구매 직후 관객이 선택한 좌석 번호에 서서 실제 무대가 눈에 어떻게 보이는지를 미리 회전형 360VR 뷰로 투영합니다. 안전 손잡이의 차단 깊이나 극장 기둥으로 인한 무대 차단율을 직접 예측할 수 있습니다.
                              </p>
                              <div className="bg-[#FAFBFD] p-3 rounded-lg border border-gray-100 text-[11px] text-gray-500 font-mono space-y-1">
                                <div>&bull; <strong>기술 연계:</strong> 3D WebGL 시각화 엔진 내재화 파이프라인</div>
                                <div>&bull; <strong>적용 지점:</strong> 충무아트센터 대극장 / 소극장 전 좌석 매칭</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 6-3. 지원 */}
                      {activeStep6 === '6-3' && (
                        <div className="space-y-6">
                          <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white border border-gray-200 p-5 rounded-2xl relative overflow-hidden shadow-sm">
                              <span className="absolute top-4 right-4 bg-amber-100 text-amber-800 text-[10px] font-black px-2.5 py-0.5 rounded font-mono uppercase">Feature 06</span>
                              <h4 className="text-base font-black text-amber-950 mb-2 flex items-center gap-1.5">
                                <Users size={18} /> ⑥ 배리어프리 프렌즈 (매칭)
                              </h4>
                              <p className="text-xs text-gray-755 leading-relaxed font-sans break-keep mb-3">
                                <strong>인적 오프라인 지원 헬퍼 요청:</strong> 지하철 역 출구 또는 승강장 앞 전선에서 휠체어 단차 극복과 승하차 보조, 건물 입석까지 실시간으로 도움을 줄 수 있는 현장 대학생/시민 배리어프리 어시스턴스를 일대일로 안전히 연결 예약하는 통합 인적 돌봄 매칭 허브입니다.
                              </p>
                            </div>

                            <div className="bg-white border border-gray-200 p-5 rounded-2xl relative overflow-hidden shadow-sm">
                              <span className="absolute top-4 right-4 bg-sky-100 text-sky-800 text-[10px] font-black px-2.5 py-0.5 rounded font-mono uppercase">Feature 07</span>
                              <h4 className="text-base font-black text-sky-950 mb-2 flex items-center gap-1.5">
                                <Smartphone size={18} /> ⑦ 스마트 자막 안경 (연동)
                              </h4>
                              <p className="text-xs text-gray-755 leading-relaxed font-sans break-keep mb-3">
                                <strong>수어 자막 스마트 글래스 미러링:</strong> 시/청각 배리어에 직면한 예술 관향 애호가들이 대여소에서 제공받은 디지털 AR 안경 디바이스를 원클릭 페어링하여 스크립트 자막의 실시간 크기(폰트 스케일), 배경 시인 조도, 언어 동기화를 직접 자가 제어 조절하도록 구성되었습니다.
                              </p>
                            </div>

                            <div className="bg-white border border-gray-200 p-5 rounded-2xl relative overflow-hidden shadow-sm">
                              <span className="absolute top-4 right-4 bg-red-100 text-red-850 text-[10px] font-black px-2.5 py-0.5 rounded font-mono uppercase">Feature 08</span>
                              <h4 className="text-base font-black text-red-950 mb-2 flex items-center gap-1.5">
                                <Heart size={18} /> ⑧ 관극 메이트 동행 소셜
                              </h4>
                              <p className="text-xs text-gray-755 leading-relaxed font-sans break-keep mb-3">
                                <strong>동행 구하기 및 무장애 동선 공유:</strong> 무장애 정보가 없으면 출발하는 것조차 두려운 이동 약자들과 일반 자원 동행 관객들이 공연 별로 따뜻하게 짝을 지어 함께 티켓 수령, 입장, 관람 히스토리를 훈훈한 우정으로 개진해 갈 수 있는 따뜻한 403 서셜 보드망입니다.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 6-4. 개인화 */}
                      {activeStep6 === '6-4' && (
                        <div className="space-y-6">
                          <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white border border-gray-200 p-5 rounded-2xl relative overflow-hidden shadow-sm">
                              <span className="absolute top-4 right-4 bg-teal-100 text-teal-800 text-[10px] font-black px-2.5 py-0.5 rounded font-mono uppercase">Feature 09</span>
                              <h4 className="text-base font-black text-teal-950 mb-2 flex items-center gap-1.5">
                                <Activity size={18} /> ⑨ 장애 필터 맞춤 큐레이션
                              </h4>
                              <p className="text-xs text-gray-755 leading-relaxed font-sans break-keep mb-3">
                                <strong>진입 전 알맞은 최적 공연 분류:</strong> 휠체어 단차 100% 해소점, 청각 스크립트 수어 가용 연동 극장, 시각 가변 오디오 코멘터리 상영 일시 등, 이용자가 등록한 장애 프로필 조건에 부합하는 공연들만을 AI 랭킹 기술로 사려 깊게 먼저 선발해 상단 연출합니다.
                              </p>
                            </div>

                            <div className="bg-white border border-gray-200 p-5 rounded-2xl relative overflow-hidden shadow-sm">
                              <span className="absolute top-4 right-4 bg-indigo-100 text-indigo-800 text-[10px] font-black px-2.5 py-0.5 rounded font-mono uppercase">Feature 10</span>
                              <h4 className="text-base font-black text-indigo-950 mb-2 flex items-center gap-1.5">
                                <Accessibility size={18} /> ⑩ 디지털 배리어프리 대응 센터
                              </h4>
                              <p className="text-xs text-gray-755 leading-relaxed font-sans break-keep mb-3">
                                <strong>원터치 현장 민원 소통 허브:</strong> 대여 장비 에러, 휠체어 리프트 대형 대기줄 발생 등 돌발 장애 허들을 겪는 즉시, 현재 모바일의 정밀 3D 구조물 위치 정보와 응급 호출 요청을 충무아트센터 내부 관리 데스크에 바로 다이렉트 전조 전송해 현행 지원을 이끌어 냅니다.
                              </p>
                            </div>

                            <div className="bg-white border border-gray-200 p-5 rounded-2xl relative overflow-hidden shadow-sm">
                              <span className="absolute top-4 right-4 bg-slate-100 text-slate-800 text-[10px] font-black px-2.5 py-0.5 rounded font-mono uppercase">Feature 11</span>
                              <h4 className="text-base font-black text-slate-950 mb-2 flex items-center gap-1.5">
                                <User size={18} /> ⑪ 개인화 유니버설 마이페이지
                              </h4>
                              <p className="text-xs text-gray-755 leading-relaxed font-sans break-keep mb-3">
                                <strong>안전 데이터 커스텀 정보 기여:</strong> 내가 직접 현장에 방문 설계해 보조한 단차 실측 건수, 가치 있는 좌석 시야 리뷰 등 따뜻한 크라우드 소싱 협력 공로 업적을 리워드 보석 뱃지 보관함으로 빛나게 모니터해 제공합니다.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 6 && (
                    <div className="space-y-12 text-gray-800">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          <span className="text-xs font-bold text-blue-600 font-mono uppercase tracking-wider">07. PROMOTION STRATEGY</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-display">7. 홍보 전략</h2>
                        <span className="block w-12 h-1 bg-blue-600 mt-3 rounded-full"></span>
                      </div>

                      {/* 7.1. 플랫폼 연동 홍보 & 팝업 광고 */}
                      <div className="space-y-6">
                        <div className="bg-slate-50 border border-gray-100 rounded-2xl p-6">
                          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-2">
                            <Activity size={18} className="text-blue-600" /> 7.1. 플랫폼 연동 홍보 및 인앱 팝업 광고
                          </h3>
                          <p className="text-sm text-gray-700 leading-relaxed font-sans break-keep mb-6">
                            공연 티켓 예매 직후 관람객이 가장 궁금해하는 정보는 공연장 정보이다. <br />
                            따라서 예매 플랫폼과의 제휴를 통해 자연스럽게 서비스를 노출한다.
                          </p>
                          <div className="grid md:grid-cols-3 gap-6">
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-gray-400 mb-2">플랫폼 연동 홍보</span>
                              <PromoImageWithPlaceholder 
                                src="/src/assets/promo_1.png" 
                                label="홍보 시안 ①" 
                                alt="플랫폼 연동 홍보" 
                                description="기존 예매 플랫폼 제휴 마케팅을 통해 결제 완료 구역 직후 노출되는 배리어프리 시안"
                                hideCardDetails={true}
                              />
                            </div>
                            <div className="md:col-span-2 flex flex-col">
                              <span className="text-xs font-bold text-gray-400 mb-2">팝업 광고</span>
                              <div className="grid sm:grid-cols-2 gap-4 h-full">
                                <PromoImageWithPlaceholder 
                                  src="/src/assets/promo_2.png" 
                                  label="광고 시안 ②" 
                                  alt="팝업 광고" 
                                  description="공연장 근경 무장애 내비 및 맞춤 인앱 팝업 광고 시안"
                                  hideCardDetails={true}
                                />
                                <PromoImageWithPlaceholder 
                                  src="/src/assets/promo_3.png" 
                                  label="광고 시안 ③" 
                                  alt="팝업 광고" 
                                  description="지원 장비 대여 및 케어 매칭 서비스 바로가기 팝업 광고 시안"
                                  hideCardDetails={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 7.2. 서포터즈 운영 */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <Users size={18} className="text-blue-600" /> 7.2. 서포터즈 운영
                        </h3>
                        <p className="text-sm text-gray-650 leading-relaxed font-sans break-keep">
                          단발적인 자원봉사에 그치지 않고, 지속적인 크라우드 소싱 기반의 정보 현행화 및 앱 대외 인지도를 전방위로 확산하기 위하여 <strong>403 서포터즈</strong>를 선발·운영합니다.
                        </p>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                          {/* 콘텐츠 제작형 */}
                          <div className="border border-gray-200 p-5 rounded-2xl bg-white shadow-sm flex flex-col justify-between hover:border-blue-400 transition-colors">
                            <div>
                              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center mb-3">
                                <Palette size={16} className="text-blue-600" />
                              </div>
                              <h4 className="text-sm font-black text-gray-950 mb-2">① 콘텐츠 제작형 서포터즈</h4>
                              <p className="text-xs text-gray-400 mb-3 font-mono leading-none">&bull; 온라인 기반 바이럴 기획</p>
                              <ul className="text-xs text-gray-600 space-y-2 font-sans pl-1">
                                <li className="flex items-start gap-1.5"><span className="text-blue-500 font-extrabold">•</span> SNS 게시물 및 블로그 생생한 방문 후기 작성</li>
                                <li className="flex items-start gap-1.5"><span className="text-blue-500 font-extrabold">•</span> 릴스·숏폼 기반 AR 안경 및 앱 사용 꿀팁 제작</li>
                                <li className="flex items-start gap-1.5"><span className="text-blue-500 font-extrabold">•</span> 배리어프리 연극제 행사 참여 후기 스토리 업로드</li>
                              </ul>
                            </div>
                          </div>

                          {/* 현장 참여형 */}
                          <div className="border border-gray-200 p-5 rounded-2xl bg-white shadow-sm flex flex-col justify-between hover:border-emerald-400 transition-colors">
                            <div>
                              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-3">
                                <Smartphone size={16} className="text-emerald-600" />
                              </div>
                              <h4 className="text-sm font-black text-gray-950 mb-2">② 현장 참여형 서포터즈</h4>
                              <p className="text-xs text-gray-400 mb-3 font-mono leading-none">&bull; 오프라인 실측 및 부스 전선</p>
                              <ul className="text-xs text-gray-600 space-y-2 font-sans pl-1">
                                <li className="flex items-start gap-1.5"><span className="text-emerald-500 font-extrabold">•</span> 현장 참여형 오프라인 공식 홍보 부스 진행</li>
                                <li className="flex items-start gap-1.5"><span className="text-emerald-500 font-extrabold">•</span> 미지정 소극장 직접 방문 및 단차·경사 실측 수집</li>
                                <li className="flex items-start gap-1.5"><span className="text-emerald-500 font-extrabold">•</span> 좌석별 물리적 시야 실제 사진 및 접근성 정보 등록</li>
                                <li className="flex items-start gap-1.5"><span className="text-emerald-500 font-extrabold">•</span> AR 안경 및 앱 피드백 제공과 인프라 점검 수행</li>
                              </ul>
                            </div>
                          </div>

                          <div className="flex flex-col justify-between">
                            <PromoImageWithPlaceholder 
                              src="/src/assets/promo_4.png" 
                              label="서포터즈 홍보 광고 ④" 
                              alt="서포터즈 홍보 광고 포스터" 
                              description="[서포터즈 홍보 광고] '모두의 시선을 맞추다, 무장애를 향해 달리다' 403 BYPASS 배리어프리 서포터즈 공식 모집 포스터 시안"
                              hideCardDetails={true}
                            />
                          </div>
                        </div>

                        <div className="bg-slate-50 border border-gray-200 p-5 rounded-2xl text-xs space-y-2 font-sans leading-relaxed flex flex-col justify-center">
                          <p className="font-extrabold text-gray-950 text-sm flex items-center gap-1.5">🎖️ 서포터즈 리워드 체계</p>
                          <p className="text-gray-650 text-xs sm:text-[13px] break-keep leading-relaxed pt-0.5">
                            참가 활성화를 위하여 충무아트센터 공연 기여 할인권 제공, 1365 자원봉사 공인 시간 인증, 앱 마이페이지 한정판 훈장 뱃지 부여 등 입체적이고 지속가능한 헬퍼 순환 체계를 구현해 기여를 촉진합니다.
                          </p>
                        </div>
                      </div>

                      {/* 7.3. 광고 영상 */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <Video size={18} className="text-blue-600" /> 7.3. 광고 영상
                        </h3>

                        <div className="w-full bg-[#0F172A] border border-slate-800 rounded-3xl overflow-hidden shadow-xl aspect-video relative">
                          <iframe
                            className="w-full h-full min-h-[300px] sm:min-h-[400px]"
                            src={`https://www.youtube.com/embed/${getYouTubeId(youtubeUrl)}`}
                            title="403 BYPASS 홍보/광고 영상"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>

                      {/* 7.4. 인플루언서 협업 */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <Users size={18} className="text-blue-600" /> 7.4. 인플루언서 협업
                        </h3>
                        <p className="text-sm text-gray-650 leading-relaxed font-sans break-keep">
                          휠체어 전용 배리어프리 전문 여행/문화 유튜버, 자막 지원 예술 애호가, 연극 매니아 인플루언서 등과의 긴밀한 실측 협동 챌린지 숏폼을 동시 배급하여 정보의 신뢰도를 폭발시킵니다.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <PromoImageWithPlaceholder 
                            src="/src/assets/promo_5.png" 
                            label="협업 시안 ⑤" 
                            alt="인플루언서 협업 콘텐츠 1" 
                            description="[인플루언서 협업] 지체 휠체어 크리에이터와 함께하는 403 BYPASS 실시간 무단차 안내 챌린지"
                            hideCardDetails={true}
                            href="https://www.instagram.com/bandgoodgirl/"
                            instagramId="bandgoodgirl"
                          />
                          <PromoImageWithPlaceholder 
                            src="/src/assets/promo_6.png" 
                            label="협업 시안 ⑥" 
                            alt="인플루언서 협업 콘텐츠 2" 
                            description="[인플루언서 협업] 청각약자 매니아가 현장 스마트 자막 안경 착용법에 감동하는 릴스 영상"
                            hideCardDetails={true}
                            href="https://www.instagram.com/muduckssi/"
                            instagramId="muduckssi"
                          />
                          <PromoImageWithPlaceholder 
                            src="/src/assets/promo_7.png" 
                            label="협업 시안 ⑦" 
                            alt="인플루언서 협업 콘텐츠 3" 
                            description="[인플루언서 협업] 배리어프리 예술 지원 기획단과의 충무아트센터 최적 이동 노선 기행 블로그"
                            hideCardDetails={true}
                            href="https://www.instagram.com/tooth_is_silver_06/"
                            instagramId="tooth_is_silver_06"
                          />
                        </div>
                      </div>

                      {/* 7.5. SNS 광고 */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <Megaphone size={18} className="text-blue-600" /> 7.5. SNS 광고
                        </h3>
                        <p className="text-sm text-gray-650 leading-relaxed font-sans break-keep">
                          관조적인 성향을 벗어나, 연극·뮤지컬 관람 횟수가 극도로 높아 티켓 검색어와 좌석 시야 확보에 가장 주도적으로 목소리를 높이는 <strong>트위터(X), 인스타그램의 헤비 관객 매니아 그룹 채널을 대상으로 마켓 최적화 SNS 광고</strong>를 정밀 인젝션합니다.
                        </p>

                        <div className="grid md:grid-cols-12 gap-5 items-stretch">
                          <div className="md:col-span-7 bg-white border border-gray-200 p-5 rounded-2xl flex flex-col justify-between shadow-sm">
                            <div className="space-y-3">
                              <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-mono font-bold block w-fit">SNS SEGMENT PROMOTION</span>
                              <h4 className="text-sm font-black text-gray-950">트위터(X) 및 인스타그램 매니아 검색어 정밀 표적 마케팅</h4>
                              <p className="text-xs text-gray-600 leading-relaxed font-sans break-keep">
                                티켓 양도, 첫공 캐스팅표, 시야 제한석, 극장 계단 단차 등 소매 약자 및 무대 정보 갈망 핵심 해시태그를 정밀 리스닝하여 솔루션 앱 무료 다운로드 링크를 타임라인 최상위에 연계 바이럴 광고합니다.
                              </p>
                            </div>
                            <div className="border-t border-gray-150 pt-3 flex flex-wrap gap-1.5 text-[10px] font-mono">
                              <span className="bg-slate-100 text-gray-600 px-2.5 py-0.5 rounded-full font-bold">#충무아트센터</span>
                              <span className="bg-slate-100 text-gray-600 px-2.5 py-0.5 rounded-full font-bold">#휠체어석시야</span>
                              <span className="bg-slate-100 text-gray-600 px-2.5 py-0.5 rounded-full font-bold">#뮤지컬매니아</span>
                              <span className="bg-blue-600/10 text-blue-600 px-2.5 py-0.5 rounded-full font-bold border border-blue-600/20">#403BYPASS_우회로</span>
                            </div>
                          </div>
                          <div className="md:col-span-5">
                            <PromoImageWithPlaceholder 
                              src="/src/assets/promo_8.png" 
                              label="SNS 광고 시안 ⑧" 
                              alt="트위터 타임라인 스폰서 배너 광고" 
                              description="[SNS 광고] '티켓팅은 매서웠는데, 극장 앞에 계단뿐이라면? 무장애 동선 안내 403 BYPASS' 트위터 타임라인 배너 시안"
                              hideCardDetails={true}
                            />
                          </div>
                        </div>
                      </div>



                    </div>
                  )}

                  {/* --- SECTION 8: 프로젝트 성과 및 회고 --- */}
                  {activeTab === 7 && (
                    <div className="space-y-8">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          <span className="text-xs font-bold text-blue-600 font-mono uppercase tracking-wider">08. OUTCOME & FUTURE</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-display">8. 프로젝트 성과 및 회고</h2>
                        <span className="block w-12 h-1 bg-blue-600 mt-3 rounded-full"></span>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <Award size={18} className="text-blue-600" /> 8.1. 최종 결과물 및 기대 효과
                        </h3>
                        
                        <div className="grid sm:grid-cols-3 gap-4">
                          <div className="bg-[#FAFBFD] border border-gray-200 p-5 rounded-xl">
                            <span className="text-[9px] font-mono text-blue-600 font-bold block mb-1">SHIPPED CODE</span>
                            <h4 className="text-sm font-bold text-gray-950 mb-2">최종 결과물 출시 완료</h4>
                            <p className="text-xs text-gray-600 leading-relaxed font-sans break-keep">
                              클라우드 완결형 정적 배포 파이프라인 수립과 더불어 홈, 안내맵, 매칭대여, 티켓시야, 마이페이지를 연결하는 통합 무장애 5개 영역 앱 빌드를 충실하게 이룩했습니다.
                            </p>
                          </div>

                          <div className="bg-[#FAFBFD] border border-gray-200 p-5 rounded-xl">
                            <span className="text-[9px] font-mono text-emerald-600 font-bold block mb-1">SOCIAL EXPECTATION</span>
                            <h4 className="text-sm font-bold text-emerald-950 mb-2">사회적 파급 효과</h4>
                            <p className="text-xs text-gray-600 leading-relaxed font-sans break-keep">
                              고령층, 잔존시력약자, 자폐 관람자 등 사각에 갇혔던 이동 약자들의 문화적 소외를 원천 해제하여 평등한 예술 관람 영위권을 극대화하는 든든한 등대가 됩니다.
                            </p>
                          </div>

                          <div className="bg-[#FAFBFD] border border-gray-200 p-5 rounded-xl">
                            <span className="text-[9px] font-mono text-purple-600 font-bold block mb-1">TECHNICAL IMPACT</span>
                            <h4 className="text-sm font-bold text-purple-950 mb-2">기술적 가치 선구</h4>
                            <p className="text-xs text-gray-600 leading-relaxed font-sans break-keep">
                              단차를 시뮬레이션하는 S-MAP 매핑과 블루투스 스마트 글래스 무선 자막 피팅 기술 등, 단순 소비 중심 기술을 배리어프리 복지 도구로 혁신 결합했습니다.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <ShieldAlert size={18} className="text-blue-600" /> 8.2. 한계점 및 향후 발전 방향
                        </h3>
                        
                        <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                                <th className="p-3">현재 한계점 (Limitations)</th>
                                <th className="p-3">해결 및 발전 타깃 (Roadmap & Milestones)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-150 bg-white">
                              {[
                                { limit: "현장 극서 소외층 실사용 테스트 누락", road: "지체 장애 및 청각 장애 단체와 필드 테스트 협업 설계 (Co-design) 추진" },
                                { limit: "GPS 음영 극실내의 자이로 AR 오차 한계", road: "실내 보정용 초지향 비콘 센서 및 공간 매핑 위치 정밀 알고리즘 고도화" },
                                { limit: "전 수량 공연장 실시간 혼잡도 측정 대역 협소", road: "관중 전수 참여형 점검록 기여 포인트 혜택 개방 유도" },
                                { limit: "프로토타입 세션 미완 (로그인 보강 및 다국어)", road: "영어, 일어, 중국어 다국어 마크업 매핑 및 소셜 팔로우 다이어그램 연결" }
                              ].map((issue, i) => (
                                <tr key={i} className="hover:bg-gray-50/50">
                                  <td className="p-3 font-semibold text-red-600 font-sans leading-normal break-keep">&bull; {issue.limit}</td>
                                  <td className="p-3 text-emerald-800 font-bold font-sans leading-normal bg-emerald-50/20 break-keep">{issue.road}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <Users size={18} className="text-blue-600" /> 8.3. 팀 / 개인 회고 및 배움
                        </h3>
                        
                        <div className="space-y-4">
                          <div className="bg-[#FAFBFD] p-5 rounded-xl border border-gray-150">
                            <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2 font-mono">기술적 성취 및 깨달음</h4>
                            <p className="text-xs text-gray-700 leading-relaxed font-sans break-keep">
                              Google AI Studio의 적극적인 페어 프로그래밍을 활용하여 한정된 스케줄 내에서도 정밀도가 우수한 웹 구성을 유지할 수 있었습니다. 특히 단순 텍스트 레이아웃을 뛰어넘어 가변 TTS, 실시간 안경 시야 제어판 등의 인터랙티브 솔루션 통합 과정에서 큰 지적 시야를 얻었습니다.
                            </p>
                          </div>

                          <div className="bg-[#FAFBFD] p-5 rounded-xl border border-gray-150">
                            <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2 font-mono">유니버셜 가치관으로의 도약</h4>
                            <p className="text-xs text-gray-700 leading-relaxed font-sans break-keep">
                              &ldquo;휠체어 진입 가능&rdquo;이나 &ldquo;장애인 우대&rdquo;라는 단순하고 가벼운 행정 단락 하나가 그들의 관점에서 실제 보폭 각도, 대기 혼잡 불안감, 계단 단차 몇 센티미터의 디테일을 얼마나 잔인하게 배제하고 있었는지 처절히 깨닫게 되었습니다. 기술은 모든 인간의 약함을 감싸 안을 때 가장 예술적으로 거듭난다는 진리를 마음에 새겼습니다.
                            </p>
                          </div>

                          <div className="bg-[#FAFBFD] p-5 rounded-xl border border-gray-150">
                            <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2 font-mono">팀 시너지 피드백</h4>
                            <p className="text-xs text-gray-700 leading-relaxed font-sans break-keep">
                              학회 피드백 과정과 예선 무대 발표 단계별 피칭에서 받은 냉철하고 구체적인 피드백을 소화하며, 가벼운 제안에 멈추지 않고 실물 Vercel 프로토타입 연결까지 실증해 내며 팀원 공동체 간에 깊은 배움과 진정한 성장의 희열을 나누었습니다.
                            </p>
                          </div>
                        </div>

                        {/* Team Signature Display */}
                        <div className="border-t border-gray-200 pt-6 flex flex-wrap justify-between items-center gap-4 text-xs">
                          <div className="flex items-center gap-1.5 text-gray-500 font-sans">
                            <Activity size={14} className="text-blue-500 animate-pulse" />
                            <span>403BYPASS 공동 발렌티어로 기여한 영광스러운 크루</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {NAMES.map((n) => (
                              <span key={n} className="bg-blue-50 text-blue-800 border border-blue-100 px-3 py-1 rounded-full font-bold font-sans">
                                {n}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Previous/Next and Table of Contents Navigator */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch gap-4 mt-12 pt-8 border-t border-gray-150 text-left">
                  {activeTab !== null && activeTab > 0 ? (
                    <button
                      onClick={() => {
                        const newIdx = activeTab - 1;
                        setActiveTabTab(newIdx);
                        if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); }
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex-1 text-left p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50/10 transition-all group flex flex-col justify-center h-full min-h-[70px]"
                    >
                      <span className="text-[10px] text-gray-400 font-bold block mb-1 font-mono tracking-widest uppercase">&larr; 이전을 보고싶다면 (PREV)</span>
                      <span className="text-xs font-black text-gray-900 group-hover:text-blue-600 font-sans line-clamp-1">{menuItems[activeTab - 1].label}</span>
                    </button>
                  ) : (
                    <div className="flex-1 p-4 rounded-xl border border-dashed border-gray-200 flex items-center justify-center text-xs text-gray-400 font-medium select-none min-h-[70px]">
                      처음 장단입니다
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setActiveTabTab(null);
                      if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); }
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-4 rounded-xl border border-gray-205 hover:border-blue-500 hover:bg-blue-50/10 text-gray-700 hover:text-blue-600 font-black text-xs flex flex-col items-center justify-center gap-1.5 transition-all uppercase font-mono tracking-wider min-h-[70px]"
                  >
                    <div className="flex gap-1 items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse delay-75"></span>
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse delay-150"></span>
                    </div>
                    목록으로 가기
                  </button>

                  {activeTab !== null && activeTab < menuItems.length - 1 ? (
                    <button
                      onClick={() => {
                        const newIdx = activeTab + 1;
                        setActiveTabTab(newIdx);
                        if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); }
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex-1 text-right p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50/10 transition-all group flex flex-col justify-center items-end h-full min-h-[70px]"
                    >
                      <span className="text-[10px] text-gray-400 font-bold block mb-1 font-mono tracking-widest uppercase">다음을 보고싶다면 (NEXT) &rarr;</span>
                      <span className="text-xs font-black text-gray-900 group-hover:text-blue-600 font-sans line-clamp-1">{menuItems[activeTab + 1].label}</span>
                    </button>
                  ) : (
                    <div className="flex-1 p-4 rounded-xl border border-dashed border-gray-200 flex items-center justify-center text-xs text-gray-400 font-medium select-none min-h-[70px]">
                      마지막 장단입니다
                    </div>
                  )}
                </div>

                {/* Alternative Quick Jump Outline Column list at bottom */}
                {activeTab !== null && (
                  <div className="mt-8 pt-6 border-t border-gray-100 text-left">
                    <h4 className="text-[10px] font-black text-gray-400 tracking-wider uppercase mb-3 flex items-center gap-1.5 font-mono">
                      <Layers size={13} className="text-blue-500" /> 다른 단원 바로가기 (DOCUMENT OUTLINE LIST)
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {menuItems.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setActiveTabTab(idx);
                            if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); }
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                            idx === activeTab
                              ? "border-blue-500 bg-blue-50/50 text-blue-800 font-extrabold"
                              : "border-gray-250 hover:border-blue-300 hover:bg-slate-50 text-gray-600"
                          }`}
                        >
                          <span className="text-[9px] text-gray-400 block font-mono font-bold">CH.0{idx + 1}</span>
                          <span className="truncate mt-0.5 font-medium">{item.label.split(". ")[1]}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Floating Round Document Outline Trigger -- 원형 동그란 동동이 버튼 */}
        <motion.div
          animate={{
            y: [0, -6, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="fixed bottom-8 right-8 z-50 group pointer-events-auto"
          onMouseEnter={() => setIsFabHovered(true)}
          onMouseLeave={() => setIsFabHovered(false)}
        >
          {/* Hover Drop-up Menu */}
          <AnimatePresence>
            {isFabHovered && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-16 right-0 w-80 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 shadow-[0_12px_40px_rgba(0,0,0,0.15)] overflow-hidden font-sans text-gray-900 pointer-events-auto flex flex-col text-left"
              >
                <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <BookOpen size={16} className="text-blue-400" />
                    <span className="text-xs font-black tracking-wider uppercase font-mono">DOCUMENT OUTLINE</span>
                  </div>
                  <button 
                    onClick={() => { setActiveTabTab(null); setIsFabHovered(false); }}
                    className="text-[10px] bg-white/10 hover:bg-white/20 text-blue-300 font-bold px-2 py-0.5 rounded transition-colors"
                  >
                    INDEX 보기
                  </button>
                </div>
                <div className="p-2 max-h-[360px] overflow-y-auto divide-y divide-gray-100 divide-dashed">
                  {menuItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveTabTab(idx);
                        setIsFabHovered(false);
                        if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); }
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        idx === activeTab
                          ? "bg-blue-600 text-white font-bold"
                          : "hover:bg-slate-50 text-gray-700"
                      }`}
                    >
                      <div className="truncate flex-1 pr-2">
                        <span className="truncate pr-1 block font-semibold">{item.label}</span>
                        <span className={`text-[10px] block truncate ${idx === activeTab ? "text-blue-100" : "text-gray-400"}`}>{item.desc}</span>
                      </div>
                      <ChevronRight size={12} className={idx === activeTab ? "text-white" : "text-gray-400"} />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Circular Anchor Button */}
          <button
            onClick={() => {
              if (activeTab === null) {
                setActiveTabTab(0);
              } else {
                setActiveTabTab(null);
                if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); }
              }
            }}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(37,99,235,0.45)] cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 relative"
          >
            <AnimatePresence mode="wait">
              {activeTab === null ? (
                <motion.div
                  key="book"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <BookOpen size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="flex flex-col gap-1 w-5 justify-center items-center">
                    <span className="h-0.5 w-full bg-white rounded-full"></span>
                    <span className="h-0.5 w-full bg-white rounded-full"></span>
                    <span className="h-0.5 w-full bg-white rounded-full"></span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Pulsing Dot Alert Indicator */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500 border-2 border-white"></span>
            </span>
          </button>
        </motion.div>

        {/* Footer Encouragement Banner */}

      </div>
    </div>
  );
};

const Header = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (v: string) => void }) => {
  const tabs = [
    { id: 'storefront', label: '홈' },
    { id: 'ticket', label: '티켓' },
    { id: 'idea', label: '관람정보 (아이디어)' },
    { id: 'mid', label: '관람후기 (중간)' },
    { id: 'final', label: '예매안내 (최종)' }
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-[1240px] mx-auto px-4">
        
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
        <div className="flex items-center gap-4 sm:gap-8 mt-2 overflow-x-auto hide-scrollbar">
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
            <motion.div key="mid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <SectionMid setActiveTab={setActiveTab} />
            </motion.div>
          )}
          {activeTab === 'final' && (
            <motion.div key="final" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SectionFinal />
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
