import api from "@/lib/api";

// ── Auth Service — talks to Xeni 2.0 /api/auth ──

export interface LoginPayload {
  email: string;
  password: string;
  totp_code?: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  full_name: string;
  language?: "en" | "bn";
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_at: string;
  user: {
    id: string;
    email: string;
    full_name: string;
    role: string;
  };
}

const TOKEN_KEY = "epic_token";
const REFRESH_KEY = "epic_refresh_token";
const USER_KEY = "epic_customer";

export const authService = {
  /** Register a new customer account */
  async register(payload: RegisterPayload): Promise<{ user_id: string; email: string; message: string }> {
    const { data } = await api.post("/auth/register", payload);
    return data.data;
  },

  /** Login and receive JWT tokens */
  async login(payload: LoginPayload): Promise<AuthTokens> {
    const { data } = await api.post("/auth/login", payload);
    const result = data.data as AuthTokens;

    // Persist tokens
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, result.access_token);
      localStorage.setItem(REFRESH_KEY, result.refresh_token);
      localStorage.setItem(USER_KEY, JSON.stringify(result.user));
    }

    return result;
  },

  /** Verify email with OTP */
  async verifyEmail(email: string, code: string): Promise<{ message: string }> {
    const { data } = await api.post("/auth/verify-email", { email, code });
    return data.data;
  },

  /** Resend verification OTP */
  async resendOTP(email: string): Promise<{ message: string }> {
    const { data } = await api.post("/auth/resend-otp", { email });
    return data.data;
  },

  /** Forgot password — send reset OTP */
  async forgotPassword(email: string): Promise<{ message: string }> {
    const { data } = await api.post("/auth/forgot-password", { email });
    return data.data;
  },

  /** Reset password with OTP */
  async resetPassword(email: string, code: string, newPassword: string): Promise<{ message: string }> {
    const { data } = await api.post("/auth/reset-password", {
      email,
      code,
      new_password: newPassword,
    });
    return data.data;
  },

  /** Refresh the access token */
  async refreshToken(): Promise<{ access_token: string; refresh_token: string; expires_at: string }> {
    const refreshToken = typeof window !== "undefined" ? localStorage.getItem(REFRESH_KEY) : null;
    if (!refreshToken) throw new Error("No refresh token");

    const { data } = await api.post("/auth/refresh", { refresh_token: refreshToken });
    const result = data.data;

    // Update stored tokens
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, result.access_token);
      localStorage.setItem(REFRESH_KEY, result.refresh_token);
    }

    return result;
  },

  /** Logout */
  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } catch {
      // Ignore errors — just clear local
    }

    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },

  /** Get the currently stored user (from localStorage) */
  getStoredUser(): AuthTokens["user"] | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  /** Check if user is logged in */
  isLoggedIn(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(TOKEN_KEY);
  },
};
