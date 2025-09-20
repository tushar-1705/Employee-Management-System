import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import TaskListNumbers from '../others/TaskListNumber'
import TaskList from '../TaskList/TaskList'
import Header from '../others/Header'

const EmployeeDashboard = (props) => {
    const [userData, setUserData, refreshData] = useContext(AuthContext)
    const [currentEmployee, setCurrentEmployee] = useState(props.data)

    // Update current employee data when userData changes
    useEffect(() => {
        console.log('EmployeeDashboard useEffect triggered:', { userData, propsData: props.data })
        if (userData && props.data) {
            const updatedEmployee = userData.find(emp => emp.firstName === props.data.firstName)
            console.log('Found updated employee:', updatedEmployee)
            if (updatedEmployee) {
                setCurrentEmployee(updatedEmployee)
            }
        }
    }, [userData, props.data])

    console.log('EmployeeDashboard rendered:', { 
        currentEmployee, 
        propsData: props.data, 
        userData 
    })

    return (
        <div className='min-h-screen w-full p-4 md:p-6 lg:p-8'>
            <div className='max-w-7xl mx-auto space-y-6'>
                <Header changeUser={props.changeUser} data={currentEmployee} />
                <div className='flex justify-between items-center'>
                    <div></div>
                    <button 
                        onClick={() => {
                            console.log('Manual refresh clicked')
                            refreshData()
                        }}
                        className='bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/25 flex items-center space-x-2'
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Refresh Tasks</span>
                    </button>
                </div>
                <TaskListNumbers data={currentEmployee} />
                <TaskList data={currentEmployee} />
            </div>
        </div>
    )
}

export default EmployeeDashboard;