import Link from 'next/link';
import { Lock, Github, ExternalLink } from 'lucide-react';

export function DocsHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-gray-200 bg-white/80 backdrop-blur-md flex items-center px-6">
      <div className="flex items-center gap-2 flex-1">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#0D1B2A' }}>
          <Lock size={14} color="#00B4D8" />
        </div>
        <span className="font-bold text-gray-900 text-sm">OpenGate</span>
        <span className="text-gray-400 text-sm ml-1">/ Docs</span>
      </div>
      <nav className="flex items-center gap-4">
        <Link href="/docs/getting-started" className="text-sm text-gray-600 hover:text-gray-900 hidden md:block">Docs</Link>
        <Link href="/docs/api" className="text-sm text-gray-600 hover:text-gray-900 hidden md:block">API</Link>
        <Link
          href="http://localhost:3000"
          className="flex items-center gap-1.5 text-sm text-white px-3 py-1.5 rounded-lg hidden md:flex"
          style={{ background: '#00B4D8' }}
        >
          Console <ExternalLink size={12} />
        </Link>
        <a href="https://github.com/opengate-iam/opengate" className="text-gray-500 hover:text-gray-900">
          <Github size={18} />
        </a>
      </nav>
    </header>
  );
}
