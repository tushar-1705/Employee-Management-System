import React, { useContext, useEffect, useState } from 'react'
import Login from './Components/Auth/login.jsx'
import EmployeeDashboard from './Components/Dashboard/EmployeeDashboard.jsx'
import AdminDashboard from './Components/Dashboard/AdminDashboard.jsx'
import { AuthContext } from './Context/AuthProvider.jsx'

const App = () => {

  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [userData, setUserData] = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    const loggedInUser = localStorage.getItem('loggedInUser')
    
    if(loggedInUser && loggedInUser !== 'null' && loggedInUser !== '""'){
      try {
        const userData = JSON.parse(loggedInUser)
        console.log('Found logged in user:', userData)
        setUser(userData.role)
        setLoggedInUserData(userData.data)
      } catch (error) {
        console.error('Error parsing logged in user data:', error)
        localStorage.removeItem('loggedInUser')
      }
    }
    
    // Set loading to false after checking for existing login
    setIsLoading(false)
  },[])

  // Update employee data when userData changes
  useEffect(() => {
    if (user === 'employee' && userData && loggedInUserData) {
      const updatedEmployee = userData.find(emp => emp.firstName === loggedInUserData.firstName)
      if (updatedEmployee) {
        setLoggedInUserData(updatedEmployee)
        // Update localStorage with fresh data
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: updatedEmployee }))
      }
    }
  }, [userData, user, loggedInUserData])


  const handleLogin = (email, password) => {
    if (email == 'admin@me.com' && password == '123') {
      setUser('admin')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
    } else if (userData) {
      const employee = userData.find((e) => email == e.email && e.password == password)
      if (employee) {
        setUser('employee')
        setLoggedInUserData(employee)
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee',data:employee }))
      }
    }
    else {
      alert("Invalid Credentials")
    }
  }



  // Show loading screen while checking for existing login
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full">
      {!user ? <Login handleLogin={handleLogin} /> : ''}
      {user == 'admin' ? <AdminDashboard changeUser={setUser} /> : (user == 'employee' ? <EmployeeDashboard changeUser={setUser} data={loggedInUserData} /> : null) }
    </div>
  )
}

export default App