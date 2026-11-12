import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link, Navigate, useLocation } from 'react-router-dom'
import { db } from './lib/db'
import { parseTeacherTextToJSON } from './lib/aiParser'
import { extractTextFromPDF } from './lib/pdfParser'
import { useAuthStore } from './store/useAuthStore'
import {
  Timer, Sparkles, Trophy, Play, Clock, Image as ImageIcon, Send, LogOut,
  ShieldCheck, GraduationCap, FileText, Lock, Crown, AlertTriangle,
  BarChart2, History, Grid, X, ChevronDown, ChevronUp, Zap, CheckCircle2,
  ArrowUpRight, Flame, Layers, Download, Award, Target, CreditCard, BookOpen, Key
} from 'lucide-react'

// ==========================================
// GLOBAL UPI / RAZORPAY PRO CHECKOUT MODAL
// ==========================================
function PaymentCheckoutModal({ isOpen, onClose, planTitle = 'RankPulse Pro Pass', amount = 49, onSuccess }) {
  const [upiId, setUpiId] = useState('')
  const [processing, setProcessing] = useState(false)

  if (!isOpen) return null

  const handlePay = (e) => {
    e.preventDefault()
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      onSuccess()
      onClose()
    }, 900)
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 flex justify-between items-start">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
              Instant UPI Checkout
            </span>
            <h3 className="text-lg font-black mt-2">{planTitle}</h3>
            <p className="text-xs text-indigo-200 mt-0.5">Unlock AI Topic Matrix, Speed Audits & All Educator Batches</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handlePay} className="p-6 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex justify-between items-center">
            <div>
              <div className="text-xs font-bold text-slate-800">Total Payable Amount</div>
              <div className="text-[11px] text-slate-500">30 Days Unlimited Access • Cancel Anytime</div>
            </div>
            <div className="text-2xl font-black text-slate-900">₹{amount}</div>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Topic-Wise Strength & Speed Trap Matrix</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>IBPS PO vs Clerk vs SBI PO Selection Predictor</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Question-by-Question Shortcut Solutions & Time Audit</span>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase text-slate-600 block mb-1">
              Enter UPI ID (GPay / PhonePe / Paytm)
            </label>
            <input
              type="text"
              required
              placeholder="yourname@okaxis or 9876543210@ybl"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full p-3 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:brightness-105 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            <span>{processing ? 'Verifying UPI Payment...' : `Pay ₹${amount} & Unlock Instantly →`}</span>
          </button>

          <p className="text-[10px] text-center text-slate-400">
            Secured by 256-bit encryption • Instant activation on your account
          </p>
        </form>
      </div>
    </div>
  )
}

