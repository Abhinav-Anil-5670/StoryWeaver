import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStories, createStory, generateStory } from '../api';
// Assuming the image is moved to public or imported. For now using the relative path or a placeholder if not moved.
// Since I can't move files easily, I'll assume it's in a place I can reference or use a placeholder if the generated image path isn't directly accessible via URL.
// Actually, I can use the artifact path but browsers can't load local absolute paths. I should Copy the artifact to public folder or use a placeholder.
// I will use a placeholder methodology or try to reference the artifact if I could move it.
// I'll assume for this 'product' feel I use a nice gradient or shape if image fails, but I'll try to use the image name I generated.
// Wait, I can't move files. I will use a reliable placeholder for the immediate render, or just a colored interaction.
// Actually, I will use a text-heavy hero if I can't guarantee image serving.
// BUT, the prompt said "images and stuff". I will try to use a placeholder image from unsplash that matches the vibe since I can't serve the local file to the browser easily without moving it to 'public'.
// Implementation: Use a remote URL for the hero image to ensure it looks good immediately.
const HERO_IMAGE_URL = "https://img.freepik.com/free-vector/creative-writing-concept-illustration_114360-8167.jpg?w=1380&t=st=1706716000~exp=1706716600~hmac=5b"; // Professional placeholder

const Dashboard = () => {
    const navigate = useNavigate();
    const [stories, setStories] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form States
    const [newStoryTitle, setNewStoryTitle] = useState('');
    const [newStoryGenre, setNewStoryGenre] = useState('Fantasy');
    const [genStoryGenre, setGenStoryGenre] = useState('Cyberpunk');
    const [genStoryPrompt, setGenStoryPrompt] = useState('A tired detective named Miller in New York 2099');

    useEffect(() => {
        loadStories();
    }, []);

    const loadStories = async () => {
        try {
            const data = await fetchStories();
            setStories(data);
        } catch (error) {
            console.error("Failed to load stories", error);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const story = await createStory({ title: newStoryTitle, genre: newStoryGenre });
            navigate(`/editor/${story._id}`);
        } catch (error) {
            console.error("Failed to create story", error);
            alert("Failed to create story");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const story = await generateStory({ genre: genStoryGenre, prompt: genStoryPrompt });
            navigate(`/editor/${story._id}`);
        } catch (error) {
            console.error("Failed to generate story", error);
            alert("Failed to generate story");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">

            {/* Product Hero Section */}
            <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
                <div className="flex-1 text-center md:text-left animate-fade-in-up">
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                        Become a more <br />
                        <span className="text-sky-500">effective writer!</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                        Empowering writers with an infinite AI muse. StoryWeaver helps you create unique stories with magical illustrations and plot assistance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-sky-200 dark:shadow-sky-900/40 transition-all hover:-translate-y-1"
                        >
                            Start Writing Now
                        </button>
                        <button
                            onClick={() => setShowGenerateModal(true)}
                            className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-4 px-8 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:border-sky-300 dark:hover:border-sky-700"
                        >
                            Generate Story ✨
                        </button>
                    </div>
                </div>
                <div className="flex-1 animate-float">
                    <img
                        src={HERO_IMAGE_URL}
                        alt="Writing Inspiration"
                        className="w-full max-w-lg mx-auto rounded-3xl"
                    />
                </div>
            </div>

            {/* Feature/Action Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-24">
                <div className="feature-card dark:bg-slate-800 dark:border-slate-700 group cursor-pointer" onClick={() => setShowCreateModal(true)}>
                    <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center text-sky-600 dark:text-sky-400 mb-6 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 dark:text-slate-100">Writer's Studio</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        A distraction-free environment with intelligent tools to help you when you're stuck. Plot suggestions, scene descriptions, and more.
                    </p>
                </div>

                <div className="feature-card dark:bg-slate-800 dark:border-slate-700 group cursor-pointer" onClick={() => setShowGenerateModal(true)}>
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 dark:text-slate-100">Genesis AI</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        Need a spark? Let our advanced AI generate a complete story starter based on your prompt, character, or genre.
                    </p>
                </div>
            </div>

            {/* Recent Work / Dashboard Grid */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Your Stories</h2>
                    <button className="text-sky-600 dark:text-sky-400 font-semibold hover:underline">View All</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map(story => (
                        <div
                            key={story._id}
                            onClick={() => navigate(`/editor/${story._id}`)}
                            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md hover:border-sky-200 dark:hover:border-sky-700 transition-all cursor-pointer group"
                        >
                            <div className="h-40 bg-slate-50 dark:bg-slate-700/50 rounded-lg mb-4 flex items-center justify-center text-slate-300 dark:text-slate-600 group-hover:bg-sky-50 dark:group-hover:bg-sky-900/20 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 truncate">{story.title || 'Untitled Story'}</h4>
                            <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
                                <span className="bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">{story.genre}</span>
                                <span>{new Date(story.lastUpdated).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                    {stories.length === 0 && (
                        <div className="col-span-full py-16 text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                            <p className="text-slate-500 dark:text-slate-400 text-lg mb-4">You haven't written any stories yet.</p>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="text-sky-600 dark:text-sky-400 font-bold hover:underline"
                            >
                                Create your first story
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals - Clean Light Theme */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fade-in-up">
                        <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Start a New Story</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    value={newStoryTitle}
                                    onChange={(e) => setNewStoryTitle(e.target.value)}
                                    className="w-full border-2 border-slate-200 dark:border-slate-600 rounded-lg p-3 focus:outline-none focus:border-sky-500 dark:focus:border-sky-400 transition-colors bg-white dark:bg-slate-700 dark:text-white"
                                    placeholder="The Magic Tree..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">Genre</label>
                                <select
                                    value={newStoryGenre}
                                    onChange={(e) => setNewStoryGenre(e.target.value)}
                                    className="w-full border-2 border-slate-200 dark:border-slate-600 rounded-lg p-3 focus:outline-none focus:border-sky-500 dark:focus:border-sky-400 transition-colors bg-white dark:bg-slate-700 dark:text-white"
                                >
                                    {['Fantasy', 'Sci-Fi', 'Romance', 'Mystery', 'Cyberpunk', 'Horror'].map(g => (
                                        <option key={g} value={g}>{g}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showGenerateModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-lg w-full shadow-2xl animate-fade-in-up">
                        <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">Generate with AI</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-6">Let's prevent writer's block before it happens.</p>
                        <form onSubmit={handleGenerate} className="space-y-4">
                            <div>
                                <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">Genre</label>
                                <select
                                    value={genStoryGenre}
                                    onChange={(e) => setGenStoryGenre(e.target.value)}
                                    className="w-full border-2 border-slate-200 dark:border-slate-600 rounded-lg p-3 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors bg-white dark:bg-slate-700 dark:text-white"
                                >
                                    {['Fantasy', 'Sci-Fi', 'Romance', 'Mystery', 'Cyberpunk', 'Horror'].map(g => (
                                        <option key={g} value={g}>{g}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">Prompt</label>
                                <textarea
                                    value={genStoryPrompt}
                                    onChange={(e) => setGenStoryPrompt(e.target.value)}
                                    className="w-full border-2 border-slate-200 dark:border-slate-600 rounded-lg p-3 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors h-32 resize-none bg-white dark:bg-slate-700 dark:text-white"
                                    placeholder="A robot who wants to serve tea on the moon..."
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowGenerateModal(false)}
                                    className="px-4 py-2 text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    Generate
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Full Screen Loader */}
            {loading && (
                <div className="fixed inset-0 z-[100] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in">
                    <div className="w-20 h-20 border-4 border-slate-200 dark:border-slate-700 border-t-purple-600 rounded-full animate-spin mb-8"></div>
                    <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 animate-pulse">Weaving your story...</h3>
                    <p className="text-slate-500 dark:text-slate-400">Summoning creative spirits ✨</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
