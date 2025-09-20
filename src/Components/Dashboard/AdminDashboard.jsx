import React from 'react'
import Header from '../others/Header'
// import CreateTask from '../other/CreateTask'
import CreateTask from '../others/CreateTask'
// import AllTask from '../other/AllTask'
import AllTask from '../others/AllTask'

const AdminDashboard = (props) => {
    return (
        <div className='min-h-screen w-full p-4 md:p-6 lg:p-8'>
            <div className='max-w-7xl mx-auto space-y-6'>
                <Header changeUser={props.changeUser} />
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
                    <div className='xl:col-span-1'>
                        <CreateTask />
                    </div>
                    <div className='xl:col-span-1'>
                        <AllTask />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard