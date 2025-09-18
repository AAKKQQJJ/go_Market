# 🚀 시장에 가면 - 새 환경 설정 가이드

## 📋 개요

이 가이드는 새로운 개발 환경에서 "시장에 가면" 프로젝트를 설정하는 방법을 안내합니다.

## 🔧 사전 준비사항

### 1️⃣ 필수 소프트웨어 설치

```bash
# Node.js 18+ 버전 확인
node --version
# npm 버전 확인  
npm --version
# Git 확인
git --version
```

**필요한 버전:**
- Node.js: 18.0.0 이상
- npm: 9.0.0 이상
- Git: 2.0 이상

### 2️⃣ 개발 도구 준비

- **에디터**: VS Code (권장) 또는 선호하는 에디터
- **터미널**: 명령줄 도구 (Windows: PowerShell/WSL, macOS/Linux: Terminal)

## 📥 프로젝트 설정

### 1️⃣ 프로젝트 클론 및 이동

```bash
# 프로젝트 디렉토리로 이동 (이미 있는 경우)
cd honamMarket

# 또는 새로 클론하는 경우
# git clone <repository-url>
# cd honamMarket
```

### 2️⃣ 의존성 설치

```bash
# 모든 npm 패키지 설치
npm install

# 설치 확인
npm list --depth=0
```

**예상 설치 시간**: 2-5분 (인터넷 속도에 따라)

### 3️⃣ 환경변수 설정

`.env.local` 파일을 프로젝트 루트에 생성하고 다음 내용을 추가:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Naver Maps API
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your_naver_client_id
```

⚠️ **중요**: 실제 API 키로 교체해야 합니다!

## 🔥 Firebase 설정

### 1️⃣ Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: `sijangegamyeon`)
4. Google Analytics 설정 (선택사항)
5. 프로젝트 생성 완료

### 2️⃣ 웹 앱 추가

1. Firebase 프로젝트 콘솔에서 "웹" 아이콘 클릭
2. 앱 이름 입력 (예: `시장에 가면`)
3. Firebase Hosting 설정 (나중에 해도 됨)
4. 앱 등록 후 설정 정보 복사

### 3️⃣ Firebase 서비스 활성화

#### Firestore 데이터베이스
1. 콘솔에서 "Firestore Database" 선택
2. "데이터베이스 만들기" 클릭
3. 보안 규칙: "테스트 모드에서 시작" 선택
4. 위치: `asia-northeast3` (서울) 권장

#### Authentication
1. 콘솔에서 "Authentication" 선택
2. "시작하기" 클릭
3. "Sign-in method" 탭에서 "익명" 활성화

#### Storage (선택)
1. 콘솔에서 "Storage" 선택
2. "시작하기" 클릭
3. 보안 규칙: 기본값 사용

## 🗺 Naver Maps API 설정

### 1️⃣ Naver Cloud Platform 가입

1. [NCP Console](https://console.ncloud.com/) 접속
2. 회원가입 및 본인인증 완료
3. 결제수단 등록 (무료 사용량 내에서는 요금 부과 안됨)

### 2️⃣ Maps API 신청

1. NCP 콘솔에서 "AI·Application Service" > "Maps" 선택
2. "이용 신청하기" 클릭
3. 약관 동의 후 신청 완료

### 3️⃣ API 키 발급

1. "Application 등록" 클릭
2. Application 이름 입력 (예: `시장에가면`)
3. Service 선택: "Web Dynamic Map" 체크
4. Web Service URL 등록:
   ```
   http://localhost:3000
   https://yourdomain.com (배포 시)
   ```
5. 등록 완료 후 "Client ID" 복사

## ✅ 설정 확인

### 1️⃣ 개발 서버 실행

```bash
# 개발 서버 시작
npm run dev
```

### 2️⃣ 브라우저 확인

1. 브라우저에서 `http://localhost:3000` 접속
2. 메인 페이지가 정상적으로 로드되는지 확인
3. 지도가 정상적으로 표시되는지 확인

### 3️⃣ 환경변수 확인

브라우저 개발자 도구(F12) 콘솔에서 확인:

```javascript
// Firebase 설정 확인
console.log('Firebase:', !!window.firebase);

// Naver Maps 확인  
console.log('Naver Maps:', !!window.naver);
```

## 🐛 문제 해결

### 자주 발생하는 문제들

#### 1️⃣ 네이버 지도가 로드되지 않음

**증상**: "지도 로딩 중..." 계속 표시

**해결방법**:
1. API 키 확인: `.env.local`의 `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` 확인
2. 도메인 등록 확인: NCP 콘솔에서 `localhost:3000` 등록 여부 확인
3. 개발자 도구 콘솔에서 에러 메시지 확인

#### 2️⃣ Firebase 연결 실패

**증상**: Firebase 기능이 작동하지 않음

**해결방법**:
1. Firebase 설정 값 확인: `.env.local`의 모든 Firebase 변수 확인
2. Firebase 프로젝트 설정에서 도메인 등록 확인
3. Firestore 보안 규칙이 테스트 모드인지 확인

#### 3️⃣ npm install 실패

**증상**: 의존성 설치 중 에러 발생

**해결방법**:
```bash
# 캐시 클리어
npm cache clean --force

# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install

# 또는 yarn 사용
yarn install
```

#### 4️⃣ 포트 충돌

**증상**: "EADDRINUSE: address already in use :::3000"

**해결방법**:
```bash
# 다른 포트 사용
npm run dev -- -p 3001

# 또는 실행 중인 프로세스 종료
lsof -ti:3000 | xargs kill -9
```

### 에러 메시지별 해결방법

#### `Module not found: Can't resolve '@/lib/firebase'`

```bash
# TypeScript 설정 확인
npx tsc --noEmit

# 경로 별칭 확인 (tsconfig.json)
```

#### `Network Error: Firebase`

1. 인터넷 연결 확인
2. Firebase 프로젝트 상태 확인
3. API 키 유효성 확인

#### `Naver Maps API authentication failed`

1. Client ID 정확성 확인
2. 등록된 도메인 확인
3. API 사용량 한도 확인

## 📊 성능 확인

### 개발 서버 성능

```bash
# 빌드 테스트
npm run build

# 프로덕션 서버 실행
npm start
```

### 브라우저 성능

1. 개발자 도구 > Network 탭에서 로딩 시간 확인
2. Lighthouse 점수 확인 (90+ 목표)
3. 콘솔 에러가 없는지 확인

## 🔐 보안 체크리스트

- [ ] `.env.local` 파일이 `.gitignore`에 포함되어 있음
- [ ] Firebase 보안 규칙이 적절히 설정됨
- [ ] API 키가 환경변수로 관리됨
- [ ] 불필요한 권한이 부여되지 않음

## 📚 추가 자료

### 공식 문서
- [Next.js 문서](https://nextjs.org/docs)
- [Firebase 문서](https://firebase.google.com/docs)
- [Naver Maps API 문서](https://navermaps.github.io/maps.js.ncp/)
- [TailwindCSS 문서](https://tailwindcss.com/docs)

### 커뮤니티
- [Next.js GitHub](https://github.com/vercel/next.js)
- [Firebase 커뮤니티](https://firebase.google.com/community)

## 🆘 도움 요청

설정 중 문제가 발생하면:

1. **에러 메시지 전체**를 복사
2. **실행 환경** 정보 (OS, Node.js 버전 등)
3. **실행한 명령어**들을 기록
4. 위 정보와 함께 문의

---

**설정 완료 예상 시간**: 30-60분 (API 키 발급 포함)
**최종 업데이트**: 2025-09-18
