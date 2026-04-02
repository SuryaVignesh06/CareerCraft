import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Map, Bot, FileText, Download, Wand2, CheckCircle, Plus, Trash2 } from 'lucide-react';

const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Map, label: 'Roadmap', path: '/roadmap' },
    { icon: Bot, label: 'AI Mentor', path: '/mentor' },
    { icon: FileText, label: 'Analyzer', path: '/analyzer' },
    { icon: FileText, label: 'Resume', path: '/resume' },
];

const atsScore = 84;
const atsTips = [
    { tip: 'Add measurable metrics to "Built a web app"', done: false },
    { tip: 'Include keywords: React, REST API, CI/CD', done: false },
    { tip: 'Phone number missing from contact section', done: false },
    { tip: 'Skills section is well-structured ✓', done: true },
    { tip: 'Education section includes CGPA ✓', done: true },
];

export default function ResumePage() {
    const [form, setForm] = useState({
        name: 'Chaitu Reddy',
        email: 'chaitu@gmail.com',
        phone: '+91 9876543210',
        linkedin: 'linkedin.com/in/chaitu',
        github: 'github.com/chaitu',
        summary: 'Final year B.Tech CSE student passionate about Full Stack development. Built 3 production-ready apps with React and Node.js. Seeking SDE roles at product companies.',
        skills: 'React, JavaScript, Node.js, Express, MongoDB, SQL, Git, REST APIs, CSS, TailwindCSS',
        projects: [
            { name: 'CareerCraft Clone', desc: 'Full-stack career platform using React, Firebase and Tailwind. 200+ users.', link: 'github.com/chaitu/careercraft' },
            { name: 'FoodCart App', desc: 'E-commerce food ordering app with cart, auth, and Stripe payments.', link: 'github.com/chaitu/foodcart' },
        ],
        education: 'B.Tech Computer Science | XYZ University | 2022-2026 | CGPA: 8.4',
    });

    const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

    return (
        <div className="min-h-screen bg-[var(--bg)] flex">
            <aside className="w-64 shrink-0 border-r border-[var(--border)] bg-[var(--surface)] flex flex-col py-6 px-4 gap-2 fixed h-full z-30">
                <Link to="/" className="flex items-center gap-2 px-3 mb-6">
                    <span className="font-heading text-xl font-bold text-white">CareerCraft</span>
                    <span className="w-2 h-2 ml-2 rounded-full bg-[var(--cyan)]" />
                </Link>
                {navItems.map(({ icon: Icon, label, path }) => (
                    <Link key={path} to={path} className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${path === '/resume' ? 'bg-[var(--cyan)]/10 text-[var(--cyan)] border border-[var(--cyan)]/20' : 'text-[var(--muted)] hover:text-white hover:bg-[var(--surface2)]'}`}>
                        <Icon size={18} />{label}
                    </Link>
                ))}
            </aside>

            <main className="ml-64 flex-1 p-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-heading font-bold text-white mb-1">ATS Resume Builder</h1>
                            <p className="text-[var(--muted)]">Build an ATS-optimized resume that gets past company filters</p>
                        </div>
                        <button className="btn-primary text-sm py-2.5">
                            <Download size={16} /> Export PDF
                        </button>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        {/* Form */}
                        <div className="xl:col-span-2 flex flex-col gap-4">
                            {/* Basic Info */}
                            <div className="glass-card p-6">
                                <h3 className="font-bold text-white mb-4">Personal Info</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {[['name', 'Full Name'], ['email', 'Email'], ['phone', 'Phone'], ['linkedin', 'LinkedIn'], ['github', 'GitHub']].map(([key, label]) => (
                                        <div key={key} className={key === 'name' ? 'col-span-2' : ''}>
                                            <label className="text-xs text-[var(--muted)] mb-1 block">{label}</label>
                                            <input value={form[key]} onChange={e => set(key, e.target.value)} className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-xl py-2.5 px-4 text-white placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--cyan)] text-sm transition-colors" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="glass-card p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-white">Professional Summary</h3>
                                    <button className="flex items-center gap-1 text-xs text-[var(--cyan)] hover:underline"><Wand2 size={12} /> AI Improve</button>
                                </div>
                                <textarea value={form.summary} onChange={e => set('summary', e.target.value)} rows={3} className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[var(--cyan)] text-sm transition-colors resize-none" />
                            </div>

                            {/* Skills */}
                            <div className="glass-card p-6">
                                <h3 className="font-bold text-white mb-4">Skills</h3>
                                <textarea value={form.skills} onChange={e => set('skills', e.target.value)} rows={2} placeholder="Comma-separated skills..." className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[var(--cyan)] text-sm transition-colors resize-none" />
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {form.skills.split(',').map(s => s.trim()).filter(Boolean).map((s, i) => (
                                        <span key={i} className="text-xs px-3 py-1 rounded-full bg-[var(--cyan)]/10 text-[var(--cyan)] border border-[var(--cyan)]/20">{s}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Projects */}
                            <div className="glass-card p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-white">Projects</h3>
                                    <button onClick={() => set('projects', [...form.projects, { name: '', desc: '', link: '' }])} className="flex items-center gap-1 text-xs text-[var(--cyan)] hover:underline"><Plus size={12} /> Add</button>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {form.projects.map((p, i) => (
                                        <div key={i} className="flex flex-col gap-2 p-4 bg-[var(--surface2)] rounded-xl">
                                            <div className="flex items-center gap-2">
                                                <input value={p.name} onChange={e => { const ps = [...form.projects]; ps[i].name = e.target.value; set('projects', ps); }} placeholder="Project Name" className="flex-1 bg-transparent border border-[var(--border)] rounded-lg py-2 px-3 text-white text-sm focus:outline-none focus:border-[var(--cyan)]" />
                                                <button onClick={() => set('projects', form.projects.filter((_, j) => j !== i))} className="text-[var(--muted)] hover:text-red-400"><Trash2 size={14} /></button>
                                            </div>
                                            <textarea value={p.desc} onChange={e => { const ps = [...form.projects]; ps[i].desc = e.target.value; set('projects', ps); }} rows={2} placeholder="Description with impact metrics..." className="bg-transparent border border-[var(--border)] rounded-lg py-2 px-3 text-white text-sm focus:outline-none focus:border-[var(--cyan)] resize-none" />
                                            <input value={p.link} onChange={e => { const ps = [...form.projects]; ps[i].link = e.target.value; set('projects', ps); }} placeholder="GitHub / Live link" className="bg-transparent border border-[var(--border)] rounded-lg py-2 px-3 text-[var(--muted)] text-sm focus:outline-none focus:border-[var(--cyan)]" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Education */}
                            <div className="glass-card p-6">
                                <h3 className="font-bold text-white mb-4">Education</h3>
                                <input value={form.education} onChange={e => set('education', e.target.value)} className="w-full bg-[var(--surface2)] border border-[var(--border)] rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-[var(--cyan)] text-sm transition-colors" />
                            </div>
                        </div>

                        {/* ATS Score */}
                        <div className="flex flex-col gap-4">
                            <div className="glass-card p-6 sticky top-8">
                                <h3 className="font-bold text-white mb-5">ATS Score</h3>
                                <div className="flex flex-col items-center gap-4 mb-6">
                                    <div className="relative w-28 h-28">
                                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                            <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                                            <motion.circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--cyan)" strokeWidth="3"
                                                strokeDasharray={`${atsScore} ${100 - atsScore}`} strokeLinecap="round"
                                                initial={{ strokeDasharray: '0 100' }}
                                                animate={{ strokeDasharray: `${atsScore} ${100 - atsScore}` }}
                                                transition={{ duration: 1.5, delay: 0.3 }}
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-2xl font-black text-white">{atsScore}</span>
                                            <span className="text-xs text-[var(--muted)]">/ 100</span>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-[var(--green)] font-bold">Good Score!</div>
                                        <div className="text-xs text-[var(--muted)]">Fix 3 issues to reach 95+</div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <p className="text-xs text-[var(--muted)] uppercase tracking-wide font-medium">Improvement Tips</p>
                                    {atsTips.map((t, i) => (
                                        <div key={i} className={`flex items-start gap-2 text-sm ${t.done ? 'text-[var(--muted)] line-through' : 'text-[var(--text)]'}`}>
                                            <CheckCircle size={14} className={`mt-0.5 shrink-0 ${t.done ? 'text-[var(--green)]' : 'text-[var(--muted)]'}`} />
                                            {t.tip}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
