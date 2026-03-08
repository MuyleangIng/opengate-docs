import Link from 'next/link';
import { ExternalLink, Github, Heart, Shield, Code2, Cpu, Globe } from 'lucide-react';

export const metadata = {
  title: 'About',
  description: 'About OpenGate IAM and its creator Ing Muyleang.',
};

const timeline = [
  { year: '2026', title: 'OpenGate IAM v1.0.0', desc: 'Launched OpenGate IAM — a full open-source IAM platform built as 11 Spring Boot 3 microservices.' },
  { year: '2025', title: 'KhmerStack', desc: 'Founded KhmerStack — a community and platform for Cambodian developers building cloud-native applications.' },
  { year: '2024', title: 'Cloud-Native Journey', desc: 'Deep dived into Kubernetes, microservices, DevOps pipelines, and distributed systems architecture.' },
  { year: '2023', title: 'Full-Stack Engineering', desc: 'Specialized in Spring Boot backends + React/Next.js frontends with a focus on developer experience.' },
];

const skills = [
  { category: 'Backend', items: ['Spring Boot 3', 'Java 21', 'Spring Security', 'Spring Auth Server', 'WebFlux', 'JPA/Hibernate'] },
  { category: 'Frontend', items: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'React Query'] },
  { category: 'Infrastructure', items: ['Kubernetes', 'Docker', 'Kafka', 'Redis', 'PostgreSQL', 'Prometheus', 'Grafana'] },
  { category: 'Security', items: ['OAuth 2.1', 'OIDC', 'PKCE', 'JWT', 'RBAC', 'MFA / TOTP'] },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-14 z-40">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900 transition-colors">OpenGate IAM</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">About</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Hero profile */}
        <div className="flex flex-col md:flex-row items-start gap-10 mb-16">
          <div className="flex-shrink-0">
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-[#00B4D8] to-[#0D1B2A] flex items-center justify-center text-white text-4xl font-bold shadow-xl">
              M
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className="text-3xl font-bold text-gray-900">Ing Muyleang</h1>
              <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100 font-medium">Creator of OpenGate IAM</span>
            </div>
            <p className="text-gray-500 mb-4">Full-Stack Engineer · Cloud-Native Architect · Open-Source Developer</p>
            <p className="text-gray-600 leading-relaxed max-w-xl mb-6">
              I build production-grade developer tools and infrastructure software. OpenGate IAM is my flagship open-source project —
              a complete Identity & Access Management platform built from scratch as 11 Spring Boot 3 microservices,
              designed as a self-hostable alternative to Keycloak and Okta.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://muyleanging.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity"
                style={{ background: '#00B4D8' }}>
                <Globe size={14} /> muyleanging.com
              </a>
              <a href="https://khmerstack.muyleanging.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
                <ExternalLink size={14} /> KhmerStack
              </a>
              <a href="https://github.com/MuyleangIng" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
                <Github size={14} /> GitHub
              </a>
            </div>
          </div>
        </div>

        {/* About the project */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
            <Shield size={20} style={{ color: '#00B4D8' }} />
            About OpenGate IAM
          </h2>
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
            <p>
              OpenGate IAM started as a personal project to deeply understand how enterprise-grade IAM systems like Keycloak work under the hood.
              Instead of a monolithic app, it was designed from day one as a true microservices architecture —
              each concern (authentication, user management, realms, RBAC, MFA, sessions) is its own independently deployable service.
            </p>
            <p>
              The project uses <strong>Spring Authorization Server 1.3</strong> for the full OAuth 2.1 / OIDC implementation,
              supports <strong>PKCE</strong> for public browser clients, provides a <strong>Spring Boot Starter</strong>
              for easy integration (like Keycloak adapters), and ships with a full <strong>Next.js Admin Console</strong>
              and documentation site.
            </p>
            <p>
              Everything is open source under the MIT License. Pull requests, bug reports, and sponsorship are all welcome.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Code2 size={20} style={{ color: '#00B4D8' }} />
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map(({ category, items }) => (
              <div key={category} className="rounded-2xl border border-gray-100 p-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{category}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map(item => (
                    <span key={item} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-50 border border-gray-200 text-gray-700">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <Cpu size={20} style={{ color: '#00B4D8' }} />
            Journey
          </h2>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-gray-100" />
            <div className="space-y-8">
              {timeline.map(({ year, title, desc }) => (
                <div key={year} className="flex gap-6 items-start">
                  <div className="w-12 text-right flex-shrink-0">
                    <span className="text-xs font-mono text-gray-400">{year}</span>
                  </div>
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full border-2 border-cyan-400 bg-white absolute -left-[25px] top-1" />
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="font-semibold text-gray-900 text-sm mb-1">{title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sponsor */}
        <section>
          <div className="rounded-2xl border border-rose-100 bg-gradient-to-r from-rose-50 to-pink-50 p-8 text-center">
            <Heart size={28} className="text-rose-500 fill-rose-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Support Open Source</h3>
            <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
              OpenGate IAM is maintained by a solo developer in free time. If this project helps you,
              consider sponsoring to support continued development and new features.
            </p>
            <a href="https://github.com/sponsors/MuyleangIng"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-rose-200"
              style={{ background: 'linear-gradient(135deg, #f43f5e, #e11d48)' }}>
              <Heart size={15} className="fill-white" />
              Sponsor on GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
