import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuthUser } from '../api';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLanding = location.pathname === '/';
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token && !isLanding) { // Only fetch if we are logged in/not on landing (optimization)
                try {
                    const userData = await getAuthUser();
                    setUser(userData);
                } catch (err) {
                    console.error("Failed to fetch user for navbar", err);
                }
            }
        };

        if (!isLanding) {
            fetchUser();
        }
    }, [isLanding]);

    // Helper to get initials
    const getInitials = (name) => {
        if (!name) return '??';
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <nav className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 transition-colors duration-500">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-sky-500/20">
                    S
                </div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">StoryWeaver</h1>
            </div>

            <div className="flex items-center gap-4">
                {isLanding ? (
                    <>
                        <button onClick={() => navigate('/login')} className="text-slate-600 dark:text-slate-200 font-medium text-sm hover:text-slate-900 dark:hover:text-white transition-colors">Sign In</button>
                        <button onClick={() => navigate('/signup')} className="bg-slate-900 dark:bg-sky-500 hover:bg-slate-800 dark:hover:bg-sky-600 text-white font-bold py-2 px-6 rounded-full text-sm transition-all shadow-md shadow-slate-900/10 dark:shadow-sky-500/20">
                            Get Started
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate('/dashboard')} className="text-slate-600 dark:text-slate-300 font-medium text-sm hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Dashboard</button>
                        <div onClick={() => navigate('/settings')} className="w-8 h-8 bg-sky-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-sky-600 dark:text-sky-400 font-bold text-xs border border-sky-200 dark:border-slate-600 cursor-pointer hover:ring-2 ring-sky-100 transition-all">
                            {user ? getInitials(user.username) : '...'}
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
