'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import LoginComponent from '@/components/auth/LoginComponent';
import RegisterComponent from '@/components/auth/RegisterComponent';

const AuthPage = () => {
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const type = searchParams.get('type')

  
    useEffect(() => {
        const url = `${pathname}?${searchParams}`
        console.log(url)
        console.log(type)
        // You can now use the current URL
      }, [pathname, searchParams])
  
    return (
      <div>
        {type === 'login' ? (
          <LoginComponent />
        ) : type === 'register' ? (
          <RegisterComponent />
        ) : (
          <div>
            {/* Default content if no type is specified */}
            <h2>Please specify a valid type in the URL</h2>
          </div>
        )}
      </div>
    );
  };
  
  export default AuthPage;
