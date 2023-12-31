import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function RootLayout({setUser, user, handleLogout,event, setEvent, eventData,setEventData}) {
    let location = useLocation()
    return (
        <div>
            <header>
                {location.pathname === "/login" || location.pathname === "/signup"? null :<Navbar setUser={setUser} user={user} handleLogout={handleLogout} event={event} setEvent={setEvent} eventData={eventData} setEventData={setEventData}/>}
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
            {location.pathname === "/login" || location.pathname === "/signup"? null :<Footer />}
            </footer>
        </div>
    );
}
