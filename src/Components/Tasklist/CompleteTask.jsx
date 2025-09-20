import React from 'react'

const CompleteTask = ({data}) => {
  return (
    <div className='flex-shrink-0 w-80 p-6 glass rounded-2xl card-hover border border-green-500/30 bg-gradient-to-br from-green-500/10 to-green-600/10'>
        <div className='flex justify-between items-center mb-4'>
            <span className='bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full border border-green-500/30'>
                {data.category}
            </span>
            <span className='text-gray-400 text-xs font-medium'>
                {new Date(data.taskDate).toLocaleDateString()}
            </span>
        </div>
        
        <h2 className='text-xl font-bold text-white mb-3 line-clamp-2'>{data.taskTitle}</h2>
        
        <p className='text-gray-300 text-sm mb-6 line-clamp-3 leading-relaxed'>
            {data.taskDescription}
        </p>
        
        <div className='flex justify-between items-center'>
            <div className='flex items-center space-x-2'>
                <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                <span className='text-green-400 text-xs font-medium'>Completed</span>
            </div>
            <div className='flex items-center space-x-1'>
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className='text-green-400 text-xs font-semibold'>Done</span>
            </div>
        </div>
    </div>
  )
}

export default CompleteTask