import React from 'react';

const AlertMessage = ({children, type}) => {
    return (
        <div className='font-bold rounded-md px-4 w-96 py-2' style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', backgroundColor: type=='success'? 'green': 'red'  }}>
       {children}
       </div>
    );
}

export default AlertMessage;
