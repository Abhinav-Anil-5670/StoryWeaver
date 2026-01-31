import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLanding = location.pathname === '/';

    return (
        <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    S
                </div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">StoryWeaver</h1>
            </div>

            <div className="flex items-center gap-4">
                {isLanding ? (
                    <>
                        <button onClick={() => navigate('/login')} className="text-slate-600 font-medium text-sm hover:text-slate-900">Sign In</button>
                        <button onClick={() => navigate('/signup')} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-6 rounded-full text-sm transition-all shadow-md">
                            Get Started
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate('/dashboard')} className="text-slate-600 font-medium text-sm hover:text-sky-600">Dashboard</button>
                        <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-bold text-xs border border-sky-200">
                            AB
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
