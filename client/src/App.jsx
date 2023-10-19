import { useEffect, useState } from 'react'
import './App.css'
import RootLayout from './layout/RootLayout';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Link,
} from "react-router-dom";
import Landing from "./components/Landing";

import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Caro from './components/Carousel';
import Event from './components/Pages/MyEvents';
import Featured from './components/Pages/Featured';
import AllEvents from './components/Pages/AllEvents';

function App() {
  const [user, setUser] = useState(null)

  useEffect(()=>{
    fetch('/api/check_session')
    .then(response => response.json())
    .then(data => {
      if (data.username){
        setUser(data)
      }}
      )
  },[])

  function handleLogout(){
    fetch("/api/logout",{
      method: 'DELETE'
    })
    setUser(null)
  }

  const [event,setEvent] = useState([])

  useEffect(()=>{
      fetch('/api/events')
      .then(response => response.json())
      .then(data => setEvent(data))
    },[])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout setUser={setUser} user={user} handleLogout={handleLogout} event={event} setEvent={setEvent}/>}>
        <Route index element = {<Landing/>}/>
        <Route path='/login' element={<Login setUser={setUser}/>} />
        <Route path='/signup' element={<Signup setUser={setUser}/>} />
        <Route path='/event' element={<Event setUser={setUser} event={event} setEvent={setEvent}/>}/>
        <Route path='/featured' element={<Featured/>}/>
        <Route path='allEvents' element={<AllEvents/>}/>
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
