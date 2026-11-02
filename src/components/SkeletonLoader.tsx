import React from 'react';

interface SkeletonProps {
  type: 'trends' | 'process' | 'interview' | 'matching';
  message?: string;
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({ type, message = 'AI가 전문 데이터를 분석하고 있습니다...' }) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-5 h-5 rounded-full border-2 border-slate-300 border-t-blue-900 animate-spin" />
        <span className="text-sm font-medium text-slate-700 animate-pulse">{message}</span>
      </div>

      {type === 'trends' && (
        <div className="space-y-6">
          <div className="h-48 md:h-64 rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center p-6">
            <div className="flex flex-wrap gap-3 items-center justify-center max-w-lg">
              <div className="w-28 h-28 rounded-full bg-slate-200" />
              <div className="w-36 h-36 rounded-full bg-slate-300" />
              <div className="w-24 h-24 rounded-full bg-slate-200" />
              <div className="w-32 h-32 rounded-full bg-slate-300" />
              <div className="w-20 h-20 rounded-full bg-slate-200" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 space-y-3">
                <div className="h-5 w-1/2 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse" />
                <div className="h-3 w-1/3 bg-slate-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      )}

      {type === 'process' && (
        <div className="space-y-6">
          <div className="h-6 w-1/3 bg-slate-200 rounded animate-pulse mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-28 rounded-xl bg-slate-100 animate-pulse border border-slate-200/60 p-3 flex flex-col justify-between">
                <div className="w-6 h-6 rounded-full bg-slate-300" />
                <div className="h-3 w-3/4 bg-slate-200 rounded" />
                <div className="h-2 w-1/2 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
          <div className="h-48 rounded-xl bg-slate-50 border border-slate-200 p-6 space-y-4">
            <div className="h-5 w-1/4 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-slate-200 rounded animate-pulse" />
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="h-16 bg-slate-200/80 rounded" />
              <div className="h-16 bg-slate-200/80 rounded" />
              <div className="h-16 bg-slate-200/80 rounded" />
            </div>
          </div>
        </div>
      )}

      {type === 'interview' && (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-slate-200 rounded animate-pulse" />
                <div className="h-5 w-12 bg-slate-200 rounded animate-pulse" />
              </div>
              <div className="h-5 w-4/5 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-2/5 bg-slate-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      )}

      {type === 'matching' && (
        <div className="space-y-4">
          <div className="h-24 rounded-xl bg-slate-100 p-4 space-y-2 animate-pulse">
            <div className="h-4 w-1/3 bg-slate-200 rounded" />
            <div className="h-6 w-1/4 bg-slate-300 rounded" />
          </div>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="h-10 bg-slate-100" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 border-t border-slate-100 grid grid-cols-4 gap-4">
                <div className="h-4 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 bg-slate-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
