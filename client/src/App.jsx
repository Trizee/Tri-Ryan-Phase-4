import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'

function App() {
  const [user, setUser] = useState(null)

  useEffect(()=>{
    fetch('/api/check_session')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setUser(data)}
      )
  },[])

  function handleLogout(){
    fetch("/api/logout",{
      method: 'DELETE'
    })
    setUser(null)
  }

  return (
    <>
    <button onClick={handleLogout}>Logout</button>
    {user?.username ? 
    <p>{user.username}</p>
    :
    <p>User doesn't exist</p>
    }
    <div>
      <Login setUser={setUser}/>

    </div>
    </>
  )
}

export default App
