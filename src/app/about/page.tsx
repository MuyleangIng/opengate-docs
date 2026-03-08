import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, Heart, Shield, Code2, Cpu, Globe, Terminal, Package, Search, Layout, Layers } from "lucide-react";

export const metadata = {
  title: "About — OpenGate IAM",
  description: "About OpenGate IAM and its creator Ing Muyleang.",
};

// ─── types ────────────────────────────────────────────────────
interface TimelineItem {
  year:  string;
  title: string;
  desc:  string;
}

interface SkillGroup {
  category: string;
  items:    string[];
}

interface Project {
  name:    string;
  tagline: string;
  desc:    string;
  tags:    string[];
  live?:   string;
  source?: string;
  icon:    React.ReactNode;
  featured?: boolean;
}

// ─── data ─────────────────────────────────────────────────────
const timeline: TimelineItem[] = [
  { year:"2026", title:"OpenGate IAM v1.0.0",    desc:"Launched OpenGate IAM — a full open-source IAM platform built as 11 Spring Boot 3 microservices." },
  { year:"2025", title:"KhmerStack",             desc:"Founded KhmerStack — an open-source org building practical tools for Khmer developers and the world." },
  { year:"2024", title:"Cloud-Native Journey",   desc:"Deep dived into Kubernetes, microservices, DevOps pipelines, and distributed systems architecture." },
  { year:"2023", title:"Full-Stack Engineering", desc:"Specialized in Spring Boot backends + React/Next.js frontends with a focus on developer experience." },
];

const skills: SkillGroup[] = [
  { category:"Backend",        items:["Spring Boot 3","Java 21","Spring Security","Spring Auth Server","WebFlux","JPA/Hibernate"] },
  { category:"Frontend",       items:["Next.js 14","React","TypeScript","Tailwind CSS","React Query","Qt6 / C++"] },
  { category:"Infrastructure", items:["Kubernetes","Docker","BuildKit","Kafka","Redis","PostgreSQL","Prometheus","Grafana"] },
  { category:"Security",       items:["OAuth 2.1","OIDC","PKCE","JWT","RBAC","MFA / TOTP"] },
];

const CYAN = "#00B4D8";

const projects: Project[] = [
  {
    name:"OpenGate IAM",
    tagline:"Self-hosted Identity & Access Management",
    desc:"Full open-source IAM platform built as 11 Spring Boot 3 microservices. OAuth 2.1, OIDC, PKCE, MFA, RBAC, multi-realm tenancy — the Keycloak alternative you own.",
    tags:["Spring Boot 3","OAuth 2.1","OIDC","Java 21","Kubernetes"],
    live:"https://opengate-iam.muyleanging.com",
    source:"https://github.com/MuyleangIng/opengate-iam",
    icon:<Shield size={18}/>,
    featured:true,
  },
  {
    name:"AngkorSearch v2.3",
    tagline:"Cambodia's open-source search engine",
    desc:"Fully self-hosted search engine built from scratch for Cambodia. Crawls the web, indexes Khmer & English content via PostgreSQL full-text + trigram fuzzy matching, served through a C++ REST API and Next.js frontend.",
    tags:["C++","PostgreSQL","Next.js","Full-text Search","Self-hosted"],
    live:"https://angkorsearch.muyleanging.com",
    source:"https://github.com/MuyleangIng/angkor-search",
    icon:<Search size={18}/>,
  },
  {
    name:"kForge",
    tagline:"Multi-platform Docker image build CLI",
    desc:"Standalone binary and Docker CLI plugin (docker kforge) powered by BuildKit. Features 5 progress styles, declarative bake config (HCL/JSON), flexible caching, and registry auth. Inspired by Docker Buildx.",
    tags:["Docker","BuildKit","CLI","Multi-platform","Go"],
    live:"https://kforge.muyleanging.com",
    source:"https://github.com/MuyleangIng/kforge",
    icon:<Package size={18}/>,
  },
  {
    name:"kforge-studio",
    tagline:"Native Qt6/C++ GUI for kForge",
    desc:"Docker Desktop–style desktop app wrapping the kforge CLI. Live job cards with log streaming, BuildKit builder management, declarative bake builds, QEMU setup wizard, and a session dashboard.",
    tags:["Qt6","C++","Desktop","BuildKit","GUI"],
    source:"https://github.com/MuyleangIng/kforge-studio",
    icon:<Layout size={18}/>,
  },
  {
    name:"Stack Forge",
    tagline:"Visual DevOps pipeline builder",
    desc:"Drag tools onto a canvas, connect them, and generate production-ready install scripts instantly. Supports 71+ tools across 16 categories including Kubernetes, CI/CD, secret managers, and 8 cloud providers.",
    tags:["DevOps","Kubernetes","Visual Builder","Pipeline","Next.js"],
    live:"https://stackforge.muyleanging.com",
    source:"https://github.com/MuyleangIng/stack-forge",
    icon:<Layers size={18}/>,
  },
  {
    name:"MekongTunnel",
    tagline:"Local dev tunneling — Khmer-built",
    desc:"Simple, fast tunneling tool for exposing local development servers to the internet. Lightweight CLI with clean output, built by KhmerStack.",
    tags:["DevOps","Tunneling","CLI","Go"],
    live:"https://mekong-tunnel.muyleanging.com",
    source:"https://github.com/MuyleangIng/mekong-tunnel",
    icon:<Terminal size={18}/>,
  },
  {
    name:"ClipVault",
    tagline:"Fast offline clipboard manager",
    desc:"Global shortcut, instant search, pin & tag clips, multiple themes. Works 100% offline. Available on macOS via Homebrew, Windows, and Linux. Built with Electron + React + SQLite.",
    tags:["Electron","React","SQLite","Desktop","macOS","Windows","Linux"],
    source:"https://github.com/MuyleangIng/clip-vault",
    icon:<Code2 size={18}/>,
  },
];

