import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Check, X, Info, Globe, MapPin, Search, Smartphone } from 'lucide-react';

const COMPETITION_DATA = [
  { name: '자리어때', vision: 'O (사진)', accessibility: '단차·무릎간격 (텍스트)', tech: 'X', extra: '먹거리·굿즈샵 안내', note: '광고 많음, UI 불편' },
  { name: '오프메이트', vision: 'O', accessibility: 'X', tech: 'X', extra: '2차 이벤트 정보', note: '-' },
  { name: '시야', vision: 'O', accessibility: '조명·음향 후기', tech: 'X', extra: '극장 특화', note: '정보 한정' },
  { name: 'S-MAP', vision: 'X', accessibility: 'X', tech: 'O (서울 3D)', extra: '건물 내부 정보', note: '공연장 내부 미제공' },
  { name: 'Theatre Access NYC', vision: 'X', accessibility: 'O (맞춤 필터)', tech: 'X', extra: '장애 관객 통합 플랫폼', note: '해외 사례 (브로드웨이)' },
  { name: 'Sociability', vision: 'X', accessibility: 'O (객관 수치)', tech: 'X', extra: '커뮤니티/실시간 업데이트', note: '영국 기반' },
  { name: '서울다누림관광', vision: 'X', accessibility: 'O (관광약자)', tech: 'X', extra: '서울 공연·전시 연동', note: '서울시 운영' },
  { name: 'Waymap / Everguide', vision: 'X', accessibility: 'X', tech: 'O (실내 AR)', extra: '시각장애인 특화', note: '센서 기반' },
];

const DETAILED_ANALYSIS = [
  {
    title: '자리 어때',
    points: [
      '스포츠 경기장 및 공연장 좌석별 시야 사진 확인 가능 — 국내 유일 스포츠 경기장 시야 서비스',
      '단차 높이 및 무릎 간격을 cm 단위 텍스트로 안내',
      '공연장 주변 먹거리, PC방, 굿즈샵 위치 정보 제공',
      '웹사이트 형식 운영 — 광고 과다, UI 불편으로 정보 접근성 낮음'
    ]
  },
  {
    title: '오프메이트',
    points: [
      '좌석 시야 사진 확인 기능',
      '2차 이벤트(팬미팅, 사인회 등) 정보 제공'
    ]
  },
  {
    title: '시야',
    points: [
      '뮤지컬·연극 극장 특화 시야 정보',
      '시야·좌석·조명·음향 항목별 후기 작성 가능',
      '공연 외 부가 정보 없음 — 정보 범위 한정적'
    ]
  },
  {
    title: 'S-MAP',
    points: [
      '서울 전역 3D 입체 지도 — 건물 외관 및 일부 실내 정보 제공',
      '교통 CCTV, 사고·공사 정보, 미세먼지, 녹지, 바람길 등 도시 데이터',
      '공연장 내부 상세 정보 미제공 / 조작 불편',
      '보행자뷰 기능으로 특정 지점 시야 확인 가능 (Q, E 키로 시야 이동)'
    ]
  },
  {
    title: 'Theatre Access NYC',
    points: [
      'TDF·브로드웨이 리그 공동 운영 — 장애 관객 맞춤 공연 통합 플랫폼',
      '제공 접근성 옵션: 실시간/사전 오디오 해설, 일반/휴대용 자막, 수어 통역, 자폐 스펙트럼 배려 공연 등',
      '휠체어 좌석 위치 및 접근 경로 안내 / 청각 보조 기기 이용 가능 여부',
      '맞춤형 접근성 필터 — 필요한 지원만 선택해 해당 공연만 노출'
    ],
    isOverseas: true
  },
  {
    title: 'Sociability',
    points: [
      '사회적 공간 접근성 정보 제공 — 영국 기반 모바일 앱',
      "'접근 가능함' 대신 입구 턱 높이, 문 너비 등 객관적 수치 정보 제공",
      '휠체어 화장실 내부 사진, 엘리베이터 유무, 테이블 높이, 조명/소음 정보',
      '커뮤니티 기반 실시간 업데이트 및 워크스루 사진 공유'
    ],
    isOverseas: true
  },
  {
    title: '서울다누림관광',
    points: [
      '서울 주요 공연장 관광약자(장애인·고령자) 접근성 정보 제공',
      '입구 턱 낮춤, 시각장애인 안내 시설 등 항목별 체크',
      '전시·공연·축제·행사 정보와 접근성 정보 연동'
    ]
  },
  {
    title: 'Waymap + Everguide',
    points: [
      '스마트폰 센서 기반 실내·지하 AR 길안내',
      '시각장애인을 위해 설계되어 복잡한 실내 공간에서 일반인도 활용 가능'
    ]
  }
];

