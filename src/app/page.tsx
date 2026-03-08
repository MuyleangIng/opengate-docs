import Link from 'next/link';
import { Github, ExternalLink, Shield, Globe, Lock, Zap, Key, Users, BarChart2, Layers, ChevronRight, Heart } from 'lucide-react';

const VERSION = 'v1.0.0';

const gettingStarted = [
  { icon: '☕', title: 'OpenJDK / JAR',  href: '/docs/getting-started/installation', desc: 'Run OpenGate directly on any JVM 21+ host.' },
  { icon: '🐳', title: 'Docker',          href: '/docs/getting-started/docker',       desc: 'Get started with OpenGate on Docker in minutes.' },
  { icon: '☸️', title: 'Kubernetes',      href: '/docs/deployment/kubernetes',         desc: 'Deploy OpenGate on Kubernetes with Helm charts.' },
  { icon: '🐙', title: 'Docker Compose',  href: '/docs/deployment',                   desc: 'Run the full stack with a single compose file.' },
  { icon: '🔧', title: 'Spring Boot',     href: '/docs/integration/spring-boot',       desc: 'Protect your Spring Boot app like Keycloak.' },
  { icon: '⚛️', title: 'React / Next.js', href: '/docs/integration/react',             desc: 'Add OAuth2 PKCE login to your React SPA.' },
];

const docSections = [
  {
    title: 'Server', color: '#00B4D8',
    items: [
      { label: 'Configuring OpenGate',          href: '/docs/server/configuration' },
      { label: 'Configuring for production',     href: '/docs/server/production' },
      { label: 'Running in a container',         href: '/docs/server/container' },
      { label: 'Configuring TLS',                href: '/docs/server/tls' },
      { label: 'Configuring a reverse proxy',    href: '/docs/server/reverse-proxy' },
      { label: 'Configuring the database',       href: '/docs/server/database' },
      { label: 'Configuring distributed caches', href: '/docs/server/caching' },
      { label: 'Configuring logging',            href: '/docs/server/logging' },
      { label: 'Importing and exporting realms', href: '/docs/server/import-export' },
    ],
  },
  {
    title: 'Integration', color: '#10b981',
    items: [
      { label: 'Overview',                     href: '/docs/integration' },
      { label: 'React / Next.js (PKCE)',       href: '/docs/integration/react' },
      { label: 'Spring Boot Starter',          href: '/docs/integration/spring-boot' },
      { label: 'Securing with OpenID Connect', href: '/docs/integration/oidc' },
      { label: 'Token exchange',               href: '/docs/integration/token-exchange' },
      { label: 'Client registration',          href: '/docs/integration/client-registration' },
      { label: 'MCP server authorization',     href: '/docs/integration/mcp' },
    ],
  },
  {
    title: 'Observability', color: '#8b5cf6',
    items: [
      { label: 'Health checks',              href: '/docs/observability/health' },
      { label: 'Metrics (Prometheus)',        href: '/docs/observability/metrics' },
      { label: 'Distributed tracing (OTLP)', href: '/docs/observability/tracing' },
      { label: 'Grafana dashboards',          href: '/docs/observability/dashboards' },
      { label: 'Audit event monitoring',      href: '/docs/observability/audit' },
    ],
  },
  {
    title: 'Security', color: '#f59e0b',
    items: [
      { label: 'OAuth 2.1 / OIDC',      href: '/docs/security/oauth2' },
      { label: 'Multi-Factor Auth (MFA)', href: '/docs/security/mfa' },
      { label: 'RBAC & Roles',           href: '/docs/security/rbac' },
      { label: 'Session management',     href: '/docs/security/sessions' },
      { label: 'Trusted certificates',   href: '/docs/security/certificates' },
    ],
  },
  {
    title: 'High Availability', color: '#ef4444',
    items: [
      { label: 'HA overview',                href: '/docs/high-availability' },
      { label: 'Single-cluster deployments', href: '/docs/high-availability/single-cluster' },
      { label: 'Multi-cluster deployments',  href: '/docs/high-availability/multi-cluster' },
      { label: 'Scaling OpenGate',           href: '/docs/high-availability/scaling' },
    ],
  },
  {
    title: 'UI Customization', color: '#06b6d4',
    items: [
      { label: 'Working with themes',      href: '/docs/customization/themes' },
      { label: 'Localization',             href: '/docs/customization/localization' },
      { label: 'Login page customization', href: '/docs/customization/login' },
      { label: 'Email templates',          href: '/docs/customization/emails' },
    ],
  },
];

