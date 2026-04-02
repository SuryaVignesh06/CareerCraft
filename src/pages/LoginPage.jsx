import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, CheckCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

export default function LoginPage() {
    const [tab, setTab] = useState('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { login, signup, demoLogin, loading } = useAuth();
    const navigate = useNavigate();

    const switchTab = (t) => {
        setTab(t);
        setError('');
        setSuccess('');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPass('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (tab === 'signup') {
            if (!name.trim()) return setError('Please enter your full name.');
            if (password.length < 6) return setError('Password must be at least 6 characters.');
            if (password !== confirmPass) return setError('Passwords do not match.');
        }

        try {
            if (tab === 'signup') {
                await signup(name.trim(), email.trim(), password);
                setSuccess('Account created! Redirecting to onboarding...');
                setTimeout(() => navigate('/onboarding'), 1000);
            } else {
                await login(email.trim(), password);
                setSuccess('Welcome back! Redirecting...');
                setTimeout(() => navigate('/dashboard'), 800);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDemo = () => {
        demoLogin();
        navigate('/dashboard');
    };

    // Password strength indicator (signup only)
    const strength = (() => {
        if (!password) return 0;
        let s = 0;
        if (password.length >= 6) s++;
        if (/[A-Z]/.test(password)) s++;
        if (/[0-9]/.test(password)) s++;
        if (/[^A-Za-z0-9]/.test(password)) s++;
        return s;
    })();
    const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const strengthColor = ['', 'bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-[var(--green)]'];

    return (
        <div className="min-h-screen bg-[var(--bg)] flex relative overflow-hidden">
            {/* ── Left panel (decorative) ── */}
            <div className="hidden lg:flex flex-col justify-between w-[42%] bg-gradient-to-br from-[#050B12] via-[#0a1628] to-[#050B12] p-12 border-r border-[var(--border)] relative overflow-hidden">
                {/* glow blobs */}
                <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[var(--cyan)]/8 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[var(--purple)]/8 blur-3xl" />

                <Link to="/" className="flex items-center gap-2 z-10 relative">
                    <span className="font-heading text-xl font-bold text-white">CareerCraft</span>
                    <span className="w-2 h-2 rounded-full bg-[var(--cyan)] shadow-[0_0_10px_var(--cyan)]" />
                </Link>

                <div className="z-10 relative flex flex-col gap-8">
                    <div>
                        <h2 className="font-heading text-4xl font-extrabold text-white leading-tight mb-4">
                            Your Career.<br />Your Rules.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--cyan)] to-[var(--purple)]">No Guesswork.</span>
                        </h2>
                        <p className="text-[var(--muted)] leading-relaxed">
                            Join 12,400+ Indian engineering students building smarter careers with AI-powered roadmaps.
                        </p>
                    </div>

                    {/* Testimonial card */}
                    <div className="glass-card p-5">
                        <p className="text-sm text-[var(--text)] italic mb-4">
                            "CareerCraft showed me exactly which skills to build. I cracked Zoho in 6 weeks."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--purple)] flex items-center justify-center text-sm font-bold text-white">R</div>
                            <div>
                                <div className="text-sm font-bold text-white">Rahul M.</div>
                                <div className="text-xs text-[var(--muted)]">SRM · Backend Dev at Zoho</div>
                            </div>
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="flex gap-6">
                        {[['12,400+', 'Students'], ['94%', 'Job Match'], ['₹8L+', 'Avg Salary']].map(([val, label]) => (
                            <div key={label}>
                                <div className="text-xl font-bold text-white font-heading">{val}</div>
                                <div className="text-xs text-[var(--muted)]">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-xs text-[var(--muted)] z-10 relative">© {new Date().getFullYear()} CareerCraft</p>
            </div>

            {/* ── Right panel (form) ── */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
                {/* Mobile back button */}
                <Link to="/" className="lg:hidden absolute top-6 left-6 flex items-center gap-2 text-[var(--muted)] hover:text-white transition-colors text-sm">
                    <ArrowLeft size={16} /> Home
                </Link>

                <motion.div
                    className="w-full max-w-md"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                >
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-2 justify-center mb-8">
                        <span className="font-heading text-2xl font-bold text-white">CareerCraft</span>
                        <span className="w-2 h-2 rounded-full bg-[var(--cyan)]" />
                    </div>

                    {/* Tab switcher */}
                    <div className="flex bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-1 mb-8">
                        {[['login', 'Sign In'], ['signup', 'Sign Up']].map(([t, label]) => (
                            <button
                                key={t}
                                onClick={() => switchTab(t)}
                                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${tab === t
                                    ? 'bg-[var(--cyan)] text-black shadow-[0_0_20px_rgba(0,229,255,0.35)]'
                                    : 'text-[var(--muted)] hover:text-white'}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={tab}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.22 }}
                        >
                            <h1 className="text-2xl font-heading font-bold text-white mb-1">
                                {tab === 'login' ? 'Welcome back 👋' : 'Create your account ✨'}
                            </h1>
                            <p className="text-[var(--muted)] text-sm mb-7">
                                {tab === 'login'
                                    ? 'Sign in to continue your career roadmap.'
                                    : "It's free. No credit card needed."}
                            </p>

                            {/* Google OAuth btn */}
                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 border border-[var(--border2)] text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all mb-5 text-sm"
                                onClick={() => {
                                    setError('Google sign-in requires Firebase setup. Use email or try Demo below.');
                                }}
                            >
                                <GoogleIcon />
                                {tab === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
                            </button>

                            <div className="flex items-center gap-3 mb-5">
                                <div className="flex-1 h-px bg-[var(--border2)]" />
                                <span className="text-xs text-[var(--muted)]">or with email</span>
                                <div className="flex-1 h-px bg-[var(--border2)]" />
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                                {/* Name (signup only) */}
                                {tab === 'signup' && (
                                    <div className="relative">
                                        <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none" />
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--cyan)] transition-colors text-sm"
                                            required
                                            autoFocus
                                        />
                                    </div>
                                )}

                                {/* Email */}
                                <div className="relative">
                                    <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none" />
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--cyan)] transition-colors text-sm"
                                        required
                                        autoFocus={tab === 'login'}
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <div className="relative">
                                        <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none" />
                                        <input
                                            type={showPass ? 'text' : 'password'}
                                            placeholder="Password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl py-3 pl-10 pr-12 text-white placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--cyan)] transition-colors text-sm"
                                            required
                                        />
                                        <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-white transition-colors">
                                            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                                        </button>
                                    </div>
                                    {/* Strength bar — show during signup once typing */}
                                    {tab === 'signup' && password && (
                                        <div className="mt-2 flex items-center gap-2">
                                            <div className="flex gap-1 flex-1">
                                                {[1, 2, 3, 4].map(i => (
                                                    <div key={i} className={`flex-1 h-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor[strength] : 'bg-[var(--border2)]'}`} />
                                                ))}
                                            </div>
                                            <span className={`text-xs font-medium ${strength >= 3 ? 'text-[var(--green)]' : strength === 2 ? 'text-yellow-400' : 'text-red-400'}`}>{strengthLabel[strength]}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Confirm Password (signup only) */}
                                {tab === 'signup' && (
                                    <div className="relative">
                                        <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none" />
                                        <input
                                            type={showConfirm ? 'text' : 'password'}
                                            placeholder="Confirm Password"
                                            value={confirmPass}
                                            onChange={e => setConfirmPass(e.target.value)}
                                            className={`w-full bg-[var(--surface)] border rounded-xl py-3 pl-10 pr-12 text-white placeholder:text-[var(--muted)] focus:outline-none transition-colors text-sm ${confirmPass && confirmPass !== password ? 'border-red-500/60 focus:border-red-500' : 'border-[var(--border)] focus:border-[var(--cyan)]'}`}
                                            required
                                        />
                                        <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-white transition-colors">
                                            {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                                        </button>
                                        {confirmPass && confirmPass === password && (
                                            <CheckCircle size={15} className="absolute right-11 top-1/2 -translate-y-1/2 text-[var(--green)]" />
                                        )}
                                    </div>
                                )}

                                {/* Forgot password (login) */}
                                {tab === 'login' && (
                                    <div className="flex justify-end -mt-1">
                                        <button type="button" className="text-xs text-[var(--muted)] hover:text-[var(--cyan)] transition-colors">Forgot password?</button>
                                    </div>
                                )}

                                {/* Error */}
                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                                        >
                                            {error}
                                        </motion.div>
                                    )}
                                    {success && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="flex items-center gap-2 text-sm text-[var(--green)] bg-[var(--green)]/10 border border-[var(--green)]/20 rounded-xl px-4 py-3"
                                        >
                                            <CheckCircle size={15} /> {success}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading || !!success}
                                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {loading
                                        ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Please wait...</span>
                                        : tab === 'login' ? 'Sign In →' : 'Create Account →'}
                                </button>
                            </form>

                            {/* Switch tab hint */}
                            <p className="text-center text-sm text-[var(--muted)] mt-5">
                                {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
                                <button onClick={() => switchTab(tab === 'login' ? 'signup' : 'login')} className="text-[var(--cyan)] font-semibold hover:underline">
                                    {tab === 'login' ? 'Sign Up' : 'Sign In'}
                                </button>
                            </p>

                            {/* Demo bypass */}
                            <div className="mt-5 pt-5 border-t border-[var(--border)]">
                                <button
                                    onClick={handleDemo}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm text-[var(--muted)] hover:text-white hover:bg-[var(--surface)] border border-transparent hover:border-[var(--border)] transition-all"
                                >
                                    <Sparkles size={14} className="text-[var(--cyan)]" />
                                    Explore without account (Demo)
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}
