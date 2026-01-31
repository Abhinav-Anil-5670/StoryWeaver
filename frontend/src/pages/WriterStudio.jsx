import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { getStoryById, updateStory, askAI } from '../api';

const WriterStudio = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [storyTitle, setStoryTitle] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [aiMenuOpen, setAiMenuOpen] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [suggestion, setSuggestion] = useState(null);

    // Stats
    const [stats, setStats] = useState({ words: 0, characters: 0, readTime: 0 });
    const [isFocusMode, setIsFocusMode] = useState(false);

    useEffect(() => {
        if (!content) return;
        const text = content.replace(/<[^>]*>/g, ''); // Strip HTML
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const characters = text.length;
        const readTime = Math.ceil(words / 200); // Avg reading speed
        setStats({ words, characters, readTime });
    }, [content]);

    const handleExport = () => {
        let text = content
            .replace(/<\/h[1-6]>/g, '\n\n') // Headers to double newlines
            .replace(/<\/p>/g, '\n\n') // Paragraphs to double newlines
            .replace(/<\/div>/g, '\n') // Divs to newlines
            .replace(/<br\s*\/?>/g, '\n') // Breaks to newlines
            .replace(/<[^>]*>/g, '') // Strip remaining tags
            .replace(/&nbsp;/g, ' ') // Fix non-breaking spaces
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .trim();

        const file = new Blob([text], { type: 'text/plain' });
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = `${storyTitle.replace(/\s+/g, '_') || 'untitled'}_draft.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    // Load Story
    useEffect(() => {
        const loadStory = async () => {
            try {
                const data = await getStoryById(id);
                setContent(data.content || '');
                setStoryTitle(data.title);
            } catch (error) {
                console.error("Failed to load story", error);
            }
        };
        loadStory();
    }, [id]);

    // Auto-Save
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (content) {
                setIsSaving(true);
                try {
                    await updateStory(id, content);
                } catch (error) {
                    console.error("Auto-save failed", error);
                } finally {
                    setIsSaving(false);
                }
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [content, id]);

    const handleAskAI = async (type) => {
        setAiMenuOpen(false);
        setAiLoading(true);
        setSuggestion(null);
        try {
            const response = await askAI({ storyId: id, storyContent: content, type });
            const suggestionText = response.suggestion || response.data?.suggestion || "No suggestion generated.";
            setSuggestion(suggestionText);
        } catch (error) {
            console.error("AI Request failed", error);
            alert("AI failed to respond.");
        } finally {
            setAiLoading(false);
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['clean']
        ],
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isFocusMode ? 'bg-white dark:bg-slate-950' : 'bg-[#eef2f6] dark:bg-slate-900'}`}>

            <div className={`transition-all duration-500 mx-auto ${isFocusMode ? 'w-full h-screen p-0' : 'max-w-6xl p-6 pt-10 grid grid-cols-1 lg:grid-cols-4 gap-8'}`}>

                {/* Editor Column - Expands in Focus Mode */}
                <div className={`${isFocusMode ? 'col-span-1 w-full h-full' : 'lg:col-span-3'}`}>
                    <div className={`bg-white dark:bg-slate-800 shadow-xl flex flex-col relative overflow-hidden transition-all duration-500 ${isFocusMode ? 'h-full rounded-none ring-0' : 'min-h-[80vh] rounded-3xl ring-1 ring-slate-900/5 dark:ring-slate-700'}`}>
                        {/* Toolbar / Header */}
                        <div className="border-b border-slate-100 dark:border-slate-700 p-4 flex items-center justify-between bg-white/80 dark:bg-slate-800/80 backdrop-blur z-10 sticky top-0 transition-colors">
                            <input
                                type="text"
                                value={storyTitle}
                                onChange={(e) => setStoryTitle(e.target.value)}
                                className={`font-bold text-slate-800 dark:text-slate-100 bg-transparent border-none focus:ring-0 placeholder-slate-300 dark:placeholder-slate-500 w-full transition-all ${isFocusMode ? 'text-xl' : 'text-2xl'}`}
                                placeholder="Untitled Story"
                            />
                            <div className="flex items-center gap-2 text-slate-400">
                                <span className="text-xs uppercase font-bold tracking-wider mr-2 hidden sm:block">{isSaving ? 'Saving...' : 'Saved'}</span>

                                {/* Focus Toggle */}
                                <button onClick={() => setIsFocusMode(!isFocusMode)} className={`p-2 rounded-full transition-colors ${isFocusMode ? 'bg-sky-100 text-sky-600' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400'}`} title={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}>
                                    {isFocusMode ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                                    )}
                                </button>

                                <button onClick={handleExport} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors" title="Export as Text">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                </button>
                            </div>
                        </div>

                        {/* Editor Area */}
                        <div className={`flex-1 overflow-y-auto custom-scrollbar relative ${isFocusMode ? 'flex justify-center bg-white dark:bg-slate-950' : ''}`}>
                            <div className={`${isFocusMode ? 'w-full max-w-3xl px-8 py-10' : 'h-full p-8'}`}>
                                <ReactQuill
                                    theme="snow"
                                    value={content}
                                    onChange={setContent}
                                    modules={modules}
                                    className={`h-full border-none text-lg font-serif ${isFocusMode ? 'focus-mode-quill' : ''}`}
                                    placeholder="Once upon a time..."
                                />
                            </div>
                        </div>

                        {/* Status Bar */}
                        <div className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 p-3 text-xs font-medium text-slate-500 dark:text-slate-400 flex justify-between items-center px-6 select-none transition-colors">
                            <div className="flex gap-4">
                                <span>{stats.words} words</span>
                                <span>{stats.characters} chars</span>
                                <span>{stats.readTime} min read</span>
                            </div>
                            <div>
                                StoryWeaver v1.0
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Hidden in Focus Mode */}
                {!isFocusMode && (
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 transition-colors">
                            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                                <span className="bg-purple-100 text-purple-600 p-1 rounded">🪄</span> AI Assistant
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                                Need a spark? Select an option below to get instant AI inputs for your story.
                            </p>

                            <div className="space-y-3">
                                <button onClick={() => handleAskAI('plot_twist')} className="w-full text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-sky-50 dark:hover:bg-sky-900/20 text-slate-600 dark:text-slate-300 hover:text-sky-700 dark:hover:text-sky-300 text-sm font-medium transition-colors border border-slate-100 dark:border-slate-600 flex items-center gap-3">
                                    <svg className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> Suggest Plot Twist
                                </button>
                                <button onClick={() => handleAskAI('scene_desc')} className="w-full text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-slate-600 dark:text-slate-300 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium transition-colors border border-slate-100 dark:border-slate-600 flex items-center gap-3">
                                    <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> Describe Scene
                                </button>
                                <button onClick={() => handleAskAI('char_chat')} className="w-full text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm font-medium transition-colors border border-slate-100 dark:border-slate-600 flex items-center gap-3">
                                    <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg> Character Chat
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* AI Modal Sidebar */}
            {(aiLoading || suggestion) && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={() => { setAiLoading(false); setSuggestion(null); }}></div>
                    <div className="w-full max-w-md h-full bg-white shadow-2xl p-8 flex flex-col animate-slide-in-right relative z-50">
                        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                <span>✨</span> AI Muse
                            </h2>
                            <button onClick={() => { setAiLoading(false); setSuggestion(null); }} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors">✕</button>
                        </div>

                        {aiLoading ? (
                            <div className="flex flex-col items-center justify-center flex-1 text-slate-400 gap-6">
                                <div className="w-12 h-12 border-4 border-sky-100 border-t-sky-500 rounded-full animate-spin"></div>
                                <p className="animate-pulse tracking-wide text-sm font-medium text-slate-500">Writing magic...</p>
                            </div>
                        ) : (
                            <div className="flex flex-col h-full overflow-hidden">
                                <div className="flex-1 overflow-y-auto mb-6 pr-2">
                                    <div className="prose prose-slate prose-lg leading-relaxed font-serif text-slate-700">
                                        {suggestion}
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(suggestion);
                                        alert("Copied to clipboard!");
                                    }}
                                    className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-lg w-full flex items-center justify-center gap-2 transition-all shadow-md shadow-sky-100"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg> Copy to Clipboard
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WriterStudio;
