import React from 'react';
import { motion } from 'motion/react';
import { 
  TrainFront, 
  Map as MapIcon, 
  Ticket, 
  Building2, 
  Accessibility, 
  UtensilsCrossed, 
  Globe,
  Share2
} from 'lucide-react';

const PARTNERS = [
  {
    name: "또타지하철",
    org: "서울교통공사",
    desc: "실시간 열차 위치·혼잡도 및 승강기 고장 알림 연동",
    details: "안내/맵 화면 내 'EV 고장 현황 실시간 안내' 직접 연동",
    icon: <TrainFront className="text-blue-600" size={24} />,
    color: "bg-blue-50 border-blue-100"
  },
  {
    name: "서울시 S-MAP",
    org: "서울특별시",
    desc: "3D 건물 내부 정보 및 공연장 구조 시뮬레이터 데이터",
    details: "안내/맵 화면 '건물 내부 S-MAP(3D)' 기능의 기반 인프라",
    icon: <MapIcon className="text-emerald-600" size={24} />,
    color: "bg-emerald-50 border-emerald-100"
  },
  {
    name: "코레일",
    org: "한국철도공사",
    desc: "지방 공연 및 투어 관람객을 위한 광역 교통 정보 연동",
    details: "KTX/ITX 연동을 통한 전국 단위 관람 여정 지원",
    icon: <Globe className="text-blue-800" size={24} />,
    color: "bg-blue-50 border-blue-200"
  },
  {
    name: "티켓 예매처",
    org: "공연 예매 플랫폼",
    desc: "공연 카테고리, 공연장 정보 및 예매 티켓 데이터 연동",
    details: "예매 데이터를 '나의 티켓' 화면으로 실시간 자동 연결",
    icon: <Ticket className="text-rose-600" size={24} />,
    color: "bg-rose-50 border-rose-100"
  },
  {
    name: "충무아트센터",
    org: "공연장 파트너",
    desc: "AI 자막 안경 대여 서비스 및 현장 운영 시스템 연계",
    details: "매칭&예약 화면 내 직접 예약 및 기기 대여 통합",
    icon: <Building2 className="text-gray-700" size={24} />,
    color: "bg-gray-100 border-gray-200"
  },
  {
    name: "모두예술극장",
    org: "배리어프리 극장",
    desc: "수어·음성 해설 및 안내견 동반 정보 데이터 연동",
    details: "장애인 티켓 할인 정책 및 특화 접근성 정보 제공",
    icon: <Accessibility className="text-purple-600" size={24} />,
    color: "bg-purple-50 border-purple-100"
  },
  {
    name: "뽈레 (Polle)",
    org: "맛집 검색 서비스",
    desc: "공연장 주변 접근성 우수 식당 및 편의시설 정보 보완",
    details: "주변 먹거리 탐색 기능 강화를 위한 외부 데이터 제휴",
    icon: <UtensilsCrossed className="text-orange-500" size={24} />,
    color: "bg-orange-50 border-orange-100"
  }
];

export const Partners = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {PARTNERS.map((partner, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className={`flex flex-col p-6 rounded-[2rem] border ${partner.color} shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md">
                {partner.icon}
              </div>
              <div className="text-[10px] font-black text-gray-400 bg-white/50 px-2 py-1 rounded-full uppercase tracking-widest"> Partner </div>
            </div>

            <div className="flex-grow">
              <h5 className="text-lg font-black text-gray-900 mb-1 leading-tight">{partner.name}</h5>
              <div className="text-[11px] font-bold text-blue-600 mb-3 uppercase tracking-tighter">{partner.org}</div>
              <p className="text-sm text-gray-600 font-bold leading-relaxed mb-4">
                {partner.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-black/5">
              <div className="flex items-start gap-2">
                <Share2 size={12} className="text-gray-400 mt-0.5 shrink-0" />
                <p className="text-[11px] text-gray-400 font-medium leading-snug group-hover:text-gray-600 transition-colors">
                  {partner.details}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Partnership Proposal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col p-6 rounded-[2rem] border-2 border-dashed border-gray-200 bg-gray-50/50 justify-center items-center text-center group hover:border-blue-300 hover:bg-blue-50/20 transition-all cursor-pointer"
        >
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 text-gray-400 group-hover:text-blue-500 transition-colors">
             <Share2 size={24} />
          </div>
          <h5 className="text-sm font-black text-gray-400 group-hover:text-gray-600">협업 문의</h5>
          <p className="text-[10px] text-gray-400 mt-1 font-bold">partnership@403bypass.com</p>
        </motion.div>
      </div>
    </div>
  );
};