export const CompetitionAnalysis = () => {
  return (
    <div className="w-full space-y-16">
      {/* 1. Comparison Table */}
      <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 lg:p-12 shadow-xl shadow-blue-900/5">
        <div className="mb-10 text-center lg:text-left">
          <div className="inline-block bg-blue-100 text-blue-600 text-[10px] font-black px-3 py-1 rounded-full mb-4 tracking-widest uppercase">Benchmarking</div>
          <h4 className="text-3xl font-black text-gray-900 mb-2 font-display italic">
            유사 서비스 비교 분석
          </h4>
          <p className="text-gray-400 text-sm font-medium">403 BYPASS의 차별화된 포지셔닝을 위한 시장 조사</p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Service Name</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Seat Vision</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Accessibility</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Next-Gen Tech</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Key Feature</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {COMPETITION_DATA.map((item, idx) => (
                <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{item.name}</span>
                  </td>
                  <td className="px-8 py-5 text-sm">
                    <div className="flex items-center gap-2">
                       <div className={`w-1.5 h-1.5 rounded-full ${item.vision.includes('O') ? 'bg-emerald-400' : 'bg-gray-200'}`}></div>
                       <span className="text-gray-600 font-medium">{item.vision}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm">
                    {item.accessibility === 'X' ? 
                      <span className="text-gray-300 font-bold">X</span> : 
                      <span className="text-gray-800 font-bold bg-blue-50 px-2 py-1 rounded-md text-[11px]">{item.accessibility}</span>
                    }
                  </td>
                  <td className="px-8 py-5 text-sm">
                    {item.tech === 'X' ? 
                      <span className="text-gray-300 font-bold">X</span> : 
                      <span className="text-blue-600 font-black flex items-center gap-1"><Smartphone size={12}/>{item.tech}</span>
                    }
                  </td>
                  <td className="px-8 py-5 text-xs text-gray-500 font-medium leading-relaxed">{item.extra}</td>
                  <td className="px-8 py-5 text-[10px] text-gray-400 font-bold italic tracking-tight">{item.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Detailed Cards */}
      <section>
        <div className="mb-8">
          <h4 className="text-xl font-black text-gray-900 mb-2 flex items-center gap-2">
            <Info className="text-blue-600" size={20} />
            서비스별 상세 분석 인사이트
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DETAILED_ANALYSIS.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <h5 className="text-lg font-black text-gray-900 group-hover:text-blue-600 transition-colors">{item.title}</h5>
                {item.isOverseas && (
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase">
                    <Globe size={10} /> Overseas
                  </span>
                )}
              </div>
              <ul className="space-y-2">
                {item.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex gap-2 text-sm text-gray-600 leading-relaxed font-medium">
                    <Check size={14} className="text-blue-500 shrink-0 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. New Trends & Specific Cases */}
      <section className="bg-gray-100/50 rounded-3xl p-8 border border-gray-200">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <div className="inline-block bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full mb-4 tracking-widest">INDUSTRY TREND</div>
            <h4 className="text-2xl font-black text-gray-900 mb-4 leading-tight italic">늘어나는 <span className="text-blue-600">접근성 매니저</span></h4>
            <p className="text-gray-600 text-sm leading-relaxed font-medium mb-6">
              공연 자막 수정부터 객석 안내까지 지원하는 '접근성 매니저' 직군이 확대되고 있습니다. 이는 단순 인프라 구축을 넘어 인적 서비스의 결합이 필수적임을 시사합니다.
            </p>

          </div>
          
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600 opacity-5 rounded-bl-full group-hover:scale-125 transition-transform" />
            <h4 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <MapPin className="text-blue-600" size={20} />
              모두예술극장 사례
            </h4>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 text-xs font-bold">1</div>
                <p className="text-sm text-gray-600 font-medium">공연장 내 수어 통역, 음성 해설 상시 지원</p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 text-xs font-bold">2</div>
                <p className="text-sm text-gray-600 font-medium">시각장애인 안내견 동반 허용 및 접근성 매니저 운영</p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 text-xs font-bold">3</div>
                <p className="text-sm text-gray-600 font-medium">장애인 티켓 할인 정책 및 통합 접근성 안내</p>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};
