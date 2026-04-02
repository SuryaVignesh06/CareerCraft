import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Map, Bot, FileText, CheckCircle, Lock, ChevronRight, Clock, BookOpen, Youtube, ExternalLink, Star, Flame, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { roadmapData, careerMeta, getProgress } from '../data/roadmaps';

const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Map, label: 'Roadmap', path: '/roadmap' },
    { icon: Bot, label: 'AI Mentor', path: '/mentor' },
    { icon: FileText, label: 'Analyzer', path: '/analyzer' },
    { icon: FileText, label: 'Resume', path: '/resume' },
];

function getNodeStatus(nodeId, completedIds, allIds) {
    if (completedIds.includes(nodeId)) return 'done';
    const idx = allIds.indexOf(nodeId);
    if (idx === 0 || completedIds.includes(allIds[idx - 1])) return 'active';
    return 'locked';
}

export default function RoadmapPage() {
    const [expanded, setExpanded] = useState(null);
    const { userProfile, updateProfile } = useAuth();

    const career = userProfile?.career || 'fullstack';
    const completedIds = userProfile?.completedNodes || [];
    const xp = userProfile?.xp || 0;
    const activity = userProfile?.activityLog || [];

    const meta = careerMeta[career] || careerMeta.fullstack;
    const phases = roadmapData[career] || roadmapData.fullstack;
    const allNodes = phases.flatMap(p => p.items);
    const allIds = allNodes.map(n => n.id);
    const progress = getProgress(career, completedIds);
    const totalXPAvailable = allNodes.reduce((sum, n) => sum + n.xp, 0);

    const markComplete = (node) => {
        if (completedIds.includes(node.id)) return;
        const gainedXp = node.xp;
        updateProfile({
            completedNodes: [...completedIds, node.id],
            xp: xp + gainedXp,
            activityLog: [
                { action: `Completed "${node.title}"`, xp: `+${gainedXp} XP`, timestamp: new Date().toISOString() },
                ...activity.slice(0, 9),
            ],
        });
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
                    <Link key={path} to={path}
                        className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${path === '/roadmap' ? 'bg-[var(--cyan)]/10 text-[var(--cyan)] border border-[var(--cyan)]/20' : 'text-[var(--muted)] hover:text-white hover:bg-[var(--surface2)]'}`}>
                        <Icon size={18} /> {label}
                    </Link>
                ))}
            </aside>

            <main className="ml-64 flex-1 p-8 overflow-y-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-1">
                        <span className="text-3xl">{meta.emoji}</span>
                        <h1 className="text-3xl font-heading font-bold text-white">{meta.label} Roadmap</h1>
                    </div>
                    <p className="text-[var(--muted)] mb-8">
                        Avg salary: <span className="text-white font-medium">{meta.salary}</span> · {allNodes.length} modules · {totalXPAvailable.toLocaleString()} XP total
                    </p>

                    {/* Progress overview */}
                    <div className="glass-card p-6 mb-8">
                        <div className="flex items-center gap-8 flex-wrap">
                            <div className="flex flex-col items-center">
                                <div className="text-3xl font-bold text-white">{completedIds.length}</div>
                                <div className="text-xs text-[var(--muted)] mt-0.5">Completed</div>
                            </div>
                            <div className="flex-1 min-w-48">
                                <div className="flex justify-between text-xs text-[var(--muted)] mb-2">
                                    <span>Overall Progress</span>
                                    <span className="text-white font-bold">{progress}%</span>
                                </div>
                                <div className="w-full h-2.5 bg-[var(--surface2)] rounded-full overflow-hidden">
                                    <motion.div className="h-full rounded-full"
                                        style={{ background: `linear-gradient(to right, ${meta.color}, var(--purple))` }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1 }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-[var(--muted)] mt-1">
                                    <span>{completedIds.length} / {allNodes.length} modules</span>
                                    <span>{allNodes.length - completedIds.length} remaining</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-3xl font-bold text-[var(--cyan)]">{xp.toLocaleString()}</div>
                                <div className="text-xs text-[var(--muted)] mt-0.5">XP Earned</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-3xl font-bold text-[var(--green)]">{allNodes.length - completedIds.length}</div>
                                <div className="text-xs text-[var(--muted)] mt-0.5">Remaining</div>
                            </div>
                        </div>
                    </div>

                    {/* Phases */}
                    <div className="flex flex-col gap-10">
                        {phases.map((phase, phaseIdx) => {
                            const phaseCompleted = phase.items.filter(n => completedIds.includes(n.id)).length;
                            return (
                                <div key={phase.phase}>
                                    {/* Phase header */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ background: phase.color, boxShadow: `0 0 10px ${phase.color}` }} />
                                            <h2 className="font-heading font-bold text-lg text-white">{phase.phase}</h2>
                                        </div>
                                        <span className="text-xs text-[var(--muted)] bg-[var(--surface2)] px-2 py-1 rounded-full">
                                            {phaseCompleted}/{phase.items.length} done
                                        </span>
                                        {phaseCompleted === phase.items.length && (
                                            <span className="text-xs text-[var(--green)] bg-[var(--green)]/10 px-2 py-1 rounded-full flex items-center gap-1">
                                                <Star size={10} fill="currentColor" /> Phase Complete!
                                            </span>
                                        )}
                                    </div>

                                    {/* Nodes */}
                                    <div className="flex flex-col gap-3 pl-6 border-l-2" style={{ borderColor: `${phase.color}30` }}>
                                        {phase.items.map((node) => {
                                            const status = getNodeStatus(node.id, completedIds, allIds);
                                            const isExp = expanded === node.id;
                                            return (
                                                <motion.div key={node.id}
                                                    className={`glass-card overflow-hidden transition-all ${status === 'locked' ? 'opacity-45' : ''}`}
                                                    whileHover={status !== 'locked' ? { x: 4 } : {}}
                                                >
                                                    {/* Node header — clickable */}
                                                    <div
                                                        className={`flex items-center gap-4 p-5 cursor-pointer ${status === 'locked' ? 'cursor-default' : ''}`}
                                                        onClick={() => status !== 'locked' && setExpanded(isExp ? null : node.id)}
                                                    >
                                                        {/* Status icon */}
                                                        <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${status === 'done' ? 'bg-[var(--green)]/20' : status === 'active' ? 'bg-[var(--cyan)]/20 animate-pulse' : 'bg-[var(--surface2)]'}`}>
                                                            {status === 'done'
                                                                ? <CheckCircle size={20} className="text-[var(--green)]" />
                                                                : status === 'active'
                                                                ? <BookOpen size={20} className="text-[var(--cyan)]" />
                                                                : <Lock size={20} className="text-[var(--muted)]" />}
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <div className="font-bold text-white">{node.title}</div>
                                                            <div className="flex items-center gap-3 mt-1 text-xs text-[var(--muted)]">
                                                                <span className="flex items-center gap-1"><Clock size={11} /> {node.time}</span>
                                                                <span className="font-bold" style={{ color: meta.color }}>+{node.xp} XP</span>
                                                                <span className="capitalize px-1.5 py-0.5 rounded text-xs font-medium"
                                                                    style={{ background: `${phase.color}15`, color: phase.color }}>
                                                                    {status}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            {status === 'active' && (
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); markComplete(node); }}
                                                                    className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                                                                    style={{ background: `${meta.color}20`, color: meta.color, border: `1px solid ${meta.color}40` }}
                                                                >
                                                                    ✓ Mark Done
                                                                </button>
                                                            )}
                                                            {status !== 'locked' && (
                                                                <ChevronRight size={16} className={`text-[var(--muted)] transition-transform ${isExp ? 'rotate-90' : ''}`} />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Expanded resources */}
                                                    {isExp && node.resources && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="border-t border-[var(--border)] px-5 pb-5 pt-4"
                                                        >
                                                            <p className="text-xs text-[var(--muted)] mb-3 font-medium uppercase tracking-widest">Recommended Resources</p>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                                {node.resources.map((r, i) => (
                                                                    <div key={i} className="flex items-center gap-2 text-sm text-[var(--cyan)] hover:text-white transition-colors cursor-pointer px-3 py-2 rounded-xl bg-[var(--surface2)] hover:bg-[var(--surface)] group">
                                                                        <ExternalLink size={13} />
                                                                        <span>{r}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            {status === 'active' && (
                                                                <button
                                                                    onClick={() => markComplete(node)}
                                                                    className="mt-4 w-full py-2.5 rounded-xl font-semibold text-sm transition-all"
                                                                    style={{ background: `${meta.color}20`, color: meta.color, border: `1px solid ${meta.color}40` }}
                                                                >
                                                                    ✓ Mark as Complete — Earn +{node.xp} XP
                                                                </button>
                                                            )}
                                                        </motion.div>
                                                    )}
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Completion celebration */}
                    {progress === 100 && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            className="mt-12 glass-card p-10 text-center border-[var(--cyan)]/40">
                            <div className="text-6xl mb-4">🎉</div>
                            <h2 className="text-2xl font-heading font-bold text-white mb-2">Roadmap Complete!</h2>
                            <p className="text-[var(--muted)]">You've mastered the {meta.label} path. Time to crush those interviews!</p>
                        </motion.div>
                    )}
                </motion.div>
            </main>
        </div>
    );
}
