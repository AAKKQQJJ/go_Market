# 시장에 가면 - 전통시장 탐방 서비스

전통시장의 상점들을 찾아보고 리뷰를 남겨 스탬프를 모으는 웹 애플리케이션입니다.

## 🎯 주요 기능

- **지역/시장 선택**: 전라남도, 광주광역시, 전라북도의 전통시장 탐색
- **네이버 지도 연동**: 실시간 지도에서 점포 위치 확인
- **점포 검색**: 가게명, 카테고리로 점포 검색
- **점포 상세 정보**: 영업시간, 연락처, 상품 정보 확인
- **리뷰 시스템**: 점포별 리뷰 작성 및 조회
- **스탬프 시스템**: 리뷰 개수에 따른 배지 획득
- **익명 인증**: Firebase 익명 로그인으로 간편한 사용

## 🛠 기술 스택

- **Frontend**: Next.js 14 (App Router), React, TypeScript, TailwindCSS
- **지도**: Naver Maps JS SDK v3
- **데이터베이스**: Firebase Firestore
- **인증**: Firebase Auth (익명 로그인)
- **아이콘**: Lucide React

## 📋 사전 준비사항

1. **Firebase 프로젝트 설정**
   - [Firebase Console](https://console.firebase.google.com)에서 새 프로젝트 생성
   - Firestore 데이터베이스 활성화
   - Authentication에서 익명 로그인 활성화

2. **Naver Maps API 키 발급**
   - [Naver Cloud Platform](https://console.ncloud.com)에서 Maps API 신청
   - Web Dynamic Map API 활성화

## 🚀 설치 및 실행

### 1. 프로젝트 클론 및 의존성 설치

\`\`\`bash
cd honamMarket
npm install
\`\`\`

### 2. 환경변수 설정

\`.env.local\` 파일을 생성하고 다음 값들을 설정하세요:

\`\`\`env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Naver Maps API
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your_naver_client_id
\`\`\`

### 3. 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

## 📁 프로젝트 구조

\`\`\`
src/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx           # 메인 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   └── shop/[id]/         # 점포 상세 페이지
├── components/             # 재사용 가능한 컴포넌트
│   ├── NaverMap.tsx       # 네이버 지도 컴포넌트
│   ├── ShopCard.tsx       # 점포 카드
│   └── ...                # 기타 컴포넌트들
├── lib/                    # 유틸리티 및 설정
│   ├── firebase.ts        # Firebase 설정 및 헬퍼
│   └── utils.ts           # 공통 유틸리티 함수
├── data/                   # 시드 데이터
│   ├── regions.json       # 지역 정보
│   ├── markets.json       # 시장 정보
│   └── shops.json         # 점포 정보
└── types/                  # TypeScript 타입 정의
    └── index.ts
\`\`\`

## 🔧 주요 기능 설명

### 지도 기능
- 네이버 지도 SDK를 사용한 실시간 지도 표시
- 점포별 마커 표시 및 정보창
- 지역/시장 선택에 따른 지도 중심점 이동

### 리뷰 시스템
- 익명 사용자의 리뷰 작성 (1분 쿨다운)
- 실시간 리뷰 목록 업데이트
- 욕설 필터링 및 글자 수 제한

### 스탬프 시스템
- 리뷰 작성 개수에 따른 자동 스탬프 계산
- 배지 시스템: 브론즈(5개), 실버(10개), 골드(20개), 플래티넘(50개)
- 실시간 진행률 표시

## 🚀 배포 준비

### 1. 빌드
\`\`\`bash
npm run build
\`\`\`

### 2. 프로덕션 실행
\`\`\`bash
npm start
\`\`\`

## 📝 추가 구현 가능한 기능

- [ ] 상인용 점포 등록 페이지
- [ ] AI 기반 점포 소개글 자동 생성
- [ ] 이미지 업로드 기능
- [ ] 점포 즐겨찾기 기능
- [ ] 사용자 프로필 시스템
- [ ] 푸시 알림

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다.
