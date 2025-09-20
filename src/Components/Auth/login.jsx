
import React, { useState } from 'react'

const Login = ({handleLogin}) => {

    

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const submitHandler = (e)=>{
        e.preventDefault()
        handleLogin(email,password)
        setEmail("")
        setPassword("")
    }


  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4'>
        <div className='glass rounded-2xl p-8 md:p-12 w-full max-w-md card-hover'>
            <div className='text-center mb-8'>
                <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>Welcome Back</h1>
                <p className='text-gray-300 text-sm md:text-base'>Sign in to your account</p>
            </div>
            <form 
            onSubmit={(e)=>{
                submitHandler(e)
            }}
            className='flex flex-col space-y-6'
            >
                <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-300 block'>Email Address</label>
                    <input 
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                    required 
                    className='w-full outline-none text-white bg-white/10 border border-emerald-500/30 font-medium text-base py-3 px-4 rounded-xl placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white/20' 
                    type="email" 
                    placeholder='Enter your email' 
                    />
                </div>
                <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-300 block'>Password</label>
                    <input
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    required 
                    className='w-full outline-none text-white bg-white/10 border border-emerald-500/30 font-medium text-base py-3 px-4 rounded-xl placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white/20' 
                    type="password" 
                    placeholder='Enter password' 
                    />
                </div>
                <button className='mt-4 text-white border-none outline-none hover:bg-emerald-600 hover:scale-105 font-semibold bg-emerald-500 text-base py-3 px-6 w-full rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25'>
                    Sign In
                </button>
            </form>
            <div className='mt-6 text-center'>
                <p className='text-xs text-gray-400'>
                    Demo credentials: admin@me.com / 123
                </p>
            </div>
        </div>
    </div>
  )
}

export default Login
