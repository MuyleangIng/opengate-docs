'use client';

const SERVICES = [
  { label: 'auth',   title: 'Auth',   port: ':8081' },
  { label: 'user',   title: 'User',   port: ':8082' },
  { label: 'realm',  title: 'Realm',  port: ':8083' },
  { label: 'rbac',   title: 'RBAC',   port: ':8084' },
  { label: 'client', title: 'Client', port: ':8085' },
  { label: 'mfa',    title: 'MFA',    port: ':8086' },
];

const TOPICS = [
  'user.created',
  'auth.login.success',
  'auth.login.failure',
  'auth.logout',
  'session.terminated',
  'mfa.otp_sent',
];

const PANELS = [
  {
    title: 'Design Principles',
    dotColor: 'bg-indigo-500',
    rows: [
      ['Isolation',    'DB per Service'],
      ['Entry',        'Single Gateway'],
      ['Services',     'Stateless'],
      ['Consistency',  'Eventual (Kafka)'],
      ['Tenancy',      'Multi (Realms)'],
    ],
  },
  {
    title: 'State Distribution',
    dotColor: 'bg-emerald-500',
    rows: [
      ['PostgreSQL', 'Entities'],
      ['Redis',      'Sessions · OTPs'],
      ['Redis',      'Rate Counters'],
      ['Redis',      'Token Blacklist'],
      ['Kafka',      'Audit Trail'],
    ],
  },
  {
    title: 'Security Model',
    dotColor: 'bg-amber-500',
    rows: [
      ['Gateway',     'JWT Validation'],
      ['Services',    'permitAll'],
      ['Realm scope', 'JWT claim'],
      ['DB queries',  'realm_name pred'],
      ['Auth Redis',  'TTL codes/tokens'],
    ],
  },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2 w-full max-w-3xl my-1">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <span className="text-[9px] font-mono text-slate-400 tracking-widest uppercase">{children}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  );
}

function Wire({ color = 'bg-indigo-300' }: { color?: string }) {
  return <div className={`w-0.5 h-7 ${color} opacity-60`} />;
}

function ArrowHead({ color = 'border-t-indigo-300' }: { color?: string }) {
  return (
    <div
      className={`w-0 h-0 border-l-[5px] border-r-[5px] border-t-[7px] border-l-transparent border-r-transparent ${color} opacity-60 -mt-px`}
    />
  );
}

