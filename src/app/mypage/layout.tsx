import type { Metadata } from 'next';
import '@/styles/globals.css';
import RootLayout from '@/app/layout';

export const metadata: Metadata = {
  title: '마이페이지 - 잃.없.다',
  description: '사용자님의 개인 설정 및 알림을 관리할 수 있는 마이페이지입니다.',
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayout data-cid="RootLayout-xWayzS">{children}</RootLayout>;
}
