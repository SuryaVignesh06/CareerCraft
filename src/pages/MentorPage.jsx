import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Map, Bot, FileText, Send, User, Menu, Award, Briefcase, Code } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Map, label: 'Roadmap', path: '/roadmap' },
    { icon: Bot, label: 'AI Mentor', path: '/mentor' },
    { icon: Award, label: 'Certifications', path: '/certifications' },
    { icon: Briefcase, label: 'Internships', path: '/internships' },
    { icon: Code, label: 'Visualizer', path: '/visualizer' },
    { icon: FileText, label: 'Analyzer', path: '/analyzer' },
    { icon: FileText, label: 'Resume', path: '/resume' },
];

const suggestions = [
    "What should I learn after React?",
    "How do I prepare for a DSA interview?",
    "Which companies hire freshers for ₹8L+?",
    "Explain closures in JavaScript"
];

const initialMessages = [];

export default function MentorPage() {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const getAIResponse = async (chatMessages) => {
        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ messages: chatMessages })
            });
            const data = await response.json();
            if (data.response) {
                 return data.response;
            } else {
                 return "Sorry, I encountered an error. Please check the backend.";
            }
        } catch (error) {
            console.error("Backend Error:", error);
            return "Please ensure the Python backend is running on port 5000.";
        }
    };

    const sendMessage = async (text = input) => {
        if (!text.trim()) return;
        const userMsg = { role: 'user', text };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        const aiResponse = await getAIResponse(newMessages);
        
        setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[var(--bg)] flex">
            {/* Sidebar */}
            <aside className="w-64 shrink-0 border-r border-[#2A2B32] bg-[#171717]/80 flex flex-col py-6 px-4 gap-2 fixed h-full z-30">
                <Link to="/" className="flex items-center gap-2 px-3 mb-8">
                    <span className="font-heading text-xl font-bold text-white">CareerCraft</span>
                    <span className="w-2 h-2 ml-2 rounded-full bg-[var(--cyan)]" />
                </Link>
                {navItems.map(({ icon: Icon, label, path }) => (
                    <Link key={path} to={path} className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${path === '/mentor' ? 'bg-[#2A2B32] text-white' : 'text-[#A1A1AA] hover:text-white hover:bg-[#2A2B32]/50'}`}>
                        <Icon size={18} />{label}
                    </Link>
                ))}
            </aside>

            {/* Chat Area - ChatGPT Style */}
            <main className="ml-64 flex-1 flex flex-col h-screen bg-[#212121] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 text-white border-b border-[#2A2B32] md:hidden">
                    <div className="flex items-center gap-2">
                        <Bot size={24} />
                        <span className="font-medium">CareerCraft GPT</span>
                    </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto px-4 w-full">
                    <div className="max-w-3xl mx-auto flex flex-col pt-8 pb-32">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center mt-20">
                                <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mb-6">
                                    <Bot size={32} />
                                </div>
                                <h2 className="text-2xl font-semibold text-white mb-8">How can I help you today?</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl px-4">
                                    {suggestions.map((s, idx) => (
                                        <button 
                                            key={idx} 
                                            onClick={() => sendMessage(s)}
                                            className="text-left px-4 py-3 rounded-xl border border-[#424242] text-[#ececec] text-sm hover:bg-[#2f2f2f] transition-colors"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex w-full mb-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.role === 'assistant' ? (
                                        <div className="flex gap-4 w-full">
                                            <div className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center shrink-0 mt-1 md:mt-0 bg-[#fff] text-black">
                                                <Bot size={18} />
                                            </div>
                                            <div className="text-[#ececec] text-[15px] leading-relaxed max-w-full overflow-hidden prose prose-invert prose-p:leading-relaxed prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-gray-700">
                                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-[#2f2f2f] text-[#ececec] px-5 py-3 rounded-2xl max-w-[85%] md:max-w-[70%] text-[15px] leading-relaxed whitespace-pre-wrap">
                                            {msg.text}
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        )}
                        {loading && (
                            <div className="flex w-full mb-6 justify-start">
                                <div className="flex gap-4 w-full">
                                    <div className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center shrink-0 bg-[#fff] text-black">
                                        <Bot size={18} />
                                    </div>
                                    <div className="flex gap-1 items-center h-8">
                                        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce text-sm" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce text-sm" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce text-sm" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} className="h-4" />
                    </div>
                </div>

                {/* Input Area */}
                <div className="w-full bg-gradient-to-t from-[#212121] via-[#212121] to-transparent pt-6 pb-6 px-4 absolute bottom-0 left-0 md:left-64 right-0">
                    <div className="max-w-3xl mx-auto relative">
                        <div className="bg-[#2f2f2f] border border-[#424242] rounded-[24px] flex items-end p-2 px-4 shadow-lg focus-within:bg-[#383838] transition-colors">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        sendMessage();
                                    }
                                }}
                                placeholder="Message CareerCraft..."
                                className="flex-1 bg-transparent text-[#ececec] p-2 max-h-48 resize-none focus:outline-none min-h-[44px] text-[15px] placeholder:text-[#9b9b9b]"
                                rows={1}
                            />
                            <button
                                onClick={() => sendMessage()}
                                disabled={!input.trim() || loading}
                                className="mb-1 ml-2 w-9 h-9 flex items-center justify-center bg-white text-black rounded-full disabled:bg-[#424242] disabled:text-[#757575] transition-colors shrink-0 hover:bg-gray-200"
                            >
                                <Send size={16} className={input.trim() ? "translate-x-[1px]" : ""} />
                            </button>
                        </div>
                        <div className="text-center text-xs text-[#9b9b9b] mt-3">
                            CareerCraft AI can make mistakes. Consider verifying important information.
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
