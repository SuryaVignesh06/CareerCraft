import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Map, Bot, FileText, Send, Sparkles, User } from 'lucide-react';

const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Map, label: 'Roadmap', path: '/roadmap' },
    { icon: Bot, label: 'AI Mentor', path: '/mentor' },
    { icon: FileText, label: 'Analyzer', path: '/analyzer' },
    { icon: FileText, label: 'Resume', path: '/resume' },
];

const suggestions = [
    "What should I learn after React?",
    "How do I prepare for a DSA interview?",
    "Which companies hire freshers for ₹8L+?",
    "Explain closures in JavaScript",
    "What's the difference between REST and GraphQL?",
];

const initialMessages = [
    {
        role: 'assistant',
        text: "Hey! 👋 I'm your AI Career Mentor. I know your roadmap, your current progress, and the Indian job market. Ask me anything — coding doubts, career advice, interview prep, or how to ace your next application.",
    }
];

export default function MentorPage() {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const getAIResponse = (question) => {
        const q = question.toLowerCase();
        if (q.includes('react') || q.includes('next')) return "After React, I'd recommend diving into **Next.js** for SSR/SSG, then **TypeScript** to make your code production-grade. Based on your current roadmap you're at 45% progress on React — complete the hooks section first, then move to state management with Zustand. Estimated time: 2 more weeks. 🚀";
        if (q.includes('dsa') || q.includes('interview') || q.includes('algo')) return "For DSA interview prep with Indian companies: \n\n1. **Striver's A-Z Sheet** — 450 curated problems\n2. Focus on Arrays, Strings, Trees, Graphs (these dominate FAANG interviews)\n3. Practice LC Medium daily — target 2 problems/day\n4. For Zoho/TCS-level: focus on patterns over brute force\n\nRealistic timeline for fresher: 3-4 months of consistent practice. 💪";
        if (q.includes('salary') || q.includes('₹') || q.includes('lpa') || q.includes('company')) return "For ₹8L+ fresher roles, target: **Swiggy, Zepto, Razorpay, Groww, CRED**. These companies hire freshers at ₹8-14L with strong DSA + 1-2 good projects. Requirements: LC 200+ problems, 2+ deployed projects, and a clean GitHub. Your Full Stack path is perfect for these. Want me to build you a 90-day plan?";
        if (q.includes('closure')) return "A **closure** is a function that 'remembers' its outer scope even after the outer function has returned.\n\n```js\nfunction makeCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\nconst counter = makeCounter();\ncounter(); // 1\ncounter(); // 2\n```\nPractical use: private variables, factory functions, event handlers. This is a popular JS interview question — be ready to explain memory implications too!";
        if (q.includes('rest') || q.includes('graphql')) return "**REST vs GraphQL:**\n\n- **REST**: Multiple endpoints, each returning fixed data. Simple, widely used. Great for CRUD apps.\n- **GraphQL**: Single endpoint, client requests exactly what it needs. Avoids over-fetching.\n\nFor Indian startups, REST is still #1. Learning GraphQL is a bonus but not required for fresher roles. Stick with REST + practice building clean REST APIs with Node.js first! 🎯";
        return "Great question! Based on your Full Stack roadmap and current progress, here's what I recommend: focus on completing your current React module before branching out. The more you understand React patterns deeply, the easier the rest of the stack becomes. Want me to suggest specific resources, or explain a particular concept? 🤔";
    };

    const sendMessage = async (text = input) => {
        if (!text.trim()) return;
        const userMsg = { role: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        const aiResponse = getAIResponse(text);
        setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[var(--bg)] flex">
            {/* Sidebar */}
            <aside className="w-64 shrink-0 border-r border-[var(--border)] bg-[var(--surface)] flex flex-col py-6 px-4 gap-2 fixed h-full z-30">
                <Link to="/" className="flex items-center gap-2 px-3 mb-6">
                    <span className="font-heading text-xl font-bold text-white">CareerCraft</span>
                    <span className="w-2 h-2 ml-2 rounded-full bg-[var(--cyan)]" />
                </Link>
                {navItems.map(({ icon: Icon, label, path }) => (
                    <Link key={path} to={path} className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${path === '/mentor' ? 'bg-[var(--cyan)]/10 text-[var(--cyan)] border border-[var(--cyan)]/20' : 'text-[var(--muted)] hover:text-white hover:bg-[var(--surface2)]'}`}>
                        <Icon size={18} />{label}
                    </Link>
                ))}
            </aside>

            <main className="ml-64 flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <div className="px-8 py-5 border-b border-[var(--border)] flex items-center gap-3 bg-[var(--bg)]">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--purple)] flex items-center justify-center">
                        <Sparkles size={18} className="text-white" />
                    </div>
                    <div>
                        <div className="font-bold text-white">AI Career Mentor</div>
                        <div className="text-xs text-[var(--green)] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse inline-block" /> Online — Ready to help
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-4">
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {msg.role === 'assistant' && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--purple)] flex items-center justify-center shrink-0 mt-1">
                                    <Sparkles size={14} className="text-white" />
                                </div>
                            )}
                            <div className={`max-w-2xl px-5 py-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user'
                                ? 'bg-[var(--cyan)] text-black font-medium rounded-tr-sm'
                                : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] rounded-tl-sm'
                                }`}>
                                {msg.text}
                            </div>
                            {msg.role === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-[var(--surface2)] border border-[var(--border)] flex items-center justify-center shrink-0 mt-1">
                                    <User size={14} className="text-[var(--muted)]" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                    {loading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--purple)] flex items-center justify-center shrink-0">
                                <Sparkles size={14} className="text-white" />
                            </div>
                            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl rounded-tl-sm px-5 py-4 flex gap-1 items-center">
                                {[0, 1, 2].map(i => (
                                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                                ))}
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>

                {/* Suggestions */}
                {messages.length <= 1 && (
                    <div className="px-8 pb-3 flex gap-2 flex-wrap">
                        {suggestions.map((s, i) => (
                            <button key={i} onClick={() => sendMessage(s)} className="text-xs px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--muted)] hover:text-[var(--cyan)] hover:border-[var(--cyan)]/40 transition-all">
                                {s}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input */}
                <div className="px-8 py-5 border-t border-[var(--border)] bg-[var(--bg)]">
                    <div className="flex gap-3">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                            placeholder="Ask me anything about your career..."
                            className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-2xl px-5 py-3.5 text-white placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--cyan)] transition-colors text-sm"
                        />
                        <button
                            onClick={() => sendMessage()}
                            disabled={!input.trim() || loading}
                            className="w-12 h-12 rounded-2xl bg-[var(--cyan)] flex items-center justify-center text-black disabled:opacity-40 transition-all hover:shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
