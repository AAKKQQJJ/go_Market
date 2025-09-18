// 클래스명 유틸리티 (간단한 구현)
export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(' ');
}

// 현재 영업중인지 확인하는 함수
export function isOpenNow(hours?: string): boolean {
  if (!hours) return true; // 영업시간 정보가 없으면 true로 가정
  
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 100 + currentMinute;
  
  // 간단한 영업시간 파싱 (예: "09:00-18:00")
  const timeMatch = hours.match(/(\d{2}):(\d{2})-(\d{2}):(\d{2})/);
  if (!timeMatch) return true;
  
  const openTime = parseInt(timeMatch[1]) * 100 + parseInt(timeMatch[2]);
  const closeTime = parseInt(timeMatch[3]) * 100 + parseInt(timeMatch[4]);
  
  return currentTime >= openTime && currentTime <= closeTime;
}

// 비속어 필터 (간단한 구현)
export function containsProfanity(text: string): boolean {
  const profanityWords = ['욕설1', '욕설2', '비속어']; // 실제 비속어 목록으로 교체
  const lowerText = text.toLowerCase();
  return profanityWords.some(word => lowerText.includes(word));
}

// 텍스트 유효성 검사
export function validateText(text: string, maxLength: number = 300): string | null {
  if (!text.trim()) {
    return '내용을 입력해주세요.';
  }
  
  if (text.length > maxLength) {
    return `최대 ${maxLength}자까지 입력 가능합니다.`;
  }
  
  if (containsProfanity(text)) {
    return '부적절한 내용이 포함되어 있습니다.';
  }
  
  return null;
}

// 거리 계산 함수 (Haversine formula)
export function calculateDistance(
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): number {
  const R = 6371; // 지구 반지름 (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// 포맷팅 유틸리티
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}
