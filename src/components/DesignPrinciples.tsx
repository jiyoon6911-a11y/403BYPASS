import React from 'react';
import { motion } from 'motion/react';
import { 
  Palette, 
  Accessibility, 
  Smartphone, 
  CheckCircle2, 
  Eye, 
  Zap, 
  Type,
  MousePointerClick
} from 'lucide-react';

const DESIGN_CARDS = [
  {
    title: "비주얼 아이덴티티",
    desc: "티켓의 감성을 유지하는 다크 테마 기반의 강렬한 레이아웃",
    tags: ["#000000", "Neon Sky Blue", "Visuality-First"],
    icon: <Palette className="text-[#00BFFF]" size={24} />,
    points: [
      "배경: 검은색 (티켓 감성 유지)",
      "포인트 컬러: 네온 하늘색 (#00BFFF) - 높은 시인성",
      "키워드·아이콘·사진 위주 구성 (텍스트 최소화)"
    ]
  },
  {
    title: "접근성 (Accessibility)",
    desc: "모든 사용자가 차별 없이 정보를 인지할 수 있는 가이드라인",
    tags: ["Color-Blind Friendly"],
    icon: <Accessibility className="text-[#00BFFF]" size={24} />,
    points: [
      "색맹·적록색약 배려 (빨강/초록 단독 사용 금합)",
      "아이콘 형태 + 텍스트 병행 표기",
      "고대비 명도비 준수"
    ]
  },
  {
    title: "플랫폼 전략",
    desc: "현장 활용성을 극대화한 모바일 중심의 인터렉션 설계",
    tags: ["Mobile First", "Touch Interaction"],
    icon: <Smartphone className="text-[#00BFFF]" size={24} />,
    points: [
      "모바일 우선(Mobile First) UI 설계",
      "터치 중심 인터렉션 (큼직한 버튼 및 탭 구색)",
      "한 손 조작 범위 고려한 레이아웃"
    ]
  }
];

export const DesignPrinciples = () => {
  return (
    <div className="w-full bg-[#050505] rounded-[3rem] p-10 lg:p-16 relative overflow-hidden border border-white/5">
      {/* Neon Glow Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00BFFF]/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00BFFF]/5 rounded-full blur-[100px] -ml-32 -mb-32"></div>

      <div className="relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {DESIGN_CARDS.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/10 transition-all duration-500"
            >
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:border-[#00BFFF]/50 group-hover:shadow-[0_0_20px_rgba(0,191,255,0.2)] transition-all">
                {card.icon}
              </div>
              
              <h4 className="text-xl font-black text-white mb-2 font-display italic tracking-tight">
                {card.title}
              </h4>
              <p className="text-gray-400 text-xs font-bold mb-6 leading-relaxed">
                {card.desc}
              </p>

              <div className="space-y-3 mb-8">
                {card.points.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-3">
                    <CheckCircle2 size={14} className="text-[#00BFFF] mt-0.5 shrink-0" />
                    <span className="text-[11px] text-gray-300 font-medium leading-normal">{point}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                {card.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[9px] font-black px-2 py-1 bg-white/5 text-gray-500 rounded-md uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* UI Sample Simulation */}
        <div className="mt-16 bg-white/5 rounded-[2rem] border border-white/10 p-8 flex flex-col items-center">
           <div className="text-[#00BFFF] text-[10px] font-black uppercase tracking-[0.3em] mb-4">UI 가이드 샘플</div>
           <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-3 bg-black px-6 py-4 rounded-2xl border border-[#00BFFF]/30 shadow-[0_0_15px_rgba(0,191,255,0.1)]">
                 <Type className="text-[#00BFFF]" size={16} />
                 <span className="text-white text-xs font-black italic">UI 폰트 시스템</span>
              </div>
              <div className="flex items-center gap-3 bg-black px-6 py-4 rounded-2xl border border-white/10">
                 <MousePointerClick className="text-gray-400" size={16} />
                 <span className="text-gray-400 text-xs font-black italic">터치 영역 44px+</span>
              </div>
              <div className="flex items-center gap-3 bg-[#00BFFF] px-6 py-4 rounded-2xl border border-[#00BFFF] shadow-[0_0_20px_rgba(0,191,255,0.3)]">
                 <Zap className="text-black" size={16} />
                 <span className="text-black text-xs font-black italic">포인트 액션</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
