import '../styles/globals.scss'
import '../styles/footer.scss'
import '../styles/navbar.scss'
import '../styles/home.scss'
import '../styles/sidebar.scss'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "../styles/input.css"

import { RevochatProvider } from '../public/context/context'
import { useRouter } from 'next/router'

import React from 'react';

export const Context = React.createContext();


function MyApp({ Component, pageProps }) {
  return (
    <RevochatProvider>
      <Component {...pageProps} />
    </RevochatProvider>
  )
}

export default MyApp
