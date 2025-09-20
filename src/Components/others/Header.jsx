import React, { useState } from 'react'
import { setLocalStorage } from '../../utils/localStorage'

const Header = (props) => {

  // const [username, setUsername] = useState('')

  // if(!data){
  //   setUsername('Admin')
  // }else{
  //   setUsername(data.firstName)
  // }

  const logOutUser = ()=>{
    console.log('Logging out user...')
    localStorage.removeItem('loggedInUser')
    props.changeUser('')
    // Optional: reload the page to ensure clean state
    // window.location.reload()
  }

  
  const username = props.data ? props.data.firstName : 'Admin';
  const userRole = props.data ? 'Employee' : 'Administrator';

  return (
    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6'>
        <div className='flex items-center space-x-4'>
            <div className='w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center'>
                <span className='text-white font-bold text-lg'>
                    {username.charAt(0).toUpperCase()}
                </span>
            </div>
            <div>
                <h1 className='text-xl sm:text-2xl text-white font-medium'>
                    Hello, <span className='text-emerald-400 font-semibold'>{username}</span> 👋
                </h1>
                <p className='text-sm text-gray-400'>{userRole}</p>
            </div>
        </div>
        <button 
            onClick={logOutUser} 
            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/25 flex items-center space-x-2'
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Log Out</span>
        </button>
    </div>
  )
}

export default Header