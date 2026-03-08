'use client';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function CodeBlock({ code, language = 'bash', filename }: { code: string; language?: string; filename?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-slate-700">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
          <span className="text-xs text-slate-400 font-mono">{filename}</span>
          <span className="text-xs text-slate-500 uppercase">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className="!rounded-none !border-0 !m-0">
          <code className={`language-${language}`}>{code}</code>
        </pre>
        <button
          onClick={copy}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-slate-300" />}
        </button>
      </div>
    </div>
  );
}
