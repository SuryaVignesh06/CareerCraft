import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, Play, CheckCircle, Code, Briefcase, TrendingUp, Monitor, Shield, Database, Layout, Book, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const navLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Careers', href: '#careers' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
];

const LandingPage = () => {
    return (
        <div className="w-full relative">
            <Navbar />
            <Ticker />
            <main className="flex flex-col items-center w-full px-6 py-12 md:px-12 lg:px-24">
                <HeroSection />
                <HowItWorks />
                <CareerPathsGrid />
                <JobMarketPulse />
                <FeaturesGrid />
                <CompanyTable />
                <Testimonials />
                <Pricing />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)]' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="font-heading text-2xl font-bold tracking-tight text-white">CareerCraft</span>
                    <span className="w-2 h-2 rounded-full bg-[var(--cyan)] shadow-[0_0_10px_var(--cyan)]"></span>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="text-sm font-medium text-[var(--muted)] hover:text-white transition-colors">
                            {link.name}
                        </a>
                    ))}
                </div>
                <div>
                    <Link to="/login" className="btn-primary py-2 px-5 text-sm">
                        Start Free <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </nav>
    );
}

function Ticker() {
    const items = [
        "🔥 React developers in 847% demand",
        "🧠 AI Engineer salaries up 34% YoY — avg ₹18L",
        "⚡ Node.js hiring doubled",
        "📊 Data Science roles up 210% in Hyderabad"
    ];
    return (
        <div className="w-full mt-20 border-y border-[var(--border)] bg-[var(--surface)] overflow-hidden flex whitespace-nowrap py-3">
            <div className="animate-marquee flex gap-12 text-sm text-[var(--cyan)] font-medium tracking-wide">
                {items.map((item, i) => <span key={i}>{item}</span>)}
                {items.map((item, i) => <span key={`dup-${i}`}>{item}</span>)}
            </div>
        </div>
    );
}

function HeroSection() {
    return (
        <section className="w-full max-w-7xl min-h-[80vh] flex flex-col lg:flex-row items-center justify-between py-20 gap-12">
            <div className="lg:w-1/2 flex flex-col items-start gap-8 z-10">
                <motion.h1
                    className="text-5xl md:text-6xl font-extrabold font-heading leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--text)]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Your Career. Your Roadmap. No Guesswork.
                </motion.h1>
                <motion.p
                    className="text-lg md:text-xl text-[var(--muted)] max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    AI-driven personalized roadmaps for Indian B.Tech engineering students. Stop following generic advice and start building your future.
                </motion.p>
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Link to="/onboarding" className="btn-primary">
                        Build My Roadmap <ArrowRight size={20} />
                    </Link>
                    <button className="btn-ghost">
                        See How It Works
                    </button>
                </motion.div>
                <motion.div
                    className="flex items-center gap-6 text-sm text-[var(--muted)] font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="flex items-center gap-2"><CheckCircle size={16} className="text-[var(--green)]" /> 12,400+ Students</div>
                    <div className="flex items-center gap-2"><CheckCircle size={16} className="text-[var(--green)]" /> 94% Job Match</div>
                    <div className="flex items-center gap-2"><CheckCircle size={16} className="text-[var(--green)]" /> Updated Weekly</div>
                </motion.div>
            </div>
            <div className="lg:w-1/2 w-full h-full relative flex items-center justify-center p-4">
                <HeroRoadmapPreview />
            </div>
        </section>
    );
}

