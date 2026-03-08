import Link from 'next/link';
import {
  Github, ExternalLink, Shield, Globe, Lock, Zap, Key, Users,
  BarChart2, Layers, ChevronRight, Heart, GitPullRequest, Bug,
  Star, BookOpen, Terminal, ArrowRight,
} from 'lucide-react';

const VERSION = 'v1.0.0';

const gettingStarted = [
  { icon: '☕', title: 'OpenJDK / JAR',  href: '/docs/getting-started/installation', desc: 'Run directly on any JVM 21+ host.' },
  { icon: '🐳', title: 'Docker',          href: '/docs/getting-started/docker',       desc: 'Get started in minutes with Docker.' },
  { icon: '☸️',  title: 'Kubernetes',      href: '/docs/deployment/kubernetes',         desc: 'Deploy with Helm charts on Kubernetes.' },
  { icon: '🐙', title: 'Docker Compose',  href: '/docs/deployment',                   desc: 'Full stack with one compose file.' },
  { icon: '🔧', title: 'Spring Boot',     href: '/docs/integration/spring-boot',       desc: 'Protect Spring Boot apps like Keycloak.' },
  { icon: '⚛️',  title: 'React / Next.js', href: '/docs/integration/react',             desc: 'Add PKCE login to your React SPA.' },
];

const features = [
  { icon: Shield,    title: 'OAuth 2.1 / OIDC',      desc: 'Authorization Code + PKCE, Client Credentials, Refresh Token, Device Flow.',          color: '#00B4D8' },
  { icon: Globe,     title: 'Multi-Realm Tenancy',    desc: 'Fully isolated tenants — users, roles, clients, and sessions per realm.',              color: '#10b981' },
  { icon: Key,       title: 'MFA & Passwordless',     desc: 'TOTP (Google Authenticator), Email OTP, SMS OTP, backup codes.',                       color: '#8b5cf6' },
  { icon: Users,     title: 'RBAC & Groups',          desc: 'Fine-grained roles, composite roles, groups, and user-role mappings.',                  color: '#f59e0b' },
  { icon: Zap,       title: 'Event Streaming',        desc: 'Kafka-powered audit events and notifications for every authentication action.',         color: '#ef4444' },
  { icon: Layers,    title: 'Microservice Native',    desc: '11 independent Spring Boot 3 services — scale each component separately.',             color: '#06b6d4' },
  { icon: BarChart2, title: 'Full Observability',     desc: 'Prometheus metrics, OpenTelemetry tracing, structured JSON logs, Grafana dashboards.', color: '#f97316' },
  { icon: Lock,      title: 'Spring Auth Server 1.3', desc: 'RSA-2048 JWT signing, JWKS endpoint, issuer discovery, OIDC userinfo endpoint.',       color: '#a855f7' },
];

const docSections = [
  {
    title: 'Server', color: '#00B4D8', icon: '🖥️',
    items: [
      { label: 'Configuring OpenGate',           href: '/docs/server/configuration' },
      { label: 'Configuring for production',      href: '/docs/server/production' },
      { label: 'Running in a container',          href: '/docs/server/container' },
      { label: 'Configuring TLS',                 href: '/docs/server/tls' },
      { label: 'Configuring a reverse proxy',     href: '/docs/server/reverse-proxy' },
      { label: 'Configuring the database',        href: '/docs/server/database' },
      { label: 'Configuring distributed caches',  href: '/docs/server/caching' },
      { label: 'Importing and exporting realms',  href: '/docs/server/import-export' },
    ],
  },
  {
    title: 'Integration', color: '#10b981', icon: '🔗',
    items: [
      { label: 'Overview',                      href: '/docs/integration' },
      { label: 'React / Next.js (PKCE)',        href: '/docs/integration/react' },
      { label: 'Spring Boot Starter',           href: '/docs/integration/spring-boot' },
      { label: 'Securing with OpenID Connect',  href: '/docs/integration/oidc' },
      { label: 'Token exchange',                href: '/docs/integration/token-exchange' },
      { label: 'Client registration',           href: '/docs/integration/client-registration' },
    ],
  },
  {
    title: 'Observability', color: '#8b5cf6', icon: '📊',
    items: [
      { label: 'Health checks',               href: '/docs/observability/health' },
      { label: 'Metrics (Prometheus)',         href: '/docs/observability/metrics' },
      { label: 'Distributed tracing (OTLP)',  href: '/docs/observability/tracing' },
      { label: 'Grafana dashboards',           href: '/docs/observability/dashboards' },
      { label: 'Audit event monitoring',       href: '/docs/observability/audit' },
    ],
  },
  {
    title: 'Security', color: '#f59e0b', icon: '🔒',
    items: [
      { label: 'OAuth 2.1 / OIDC',       href: '/docs/security/oauth2' },
      { label: 'Multi-Factor Auth (MFA)', href: '/docs/security/mfa' },
      { label: 'RBAC & Roles',            href: '/docs/security/rbac' },
      { label: 'Session management',      href: '/docs/security/sessions' },
    ],
  },
  {
    title: 'Architecture', color: '#ef4444', icon: '🏗️',
    items: [
      { label: 'Overview',      href: '/docs/architecture' },
      { label: 'Microservices', href: '/docs/architecture/microservices' },
      { label: 'Auth Flow',     href: '/docs/architecture/auth-flow' },
      { label: 'Data Model',    href: '/docs/architecture/data-model' },
    ],
  },
  {
    title: 'Deployment', color: '#06b6d4', icon: '🚀',
    items: [
      { label: 'Docker Compose',       href: '/docs/deployment' },
      { label: 'Kubernetes',           href: '/docs/deployment/kubernetes' },
      { label: 'Production Checklist', href: '/docs/deployment/production' },
    ],
  },
];

