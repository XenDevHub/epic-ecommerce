"use client";

import { useState } from "react";
import { useUIStore } from "@/stores/uiStore";
import { authService } from "@/services/authService";
import toast from "react-hot-toast";

export default function AuthModal() {
  const { isAuthOpen, closeAuth, authMode, setAuthMode, authEmail, setAuthEmail } =
    useUIStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthOpen) return null;

  const currentEmail = authEmail || email;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    setLoading(true);
    try {
      const data = await authService.login({ email, password });
      toast.success(`Welcome back, ${data.user.full_name}!`);
      closeAuth();
      window.location.reload();
    } catch (err: unknown) {
      const errObj = err as { response?: { data?: { error?: string } }; message?: string };
      const msg = errObj.response?.data?.error || errObj.message || "Invalid email or password";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await authService.register({ full_name: fullName, email, password });
      toast.success("Account created! Check your email for OTP verification.");
      setAuthEmail(email);
      setAuthMode("otp");
    } catch (err: unknown) {
      const errObj = err as { response?: { data?: { error?: string } }; message?: string };
      const msg = errObj.response?.data?.error || errObj.message || "Registration failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 6) {
      toast.error("Please enter the 6-digit OTP code");
      return;
    }
    setLoading(true);
    try {
      await authService.verifyEmail(currentEmail, otpCode);
      toast.success("Email verified successfully! You can now log in.");
      setAuthMode("login");
    } catch (err: unknown) {
      const errObj = err as { response?: { data?: { error?: string } }; message?: string };
      const msg = errObj.response?.data?.error || errObj.message || "Invalid or expired OTP code";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!currentEmail) return;
    setLoading(true);
    try {
      await authService.resendOTP(currentEmail);
      toast.success("New verification code sent via Resend!");
    } catch (err: unknown) {
      const errObj = err as { response?: { data?: { error?: string } }; message?: string };
      toast.error(errObj.response?.data?.error || "Failed to resend code");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://xeni.e-pic.co";
    window.location.href = `${apiBase}/api/auth/google`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-surface-container-low border border-outline-variant/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-on-surface"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Gradient Line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-secondary to-tertiary" />

        {/* Close Button */}
        <button
          onClick={closeAuth}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-on-surface-variant transition-colors"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-base">close</span>
        </button>

        {/* ── Mode 1: Login ── */}
        {authMode === "login" && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                Customer Portal
              </span>
              <h2 className="text-2xl font-headline-xl font-bold mt-1 text-on-surface">
                Welcome Back
              </h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Access your verified orders, smart escrow vault & wishlist.
              </p>
            </div>

            {/* Google One-Click Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 px-4 rounded-2xl bg-surface-container-high hover:bg-surface-bright border border-outline-variant/20 flex items-center justify-center gap-3 text-xs font-semibold text-on-surface transition-all mb-4"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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
              <span>Continue with Google</span>
            </button>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/15" />
              </div>
              <span className="relative px-3 bg-surface-container-low text-[11px] text-on-surface-variant uppercase tracking-wider">
                or with email
              </span>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-on-surface-variant mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-surface-container border border-outline-variant/20 focus:border-primary/50 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-on-surface-variant">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setAuthMode("forgot")}
                    className="text-[11px] text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-surface-container border border-outline-variant/20 focus:border-primary/50 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-primary hover:brightness-110 active:scale-[0.99] text-on-primary font-semibold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? "Authenticating..." : "Sign In"}
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-on-surface-variant">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setAuthMode("register")}
                className="text-primary font-semibold hover:underline"
              >
                Create Account
              </button>
            </div>
          </div>
        )}

        {/* ── Mode 2: Register ── */}
        {authMode === "register" && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                Join E-Pic
              </span>
              <h2 className="text-2xl font-headline-xl font-bold mt-1 text-on-surface">
                Create Customer Account
              </h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Shop with smart escrow protection and real-time delivery tracking.
              </p>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 px-4 rounded-2xl bg-surface-container-high hover:bg-surface-bright border border-outline-variant/20 flex items-center justify-center gap-3 text-xs font-semibold text-on-surface transition-all mb-4"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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
              <span>Sign Up with Google</span>
            </button>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/15" />
              </div>
              <span className="relative px-3 bg-surface-container-low text-[11px] text-on-surface-variant uppercase tracking-wider">
                or standard registration
              </span>
            </div>

            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-on-surface-variant mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Riduanul Hasan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-surface-container border border-outline-variant/20 focus:border-secondary/50 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-on-surface-variant mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-surface-container border border-outline-variant/20 focus:border-secondary/50 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-on-surface-variant mb-1">
                  Password (min 6 characters)
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-surface-container border border-outline-variant/20 focus:border-secondary/50 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-secondary hover:brightness-110 active:scale-[0.99] text-on-secondary font-semibold text-sm transition-all shadow-lg flex items-center justify-center gap-2 mt-2"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-on-surface-variant">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className="text-secondary font-semibold hover:underline"
              >
                Sign In
              </button>
            </div>
          </div>
        )}

        {/* ── Mode 3: OTP Verification via Resend ── */}
        {authMode === "otp" && (
          <div>
            <div className="mb-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-2xl">mail</span>
              </div>
              <h2 className="text-xl font-headline-xl font-bold text-on-surface">
                Verify Email Address
              </h2>
              <p className="text-xs text-on-surface-variant mt-1">
                We sent a 6-digit code via Resend to{" "}
                <strong className="text-on-surface">{currentEmail}</strong>
              </p>
            </div>

            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="123456"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full tracking-[0.5em] text-center font-mono font-bold text-2xl py-3 rounded-2xl bg-surface-container border border-outline-variant/30 focus:border-primary text-on-surface focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || otpCode.length < 6}
                className="w-full py-3 rounded-2xl bg-primary hover:brightness-110 active:scale-[0.99] text-on-primary font-semibold text-sm transition-all shadow-lg"
              >
                {loading ? "Verifying..." : "Verify & Activate Account"}
              </button>
            </form>

            <div className="mt-4 flex items-center justify-between text-xs text-on-surface-variant">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={loading}
                className="text-primary hover:underline font-medium"
              >
                Resend code
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className="hover:underline"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        )}

        {/* ── Mode 4: Forgot Password ── */}
        {authMode === "forgot" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-headline-xl font-bold text-on-surface">
                Reset Password
              </h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Enter your email address to receive password reset instructions.
              </p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                try {
                  await authService.forgotPassword(email);
                  toast.success("Password reset code sent to your email!");
                  setAuthEmail(email);
                  setAuthMode("otp");
                } catch {
                  toast.error("Failed to send reset instructions");
                } finally {
                  setLoading(false);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-medium text-on-surface-variant mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-surface-container border border-outline-variant/20 focus:border-primary/50 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-primary text-on-primary font-semibold text-sm shadow-lg hover:brightness-110"
              >
                {loading ? "Sending..." : "Send Reset Code"}
              </button>
            </form>

            <div className="mt-4 text-center text-xs text-on-surface-variant">
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className="text-primary hover:underline"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
