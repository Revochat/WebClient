
import React, { useState } from 'react';
import Footer from '../public/components/Footer';
import NavBar from '../public/components/NavBar';
import HomePage from './HomePage';
import Home from '../public/components/Home';
import {Context} from './Context'
import AppPage from './AppPage'

const Index = () => {

  const [Auth, setAuth] = useState(false);
  const [wallet, setWallet] = useState();
  return (
    <Context.Provider value={[wallet, setWallet]}>
        
          {/* <HomePage/> */}
          {wallet? 
            <AppPage/>

             :<>
             <HomePage/>
                {/* <NavBar/>
                <Home/>
                <Footer/> */}

                <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
                <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
              </>
      }
    </Context.Provider>
  );
}

export default Index;
