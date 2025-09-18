'use client';

import React, { useEffect, useRef } from 'react';

// 타입 정의를 파일 내에서 직접 선언
interface Shop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: string;
  address?: string;
}

interface NaverMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  shops?: Shop[];
  onShopClick?: (shop: Shop) => void;
}

export default function NaverMap({ 
  center = { lat: 35.1796, lng: 126.9076 }, 
  zoom = 14, 
  shops = [],
  onShopClick 
}: NaverMapProps) {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    // 네이버 지도 API가 로드될 때까지 대기
    const initializeMap = () => {
      if (!window.naver || !mapElementRef.current) {
        setTimeout(initializeMap, 100);
        return;
      }

      // 지도 초기화
      const mapOptions = {
        center: new window.naver.maps.LatLng(center.lat, center.lng),
        zoom: zoom,
        mapTypeControl: true,
      };

      mapRef.current = new window.naver.maps.Map(mapElementRef.current, mapOptions);
    };

    initializeMap();
  }, [center.lat, center.lng, zoom]);

  // 마커 업데이트
  useEffect(() => {
    if (!mapRef.current || !window.naver) return;

    // 기존 마커 제거
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // 새 마커 추가
    shops.forEach((shop: Shop) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(shop.lat, shop.lng),
        map: mapRef.current,
        title: shop.name,
      });

      // 마커 클릭 이벤트
      window.naver.maps.Event.addListener(marker, 'click', () => {
        if (onShopClick) {
          onShopClick(shop);
        }
      });

      // 정보창 생성
      const infoWindow = new window.naver.maps.InfoWindow({
        content: `
          <div style="padding: 10px; min-width: 150px;">
            <h4 style="margin: 0 0 5px 0; font-weight: bold;">${shop.name}</h4>
            <p style="margin: 0; color: #666; font-size: 12px;">${shop.category}</p>
            <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">${shop.address || ''}</p>
          </div>
        `,
      });

      // 마커 호버 이벤트
      window.naver.maps.Event.addListener(marker, 'mouseover', () => {
        infoWindow.open(mapRef.current, marker);
      });

      window.naver.maps.Event.addListener(marker, 'mouseout', () => {
        infoWindow.close();
      });

      markersRef.current.push(marker);
    });
  }, [shops, onShopClick]);

  // 지도 중심점 업데이트
  useEffect(() => {
    if (mapRef.current && window.naver) {
      mapRef.current.setCenter(new window.naver.maps.LatLng(center.lat, center.lng));
    }
  }, [center.lat, center.lng]);

  return (
    <div className="relative">
      <div
        ref={mapElementRef}
        className="naver-map rounded-lg"
        style={{ width: '100%', height: '400px' }}
      >
        {!window.naver && (
          <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
            <div className="text-gray-500">지도 로딩 중...</div>
          </div>
        )}
      </div>
    </div>
  );
}
