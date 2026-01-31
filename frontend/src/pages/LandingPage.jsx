import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white dark:bg-slate-900 min-h-screen font-sans text-slate-900 dark:text-white overflow-x-hidden transition-colors duration-500">
            {/* Hero Section */}
            <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 px-6">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 font-semibold text-sm border border-sky-100 dark:border-sky-800 animate-fade-in-up">
                        ✨ Now with Gemini 2.0 Integration
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight animate-fade-in-up delay-100 dark:text-white">
                        Write stories that <br className="hidden md:block" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-teal-400">
                            defy imagination.
                        </span>
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-200">
                        StoryWeaver adds an infinite AI muse to your creative process.
                        Brainstorm plots, flesh out characters, and break through writer's block forever.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
                        <button
                            onClick={() => navigate('/signup')}
                            className="px-8 py-4 bg-slate-900 dark:bg-sky-500 text-white rounded-full font-bold text-lg hover:bg-slate-800 dark:hover:bg-sky-400 transition-all hover:scale-105 shadow-xl shadow-slate-200 dark:shadow-sky-900/20"
                        >
                            Start Writing Free
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-full font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all hover:border-slate-300 dark:hover:border-slate-600"
                        >
                            View Demo
                        </button>
                    </div>
                </div>

                {/* Decorative Floating Elements (Filling the void) */}
                <div className="absolute top-1/2 left-[10%] -translate-y-1/2 hidden lg:block animate-float">
                    <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 rotate-[-6deg] hover:rotate-0 transition-transform">
                        <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                </div>
                <div className="absolute top-1/3 right-[15%] hidden lg:block animate-float animation-delay-2000">
                    <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 rotate-[8deg] hover:rotate-0 transition-transform">
                        <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </div>
                </div>
                <div className="absolute bottom-[20%] right-[10%] hidden lg:block animate-float animation-delay-4000">
                    <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 rotate-[-12deg] hover:rotate-0 transition-transform">
                        <svg className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    </div>
                </div>

                {/* Background Gradients & Grid */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                    {/* Dot Grid Pattern */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3 }}></div>

                    <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-sky-100/50 rounded-full blur-[120px]"></div>
                    <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-teal-100/40 rounded-full blur-[100px]"></div>
                </div>
            </section>

            {/* Feature Showcase (Bento Grid) */}
            <section className="py-24 bg-slate-50 dark:bg-slate-800/50 px-6 transition-colors">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Everything you need to write a bestseller.</h2>
                        <p className="text-slate-500 dark:text-slate-400">Powerful tools wrapped in a beautiful, distraction-free interface.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700 md:col-span-2 relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-3 dark:text-white">Genesis AI</h3>
                                <p className="text-slate-500 dark:text-slate-400 max-w-md">
                                    Staring at a blank page? Give us a genre and a spark, and watch an entire story world unfold before your eyes.
                                </p>
                            </div>
                            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" /></svg>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700 group">
                            <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/30 rounded-2xl flex items-center justify-center text-sky-600 dark:text-sky-400 mb-6">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 dark:text-white">Zen Editor</h3>
                            <p className="text-slate-500 dark:text-slate-400">
                                A focus mode that feels like paper. No clutter, just you and your words.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700 group">
                            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 dark:text-white">Safe & Private</h3>
                            <p className="text-slate-500 dark:text-slate-400">
                                Your stories are yours. Encrypted locally and never used to train models without permission.
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-slate-900 dark:bg-slate-800 p-8 rounded-3xl shadow-lg md:col-span-2 text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur-sm">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-3">AI Muse Sidebar</h3>
                                <p className="text-slate-300 max-w-md">
                                    Stuck on a scene? Ask the Muse to describe the setting, suggest a plot twist, or even roleplay as a character.
                                </p>
                            </div>
                            {/* Abstract decorative shape */}
                            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-gradient-to-br from-purple-500 to-sky-500 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6 bg-white dark:bg-slate-900 overflow-hidden relative">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-5xl font-bold mb-8 tracking-tight dark:text-white">Ready to tell your story?</h2>
                    <button
                        onClick={() => navigate('/signup')}
                        className="px-10 py-5 bg-sky-500 text-white rounded-full font-bold text-xl hover:bg-sky-400 transition-all hover:scale-105 shadow-2xl shadow-sky-200 dark:shadow-sky-900/40"
                    >
                        Get Started for Free
                    </button>
                    <p className="mt-6 text-slate-400 text-sm">No credit card required • Unlimited drafts</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-800 -z-10"></div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-50 dark:bg-slate-900/50 py-12 px-6 border-t border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <div className="w-6 h-6 bg-slate-800 dark:bg-white rounded flex items-center justify-center text-white dark:text-slate-900 text-xs font-bold">S</div>
                        <span className="font-bold text-slate-700 dark:text-slate-300">StoryWeaver AI</span>
                    </div>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">GitHub</a>
                    </div>
                    <div className="mt-4 md:mt-0">
                        © 2026 StoryWeaver Inc.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