export default function ArchitectureDiagram() {
  return (
    <div className="relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">

      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Header */}
      <div className="relative z-10 text-center pt-12 pb-8 px-5">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-full px-4 py-1.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[10px] text-indigo-600 tracking-widest uppercase">Live System · Microservices</span>
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">OpenGate IAM</h2>
        <p className="font-mono text-xs text-slate-400 tracking-wide">Architecture Overview · True Microservices · Event-Driven</p>
      </div>

      {/* Diagram */}
      <div className="relative z-10 flex flex-col items-center pb-16 px-6">

        {/* CLIENT */}
        <SectionLabel>Client Layer</SectionLabel>
        <div className="w-full max-w-lg">
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-center hover:-translate-y-0.5 hover:shadow-md transition-all">
            <div className="text-[9px] font-mono text-violet-400 uppercase tracking-widest mb-1">Client Applications</div>
            <div className="text-sm font-bold text-violet-700">Browser · Mobile · Backend</div>
            <div className="flex flex-wrap gap-1.5 justify-center mt-3">
              {['SPA', 'Native App', 'Server-Side', 'HTTPS :443'].map(c => (
                <span key={c} className="text-[9px] font-mono px-2 py-0.5 rounded bg-violet-100 border border-violet-200 text-violet-600">{c}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Wire 1 */}
        <div className="flex flex-col items-center">
          <Wire color="bg-violet-400" />
          <span className="font-mono text-[9px] text-violet-400 my-0.5">HTTPS :443</span>
          <ArrowHead color="border-t-violet-300" />
        </div>

        {/* PROXY */}
        <div className="w-full max-w-lg">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center hover:-translate-y-0.5 hover:shadow-md transition-all relative">
            <span className="absolute -top-2.5 right-3 text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-600 uppercase tracking-wider">Proxy / CDN</span>
            <div className="text-[9px] font-mono text-amber-500 uppercase tracking-widest mb-1">Reverse Proxy</div>
            <div className="text-sm font-bold text-amber-700">Nginx · Traefik · ALB</div>
            <div className="flex flex-wrap gap-1.5 justify-center mt-3">
              {['SSL Termination', 'Load Balancing', 'CDN'].map(c => (
                <span key={c} className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-100 border border-amber-200 text-amber-600">{c}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Wire 2 */}
        <div className="flex flex-col items-center">
          <Wire color="bg-amber-400" />
          <span className="font-mono text-[9px] text-amber-400 my-0.5">HTTP :8080</span>
          <ArrowHead color="border-t-amber-300" />
        </div>

        {/* GATEWAY */}
        <SectionLabel>API Gateway</SectionLabel>
        <div className="w-full max-w-3xl">
          <div className="bg-indigo-50 border-2 border-indigo-300 rounded-xl p-4 hover:-translate-y-0.5 hover:shadow-md transition-all relative">
            <span className="absolute -top-2.5 right-3 text-[9px] font-mono px-2 py-0.5 rounded-full bg-indigo-100 border border-indigo-300 text-indigo-600 uppercase tracking-wider">Spring Cloud Gateway · :8080</span>
            <div className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest mb-1">opengate-gateway</div>
            <div className="text-sm font-bold text-indigo-700">Single Entry Point · JWT Validation · CORS · Rate Limiting</div>
            <div className="flex gap-2 mt-3">
              {['CORS', 'Routing', 'Rate Limiting', 'Request Log', 'OAuth2 RS'].map(p => (
                <div key={p} className="flex-1 text-center text-[9px] font-mono py-1.5 rounded bg-white border border-indigo-200 text-indigo-500 hover:border-indigo-400 hover:text-indigo-700 transition-colors">{p}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Fan SVG */}
        <div className="w-full max-w-3xl h-10">
          <svg width="100%" height="40" viewBox="0 0 860 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="arr1" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 Z" fill="rgba(5,150,105,0.5)" />
              </marker>
            </defs>
            {[72, 215, 358, 501, 644, 787].map(x => (
              <line key={x} x1="430" y1="0" x2={x} y2="38"
                stroke="rgba(5,150,105,0.4)" strokeWidth="1.5"
                strokeDasharray="6 3" markerEnd="url(#arr1)" />
            ))}
          </svg>
        </div>

        {/* SERVICES */}
        <SectionLabel>Microservices</SectionLabel>
        <div className="grid grid-cols-6 gap-2 w-full max-w-3xl">
          {SERVICES.map(s => (
            <div key={s.label} className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md transition-all">
              <div className="text-[9px] font-mono text-emerald-400 uppercase tracking-wide mb-1">{s.label}</div>
              <div className="text-xs font-bold text-emerald-700">{s.title}</div>
              <div className="text-[9px] font-mono text-emerald-500 mt-0.5">{s.port}</div>
            </div>
          ))}
        </div>

        {/* Wire → data */}
        <div className="flex flex-col items-center">
          <Wire color="bg-emerald-400" />
          <ArrowHead color="border-t-emerald-300" />
        </div>

        {/* DATA LAYER */}
        <SectionLabel>Persistence Layer</SectionLabel>
        <div className="grid grid-cols-3 gap-3 w-full max-w-lg">
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 hover:-translate-y-0.5 hover:shadow-md transition-all">
            <div className="text-[9px] font-mono text-indigo-400 uppercase tracking-wide mb-1">Cache</div>
            <div className="text-sm font-bold text-indigo-700">Redis</div>
            <div className="font-mono text-[9px] text-indigo-500 mb-2">:6379</div>
            <div className="flex flex-wrap gap-1">
              {['Sessions', 'OTPs', 'Blacklist'].map(c => (
                <span key={c} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-indigo-100 border border-indigo-200 text-indigo-600">{c}</span>
              ))}
            </div>
          </div>
          <div className="col-span-2 bg-indigo-50 border border-indigo-200 rounded-xl p-3 hover:-translate-y-0.5 hover:shadow-md transition-all">
            <div className="text-[9px] font-mono text-indigo-400 uppercase tracking-wide mb-1">Database</div>
            <div className="text-sm font-bold text-indigo-700">PostgreSQL 16</div>
            <div className="flex flex-wrap gap-1 mt-2">
              {['_auth', '_user', '_realm', '_rbac', '_clients', '_notif'].map(d => (
                <span key={d} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-indigo-100 border border-indigo-200 text-indigo-600">{d}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Wire → kafka */}
        <div className="flex flex-col items-center">
          <Wire color="bg-rose-400" />
          <ArrowHead color="border-t-rose-300" />
        </div>

        {/* KAFKA */}
        <SectionLabel>Event Stream</SectionLabel>
        <div className="w-full max-w-lg">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-center hover:-translate-y-0.5 hover:shadow-md transition-all relative">
            <span className="absolute -top-2.5 right-3 text-[9px] font-mono px-2 py-0.5 rounded-full bg-rose-100 border border-rose-300 text-rose-600 uppercase tracking-wider">Message Bus</span>
            <div className="text-[9px] font-mono text-rose-400 uppercase tracking-widest mb-1">Apache Kafka</div>
            <div className="text-sm font-bold text-rose-700">Event Stream · Async Communication</div>
            <div className="flex flex-wrap gap-1.5 justify-center mt-3">
              {TOPICS.map((t, i) => (
                <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-rose-100 border border-rose-200 text-rose-500"
                  style={{ animationDelay: `${i * 0.5}s` }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Fan kafka → consumers */}
        <div className="w-full max-w-sm h-10">
          <svg width="100%" height="40" viewBox="0 0 400 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 Z" fill="rgba(225,29,72,0.5)" />
              </marker>
            </defs>
            <line x1="200" y1="0" x2="100" y2="38" stroke="rgba(225,29,72,0.4)" strokeWidth="1.5" strokeDasharray="6 3" markerEnd="url(#arr2)" />
            <line x1="200" y1="0" x2="300" y2="38" stroke="rgba(225,29,72,0.4)" strokeWidth="1.5" strokeDasharray="6 3" markerEnd="url(#arr2)" />
          </svg>
        </div>

        {/* CONSUMERS */}
        <SectionLabel>Consumers</SectionLabel>
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {[
            { label: 'session-service',      title: 'Session',      port: ':8087' },
            { label: 'notification-service', title: 'Notification', port: ':8088' },
          ].map(s => (
            <div key={s.label} className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-center hover:-translate-y-0.5 hover:border-rose-400 hover:shadow-md transition-all">
              <div className="text-[9px] font-mono text-rose-400 uppercase tracking-wide mb-1">{s.label}</div>
              <div className="text-xs font-bold text-rose-700">{s.title}</div>
              <div className="text-[9px] font-mono text-rose-500 mt-0.5">{s.port}</div>
            </div>
          ))}
        </div>

        {/* Wire → outputs */}
        <div className="flex flex-col items-center">
          <Wire color="bg-rose-400" />
          <ArrowHead color="border-t-rose-300" />
        </div>

        {/* OUTPUTS */}
        <SectionLabel>Outputs</SectionLabel>
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {[
            { label: 'Email',      title: 'SMTP Server', sub: 'Notifications · Alerts' },
            { label: 'Management', title: 'Admin API',   sub: ':8089' },
          ].map(s => (
            <div key={s.label} className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center hover:-translate-y-0.5 hover:shadow-md transition-all">
              <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wide mb-1">{s.label}</div>
              <div className="text-xs font-bold text-slate-600">{s.title}</div>
              <div className="text-[9px] font-mono text-slate-400 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* INFO PANELS */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-3xl mt-12">
          {PANELS.map(panel => (
            <div key={panel.title} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:border-indigo-200 hover:-translate-y-0.5 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2 h-2 rounded-full ${panel.dotColor} shadow-sm`} />
                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">{panel.title}</span>
              </div>
              {panel.rows.map(([k, v]) => (
                <div key={k} className="flex justify-between items-center py-1.5 border-b border-slate-50 last:border-0">
                  <span className="font-mono text-[10px] text-slate-400">{k}</span>
                  <span className="font-mono text-[10px] text-slate-700 font-semibold">{v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}