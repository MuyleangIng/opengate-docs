import Link from 'next/link';
import { Tag, Plus, Wrench, Zap, Shield, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Changelog',
  description: 'OpenGate IAM version history and release notes.',
};

const releases = [
  {
    version: 'v1.0.0',
    date: '2026-03-01',
    tag: 'latest',
    tagColor: 'cyan',
    summary: 'Initial public release of OpenGate IAM.',
    sections: [
      {
        type: 'added',
        icon: Plus,
        color: '#10b981',
        bg: '#f0fdf4',
        border: '#bbf7d0',
        items: [
          '11 independent Spring Boot 3 microservices architecture',
          'OAuth 2.1 Authorization Code + PKCE flow',
          'Spring Authorization Server 1.3 integration',
          'Multi-realm tenancy (users, clients, roles per realm)',
          'RBAC — fine-grained roles, composite roles, groups',
          'MFA — TOTP (Google Authenticator), Email OTP, SMS OTP',
          'Redis-backed session management with device tracking',
          'Kafka-powered audit event streaming',
          'Admin Console (Next.js 14 + TypeScript)',
          'Documentation site with Vercel deployment support',
          'opengate-spring-boot-starter for easy integration',
          'Docker Compose stack for local development',
          'Prometheus metrics + OpenTelemetry tracing ready',
          'RSA-2048 JWT signing with JWKS endpoint',
          'OIDC userinfo endpoint and issuer discovery',
        ],
      },
    ],
  },
  {
    version: 'v0.9.0',
    date: '2026-01-15',
    tag: 'previous',
    tagColor: 'gray',
    summary: 'Beta release — core auth flow and user management.',
    sections: [
      {
        type: 'added',
        icon: Plus,
        color: '#10b981',
        bg: '#f0fdf4',
        border: '#bbf7d0',
        items: [
          'Core auth service with Spring Authorization Server',
          'User service with basic CRUD operations',
          'Realm service with single-realm support',
          'Basic admin console (login + realm view)',
          'PostgreSQL + Redis integration',
        ],
      },
      {
        type: 'fixed',
        icon: Wrench,
        color: '#f59e0b',
        bg: '#fffbeb',
        border: '#fde68a',
        items: [
          'CORS handling across all service-to-service calls',
          'JWT token expiry edge cases',
          'Session invalidation on password change',
        ],
      },
    ],
  },
];

const typeLabels: Record<string, string> = {
  added: 'Added',
  fixed: 'Fixed',
  improved: 'Improved',
  security: 'Security',
  breaking: 'Breaking',
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-14 z-40">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900 transition-colors">OpenGate IAM</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Changelog</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-cyan-600 text-xs font-semibold uppercase tracking-widest mb-3">
            <Tag size={12} /> Version History
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Changelog</h1>
          <p className="text-gray-500">
            All notable changes to OpenGate IAM are documented here.
            Version numbers follow <a href="https://semver.org" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">Semantic Versioning</a>.
          </p>
        </div>

        {/* Releases */}
        <div className="space-y-14">
          {releases.map(release => (
            <div key={release.version} id={release.version.replace('.', '')}>
              {/* Version header */}
              <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-bold text-gray-900 font-mono">{release.version}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                      release.tagColor === 'cyan'
                        ? 'bg-cyan-50 text-cyan-700 border-cyan-200'
                        : 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}>
                      {release.tag}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-mono">{release.date}</p>
                </div>
                <p className="text-sm text-gray-600 max-w-xs text-right">{release.summary}</p>
              </div>

              {/* Sections */}
              <div className="space-y-5">
                {release.sections.map(section => (
                  <div key={section.type} className="rounded-2xl border overflow-hidden" style={{ borderColor: section.border }}>
                    <div className="px-5 py-3 flex items-center gap-2 text-sm font-semibold" style={{ background: section.bg, color: section.color }}>
                      <section.icon size={15} />
                      {typeLabels[section.type] ?? section.type}
                    </div>
                    <ul className="divide-y divide-gray-50 bg-white">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 px-5 py-2.5">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: section.color }} />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-10 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500 mb-4">Want to see what&apos;s coming next?</p>
          <div className="flex justify-center gap-3">
            <a href="https://github.com/MuyleangIng/opengate-iam/issues" target="_blank" rel="noopener noreferrer"
              className="text-sm text-cyan-600 font-medium hover:underline">
              View open issues →
            </a>
            <span className="text-gray-300">·</span>
            <a href="https://github.com/MuyleangIng/opengate-iam/pulls" target="_blank" rel="noopener noreferrer"
              className="text-sm text-cyan-600 font-medium hover:underline">
              Open pull requests →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
