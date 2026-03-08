"use client";

import { useState, useEffect, useRef, RefCallback } from "react";
import Link from "next/link";

// ─── constants ────────────────────────────────────────────────
const VERSION = "v1.0.0";
const CYAN    = "#00B4D8";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  body { font-family:'Outfit',sans-serif; }
  .mono { font-family:'JetBrains Mono',monospace!important; }
  @keyframes float    { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-10px)} }
  @keyframes flowDash { to{stroke-dashoffset:-20} }
  @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes bgmove   { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  @keyframes fadeUp   { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes npulse   { 0%,100%{opacity:.5} 50%{opacity:1} }
  .anim-float    { animation:float 3s ease-in-out infinite; }
  .anim-shimmer  { background-size:200% auto; animation:shimmer 3s linear infinite; }
  .anim-bgmove   { background-size:200%; animation:bgmove 4s linear infinite; }
  .anim-fadeup   { animation:fadeUp .65s cubic-bezier(.22,1,.36,1) both; }
  .anim-npulse   { animation:npulse 2.2s ease-in-out infinite; }
  .anim-flowdash { animation:flowDash 1.4s linear infinite; }
  .sec-enter { opacity:0; transform:translateY(24px); }
  .sec-show  { animation:fadeUp .65s cubic-bezier(.22,1,.36,1) forwards; }
  .mesh-bg   { background:radial-gradient(ellipse 80% 60% at 50% -10%,#0c3a54 0%,#0D1B2A 60%); }
  .hero-grad { background:linear-gradient(90deg,rgba(0,180,216,.2) 0%,rgba(125,211,252,.25) 50%,rgba(0,180,216,.2) 100%); }
`;

// ─── data types ───────────────────────────────────────────────
interface CardItem {
  icon:  string;
  title: string;
  href:  string;
  desc:  string;
  color: string;
}

interface FeatureItem {
  icon:  string;
  title: string;
  desc:  string;
  color: string;
}

interface ServiceItem {
  name:  string;
  port:  string;
  desc:  string;
  color: string;
}

interface CommunityItem {
  icon:  string;
  label: string;
  sub:   string;
  href:  string;
  cta:   string;
  color: string;
}

interface FooterCol {
  title: string;
  links: [string, string][];
}

// ─── data ─────────────────────────────────────────────────────
const gettingStarted: CardItem[] = [
  { icon:"🐳", title:"Docker",            href:"/docs/getting-started/docker",      desc:"Up and running in seconds.",          color:"#2496ED" },
  { icon:"🐙", title:"Docker Compose",    href:"/docs/deployment",                  desc:"Full stack with one compose file.",   color:"#2496ED" },
  { icon:"☸️",  title:"Kubernetes / Helm", href:"/docs/deployment/kubernetes",        desc:"Helm chart for production clusters.", color:"#326CE5" },
  { icon:"🌱", title:"Spring Boot",       href:"/docs/integration/spring-boot",      desc:"Drop-in Keycloak replacement.",       color:"#6DB33F" },
  { icon:"🐘", title:"PostgreSQL",        href:"/docs/server/database",              desc:"Primary relational datastore.",       color:"#336791" },
  { icon:"🔐", title:"HashiCorp Vault",   href:"/docs/server/configuration",         desc:"Dynamic secrets & PKI management.",   color:"#FFCA28" },
  { icon:"🔑", title:"OAuth 2.1 / OIDC",  href:"/docs/security/oauth2",             desc:"PKCE, Device Flow, Refresh Token.",   color:"#8b5cf6" },
  { icon:"⚛️",  title:"Next.js / React",   href:"/docs/integration/react",            desc:"PKCE login for your SPA.",            color:"#3b82f6" },
  { icon:"📝", title:"Markdown Docs",     href:"/docs",                              desc:"Full reference documentation.",       color:"#475569" },
  { icon:"⚡", title:"Nginx",             href:"/docs/server/reverse-proxy",         desc:"Reverse-proxy & TLS termination.",    color:"#009639" },
  { icon:"☕", title:"OpenJDK / JAR",     href:"/docs/getting-started/installation", desc:"Run directly on any JVM 21+ host.",   color:"#ED8B00" },
  { icon:"📨", title:"Kafka Events",      href:"/docs/observability/audit",          desc:"Audit & notification streaming.",     color:"#E27D00" },
];

const features: FeatureItem[] = [
  { icon:"🛡️", title:"OAuth 2.1 / OIDC",   desc:"Auth Code + PKCE, Client Credentials, Refresh Token, Device Flow.", color:"#00B4D8" },
  { icon:"🌍", title:"Multi-Realm Tenancy", desc:"Fully isolated users, roles, clients, and sessions per realm.",      color:"#10b981" },
  { icon:"🔑", title:"MFA & Passwordless",  desc:"TOTP, Email OTP, SMS OTP, backup codes.",                           color:"#8b5cf6" },
  { icon:"👥", title:"RBAC & Groups",        desc:"Fine-grained roles, composite roles, groups, user-role mappings.",  color:"#f59e0b" },
  { icon:"⚡", title:"Event Streaming",      desc:"Kafka-powered audit events for every authentication action.",       color:"#ef4444" },
  { icon:"📦", title:"Microservice Native", desc:"11 independent Spring Boot 3 services — scale each separately.",    color:"#06b6d4" },
  { icon:"📊", title:"Full Observability",  desc:"Prometheus, OpenTelemetry, structured JSON logs, Grafana.",         color:"#f97316" },
  { icon:"🔒", title:"Spring Auth 1.3",     desc:"RSA-2048 JWT, JWKS endpoint, issuer discovery, OIDC userinfo.",    color:"#a855f7" },
];

const services: ServiceItem[] = [
  { name:"opengate-gateway",         port:"9080", desc:"API gateway — routing, CORS, rate limiting",                  color:"#00B4D8" },
  { name:"opengate-auth-service",    port:"9081", desc:"OAuth2/OIDC authorization server (Spring Auth Server 1.3)",   color:"#8b5cf6" },
  { name:"opengate-user-service",    port:"9082", desc:"User lifecycle — CRUD, passwords, email verification",        color:"#10b981" },
  { name:"opengate-realm-service",   port:"9083", desc:"Multi-tenant realm configuration and management",             color:"#f59e0b" },
  { name:"opengate-rbac-service",    port:"9084", desc:"Roles, composite roles, groups, and policy evaluation",       color:"#ef4444" },
  { name:"opengate-client-service",  port:"9085", desc:"OAuth2 client registry — secrets, redirect URIs, PKCE",      color:"#f97316" },
  { name:"opengate-mfa-service",     port:"9086", desc:"TOTP, email/SMS OTP, backup codes, and MFA enrollment",      color:"#06b6d4" },
  { name:"opengate-session-service", port:"9087", desc:"Redis-backed sessions, revocation, and device tracking",      color:"#a855f7" },
  { name:"opengate-notification",    port:"9088", desc:"Email templates via Kafka events and SMTP delivery",          color:"#ec4899" },
  { name:"opengate-admin-api",       port:"9089", desc:"Aggregated admin REST API (WebFlux reactive)",                color:"#14b8a6" },
  { name:"opengate-sample-app",      port:"8090", desc:"Demo REST API protected by OpenGate (reference integration)", color:"#84cc16" },
];

const techStack: string[] = [
  "Spring Boot 3.3","Spring Auth Server 1.3","Java 21","Next.js 14",
  "TypeScript","PostgreSQL 16","Redis 7","Kafka","OAuth 2.1","PKCE","OIDC","JWT / RSA-2048",
];

const NAV_LINKS: [string, string][] = [
  ["Docs","/docs/getting-started"],["API","/docs/api"],
  ["Architecture","/docs/architecture"],["About","/about"],["Changelog","/changelog"],
];

const FOOTER_COLS: FooterCol[] = [
  { title:"Docs",    links:[["Getting Started","/docs/getting-started"],["Quick Start","/docs/getting-started/quick-start"],["Configuration","/docs/server/configuration"],["Integration","/docs/integration"],["API Reference","/docs/api"]] },
  { title:"Project", links:[["About","/about"],["Changelog","/changelog"],["Architecture","/docs/architecture"],["GitHub Issues","https://github.com/MuyleangIng/opengate-iam/issues"],["Become a Sponsor","https://github.com/sponsors/MuyleangIng"]] },
];

const COMMUNITY_ITEMS: CommunityItem[] = [
  { icon:"🐛", label:"Report a Bug",   sub:"Found something broken?",   href:"https://github.com/MuyleangIng/opengate-iam/issues/new", cta:"Open Issue →",  color:"#ef4444" },
  { icon:"🔀", label:"Submit a PR",    sub:"Contributions are welcome.", href:"https://github.com/MuyleangIng/opengate-iam/pulls",       cta:"Contribute →",  color:"#10b981" },
  { icon:"⭐", label:"Star on GitHub", sub:"Show your support.",         href:"https://github.com/MuyleangIng/opengate-iam",             cta:"Star ★ →",      color:"#f59e0b" },
];

// ─── arch diagram types ───────────────────────────────────────
interface DiagramNode {
  id:    string;
  label: string;
  sub:   string;
  cx:    number;
  cy:    number;
  w:     number;
  h:     number;
  color: string;
}

interface DiagramEdge {
  s:      string;
  t:      string;
  anim:   boolean;
  color:  string;
  dashed?: boolean;
}

interface ComputedEdge extends DiagramEdge {
  id: string;
  d:  string;
}

const NODES: DiagramNode[] = [
  { id:"client",   label:"Browser · Mobile · CLI",   sub:"",                      cx:450, cy:36,  w:220, h:36,  color:"#64748b" },
  { id:"gateway",  label:"opengate-gateway",          sub:":9080 · routing · CORS",cx:450, cy:112, w:390, h:46,  color:"#00B4D8" },
  { id:"auth",     label:"auth-service",              sub:":9081 · OAuth2/OIDC",   cx:90,  cy:218, w:152, h:46,  color:"#8b5cf6" },
  { id:"user",     label:"user-service",              sub:":9082 · Users",         cx:268, cy:218, w:152, h:46,  color:"#10b981" },
  { id:"realm",    label:"realm-service",             sub:":9083 · Multi-tenant",  cx:460, cy:218, w:152, h:46,  color:"#f59e0b" },
  { id:"admin",    label:"admin-api",                 sub:":9089 · REST",          cx:765, cy:218, w:138, h:46,  color:"#14b8a6" },
  { id:"rbac",     label:"rbac-service",              sub:":9084",                 cx:58,  cy:330, w:110, h:40,  color:"#ef4444" },
  { id:"csvc",     label:"client-service",            sub:":9085",                 cx:193, cy:330, w:110, h:40,  color:"#f97316" },
  { id:"mfa",      label:"mfa-service",               sub:":9086",                 cx:335, cy:330, w:110, h:40,  color:"#06b6d4" },
  { id:"session",  label:"session-service",           sub:":9087",                 cx:488, cy:330, w:126, h:40,  color:"#a855f7" },
  { id:"notif",    label:"notification",              sub:":9088 · Kafka→SMTP",    cx:718, cy:330, w:142, h:40,  color:"#ec4899" },
  { id:"postgres", label:"PostgreSQL 16",             sub:"Primary DB",            cx:120, cy:444, w:145, h:40,  color:"#336791" },
  { id:"redis",    label:"Redis 7",                   sub:"Cache · Sessions",      cx:352, cy:444, w:128, h:40,  color:"#DC382D" },
  { id:"kafka",    label:"Apache Kafka",              sub:"Event Streaming",       cx:598, cy:444, w:142, h:40,  color:"#E27D00" },
  { id:"vault",    label:"HashiCorp Vault",           sub:"Secrets",               cx:806, cy:444, w:138, h:40,  color:"#FFCA28" },
];

const EDGES: DiagramEdge[] = [
  { s:"client",  t:"gateway",  anim:true,  color:"#00B4D8" },
  { s:"gateway", t:"auth",     anim:true,  color:"#8b5cf6" },
  { s:"gateway", t:"user",     anim:false, color:"#10b981" },
  { s:"gateway", t:"realm",    anim:false, color:"#f59e0b" },
  { s:"gateway", t:"admin",    anim:false, color:"#14b8a6" },
  { s:"auth",    t:"rbac",     anim:true,  color:"#ef4444" },
  { s:"auth",    t:"csvc",     anim:false, color:"#f97316" },
  { s:"auth",    t:"mfa",      anim:false, color:"#06b6d4" },
  { s:"auth",    t:"session",  anim:true,  color:"#a855f7" },
  { s:"auth",    t:"kafka",    anim:true,  color:"#E27D00" },
  { s:"user",    t:"postgres", anim:false, color:"#336791" },
  { s:"rbac",    t:"postgres", anim:false, color:"#336791" },
  { s:"session", t:"redis",    anim:true,  color:"#DC382D" },
  { s:"notif",   t:"kafka",    anim:true,  color:"#E27D00"  },
  { s:"gateway", t:"vault",    anim:false, color:"#FFCA28",  dashed:true },
];

const byId: Record<string, DiagramNode> = Object.fromEntries(NODES.map(n => [n.id, n]));

function curvePath(s: string, t: string): string {
  const sn = byId[s], tn = byId[t];
  const x1=sn.cx, y1=sn.cy+sn.h/2, x2=tn.cx, y2=tn.cy-tn.h/2, dy=Math.abs(y2-y1)*0.55;
  return `M${x1},${y1} C${x1},${y1+dy} ${x2},${y2-dy} ${x2},${y2}`;
}

// ─── ArchDiagram ──────────────────────────────────────────────
const LAYER_LABELS: [string, number, number, string][] = [
  ["CLIENTS",        10, 22,  "#64748b"],
  ["GATEWAY",        10, 98,  "#00B4D8"],
  ["CORE SERVICES",  10, 196, "#10b981"],
  ["SECONDARY",      10, 308, "#8b5cf6"],
  ["INFRASTRUCTURE", 10, 422, "#f59e0b"],
];

const LEGEND_ITEMS: [string, string][] = [
  ["API Gateway","#00B4D8"],["Core Services","#10b981"],["Secondary","#8b5cf6"],
  ["Infrastructure","#f59e0b"],["Vault / Secrets","#FFCA28"],["● Animated flow","#64748b"],
];

function ArchDiagram(): JSX.Element {
  const [hov, setHov] = useState<string | null>(null);

  const edges: ComputedEdge[] = EDGES.map((e, i) => ({
    ...e,
    id: `e${i}`,
    d:  curvePath(e.s, e.t),
  }));

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a1220]">
      {/* toolbar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[.07] bg-[#111c2d]">
        {(["#ef4444","#f59e0b","#22c55e"] as string[]).map(c => (
          <div key={c} className="w-3 h-3 rounded-full opacity-70" style={{ background:c }} />
        ))}
        <span className="mono text-white/30 text-[11px] ml-2">OpenGate IAM — Service Architecture</span>
        <div className="ml-auto flex gap-1.5">
          {([["gateway","#00B4D8"],["core","#10b981"],["secondary","#8b5cf6"],["infra","#f59e0b"],["secrets","#FFCA28"]] as [string,string][]).map(([g,c]) => (
            <span key={g} className="mono text-[9px] px-2 py-0.5 rounded-full" style={{ border:`1px solid ${c}40`, color:c, background:`${c}12` }}>{g}</span>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox="0 0 900 500" className="w-full min-w-[600px] block">
          <pattern id="grd" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0L0 0 0 28" fill="none" stroke="rgba(255,255,255,.025)" strokeWidth=".5"/>
          </pattern>
          <rect width="900" height="500" fill="url(#grd)"/>

          {/* edges */}
          {edges.map(e => (
            <g key={e.id}>
              <path d={e.d} fill="none" stroke={e.color} strokeWidth={e.anim?2.5:1.5} strokeOpacity={.12} style={{ filter:"blur(3px)" }}/>
              <path
                id={e.id} d={e.d} fill="none" stroke={e.color}
                strokeWidth={e.anim ? 1.5 : 1}
                strokeOpacity={hov===e.s || hov===e.t ? .9 : (e.anim ? .52 : .25)}
                strokeDasharray={e.dashed ? "4 5" : e.anim ? "6 4" : undefined}
                className={e.anim ? "anim-flowdash" : undefined}
              />
              {e.anim && (
                <circle r="3.2" fill={e.color} opacity=".9">
                  <animateMotion dur={`${1.6+(EDGES.indexOf(e)%6)*.35}s`} repeatCount="indefinite">
                    <mpath href={`#${e.id}`}/>
                  </animateMotion>
                </circle>
              )}
            </g>
          ))}

          {/* nodes */}
          {NODES.map(n => {
            const ih = hov === n.id;
            const rx = n.cx - n.w/2, ry = n.cy - n.h/2;
            return (
              <g key={n.id} className="cursor-pointer"
                onMouseEnter={() => setHov(n.id)}
                onMouseLeave={() => setHov(null)}
              >
                {ih && <rect x={rx-5} y={ry-5} width={n.w+10} height={n.h+10} rx={14} fill={n.color} opacity=".1" style={{ filter:"blur(6px)" }}/>}
                <rect x={rx} y={ry} width={n.w} height={n.h} rx={9}
                  fill={ih ? `${n.color}20` : "#111c2d"} stroke={n.color}
                  strokeWidth={ih ? 1.5 : .8} strokeOpacity={ih ? 1 : .45}
                />
                <rect x={rx} y={ry} width={3.5} height={n.h} rx={9} fill={n.color} opacity={ih ? 1 : .65}/>
                <circle cx={rx+n.w-10} cy={n.cy} r={ih ? 4.5 : 3}
                  fill={n.color} opacity={ih ? 1 : .55} className="anim-npulse"
                />
                <text
                  x={n.cx-5} y={n.cy-(n.sub ? 7 : 0)}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={n.id==="gateway" ? 11.5 : n.id==="client" ? 11 : 10}
                  fontWeight={600}
                  fill={ih ? n.color : "rgba(255,255,255,.82)"}
                  fontFamily="monospace"
                  style={{ transition:"fill .2s" }}
                >{n.label}</text>
                {n.sub && (
                  <text x={n.cx-5} y={n.cy+9} textAnchor="middle" dominantBaseline="middle"
                    fontSize={8} fill={ih ? `${n.color}cc` : "rgba(255,255,255,.3)"} fontFamily="monospace"
                  >{n.sub}</text>
                )}
              </g>
            );
          })}

          {/* layer labels */}
          {LAYER_LABELS.map(([l, x, y, c]) => (
            <text key={l} x={x} y={y} fontSize={7} fontWeight={700} fill={c} opacity={.55} fontFamily="monospace" letterSpacing={1.2}>{l}</text>
          ))}
        </svg>
      </div>
    </div>
  );
}

