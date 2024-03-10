import React, {  createContext, useState } from 'react';

export const loginContext = createContext("");

const Context = ({children}) => {

    const [loginData, setloginData] = useState("");

  return (
    <>
    <loginContext.Provider value={{loginData,setloginData}}>
        {children}
    </loginContext.Provider>
    </>
  )
}

export default Context