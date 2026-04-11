/** @format */

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StoreProvider from './components/StoreProvider';
import RouteGuard from './components/RouteGuard';
import { HeroUIProvider } from '@heroui/system';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Velofolio',
  description: 'Photography CRM',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <HeroUIProvider>
          <ToastContainer />
          <RouteGuard>
            <StoreProvider>
              {children}
            </StoreProvider>
          </RouteGuard>
        </HeroUIProvider>
      </body>
    </html>
  );
}
