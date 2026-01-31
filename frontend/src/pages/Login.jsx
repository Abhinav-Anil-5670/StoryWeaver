import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock login logic
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2">

                {/* Left: Illustration/Brand */}
                <div className="bg-sky-500 p-12 flex flex-col justify-between text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold font-display mb-4">Welcome Back!</h2>
                        <p className="text-sky-100 leading-relaxed">
                            Resume your journey. Your characters have been waiting for you.
                        </p>
                    </div>
                    <div className="relative z-10 mt-12">
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                            <p className="italic text-sm">"The scariest moment is always just before you start."</p>
                            <p className="text-xs mt-2 opacity-80">— Stephen King</p>
                        </div>
                    </div>

                    {/* Decorative Circles */}
                    <div className="absolute top-[-50%] left-[-50%] w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-20%] right-[-20%] w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-3xl"></div>
                </div>

                {/* Right: Login Form */}
                <div className="p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Sign In</h3>
                        <p className="text-slate-500 text-sm">New here? <span onClick={() => navigate('/signup')} className="text-sky-600 font-bold cursor-pointer hover:underline">Create an account</span></p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-slate-600 font-medium mb-2 text-sm">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border-2 border-slate-200 rounded-lg p-3 focus:outline-none focus:border-sky-500 transition-colors"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-600 font-medium mb-2 text-sm">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-2 border-slate-200 rounded-lg p-3 focus:outline-none focus:border-sky-500 transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-lg shadow-lg shadow-sky-200 transition-all hover:-translate-y-1"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <a href="#" className="text-slate-400 text-xs hover:text-slate-600">Forgot Password?</a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
