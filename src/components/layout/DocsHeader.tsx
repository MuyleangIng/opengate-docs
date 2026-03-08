'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, ExternalLink, ChevronDown, Tag } from 'lucide-react';
import { useState } from 'react';

const VERSIONS = [
  { label: 'v1.0.0', tag: 'latest', href: '/docs/getting-started' },
  { label: 'v0.9.0', tag: 'previous', href: '/changelog#v090' },
];

const CURRENT_VERSION = 'v1.0.0';

export function DocsHeader() {
  const pathname = usePathname();
  const [vOpen, setVOpen] = useState(false);

  const navLinks = [
    { label: 'Docs', href: '/docs/getting-started' },
    { label: 'API', href: '/docs/api' },
    { label: 'About', href: '/about' },
    { label: 'Changelog', href: '/changelog' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-gray-200 bg-white/90 backdrop-blur-md flex items-center px-6 gap-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 flex-shrink-0">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#0D1B2A' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00B4D8" strokeWidth="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <span className="font-bold text-gray-900 text-sm">OpenGate</span>
        <span className="text-gray-400 text-sm">/ Docs</span>
      </Link>

      {/* Version selector */}
      <div className="relative">
        <button
          onClick={() => setVOpen(v => !v)}
          className="flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-md border border-gray-200 text-gray-600 hover:border-cyan-400 hover:text-cyan-600 transition-colors"
        >
          <Tag size={10} />
          {CURRENT_VERSION}
          <ChevronDown size={10} className={`transition-transform ${vOpen ? 'rotate-180' : ''}`} />
        </button>
        {vOpen && (
          <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="px-3 py-2 text-[10px] text-gray-400 uppercase tracking-wider font-semibold border-b border-gray-100">
              Version
            </div>
            {VERSIONS.map(v => (
              <Link key={v.label} href={v.href}
                onClick={() => setVOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <span className="font-mono text-xs">{v.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                  v.tag === 'latest' ? 'bg-cyan-50 text-cyan-600' : 'bg-gray-100 text-gray-500'
                }`}>{v.tag}</span>
              </Link>
            ))}
            <div className="border-t border-gray-100 px-3 py-2">
              <Link href="/changelog" onClick={() => setVOpen(false)}
                className="text-[11px] text-cyan-600 hover:underline">
                View Changelog →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Search placeholder */}
      <div className="hidden lg:flex flex-1 max-w-xs mx-auto">
        <div className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-400 text-xs cursor-pointer hover:border-gray-300 transition-colors">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          Search docs...
          <kbd className="ml-auto text-[10px] bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">⌘K</kbd>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex items-center gap-4 ml-auto">
        {navLinks.map(({ label, href }) => (
          <Link key={href} href={href}
            className={`text-sm hidden md:block transition-colors ${
              pathname?.startsWith(href) && href !== '/'
                ? 'text-cyan-600 font-medium'
                : 'text-gray-600 hover:text-gray-900'
            }`}>
            {label}
          </Link>
        ))}
        <a href="https://github.com/MuyleangIng/opengate-iam" target="_blank" rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-900 transition-colors">
          <Github size={18} />
        </a>
        <a href="http://localhost:3002" target="_blank" rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 text-sm text-white px-3.5 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
          style={{ background: '#00B4D8' }}>
          Console <ExternalLink size={11} />
        </a>
      </nav>
    </header>
  );
}