const features = [
  { icon: Shield,    title: 'OAuth 2.1 / OIDC',       desc: 'Authorization Code + PKCE, Client Credentials, Refresh Token, Device Flow.',        color: '#00B4D8' },
  { icon: Globe,     title: 'Multi-Realm Tenancy',     desc: 'Fully isolated tenants — users, roles, clients, sessions per realm.',                color: '#10b981' },
  { icon: Key,       title: 'MFA & Passwordless',      desc: 'TOTP (Google Authenticator), Email OTP, SMS OTP, and backup codes.',                color: '#8b5cf6' },
  { icon: Users,     title: 'RBAC & Groups',           desc: 'Fine-grained roles, composite roles, groups, and user-role mappings.',               color: '#f59e0b' },
  { icon: Zap,       title: 'Event Streaming',         desc: 'Kafka-powered audit events for every auth event.',                                  color: '#ef4444' },
  { icon: Layers,    title: 'Microservice Native',     desc: '11 independent Spring Boot 3 services — scale each one independently.',              color: '#06b6d4' },
  { icon: BarChart2, title: 'Observability',           desc: 'Prometheus metrics, OpenTelemetry tracing, structured logs, Grafana dashboards.',   color: '#f97316' },
  { icon: Lock,      title: 'Spring Auth Server 1.3',  desc: 'RSA-2048 JWT signing, JWKS endpoint, issuer discovery, and OIDC userinfo.',         color: '#a855f7' },
];

const services = [
  ['opengate-gateway',        '9080', 'API gateway — routing, CORS, rate limiting'],
  ['opengate-auth-service',   '9081', 'OAuth2/OIDC authorization server (Spring Auth Server 1.3)'],
  ['opengate-user-service',   '9082', 'User lifecycle — CRUD, passwords, email verification'],
  ['opengate-realm-service',  '9083', 'Multi-tenant realm configuration'],
  ['opengate-rbac-service',   '9084', 'Roles, composite roles, groups, policy evaluation'],
  ['opengate-client-service', '9085', 'OAuth2 client registry — secrets, redirect URIs'],
  ['opengate-mfa-service',    '9086', 'TOTP, email/SMS OTP, backup codes'],
  ['opengate-session-service','9087', 'Redis-backed sessions, revocation, device tracking'],
  ['opengate-notification',   '9088', 'Email templates via Kafka events + SMTP'],
  ['opengate-admin-api',      '9089', 'Aggregated admin REST API (WebFlux)'],
  ['opengate-sample-app',     '8090', 'Demo REST API protected by OpenGate'],
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0D1B2A]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#00B4D8' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <span className="font-bold text-white text-sm">OpenGate IAM</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full font-mono text-[#00B4D8] border border-[#00B4D8]/30 bg-[#00B4D8]/10 ml-1">{VERSION}</span>
          </div>
          <div className="flex items-center gap-5">
            {[['Docs', '/docs/getting-started'], ['API', '/docs/api'], ['Integration', '/docs/integration']].map(([l, h]) => (
              <Link key={h} href={h} className="text-sm text-white/60 hover:text-white transition-colors hidden md:block">{l}</Link>
            ))}
            <a href="https://github.com/opengate-iam/opengate" className="text-white/50 hover:text-white transition-colors">
              <Github size={18} />
            </a>
            <Link href="/docs/getting-started"
              className="text-sm font-medium text-white px-3.5 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
              style={{ background: '#00B4D8' }}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-14" style={{ background: 'linear-gradient(160deg, #0D1B2A 0%, #0f2744 50%, #0D1B2A 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00B4D8]/30 bg-[#00B4D8]/10 text-[#00B4D8] text-xs font-mono mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8] animate-pulse" />
            {VERSION} · Open Source · MIT License
          </div>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6"
            style={{ background: 'linear-gradient(135deg, #00B4D8, #0077a8)' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Open-Source<br />
            <span style={{ color: '#00B4D8' }}>Identity & Access Management</span>
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Self-hosted IAM built with Spring Boot 3 microservices. OAuth 2.1, OIDC, PKCE, MFA, RBAC, and multi-realm tenancy — the Keycloak alternative you own completely.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <Link href="/docs/getting-started"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm shadow-lg hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #00B4D8, #0077a8)' }}>
              Read the Docs <ChevronRight size={16} />
            </Link>
            <Link href="/docs/getting-started/quick-start"
              className="px-6 py-3 rounded-xl text-white/80 font-medium text-sm border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all">
              Quick Start →
            </Link>
            <a href="https://github.com/opengate-iam/opengate" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white/60 font-medium text-sm border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all">
              <Github size={15} /> GitHub
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {['Spring Boot 3.3', 'Spring Auth Server 1.3', 'Java 21', 'Next.js 14', 'PostgreSQL 16', 'Redis 7', 'Kafka', 'OAuth 2.1', 'PKCE', 'OIDC'].map(t => (
              <span key={t} className="px-3 py-1 rounded-full text-xs text-white/40 border border-white/10 bg-white/5">{t}</span>
            ))}
          </div>
        </div>
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40 C360 0 1080 0 1440 40 L1440 40 L0 40Z" fill="white"/>
        </svg>
      </section>

      {/* Getting Started */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Getting Started</h2>
          <p className="text-gray-500 text-center mb-12">Choose your deployment target and have OpenGate running in minutes.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gettingStarted.map(({ icon, title, href, desc }) => (
              <Link key={title} href={href}
                className="group flex items-start gap-4 p-5 rounded-2xl border border-gray-200 hover:border-cyan-400 hover:shadow-md transition-all bg-white">
                <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors flex items-center gap-1">
                    {title} <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Everything you need for IAM</h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">Enterprise-grade identity management as 11 independent microservices.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: color + '15' }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <p className="font-semibold text-gray-900 text-sm mb-1">{title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doc sections */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Documentation</h2>
          <p className="text-gray-500 text-center mb-12">Everything you need to deploy, configure, and integrate OpenGate IAM.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docSections.map(({ title, color, items }) => (
              <div key={title} className="rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 font-bold text-sm flex items-center gap-2" style={{ background: color + '12', color }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  {title}
                </div>
                <ul className="divide-y divide-gray-50">
                  {items.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href}
                        className="flex items-center justify-between px-5 py-2.5 text-sm text-gray-600 hover:text-cyan-600 hover:bg-gray-50 transition-colors group">
                        {label}
                        <ChevronRight size={13} className="text-gray-300 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services table */}
      <section className="py-20" style={{ background: '#0D1B2A' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">11 Microservices</h2>
          <p className="text-white/40 text-center mb-10">Each service is independently deployable and scalable.</p>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-5 py-3 text-white/50 font-medium text-xs">Service</th>
                  <th className="text-left px-5 py-3 text-white/50 font-medium text-xs">Port</th>
                  <th className="text-left px-5 py-3 text-white/50 font-medium text-xs hidden md:table-cell">Responsibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {services.map(([name, port, desc]) => (
                  <tr key={name} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3 font-mono text-[#00B4D8] text-xs">{name}</td>
                    <td className="px-5 py-3 font-mono text-white/40 text-xs">{port}</td>
                    <td className="px-5 py-3 text-white/30 hidden md:table-cell text-xs">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Quick install */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Up and running in 60 seconds</h2>
          <p className="text-gray-500 mb-8">Run the complete OpenGate stack with Docker Compose.</p>
          <div className="rounded-2xl overflow-hidden border border-gray-200 text-left">
            <div className="bg-gray-800 px-4 py-2.5 flex items-center gap-2 border-b border-gray-700">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-gray-400 text-xs ml-2 font-mono">Terminal</span>
            </div>
            <pre className="bg-gray-900 p-6 text-sm overflow-x-auto m-0 border-0">
              <code className="text-gray-300 font-mono leading-relaxed">{
`# Clone the repository
git clone https://github.com/opengate-iam/opengate.git
cd opengate

# Start the full stack (PostgreSQL, Redis, Kafka, all services)
docker compose up -d

# Admin Console  →  http://localhost:3002
# Sample App     →  http://localhost:3003
# Docs           →  http://localhost:3001`
              }</code>
            </pre>
          </div>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <Link href="/docs/getting-started/quick-start"
              className="text-sm font-medium px-5 py-2.5 rounded-xl text-white hover:opacity-90 transition-opacity"
              style={{ background: '#00B4D8' }}>
              Full Quick Start Guide →
            </Link>
            <Link href="/docs/deployment"
              className="text-sm font-medium px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors">
              Docker Compose Docs
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0D1B2A' }} className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#00B4D8' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <span className="font-bold text-white text-sm">OpenGate IAM</span>
              </div>
              <p className="text-white/30 text-xs leading-relaxed mb-3">Open-source self-hosted IAM for the modern cloud.</p>
              <span className="text-xs px-2 py-1 rounded-full font-mono border border-[#00B4D8]/30 text-[#00B4D8]">{VERSION}</span>
            </div>
            <div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-4">Documentation</p>
              <ul className="space-y-2">
                {[['Getting Started','/docs/getting-started'],['Quick Start','/docs/getting-started/quick-start'],['Integration','/docs/integration'],['API Reference','/docs/api'],['Deployment','/docs/deployment']].map(([l,h]) => (
                  <li key={h}><Link href={h} className="text-white/40 hover:text-white/80 text-xs transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-4">Resources</p>
              <ul className="space-y-2">
                {[['Admin Console','http://localhost:3002'],['Sample App','http://localhost:3003'],['API Gateway','http://localhost:9080'],['Auth Service','http://localhost:9081']].map(([l,h]) => (
                  <li key={h}><a href={h} className="text-white/40 hover:text-white/80 text-xs transition-colors flex items-center gap-1">{l} <ExternalLink size={9} /></a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-4">Author</p>
              <p className="text-white/80 text-sm font-semibold mb-0.5">Ing Muyleang</p>
              <p className="text-white/30 text-xs mb-4">Full-Stack Engineer · KhmerStack</p>
              <div className="space-y-2">
                <a href="https://muyleanging.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#00B4D8]/70 hover:text-[#00B4D8] transition-colors">
                  <ExternalLink size={10} /> muyleanging.com
                </a>
                <a href="https://khmerstack.muyleanging.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#00B4D8]/70 hover:text-[#00B4D8] transition-colors">
                  <ExternalLink size={10} /> khmerstack.muyleanging.com
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/25 text-xs">© 2026 OpenGate IAM · Released under the MIT License</p>
            <p className="flex items-center gap-1.5 text-white/25 text-xs">
              Made with <Heart size={11} className="text-red-400 fill-red-400" /> by{' '}
              <a href="https://muyleanging.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors font-medium">Ing Muyleang</a>
              {' · '}
              <a href="https://khmerstack.muyleanging.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors font-medium">KhmerStack</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
