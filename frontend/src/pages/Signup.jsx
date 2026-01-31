import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        // Mock signup logic
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2">

                {/* Left: Illustration/Brand */}
                <div className="bg-purple-600 p-12 flex flex-col justify-between text-white relative overflow-hidden order-1 md:order-2">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold font-display mb-4">Join StoryWeaver</h2>
                        <p className="text-purple-100 leading-relaxed">
                            Unlock the infinite muse. Start creating stories that captivate and inspire.
                        </p>
                    </div>
                    <div className="relative z-10 mt-12">
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">✨ <span>Unlimited AI Generation</span></li>
                                <li className="flex items-center gap-2">🧠 <span>Smart Plot Assistance</span></li>
                                <li className="flex items-center gap-2">🔒 <span>Private Cloud Storage</span></li>
                            </ul>
                        </div>
                    </div>

                    {/* Decorative Circles */}
                    <div className="absolute top-[-50%] right-[-50%] w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-20%] left-[-20%] w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-3xl"></div>
                </div>

                {/* Right: Signup Form */}
                <div className="p-12 flex flex-col justify-center order-2 md:order-1">
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Create Account</h3>
                        <p className="text-slate-500 text-sm">Already a weaver? <span onClick={() => navigate('/login')} className="text-purple-600 font-bold cursor-pointer hover:underline">Sign In</span></p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div>
                            <label className="block text-slate-600 font-medium mb-2 text-sm">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border-2 border-slate-200 rounded-lg p-3 focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="J.K. Rowling"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-600 font-medium mb-2 text-sm">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border-2 border-slate-200 rounded-lg p-3 focus:outline-none focus:border-purple-500 transition-colors"
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
                                className="w-full border-2 border-slate-200 rounded-lg p-3 focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="Create a strong password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-purple-200 transition-all hover:-translate-y-1"
                        >
                            Sign Up Free
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Signup;
