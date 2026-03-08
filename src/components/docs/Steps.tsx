import { ReactNode } from 'react';

export function Steps({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 space-y-0 relative before:absolute before:left-[18px] before:top-8 before:bottom-8 before:w-px before:bg-gray-200">
      {children}
    </div>
  );
}

export function Step({ step, title, children }: { step: number; title: string; children: ReactNode }) {
  return (
    <div className="relative flex gap-4 pb-8 last:pb-0">
      <div className="relative z-10 flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
        style={{ background: '#00B4D8' }}>
        {step}
      </div>
      <div className="flex-1 pt-1.5 min-w-0">
        <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="text-sm text-gray-600 space-y-2">{children}</div>
      </div>
    </div>
  );
}
