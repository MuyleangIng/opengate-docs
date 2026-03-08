'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ALL_PAGES = [
  // Getting Started
  { label: 'Introduction',          href: '/docs/getting-started',                section: 'Getting Started' },
  { label: 'Quick Start',           href: '/docs/getting-started/quick-start',    section: 'Getting Started' },
  { label: 'Installation',          href: '/docs/getting-started/installation',   section: 'Getting Started' },
  { label: 'Configuration',         href: '/docs/getting-started/configuration',  section: 'Getting Started' },
  // Server
  { label: 'Server Configuration',  href: '/docs/server/configuration',           section: 'Server' },
  { label: 'Production Setup',      href: '/docs/server/production',              section: 'Server' },
  { label: 'Running in Container',  href: '/docs/server/container',               section: 'Server' },
  { label: 'Configuring TLS',       href: '/docs/server/tls',                     section: 'Server' },
  { label: 'Reverse Proxy',         href: '/docs/server/reverse-proxy',           section: 'Server' },
  { label: 'Database',              href: '/docs/server/database',                section: 'Server' },
  { label: 'Caching (Redis)',        href: '/docs/server/caching',                 section: 'Server' },
  { label: 'Logging',               href: '/docs/server/logging',                 section: 'Server' },
  { label: 'Import / Export',       href: '/docs/server/import-export',           section: 'Server' },
  // Architecture
  { label: 'Architecture Overview', href: '/docs/architecture',                   section: 'Architecture' },
  { label: 'Microservices',         href: '/docs/architecture/microservices',     section: 'Architecture' },
  { label: 'Auth Flow',             href: '/docs/architecture/auth-flow',         section: 'Architecture' },
  { label: 'Data Model',            href: '/docs/architecture/data-model',        section: 'Architecture' },
  // API Reference
  { label: 'API Authentication',    href: '/docs/api',                            section: 'API Reference' },
  { label: 'Realms',                href: '/docs/api/realms',                     section: 'API Reference' },
  { label: 'Users',                 href: '/docs/api/users',                      section: 'API Reference' },
  { label: 'Roles & RBAC',          href: '/docs/api/roles',                      section: 'API Reference' },
  { label: 'OAuth Clients',         href: '/docs/api/clients',                    section: 'API Reference' },
  { label: 'Sessions',              href: '/docs/api/sessions',                   section: 'API Reference' },
  { label: 'MFA',                   href: '/docs/api/mfa',                        section: 'API Reference' },
  // Integration
  { label: 'Integration Overview',  href: '/docs/integration',                    section: 'Integration' },
  { label: 'React / Next.js',       href: '/docs/integration/react',              section: 'Integration' },
  { label: 'Spring Boot',           href: '/docs/integration/spring-boot',        section: 'Integration' },
  // Observability
  { label: 'Health Checks',         href: '/docs/observability/health',           section: 'Observability' },
  { label: 'Metrics',               href: '/docs/observability/metrics',          section: 'Observability' },
  { label: 'Tracing (OTLP)',        href: '/docs/observability/tracing',          section: 'Observability' },
  { label: 'Dashboards',            href: '/docs/observability/dashboards',       section: 'Observability' },
  { label: 'Audit Events',          href: '/docs/observability/audit',            section: 'Observability' },
  // Security
  { label: 'OAuth 2.1 / OIDC',      href: '/docs/security/oauth2',               section: 'Security' },
  { label: 'MFA Security',          href: '/docs/security/mfa',                   section: 'Security' },
  { label: 'RBAC & Roles',          href: '/docs/security/rbac',                  section: 'Security' },
  { label: 'Sessions Security',     href: '/docs/security/sessions',              section: 'Security' },
  // Deployment
  { label: 'Docker Compose',        href: '/docs/deployment',                     section: 'Deployment' },
  { label: 'Kubernetes',            href: '/docs/deployment/kubernetes',          section: 'Deployment' },
  { label: 'Production Checklist',  href: '/docs/deployment/production',          section: 'Deployment' },
];

export function PageNav() {
  const pathname = usePathname();
  const idx = ALL_PAGES.findIndex(p => p.href === pathname);
  const prev = idx > 0 ? ALL_PAGES[idx - 1] : null;
  const next = idx < ALL_PAGES.length - 1 ? ALL_PAGES[idx + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="mt-16 pt-6 border-t border-gray-200 flex items-stretch gap-3">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex-1 flex flex-col gap-1 px-5 py-4 rounded-xl border border-gray-200 hover:border-[#00B4D8] hover:bg-[#00B4D808] transition-all"
        >
          <span className="flex items-center gap-1 text-xs text-gray-400 group-hover:text-[#00B4D8] transition-colors">
            <ChevronLeft size={13} />
            {prev.section}
          </span>
          <span className="text-sm font-semibold text-gray-700 group-hover:text-[#00B4D8] transition-colors">
            {prev.label}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex-1 flex flex-col items-end gap-1 px-5 py-4 rounded-xl border border-gray-200 hover:border-[#00B4D8] hover:bg-[#00B4D808] transition-all"
        >
          <span className="flex items-center gap-1 text-xs text-gray-400 group-hover:text-[#00B4D8] transition-colors">
            {next.section}
            <ChevronRight size={13} />
          </span>
          <span className="text-sm font-semibold text-gray-700 group-hover:text-[#00B4D8] transition-colors">
            {next.label}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
