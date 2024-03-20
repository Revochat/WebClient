import { Inter } from 'next/font/google';
import './globals.css';
import { RevochatProvider } from '@/context/context';
import React from 'react';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Revochat',
  description: 'Chat with your friends and family with Revochat!',
}

export default function RootLayout({ children }) {
  return (
    <RevochatProvider>
      <html lang="en">
        <body className={inter.className}>
             <main>
              {children}
             </main> 
            <Toaster />
        </body>
      </html>
    </RevochatProvider>
  )
}