const services = [
  { name: 'opengate-gateway',         port: '9080', desc: 'API gateway — routing, CORS, rate limiting',                         color: '#00B4D8' },
  { name: 'opengate-auth-service',    port: '9081', desc: 'OAuth2/OIDC authorization server (Spring Auth Server 1.3)',           color: '#8b5cf6' },
  { name: 'opengate-user-service',    port: '9082', desc: 'User lifecycle — CRUD, passwords, email verification',                color: '#10b981' },
  { name: 'opengate-realm-service',   port: '9083', desc: 'Multi-tenant realm configuration and management',                     color: '#f59e0b' },
  { name: 'opengate-rbac-service',    port: '9084', desc: 'Roles, composite roles, groups, and policy evaluation',               color: '#ef4444' },
  { name: 'opengate-client-service',  port: '9085', desc: 'OAuth2 client registry — secrets, redirect URIs, PKCE settings',     color: '#f97316' },
  { name: 'opengate-mfa-service',     port: '9086', desc: 'TOTP, email/SMS OTP, backup codes, and MFA enrollment',              color: '#06b6d4' },
  { name: 'opengate-session-service', port: '9087', desc: 'Redis-backed sessions, revocation, and device tracking',              color: '#a855f7' },
  { name: 'opengate-notification',    port: '9088', desc: 'Email templates via Kafka events and SMTP delivery',                  color: '#ec4899' },
  { name: 'opengate-admin-api',       port: '9089', desc: 'Aggregated admin REST API (WebFlux reactive)',                        color: '#14b8a6' },
  { name: 'opengate-sample-app',      port: '8090', desc: 'Demo REST API protected by OpenGate (reference integration)',         color: '#84cc16' },
];

