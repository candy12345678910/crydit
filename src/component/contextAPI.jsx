import { createContext, useState } from "react";

export const Mycontext=createContext(null)
export const ContextProvider=({children})=>{
    const [firstCoinIndex, setFirstCoinIndex]=useState(0)
    const [secondCoinIndex, setsecondCoinIndex]=useState(1)
    return(
        <Mycontext.Provider value={{ firstCoinIndex, secondCoinIndex, setFirstCoinIndex, setsecondCoinIndex }}>
            {children}
        </Mycontext.Provider>
    )
}