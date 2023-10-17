import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function RootLayout({setUser, user}) {
    return (
        <div>
            <header>
                <Navbar setUser={setUser} user={user}/>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
