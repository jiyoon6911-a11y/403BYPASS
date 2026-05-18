import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Share2, 
  QrCode, 
  Handshake, 
  Trophy, 
  Globe, 
  MessageSquareHeart,
  TrendingUp
} from 'lucide-react';

const STRATEGIES = [
  {
    title: "서포터즈 운영",
    icon: <Users className="text-blue-600" size={24} />,
    color: "bg-blue-50 border-blue-100",
    details: [
      { highlight: "403 서포터즈 1기 모집", text: "홈 화면 내 직접 노출 및 참여 유도" },
      { highlight: "SNS 바이럴 확산", text: "앱 체험 후기 및 배리어 프리 인식 개선 캠페인" },
      { highlight: "리워드 혜택 제공", text: "근접성 어바이터(리워드 뱃지) 및 공연 관람 지원" }
    ]
  },
  {
    title: "협력사 연계 홍보",
    icon: <Handshake className="text-emerald-600" size={24} />,
    color: "bg-emerald-50 border-emerald-100",
    details: [
      { highlight: "광역 인프라 타겟 노출", text: "또타지하철·코레일·인터파크 등 제휴 채널 활용" },
      { highlight: "현장 QR 코드 배치", text: "공연장 실무 운영진 협업을 통한 오프라인 연결" },
      { highlight: "파트너사 공동 홍보", text: "모두예술극장, 충무아트센터 등 현장 거점 홍보" }
    ]
  }
];

export const MarketingStrategy = () => {
  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 gap-8">
        {STRATEGIES.map((strategy, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`relative overflow-hidden rounded-[2.5rem] border ${strategy.color} p-10 flex flex-col group transition-all duration-500`}
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-black/5 group-hover:scale-110 transition-transform">
                {strategy.icon}
              </div>
              <h4 className="text-2xl font-black text-gray-900 font-display italic tracking-tight">
                {strategy.title}
              </h4>
            </div>

            {/* List */}
            <div className="space-y-6 flex-grow">
              {strategy.details.map((item, iIdx) => (
                <div key={iIdx} className="flex gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-blue-500 transition-colors shrink-0" />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-black text-gray-900 tracking-tight">{item.highlight}</span>
                    <span className="text-xs text-gray-500 font-medium leading-relaxed">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative Icon */}
            <div className="absolute top-10 right-10 opacity-5 text-gray-900 pointer-events-none group-hover:scale-125 transition-transform duration-700">
               {React.cloneElement(strategy.icon as React.ReactElement, { size: 100 })}
            </div>

            {/* Visual tag at bottom */}
            <div className="mt-12 flex justify-between items-end">
               <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-gray-300" />
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none">Campaign Phase 01</span>
               </div>
               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5">
                  <Share2 size={12} className="text-gray-400" />
               </div>
            </div>
          </motion.div>
        ))}
      </div>


    </div>
  );
};
