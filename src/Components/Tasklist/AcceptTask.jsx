import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AcceptTask = ({data, employeeData, onTaskUpdate}) => {
    const [userData, setUserData, refreshData] = useContext(AuthContext)
    const [isUpdating, setIsUpdating] = useState(false)

    const handleTaskStatusChange = async (status) => {
        console.log('Task status change button clicked!', { status, data, employeeData, userData })
        
        if (!data) {
            console.log('No data provided')
            return
        }
        
        // Add confirmation dialog
        const action = status === 'completed' ? 'complete' : 'mark as failed'
        const confirmed = window.confirm(`Are you sure you want to ${action} this task?`)
        
        if (!confirmed) {
            console.log('User cancelled task status change')
            return
        }
        
        setIsUpdating(true)
        
        try {
            // Find the employee in the userData array using the employeeData (which is the current employee)
            const employeeIndex = userData.findIndex(emp => emp.firstName === employeeData.firstName)
            
            if (employeeIndex === -1) {
                alert('Employee not found!')
                setIsUpdating(false)
                return
            }

            // Create updated userData array
            const updatedUserData = [...userData]
            
            // Find the specific task in the employee's tasks
            const taskIndex = updatedUserData[employeeIndex].tasks.findIndex(
                task => task.taskTitle === data.taskTitle && 
                       task.taskDate === data.taskDate && 
                       task.category === data.category
            )
            
            if (taskIndex === -1) {
                alert('Task not found!')
                setIsUpdating(false)
                return
            }

            // Update task status based on the action
            const updatedTask = {
                ...updatedUserData[employeeIndex].tasks[taskIndex],
                active: false,
                newTask: false,
                completed: status === 'completed',
                failed: status === 'failed'
            }

            updatedUserData[employeeIndex].tasks[taskIndex] = updatedTask

            // Update task counts
            updatedUserData[employeeIndex].taskCounts.active -= 1
            
            if (status === 'completed') {
                updatedUserData[employeeIndex].taskCounts.completed += 1
            } else if (status === 'failed') {
                updatedUserData[employeeIndex].taskCounts.failed += 1
            }

            // Update context and localStorage
            setUserData(updatedUserData)
            localStorage.setItem('employees', JSON.stringify(updatedUserData))

            // Force a complete refresh of the data
            setTimeout(() => {
                refreshData()
            }, 100)

            // Call the parent component's update function if provided
            if (onTaskUpdate) {
                onTaskUpdate()
            }

            const statusMessage = status === 'completed' ? 'completed' : 'marked as failed'
            alert(`Task ${statusMessage} successfully!`)
            console.log(`Task ${statusMessage} successfully!`, {
                taskTitle: data.taskTitle,
                employee: employeeData.firstName,
                newStatus: status === 'completed' ? 'Completed' : 'Failed'
            })
            
        } catch (error) {
            console.error('Error updating task status:', error)
            alert('Error updating task status. Please try again.')
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <div className='flex-shrink-0 w-80 p-6 glass rounded-2xl card-hover border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10'>
            <div className='flex justify-between items-center mb-4'>
                <span className='bg-yellow-500/20 text-yellow-400 text-xs font-semibold px-3 py-1 rounded-full border border-yellow-500/30'>
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
            
            <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center space-x-2'>
                    <div className='w-2 h-2 bg-yellow-400 rounded-full animate-pulse'></div>
                    <span className='text-yellow-400 text-xs font-medium'>Active Task</span>
                </div>
            </div>
            
            <div className='flex space-x-2'>
                <button 
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        console.log('Mark Complete button clicked!')
                        handleTaskStatusChange('completed')
                    }}
                    disabled={isUpdating}
                    className={`flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-lg text-xs transition-all duration-300 shadow-lg ${
                        isUpdating 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:scale-105 hover:shadow-green-500/25'
                    }`}
                >
                    {isUpdating ? 'Updating...' : 'Mark Complete'}
                </button>
                <button 
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        console.log('Mark Failed button clicked!')
                        handleTaskStatusChange('failed')
                    }}
                    disabled={isUpdating}
                    className={`flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg text-xs transition-all duration-300 shadow-lg ${
                        isUpdating 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:scale-105 hover:shadow-red-500/25'
                    }`}
                >
                    {isUpdating ? 'Updating...' : 'Mark Failed'}
                </button>
            </div>
        </div>
    )
}

export default AcceptTask