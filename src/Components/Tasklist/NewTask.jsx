import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const NewTask = ({data, employeeData, onTaskUpdate}) => {
    const [userData, setUserData, refreshData] = useContext(AuthContext)
    const [isAccepting, setIsAccepting] = useState(false)

    const handleAcceptTask = async () => {
        console.log('Accept task button clicked!', { data, employeeData, userData })
        
        if (!data) {
            console.log('No data provided')
            return
        }
        
        // Add confirmation dialog
        const confirmed = window.confirm(`Are you sure you want to accept this task: "${data.taskTitle}"?`)
        
        if (!confirmed) {
            console.log('User cancelled task acceptance')
            return
        }
        
        setIsAccepting(true)
        
        try {
            // Find the employee in the userData array using the employeeData (which is the current employee)
            const employeeIndex = userData.findIndex(emp => emp.firstName === employeeData.firstName)
            
            if (employeeIndex === -1) {
                alert('Employee not found!')
                setIsAccepting(false)
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
                setIsAccepting(false)
                return
            }

            // Update task status: from newTask to active
            updatedUserData[employeeIndex].tasks[taskIndex] = {
                ...updatedUserData[employeeIndex].tasks[taskIndex],
                newTask: false,
                active: true,
                completed: false,
                failed: false
            }

            // Update task counts
            updatedUserData[employeeIndex].taskCounts.newTask -= 1
            updatedUserData[employeeIndex].taskCounts.active += 1

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

            // Show success message
            alert('Task accepted successfully! You can now work on it.')
            console.log('Task accepted successfully!', {
                taskTitle: data.taskTitle,
                employee: employeeData.firstName,
                newStatus: 'Active'
            })
            
        } catch (error) {
            console.error('Error accepting task:', error)
            alert('Error accepting task. Please try again.')
        } finally {
            setIsAccepting(false)
        }
    }

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
                    <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                    <span className='text-green-400 text-xs font-medium'>New Task</span>
                </div>
                <button 
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        console.log('Accept Task button clicked!')
                        handleAcceptTask()
                    }}
                    disabled={isAccepting}
                    className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-xs transition-all duration-300 shadow-lg ${
                        isAccepting 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:scale-105 hover:shadow-blue-500/25'
                    }`}
                >
                    {isAccepting ? 'Accepting...' : 'Accept Task'}
                </button>
            </div>
        </div>
    )
}

export default NewTask