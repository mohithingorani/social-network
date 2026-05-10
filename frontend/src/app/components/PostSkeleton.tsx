export default function PostSkeleton() {
  return (
    <div className="bg-[#181818] p-3 rounded-2xl border border-white/10 animate-pulse">
      {/* User Info Skeleton */}
      <div className="flex items-center gap-3 mb-3">
        <div className="rounded-full w-9 h-9 bg-white/10" />
        <div className="flex flex-col gap-1.5">
          <div className="h-3 w-24 rounded bg-white/10" />
          <div className="h-2 w-16 rounded bg-white/5" />
        </div>
      </div>

      {/* Image Skeleton */}
      <div className="rounded-xl h-64 bg-white/5 mb-3" />

      {/* Caption Skeleton */}
      <div className="mb-3 space-y-2">
        <div className="h-3 w-full rounded bg-white/5" />
        <div className="h-3 w-3/4 rounded bg-white/5" />
      </div>

      {/* Actions Skeleton */}
      <div className="flex items-center gap-4 pt-3 border-t border-white/10">
        <div className="flex items-center gap-2 px-3 py-1.5">
          <div className="w-5 h-5 rounded bg-white/10" />
          <div className="h-3 w-8 rounded bg-white/5" />
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5">
          <div className="w-5 h-5 rounded bg-white/10" />
          <div className="h-3 w-8 rounded bg-white/5" />
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5">
          <div className="w-5 h-5 rounded bg-white/10" />
          <div className="h-3 w-12 rounded bg-white/5" />
        </div>
      </div>
    </div>
  );
}