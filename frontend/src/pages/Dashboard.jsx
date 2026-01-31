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
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                        Become a more <br />
                        <span className="text-sky-500">effective writer!</span>
                    </h1>
                    <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                        Empowering writers with an infinite AI muse. StoryWeaver helps you create unique stories with magical illustrations and plot assistance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-sky-200 transition-all hover:-translate-y-1"
                        >
                            Start Writing Now
                        </button>
                        <button
                            onClick={() => setShowGenerateModal(true)}
                            className="bg-white hover:bg-slate-50 text-slate-700 font-bold py-4 px-8 rounded-full border border-slate-200 shadow-sm transition-all hover:border-sky-300"
                        >
                            Generate Story ✨
                        </button>
                    </div>
                </div>
                <div className="flex-1 animate-float">
                    <img
                        src={HERO_IMAGE_URL}
                        alt="Writing Inspiration"
                        className="w-full max-w-lg mx-auto rounded-3xl "
                    />
                </div>
            </div>

            {/* Feature/Action Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-24">
                <div className="feature-card group cursor-pointer" onClick={() => setShowCreateModal(true)}>
                    <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                        ✍️
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Writer's Studio</h3>
                    <p className="text-slate-600">
                        A distraction-free environment with intelligent tools to help you when you're stuck. Plot suggestions, scene descriptions, and more.
                    </p>
                </div>

                <div className="feature-card group cursor-pointer" onClick={() => setShowGenerateModal(true)}>
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                        🪄
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Genesis AI</h3>
                    <p className="text-slate-600">
                        Need a spark? Let our advanced AI generate a complete story starter based on your prompt, character, or genre.
                    </p>
                </div>
            </div>

            {/* Recent Work / Dashboard Grid */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-slate-800">Your Stories</h2>
                    <button className="text-sky-600 font-semibold hover:underline">View All</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map(story => (
                        <div
                            key={story._id}
                            onClick={() => navigate(`/editor/${story._id}`)}
                            className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-sky-200 transition-all cursor-pointer group"
                        >
                            <div className="h-40 bg-slate-50 rounded-lg mb-4 flex items-center justify-center text-4xl group-hover:bg-sky-50 transition-colors">
                                📖
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mb-2 truncate">{story.title || 'Untitled Story'}</h4>
                            <div className="flex justify-between items-center text-sm text-slate-500">
                                <span className="bg-slate-100 px-3 py-1 rounded-full">{story.genre}</span>
                                <span>{new Date(story.lastUpdated).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                    {stories.length === 0 && (
                        <div className="col-span-full py-16 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                            <p className="text-slate-500 text-lg mb-4">You haven't written any stories yet.</p>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="text-sky-600 font-bold hover:underline"
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
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fade-in-up">
                        <h2 className="text-2xl font-bold mb-6 text-slate-800">Start a New Story</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-slate-600 font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    value={newStoryTitle}
                                    onChange={(e) => setNewStoryTitle(e.target.value)}
                                    className="w-full border-2 border-slate-200 rounded-lg p-3 focus:outline-none focus:border-sky-500 transition-colors"
                                    placeholder="The Magic Tree..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-slate-600 font-medium mb-1">Genre</label>
                                <select
                                    value={newStoryGenre}
                                    onChange={(e) => setNewStoryGenre(e.target.value)}
                                    className="w-full border-2 border-slate-200 rounded-lg p-3 focus:outline-none focus:border-sky-500 transition-colors bg-white"
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
                                    className="px-4 py-2 text-slate-500 font-medium hover:text-slate-800"
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
                    <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl animate-fade-in-up">
                        <h2 className="text-2xl font-bold mb-2 text-slate-800">Generate with AI</h2>
                        <p className="text-slate-500 mb-6">Let's prevent writer's block before it happens.</p>
                        <form onSubmit={handleGenerate} className="space-y-4">
                            <div>
                                <label className="block text-slate-600 font-medium mb-1">Genre</label>
                                <select
                                    value={genStoryGenre}
                                    onChange={(e) => setGenStoryGenre(e.target.value)}
                                    className="w-full border-2 border-slate-200 rounded-lg p-3 focus:outline-none focus:border-purple-500 transition-colors bg-white"
                                >
                                    {['Fantasy', 'Sci-Fi', 'Romance', 'Mystery', 'Cyberpunk', 'Horror'].map(g => (
                                        <option key={g} value={g}>{g}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-600 font-medium mb-1">Prompt</label>
                                <textarea
                                    value={genStoryPrompt}
                                    onChange={(e) => setGenStoryPrompt(e.target.value)}
                                    className="w-full border-2 border-slate-200 rounded-lg p-3 focus:outline-none focus:border-purple-500 transition-colors h-32 resize-none"
                                    placeholder="A robot who wants to serve tea on the moon..."
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowGenerateModal(false)}
                                    className="px-4 py-2 text-slate-500 font-medium hover:text-slate-800"
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
        </div>
    );
};

export default Dashboard;