function HeroRoadmapPreview() {
    return (
        <div className="relative w-full max-w-md h-[400px] flex flex-col justify-between py-10 items-center border border-[var(--border)] rounded-3xl bg-[var(--bg)]/50 backdrop-blur-xl shadow-[0_0_50px_rgba(0,229,255,0.05)]">
            {/* Visual Roadmap mock */}
            <div className="flex flex-col items-center gap-6 relative w-full px-8">
                <div className="absolute left-1/2 top-4 bottom-4 w-[2px] border-l-2 border-dashed border-[var(--border2)] -translate-x-1/2"></div>
                {[1, 2, 3].map((step, i) => (
                    <motion.div
                        key={step}
                        className="w-full relative z-10 flex flex-col items-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.5 + 1, duration: 0.5 }}
                    >
                        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg font-bold bg-[var(--bg)] 
              ${i === 0 ? 'border-[var(--green)] text-[var(--green)] shadow-[0_0_20px_var(--green)]' :
                                i === 1 ? 'border-[var(--cyan)] text-[var(--cyan)] shadow-[0_0_20px_var(--cyan)] animate-pulse' :
                                    'border-[var(--border2)] text-[var(--muted)]'}`}>
                            {i === 0 ? <CheckCircle size={20} /> : step}
                        </div>
                        <div className="mt-4 glass-card p-4 w-full flex items-center gap-4">
                            <div className="flex-1">
                                <div className="text-sm font-bold text-white mb-1">
                                    {i === 0 ? 'React & State' : i === 1 ? 'Node.js Backend' : 'Advanced System Design'}
                                </div>
                                <div className="w-full h-1 bg-[var(--border2)] rounded-full overflow-hidden">
                                    <div className={`h-full ${i === 0 ? 'bg-[var(--green)] w-full' : i === 1 ? 'bg-[var(--cyan)] w-1/2' : 'w-0'}`}></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function HowItWorks() {
    const steps = [
        { num: '01', title: 'Tell Us About You', desc: 'Share your skills, interests and goals. We analyze your profile.' },
        { num: '02', title: 'Get Your Roadmap', desc: 'Our AI generates a step-by-step custom path for your target career.' },
        { num: '03', title: 'Learn, Track, Get Hired', desc: 'Complete resources, track XP, ace interviews and land your dream job.' }
    ];
    return (
        <section id="how-it-works" className="w-full max-w-7xl py-24 border-t border-[var(--border2)]">
            <h2 className="text-3xl font-heading font-bold text-center mb-16">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((s, i) => (
                    <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left gap-4 p-6 glass-card group">
                        <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[var(--cyan)] to-[var(--bg)] opacity-80 group-hover:from-[var(--purple)] transition-colors">{s.num}</span>
                        <h3 className="text-xl font-bold text-white">{s.title}</h3>
                        <p className="text-[var(--muted)] leading-relaxed">{s.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function CareerPathsGrid() {
    const paths = [
        { title: 'Full Stack', icon: <Code />, salary: '₹6L - ₹12L', time: '5-6 months', dm: '85%' },
        { title: 'AI & ML', icon: <TrendingUp />, salary: '₹8L - ₹15L', time: '6-8 months', dm: '95%' },
        { title: 'Data Science', icon: <Database />, salary: '₹7L - ₹14L', time: '4-6 months', dm: '90%' },
        { title: 'Cloud & DevOps', icon: <Layout />, salary: '₹7L - ₹13L', time: '5-7 months', dm: '88%' },
        { title: 'Cybersecurity', icon: <Shield />, salary: '₹6L - ₹12L', time: '6-8 months', dm: '80%' },
        { title: 'Mobile Dev', icon: <Monitor />, salary: '₹5L - ₹10L', time: '4-5 months', dm: '75%' },
    ];
    return (
        <section id="careers" className="w-full max-w-7xl mx-auto py-24">
            <h2 className="text-3xl font-heading font-bold text-center mb-16">Top Career Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paths.map((p, i) => (
                    <div key={i} className="glass-card p-6 flex flex-col gap-4 group cursor-pointer relative overflow-hidden">
                        <div className="flex items-center gap-4 text-[var(--cyan)] group-hover:text-[var(--purple)] transition-colors">
                            <div className="p-3 bg-[var(--surface2)] rounded-2xl">{p.icon}</div>
                            <h3 className="text-xl font-bold text-white">{p.title}</h3>
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-[var(--muted)]">Average Salary</span>
                                <span className="font-mono text-white">{p.salary}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-[var(--muted)]">Time to Job</span>
                                <span className="font-mono text-white">{p.time}</span>
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-[var(--muted)]">Market Demand</span>
                                    <span className="text-[var(--cyan)] font-bold">{p.dm}</span>
                                </div>
                                <div className="w-full h-1.5 bg-[var(--surface2)] rounded-full overflow-hidden">
                                    <motion.div className="h-full bg-gradient-to-r from-[var(--cyan)] to-[var(--purple)]"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: p.dm }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1 }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="w-full py-2 bg-[var(--cyan)]/10 text-[var(--cyan)] rounded-xl font-medium border border-[var(--cyan)]/30 hover:bg-[var(--cyan)]/20 transition-colors">
                                View Roadmap Preview
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function JobMarketPulse() {
    return (
        <section className="w-full max-w-7xl py-24 border-t border-[var(--border2)]">
            <h2 className="text-3xl font-heading font-bold mb-16 text-center">Live Job Market Pulse</h2>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 glass-card p-8">
                    <h3 className="text-xl font-bold mb-6">Top In-Demand Skills</h3>
                    {[['React', '94%'], ['Python', '89%'], ['DSA', '87%'], ['Node.js', '78%'], ['AWS', '72%']].map(([skill, pct], i) => (
                        <div key={i} className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-white">{skill}</span>
                                <span className="font-mono text-[var(--cyan)]">{pct}</span>
                            </div>
                            <div className="w-full h-2 bg-[var(--surface2)] rounded-full overflow-hidden">
                                <motion.div className="h-full bg-[var(--cyan)]"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: pct }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex-1 glass-card p-8">
                    <h3 className="text-xl font-bold mb-6">Trending Skills</h3>
                    <div className="flex flex-wrap gap-3">
                        {[
                            { name: 'LangChain', status: '🔥', color: 'border-red-500/50 text-red-400 bg-red-500/10' },
                            { name: 'TypeScript', status: '↑', color: 'border-blue-500/50 text-blue-400 bg-blue-500/10' },
                            { name: 'System Design', status: '🔥', color: 'border-orange-500/50 text-orange-400 bg-orange-500/10' },
                            { name: 'Kubernetes', status: '↑', color: 'border-[var(--cyan)]/50 text-[var(--cyan)] bg-[var(--cyan)]/10' },
                            { name: 'Rust', status: '★', color: 'border-purple-500/50 text-purple-400 bg-purple-500/10' }
                        ].map((s, i) => (
                            <div key={i} className={`flex items-center gap-2 px-4 py-2 rounded-full border ${s.color} hover:scale-105 transition-transform cursor-default`}>
                                <span className="font-medium">{s.name}</span>
                                <span>{s.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeaturesGrid() {
    const features = [
        { title: 'Smart Career Roadmap', icon: '🗺️', desc: 'Step-by-step personalized learning paths.' },
        { title: 'Interview Failure Analyzer', icon: '🔁', desc: 'AI breakdown of why you failed and how to fix it.', star: true },
        { title: 'Live Resource Hub', icon: '📚', desc: 'Real-time updated YouTube and Dev.to resources.' },
        { title: 'AI Mentor', icon: '🤖', desc: '24/7 personal tutor for code stucks and careers.' },
        { title: 'ATS Resume Builder', icon: '📄', desc: 'Format your projects to beat company filters.' },
        { title: 'Certification Guide', icon: '🏅', desc: 'Save money by picking the exact right certs.' },
        { title: 'Company Tracker', icon: '🏢', desc: 'Follow your dream tech companies actively.' },
        { title: 'Why This Matters', icon: '🏷️', desc: 'Understand the business value of every skill node.', star: true },
        { title: 'XP & Gamification', icon: '🎮', desc: 'Earn XP, badges and stay on a hot streak.' },
    ];
    return (
        <section id="features" className="w-full max-w-7xl py-24 relative">
            <h2 className="text-3xl font-heading font-bold text-center mb-16">Platform Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((f, i) => (
                    <div key={i} className={`glass-card p-6 flex flex-col gap-3 group relative overflow-hidden ${f.star ? 'border-[var(--cyan)]/40 shadow-[0_0_15px_rgba(0,229,255,0.05)]' : ''}`}>
                        {f.star && <div className="absolute top-0 right-0 p-2 text-yellow-400"><Star size={16} fill="currentColor" /></div>}
                        <div className="text-3xl">{f.icon}</div>
                        <h3 className="font-bold text-lg text-white">{f.title}</h3>
                        <p className="text-sm text-[var(--muted)]">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function CompanyTable() {
    const rows = [
        { name: 'Zoho', role: 'SDE 1', skills: ['C/C++', 'DS/Algo', 'System Design'], lvl: 'Entry', status: true },
        { name: 'Freshworks', role: 'Frontend Dev', skills: ['React', 'JavaScript', 'CSS'], lvl: 'Junior', status: false },
        { name: 'Swiggy', role: 'Backend Eng.', skills: ['Go', 'Node.js', 'System Design'], lvl: 'Mid', status: true },
        { name: 'Google', role: 'Software Eng.', skills: ['DS/Algo', 'Python', 'System Design'], lvl: 'L3', status: true },
    ];
    return (
        <section className="w-full max-w-7xl py-24 border-t border-[var(--border2)]">
            <h2 className="text-3xl font-heading font-bold text-center mb-16">Company Intelligence</h2>
            <div className="glass-card overflow-x-auto w-full">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[var(--border2)] bg-[var(--surface2)] text-[var(--muted)] text-sm uppercase tracking-wide">
                            <th className="p-4 py-6 font-medium">Company</th>
                            <th className="p-4 font-medium">Role</th>
                            <th className="p-4 font-medium">Skills Required</th>
                            <th className="p-4 font-medium">Level</th>
                            <th className="p-4 font-medium px-8 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border2)]">
                        {rows.map((r, i) => (
                            <tr key={i} className="hover:bg-[var(--surface2)]/50 transition-colors group">
                                <td className="p-4 font-bold text-white">{r.name}</td>
                                <td className="p-4 text-[var(--muted)]">{r.role}</td>
                                <td className="p-4">
                                    <div className="flex gap-2 flex-wrap">
                                        {r.skills.map(s => <span key={s} className="px-2 py-1 bg-[var(--cyan)]/10 text-[var(--cyan)] text-xs rounded-md border border-[var(--cyan)]/20">{s}</span>)}
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-[var(--muted)]">{r.lvl}</td>
                                <td className="p-4 text-right flex justify-end px-8 items-center h-[72px]">
                                    {r.status ? (
                                        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse shadow-[0_0_8px_var(--green)]" /> <span className="text-xs text-[var(--green)] uppercase font-semibold">Hiring</span></div>
                                    ) : (
                                        <span className="text-xs text-[var(--muted)] uppercase">Closed</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

function Testimonials() {
    const reviews = [
        { text: "The Interview Failure Analyzer completely changed my prep. I failed Swiggy, pasted the questions, and Claude told me my DP was weak. 2 weeks later I cracked Zoho.", author: "Rahul M.", info: "SRM / Backend Dev" },
        { text: "Instead of paying ₹50k for a bootcamp, the Certification Guide showed me exactly which ₹2000 AWS cert to get. I got 3 interviews last week.", author: "Sneha P.", info: "VIT / Cloud Eng" },
        { text: "CareerCraft doesn't just list tutorials. It literally builds a tree of exactly what I need and removes the guesswork. Incredible tool.", author: "Aditya S.", info: "NIT W / Full Stack" }
    ];
    return (
        <section className="w-full max-w-7xl py-24">
            <h2 className="text-3xl font-heading font-bold text-center mb-16">Student Success</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviews.map((r, i) => (
                    <div key={i} className="glass-card p-8 flex flex-col justify-between">
                        <p className="text-[var(--text)] text-sm leading-relaxed italic mb-6">"{r.text}"</p>
                        <div className="flex flex-col">
                            <span className="font-bold text-white">{r.author}</span>
                            <span className="text-xs text-[var(--muted)]">{r.info}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Pricing() {
    const [annual, setAnnual] = useState(false);
    return (
        <section id="pricing" className="w-full max-w-5xl mx-auto py-24 mb-20 text-center">
            <h2 className="text-3xl font-heading font-bold mb-8">Simple Pricing</h2>
            <div className="flex items-center justify-center gap-3 mb-12">
                <span className={`text-sm ${!annual ? 'text-white font-bold' : 'text-[var(--muted)]'}`}>Monthly</span>
                <button onClick={() => setAnnual(!annual)} className="w-14 h-8 bg-[var(--surface2)] rounded-full p-1 border border-[var(--border2)] transition-colors relative">
                    <div className={`w-6 h-6 rounded-full bg-[var(--cyan)] shadow-[0_0_10px_var(--cyan)] transition-transform ${annual ? 'translate-x-6' : ''}`}></div>
                </button>
                <span className={`text-sm ${annual ? 'text-white font-bold' : 'text-[var(--muted)]'}`}>Yearly <span className="text-xs text-[var(--green)] bg-[var(--green)]/10 px-2 py-0.5 rounded ml-1">Save 30%</span></span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                <div className="glass-card p-10 flex flex-col relative">
                    <h3 className="text-2xl font-bold mb-2">Free</h3>
                    <p className="text-[var(--muted)] text-sm mb-6">Everything you need to get started.</p>
                    <div className="text-5xl font-heading font-black mb-8">₹0<span className="text-lg font-normal text-[var(--muted)]">/mo</span></div>
                    <ul className="flex flex-col gap-4 mb-8 flex-1">
                        <li className="flex items-center gap-3"><CheckCircle size={18} className="text-[var(--muted)]" /> <span className="text-sm">Smart Career Roadmap</span></li>
                        <li className="flex items-center gap-3"><CheckCircle size={18} className="text-[var(--muted)]" /> <span className="text-sm">Live Resource Hub (Basic)</span></li>
                        <li className="flex items-center gap-3"><CheckCircle size={18} className="text-[var(--muted)]" /> <span className="text-sm">XP & Gamification</span></li>
                    </ul>
                    <button className="btn-ghost w-full">Current Plan</button>
                </div>

                <div className="glass-card p-10 flex flex-col relative border-[var(--cyan)]/40 shadow-[0_0_30px_rgba(0,229,255,0.1)] group">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[var(--cyan)] to-[var(--purple)] rounded-full text-xs font-bold text-white shadow-lg">RECOMMENDED</div>
                    <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
                    <p className="text-[var(--muted)] text-sm mb-6">Unlock AI mentoring & analysis.</p>
                    <div className="text-5xl font-heading font-black text-white mb-8">₹{annual ? '209' : '299'}<span className="text-lg font-normal text-[var(--muted)]">/mo</span></div>
                    <ul className="flex flex-col gap-4 mb-8 flex-1">
                        <li className="flex items-center gap-3"><CheckCircle size={18} className="text-[var(--cyan)]" /> <span className="text-sm font-medium">Everything in Free</span></li>
                        <li className="flex items-center gap-3"><CheckCircle size={18} className="text-[var(--cyan)]" /> <span className="text-sm font-medium text-[var(--cyan)]">AI Mentor (Unlimited)</span></li>
                        <li className="flex items-center gap-3"><CheckCircle size={18} className="text-[var(--cyan)]" /> <span className="text-sm font-medium text-[var(--cyan)]">Interview Failure Analyzer</span></li>
                        <li className="flex items-center gap-3"><CheckCircle size={18} className="text-[var(--cyan)]" /> <span className="text-sm">ATS Resume Builder</span></li>
                        <li className="flex items-center gap-3"><CheckCircle size={18} className="text-[var(--cyan)]" /> <span className="text-sm">Live Market Data</span></li>
                    </ul>
                    <button className="btn-primary w-full group-hover:scale-105">Upgrade to Pro</button>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="w-full bg-[#03060A] py-16 border-t border-[var(--border2)]">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12">
                <div className="flex flex-col max-w-xs">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="font-heading text-xl font-bold tracking-tight text-white">CareerCraft</span>
                        <span className="w-2 h-2 rounded-full bg-[var(--cyan)]"></span>
                    </div>
                    <p className="text-[var(--muted)] text-sm leading-relaxed mb-6">Built extensively for Indian engineering students. Navigate your career without the guesswork.</p>
                </div>
                <div className="flex gap-16">
                    <div className="flex flex-col gap-3 text-sm">
                        <span className="text-white font-bold mb-2">Platform</span>
                        <Link to="/roadmap" className="text-[var(--muted)] hover:text-white transition-colors">Roadmap</Link>
                        <Link to="/analyzer" className="text-[var(--muted)] hover:text-white transition-colors">Interview Analyzer</Link>
                        <Link to="/mentor" className="text-[var(--muted)] hover:text-white transition-colors">AI Mentor</Link>
                        <Link to="/resume" className="text-[var(--muted)] hover:text-white transition-colors">Resume Builder</Link>
                    </div>
                    <div className="flex flex-col gap-3 text-sm">
                        <span className="text-white font-bold mb-2">Company</span>
                        <a href="#" className="text-[var(--muted)] hover:text-white transition-colors">About Us</a>
                        <a href="#" className="text-[var(--muted)] hover:text-white transition-colors">Careers</a>
                        <a href="#" className="text-[var(--muted)] hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="text-[var(--muted)] hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-[var(--border2)] text-center text-xs text-[var(--muted)]">
                &copy; {new Date().getFullYear()} CareerCraft. All rights reserved.
            </div>
        </footer>
    );
}
