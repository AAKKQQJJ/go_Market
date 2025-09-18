import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  addDoc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase 설정
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// 익명 로그인
export const signInAnon = async (): Promise<User | null> => {
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error) {
    console.error('익명 로그인 실패:', error);
    return null;
  }
};

// 인증 상태 감시
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Firestore 헬퍼 함수들
export const firestoreHelpers = {
  // 리뷰 추가
  addReview: async (userId: string, shopId: string, text: string) => {
    try {
      const docRef = await addDoc(collection(db, 'reviews'), {
        userId,
        shopId,
        text,
        createdAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('리뷰 추가 실패:', error);
      throw error;
    }
  },

  // 점포별 리뷰 가져오기
  getReviewsByShop: (shopId: string, callback: (reviews: any[]) => void) => {
    const q = query(
      collection(db, 'reviews'),
      where('shopId', '==', shopId),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const reviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }));
      callback(reviews);
    });
  },

  // 스탬프 업데이트
  updateStamps: async (userId: string, count: number) => {
    try {
      const badges = [];
      if (count >= 5) badges.push({ type: 'bronze', threshold: 5, earnedAt: Timestamp.now() });
      if (count >= 10) badges.push({ type: 'silver', threshold: 10, earnedAt: Timestamp.now() });
      if (count >= 20) badges.push({ type: 'gold', threshold: 20, earnedAt: Timestamp.now() });
      if (count >= 50) badges.push({ type: 'platinum', threshold: 50, earnedAt: Timestamp.now() });

      await setDoc(doc(db, 'stamps', userId), {
        userId,
        count,
        badges,
        updatedAt: Timestamp.now(),
      }, { merge: true });
    } catch (error) {
      console.error('스탬프 업데이트 실패:', error);
      throw error;
    }
  },

  // 사용자 스탬프 가져오기
  getUserStamps: async (userId: string) => {
    try {
      const docSnap = await getDoc(doc(db, 'stamps', userId));
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return { count: 0, badges: [] };
    } catch (error) {
      console.error('스탬프 가져오기 실패:', error);
      return { count: 0, badges: [] };
    }
  },

  // 사용자 리뷰 수 계산
  countUserReviews: async (userId: string): Promise<number> => {
    try {
      const q = query(collection(db, 'reviews'), where('userId', '==', userId));
      const snapshot = await getDocs(q);
      return snapshot.size;
    } catch (error) {
      console.error('리뷰 수 계산 실패:', error);
      return 0;
    }
  },
};
