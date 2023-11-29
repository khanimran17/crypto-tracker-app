import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

const Crypto = createContext()

const CryptoContext = ({children}) => {
    const [symbol, setSymbol] = useState('₹')
    const [currency, setCurrency] = useState('INR')

    useEffect(() => {
        if (currency === "INR") setSymbol('₹')
        if (currency === "USD") setSymbol('$')
    }, [currency])


    return (
        <Crypto.Provider value={{ symbol, currency, setSymbol, setCurrency }}>
            {children}
        </Crypto.Provider>
    )
}



export default CryptoContext

export const CryptoState = () => {
    return useContext(Crypto)
}
