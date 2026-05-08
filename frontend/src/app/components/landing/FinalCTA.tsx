"use client";

export function FinalCTA() {
  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0d0d0d] via-[#0a0a0a] to-[#080808]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, opacity: 0.03 }} />
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="mb-6">
          <div className="w-12 h-12 rounded bg-white/5 border border-white/5 flex items-center justify-center mx-auto">
            <span className="text-lg text-white/40">→</span>
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Ready to join the community?
        </h2>

        <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto">
          Join thousands of developers who are already building, learning, and growing together.
        </p>

        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <a 
            href="/signin" 
            className="inline-flex items-center justify-center px-5 py-2 font-medium text-sm rounded bg-white text-black hover:bg-white/90 transition-colors"
          >
            Create Account
          </a>
          <a 
            href="/signin" 
            className="inline-flex items-center justify-center px-5 py-2 font-medium text-sm rounded border border-white/10 text-white hover:bg-white/5 transition-colors"
          >
            Sign In
          </a>
        </div>

        <p className="text-white/20 text-xs mt-6">
          Free to join • No credit card required
        </p>
      </div>
    </section>
  );
}