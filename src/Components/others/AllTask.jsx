import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = () => {
   const [userData, setUserData, refreshData] = useContext(AuthContext)

   // Force refresh when component mounts or userData changes
   useEffect(() => {
       if (userData) {
           console.log('AllTask: userData updated', userData)
       }
   }, [userData])

   
  return (
    <div className='glass rounded-2xl p-6 card-hover'>
        <div className='mb-6 flex justify-between items-center'>
            <div>
                <h2 className='text-2xl font-bold text-white mb-2'>Team Overview</h2>
                <p className='text-gray-400 text-sm'>Task distribution across team members</p>
            </div>
            <button 
                onClick={refreshData}
                className='bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/25 flex items-center space-x-2'
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh</span>
            </button>
        </div>
        <div className='overflow-x-auto'>
            <div className='min-w-full'>
                {/* Header */}
                <div className='bg-gradient-to-r from-emerald-500 to-emerald-600 mb-4 py-4 px-6 flex justify-between rounded-xl'>
                    <h3 className='text-white text-center font-semibold w-1/5 text-sm md:text-base'>Employee</h3>
                    <h3 className='text-white text-center font-semibold w-1/5 text-sm md:text-base'>New Tasks</h3>
                    <h3 className='text-white text-center font-semibold w-1/5 text-sm md:text-base'>Active</h3>
                    <h3 className='text-white text-center font-semibold w-1/5 text-sm md:text-base'>Completed</h3>
                    <h3 className='text-white text-center font-semibold w-1/5 text-sm md:text-base'>Failed</h3>
                </div>
                
                {/* Data Rows */}
                <div className='space-y-3 max-h-80 overflow-y-auto'>
                    {userData.map(function(elem, idx) {
                        return (
                            <div key={idx} className='bg-white/5 border border-emerald-500/20 py-4 px-6 flex justify-between rounded-xl hover:bg-white/10 transition-all duration-300'>
                                <div className='text-white text-center font-medium w-1/5 text-sm md:text-base flex items-center justify-center'>
                                    <div className='w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mr-2'>
                                        <span className='text-white font-bold text-xs'>
                                            {elem.firstName.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className='hidden sm:block'>{elem.firstName}</span>
                                </div>
                                <div className='text-blue-400 text-center font-semibold w-1/5 text-sm md:text-base flex items-center justify-center'>
                                    <span className='bg-blue-500/20 px-2 py-1 rounded-full text-xs'>{elem.taskCounts.newTask}</span>
                                </div>
                                <div className='text-yellow-400 text-center font-semibold w-1/5 text-sm md:text-base flex items-center justify-center'>
                                    <span className='bg-yellow-500/20 px-2 py-1 rounded-full text-xs'>{elem.taskCounts.active}</span>
                                </div>
                                <div className='text-green-400 text-center font-semibold w-1/5 text-sm md:text-base flex items-center justify-center'>
                                    <span className='bg-green-500/20 px-2 py-1 rounded-full text-xs'>{elem.taskCounts.completed}</span>
                                </div>
                                <div className='text-red-400 text-center font-semibold w-1/5 text-sm md:text-base flex items-center justify-center'>
                                    <span className='bg-red-500/20 px-2 py-1 rounded-full text-xs'>{elem.taskCounts.failed}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default AllTask