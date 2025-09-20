import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    // localStorage.clear()

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        setLocalStorage()
        const {employees} = getLocalStorage()
        setUserData(employees)
    }, [])

    // Function to refresh data from localStorage
    const refreshData = () => {
        const {employees} = getLocalStorage()
        setUserData(employees)
    }

    return (
        <div>
            <AuthContext.Provider value={[userData, setUserData, refreshData]}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider