'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  {
    section: 'Getting Started',
    items: [
      { label: 'Introduction', href: '/docs/getting-started' },
      { label: 'Quick Start', href: '/docs/getting-started/quick-start' },
      { label: 'Installation', href: '/docs/getting-started/installation' },
      { label: 'Configuration', href: '/docs/getting-started/configuration' },
    ],
  },
  {
    section: 'Server',
    items: [
      { label: 'Configuration',        href: '/docs/server/configuration' },
      { label: 'Production Setup',     href: '/docs/server/production' },
      { label: 'Running in Container', href: '/docs/server/container' },
      { label: 'Configuring TLS',      href: '/docs/server/tls' },
      { label: 'Reverse Proxy',        href: '/docs/server/reverse-proxy' },
      { label: 'Database',             href: '/docs/server/database' },
      { label: 'Caching (Redis)',       href: '/docs/server/caching' },
      { label: 'Logging',              href: '/docs/server/logging' },
      { label: 'Import / Export',      href: '/docs/server/import-export' },
    ],
  },
  {
    section: 'Architecture',
    items: [
      { label: 'Overview', href: '/docs/architecture' },
      { label: 'Microservices', href: '/docs/architecture/microservices' },
      { label: 'Auth Flow', href: '/docs/architecture/auth-flow' },
      { label: 'Data Model', href: '/docs/architecture/data-model' },
    ],
  },
  {
    section: 'API Reference',
    items: [
      { label: 'Authentication', href: '/docs/api' },
      { label: 'Realms', href: '/docs/api/realms' },
      { label: 'Users', href: '/docs/api/users' },
      { label: 'Roles & RBAC', href: '/docs/api/roles' },
      { label: 'OAuth Clients', href: '/docs/api/clients' },
      { label: 'Sessions', href: '/docs/api/sessions' },
      { label: 'MFA', href: '/docs/api/mfa' },
    ],
  },
  {
    section: 'Integration',
    items: [
      { label: 'Overview',            href: '/docs/integration' },
      { label: 'React / Next.js',     href: '/docs/integration/react' },
      { label: 'Spring Boot',         href: '/docs/integration/spring-boot' },
    ],
  },
  {
    section: 'Observability',
    items: [
      { label: 'Health Checks',  href: '/docs/observability/health' },
      { label: 'Metrics',        href: '/docs/observability/metrics' },
      { label: 'Tracing (OTLP)', href: '/docs/observability/tracing' },
      { label: 'Dashboards',     href: '/docs/observability/dashboards' },
      { label: 'Audit Events',   href: '/docs/observability/audit' },
    ],
  },
  {
    section: 'Security',
    items: [
      { label: 'OAuth 2.1 / OIDC',   href: '/docs/security/oauth2' },
      { label: 'MFA',                 href: '/docs/security/mfa' },
      { label: 'RBAC & Roles',        href: '/docs/security/rbac' },
      { label: 'Sessions',            href: '/docs/security/sessions' },
    ],
  },
  {
    section: 'Deployment',
    items: [
      { label: 'Docker Compose', href: '/docs/deployment' },
      { label: 'Kubernetes', href: '/docs/deployment/kubernetes' },
      { label: 'Production Checklist', href: '/docs/deployment/production' },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();
  return (
    <aside
      className="fixed left-0 top-14 bottom-0 w-[260px] overflow-y-auto hidden lg:block border-r border-gray-200 bg-white"
    >
      <nav className="px-4 py-6 space-y-6">
        {nav.map(group => (
          <div key={group.section}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
              {group.section}
            </p>
            <div className="space-y-0.5">
              {group.items.map(item => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-2 py-1.5 rounded-md text-sm transition-colors ${
                      active
                        ? 'font-medium'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    style={active ? { color: '#00B4D8', background: '#00B4D810' } : {}}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
