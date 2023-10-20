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

import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Caro from './components/Carousel';
import Event from './components/Pages/MyEvents';
import Featured from './components/Pages/Featured';
import Landing from './components/Pages/Landing';
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
  const [eventData,setEventData] = useState([])

  useEffect(()=>{
      fetch('/api/events')
      .then(response => response.json())
      .then(data => {setEvent(data),setEventData(data)})
    },[])


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout setUser={setUser} user={user} handleLogout={handleLogout} event={event} setEvent={setEvent} eventData={eventData} setEventData={setEventData}/>}>
        <Route index element = {<Landing />}/>
        <Route path='/login' element={<Login setUser={setUser}/>} />
        <Route path='/signup' element={<Signup setUser={setUser}/>} />
        <Route path='/event' element={<Event setUser={setUser} event={event} eventData={eventData} setEventData={setEventData} user={user} setEvent={setEvent}/>}/>
        <Route path='/featured' element={<Featured/>}/>
        <Route path='/allevents' element={<AllEvents event={event} user={user}/>}/>
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
