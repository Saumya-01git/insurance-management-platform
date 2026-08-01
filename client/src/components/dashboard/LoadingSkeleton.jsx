const LoadingSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse p-6">
      {/* Banner Skeleton */}
      <div className="h-36 rounded-3xl bg-slate-200 dark:bg-slate-800 w-full" />

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 rounded-2xl bg-slate-200 dark:bg-slate-800 w-full" />
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 h-80 rounded-2xl bg-slate-200 dark:bg-slate-800 w-full" />
        <div className="lg:col-span-4 h-80 rounded-2xl bg-slate-200 dark:bg-slate-800 w-full" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
