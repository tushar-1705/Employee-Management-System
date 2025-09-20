import React from 'react'

const TaskListNumbers = ({data}) => {
  if (!data || !data.taskCounts) {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
        <div className='glass rounded-2xl p-6 card-hover bg-gradient-to-br from-gray-500/20 to-gray-600/20 border border-gray-500/30'>
          <div className='flex items-center justify-center'>
            <h3 className='text-lg font-medium text-gray-400'>Loading...</h3>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
        <div className='glass rounded-2xl p-6 card-hover bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30'>
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='text-3xl md:text-4xl font-bold text-blue-400'>{data.taskCounts.newTask || 0}</h2>
                    <h3 className='text-sm md:text-base font-medium text-gray-300 mt-1'>New Tasks</h3>
                </div>
                <div className='w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center'>
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </div>
            </div>
        </div>
        
        <div className='glass rounded-2xl p-6 card-hover bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30'>
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='text-3xl md:text-4xl font-bold text-green-400'>{data.taskCounts.completed || 0}</h2>
                    <h3 className='text-sm md:text-base font-medium text-gray-300 mt-1'>Completed</h3>
                </div>
                <div className='w-12 h-12 bg-green-500/30 rounded-xl flex items-center justify-center'>
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>
        </div>
        
        <div className='glass rounded-2xl p-6 card-hover bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30'>
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='text-3xl md:text-4xl font-bold text-yellow-400'>{data.taskCounts.active || 0}</h2>
                    <h3 className='text-sm md:text-base font-medium text-gray-300 mt-1'>Active</h3>
                </div>
                <div className='w-12 h-12 bg-yellow-500/30 rounded-xl flex items-center justify-center'>
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>
        </div>
        
        <div className='glass rounded-2xl p-6 card-hover bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30'>
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='text-3xl md:text-4xl font-bold text-red-400'>{data.taskCounts.failed || 0}</h2>
                    <h3 className='text-sm md:text-base font-medium text-gray-300 mt-1'>Failed</h3>
                </div>
                <div className='w-12 h-12 bg-red-500/30 rounded-xl flex items-center justify-center'>
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TaskListNumbers