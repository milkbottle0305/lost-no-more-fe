import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '@/styles/globals.css';

import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const nanumSquare = localFont({
  src: [
    {
      path: '../../public/fonts/NanumSquareL.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NanumSquareR.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NanumSquareB.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NanumSquareEB.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-cid="html-yIFOlF">
      <body
        data-cid="body-jF5a4r"
        className={nanumSquare.className}
      >
        <Providers data-cid="Providers-dV3aUe">{children}</Providers>
      </body>
    </html>
  );
}
