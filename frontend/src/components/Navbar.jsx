import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="w-full bg-white border-b border-slate-100 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 shadow-sm">
            <div
                onClick={() => navigate('/')}
                className="flex items-center gap-2 cursor-pointer"
            >
                <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    S
                </div>
                <span className="text-xl font-bold text-slate-800 tracking-tight">StoryWeaver</span>
            </div>

            <div className="hidden md:flex items-center gap-8 font-medium text-slate-500 text-sm">
                <a href="#" className="hover:text-sky-600 transition-colors">Home</a>
                <a href="#" className="hover:text-sky-600 transition-colors">Write</a>
                <a href="#" className="hover:text-sky-600 transition-colors">Read</a>
                <a href="#" className="hover:text-sky-600 transition-colors">Pricing</a>
            </div>

            <div className="flex items-center gap-4">
                <button className="text-slate-600 font-medium text-sm hover:text-slate-900">Sign In</button>
                <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-6 rounded-full text-sm transition-all shadow-md shadow-sky-200">
                    Sign Up
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
