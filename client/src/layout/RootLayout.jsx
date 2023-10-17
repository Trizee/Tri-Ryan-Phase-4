import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function RootLayout({setUser, user, handleLogout}) {
    let location = useLocation()
    console.log(location)
    return (
        <div>
            <header>
                {/* {location.pathname === "/"? null :<Navbar setUser={setUser} user={user} handleLogout={handleLogout}/>} */}
                <Navbar setUser={setUser} user={user} handleLogout={handleLogout}/>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