// ─── SVG helpers ──────────────────────────────────────────────
interface SvgProps { size?: number; }
interface ShieldProps extends SvgProps { stroke?: string; }

const ShieldSVG = ({ size=14, stroke="white" }: ShieldProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const ArrowSVG = ({ size=13 }: SvgProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const GithubSVG = ({ size=14 }: SvgProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

// ─── useSectionVis hook ───────────────────────────────────────
interface SectionVis {
  ref: (id: string) => RefCallback<HTMLElement>;
  cls: (id: string) => string;
}

function useSectionVis(): SectionVis {
  const refs = useRef<Record<string, HTMLElement | null>>({});
  const [vis, setVis] = useState<Set<string>>(new Set());

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          const sec = (e.target as HTMLElement).dataset.sec;
          if (sec) setVis((p: Set<string>) => new Set<string>([...Array.from(p), sec]));
        }
      }),
      { threshold: 0.1 }
    );
    Object.values(refs.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const ref = (id: string): RefCallback<HTMLElement> => el => {
    refs.current[id] = el;
    if (el) el.dataset.sec = id;
  };

  const cls = (id: string): string => `sec-enter ${vis.has(id) ? "sec-show" : ""}`;

  return { ref, cls };
}

// ─── Page ─────────────────────────────────────────────────────
export default function HomePage(): JSX.Element {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { ref, cls } = useSectionVis();

  useEffect(() => {
    const h = (): void => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily:"'Outfit',sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }}/>

      {/* ── Navbar ───────────────────────────────────────────── */}
      <nav className={`fixed top-0 inset-x-0 z-50 border-b border-white/10 backdrop-blur-xl transition-all duration-300 ${scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,.4)] bg-[#0D1B2A]/97" : "bg-[#0D1B2A]/90"}`}>
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-[30px] h-[30px] rounded-lg flex items-center justify-center"
              style={{ background:"linear-gradient(135deg,#00B4D8,#0077a8)", boxShadow:"0 0 12px rgba(0,180,216,.4)" }}>
              <ShieldSVG/>
            </div>
            <span className="font-bold text-white text-sm">OpenGate IAM</span>
            <span className="mono text-[10px] px-1.5 py-0.5 rounded-full ml-1"
              style={{ color:CYAN, border:`1px solid ${CYAN}40`, background:`${CYAN}12` }}>{VERSION}</span>
          </div>

          <div className="hidden md:flex gap-6">
            {NAV_LINKS.map(([l, h]) => (
              <Link key={h} href={h} className="text-sm text-white/55 hover:text-white transition-colors">{l}</Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="https://github.com/MuyleangIng/opengate-iam" target="_blank" rel="noopener noreferrer"
              className="text-white/45 hover:text-white transition-colors">
              <GithubSVG size={18}/>
            </a>
            <Link href="/docs/getting-started"
              className="text-sm font-semibold text-white px-4 py-1.5 rounded-lg hover:opacity-85 transition-opacity"
              style={{ background:"linear-gradient(135deg,#00B4D8,#0077a8)", boxShadow:"0 2px 12px rgba(0,180,216,.3)" }}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pt-14 relative overflow-hidden mesh-bg">
        <div className="absolute inset-0 opacity-[.035]"
          style={{ backgroundImage:"linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)", backgroundSize:"44px 44px" }}/>
        <div className="absolute top-[10%] left-[12%] w-96 h-96 rounded-full pointer-events-none"
          style={{ background:"radial-gradient(circle,rgba(0,180,216,.13) 0%,transparent 70%)" }}/>
        <div className="absolute top-[20%] right-[8%] w-72 h-72 rounded-full pointer-events-none"
          style={{ background:"radial-gradient(circle,rgba(139,92,246,.1) 0%,transparent 70%)" }}/>

        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-7 anim-shimmer hero-grad anim-fadeup"
            style={{ borderColor:`${CYAN}40`, color:CYAN, fontSize:11 }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background:CYAN }}/>
            <span className="mono">{VERSION} · Open Source · MIT License</span>
            <span className="border-l pl-2 ml-1 text-[10px] opacity-60" style={{ borderColor:`${CYAN}40` }}>Spring Boot 3 · Java 21</span>
          </div>

          <div className="flex justify-center mb-7 anim-fadeup">
            <div className="w-20 h-20 rounded-[28px] flex items-center justify-center anim-float"
              style={{ background:"linear-gradient(135deg,#00B4D8,#0077a8)", boxShadow:"0 0 40px rgba(0,180,216,.35)" }}>
              <ShieldSVG size={38}/>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-5 anim-fadeup">
            Open-Source<br/>
            <span className="anim-bgmove" style={{ background:"linear-gradient(90deg,#00B4D8,#7dd3fc,#00B4D8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Identity & Access
            </span>
            <br/>Management
          </h1>

          <p className="text-lg text-white/50 max-w-xl mx-auto mb-9 leading-relaxed anim-fadeup">
            Self-hosted IAM with <strong className="text-white/70">Spring Boot 3 microservices</strong>. OAuth 2.1, OIDC, PKCE, MFA, RBAC, and multi-realm tenancy — the Keycloak alternative you own completely.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10 anim-fadeup">
            {([
              { label:"📖  Read the Docs", href:"/docs/getting-started", primary:true  },
              { label:"⚡  Quick Start",   href:"/docs/getting-started/quick-start"    },
              { label:"★  GitHub",         href:"https://github.com/MuyleangIng/opengate-iam", ext:true },
            ] as { label:string; href:string; primary?:boolean; ext?:boolean }[]).map(({ label, href, primary, ext }) => (
              <Link key={href} href={href} {...(ext ? { target:"_blank", rel:"noopener noreferrer" } : {})}
                className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 hover:opacity-90 ${primary ? "text-white" : "text-white/70 border border-white/15 hover:bg-white/5"}`}
                style={primary ? { background:"linear-gradient(135deg,#00B4D8,#0077a8)", boxShadow:"0 4px 24px rgba(0,180,216,.25)" } : {}}>
                {label}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2 pb-16">
            {techStack.map(t => (
              <span key={t} className="mono px-3 py-1 rounded-full text-[11px] text-white/35 border border-white/[.09] bg-white/[.03]">{t}</span>
            ))}
          </div>
        </div>

        <svg viewBox="0 0 1440 48" fill="none" className="w-full block -mb-px">
          <path d="M0 48 C480 0 960 0 1440 48 L1440 48 L0 48Z" fill="white"/>
        </svg>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-100 py-7">
        <div className="max-w-2xl mx-auto px-6 grid grid-cols-4 gap-6 text-center">
          {([["11","Microservices"],["OAuth 2.1","Standard"],["MIT","License"],["Java 21","Runtime"]] as [string,string][]).map(([v, l]) => (
            <div key={l}>
              <p className="text-2xl font-extrabold text-slate-900">{v}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Getting Started ──────────────────────────────────── */}
      <section ref={ref("gs")} className={`py-20 bg-white ${cls("gs")}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] text-cyan-600 font-bold uppercase tracking-[.15em] mb-2.5">Deploy anywhere</p>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-2.5">Getting Started</h2>
            <p className="text-slate-500 max-w-md mx-auto">Choose your stack and have OpenGate running in minutes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {gettingStarted.map(({ icon, title, href, desc, color }: CardItem) => (
              <Link key={title} href={href}
                className="group flex items-start gap-3.5 p-4 rounded-2xl border border-slate-200 bg-white hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,180,216,.1)] transition-all duration-200">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background:`${color}16` }}>{icon}</div>
                <div>
                  <p className="font-bold text-[12.5px] text-slate-900 flex items-center gap-1 mb-1 group-hover:text-cyan-600 transition-colors">
                    {title} <ArrowSVG size={10}/>
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture ─────────────────────────────────────── */}
      <section ref={ref("arch")} className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] text-violet-600 font-bold uppercase tracking-[.15em] mb-2.5">System design</p>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-2.5">Architecture Overview</h2>
            <p className="text-slate-500 max-w-lg mx-auto">11 independently deployable microservices. Hover a node to highlight connections.</p>
          </div>
          <div className={cls("arch")}><ArchDiagram/></div>
          <div className="flex flex-wrap gap-3 justify-center mt-5">
            {LEGEND_ITEMS.map(([l, c]) => (
              <div key={l} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background:c }}/>
                <span className="text-[11px] text-slate-500">{l}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-7">
            <Link href="/docs/architecture" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors">
              View full architecture docs <ArrowSVG size={13}/>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section ref={ref("feat")} className={`py-20 bg-white ${cls("feat")}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] text-emerald-600 font-bold uppercase tracking-[.15em] mb-2.5">Everything you need</p>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-2.5">Enterprise-grade IAM</h2>
            <p className="text-slate-500 max-w-md mx-auto">Identity management as 11 independent microservices.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon, title, desc, color }: FeatureItem) => (
              <div key={title} className="bg-white rounded-2xl p-5 border border-slate-100 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,.07)] transition-all duration-200">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ background:`${color}14` }}>{icon}</div>
                <p className="font-bold text-[13px] text-slate-900 mb-1.5">{title}</p>
                <p className="text-[12px] text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Install ────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden mesh-bg">
        <div className="absolute inset-0 opacity-[.03]"
          style={{ backgroundImage:"linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize:"40px 40px" }}/>
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[.15em] mb-2.5" style={{ color:CYAN }}>60-second setup</p>
          <h2 className="text-4xl font-extrabold text-white mb-2.5">Up and running fast</h2>
          <p className="text-white/45 mb-9">Run the complete stack with Docker Compose.</p>
          <div className="rounded-2xl overflow-hidden border border-white/10 text-left mb-7">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[.07] bg-white/[.05]">
              {(["#ef4444","#f59e0b","#22c55e"] as string[]).map(c => (
                <div key={c} className="w-3 h-3 rounded-full opacity-65" style={{ background:c }}/>
              ))}
              <span className="mono text-white/30 text-[11px] ml-2">Terminal</span>
            </div>
            <pre className="mono bg-[#0a1628] p-6 text-[12px] text-slate-400 leading-[1.9] overflow-x-auto">{
`# Clone the repository
git clone https://github.com/MuyleangIng/opengate-iam.git
cd opengate-iam

# Start the full stack (PostgreSQL · Redis · Kafka · 11 services)
docker compose up -d

# Admin Console  →  http://localhost:3002
# Sample App     →  http://localhost:3003
# Auth Endpoint  →  http://localhost:9080`}</pre>
          </div>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/docs/getting-started/quick-start"
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl text-white hover:opacity-85 transition-opacity"
              style={{ background:CYAN }}>
              Full Quick Start <ArrowSVG size={13}/>
            </Link>
            <Link href="/docs/deployment"
              className="text-sm font-medium px-6 py-3 rounded-xl border border-white/20 text-white/65 hover:bg-white/5 transition-colors">
              Docker Compose Docs
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services Table ───────────────────────────────────── */}
      <section ref={ref("svc")} className={`py-20 bg-slate-50 border-y border-slate-200 ${cls("svc")}`}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] text-cyan-600 font-bold uppercase tracking-[.15em] mb-2.5">Microservices</p>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-2.5">11 Independent Services</h2>
            <p className="text-slate-500">Each service is independently deployable, scalable, and observable.</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80">
                  {(["Service","Port","Responsibility"] as string[]).map(h => (
                    <th key={h} className="text-left px-5 py-3 text-slate-400 font-medium text-[11px]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services.map(({ name, port, desc, color }: ServiceItem) => (
                  <tr key={name} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:color }}/>
                        <span className="mono text-[12px] text-slate-800">{name}</span>
                      </div>
                    </td>
                    <td className="mono px-5 py-3 text-[12px] text-slate-400">:{port}</td>
                    <td className="px-5 py-3 text-[12px] text-slate-500">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Open Source ──────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] text-amber-600 font-bold uppercase tracking-[.15em] mb-2.5">Community</p>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-2.5">Open Source & Community</h2>
            <p className="text-slate-500 max-w-md mx-auto">Report issues, submit PRs, and shape the future of OpenGate IAM.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {COMMUNITY_ITEMS.map(({ icon, label, sub, href, cta, color }: CommunityItem) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="group flex flex-col items-center text-center p-8 rounded-2xl border border-slate-200 hover:-translate-y-1 transition-all duration-200">
                <div className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-200"
                  style={{ background:`${color}12` }}>{icon}</div>
                <p className="font-bold text-slate-900 mb-1.5">{label}</p>
                <p className="text-[12px] text-slate-400 leading-relaxed">{sub}</p>
                <span className="mt-4 text-[12px] font-semibold" style={{ color }}>{cta}</span>
              </a>
            ))}
          </div>
          <div className="rounded-2xl border border-rose-100 p-7 flex flex-wrap items-center justify-between gap-5"
            style={{ background:"linear-gradient(135deg,#fff1f2,#fdf4ff)" }}>
            <div>
              <p className="font-extrabold text-lg text-slate-900 mb-1.5">❤️ Sponsor this project</p>
              <p className="text-sm text-slate-600 max-w-lg">OpenGate IAM is built by a solo developer. Your sponsorship keeps the project alive and funds new features.</p>
            </div>
            <a href="https://github.com/sponsors/MuyleangIng" target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm hover:opacity-85 transition-opacity"
              style={{ background:"linear-gradient(135deg,#f43f5e,#e11d48)", boxShadow:"0 4px 20px rgba(244,63,94,.3)" }}>
              ❤️ Become a Sponsor
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-white/[.08] bg-[#0D1B2A]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:CYAN }}>
                  <ShieldSVG size={15}/>
                </div>
                <span className="font-bold text-white">OpenGate IAM</span>
                <span className="mono text-[10px] px-1.5 py-0.5 rounded-full"
                  style={{ color:CYAN, border:`1px solid ${CYAN}30`, background:`${CYAN}12` }}>{VERSION}</span>
              </div>
              <p className="text-[12px] text-white/25 leading-relaxed max-w-xs mb-5">
                Open-source self-hosted IAM for the cloud-native stack. MIT Licensed. Spring Boot 3 + Java 21.
              </p>
              <a href="https://github.com/MuyleangIng/opengate-iam" target="_blank" rel="noopener noreferrer"
                className="inline-flex w-8 h-8 rounded-lg items-center justify-center text-white/40 border border-white/10 hover:text-white hover:border-white/30 transition-colors">
                <GithubSVG/>
              </a>
            </div>

            {FOOTER_COLS.map(({ title, links }: FooterCol) => (
              <div key={title}>
                <p className="text-[10px] text-white/35 font-bold uppercase tracking-[.18em] mb-4">{title}</p>
                <ul className="space-y-2.5 list-none">
                  {links.map(([l, h]: [string, string]) => (
                    <li key={h}>
                      <Link href={h} className="text-[12px] text-white/35 hover:text-white/80 transition-colors">{l}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="text-[10px] text-white/35 font-bold uppercase tracking-[.18em] mb-4">Author</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0"
                  style={{ background:"linear-gradient(135deg,#00B4D8,#8b5cf6)" }}>M</div>
                <div>
                  <p className="text-[13px] font-bold text-white/80">Ing Muyleang</p>
                  <p className="text-[11px] text-white/28">Full-Stack Engineer</p>
                </div>
              </div>
              {([["muyleanging.com","https://muyleanging.com"],["khmerstack.muyleanging.com","https://khmerstack.muyleanging.com"]] as [string,string][]).map(([l, h]) => (
                <a key={h} href={h} target="_blank" rel="noopener noreferrer"
                  className="block text-[11px] mb-2 opacity-60 hover:opacity-100 transition-opacity" style={{ color:CYAN }}>↗ {l}</a>
              ))}
            </div>
          </div>

          <div className="border-t border-white/[.08] pt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[11px] text-white/20">© 2026 OpenGate IAM · Released under the MIT License</p>
            <p className="text-[11px] text-white/20">
              Made with ❤️ by{" "}
              <a href="https://muyleanging.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors font-medium">Ing Muyleang</a>
              {" · "}
              <a href="https://khmerstack.muyleanging.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors font-medium">KhmerStack</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}