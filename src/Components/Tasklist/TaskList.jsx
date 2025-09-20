import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data }) => {
    const [userData, setUserData, refreshData] = useContext(AuthContext)

    console.log('TaskList rendered with data:', { 
        data, 
        userData, 
        tasksCount: data?.tasks?.length || 0,
        tasks: data?.tasks || []
    })

    const handleTaskUpdate = () => {
        console.log('Task update called, refreshing data...')
        // Force refresh data from localStorage to ensure UI is up to date
        setTimeout(() => {
            refreshData()
        }, 50)
    }

    return (
        <div className='space-y-6'>
            <div className='mb-6'>
                <h2 className='text-2xl font-bold text-white mb-2'>Your Tasks</h2>
                <p className='text-gray-400 text-sm'>Manage and track your assigned tasks</p>
            </div>
            <div id='tasklist' className='overflow-x-auto pb-4'>
                <div className='flex items-start justify-start gap-6 flex-nowrap w-full min-w-max'>
                    {data && data.tasks && data.tasks.map((elem, idx) => {
                        const taskKey = `${elem.taskTitle}-${elem.taskDate}-${elem.category}-${elem.active}-${elem.newTask}-${elem.completed}-${elem.failed}-${idx}`
                        
                        if (elem.active) {
                            return <AcceptTask key={taskKey} data={elem} employeeData={data} onTaskUpdate={handleTaskUpdate} />
                        }
                        if (elem.newTask) {
                            return <NewTask key={taskKey} data={elem} employeeData={data} onTaskUpdate={handleTaskUpdate} />
                        }
                        if (elem.completed) {
                            return <CompleteTask key={taskKey} data={elem} />
                        }
                        if (elem.failed) {
                            return <FailedTask key={taskKey} data={elem} />
                        }
                        return null;
                    })}
                    {(!data || !data.tasks || data.tasks.length === 0) && (
                        <div className='flex-shrink-0 w-80 p-6 glass rounded-2xl border border-gray-500/30 text-center'>
                            <div className='w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className='text-lg font-semibold text-white mb-2'>No Tasks Yet</h3>
                            <p className='text-gray-400 text-sm'>You don't have any tasks assigned at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TaskList