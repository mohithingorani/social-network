"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  MessageCircle,
  Users,
  Network,
} from "lucide-react";

const panelFeatures = [
  { icon: MessageCircle, title: "Real-time chat", desc: "Message friends the moment it matters." },
  { icon: Users, title: "Discover people", desc: "Find the students right around you." },
  { icon: Network, title: "Social graph", desc: "Watch your campus circle grow." },
];

export default function Signin() {
  const { status } = useSession();
  const router = useRouter();
  const [formState, setFormState] = useState<"signup" | "signin">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSignup = formState === "signup";

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/feed");
    }
  }, [status, router]);

  const handleGoogleAuth = async () => {
    const callbackUrl = process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/feed`
      : "http://localhost:3001/feed";
    await signIn("google", { callbackUrl });
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white antialiased">
      {/* minimal techy backdrop — no glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
        }}
      />

      {/* back to home */}
      <Link
        href="/"
        className="fixed left-5 top-5 z-20 inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-light text-white/45 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back home
      </Link>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c0e] lg:grid-cols-2">
            {/* ---------- form ---------- */}
            <div className="p-8 sm:p-12">
              <div className="mb-8 flex items-center gap-2.5">
                <span className="relative h-8 w-8">
                  <Image src="/newlogo.svg" fill alt="UNIVO" className="object-contain" />
                </span>
                <span className="text-sm font-medium tracking-[0.14em] text-white">UNIVO</span>
              </div>

              <h1 className="text-3xl font-light tracking-tight text-white">
                {isSignup ? "Create your account" : "Welcome back"}
              </h1>
              <p className="mt-2 text-sm font-light text-white/40">
                {isSignup
                  ? "Join your campus community in under a minute."
                  : "Sign in to pick up where you left off."}
              </p>

              {/* segmented toggle */}
              <div className="mt-7 grid grid-cols-2 gap-1 rounded-xl border border-white/[0.08] bg-white/[0.02] p-1">
                {(["signin", "signup"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFormState(s)}
                    className={`h-10 rounded-lg text-sm font-medium transition-colors ${
                      formState === s
                        ? "bg-white text-[#0a0a0a]"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    {s === "signin" ? "Sign in" : "Sign up"}
                  </button>
                ))}
              </div>

              {/* form */}
              <div className="mt-7 space-y-4">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-white/55">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                    <input
                      id="email"
                      type="email"
                      className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#0f0f12] pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-[#5B9DF0]/50 focus:ring-2 focus:ring-[#5B9DF0]/15"
                      placeholder="you@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label htmlFor="password" className="block text-xs font-medium text-white/55">
                      Password
                    </label>
                    {!isSignup && (
                      <a href="#" className="text-xs font-light text-white/35 transition-colors hover:text-white/70">
                        Forgot?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#0f0f12] pl-10 pr-12 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-[#5B9DF0]/50 focus:ring-2 focus:ring-[#5B9DF0]/15"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-1 flex h-12 w-full items-center justify-center rounded-xl bg-white text-sm font-medium text-[#0a0a0a] transition-colors hover:bg-white/90"
                >
                  {isSignup ? "Create account" : "Sign in"}
                </button>

                <div className="my-5 flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/[0.08]" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-white/25">or</span>
                  <div className="h-px flex-1 bg-white/[0.08]" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.02] text-sm font-medium text-white transition-colors hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </button>

                <p className="pt-1 text-center text-xs font-light leading-relaxed text-white/30">
                  By continuing you agree to our{" "}
                  <a href="#" className="text-white/50 hover:text-white">Terms</a> and{" "}
                  <a href="#" className="text-white/50 hover:text-white">Privacy Policy</a>.
                </p>
              </div>
            </div>

            {/* ---------- brand panel ---------- */}
            <div className="relative hidden border-l border-white/[0.07] bg-[#0d0d0f] p-12 lg:flex lg:flex-col">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                  maskImage: "radial-gradient(ellipse 90% 80% at 60% 20%, black, transparent)",
                  WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 60% 20%, black, transparent)",
                }}
              />
              <div className="relative flex h-full flex-col">
                <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5B9DF0] pulse-ring" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
                    The campus social network
                  </span>
                </div>

                <h2 className="mt-8 text-3xl font-light leading-snug tracking-tight text-white">
                  Your whole campus,
                  <br />
                  <span className="text-white/45">in one place.</span>
                </h2>

                <div className="mt-10 space-y-4">
                  {panelFeatures.map((f) => (
                    <div key={f.title} className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02]">
                        <f.icon className="h-[18px] w-[18px] text-[#5B9DF0]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{f.title}</div>
                        <div className="text-sm font-light text-white/40">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* mini chat vignette */}
                <div className="mt-auto rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <div className="mb-3 flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#7c6cf0] to-[#4b3fb0] text-[10px] font-bold text-white">
                      AR
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white">Ananya R.</div>
                      <div className="text-[10px] text-[#5B9DF0]">online</div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white/[0.05] px-3 py-1.5 text-[11px] text-white/65">
                      see you at the library? 📚
                    </div>
                    <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[#5B9DF0] px-3 py-1.5 text-[11px] font-medium text-[#0a0a0a]">
                      omw — grabbing chai first ☕
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