const techStack = [
  'Spring Boot 3.3', 'Spring Auth Server 1.3', 'Java 21',
  'Next.js 14', 'TypeScript', 'PostgreSQL 16', 'Redis 7',
  'Kafka', 'OAuth 2.1', 'PKCE', 'OIDC', 'JWT / RSA-2048',
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0D1B2A]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#00B4D8' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <span className="font-bold text-white text-sm tracking-tight">OpenGate IAM</span>
            <span className="text-[11px] px-1.5 py-0.5 rounded-full font-mono text-[#00B4D8] border border-[#00B4D8]/30 bg-[#00B4D8]/10 ml-1">{VERSION}</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {[['Docs', '/docs/getting-started'], ['API', '/docs/api'], ['Architecture', '/docs/architecture'], ['About', '/about'], ['Changelog', '/changelog']].map(([l, h]) => (
              <Link key={h} href={h} className="text-sm text-white/60 hover:text-white transition-colors">{l}</Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="https://github.com/MuyleangIng/opengate-iam" target="_blank" rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors">
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

      {/* ── Hero ── */}
      <section className="pt-14 relative overflow-hidden mesh-bg">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 py-28 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00B4D8]/30 bg-[#00B4D8]/10 text-[#00B4D8] text-xs font-mono mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8] animate-pulse" />
            {VERSION} · Open Source · MIT License
            <span className="border-l border-[#00B4D8]/30 pl-2 ml-1 text-[#00B4D8]/70">Spring Boot 3 · Java 21</span>
          </div>

          {/* Shield icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-8 animate-float glow-cyan"
            style={{ background: 'linear-gradient(135deg, #00B4D8, #0077a8)' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-5 leading-[1.1] tracking-tight">
            Open-Source<br />
            <span className="bg-gradient-to-r from-[#00B4D8] to-[#7dd3fc] bg-clip-text text-transparent">
              Identity & Access
            </span>
            <br />Management
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Self-hosted IAM built with <strong className="text-white/70">Spring Boot 3 microservices</strong>.
            OAuth 2.1, OIDC, PKCE, MFA, RBAC, and multi-realm tenancy —
            the Keycloak alternative you own completely.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
            <Link href="/docs/getting-started"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:opacity-95 transition-all"
              style={{ background: 'linear-gradient(135deg, #00B4D8, #0077a8)' }}>
              <BookOpen size={16} /> Read the Docs
            </Link>
            <Link href="/docs/getting-started/quick-start"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white/80 font-medium text-sm border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all">
              <Terminal size={16} /> Quick Start
            </Link>
            <a href="https://github.com/MuyleangIng/opengate-iam" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white/60 font-medium text-sm border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all">
              <Github size={15} /> GitHub
            </a>
          </div>

          {/* Tech pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map(t => (
              <span key={t} className="px-3 py-1 rounded-full text-xs text-white/40 border border-white/10 bg-white/5 font-mono">{t}</span>
            ))}
          </div>
        </div>

        {/* Wave divider */}
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block -mb-1">
          <path d="M0 48 C480 0 960 0 1440 48 L1440 48 L0 48Z" fill="white"/>
        </svg>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '11', label: 'Microservices' },
              { value: 'OAuth 2.1', label: 'Standard' },
              { value: 'MIT', label: 'License' },
              { value: 'Java 21', label: 'Runtime' },
            ].map(s => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Getting Started ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs text-cyan-600 font-semibold uppercase tracking-widest mb-3">Deploy anywhere</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Getting Started</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Choose your deployment target and have OpenGate running in minutes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gettingStarted.map(({ icon, title, href, desc }) => (
              <Link key={title} href={href}
                className="group flex items-start gap-4 p-5 rounded-2xl border border-gray-200 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-50 transition-all bg-white">
                <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors flex items-center gap-1 text-sm">
                    {title}
                    <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture section ── */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs text-purple-600 font-semibold uppercase tracking-widest mb-3">System design</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Architecture Overview</h2>
            <p className="text-gray-500 max-w-xl mx-auto">11 independently deployable Spring Boot 3 microservices behind a unified API gateway.</p>
          </div>

          {/* Architecture diagram (ASCII art in code block style) */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 mb-8">
            <div className="bg-gray-800 px-4 py-2.5 flex items-center gap-2 border-b border-gray-700">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-gray-400 text-xs font-mono ml-2">OpenGate IAM — Architecture</span>
            </div>
            <pre className="bg-gray-900 p-6 text-xs overflow-x-auto m-0 border-0 leading-relaxed">
              <code className="text-gray-300 font-mono">{`
  Browser / Mobile / CLI
         │
         ▼
  ┌─────────────────────────────────────────────────┐
  │            opengate-gateway  :9080              │
  │   (API routing · CORS · rate limiting)          │
  └──────────────┬──────────────────────────────────┘
                 │  routes by path prefix
       ┌─────────┼──────────────────────────────┐
       │         │            │                  │
       ▼         ▼            ▼                  ▼
  auth-svc   user-svc    realm-svc          admin-api
   :9081      :9082        :9083              :9089
  (OAuth2    (CRUD,       (multi-            (aggregated
   OIDC)     passwords)   tenant)            REST API)
       │
  ┌────┴──────────────────────────────────────┐
  │ rbac-svc  client-svc  mfa-svc  session-svc│
  │  :9084      :9085      :9086    :9087      │
  └────────────────────────────────────────────┘
                 │
  notification-svc :9088
  (Kafka → SMTP)
                 │
  ┌─────────────────────────────────────────────────┐
  │  PostgreSQL  ·  Redis  ·  Apache Kafka          │
  └─────────────────────────────────────────────────┘
`}</code>
            </pre>
          </div>

          <div className="text-center">
            <Link href="/docs/architecture"
              className="inline-flex items-center gap-2 text-sm text-cyan-600 font-medium hover:text-cyan-700 transition-colors">
              View full architecture docs <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs text-green-600 font-semibold uppercase tracking-widest mb-3">Everything you need</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Enterprise-grade IAM</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Identity management as 11 independent microservices. Own your auth, own your data.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ background: color + '15' }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <p className="font-semibold text-gray-900 text-sm mb-1.5">{title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick install ── */}
      <section className="py-24 mesh-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs text-cyan-400 font-semibold uppercase tracking-widest mb-3">60-second setup</p>
          <h2 className="text-4xl font-bold text-white mb-3">Up and running fast</h2>
          <p className="text-white/50 mb-10">Run the complete OpenGate stack with Docker Compose.</p>
          <div className="rounded-2xl overflow-hidden border border-white/10 text-left mb-8">
            <div className="bg-white/5 px-4 py-2.5 flex items-center gap-2 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-white/40 text-xs font-mono ml-2">Terminal</span>
            </div>
            <pre className="bg-[#0a1628] p-6 text-sm overflow-x-auto m-0 border-0">
              <code className="text-gray-300 font-mono leading-relaxed">{
`# Clone the repository
git clone https://github.com/MuyleangIng/opengate-iam.git
cd opengate-iam

# Start the full stack
# (PostgreSQL, Redis, Kafka, all 11 services)
docker compose up -d

# Admin Console  →  http://localhost:3002
# Sample App     →  http://localhost:3003
# Docs           →  http://localhost:3001
# Auth Endpoint  →  http://localhost:9080`
              }</code>
            </pre>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/docs/getting-started/quick-start"
              className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-xl text-white hover:opacity-90 transition-opacity"
              style={{ background: '#00B4D8' }}>
              Full Quick Start Guide <ArrowRight size={14} />
            </Link>
            <Link href="/docs/deployment"
              className="text-sm font-medium px-6 py-3 rounded-xl border border-white/20 text-white/70 hover:bg-white/5 transition-colors">
              Docker Compose Docs
            </Link>
          </div>
        </div>
      </section>

      {/* ── Documentation sections ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs text-blue-600 font-semibold uppercase tracking-widest mb-3">Reference</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Documentation</h2>
            <p className="text-gray-500">Everything to deploy, configure, secure, and integrate OpenGate IAM.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {docSections.map(({ title, color, icon, items }) => (
              <div key={title} className="rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-md transition-all">
                <div className="px-5 py-4 flex items-center gap-2.5" style={{ background: color + '0F' }}>
                  <span className="text-lg">{icon}</span>
                  <span className="font-bold text-sm" style={{ color }}>{title}</span>
                </div>
                <ul className="divide-y divide-gray-50">
                  {items.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href}
                        className="flex items-center justify-between px-5 py-2.5 text-sm text-gray-600 hover:text-cyan-600 hover:bg-gray-50 transition-colors group">
                        {label}
                        <ChevronRight size={13} className="text-gray-300 group-hover:text-cyan-400 flex-shrink-0 transition-colors" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services table ── */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs text-cyan-600 font-semibold uppercase tracking-widest mb-3">Microservices</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">11 Independent Services</h2>
            <p className="text-gray-500">Each service is independently deployable, scalable, and observable.</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="text-left px-5 py-3 text-gray-400 font-medium text-xs">Service</th>
                  <th className="text-left px-5 py-3 text-gray-400 font-medium text-xs">Port</th>
                  <th className="text-left px-5 py-3 text-gray-400 font-medium text-xs hidden md:table-cell">Responsibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {services.map(({ name, port, desc, color }) => (
                  <tr key={name} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                        <span className="font-mono text-xs text-gray-800">{name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-gray-400">:{port}</td>
                    <td className="px-5 py-3 text-xs text-gray-500 hidden md:table-cell">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Open Source section ── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs text-amber-600 font-semibold uppercase tracking-widest mb-3">Community</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Open Source & Community</h2>
            <p className="text-gray-500 max-w-lg mx-auto">OpenGate is fully open source. Join the community, report issues, submit PRs, and shape the future of the project.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <a href="https://github.com/MuyleangIng/opengate-iam/issues/new?template=bug_report.md"
              target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center text-center p-8 rounded-2xl border border-gray-200 hover:border-red-200 hover:bg-red-50/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bug size={22} className="text-red-500" />
              </div>
              <p className="font-semibold text-gray-900 mb-1.5">Report a Bug</p>
              <p className="text-xs text-gray-500 leading-relaxed">Found something broken? Open an issue and help us improve.</p>
              <span className="mt-4 text-xs text-red-600 font-medium group-hover:underline">Open Issue →</span>
            </a>

            <a href="https://github.com/MuyleangIng/opengate-iam/pulls"
              target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center text-center p-8 rounded-2xl border border-gray-200 hover:border-green-200 hover:bg-green-50/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GitPullRequest size={22} className="text-green-500" />
              </div>
              <p className="font-semibold text-gray-900 mb-1.5">Submit a PR</p>
              <p className="text-xs text-gray-500 leading-relaxed">Contributions are welcome. Read the contributing guide to get started.</p>
              <span className="mt-4 text-xs text-green-600 font-medium group-hover:underline">Contribute →</span>
            </a>

            <a href="https://github.com/MuyleangIng/opengate-iam"
              target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center text-center p-8 rounded-2xl border border-gray-200 hover:border-amber-200 hover:bg-amber-50/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Star size={22} className="text-amber-500" />
              </div>
              <p className="font-semibold text-gray-900 mb-1.5">Star on GitHub</p>
              <p className="text-xs text-gray-500 leading-relaxed">Show your support by starring the repository on GitHub.</p>
              <span className="mt-4 text-xs text-amber-600 font-medium group-hover:underline">Star ★ →</span>
            </a>
          </div>

          {/* Sponsor CTA */}
          <div className="rounded-2xl border border-rose-100 bg-gradient-to-r from-rose-50 to-pink-50 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-bold text-gray-900 text-lg mb-1.5 flex items-center gap-2">
                <Heart size={18} className="text-rose-500 fill-rose-500" /> Sponsor this project
              </p>
              <p className="text-sm text-gray-600 max-w-md">
                OpenGate IAM is built and maintained by a solo developer. Your sponsorship keeps the project alive,
                funds new features, and supports the open-source ecosystem.
              </p>
            </div>
            <a href="https://github.com/sponsors/MuyleangIng"
              target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-rose-200"
              style={{ background: 'linear-gradient(135deg, #f43f5e, #e11d48)' }}>
              <Heart size={15} className="fill-white" />
              Become a Sponsor
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: '#0D1B2A' }} className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            {/* Brand */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#00B4D8' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <span className="font-bold text-white">OpenGate IAM</span>
                <span className="text-xs px-1.5 py-0.5 rounded-full font-mono text-[#00B4D8] border border-[#00B4D8]/30 bg-[#00B4D8]/10">{VERSION}</span>
              </div>
              <p className="text-white/30 text-xs leading-relaxed mb-5 max-w-xs">
                Open-source self-hosted Identity & Access Management for the modern cloud-native stack.
                MIT Licensed. Built with Spring Boot 3 + Java 21.
              </p>
              <div className="flex gap-3">
                <a href="https://github.com/MuyleangIng/opengate-iam" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors">
                  <Github size={14} />
                </a>
              </div>
            </div>

            {/* Docs */}
            <div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-4">Docs</p>
              <ul className="space-y-2.5">
                {[['Getting Started','/docs/getting-started'],['Quick Start','/docs/getting-started/quick-start'],['Configuration','/docs/server/configuration'],['Integration','/docs/integration'],['API Reference','/docs/api']].map(([l,h]) => (
                  <li key={h}><Link href={h} className="text-white/40 hover:text-white/80 text-xs transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>

            {/* Project */}
            <div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-4">Project</p>
              <ul className="space-y-2.5">
                {[['About','/about'],['Changelog','/changelog'],['Architecture','/docs/architecture'],['GitHub Issues','https://github.com/MuyleangIng/opengate-iam/issues'],['Become a Sponsor','https://github.com/sponsors/MuyleangIng']].map(([l,h]) => (
                  <li key={h}>
                    {h.startsWith('http') ? (
                      <a href={h} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/80 text-xs transition-colors flex items-center gap-1">
                        {l} <ExternalLink size={9} />
                      </a>
                    ) : (
                      <Link href={h} className="text-white/40 hover:text-white/80 text-xs transition-colors">{l}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Author */}
            <div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-4">Author</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  M
                </div>
                <div>
                  <p className="text-white/80 text-sm font-semibold">Ing Muyleang</p>
                  <p className="text-white/30 text-xs">Full-Stack Engineer</p>
                </div>
              </div>
              <ul className="space-y-2.5">
                <li>
                  <a href="https://muyleanging.com" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-cyan-400/70 hover:text-cyan-400 transition-colors">
                    <ExternalLink size={10} /> muyleanging.com
                  </a>
                </li>
                <li>
                  <a href="https://khmerstack.muyleanging.com" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-cyan-400/70 hover:text-cyan-400 transition-colors">
                    <ExternalLink size={10} /> khmerstack.muyleanging.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/25 text-xs">© 2026 OpenGate IAM · Released under the MIT License</p>
            <p className="flex items-center gap-1.5 text-white/25 text-xs">
              Made with <Heart size={11} className="text-rose-400 fill-rose-400" /> by{' '}
              <a href="https://muyleanging.com" target="_blank" rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors font-medium">Ing Muyleang</a>
              {' · '}
              <a href="https://khmerstack.muyleanging.com" target="_blank" rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors font-medium">KhmerStack</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
