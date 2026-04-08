import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Map, Bot, FileText, Upload, AlertCircle, CheckCircle, TrendingUp, ChevronDown, Award, Briefcase, Code } from 'lucide-react';

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

const mockAnalysis = {
    score: 62,
    company: 'Swiggy',
    role: 'SDE 1',
    weaknesses: [
        { area: 'Dynamic Programming', severity: 'high', tip: 'You failed 3 out of 4 DP questions. Focus on LCS, Knapsack, and Coin Change patterns for 2 weeks.' },
        { area: 'System Design Communication', severity: 'high', tip: 'Interviewers noted you jumped to implementation without discussing trade-offs. Practice the SWIM framework (Scope, Width, Internals, Monitor).' },
        { area: 'Time Complexity Analysis', severity: 'medium', tip: 'You gave correct solutions but couldn\'t explain Big-O clearly. Practice analyzing each DS operation.' },
    ],
    strengths: [
        'Strong on Arrays and Strings',
        'Solid JavaScript fundamentals',
        'Good behavioral answers',
    ],
    plan: [
        { week: 1, task: 'Complete 20 DP problems (easy → medium) on LeetCode' },
        { week: 2, task: 'Practice System Design: design URL shortener, ride-sharing app' },
        { week: 3, task: 'Mock interview on Pramp or Interviewing.io' },
        { week: 4, task: 'Final revision + apply again to Swiggy/Zepto' },
    ]
};

