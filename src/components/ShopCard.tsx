'use client';

import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

interface Shop {
  id: string;
  name: string;
  category: string;
  hours?: string;
  phone?: string;
  address?: string;
  description?: string;
  products?: Array<{
    id: string;
    name: string;
    isSignature?: boolean;
    isSeasonal?: boolean;
  }>;
}

interface ShopCardProps {
  shop: Shop;
  onClick?: () => void;
}

// 현재 영업중인지 확인하는 함수
function isOpenNow(hours?: string): boolean {
  if (!hours) return true;
  
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 100 + currentMinute;
  
  const timeMatch = hours.match(/(\d{2}):(\d{2})-(\d{2}):(\d{2})/);
  if (!timeMatch) return true;
  
  const openTime = parseInt(timeMatch[1]) * 100 + parseInt(timeMatch[2]);
  const closeTime = parseInt(timeMatch[3]) * 100 + parseInt(timeMatch[4]);
  
  return currentTime >= openTime && currentTime <= closeTime;
}

export default function ShopCard({ shop, onClick }: ShopCardProps) {
  const isOpen = isOpenNow(shop.hours);

  return (
    <div 
      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-900">{shop.name}</h4>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          isOpen 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {isOpen ? '영업중' : '영업종료'}
        </span>
      </div>
      
      <div className="space-y-1 text-sm text-gray-600">
        <div className="flex items-center">
          <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs font-medium">
            {shop.category}
          </span>
        </div>
        
        {shop.address && (
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-xs">{shop.address}</span>
          </div>
        )}
        
        {shop.phone && (
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-1" />
            <span className="text-xs">{shop.phone}</span>
          </div>
        )}
        
        {shop.hours && (
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-xs">{shop.hours}</span>
          </div>
        )}
      </div>

      {shop.description && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {shop.description}
        </p>
      )}

      {shop.products && shop.products.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {shop.products.slice(0, 3).map((product) => (
            <span
              key={product.id}
              className={`px-2 py-1 rounded text-xs ${
                product.isSignature
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {product.name}
              {product.isSignature && ' ⭐'}
            </span>
          ))}
          {shop.products.length > 3 && (
            <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-600">
              +{shop.products.length - 3}개
            </span>
          )}
        </div>
      )}
    </div>
  );
}
