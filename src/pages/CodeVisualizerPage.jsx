import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Map, Bot, Award, Briefcase, Code as CodeIcon, FileText, LogOut, Play, Code, ChevronLeft, ChevronRight, RotateCcw, Box, Terminal, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { careerMeta } from '../data/roadmaps';

const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Map, label: 'Roadmap', path: '/roadmap' },
    { icon: Bot, label: 'AI Mentor', path: '/mentor' },
    { icon: Award, label: 'Certifications', path: '/certifications' },
    { icon: Briefcase, label: 'Internships', path: '/internships' },
    { icon: CodeIcon, label: 'Visualizer', path: '/visualizer' },
    { icon: FileText, label: 'Analyzer', path: '/analyzer' },
    { icon: FileText, label: 'Resume', path: '/resume' },
];

export default function CodeVisualizerPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, userProfile, logout } = useAuth();
    
    // Sidebar common logic
    const career = userProfile?.career || 'fullstack';
    const xp = userProfile?.xp || 0;
    const level = xp < 300 ? 1 : xp < 800 ? 2 : xp < 1500 ? 3 : xp < 2500 ? 4 : 5;
    const meta = careerMeta[career] || careerMeta.fullstack;
    const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'there';
    const handleLogout = () => { logout(); navigate('/login'); };

    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('');
    
    // Visualization state
    const [trace, setTrace] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleVisualize = async () => {
        if (!code.trim()) return;
        setLoading(true);
        setError('');
        setTrace(null);
        setCurrentStep(0);

        try {
            const res = await fetch('http://localhost:5000/api/visualize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: code, language: language })
            });
            const data = await res.json();
            if (res.ok) {
                setTrace(data);
            } else {
                setError(data.error || 'Failed to capture execution trace.');
            }
        } catch (err) {
            setError('Could not connect to the visualization backend. Please ensure the Python server is running.');
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => {
        if (trace && currentStep < trace.length - 1) setCurrentStep(c => c + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(c => c - 1);
    };

    // Derived state for the active step
    const activeStepData = trace ? trace[currentStep] : null;
    const codeLines = code.split('\n');

    return (
        <div className="min-h-screen bg-[var(--bg)] flex">
            {/* Sidebar */}
            <aside className="w-64 shrink-0 border-r border-[var(--border)] bg-[var(--surface)] flex flex-col py-6 px-4 gap-2 fixed h-full z-30 overflow-y-auto">
                <Link to="/" className="flex items-center gap-2 px-3 mb-6">
                    <span className="font-heading text-xl font-bold text-white">CareerCraft</span>
                    <span className="w-2 h-2 rounded-full bg-[var(--cyan)]" />
                </Link>

                {navItems.map(({ icon: Icon, label, path }) => (
                    <Link key={path} to={path} className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${location.pathname === path ? 'bg-[var(--cyan)]/10 text-[var(--cyan)] border border-[var(--cyan)]/20' : 'text-[var(--muted)] hover:text-white hover:bg-[var(--surface2)]'}`}>
                        <Icon size={18} /> {label}
                    </Link>
                ))}

                <div className="mt-auto flex flex-col gap-3">
                    <div className="glass-card p-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--purple)] flex items-center justify-center text-sm font-bold text-white shrink-0">
                            {(currentUser?.displayName?.[0] || currentUser?.email?.[0] || 'U').toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-white truncate">{currentUser?.displayName || 'User'}</div>
                            <div className="text-xs text-[var(--muted)] truncate">{currentUser?.email}</div>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-[var(--muted)] hover:text-red-400 hover:bg-red-500/10 transition-all w-full">
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8 h-screen flex flex-col">
                <div className="mb-6 flex items-center gap-3 justify-between">
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
                            <CodeIcon className="text-[var(--cyan)]" size={32} /> Code Visualizer
                        </h1>
                        <p className="text-[var(--muted)] mt-1">See your code execute line by line, visually track variables and memory.</p>
                    </div>
                </div>

                <div className="flex-1 glass-card p-6 flex flex-col min-h-0 bg-[#0f111a] border-[#2a2d3e]">
                    {!trace ? (
                        /* Setup View */
                        <div className="flex-1 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-white">Select Language</label>
                                <select 
                                    className="bg-[#1e1e2e] text-white text-sm border border-[#313244] rounded-lg px-3 py-2 outline-none focus:border-[var(--cyan)]"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                >
                                    <option value="javascript">JavaScript</option>
                                    <option value="python">Python</option>
                                    <option value="java">Java</option>
                                    <option value="cpp">C++</option>
                                    <option value="c">C</option>
                                </select>
                            </div>
                            
                            <div className="flex-1 rounded-xl border border-[#313244] overflow-hidden flex flex-col bg-[#1e1e2e]">
                                <div className="bg-[#181825] px-4 py-2 flex items-center gap-2 border-b border-[#313244]">
                                    <Code size={14} className="text-[#a6adc8]" />
                                    <span className="text-xs text-[#a6adc8] font-mono">main.{language === 'javascript' ? 'js' : language === 'python' ? 'py' : language}</span>
                                </div>
                                <textarea
                                    className="flex-1 w-full p-4 bg-transparent text-[#cdd6f4] font-mono text-sm resize-none outline-none leading-relaxed"
                                    placeholder="// Paste your code here to visualize...&#10;// Example:&#10;let x = 5;&#10;for(let i = 0; i < 3; i++) {&#10;  x += i;&#10;  console.log(x);&#10;}"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    spellCheck="false"
                                />
                            </div>

                            {error && <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">{error}</div>}

                            <button 
                                onClick={handleVisualize}
                                disabled={!code.trim() || loading}
                                className="btn-primary py-3 flex items-center justify-center gap-2 w-full disabled:opacity-50 disabled:cursor-not-allowed bg-[var(--cyan)] hover:bg-[#00cce6] text-black font-bold text-lg"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                        Tracing Execution...
                                    </>
                                ) : (
                                    <>
                                        <Play size={20} /> Build Native Visualization
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        /* Native Visualizer View */
                        <div className="flex-1 flex flex-col min-h-0">
                            {/* Toolbar */}
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#313244]">
                                <div className="flex items-center gap-4">
                                    <button 
                                        onClick={() => setTrace(null)}
                                        className="text-xs px-3 py-1.5 bg-[#313244] text-[#cdd6f4] rounded-lg hover:bg-[#45475a] transition-colors flex items-center gap-1"
                                    >
                                        <RotateCcw size={14} /> Editor
                                    </button>
                                    <div className="px-2 py-1 bg-[var(--cyan)]/10 text-[var(--cyan)] rounded-md text-xs font-bold uppercase border border-[var(--cyan)]/20 shadow-[0_0_10px_rgba(0,229,255,0.1)]">
                                        {language}
                                    </div>
                                    <span className="text-sm text-[#a6adc8] font-medium">Native Execution Engin</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-[#a6adc8] font-mono font-bold px-3 py-1.5 bg-black/20 rounded-md">
                                        Step {currentStep + 1} of {trace.length}
                                    </span>
                                    <button 
                                        onClick={prevStep}
                                        disabled={currentStep === 0}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#313244] text-white font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#45475a] transition-colors shadow-sm"
                                    >
                                        <ChevronLeft size={16} /> Previous
                                    </button>
                                    <button 
                                        onClick={nextStep}
                                        disabled={currentStep === trace.length - 1}
                                        className="flex items-center gap-1.5 px-6 py-2 rounded-lg bg-[var(--cyan)] text-black font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#00cce6] transition-colors shadow-md shadow-[var(--cyan)]/20"
                                    >
                                        Next Step <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Split Pane */}
                            <div className="flex-1 flex gap-6 min-h-0">
                                {/* Left: Source Code */}
                                <div className="flex-1 rounded-xl border border-[#313244] overflow-hidden flex flex-col bg-[#1e1e2e]">
                                    <div className="bg-[#181825] px-4 py-2 flex items-center gap-2 border-b border-[#313244]">
                                        <Code size={14} className="text-[#a6adc8]" />
                                        <span className="text-xs text-[#a6adc8] font-mono">Source Code</span>
                                    </div>
                                    <div className="flex-1 overflow-auto p-4 text-sm font-mono leading-[1.6]">
                                        {codeLines.map((lineText, i) => {
                                            const lineNum = i + 1;
                                            const isActive = activeStepData && activeStepData.line === lineNum;
                                            return (
                                                <div 
                                                    key={i} 
                                                    className={`flex rounded-md transition-colors ${isActive ? 'bg-[var(--cyan)]/20 border-l-4 border-[var(--cyan)]' : 'border-l-4 border-transparent hover:bg-white/5'}`}
                                                >
                                                    <div className={`w-8 shrink-0 text-right pr-3 select-none ${isActive ? 'text-[var(--cyan)] font-bold' : 'text-[#6c7086]'}`}>
                                                        {lineNum}
                                                    </div>
                                                    <div className={`flex-1 whitespace-pre pl-1 ${isActive ? 'text-white' : 'text-[#cdd6f4]'}`}>
                                                        {lineText}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Right: State & Output */}
                                <div className="w-[400px] flex flex-col gap-4">
                                    {/* Action Explanation */}
                                    <div className="glass-card bg-[#1e1e2e] border-[#313244] p-4 shrink-0">
                                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#313244]">
                                            <MessageSquare size={16} className="text-[var(--purple)]" />
                                            <h3 className="text-sm font-bold text-white">What's happening?</h3>
                                        </div>
                                        <p className="text-sm text-[#cdd6f4] leading-relaxed">
                                            {activeStepData?.explanation || 'Loading step state...'}
                                        </p>
                                    </div>

                                    {/* Local Variables */}
                                    <div className="glass-card bg-[#1e1e2e] border-[#313244] p-4 flex-1 flex flex-col overflow-hidden">
                                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#313244] shrink-0">
                                            <Box size={16} className="text-[var(--cyan)]" />
                                            <h3 className="text-sm font-bold text-white">Local Variables</h3>
                                        </div>
                                        <div className="flex-1 overflow-auto">
                                            {activeStepData?.variables && Object.keys(activeStepData.variables).length > 0 ? (
                                                <div className="space-y-2">
                                                    {Object.entries(activeStepData.variables).map(([key, val]) => (
                                                        <div key={key} className="flex flex-col bg-[#11111b] p-2 rounded-lg border border-[#313244]">
                                                            <div className="text-xs text-[#a6adc8] font-mono mb-1">{key}</div>
                                                            <div className="text-sm text-[var(--cyan)] font-mono font-bold break-all">{val}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-xs text-[#6c7086] italic text-center mt-4">
                                                    No variables allocated in current scope.
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Output Console */}
                                    <div className="glass-card bg-[#1e1e2e] border-[#313244] p-4 shrink-0 h-32 flex flex-col">
                                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#313244]">
                                            <Terminal size={16} className="text-[var(--green)]" />
                                            <h3 className="text-sm font-bold text-white">Console Output</h3>
                                        </div>
                                        <div className="flex-1 overflow-auto bg-[#11111b] rounded-lg p-3 border border-[#313244]">
                                            <pre className="text-xs text-[#a6adc8] font-mono whitespace-pre-wrap">
                                                {activeStepData?.output || ''}
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