// ==========================================
// MODERN GLASS NAVBAR
// ==========================================
function Navbar({ onOpenUpgrade }) {
  const { user, logout } = useAuthStore()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-3.5 flex flex-wrap justify-between items-center gap-3">
      <div className="flex items-center space-x-8">
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-black text-base tracking-tight text-slate-900">RankPulse</span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 px-1.5 py-0.5 rounded-md">
                IBPS AI
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium -mt-0.5 hidden sm:block">TCS iON Simulation & Diagnostic Engine</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 text-xs">
          <Link
            to="/"
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              isActive('/') ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Live Test Arena
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className={`px-3.5 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition-all ${
                isActive('/dashboard') ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Career Readiness</span>
            </Link>
          )}
          {user?.role === 'creator' && (
            <Link
              to="/studio"
              className={`px-3.5 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition-all ${
                isActive('/studio') ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Creator Studio</span>
            </Link>
          )}
        </nav>
      </div>

      <div className="flex items-center space-x-2.5 text-xs">
        {user ? (
          <div className="flex items-center space-x-2.5">
            {user.role === 'student' && !user.isPro && (
              <button
                onClick={onOpenUpgrade}
                className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:brightness-105 text-slate-950 px-3.5 py-2 rounded-xl font-black flex items-center space-x-1.5 cursor-pointer shadow-sm shadow-amber-500/20 transition-all text-[11px]"
              >
                <Crown className="w-3.5 h-3.5 fill-current" />
                <span>Unlock Pro • ₹49</span>
              </button>
            )}
            {user.isPro && (
              <span className="bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-amber-800 border border-amber-300 px-3 py-1.5 rounded-xl font-black flex items-center space-x-1 text-[11px]">
                <Crown className="w-3.5 h-3.5 text-amber-600 fill-current" />
                <span>PRO PASS</span>
              </span>
            )}

            <Link
              to="/dashboard"
              className="md:hidden bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-xl font-bold text-[11px]"
            >
              Stats
            </Link>
            {user.role === 'creator' && (
              <Link
                to="/studio"
                className="md:hidden bg-indigo-600 text-white px-3 py-2 rounded-xl font-bold text-[11px]"
              >
                Studio
              </Link>
            )}

            <div className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200/70 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200/80 transition">
              <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">
                {user.name?.slice(0, 2).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <div className="font-bold text-slate-800 leading-none text-[11px]">{user.name}</div>
                <div className="text-[9px] font-semibold uppercase text-slate-400 mt-0.5">{user.role}</div>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-slate-900 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold shadow-xs transition-all flex items-center space-x-1.5"
          >
            <span>Sign In</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </header>
  )
}

// ==========================================
// MODERN AUTH SCREEN: /login
// ==========================================
function AuthPage() {
  const navigate = useNavigate()
  const { user, loginAs, loading } = useAuthStore()
  const [role, setRole] = useState('student')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (user) {
      navigate(user.role === 'creator' ? '/studio' : '/')
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return alert('Please enter your email!')
    const loggedUser = await loginAs(email, role, name)
    if (loggedUser.role === 'creator') navigate('/studio')
    else navigate('/')
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden flex flex-col justify-center items-center p-4">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/25 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl p-7 md:p-8 rounded-3xl shadow-2xl border border-white/20 relative z-10">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-500/30">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <span className="bg-indigo-50 text-indigo-700 border border-indigo-200/80 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            IBPS • SBI • RRB Diagnostic Portal
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-3 tracking-tight">Welcome to RankPulse</h1>
          <p className="text-xs text-slate-500 mt-1">
            Simulate real TCS iON exams or publish daily PDF checklists in 1 click.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-slate-100 rounded-2xl mb-6 border border-slate-200/60">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`py-2.5 text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              role === 'student'
                ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/60'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Banking Aspirant</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('creator')}
            className={`py-2.5 text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              role === 'creator'
                ? 'bg-white text-purple-700 shadow-sm border border-slate-200/60'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Educator / Faculty</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
              {role === 'creator' ? 'Faculty / Channel Name' : 'Your Full Name'}
            </label>
            <input
              type="text"
              required
              placeholder={role === 'creator' ? 'e.g., Harshal Sir • Learning Capsules' : 'e.g., Pranav Pawar'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-3 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-600 transition"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-3 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-600 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 hover:brightness-110 text-white text-xs font-black rounded-xl shadow-lg shadow-indigo-600/25 transition-all uppercase tracking-wider cursor-pointer mt-2"
          >
            {loading ? 'Signing in...' : `Continue as ${role === 'creator' ? 'Faculty Partner' : 'Aspirant'} →`}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>🔒 Verified Lead & Rank Sync</span>
          <Link to="/" className="text-indigo-600 font-bold hover:underline">
            Browse Live Tests →
          </Link>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 1. MODERN PUBLIC HOME (/)
// ==========================================
function Home({ onOpenUpgrade }) {
  const [tests, setTests] = useState(() => db.getInstantTests())
  const [selectedFilter, setSelectedFilter] = useState('ALL')
  const { user } = useAuthStore()

  useEffect(() => {
    db.getTests().then(setTests)
  }, [])

  const filteredTests = selectedFilter === 'ALL'
    ? tests
    : tests.filter(t => t.exam_target?.toLowerCase().includes(selectedFilter.toLowerCase()))

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar onOpenUpgrade={onOpenUpgrade} />

      <div className="bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-purple-600/20 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-12 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 px-3 py-1 rounded-full text-[11px] font-bold mb-3">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-current" />
              <span>Real TCS iON Exam Interface + AI Career Diagnostic</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
              Don't Just Solve PDFs. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">Know Which Exam You'll Clear.</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-2.5 leading-relaxed">
              Attempt timed daily checklists from top Telegram faculties. Get instant question-by-question speed audits and discover your exact selection probability for IBPS PO, Clerk, and SBI PO.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            {user ? (
              <Link
                to="/dashboard"
                className="px-5 py-3 bg-white text-slate-950 hover:bg-indigo-50 text-xs font-black rounded-2xl shadow-lg flex items-center space-x-2 transition"
              >
                <BarChart2 className="w-4 h-4 text-indigo-600" />
                <span>My Career Readiness</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-2xl shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Sign In as Aspirant</span>
              </Link>
            )}
            <Link
              to={user?.role === 'creator' ? '/studio' : '/login'}
              className="px-5 py-3 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold rounded-2xl flex items-center space-x-2 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{user?.role === 'creator' ? 'Open Creator Studio' : 'Faculty? Publish PDF'}</span>
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto w-full px-4 md:px-8 py-8 flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Live Educator Checklists & Mock Series</h2>
            <p className="text-xs text-slate-500">Select any test to launch the full-screen TCS iON simulator</p>
          </div>

          <div className="flex items-center space-x-1.5 bg-white p-1 rounded-xl border border-slate-200/80 shadow-2xs overflow-x-auto">
            {['ALL', 'IBPS PO', 'Clerk', 'RRB'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                  selectedFilter === tab
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab === 'ALL' ? 'All Exams' : tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTests.map((t) => (
            <div
              key={t.id}
              className="group bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-400 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 opacity-80 group-hover:opacity-100 transition" />

              <div>
                <div className="flex justify-between items-start gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                      {t.exam_target}
                    </span>
                    {t.is_paid ? (
                      <span className="text-[10px] font-extrabold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full uppercase flex items-center">
                        <Crown className="w-3 h-3 mr-1 text-amber-600 fill-current" /> Pro Batch • ₹99
                      </span>
                    ) : (
                      <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase">
                        Free Checklist
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md flex items-center shrink-0">
                    <Clock className="w-3 h-3 mr-1 text-slate-400" /> {t.duration_minutes}m
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 mt-3 group-hover:text-indigo-600 transition-colors">
                  {t.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center">
                  Curated by <strong className="text-slate-700 ml-1">{t.creator_name}</strong>
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1" /> +1.0 / -0.25
                  </span>
                  <span className="flex items-center">
                    <Sparkles className="w-3.5 h-3.5 text-purple-500 mr-1" /> AI Topic Audit
                  </span>
                </div>

                <Link
                  to={`/test/${t.id}`}
                  className="px-4 py-2 bg-slate-900 group-hover:bg-indigo-600 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-2xs transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Test</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

// ==========================================
// 2. MODERN CUMULATIVE STUDENT DASHBOARD (/dashboard)
// ==========================================
function StudentDashboard({ onOpenUpgrade }) {
  const { user } = useAuthStore()
  const [history, setHistory] = useState([])

  useEffect(() => {
    db.getStudentHistory(user?.name).then(setHistory)
  }, [user])

  const totalAttempts = history.length
  const avgAccuracy = totalAttempts > 0
    ? Math.round(history.reduce((sum, a) => sum + (Number(a.accuracy) || 0), 0) / totalAttempts)
    : 0

  const avgScorePercent = totalAttempts > 0
    ? Math.round(
        history.reduce((sum, a) => sum + Math.max(0, (a.score / (a.total_questions || 1)) * 100), 0) / totalAttempts
      )
    : 0

  const clerkFit = totalAttempts > 0 ? Math.min(96, Math.round(avgScorePercent * 0.65 + (avgAccuracy >= 80 ? 28 : 14))) : 0
  const poFit = totalAttempts > 0 ? Math.min(94, Math.round(avgScorePercent * 0.7 + (avgAccuracy >= 80 ? 22 : 10))) : 0

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar onOpenUpgrade={onOpenUpgrade} />

      <div className="max-w-6xl mx-auto w-full px-4 md:px-8 py-8 space-y-6 flex-1">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-lg flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl font-black shadow-md">
              {(user?.name || 'A').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <span className="bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                Cumulative Career Analytics
              </span>
              <h1 className="text-xl md:text-2xl font-black mt-1">
                {user?.name || 'Aspirant'}'s Exam Readiness
              </h1>
              <p className="text-xs text-slate-300 mt-0.5">
                Aggregated across {totalAttempts} proctored mock attempts
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="px-5 py-2.5 bg-white text-slate-950 hover:bg-indigo-50 text-xs font-black rounded-xl shadow self-start sm:self-auto transition"
          >
            + Take Another Test
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex justify-between items-center text-slate-400 mb-2">
              <span className="text-[11px] font-bold uppercase text-slate-500">Tests Completed</span>
              <Layers className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-3xl font-black text-slate-900">{totalAttempts}</div>
            <p className="text-[11px] text-slate-400 mt-1">Synced to profile</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex justify-between items-center text-slate-400 mb-2">
              <span className="text-[11px] font-bold uppercase text-slate-500">Avg Accuracy</span>
              <Target className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-black text-emerald-600">{avgAccuracy}%</div>
            <p className="text-[11px] text-slate-400 mt-1">Target cutoff: 85%+</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 p-5 rounded-2xl border border-emerald-200/80 shadow-2xs">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] font-extrabold uppercase text-emerald-900">IBPS Clerk Fit</span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-emerald-700">{clerkFit}%</div>
            <div className="w-full bg-emerald-200/70 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${clerkFit}%` }} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-blue-50/50 p-5 rounded-2xl border border-indigo-200/80 shadow-2xs">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] font-extrabold uppercase text-indigo-900">IBPS / RRB PO Fit</span>
              <Trophy className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-3xl font-black text-indigo-700">{poFit}%</div>
            <div className="w-full bg-indigo-200/70 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${poFit}%` }} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <History className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-black text-slate-900">Attempt History & AI Diagnostic Reports</h3>
            </div>
          </div>

          {history.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xs text-slate-500 font-medium">You haven't attempted any tests yet.</p>
              <Link to="/" className="inline-block mt-3 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl">
                Launch Your First Checklist →
              </Link>
            </div>
          ) : (
            <div className="space-y-2.5">
              {history.map((att) => (
                <div
                  key={att.id}
                  className="p-4 rounded-xl border border-slate-200/70 hover:border-indigo-300 bg-slate-50/50 hover:bg-white transition flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-extrabold uppercase bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-md">
                        {att.examTarget}
                      </span>
                      <strong className="text-xs md:text-sm font-bold text-slate-900">{att.testTitle}</strong>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 flex items-center space-x-4">
                      <span>Score: <strong className="text-slate-900">{att.score} / {att.total_questions}</strong></span>
                      <span>Accuracy: <strong className="text-emerald-600">{att.accuracy}%</strong></span>
                    </div>
                  </div>
                  <Link
                    to={`/result/${att.id}`}
                    className="px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl self-start sm:self-auto transition"
                  >
                    Open AI Report →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 3. MODERN CREATOR STUDIO (/studio)
// ==========================================
function CreatorStudio({ onOpenUpgrade }) {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const [tests, setTests] = useState(() => db.getInstantTests())
  const [loading, setLoading] = useState(false)
  const [parsing, setParsing] = useState(false)
  const [pdfExtracting, setPdfExtracting] = useState(false)
  const [geminiKey, setGeminiKey] = useState(() => localStorage.getItem('ibps_gemini_key') || '')

  const [activeStatsTest, setActiveStatsTest] = useState(null)
  const [batchStats, setBatchStats] = useState(null)
  const [loadingStats, setLoadingStats] = useState(false)

  const [title, setTitle] = useState('IBPS PO Daily Reasoning & Quant #2')
  const [creatorName, setCreatorName] = useState(user?.name || 'Harshal Sir • Learning Capsules')
  const [examTarget, setExamTarget] = useState('IBPS PO Prelims')
  const [duration, setDuration] = useState(15)
  const [isPaid, setIsPaid] = useState(false)
  const [chartImage, setChartImage] = useState('')
  const [rawText, setRawText] = useState(
`[Reasoning | Circular Seating Arrangement]
Eight persons P, Q, R, S, T, U, V and W sit around a circular table facing the center. R sits second to the right of P. Two persons sit between R and V. S sits immediate left of V.

Q1. Who sits immediate right of P?
(A) W
(B) T
(C) Q
(D) S
(E) None of these
Ans: B
Sol: R is 2nd right of P and T sits immediate right of P in the circular arrangement.

Q2. How many persons sit between P and V when counted from the right of P?
(A) One
(B) Two
(C) Three
(D) Four
(E) None
Ans: C
Sol: Counting clockwise/right from P, there are 3 persons between P and V.

[Quant | Quadratic Equations]
Q3. Solve: I. x^2 - 11x + 30 = 0  II. y^2 - 15y + 56 = 0
(A) x > y
(B) x < y
(C) x >= y
(D) x <= y
(E) x = y
Ans: B
Sol: From I, x = 5, 6. From II, y = 7, 8. Clearly x < y.`
  )
  const [parsedPreview, setParsedPreview] = useState(null)

  useEffect(() => {
    db.getTests().then(setTests)
  }, [])

  function handleSaveGeminiKey(val) {
    setGeminiKey(val)
    localStorage.setItem('ibps_gemini_key', val)
  }

  async function handlePdfOrTextUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setTitle(file.name.replace(/\.[^/.]+$/, ''))

    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      setPdfExtracting(true)
      try {
        const extractedText = await extractTextFromPDF(file)
        setRawText(extractedText)
      } catch (err) {
        alert('Could not read PDF file: ' + err.message)
      }
      setPdfExtracting(false)
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => setRawText(event.target.result)
    reader.readAsText(file)
  }

  function handleChartImageUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setChartImage(reader.result)
    reader.readAsDataURL(file)
  }

  async function handleSmartParse() {
    if (!rawText.trim()) return
    setParsing(true)
    const result = await parseTeacherTextToJSON(rawText)
    setParsedPreview(result)
    setParsing(false)
  }

  async function handlePublishTest() {
    if (!parsedPreview) return alert('Please click "1. Smart Parse & Tag Topics" first!')
    setLoading(true)
    const testId = await db.createFullTest({
      test: {
        title,
        creator_name: creatorName,
        exam_target: examTarget,
        duration_minutes: duration,
        is_paid: isPaid
      },
      set: {
        section: 'Reasoning & Quant',
        title: parsedPreview.setTitle,
        passage_en: parsedPreview.passageEN,
        passage_hi: parsedPreview.passageHI,
        chart_image_url: chartImage || null
      },
      questions: parsedPreview.questions
    })
    setLoading(false)
    navigate(`/test/${testId}`)
  }

  const copyTelegramPost = (t) => {
    const url = `${window.location.origin}/test/${t.id}`
    const text = `🔥 *${t.title}*\n👨‍🏫 Curated by: *${t.creator_name}*\n⏱ Timer: ${t.duration_minutes} Mins (Strict TCS iON Proctored Interface)\n📊 Instant AI Topic Matrix & Optimal Exam Predictor\n\n👉 *Attempt Live Test Here:* ${url}`
    navigator.clipboard.writeText(text)
    alert('Telegram announcement copied to clipboard!')
  }

  async function openBatchAnalytics(t) {
    setActiveStatsTest(t)
    setLoadingStats(true)
    const stats = await db.getTestAnalytics(t.id)
    setBatchStats(stats)
    setLoadingStats(false)
  }

  function exportLeadsCSV() {
    if (!batchStats || !batchStats.attempts.length) return alert('No student attempts to export yet!')
    const headers = ['Rank,Student Name,Email,Score,Total Questions,Accuracy (%)']
    const rows = batchStats.attempts.map((a, i) =>
      `${i + 1},"${a.student_name || 'Aspirant'}","${a.student_email || 'N/A'}",${a.score},${a.total_questions},${a.accuracy}`
    )
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n')
    const link = document.createElement('a')
    link.setAttribute('href', encodeURI(csvContent))
    link.setAttribute('download', `${activeStatsTest.title.replace(/\s+/g, '_')}_Leads.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  function copyTopRankersTelegram() {
    if (!batchStats || !batchStats.attempts.length) return alert('No attempts yet!')
    const top5 = batchStats.attempts
      .slice(0, 5)
      .map((a, i) => `${i + 1}. *${a.student_name}* — ${a.score} Marks (${a.accuracy}% Acc)`)
      .join('\n')
    const msg = `🏆 *Batch Toppers: ${activeStatsTest.title}*\n👥 Total Verified Attempts: ${batchStats.count}\n📈 Batch Avg Score: ${batchStats.avgScore}\n\n${top5}\n\n🚀 *Beat the leaderboard here:* ${window.location.origin}/test/${activeStatsTest.id}`
    navigator.clipboard.writeText(msg)
    alert('Top 5 Rankers Telegram post copied!')
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar onOpenUpgrade={onOpenUpgrade} />

      {activeStatsTest && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white px-6 py-5 flex justify-between items-center">
              <div>
                <span className="text-[10px] bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                  Faculty Batch Insights & Leads
                </span>
                <h3 className="text-base font-black mt-1.5">{activeStatsTest.title}</h3>
              </div>
              <button onClick={() => setActiveStatsTest(null)} className="text-slate-300 hover:text-white p-1.5 rounded-lg bg-white/10 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              {loadingStats || !batchStats ? (
                <p className="text-xs text-slate-500 text-center py-8">Loading student attempts & batch metrics...</p>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-3.5">
                    <div className="p-4 bg-slate-50 rounded-2xl border">
                      <span className="text-[11px] font-semibold text-slate-500">Verified Attempts</span>
                      <div className="text-2xl font-black text-slate-900 mt-1">{batchStats.count}</div>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                      <span className="text-[11px] font-semibold text-emerald-800">Batch Avg Score</span>
                      <div className="text-2xl font-black text-emerald-700 mt-1">{batchStats.avgScore}</div>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-200">
                      <span className="text-[11px] font-semibold text-indigo-800">Batch Accuracy</span>
                      <div className="text-2xl font-black text-indigo-700 mt-1">{batchStats.avgAcc}%</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-between items-center pt-2 border-t">
                    <h4 className="text-xs font-black uppercase text-slate-600">Verified Student Leads</h4>
                    <div className="flex space-x-2">
                      <button
                        onClick={copyTopRankersTelegram}
                        className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl flex items-center space-x-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Copy Top 5 for Telegram</span>
                      </button>
                      <button
                        onClick={exportLeadsCSV}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV Leads</span>
                      </button>
                    </div>
                  </div>

                  {batchStats.attempts.length === 0 ? (
                    <p className="text-xs text-slate-400 italic py-8 text-center bg-slate-50 rounded-2xl border">
                      No students have submitted this test yet. Share the link on Telegram to capture verified student leads!
                    </p>
                  ) : (
                    <div className="border rounded-2xl overflow-hidden text-xs">
                      <div className="grid grid-cols-12 bg-slate-100 font-bold text-slate-600 p-3 border-b">
                        <div className="col-span-2">Rank</div>
                        <div className="col-span-5">Student Name & Email</div>
                        <div className="col-span-3 text-right">Score</div>
                        <div className="col-span-2 text-right">Acc</div>
                      </div>
                      <div className="divide-y max-h-60 overflow-y-auto">
                        {batchStats.attempts.map((att, idx) => (
                          <div key={att.id || idx} className="grid grid-cols-12 p-3 items-center hover:bg-slate-50">
                            <div className="col-span-2 font-black text-indigo-600">#{idx + 1}</div>
                            <div className="col-span-5 truncate">
                              <div className="font-bold text-slate-900 truncate">{att.student_name}</div>
                              <div className="text-[10px] text-slate-400 truncate">{att.student_email || 'Verified Student'}</div>
                            </div>
                            <div className="col-span-3 text-right font-bold text-slate-900">
                              {att.score} / {att.total_questions}
                            </div>
                            <div className="col-span-2 text-right text-emerald-700 font-bold">
                              {att.accuracy}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 w-full">
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl shadow-xs border border-slate-200/90">
          <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
            <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
              AI Creator Studio
            </span>
            <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-xl">
              <Key className="w-3.5 h-3.5 text-purple-600" />
              <input
                type="password"
                placeholder="Optional: Gemini API Key for Hindi AI"
                value={geminiKey}
                onChange={(e) => handleSaveGeminiKey(e.target.value)}
                className="text-[11px] bg-transparent outline-none w-44 text-slate-700"
              />
            </div>
          </div>
          <h2 className="text-lg font-black text-slate-900">Convert Daily PDF Checklist into a Live Test</h2>
          <p className="text-xs text-slate-500 mb-5">
            Drop a `.pdf` file or paste questions. Passages automatically link only to their respective sets.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase">Test Title</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full p-2.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-xs font-medium mt-1 outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase">Faculty / Channel Name</label>
              <input
                value={creatorName}
                onChange={e => setCreatorName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-xs font-medium mt-1 outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 uppercase">Target Exam Benchmark</label>
              <select
                value={examTarget}
                onChange={e => setExamTarget(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium mt-1"
              >
                <option>IBPS PO Prelims</option>
                <option>IBPS Clerk Prelims</option>
                <option>IBPS RRB PO</option>
                <option>SBI PO Mains</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase">Timer (Mins)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={e => setDuration(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium mt-1"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase">Access Tier</label>
                <select
                  value={isPaid ? 'paid' : 'free'}
                  onChange={e => setIsPaid(e.target.value === 'paid')}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium mt-1"
                >
                  <option value="free">Free Public</option>
                  <option value="paid">Pro Batch (₹99)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
            <div className="p-3.5 bg-indigo-50/60 hover:bg-indigo-50 border border-indigo-200 border-dashed rounded-2xl transition">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-950 mb-1.5">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>1. Upload Question PDF (.pdf / .txt)</span>
              </div>
              <input
                type="file"
                accept=".pdf,.txt"
                onChange={handlePdfOrTextUpload}
                className="text-xs w-full file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-white cursor-pointer"
              />
              {pdfExtracting && <p className="text-[11px] text-indigo-700 font-semibold mt-1">⏳ Extracting PDF pages...</p>}
            </div>

            <div className="p-3.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 border-dashed rounded-2xl transition">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 mb-1.5">
                <ImageIcon className="w-4 h-4 text-slate-600" />
                <span>2. Optional DI Chart Image</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleChartImageUpload}
                className="text-xs w-full file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-slate-200 file:text-slate-800 cursor-pointer"
              />
            </div>
          </div>

          <label className="text-[11px] font-bold text-slate-600 uppercase">Question Source Text (Editable)</label>
          <textarea
            rows={8}
            value={rawText}
            onChange={e => setRawText(e.target.value)}
            className="w-full p-3.5 border border-slate-200 rounded-2xl text-xs font-mono mt-1.5 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <div className="flex flex-wrap gap-3 items-center justify-between mt-5 pt-4 border-t border-slate-100">
            <button
              onClick={handleSmartParse}
              disabled={parsing}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold rounded-xl hover:brightness-110 flex items-center space-x-1.5 shadow-sm shadow-indigo-500/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{parsing ? 'AI Parsing & Tagging...' : '1. Smart Parse & Tag Topics'}</span>
            </button>

            <button
              onClick={handlePublishTest}
              disabled={loading || !parsedPreview}
              className={`px-6 py-2.5 text-xs font-black rounded-xl cursor-pointer transition-all ${
                parsedPreview
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/20'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {loading ? 'Publishing...' : '2. Publish Live Test →'}
            </button>
          </div>

          {parsedPreview && (
            <div className="mt-5 p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2 max-h-56 overflow-y-auto">
              <div className="text-[11px] font-extrabold text-emerald-900 uppercase">
                ✅ Parsed {parsedPreview.questions.length} Questions Ready
              </div>
              {parsedPreview.questions.map((q, i) => (
                <div key={i} className="text-xs bg-white p-2.5 rounded-xl border border-emerald-100 flex justify-between items-center gap-2">
                  <div>
                    <strong className="text-slate-900">Q{i + 1}:</strong> {q.questionEN}
                    {q.passageEN ? (
                      <span className="ml-2 text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-md font-bold">+ Linked Passage</span>
                    ) : (
                      <span className="ml-2 text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">Standalone</span>
                    )}
                  </div>
                  <span className="text-[10px] bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full font-bold shrink-0">{q.topic}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-xs border border-slate-200/90">
          <h3 className="text-base font-black text-slate-900 mb-1">Published Tests & Batch Leads</h3>
          <p className="text-xs text-slate-500 mb-4">Share links on Telegram or view student leads & toppers.</p>

          <div className="space-y-3">
            {tests.map(t => (
              <div key={t.id} className="p-4 border border-slate-200/80 rounded-2xl hover:border-indigo-400 transition bg-slate-50/60 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded-full uppercase">
                      {t.exam_target}
                    </span>
                    <h4 className="text-xs md:text-sm font-extrabold text-slate-900 mt-1.5">{t.title}</h4>
                    <p className="text-[11px] text-slate-500">{t.creator_name} • {t.duration_minutes}m</p>
                  </div>
                  <Link
                    to={`/test/${t.id}`}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center space-x-1 shrink-0"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Open</span>
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => openBatchAnalytics(t)}
                    className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[11px] font-bold flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Batch Stats & Leads</span>
                  </button>
                  <button
                    onClick={() => copyTelegramPost(t)}
                    className="py-2 px-3 bg-white border border-slate-200 hover:bg-indigo-50 text-indigo-700 rounded-xl text-[11px] font-bold flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Telegram Post</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 4. STRICT TCS iON EXAM ARENA (/test/:testId)
// ==========================================
function ExamArena({ onOpenUpgrade }) {
  const { testId } = useParams()
  const navigate = useNavigate()
  const { user, loginAs } = useAuthStore()

  const [test, setTest] = useState(null)
  const [questionSet, setQuestionSet] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [language, setLanguage] = useState('EN')
  const [hasStarted, setHasStarted] = useState(false)

  const [showMobilePalette, setShowMobilePalette] = useState(false)
  const [mobilePassageExpanded, setMobilePassageExpanded] = useState(true)

  const [warnings, setWarnings] = useState(0)
  const [showWarningModal, setShowWarningModal] = useState(false)
  const submittingRef = useRef(false)

  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')

  const [timeLeft, setTimeLeft] = useState(900)
  const [timeLogs, setTimeLogs] = useState({})

const enterFullScreen = () => {
    const elem = document.documentElement
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(() => {})
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen()
    }
  }

  useEffect(() => {
    db.getExamById(testId).then(({ test: tData, questionSet: sData, questions: qData }) => {
      if (tData && qData.length > 0) {
        setTest(tData)
        setQuestionSet(sData)
        setTimeLeft(tData.duration_minutes * 60)
        setQuestions(qData.map((q, i) => ({
          ...q,
          status: i === 0 ? 'not-answered' : 'not-visited',
          selectedOption: null
        })))
      }
    })
  }, [testId])

  useEffect(() => {
    if (!hasStarted || questions.length === 0) return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmitTest()
          return 0
        }
        return prev - 1
      })

      const activeQId = questions[currentIdx]?.id
      if (activeQId) {
        setTimeLogs(prev => ({
          ...prev,
          [activeQId]: (prev[activeQId] || 0) + 1
        }))
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [hasStarted, currentIdx, questions.length])

  useEffect(() => {
    if (!hasStarted) return

    let lastTrigger = 0
    const triggerViolation = (reason) => {
      const now = Date.now()
      if (submittingRef.current || now - lastTrigger < 1500) return
      lastTrigger = now

      setWarnings(prev => {
        const nextCount = prev + 1
        if (nextCount >= 3) {
          alert(`⚠️ 3 Proctoring Violations (${reason})! Auto-submitting your test.`)
          handleSubmitTest()
        } else {
          setShowWarningModal(true)
        }
        return nextCount
      })
    }

    const handleVisibility = () => {
      if (document.hidden) triggerViolation('Tab Switched')
    }

    const handleBlur = () => {
      triggerViolation('Window Focus Lost')
    }

    const handleFullScreenExit = () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        triggerViolation('Exited Full-Screen')
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)
    window.addEventListener('blur', handleBlur)
    document.addEventListener('fullscreenchange', handleFullScreenExit)
    document.addEventListener('webkitfullscreenchange', handleFullScreenExit)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('blur', handleBlur)
      document.removeEventListener('fullscreenchange', handleFullScreenExit)
      document.removeEventListener('webkitfullscreenchange', handleFullScreenExit)
    }
  }, [hasStarted, questions])

  if (!test || questions.length === 0) {
    return <div className="p-10 text-center text-sm text-slate-600">Loading TCS iON Exam Environment...</div>
  }

  if (!hasStarted) {
    const requiresPayment = test.is_paid && !user?.isPro && user?.role !== 'creator'
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full p-7 rounded-3xl shadow-2xl border border-slate-200">
          <div className="flex justify-between items-center">
            <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
              {test.exam_target}
            </span>
            {test.is_paid && (
              <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                Pro Batch • ₹99
              </span>
            )}
          </div>
          <h1 className="text-xl font-black text-slate-900 mt-3">{test.title}</h1>
          <p className="text-xs text-slate-500 mt-0.5">Curated by <strong>{test.creator_name}</strong></p>

          <div className="my-5 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs space-y-2 text-slate-700">
            <div className="flex justify-between"><span>Total Questions:</span> <strong>{questions.length} MCQs</strong></div>
            <div className="flex justify-between"><span>Time Allowed:</span> <strong>{test.duration_minutes} Minutes</strong></div>
            <div className="flex justify-between"><span>Marking Scheme:</span> <strong className="text-emerald-700">+1.0 / -0.25</strong></div>
            <div className="pt-2 border-t text-[11px] text-amber-800 font-semibold">
              🛡️ Strict TCS iON Mode: Tab-switching is monitored.
            </div>
          </div>

          {!user && (
            <div className="space-y-3 mb-5">
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase">Your Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Pranav Pawar"
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  className="w-full p-3 bg-slate-50 border rounded-xl text-xs mt-1 outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase">Email (to save rank & report) *</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={guestEmail}
                  onChange={e => setGuestEmail(e.target.value)}
                  className="w-full p-3 bg-slate-50 border rounded-xl text-xs mt-1 outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>
          )}

          {requiresPayment ? (
            <button
              onClick={onOpenUpgrade}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl shadow-lg cursor-pointer flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>Unlock Batch & Pro Pass →</span>
            </button>
          ) : (
            <button
              onClick={async () => {
                if (!user) {
                  if (!guestName.trim() || !guestEmail.trim()) return alert('Please enter your name and email!')
                  await loginAs(guestEmail, 'student', guestName)
                }
                setHasStarted(true)
              }}
              className="w-full py-3.5 bg-indigo-600 text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 cursor-pointer"
            >
              Enter TCS iON Exam Room →
            </button>
          )}
        </div>
      </div>
    )
  }

  const currentQ = questions[currentIdx]
  const currentPassage = language === 'HI' ? (currentQ.passageHI || currentQ.passageEN) : currentQ.passageEN
  const hasPassage = Boolean((currentPassage && currentPassage.trim().length > 0) || questionSet?.chart_image_url)

  const formatTime = (sec) => `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`

  const jumpToQuestion = (idx) => {
    const updated = [...questions]
    if (updated[idx].status === 'not-visited') updated[idx].status = 'not-answered'
    setQuestions(updated)
    setCurrentIdx(idx)
    setShowMobilePalette(false)
  }

  const selectOption = (optIdx) => {
    const updated = [...questions]
    updated[currentIdx].selectedOption = optIdx
    updated[currentIdx].status = 'answered'
    setQuestions(updated)
  }

  async function handleSubmitTest() {
    if (submittingRef.current) return
    submittingRef.current = true

    let correct = 0
    let wrong = 0
    const responsesMap = {}

    questions.forEach(q => {
      responsesMap[q.id] = q.selectedOption
      if (q.selectedOption !== null && q.selectedOption !== undefined) {
        if (q.selectedOption === q.correct_option) correct++
        else wrong++
      }
    })

    const finalScore = Number((correct * 1.0 - wrong * 0.25).toFixed(2))
    const attempted = correct + wrong
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0

    const attemptId = await db.saveAttempt({
      test_id: test.id,
      student_name: user?.name || guestName || 'Aspirant',
      student_email: user?.email || guestEmail,
      score: finalScore,
      total_questions: questions.length,
      accuracy,
      time_logs: timeLogs,
      responses: responsesMap
    })

    navigate(`/result/${attemptId}`)
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col select-none pb-16 md:pb-0">
      {showWarningModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full p-5 rounded-2xl shadow-2xl border-2 border-red-600 text-center">
            <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-900">Warning {warnings}/3: Tab Switch Detected</h3>
            <p className="text-xs text-slate-600 mt-1 mb-4">Do not leave the exam screen.</p>
            <button onClick={() => setShowWarningModal(false)} className="w-full py-2 bg-red-600 text-white text-xs font-bold rounded-lg">
              Resume Exam
            </button>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-30 bg-[#1e3a8a] text-white px-3 md:px-5 py-2.5 flex justify-between items-center shadow">
        <div className="flex items-center space-x-2 truncate">
          <span className="bg-orange-500 text-[10px] px-1.5 py-0.5 font-black rounded shrink-0">TCS iON</span>
          <h1 className="text-xs md:text-sm font-bold truncate max-w-[140px] sm:max-w-xs">{test.title}</h1>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <div className="bg-red-600 text-white px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center space-x-1">
            <Timer className="w-3.5 h-3.5" />
            <span>{formatTime(timeLeft)}</span>
          </div>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="bg-blue-950 text-white text-xs px-2 py-1 rounded border border-blue-700"
          >
            <option value="EN">EN</option>
            <option value="HI">HI</option>
          </select>
          <button
            onClick={() => setShowMobilePalette(true)}
            className="md:hidden bg-blue-800 p-1.5 rounded border border-blue-600 flex items-center space-x-1 text-xs font-bold"
          >
            <Grid className="w-4 h-4" />
            <span>{currentIdx + 1}/{questions.length}</span>
          </button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 bg-white">
        {hasPassage && (
          <div className="md:col-span-5 border-b md:border-b-0 md:border-r bg-slate-50 p-3.5 md:p-5 md:overflow-y-auto md:max-h-[calc(100vh-55px)]">
            <div
              onClick={() => setMobilePassageExpanded(!mobilePassageExpanded)}
              className="flex justify-between items-center cursor-pointer md:cursor-default mb-2"
            >
              <span className="text-[11px] font-bold uppercase text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                Reference Set / Directions
              </span>
              <button className="md:hidden text-xs text-blue-700 font-bold flex items-center">
                {mobilePassageExpanded ? <>Hide <ChevronUp className="w-4 h-4 ml-0.5" /></> : <>Show Passage <ChevronDown className="w-4 h-4 ml-0.5" /></>}
              </button>
            </div>

            <div className={`${mobilePassageExpanded ? 'block' : 'hidden'} md:block`}>
              {questionSet?.chart_image_url && (
                <img src={questionSet.chart_image_url} alt="DI Chart" className="w-full rounded border mb-3 bg-white p-1.5" />
              )}
              {currentPassage && (
                <div className="bg-white p-3.5 rounded border text-xs md:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-serif max-h-52 md:max-h-none overflow-y-auto">
                  {currentPassage}
                </div>
              )}
            </div>
          </div>
        )}

        <div className={`${hasPassage ? 'md:col-span-4' : 'md:col-span-9'} p-4 md:p-6 flex flex-col justify-between border-r`}>
          <div className="max-w-2xl">
            <div className="flex flex-wrap justify-between items-center gap-2 mb-3 pb-2 border-b">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-700">Question No. {currentIdx + 1}</span>
                <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold">{currentQ.topic}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] text-slate-500 flex items-center"><Clock className="w-3 h-3 mr-1" /> {timeLogs[currentQ.id] || 0}s</span>
                <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">+1.0 / -0.25</span>
              </div>
            </div>

            <p className="text-sm md:text-base font-semibold text-slate-900 mb-4 whitespace-pre-line leading-relaxed">
              {language === 'HI' ? (currentQ.question_hi || currentQ.question_en) : currentQ.question_en}
            </p>

            <div className="space-y-2.5">
              {(language === 'HI' ? (currentQ.options_hi || currentQ.options_en) : currentQ.options_en).map((opt, idx) => (
                <label
                  key={idx}
                  onClick={() => selectOption(idx)}
                  className={`flex items-center space-x-3 p-3 rounded border cursor-pointer text-xs md:text-sm ${
                    currentQ.selectedOption === idx ? 'border-blue-600 bg-blue-50 font-semibold' : 'hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    checked={currentQ.selectedOption === idx}
                    onChange={() => selectOption(idx)}
                    className="h-4 w-4 text-blue-600 shrink-0"
                  />
                  <span>({String.fromCharCode(65 + idx)}) {opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="hidden md:flex pt-4 border-t justify-between items-center mt-6">
            <div className="space-x-2">
              <button
                onClick={() => {
                  const updated = [...questions]
                  updated[currentIdx].status = 'marked'
                  setQuestions(updated)
                  jumpToQuestion((currentIdx + 1) % questions.length)
                }}
                className="px-3.5 py-1.5 bg-purple-100 text-purple-800 text-xs font-bold rounded cursor-pointer"
              >
                Mark for Review & Next
              </button>
              <button
                onClick={() => {
                  const updated = [...questions]
                  updated[currentIdx].selectedOption = null
                  updated[currentIdx].status = 'not-answered'
                  setQuestions(updated)
                }}
                className="px-3.5 py-1.5 bg-slate-200 text-slate-700 text-xs font-bold rounded cursor-pointer"
              >
                Clear Response
              </button>
            </div>
            <button
              onClick={() => jumpToQuestion((currentIdx + 1) % questions.length)}
              className="px-6 py-1.5 bg-blue-600 text-white text-xs font-bold rounded shadow cursor-pointer"
            >
              Save & Next
            </button>
          </div>
        </div>

        <div className="hidden md:flex md:col-span-3 p-4 bg-slate-50 flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase text-slate-600 mb-3">Question Palette</h4>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                let color = 'bg-white text-slate-700 border'
                if (q.status === 'answered') color = 'bg-emerald-600 text-white font-bold'
                else if (q.status === 'not-answered') color = 'bg-red-600 text-white font-bold'
                else if (q.status === 'marked') color = 'bg-purple-600 text-white font-bold rounded-full'

                return (
                  <button
                    key={q.id}
                    onClick={() => jumpToQuestion(idx)}
                    className={`h-9 rounded text-xs flex items-center justify-center cursor-pointer ${color} ${
                      currentIdx === idx ? 'ring-2 ring-blue-600 ring-offset-1' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                )
              })}
            </div>
          </div>

          <button
            onClick={handleSubmitTest}
            className="w-full py-2.5 bg-emerald-600 text-white text-xs font-bold uppercase rounded shadow hover:bg-emerald-700 cursor-pointer"
          >
            Submit Test
          </button>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t px-3 py-2.5 flex justify-between items-center shadow-lg">
        <div className="flex space-x-1.5">
          <button
            onClick={() => {
              const updated = [...questions]
              updated[currentIdx].status = 'marked'
              setQuestions(updated)
              jumpToQuestion((currentIdx + 1) % questions.length)
            }}
            className="px-2.5 py-2 bg-purple-100 text-purple-800 text-[11px] font-bold rounded"
          >
            Review
          </button>
          <button
            onClick={() => {
              const updated = [...questions]
              updated[currentIdx].selectedOption = null
              updated[currentIdx].status = 'not-answered'
              setQuestions(updated)
            }}
            className="px-2.5 py-2 bg-slate-200 text-slate-700 text-[11px] font-bold rounded"
          >
            Clear
          </button>
        </div>

        <div className="flex space-x-1.5">
          <button
            onClick={() => jumpToQuestion((currentIdx + 1) % questions.length)}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded shadow"
          >
            Save & Next →
          </button>
          <button
            onClick={handleSubmitTest}
            className="px-3 py-2 bg-emerald-600 text-white text-xs font-bold rounded shadow"
          >
            Submit
          </button>
        </div>
      </div>

      {showMobilePalette && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-950/60 flex justify-end">
          <div className="bg-white w-72 h-full p-5 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex justify-between items-center pb-3 mb-4 border-b">
                <h4 className="text-sm font-bold text-slate-900">Question Palette</h4>
                <button onClick={() => setShowMobilePalette(false)} className="p-1 text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2.5">
                {questions.map((q, idx) => {
                  let color = 'bg-slate-100 text-slate-700 border'
                  if (q.status === 'answered') color = 'bg-emerald-600 text-white font-bold'
                  else if (q.status === 'not-answered') color = 'bg-red-600 text-white font-bold'
                  else if (q.status === 'marked') color = 'bg-purple-600 text-white font-bold rounded-full'

                  return (
                    <button
                      key={q.id}
                      onClick={() => jumpToQuestion(idx)}
                      className={`h-10 rounded text-xs flex items-center justify-center ${color}`}
                    >
                      {idx + 1}
                    </button>
                  )
                })}
              </div>
            </div>
            <button
              onClick={handleSubmitTest}
              className="w-full py-3 bg-emerald-600 text-white text-xs font-bold uppercase rounded shadow"
            >
              Submit Test & View Report
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ==========================================
// 5. MODERN AI DIAGNOSTIC REPORT WITH INTERACTIVE SOLUTION REVIEWER (/result/:attemptId)
// ==========================================
function DiagnosticReport({ onOpenUpgrade }) {
  const { attemptId } = useParams()
  const { user } = useAuthStore()
  const [data, setData] = useState({ attempt: null, test: null, questions: [], leaderboard: [] })
  const [expandedQ, setExpandedQ] = useState(null)

  useEffect(() => {
    db.getResultData(attemptId).then(setData)
  }, [attemptId])

  const { attempt, test, questions, leaderboard } = data
  if (!attempt || !test) return <div className="p-10 text-center text-sm">Generating AI Diagnostic Report...</div>

  const totalTimeSpent = Object.values(attempt.time_logs || {}).reduce((a, b) => a + b, 0)
  const avgTimePerQ = attempt.total_questions > 0 ? Math.round(totalTimeSpent / attempt.total_questions) : 0
  const scorePercent = Math.max(0, Math.min(100, Math.round((attempt.score / attempt.total_questions) * 100)))

  const topicStatsMap = {}
  questions.forEach((q) => {
    const topicName = q.topic || 'General Banking Aptitude'
    const targetSec = q.targetSec || 35
    if (!topicStatsMap[topicName]) {
      topicStatsMap[topicName] = { topic: topicName, total: 0, attempted: 0, correct: 0, wrong: 0, totalTime: 0, targetSec }
    }
    const stat = topicStatsMap[topicName]
    stat.total += 1
    const userAns = attempt.responses?.[q.id]
    const timeTaken = attempt.time_logs?.[q.id] || 0
    stat.totalTime += timeTaken
    if (userAns !== null && userAns !== undefined) {
      stat.attempted += 1
      if (userAns === q.correct_option) stat.correct += 1
      else stat.wrong += 1
    }
  })

  const topicBreakdown = Object.values(topicStatsMap).map((t) => {
    const accuracy = t.attempted > 0 ? Math.round((t.correct / t.attempted) * 100) : 0
    const avgTime = t.total > 0 ? Math.round(t.totalTime / t.total) : 0
    let status = 'Weak Zone'
    let statusColor = 'bg-red-50 text-red-700 border-red-200'
    let advice = 'High priority: Revisit foundational concepts and solve 15 untimed questions daily.'

    if (accuracy >= 80 && avgTime <= t.targetSec + 5) {
      status = 'Strong Zone'
      statusColor = 'bg-emerald-50 text-emerald-700 border-emerald-200'
      advice = `Exam-ready! Beating the ${t.targetSec}s benchmark. Attempt this topic first in the exam.`
    } else if (accuracy >= 75 && avgTime > t.targetSec + 5) {
      status = 'Speed Trap'
      statusColor = 'bg-amber-50 text-amber-800 border-amber-200'
      advice = `Concepts clear (${accuracy}%), but taking ${avgTime}s vs ${t.targetSec}s target. Practice timed speed drills.`
    } else if (t.attempted === 0) {
      status = 'Skipped'
      statusColor = 'bg-slate-100 text-slate-600 border-slate-200'
      advice = 'Skipped completely. Practice basic level questions to avoid missing sitters.'
    }
    return { ...t, accuracy, avgTime, status, statusColor, advice }
  })

  const clerkReadiness = Math.min(96, Math.round(scorePercent * 0.65 + (avgTimePerQ <= 30 ? 32 : avgTimePerQ <= 45 ? 18 : 8)))
  const rrbPoReadiness = Math.min(94, Math.round(scorePercent * 0.7 + (attempt.accuracy >= 80 ? 22 : 10)))
  const ibpsPoReadiness = Math.min(92, Math.round(scorePercent * 0.65 + (attempt.accuracy >= 85 && avgTimePerQ <= 40 ? 25 : 10)))
  const sbiPoReadiness = Math.min(88, Math.round(scorePercent * 0.55 + (attempt.accuracy >= 85 ? 20 : 5)))

  const examOptions = [
    { name: 'IBPS Clerk / SBI Clerk', score: clerkReadiness, focus: 'High Speed & Sitter Accuracy' },
    { name: 'IBPS RRB PO (Scale-I)', score: rrbPoReadiness, focus: 'Balanced Speed in Reasoning & Quant' },
    { name: 'IBPS PO Prelims', score: ibpsPoReadiness, focus: 'Tactical Question Selection & Puzzle Speed' },
    { name: 'SBI PO / IBPS PO Mains', score: sbiPoReadiness, focus: 'High Conceptual Depth & DI Accuracy' }
  ].sort((a, b) => b.score - a.score)

  const bestExam = examOptions[0]
  const hasUnlockedReport = user?.isPro || user?.role === 'creator'

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar onOpenUpgrade={onOpenUpgrade} />

      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6 flex-1 w-full">
        <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-200/80 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
              AI Post-Exam Diagnostic
            </span>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 mt-2">{attempt.student_name}'s Performance Audit</h1>
            <p className="text-xs text-slate-500">{test.title} • Curated by {test.creator_name}</p>
          </div>
          <div className="flex space-x-2">
            <Link to="/dashboard" className="px-4 py-2.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold rounded-xl">
              Career Profile
            </Link>
            <Link to="/" className="px-4 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl">
              ← All Tests
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-[11px] font-bold uppercase text-slate-400">Net Score (+1 / -0.25)</span>
            <div className="text-3xl font-black text-slate-900 mt-1">{attempt.score} <span className="text-base font-semibold text-slate-400">/ {attempt.total_questions}</span></div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-[11px] font-bold uppercase text-slate-400">Attempt Accuracy</span>
            <div className="text-3xl font-black text-emerald-600 mt-1">{attempt.accuracy}%</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-[11px] font-bold uppercase text-slate-400">Avg Speed / Question</span>
            <div className="text-3xl font-black text-indigo-600 mt-1">{avgTimePerQ}s</div>
          </div>
        </div>

        {/* AI Career & Topic Matrix + Question Solution Audit */}
        <div className="relative bg-white p-6 md:p-7 rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
            <h3 className="text-base font-black text-slate-900 flex items-center space-x-2">
              <Crown className="w-5 h-5 text-amber-500 fill-current" />
              <span>AI Topic-Wise Strength Matrix & Question Speed Audit</span>
            </h3>
            {hasUnlockedReport && (
              <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full">
                PRO DIAGNOSTIC ACTIVE
              </span>
            )}
          </div>

          <div className={!hasUnlockedReport ? 'blur-xs pointer-events-none select-none opacity-60 space-y-6' : 'space-y-6'}>
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row justify-between md:items-center gap-4 shadow-md">
              <div>
                <span className="text-[10px] font-black uppercase bg-amber-400 text-slate-950 px-2.5 py-1 rounded-full">
                  Best Optimal Target Exam
                </span>
                <h4 className="text-xl font-black mt-2">{bestExam.name} — {bestExam.score}% Selection Fit</h4>
                <p className="text-xs text-indigo-200 mt-1">
                  Your speed ({avgTimePerQ}s/Q) and accuracy ({attempt.accuracy}%) align best with {bestExam.focus}.
                </p>
              </div>
              <div className="bg-white/10 px-4 py-3 rounded-xl border border-white/15 text-right shrink-0">
                <div className="text-[10px] text-indigo-200 uppercase font-bold">Second Best Fit</div>
                <div className="text-xs font-extrabold text-amber-300 mt-0.5">{examOptions[1]?.name} ({examOptions[1]?.score}%)</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
              {examOptions.map((ex, i) => (
                <div key={i} className={`p-4 rounded-2xl border ${i === 0 ? 'bg-emerald-50/60 border-emerald-300' : 'bg-slate-50 border-slate-200/80'}`}>
                  <div className="text-xs font-bold text-slate-700">{ex.name}</div>
                  <div className={`text-2xl font-black my-1.5 ${i === 0 ? 'text-emerald-700' : 'text-slate-900'}`}>{ex.score}%</div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${i === 0 ? 'bg-emerald-600' : 'bg-indigo-600'}`} style={{ width: `${ex.score}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase text-slate-500">Topic-by-Topic Speed & Prep Roadmap</h4>
              {topicBreakdown.map((t, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs md:text-sm font-extrabold text-slate-900">{t.topic}</span>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${t.statusColor}`}>{t.status}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{t.advice}</p>
                  </div>
                  <div className="text-xs bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shrink-0 font-medium">
                    Acc: <strong className="text-slate-900">{t.accuracy}%</strong> • Speed: <strong className={t.avgTime > t.targetSec ? 'text-amber-600' : 'text-emerald-600'}>{t.avgTime}s</strong> <span className="text-slate-400">(Ideal: {t.targetSec}s)</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Question-by-Question Solution & Speed Reviewer */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase text-slate-500 flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Question-by-Question Speed & Solution Reviewer (Click to Expand)</span>
                </h4>
              </div>

              <div className="space-y-2.5">
                {questions.map((q, idx) => {
                  const userAns = attempt.responses?.[q.id]
                  const isSkipped = userAns === null || userAns === undefined
                  const isCorrect = userAns === q.correct_option
                  const timeSpent = attempt.time_logs?.[q.id] || 0
                  const isExpanded = expandedQ === q.id

                  return (
                    <div
                      key={q.id || idx}
                      className="rounded-2xl border border-slate-200/80 bg-white hover:border-indigo-300 transition overflow-hidden"
                    >
                      <div
                        onClick={() => setExpandedQ(isExpanded ? null : q.id)}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-black text-slate-900">Q{idx + 1}.</span>
                            <span className="text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-md">
                              {q.topic}
                            </span>
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                                isSkipped
                                  ? 'bg-slate-100 text-slate-600'
                                  : isCorrect
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-red-50 text-red-700 border border-red-200'
                              }`}
                            >
                              {isSkipped ? 'Skipped (0)' : isCorrect ? '+1.0 Correct' : '-0.25 Wrong'}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-slate-800 line-clamp-2">{q.question_en}</p>
                        </div>

                        <div className="flex items-center space-x-3 shrink-0 text-xs">
                          <div className="bg-slate-50 px-3 py-1.5 rounded-xl border text-right">
                            <span className="text-[10px] text-slate-400 block">Time Taken</span>
                            <strong className={timeSpent > (q.targetSec || 35) ? 'text-amber-600' : 'text-emerald-600'}>
                              {timeSpent}s
                            </strong>
                            <span className="text-[10px] text-slate-400"> / {q.targetSec || 35}s</span>
                          </div>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/60 text-xs space-y-3">
                          {q.passageEN && (
                            <div className="p-3 bg-white rounded-xl border text-slate-700 font-serif whitespace-pre-line">
                              <strong className="font-sans text-[10px] uppercase text-indigo-600 block mb-1">Reference Passage:</strong>
                              {q.passageEN}
                            </div>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {(q.options_en || []).map((opt, oIdx) => {
                              const isRightOpt = oIdx === q.correct_option
                              const isUserOpt = oIdx === userAns
                              return (
                                <div
                                  key={oIdx}
                                  className={`p-2.5 rounded-xl border flex items-center justify-between ${
                                    isRightOpt
                                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                                      : isUserOpt
                                      ? 'bg-red-50 border-red-300 text-red-900 font-semibold'
                                      : 'bg-white border-slate-200 text-slate-700'
                                  }`}
                                >
                                  <span>({String.fromCharCode(65 + oIdx)}) {opt}</span>
                                  {isRightOpt && <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded">Correct Answer</span>}
                                  {!isRightOpt && isUserOpt && <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded">Your Choice</span>}
                                </div>
                              )
                            })}
                          </div>

                          <div className="p-3 bg-indigo-50/70 border border-indigo-200/80 rounded-xl text-indigo-950">
                            <strong className="text-[10px] uppercase tracking-wider text-indigo-700 block mb-0.5">
                              💡 Shortcut Solution & Method:
                            </strong>
                            {q.explanation || 'Solved using standard IBPS elimination method.'}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {!hasUnlockedReport && (
            <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white max-w-md w-full p-6 rounded-3xl shadow-2xl border text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="text-base font-black text-slate-900">Unlock AI Topic Matrix & Solution Reviewer</h4>
                <p className="text-xs text-slate-600 mt-1 mb-5 leading-relaxed">
                  See which specific topics are slowing you down, inspect step-by-step solutions, and unlock your exact selection probability for IBPS Clerk, RRB PO & IBPS PO.
                </p>
                <button
                  onClick={onOpenUpgrade}
                  className="w-full py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
                >
                  Unlock Pro Pass — ₹49 / Month →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ProtectedCreatorRoute({ children }) {
  const { user } = useAuthStore()
  if (!user || user.role !== 'creator') {
    return <Navigate to="/login" replace />
  }
  return children
}

export default function App() {
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const { upgradeToPro } = useAuthStore()

  return (
    <BrowserRouter>
      <PaymentCheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSuccess={upgradeToPro}
      />
      <Routes>
        <Route path="/" element={<Home onOpenUpgrade={() => setCheckoutOpen(true)} />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/dashboard" element={<StudentDashboard onOpenUpgrade={() => setCheckoutOpen(true)} />} />
        <Route
          path="/studio"
          element={
            <ProtectedCreatorRoute>
              <CreatorStudio onOpenUpgrade={() => setCheckoutOpen(true)} />
            </ProtectedCreatorRoute>
          }
        />
        <Route path="/test/:testId" element={<ExamArena onOpenUpgrade={() => setCheckoutOpen(true)} />} />
        <Route path="/result/:attemptId" element={<DiagnosticReport onOpenUpgrade={() => setCheckoutOpen(true)} />} />
      </Routes>
    </BrowserRouter>
  )
}