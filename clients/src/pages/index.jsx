
import React, { useState } from 'react';
import Footer from '../public/components/Footer';
import NavBar from '../public/components/NavBar';
import HomePage from './HomePage';
import Home from '../public/components/Home';
import AppPage from './AppPage'

const Index = () => {

  const [Auth, setAuth] = useState(false);
  const [wallet, setWallet] = useState();
  return (
    
        <>
        
        
          <HomePage/>
          {/* {wallet? 
            <AppPage/>

             :<>
             <HomePage/>
                {/* <NavBar/>
                <Home/>
                <Footer/> */} 

              {/* </> */}
           {/* } */}
           </>
    
  );
}

export default Index;