// ─── sub-components ───────────────────────────────────────────
function TagBadge({ label }: { label: string }): JSX.Element {
  return (
    <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 border border-slate-200 text-slate-600">
      {label}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }): JSX.Element {
  const { name, tagline, desc, tags, live, source, icon, featured } = project;
  return (
    <div className={`group relative rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${featured ? "border-cyan-200 bg-gradient-to-br from-cyan-50/60 to-white" : "border-slate-200 bg-white hover:border-slate-300"}`}>
      {featured && (
        <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest"
          style={{ background:`${CYAN}18`, color:CYAN }}>
          Featured
        </span>
      )}

      {/* icon + name */}
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white"
          style={{ background: featured ? "linear-gradient(135deg,#00B4D8,#0077a8)" : "linear-gradient(135deg,#334155,#1e293b)" }}>
          {icon}
        </div>
        <div>
          <p className="font-bold text-[14px] text-slate-900 leading-tight">{name}</p>
          <p className="text-[11px] text-slate-400">{tagline}</p>
        </div>
      </div>

      <p className="text-[12.5px] text-slate-500 leading-relaxed mb-3">{desc}</p>

      {/* tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tags.map(t => <TagBadge key={t} label={t}/>)}
      </div>

      {/* links */}
      <div className="flex items-center gap-2">
        {live && (
          <a href={live} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-85"
            style={{ background: featured ? CYAN : "#334155" }}>
            <Globe size={11}/> Live
          </a>
        )}
        {source && (
          <a href={source} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
            <Github size={11}/> Source
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function AboutPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily:"'Outfit','Inter',sans-serif" }}>

      {/* breadcrumb */}
      <div className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-14 z-40">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition-colors">OpenGate IAM</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">About</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* ── Hero profile ──────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-start gap-10 mb-16">
          <div className="flex-shrink-0">
            <div className="relative w-28 h-28">
              <Image
                src="https://avatars.githubusercontent.com/u/116934056?v=4"
                alt="Ing Muyleang"
                width={112}
                height={112}
                className="rounded-3xl shadow-xl object-cover w-28 h-28"
                priority
              />
              {/* online dot */}
              <span className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white"/>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1.5 flex-wrap">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Ing Muyleang</h1>
              <span className="text-[11px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest"
                style={{ background:`${CYAN}15`, color:CYAN, border:`1px solid ${CYAN}30` }}>
                Creator of OpenGate IAM
              </span>
            </div>

            <p className="text-slate-400 text-sm mb-4">Full-Stack Engineer · Cloud-Native Architect · Open-Source Developer · 🇰🇭 Cambodia</p>

            <p className="text-slate-600 leading-relaxed max-w-xl mb-5 text-[15px]">
              I build production-grade developer tools and infrastructure software. OpenGate IAM is my flagship open-source project —
              a complete Identity & Access Management platform designed as a self-hostable alternative to Keycloak and Okta.
              I also run <strong className="text-slate-800">KhmerStack</strong>, an open-source org building practical tools for Khmer developers worldwide.
            </p>

            <div className="flex flex-wrap gap-2.5">
              <a href="https://muyleanging.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold hover:opacity-85 transition-opacity"
                style={{ background:CYAN }}>
                <Globe size={13}/> muyleanging.com
              </a>
              <a href="https://khmerstack.muyleanging.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
                🇰🇭 KhmerStack
              </a>
              <a href="https://github.com/MuyleangIng" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
                <Github size={13}/> GitHub
              </a>
            </div>
          </div>
        </div>

        {/* ── About the project ─────────────────────────────── */}
        <section className="mb-16">
          <SectionTitle icon={<Shield size={18}/>} title="About OpenGate IAM"/>
          <div className="text-slate-600 leading-relaxed space-y-4 text-[15px]">
            <p>
              OpenGate IAM started as a personal project to deeply understand how enterprise-grade IAM systems like Keycloak
              work under the hood. Instead of a monolithic app, it was designed from day one as a true microservices architecture —
              each concern (authentication, user management, realms, RBAC, MFA, sessions) is its own independently deployable service.
            </p>
            <p>
              The project uses <strong className="text-slate-800">Spring Authorization Server 1.3</strong> for the full OAuth 2.1 / OIDC
              implementation, supports <strong className="text-slate-800">PKCE</strong> for public browser clients, provides a{" "}
              <strong className="text-slate-800">Spring Boot Starter</strong> for easy integration, and ships with a full{" "}
              <strong className="text-slate-800">Next.js Admin Console</strong> and documentation site.
            </p>
            <p>Everything is open source under the MIT License. Pull requests, bug reports, and sponsorship are all welcome.</p>
          </div>
        </section>

        {/* ── Projects ──────────────────────────────────────── */}
        <section className="mb-16">
          <SectionTitle icon={<Code2 size={18}/>} title="Open-Source Projects"/>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map(p => <ProjectCard key={p.name} project={p}/>)}
          </div>
        </section>

        {/* ── Skills ────────────────────────────────────────── */}
        <section className="mb-16">
          <SectionTitle icon={<Cpu size={18}/>} title="Technical Skills"/>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map(({ category, items }: SkillGroup) => (
              <div key={category} className="rounded-2xl border border-slate-100 p-5 bg-white hover:border-slate-200 transition-colors">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[.18em] mb-3">{category}</p>
                <div className="flex flex-wrap gap-1.5">
                  {items.map(item => <TagBadge key={item} label={item}/>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Timeline ──────────────────────────────────────── */}
        <section className="mb-16">
          <SectionTitle icon={<Cpu size={18}/>} title="Journey"/>
          <div className="relative">
            <div className="absolute left-[52px] top-0 bottom-0 w-px bg-slate-100"/>
            <div className="space-y-8">
              {timeline.map(({ year, title, desc }: TimelineItem) => (
                <div key={year} className="flex gap-6 items-start">
                  <div className="w-10 text-right flex-shrink-0">
                    <span className="mono text-[11px] text-slate-400">{year}</span>
                  </div>
                  <div className="relative flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full border-2 border-cyan-400 bg-white"/>
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="font-bold text-slate-900 text-sm mb-1">{title}</p>
                    <p className="text-[12px] text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sponsor ───────────────────────────────────────── */}
        <section>
          <div className="rounded-2xl border border-rose-100 p-10 text-center"
            style={{ background:"linear-gradient(135deg,#fff1f2,#fdf4ff)" }}>
            <Heart size={30} className="text-rose-500 fill-rose-500 mx-auto mb-4"/>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">Support Open Source</h3>
            <p className="text-slate-500 text-sm mb-7 max-w-md mx-auto leading-relaxed">
              OpenGate IAM and all KhmerStack projects are maintained in free time by a solo developer.
              If any of this work helps you, please consider sponsoring to support continued development.
            </p>
            <a href="https://github.com/sponsors/MuyleangIng" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-rose-200"
              style={{ background:"linear-gradient(135deg,#f43f5e,#e11d48)" }}>
              <Heart size={14} className="fill-white"/> Sponsor on GitHub
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}

// ─── SectionTitle helper ──────────────────────────────────────
function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }): JSX.Element {
  return (
    <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-2.5 tracking-tight">
      <span className="text-cyan-500">{icon}</span>
      {title}
    </h2>
  );
}