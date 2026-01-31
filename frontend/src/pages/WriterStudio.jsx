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

    return (
        <div className="h-[calc(100vh-64px)] flex flex-col bg-slate-100 text-slate-800 relative overflow-hidden">

            {/* Editor Header */}
            <div className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 z-10 shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/')} className="text-slate-500 hover:text-sky-600 font-medium transition-colors">
                        Back to Dashboard
                    </button>
                    <span className="text-slate-300">|</span>
                    <h1 className="font-serif font-bold text-xl text-slate-900">{storyTitle}</h1>
                </div>

                <div className="text-sm font-medium">
                    {isSaving ? <span className="text-sky-500">Saving...</span> : <span className="text-slate-400">Saved</span>}
                </div>
            </div>

            {/* Cloud-like Editor Area */}
            <div className="flex-1 overflow-y-auto w-full flex justify-center py-8 writer-scroll-area bg-slate-100">
                <div className="paper-page relative animate-fade-in-up">
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        className="h-full"
                        modules={{
                            toolbar: [
                                [{ 'header': [1, 2, false] }],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                [{ 'color': [] }, { 'background': [] }],
                                ['clean']
                            ],
                        }}
                    />
                </div>
            </div>

            {/* Light FAB */}
            <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end gap-3">
                {aiMenuOpen && (
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden mb-2 animate-fade-in-up w-64 origin-bottom-right">
                        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest">
                            AI Muse
                        </div>
                        <button
                            onClick={() => handleAskAI('plot_twist')}
                            className="w-full text-left px-4 py-4 hover:bg-sky-50 text-slate-700 text-sm border-b border-slate-50 transition-colors flex items-center gap-3"
                        >
                            <svg className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> Suggest Plot Twist
                        </button>
                        <button
                            onClick={() => handleAskAI('scene_desc')}
                            className="w-full text-left px-4 py-4 hover:bg-purple-50 text-slate-700 text-sm border-b border-slate-50 transition-colors flex items-center gap-3"
                        >
                            <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> Describe Scene
                        </button>
                        <button
                            onClick={() => handleAskAI('char_chat')}
                            className="w-full text-left px-4 py-4 hover:bg-emerald-50 text-slate-700 text-sm transition-colors flex items-center gap-3"
                        >
                            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg> Character Chat
                        </button>
                    </div>
                )}

                <button
                    onClick={() => setAiMenuOpen(!aiMenuOpen)}
                    className={`h-16 w-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50 ${aiMenuOpen ? 'bg-slate-200 text-slate-600 rotate-45' : 'bg-sky-500 text-white hover:scale-110 hover:shadow-sky-300/50'}`}
                >
                    {aiMenuOpen ? (
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    )}
                </button>
            </div>

            {/* AI Sidebar - Light Mode */}
            {(aiLoading || suggestion) && (
                <div className="fixed inset-0 z-40 flex justify-end">
                    <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={() => { setAiLoading(false); setSuggestion(null); }}></div>
                    <div className="w-full max-w-md h-full bg-white shadow-2xl p-8 flex flex-col animate-slide-in-right relative z-50">
                        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                            <h2 className="text-2xl font-bold text-slate-800">AI Muse</h2>
                            <button
                                onClick={() => { setAiLoading(false); setSuggestion(null); }}
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {aiLoading ? (
                            <div className="flex flex-col items-center justify-center flex-1 text-slate-400 gap-6">
                                <div className="relative">
                                    <div className="w-12 h-12 border-4 border-sky-100 border-t-sky-500 rounded-full animate-spin"></div>
                                </div>
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
