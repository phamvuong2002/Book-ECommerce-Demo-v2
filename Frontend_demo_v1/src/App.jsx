import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
// import { isLogin } from './auth/checkAuth.auth'
import { useEffect, useState } from 'react'

function App() {
  const [username, setUsername] = useState('Account')
  const [session, setSession] = useState('')

  useEffect(() => {
    const fetchUserAuth = async () => {
      try {
        const url = '/api/v1/api/access/get-session'
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_X_API_VERSION_KEY,
          },
          credentials: 'include',
          // body: JSON.stringify(data),
        });
        if (!res.ok) return

        const data = await res.json()
        console.log(data)
        // setSession(data.isValid)
        localStorage.setItem('session', data.isvalid);
        setUsername(data.username?.name || "GUEST")
      } catch (error) {
        console.log('There was an error fetch auth', error.message)
        return
      }
    }
    fetchUserAuth()
  }, [])

  return (
    <>
      <Navbar username={username} />
      <Outlet />
    </>
  )
}

export default App
