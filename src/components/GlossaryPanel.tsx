import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Info } from 'lucide-react';

export const GlossaryPanel = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.5 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[500px] bg-white shadow-2xl z-[101] overflow-y-auto flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/80 sticky top-0 z-10 backdrop-blur-md">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Info size={20} className="text-blue-600" />
                용어 사전
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-12 pb-24">
              <div className="space-y-4">
                <h3 className="text-xl font-black text-gray-900">1. 배리어프리 디자인</h3>
                <div className="text-sm text-gray-500 font-bold block mb-1 tracking-wider uppercase">Barrier-free Design</div>
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-4">
                  <div>
                    <span className="font-bold text-gray-900 bg-gray-200 px-2 py-0.5 rounded text-sm mr-2">정의</span>
                    <span className="text-gray-700 leading-relaxed font-sans text-sm break-keep">
                      장애인, 노인, 어린이, 임산부, 외국인 등 사회적 약자들이 일상생활에서 느끼는 물리적·심리적 장벽(Barrier)을 제거하기 위한 특별한 디자인입니다.
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-white bg-gray-900 px-2 py-0.5 rounded text-sm mr-2">핵심</span>
                    <span className="text-gray-700 leading-relaxed font-sans text-sm break-keep">
                      이미 만들어진 장벽을 없애는 '사후적 조치'이자 특정 계층을 위한 '특별한 배려'에 초점을 맞춥니다.
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-black text-blue-600">2. 유니버설 디자인 / 서비스</h3>
                <div className="text-sm text-blue-400 font-bold block mb-1 tracking-wider uppercase">Universal Design / Service</div>
                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 space-y-4">
                  <div>
                    <span className="font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded text-sm mr-2">정의</span>
                    <span className="text-gray-700 leading-relaxed font-sans text-sm break-keep">
                      로널드 메이스(Ronald Mace)에 의해 처음 등장한 개념으로 연령, 성별, 국적, 장애 유무 등에 상관없이 '누구나' 처음부터 편리하게 이용하고 즐길 수 있는 제품, 환경, 서비스를 설계하는 것입니다.
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-white bg-blue-600 px-2 py-0.5 rounded text-sm mr-2">핵심</span>
                    <span className="text-gray-700 leading-relaxed font-sans text-sm break-keep">
                      특정 사용자층에 국한되지 않는 '보편성'을 지향하며, 모두를 사회의 일반적인 구성원으로 포함시키려는 통합적 의도를 지닙니다.
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-4 border-t border-gray-100">
                <h3 className="text-xl font-black text-gray-900">3. 배리어프리 vs 유니버설 디자인 비교</h3>
                <p className="text-sm text-gray-600 leading-relaxed break-keep">
                  두 개념은 서로 대립하는 것이 아니라, 유니버설 디자인이라는 더 큰 범주 안에 배리어프리가 포함되는 관계를 갖습니다.
                </p>

                <div className="relative w-full aspect-square max-w-[320px] mx-auto mt-8">
                  {/* Outer circle: Universal Design */}
                  <div className="absolute inset-0 rounded-full border-[3px] border-blue-500 hover:bg-blue-50/50 transition-colors group">
                    <div className="absolute top-[8%] left-0 w-full text-center px-4">
                      <div className="font-bold text-blue-600 mb-1 text-base sm:text-lg group-hover:scale-105 transition-transform">유니버설디자인</div>
                      <div className="text-[10px] sm:text-[11px] text-gray-500 max-w-[220px] mx-auto leading-snug break-keep">
                        성별, 국적, 장애의 유무 관계없이 모두가 사용할 수 있는 보편성
                      </div>
                    </div>
                  </div>
                  
                  {/* Inner circle: Barrier-free */}
                  <div className="absolute bottom-[3%] left-1/2 -translate-x-1/2 w-[65%] h-[65%] rounded-full border-[3px] border-gray-400 bg-white flex items-center justify-center text-center px-4 shadow-sm hover:border-gray-900 hover:shadow-md transition-all z-10 group">
                    <div>
                      <div className="font-bold text-gray-900 mb-1 text-sm sm:text-base group-hover:scale-105 transition-transform">배리어프리 디자인</div>
                      <div className="text-[10px] sm:text-[11px] text-gray-500 leading-snug break-keep">
                        장애인, 노인, 어린이, 임산부, 외국인 등 장애물을 없애기 위한 특별한 디자인
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-gray-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-bl-full opacity-20" />
                <h4 className="text-blue-400 font-bold mb-4 flex items-center gap-2">
                  <span className="text-xl">💡</span> 403: BYPASS의 관점
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed break-keep font-medium relative z-10">
                  "우리는 이미 존재하는 장벽을 제거하는 배리어프리의 단계를 넘어, 기획 단계부터 모든 관객의 권리를 보장하는 <span className="text-white font-bold inline-block border-b-2 border-blue-500">유니버설 서비스</span>로의 확장을 지향합니다."
                </p>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
