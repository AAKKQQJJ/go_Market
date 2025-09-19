import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '../components/Header'; // 수정: Header 컴포넌트 import
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '시장에 가면 - 전통시장 탐방 서비스',
  description: '전통시장의 상점들을 찾아보고 리뷰를 남겨 스탬프를 모아보세요',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <script
          type="text/javascript"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
          async
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <Header /> {/* 수정: Header 컴포넌트 사용 */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