export default function AnalyzerPage() {
    const [step, setStep] = useState('input'); // input | loading | result
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [text, setText] = useState('');
    const [expanded, setExpanded] = useState(null);

    const analyze = async () => {
        if (!text.trim()) return;
        setStep('loading');
        await new Promise(r => setTimeout(r, 2500));
        setStep('result');
    };

    const severityColor = { high: 'text-red-400 bg-red-500/10 border-red-500/20', medium: 'text-[var(--amber)] bg-[var(--amber)]/10 border-[var(--amber)]/20', low: 'text-[var(--cyan)] bg-[var(--cyan)]/10 border-[var(--cyan)]/20' };

    return (
        <div className="min-h-screen bg-[var(--bg)] flex">
            <aside className="w-64 shrink-0 border-r border-[var(--border)] bg-[var(--surface)] flex flex-col py-6 px-4 gap-2 fixed h-full z-30">
                <Link to="/" className="flex items-center gap-2 px-3 mb-6">
                    <span className="font-heading text-xl font-bold text-white">CareerCraft</span>
                    <span className="w-2 h-2 ml-2 rounded-full bg-[var(--cyan)]" />
                </Link>
                {navItems.map(({ icon: Icon, label, path }) => (
                    <Link key={path} to={path} className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${path === '/analyzer' ? 'bg-[var(--cyan)]/10 text-[var(--cyan)] border border-[var(--cyan)]/20' : 'text-[var(--muted)] hover:text-white hover:bg-[var(--surface2)]'}`}>
                        <Icon size={18} />{label}
                    </Link>
                ))}
            </aside>

            <main className="ml-64 flex-1 p-8 max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-heading font-bold text-white mb-1">Interview Failure Analyzer</h1>
                    <p className="text-[var(--muted)] mb-8">Paste your interview questions → get an AI breakdown of exactly why you failed and a recovery plan.</p>

                    <AnimatePresence mode="wait">
                        {step === 'input' && (
                            <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <div className="glass-card p-8 flex flex-col gap-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-[var(--muted)] font-medium uppercase tracking-wide mb-2 block">Company</label>
                                            <input value={company} onChange={e => setCompany(e.target.value)} placeholder="e.g. Swiggy, Google, TCS" className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-xl py-3 px-4 text-white placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--cyan)] text-sm transition-colors" />
                                        </div>
                                        <div>
                                            <label className="text-xs text-[var(--muted)] font-medium uppercase tracking-wide mb-2 block">Role Applied</label>
                                            <input value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. SDE 1, Frontend Dev" className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-xl py-3 px-4 text-white placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--cyan)] text-sm transition-colors" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-[var(--muted)] font-medium uppercase tracking-wide mb-2 block">Paste Interview Questions & Your Answers</label>
                                        <textarea
                                            value={text}
                                            onChange={e => setText(e.target.value)}
                                            rows={8}
                                            placeholder="Q1: Find the longest substring without repeating characters&#10;My answer: I used brute force with O(n³) complexity...&#10;&#10;Q2: Design a URL shortener&#10;My answer: I said we could use a database..."
                                            className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-xl py-3 px-4 text-white placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--cyan)] text-sm transition-colors resize-none"
                                        />
                                    </div>
                                    <button onClick={analyze} disabled={!text.trim()} className="btn-primary self-start disabled:opacity-40 disabled:cursor-not-allowed">
                                        Analyze My Interview 🔍
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 'loading' && (
                            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6 py-20">
                                <div className="w-16 h-16 rounded-full border-2 border-[var(--cyan)] animate-spin" style={{ borderTopColor: 'transparent' }} />
                                <p className="text-white font-medium">Analyzing your interview responses...</p>
                                <p className="text-[var(--muted)] text-sm">Identifying weak areas and building your recovery plan</p>
                            </motion.div>
                        )}

                        {step === 'result' && (
                            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                                {/* Score */}
                                <div className="glass-card p-6 flex items-center gap-6">
                                    <div className="relative w-24 h-24 shrink-0">
                                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--cyan)" strokeWidth="3" strokeDasharray={`${mockAnalysis.score} ${100 - mockAnalysis.score}`} strokeLinecap="round" />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-2xl font-black text-white">{mockAnalysis.score}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-[var(--muted)] uppercase tracking-wide mb-1">Interview Score</div>
                                        <h2 className="text-xl font-bold text-white">{mockAnalysis.company} — {mockAnalysis.role}</h2>
                                        <p className="text-[var(--muted)] text-sm mt-1">You were close! 3 key issues held you back. Here's exactly how to fix them.</p>
                                    </div>
                                    <button onClick={() => setStep('input')} className="ml-auto btn-ghost text-sm py-2">Analyze Another</button>
                                </div>

                                {/* Weaknesses */}
                                <div className="glass-card p-6">
                                    <h3 className="font-bold text-white mb-4 flex items-center gap-2"><AlertCircle size={18} className="text-red-400" /> Areas to Fix</h3>
                                    <div className="flex flex-col gap-3">
                                        {mockAnalysis.weaknesses.map((w, i) => (
                                            <div key={i} className={`border rounded-xl p-4 cursor-pointer ${severityColor[w.severity]}`} onClick={() => setExpanded(expanded === i ? null : i)}>
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium">{w.area}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs uppercase font-bold px-2 py-0.5 rounded">{w.severity}</span>
                                                        <ChevronDown size={16} className={`transition-transform ${expanded === i ? 'rotate-180' : ''}`} />
                                                    </div>
                                                </div>
                                                {expanded === i && <p className="text-sm mt-3 opacity-90 leading-relaxed">{w.tip}</p>}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Strengths */}
                                <div className="glass-card p-6">
                                    <h3 className="font-bold text-white mb-4 flex items-center gap-2"><CheckCircle size={18} className="text-[var(--green)]" /> What You Did Well</h3>
                                    <div className="flex flex-col gap-2">
                                        {mockAnalysis.strengths.map((s, i) => (
                                            <div key={i} className="flex items-center gap-3 text-sm text-[var(--text)]">
                                                <CheckCircle size={14} className="text-[var(--green)] shrink-0" /> {s}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 4-Week Plan */}
                                <div className="glass-card p-6">
                                    <h3 className="font-bold text-white mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-[var(--purple)]" /> 4-Week Recovery Plan</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {mockAnalysis.plan.map((p) => (
                                            <div key={p.week} className="flex gap-3 p-4 bg-[var(--surface2)] rounded-xl">
                                                <div className="w-8 h-8 rounded-full bg-[var(--purple)]/20 text-[var(--purple)] flex items-center justify-center text-xs font-bold shrink-0">W{p.week}</div>
                                                <p className="text-sm text-[var(--text)] leading-relaxed">{p.task}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </main>
        </div>
    );
}
