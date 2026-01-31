import axios from 'axios';

// Toggle this to true to use Mock Data instead of real backend
const USE_MOCK = false;

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to attach the Token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Mock Storage with Persistence
const getMockStories = () => {
    const stored = localStorage.getItem('storyweaver_stories');
    // Initialize with defaults if empty
    if (!stored) {
        const defaults = [
            { _id: '1', title: 'The Neon Rain', genre: 'Cyberpunk', content: '<h1>Chapter 1</h1><p>The rain fell like static...</p>', lastUpdated: new Date().toISOString() },
            { _id: '2', title: 'Dragon\'s Keep', genre: 'Fantasy', content: '<h1>Prologue</h1><p>The dragon slept...</p>', lastUpdated: new Date().toISOString() }
        ];
        localStorage.setItem('storyweaver_stories', JSON.stringify(defaults));
        return defaults;
    }
    return JSON.parse(stored);
};

const saveMockStories = (stories) => {
    localStorage.setItem('storyweaver_stories', JSON.stringify(stories));
};

export const fetchStories = async () => {
    if (USE_MOCK) return new Promise(resolve => setTimeout(() => resolve(getMockStories()), 500));
    const response = await api.get('/stories');
    return response.data;
};

export const createStory = async (storyData) => {
    if (USE_MOCK) {
        const stories = getMockStories();
        const newStory = { ...storyData, _id: Date.now().toString(), content: '', lastUpdated: new Date().toISOString() };
        stories.push(newStory);
        saveMockStories(stories);
        return new Promise(resolve => setTimeout(() => resolve(newStory), 800));
    }
    const response = await api.post('/stories', storyData);
    return response.data;
};

export const getStoryById = async (id) => {
    if (USE_MOCK) {
        const stories = getMockStories();
        const story = stories.find(s => s._id === id);
        if (!story && id === ':id') return { title: 'Demo Story', content: '<p>Start writing...</p>' };
        if (!story) throw new Error("Story not found");
        return new Promise(resolve => setTimeout(() => resolve(story), 300));
    }
    const response = await api.get(`/stories/${id}`);
    return response.data;
};

export const updateStory = async (id, content) => {
    if (USE_MOCK) {
        const stories = getMockStories();
        const story = stories.find(s => s._id === id);
        if (story) {
            story.content = content;
            story.lastUpdated = new Date().toISOString();
            saveMockStories(stories);
        }
        return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
    }
    const response = await api.put(`/stories/${id}`, { content });
    return response.data;
};

export const askAI = async (payload) => {
    if (USE_MOCK) {
        return new Promise(resolve => setTimeout(() => resolve({
            suggestion: "Suddenly, the door burst open and a gust of wind extinguished the candles. A figure stood in the doorway, cloaked in shadow."
        }), 1500));
    }
    const response = await api.post('/assist', payload);
    return response.data;
};

export const generateStory = async (payload) => {
    if (USE_MOCK) {
        const stories = getMockStories();
        const newStory = {
            _id: Date.now().toString(),
            title: `${payload.genre} Story`,
            genre: payload.genre,
            content: `<p>Generated story for prompt: "${payload.prompt}"...</p>`,
            lastUpdated: new Date().toISOString()
        };
        stories.push(newStory);
        saveMockStories(stories);
        return new Promise(resolve => setTimeout(() => resolve(newStory), 2000));
    }
    const response = await api.post('/generate', payload);
    return response.data;
};

export const login = async (email, password) => {
    if (USE_MOCK) {
        return new Promise(resolve => setTimeout(() => {
            localStorage.setItem('token', 'mock-token');
            resolve({ token: 'mock-token', user: { name: 'Mock User', email } });
        }, 500));
    }
    const response = await api.post('/auth/login', { email, password });
    return response.data;
};

export const register = async (name, email, password) => {
    if (USE_MOCK) {
        return new Promise(resolve => setTimeout(() => {
            localStorage.setItem('token', 'mock-token');
            resolve({ token: 'mock-token', user: { name, email } });
        }, 500));
    }
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
};

export const getAuthUser = async () => {
    if (USE_MOCK) {
        return new Promise(resolve => setTimeout(() => {
            resolve({ _id: '1', username: 'Mock User', email: 'mock@example.com' });
        }, 500));
    }
    const response = await api.get('/auth/me');
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
};

export default api;
