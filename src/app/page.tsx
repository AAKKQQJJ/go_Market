'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

// 네이버 지도 컴포넌트
function NaverMapComponent({ shops, scriptLoaded }: { shops: any[]; scriptLoaded: boolean }) {
  const [mapError, setMapError] = React.useState(false);
  const mapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!scriptLoaded) return;

    // 네이버 지도 API 로드 확인
    const initMap = () => {
      if (!window.naver || !mapRef.current) {
        setMapError(true);
        return;
      }

      try {
        // 광주 중심 좌표
        const center = new window.naver.maps.LatLng(35.1796, 126.9076);
        
        const mapOptions = {
          center: center,
          zoom: 13,
          mapTypeControl: true,
          mapDataControl: false,
          logoControl: false,
          scaleControl: false
        };

        console.log('지도 초기화 시작');
        const map = new window.naver.maps.Map(mapRef.current, mapOptions);
        console.log('지도 초기화 완료:', map);

        // 샘플 마커 추가 (실제 점포 위치는 API 연동 후 사용)
        const sampleLocations = [
          { lat: 35.1796, lng: 126.9076, name: '광주 중심가' },
          { lat: 35.1468, lng: 126.9185, name: '양동시장' },
          { lat: 35.1396, lng: 126.9043, name: '대인시장' }
        ];

        sampleLocations.forEach(location => {
          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(location.lat, location.lng),
            map: map,
            title: location.name
          });
        });
      } catch (error) {
        console.error('지도 초기화 실패:', error);
        console.error('에러 상세:', error.message);
        setMapError(true);
      }
    };

    // 약간의 지연 후 지도 초기화
    const timer = setTimeout(initMap, 500);
    return () => clearTimeout(timer);
  }, [scriptLoaded]);

  if (mapError) {
    return (
      <div className="h-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-medium mb-2">지도 로딩 실패</p>
          <p className="text-sm text-gray-400 mb-1">네이버 지도 API 키를 확인해주세요</p>
          <p className="text-xs text-gray-400">.env.local 파일에</p>
          <p className="text-xs text-gray-400">NEXT_PUBLIC_NAVER_MAP_CLIENT_ID 설정</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      <div ref={mapRef} className="w-full h-full" />
      {!scriptLoaded && (
        <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">지도 로딩 중...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// 임시 데이터
const regions = [
  { id: 'jeonnam', name: '전라남도' },
  { id: 'gwangju', name: '광주광역시' },
  { id: 'jeonbuk', name: '전라북도' }
];

const markets = [
  { id: 'mokpo-central', name: '목포중앙시장', regionId: 'jeonnam' },
  { id: 'yeosu-central', name: '여수중앙시장', regionId: 'jeonnam' },
  { id: 'yangdong', name: '양동시장', regionId: 'gwangju' },
  { id: 'daein', name: '대인시장', regionId: 'gwangju' },
  { id: 'jeonju-nambu', name: '전주남부시장', regionId: 'jeonbuk' },
];

const sampleShops = [
  { id: '1', name: '목포 홍어마을', category: '수산물', market: '목포중앙시장', status: '영업중' },
  { id: '2', name: '할머니 떡집', category: '떡류', market: '목포중앙시장', status: '영업중' },
  { id: '3', name: '양동 청과', category: '청과물', market: '양동시장', status: '영업종료' },
  { id: '4', name: '전주 한복집', category: '의류', market: '전주남부시장', status: '영업중' },
];

export default function HomePage() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [mapScriptLoaded, setMapScriptLoaded] = useState(false);

  // 네이버 지도 스크립트 동적 로드
  useEffect(() => {
    const loadNaverMapScript = () => {
      // 이미 로드되었는지 확인
      if (window.naver) {
        setMapScriptLoaded(true);
        return;
      }

      // 스크립트가 이미 DOM에 있는지 확인
      const existingScript = document.querySelector('script[src*="naver.com/openapi/v3/maps.js"]');
      if (existingScript) {
        existingScript.addEventListener('load', () => setMapScriptLoaded(true));
        return;
      }

      // 새 스크립트 태그 생성
      const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
      console.log('네이버 클라이언트 ID:', clientId); // 디버깅용
      
      const script = document.createElement('script');
      // 신규 NCP Maps API - ncpKeyId 파라미터 사용
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`;
      script.async = true;
      script.onload = () => setMapScriptLoaded(true);
      script.onerror = (error) => {
        console.error('네이버 지도 스크립트 로드 실패:', error);
        console.error('스크립트 URL:', script.src);
        setMapScriptLoaded(false);
      };
      
      document.head.appendChild(script);
    };

    loadNaverMapScript();
  }, []);

  // 필터링된 시장 목록
  const filteredMarkets = selectedRegion 
    ? markets.filter(market => market.regionId === selectedRegion)
    : markets;

  // 필터링된 점포 목록
  const filteredShops = sampleShops.filter(shop => {
    const marketMatch = selectedMarket ? shop.market.includes(selectedMarket) : true;
    const searchMatch = searchTerm ? 
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.category.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    return marketMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <header className="bg-white border-b border-gray-300 py-4">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">시장에 가면</h1>
            <button className="border-2 border-gray-900 px-4 py-2 text-gray-900 font-medium">
              점포등록하기
            </button>
          </div>
        </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* 스탬프 이벤트 배너 */}
        <div className="bg-gradient-to-r from-orange-100 to-yellow-100 border-2 border-gray-300 rounded-lg p-6 mb-6 relative">
          <button className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-500 mb-2">스탬프 이벤트!</h2>
            <p className="text-lg text-gray-700">
              가게 방문하고<br />
              리뷰 작성하면 적금
            </p>
          </div>
        </div>

        {/* 검색 필터 영역 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* 지역 선택 */}
          <div className="border-2 border-gray-300 rounded">
            <div className="bg-gray-100 p-3 text-center font-medium border-b">
              지역 선택
            </div>
            <div className="p-3">
              <select
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  setSelectedMarket('');
                }}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">전체 지역</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>{region.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 시장 선택 */}
          <div className="border-2 border-gray-300 rounded">
            <div className="bg-gray-100 p-3 text-center font-medium border-b">
              시장 선택
            </div>
            <div className="p-3">
              <select
                value={selectedMarket}
                onChange={(e) => setSelectedMarket(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                disabled={!selectedRegion}
              >
                <option value="">전체 시장</option>
                {filteredMarkets.map((market) => (
                  <option key={market.id} value={market.name}>{market.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 가게 검색 */}
          <div className="border-2 border-gray-300 rounded">
            <div className="bg-gray-100 p-3 text-center font-medium border-b">
              가게 이름, 키색
            </div>
            <div className="p-3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="검색어 입력"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* 메인 컨텐츠 영역 */}
        <div className="grid grid-cols-2 gap-6">
          {/* 왼쪽: 가게 리스트 */}
          <div className="space-y-4">
            {/* 첫 번째 가게 리스트 */}
            <div className="border-2 border-gray-300 rounded">
              <div className="bg-gray-100 p-3 flex items-center border-b">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="font-medium">가게 리스트</span>
              </div>
              <div className="p-4">
                {filteredShops.slice(0, Math.ceil(filteredShops.length / 2)).map((shop) => (
                  <div key={shop.id} className="mb-3 last:mb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{shop.name}</h3>
                        <p className="text-sm text-gray-600">{shop.category} | {shop.market}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        shop.status === '영업중' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {shop.status}
                      </span>
                    </div>
                    {filteredShops.indexOf(shop) < Math.ceil(filteredShops.length / 2) - 1 && (
                      <hr className="mt-3 border-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 두 번째 가게 리스트 */}
            <div className="border-2 border-gray-300 rounded">
              <div className="bg-gray-100 p-3 flex items-center border-b">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="font-medium">가게 리스트</span>
              </div>
              <div className="p-4">
                {filteredShops.slice(Math.ceil(filteredShops.length / 2)).map((shop) => (
                  <div key={shop.id} className="mb-3 last:mb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{shop.name}</h3>
                        <p className="text-sm text-gray-600">{shop.category} | {shop.market}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        shop.status === '영업중' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {shop.status}
                      </span>
                    </div>
                    {filteredShops.indexOf(shop) < filteredShops.length - 1 && (
                      <hr className="mt-3 border-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 오른쪽: 네이버 지도 */}
          <div className="border-2 border-gray-300 rounded">
            <div className="bg-gray-100 p-3 text-center font-medium border-b">
              네이버 지도
            </div>
            <div className="aspect-square">
              <NaverMapComponent shops={filteredShops} scriptLoaded={mapScriptLoaded} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
