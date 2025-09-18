// 지역 및 시장 타입
export interface Region {
  id: string;
  name: string;
}

export interface Market {
  id: string;
  name: string;
  regionId: string;
  address: string;
  lat: number;
  lng: number;
}

// 점포 관련 타입
export interface Shop {
  id: string;
  marketId: string;
  name: string;
  lat: number;
  lng: number;
  category: string;
  hours?: string;
  phone?: string;
  address?: string;
  description?: string;
  products: Product[];
  createdAt?: Date;
}

export interface Product {
  id: string;
  name: string;
  isSignature?: boolean;
  isSeasonal?: boolean;
  imageUrl?: string;
}

// 리뷰 시스템 타입
export interface Review {
  id: string;
  userId: string;
  shopId: string;
  text: string;
  createdAt: Date;
}

// 스탬프 시스템 타입
export interface Stamp {
  userId: string;
  count: number;
  badges: Badge[];
}

export interface Badge {
  type: 'bronze' | 'silver' | 'gold' | 'platinum';
  earnedAt: Date;
  threshold: number;
}

// 네이버 지도 타입 (간단한 정의)
declare global {
  interface Window {
    naver: any;
  }
}

export interface NaverMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  shops?: Shop[];
  onShopClick?: (shop: Shop) => void;
}
