import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const CreateTask = () => {

    const [userData, setUserData, refreshData] = useContext(AuthContext)

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState(new Date().toISOString().split('T')[0])
    const [asignTo, setAsignTo] = useState('')
    const [category, setCategory] = useState('')

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Create the new task object
        const newTask = { 
            taskTitle, 
            taskDescription, 
            taskDate, 
            category, 
            active: false, 
            newTask: true, 
            failed: false, 
            completed: false 
        }

        // Find the employee to assign the task to
        const employeeIndex = userData.findIndex(emp => emp.firstName === asignTo)
        
        if (employeeIndex === -1) {
            alert('Employee not found! Please select a valid employee from the dropdown.')
            setIsSubmitting(false)
            return
        }

        // Create a copy of userData to avoid direct mutation
        const updatedUserData = [...userData]
        
        // Add the task to the employee's task list
        updatedUserData[employeeIndex].tasks.push(newTask)
        
        // Update the task count
        updatedUserData[employeeIndex].taskCounts.newTask += 1

        // Update the context with the new data
        setUserData(updatedUserData)

        // Save to localStorage
        localStorage.setItem('employees', JSON.stringify(updatedUserData))

        // Show success message
        setSuccessMessage(`Task "${taskTitle}" has been assigned to ${asignTo} successfully!`)
        
        // Clear form
        setTaskTitle('')
        setCategory('')
        setAsignTo('')
        setTaskDate('')
        setTaskDescription('')
        
        setIsSubmitting(false)

        // Hide success message after 3 seconds
        setTimeout(() => {
            setSuccessMessage('')
        }, 3000)

        console.log('Task assigned successfully:', newTask)
    }

    return (
        <div className='glass rounded-2xl p-6 card-hover'>
            <div className='mb-6'>
                <h2 className='text-2xl font-bold text-white mb-2'>Create New Task</h2>
                <p className='text-gray-400 text-sm'>Assign tasks to your team members</p>
            </div>
            
            {/* Success Message */}
            {successMessage && (
                <div className='mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl'>
                    <div className='flex items-center space-x-2'>
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className='text-green-400 font-medium'>{successMessage}</p>
                    </div>
                </div>
            )}
            <form onSubmit={(e) => {
                submitHandler(e)
            }}
                className='space-y-6'
            >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-4'>
                        <div>
                            <label className='text-sm font-medium text-gray-300 block mb-2'>Task Title</label>
                            <input
                                value={taskTitle}
                                onChange={(e) => {
                                    setTaskTitle(e.target.value)
                                }}
                                className='w-full text-white py-3 px-4 rounded-xl outline-none bg-white/10 border border-emerald-500/30 focus:border-emerald-400 focus:bg-white/20' 
                                type="text" 
                                placeholder='Make a UI design'
                                required
                            />
                        </div>
                        <div>
                            <label className='text-sm font-medium text-gray-300 block mb-2'>Due Date</label>
                            <input
                                value={taskDate}
                                onChange={(e) => {
                                    setTaskDate(e.target.value)
                                }}
                                className='w-full text-white py-3 px-4 rounded-xl outline-none bg-white/10 border border-emerald-500/30 focus:border-emerald-400 focus:bg-white/20' 
                                type="date" 
                                required
                            />
                        </div>
                        <div>
                            <label className='text-sm font-medium text-gray-300 block mb-2'>Assign To</label>
                            <select
                                value={asignTo}
                                onChange={(e) => {
                                    setAsignTo(e.target.value)
                                }}
                                className='w-full text-white py-3 px-4 rounded-xl outline-none bg-white/10 border border-emerald-500/30 focus:border-emerald-400 focus:bg-white/20' 
                                required
                            >
                                <option value="" className='bg-gray-800 text-white'>Select an employee</option>
                                {userData && userData.map((employee, index) => (
                                    <option key={index} value={employee.firstName} className='bg-gray-800 text-white'>
                                        {employee.firstName} ({employee.email})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className='text-sm font-medium text-gray-300 block mb-2'>Category</label>
                            <input
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value)
                                }}
                                className='w-full text-white py-3 px-4 rounded-xl outline-none bg-white/10 border border-emerald-500/30 focus:border-emerald-400 focus:bg-white/20' 
                                type="text" 
                                placeholder='Design, Development, etc'
                                required
                            />
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <div>
                            <label className='text-sm font-medium text-gray-300 block mb-2'>Description</label>
                            <textarea 
                                value={taskDescription}
                                onChange={(e) => {
                                    setTaskDescription(e.target.value)
                                }} 
                                className='w-full text-white h-40 py-3 px-4 rounded-xl outline-none bg-white/10 border border-emerald-500/30 focus:border-emerald-400 focus:bg-white/20 resize-none' 
                                placeholder='Describe the task details...'
                                required
                            />
                        </div>
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 px-6 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg ${
                                isSubmitting 
                                    ? 'bg-gray-500 cursor-not-allowed' 
                                    : 'bg-emerald-500 hover:bg-emerald-600 hover:scale-105 hover:shadow-emerald-500/25'
                            }`}
                        >
                            {isSubmitting ? (
                                <div className='flex items-center justify-center space-x-2'>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Creating Task...</span>
                                </div>
                            ) : (
                                'Create Task'
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateTask;