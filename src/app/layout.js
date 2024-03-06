'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { RevochatProvider } from '@/context/context';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Revochat',
//   description: 'Chat with your friends and family with Revochat!',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <RevochatProvider>
            {children}
          </RevochatProvider>
      </body>
    </html>
  )
}
