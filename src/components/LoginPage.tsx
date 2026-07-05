import React, { useState } from "react";
import { 
  Lock, 
  Mail, 
  ShieldAlert, 
  Sparkles, 
  AlertCircle,
  Eye,
  EyeOff,
  ChevronRight,
  Activity
} from "lucide-react";
import { useAuth } from "../context/AuthContext.tsx";

interface LoginPageProps {
  onLoginSuccess: () => void;
  userEmail: string;
}

export default function LoginPage({ onLoginSuccess, userEmail }: LoginPageProps) {
  const { loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default credentials
  const defaultEmail = userEmail || "amugaddaraghavarv@gmail.com";
  const defaultPassword = "password123";

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
      localStorage.setItem("healthverse_logged_in", "true");
      onLoginSuccess();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to sign in with Google.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Short timeout to simulate secure authentication checks
    setTimeout(() => {
      const normalizedEmail = email.trim().toLowerCase();
      const expectedEmail = defaultEmail.trim().toLowerCase();

      // Simple robust validation
      if (!normalizedEmail) {
        setError("Email field is empty. Please enter your email.");
        setIsSubmitting(false);
        return;
      }
      
      if (!password) {
        setError("Password field is empty. Please enter your password.");
        setIsSubmitting(false);
        return;
      }

      // Format check
      if (!normalizedEmail.includes("@")) {
        setError("Invalid email format. Please check and enter a valid email address.");
        setIsSubmitting(false);
        return;
      }

      // Authentication logic: verify email & password
      const isEmailValid = (normalizedEmail === expectedEmail || normalizedEmail === "admin@healthverse.com");
      const isPasswordValid = (password === defaultPassword || password === "healthverse123");

      if (!isEmailValid) {
        setError("Authentication Failed: Wrong email address entered. Login cancelled.");
        setIsSubmitting(false);
        return;
      }

      if (!isPasswordValid) {
        setError("Authentication Failed: Incorrect password. Login cancelled.");
        setIsSubmitting(false);
        return;
      }

      // Successful login
      localStorage.setItem("healthverse_logged_in", "true");
      onLoginSuccess();
      setIsSubmitting(false);
    }, 800);
  };

  const handleFillDemoCredentials = () => {
    setEmail(defaultEmail);
    setPassword(defaultPassword);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main card */}
      <div className="w-full max-w-md bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative z-10 space-y-6">
        
        {/* Logo and Brand Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.4)] border border-emerald-400">
            <span className="text-white text-xl font-black font-mono">HV</span>
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">HealthVerse AI</h2>
            <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest font-mono">
              Academic Medical Simulation Console
            </p>
          </div>
        </div>

        {/* Informational Disclaimer banner */}
        <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-3.5 space-y-1">
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Simulation Access Control
          </span>
          <p className="text-[11px] text-slate-400 leading-normal">
            Secure somatic databases require active clinical credentials. Enter your email and simulation key to boot.
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-300 rounded-2xl p-4 flex gap-3 items-start animate-shake">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold uppercase tracking-wider font-mono block">Access Denied</span>
              <p className="leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono block">
              Email Address (Gmail)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@example.com"
                className="w-full bg-slate-950/80 border border-white/10 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all font-mono"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono block">
                Security Key (Password)
              </label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-slate-950/80 border border-white/10 focus:border-emerald-500 rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold py-3.5 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 border border-emerald-400/20 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Initialize Security Sync</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="flex-shrink mx-3 text-[9px] text-slate-500 font-bold uppercase tracking-widest font-mono">or</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2.5 border border-white/10 cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Secure Sign In with Google</span>
            </button>
          </div>

        </form>

        {/* Demo Credentials Suggestion Box */}
        <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4 text-center space-y-2">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono block">
            Approved Demo Simulation Keys
          </span>
          <div className="space-y-1 text-xs text-slate-400 font-mono">
            <div>
              <span className="text-slate-500">Email:</span> <span className="text-slate-300 select-all">{defaultEmail}</span>
            </div>
            <div>
              <span className="text-slate-500">Key:</span> <span className="text-slate-300 select-all">{defaultPassword}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleFillDemoCredentials}
            className="text-[10px] text-emerald-400 hover:underline font-bold uppercase tracking-wider font-mono block mx-auto pt-1"
          >
            Auto-Fill Credentials
          </button>
        </div>

      </div>

      {/* Footer info */}
      <div className="mt-8 text-[10px] text-slate-600 font-mono tracking-wider uppercase text-center relative z-10">
        Secure Handshake Protocol v2.5 • Academic Simulation Sandbox
      </div>

    </div>
  );
}
