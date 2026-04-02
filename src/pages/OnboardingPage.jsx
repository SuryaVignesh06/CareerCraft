import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const steps = [
    {
        id: 0,
        title: "What's your current status?",
        subtitle: "Tell us where you are in your journey",
        field: 'status',
        options: [
            { value: '1st_year', label: '1st Year B.Tech', emoji: '🌱' },
            { value: '2nd_year', label: '2nd Year B.Tech', emoji: '📚' },
            { value: '3rd_year', label: '3rd Year B.Tech', emoji: '💡' },
            { value: '4th_year', label: '4th Year / Final Year', emoji: '🎓' },
            { value: 'fresher', label: 'Recent Graduate', emoji: '🚀' },
        ]
    },
    {
        id: 1,
        title: "What's your target career?",
        subtitle: "Pick the path you're most excited about",
        field: 'career',
        options: [
            { value: 'fullstack', label: 'Full Stack Dev', emoji: '⚡' },
            { value: 'aiml', label: 'AI / ML Engineer', emoji: '🧠' },
            { value: 'data', label: 'Data Science', emoji: '📊' },
            { value: 'devops', label: 'Cloud & DevOps', emoji: '☁️' },
            { value: 'cyber', label: 'Cybersecurity', emoji: '🛡️' },
            { value: 'mobile', label: 'Mobile Dev', emoji: '📱' },
        ]
    },
    {
        id: 2,
        title: "How comfortable are you with coding?",
        subtitle: "Be honest — we'll build the perfect roadmap either way",
        field: 'level',
        options: [
            { value: 'beginner', label: 'Beginner — just started', emoji: '🐣' },
            { value: 'intermediate', label: 'Intermediate — know the basics', emoji: '🔧' },
            { value: 'advanced', label: 'Advanced — built real projects', emoji: '🔥' },
        ]
    },
    {
        id: 3,
        title: "Which companies are you targeting?",
        subtitle: "Select all that apply",
        field: 'companies',
        multi: true,
        options: [
            { value: 'google', label: 'Google / Meta / Microsoft', emoji: '🏆' },
            { value: 'startup', label: 'Startups (Swiggy, Zepto etc.)', emoji: '🚀' },
            { value: 'product', label: 'Product Companies', emoji: '💼' },
            { value: 'mnc', label: 'MNCs (TCS, Infosys etc.)', emoji: '🏢' },
            { value: 'open', label: 'Open to anything', emoji: '🌐' },
        ]
    },
];

export default function OnboardingPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [generating, setGenerating] = useState(false);
    const navigate = useNavigate();
    const { updateProfile } = useAuth();

    const current = steps[step];
    const selected = answers[current.field];

    const handleSelect = (value) => {
        if (current.multi) {
            const prev = answers[current.field] || [];
            const updated = prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value];
            setAnswers(prev => ({ ...prev, [current.field]: updated }));
        } else {
            setAnswers(prev => ({ ...prev, [current.field]: value }));
        }
    };

    const isSelected = (value) => {
        if (current.multi) return (selected || []).includes(value);
        return selected === value;
    };

    const canContinue = current.multi ? (selected || []).length > 0 : !!selected;

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(s => s + 1);
        } else {
            handleFinish();
        }
    };

    const handleFinish = async () => {
        setGenerating(true);
        // Save onboarding answers to the user's profile
        updateProfile({
            career: answers.career || 'fullstack',
            status: answers.status || null,
            level:  answers.level  || null,
            companies: answers.companies || [],
            onboardingDone: true,
        });
        // Simulate AI generating roadmap
        await new Promise(r => setTimeout(r, 2500));
        navigate('/dashboard');
    };

    const progress = ((step) / steps.length) * 100;

    if (generating) {
        return (
            <div className="min-h-screen bg-mesh flex flex-col items-center justify-center gap-8 px-4">
                <motion.div
                    className="flex flex-col items-center gap-6 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="w-20 h-20 rounded-full border-2 border-[var(--cyan)] flex items-center justify-center shadow-[0_0_30px_var(--cyan)] animate-pulse">
                        <span className="text-3xl">🧠</span>
                    </div>
                    <h2 className="text-2xl font-bold font-heading text-white">Building Your Roadmap...</h2>
                    <p className="text-[var(--muted)] max-w-sm">Our AI is crafting a personalized step-by-step career path just for you.</p>
                    <div className="w-64 h-1.5 bg-[var(--surface2)] rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[var(--cyan)] to-[var(--purple)]"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2.5 }}
                        />
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-mesh flex items-center justify-center px-4 relative overflow-hidden">
            <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-[var(--cyan)]/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[var(--purple)]/5 blur-3xl pointer-events-none" />

            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="flex items-center justify-center mb-4">
                    <span className="font-heading text-xl font-bold text-white">CareerCraft</span>
                    <span className="w-2 h-2 ml-2 rounded-full bg-[var(--cyan)]" />
                </div>

                {/* Progress */}
                <div className="mb-8">
                    <div className="flex justify-between text-xs text-[var(--muted)] mb-2">
                        <span>Step {step + 1} of {steps.length}</span>
                        <span>{Math.round(progress)}% complete</span>
                    </div>
                    <div className="w-full h-1.5 bg-[var(--surface2)] rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[var(--cyan)] to-[var(--purple)]"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.4 }}
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="glass-card p-8">
                            <h2 className="text-2xl font-bold font-heading text-white mb-2">{current.title}</h2>
                            <p className="text-[var(--muted)] mb-8">{current.subtitle}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {current.options.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleSelect(opt.value)}
                                        className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 text-left group ${isSelected(opt.value)
                                            ? 'border-[var(--cyan)] bg-[var(--cyan)]/10 shadow-[0_0_15px_rgba(0,229,255,0.15)]'
                                            : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border2)] hover:bg-[var(--surface2)]'
                                            }`}
                                    >
                                        <span className="text-2xl">{opt.emoji}</span>
                                        <span className={`font-medium text-sm ${isSelected(opt.value) ? 'text-[var(--cyan)]' : 'text-white'}`}>
                                            {opt.label}
                                        </span>
                                        {isSelected(opt.value) && (
                                            <CheckCircle size={16} className="text-[var(--cyan)] ml-auto shrink-0" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center justify-between mt-8">
                                <button
                                    onClick={() => setStep(s => s - 1)}
                                    disabled={step === 0}
                                    className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-white transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                                >
                                    <ArrowLeft size={16} /> Back
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={!canContinue}
                                    className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                                >
                                    {step === steps.length - 1 ? 'Generate My Roadmap 🚀' : 'Continue'}
                                    {step < steps.length - 1 && <ArrowRight size={16} />}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
