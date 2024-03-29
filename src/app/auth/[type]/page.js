'use client';
import React, { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import LoginComponent from '@/components/auth/LoginComponent';
import RegisterComponent from '@/components/auth/RegisterComponent';

const AuthPage = () => {
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useParams()
    const type = searchParams.type

    useEffect(() => {
        const url = `${pathname}?${searchParams}`
        // You can now use the current URL
      }, [pathname, searchParams])
  
    return (
      <div className="h-screen w-screen overflow-hidden bg-[#3d3c3c]" >{/* style={{background: 'linear-gradient(121.07deg, #1E266C -3.48%, #01003D 101.18%)'}} */}
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
