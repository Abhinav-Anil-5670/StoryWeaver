import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    // Mock User Data (Replace with API call later)
    const [user, setUser] = useState({
        name: "Abhinav Anil",
        email: "abhinav@example.com",
        avatar: "https://ui-avatars.com/api/?name=Abhinav+Anil&background=0ea5e9&color=fff"
    });

    const isDark = theme === 'dark';

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-slate-900 text-slate-100' : 'bg-[#eef2f6] text-slate-800'}`}>
            <div className="max-w-4xl mx-auto p-6 pt-10">
                <h1 className="text-3xl font-bold font-display mb-8">Settings</h1>

                <div className="grid gap-8">
                    {/* Profile Section */}
                    <div className={`p-8 rounded-3xl shadow-sm border transition-colors ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <div className="bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 p-2 rounded-lg">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </div>
                            Profile
                        </h2>

                        <div className="flex items-center gap-6 mb-8">
                            <img src={user.avatar} alt="Profile" className="w-20 h-20 rounded-full shadow-md ring-4 ring-sky-50 dark:ring-slate-700" />
                            <div>
                                <h3 className="text-2xl font-bold">{user.name}</h3>
                                <p className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{user.email}</p>
                            </div>
                            <button className="ml-auto px-4 py-2 text-sm font-semibold text-sky-500 hover:bg-sky-50 dark:hover:bg-slate-700 rounded-lg transition-colors border border-transparent hover:border-sky-100">
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Preferences / Appearance */}
                    <div className={`p-8 rounded-3xl shadow-sm border transition-colors ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-2 rounded-lg">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                            </div>
                            Appearance
                        </h2>

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-lg mb-1">Dark Mode</h3>
                                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Switch between light and dark themes for a comfortable reading experience.
                                </p>
                            </div>

                            {/* Toggle Switch */}
                            <button
                                onClick={toggleTheme}
                                className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 ${isDark ? 'bg-sky-500' : 'bg-slate-200'}`}
                            >
                                <div className={`w-6 h-6 rounded-full bg-white shadow-sm transform transition-transform duration-300 flex items-center justify-center ${isDark ? 'translate-x-6' : 'translate-x-0'}`}>
                                    {isDark ? (
                                        <svg className="w-4 h-4 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                                    ) : (
                                        <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Account Management */}
                    <div className={`p-8 rounded-3xl shadow-sm border transition-colors ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-2 rounded-lg">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </div>
                            Account
                        </h2>

                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg text-red-500">Sign Out</h3>
                                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Log out of your account on this device.
                                </p>
                            </div>
                            <button onClick={() => navigate('/login')} className="px-6 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-colors">
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
