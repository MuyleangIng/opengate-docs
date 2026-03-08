'use client';

export default function ArchitectureDiagram() {
  return (
    <>
      <style>{`
        .iad-root *, .iad-root *::before, .iad-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .iad-root {
          --bg: #ffffff;
          --surface: #f8fafc;
          --border: rgba(99,102,241,0.15);
          --border-bright: rgba(99,102,241,0.45);
          --cyan: #4f46e5;
          --cyan-dim: rgba(79,70,229,0.6);
          --green: #059669;
          --green-dim: rgba(5,150,105,0.6);
          --amber: #d97706;
          --amber-dim: rgba(217,119,6,0.6);
          --purple: #7c3aed;
          --purple-dim: rgba(124,58,237,0.6);
          --rose: #e11d48;
          --rose-dim: rgba(225,29,72,0.6);
          --text: #0f172a;
          --text-dim: #64748b;
          --text-muted: #94a3b8;
          background: var(--bg);
          color: var(--text);
          font-family: 'Syne', sans-serif;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
        }

        .iad-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
        }

        .iad-header {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 48px 20px 32px;
          animation: iad-fadeDown 0.8s ease both;
        }

        .iad-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(79,70,229,0.06);
          border: 1px solid rgba(79,70,229,0.3);
          border-radius: 100px;
          padding: 6px 16px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--cyan);
          letter-spacing: 0.1em;
          margin-bottom: 20px;
          animation: iad-pulseBorder 3s ease-in-out infinite;
        }

        .iad-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 6px rgba(5,150,105,0.6);
          animation: iad-blink 1.5s ease-in-out infinite;
        }

        .iad-h1 {
          font-size: clamp(28px, 4vw, 52px);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1;
          background: linear-gradient(135deg, #0f172a 30%, var(--cyan) 70%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
        }

        .iad-subtitle {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--text-dim);
          letter-spacing: 0.05em;
        }

        .iad-main {
          position: relative;
          z-index: 5;
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 24px 64px;
        }

        .iad-diagram {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        /* NODES */
        .iad-node {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 14px 20px;
          position: relative;
          transition: all 0.3s ease;
          cursor: default;
        }
        .iad-node:hover {
          border-color: var(--border-bright);
          transform: translateY(-2px);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.08), 0 8px 32px rgba(99,102,241,0.12);
        }
        .iad-node-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: var(--text-dim);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .iad-node-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
        }
        .iad-node-port {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--cyan);
          margin-top: 2px;
        }
        .iad-node-tag {
          position: absolute;
          top: -10px; right: 12px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          padding: 2px 8px;
          border-radius: 100px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .iad-tag-cyan  { background: rgba(79,70,229,0.08); color: var(--cyan); border: 1px solid rgba(79,70,229,0.25); }

        /* LAYER VARIANTS */
        .iad-client-node { border-color: rgba(124,58,237,0.25); background: rgba(124,58,237,0.04); }
        .iad-client-node:hover { border-color: var(--purple); box-shadow: 0 0 0 3px rgba(124,58,237,0.08), 0 8px 32px rgba(124,58,237,0.15); }
        .iad-client-node .iad-node-title { color: var(--purple); }

        .iad-proxy-node { border-color: rgba(217,119,6,0.25); background: rgba(217,119,6,0.04); }
        .iad-proxy-node:hover { border-color: var(--amber); box-shadow: 0 0 0 3px rgba(217,119,6,0.08), 0 8px 32px rgba(217,119,6,0.15); }
        .iad-proxy-node .iad-node-title { color: var(--amber); }

        .iad-gateway-node { border-color: rgba(79,70,229,0.35); background: rgba(79,70,229,0.04); border-width: 1.5px; }
        .iad-gateway-node .iad-node-title { color: var(--cyan); }

        .iad-service-node { border-color: rgba(5,150,105,0.25); background: rgba(5,150,105,0.04); }
        .iad-service-node:hover { border-color: var(--green); box-shadow: 0 0 0 3px rgba(5,150,105,0.08), 0 8px 32px rgba(5,150,105,0.15); }
        .iad-service-node .iad-node-title { color: var(--green); }
        .iad-service-node .iad-node-port { color: var(--green-dim); }

        .iad-data-node { border-color: rgba(79,70,229,0.25); background: rgba(79,70,229,0.04); }
        .iad-data-node .iad-node-title { color: var(--cyan); }

        .iad-kafka-node { border-color: rgba(225,29,72,0.25); background: rgba(225,29,72,0.04); }
        .iad-kafka-node:hover { border-color: var(--rose); box-shadow: 0 0 0 3px rgba(225,29,72,0.08), 0 8px 32px rgba(225,29,72,0.15); }
        .iad-kafka-node .iad-node-title { color: var(--rose); }
        .iad-kafka-node .iad-node-port { color: var(--rose-dim); }

        .iad-out-node { border-color: rgba(100,116,139,0.25); background: rgba(100,116,139,0.04); }
        .iad-out-node .iad-node-title { color: var(--text-dim); font-size: 13px; }

        /* CHIPS */
        .iad-chips { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
        .iad-chip {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          padding: 2px 8px;
          border-radius: 6px;
          border: 1px solid;
          letter-spacing: 0.05em;
        }
        .iad-chip-cyan   { border-color: rgba(79,70,229,0.3);  color: var(--cyan);   background: rgba(79,70,229,0.07); }
        .iad-chip-green  { border-color: rgba(5,150,105,0.3);  color: var(--green);  background: rgba(5,150,105,0.07); }
        .iad-chip-purple { border-color: rgba(124,58,237,0.3); color: var(--purple); background: rgba(124,58,237,0.07); }
        .iad-chip-amber  { border-color: rgba(217,119,6,0.3);  color: var(--amber);  background: rgba(217,119,6,0.07); }
        .iad-chip-rose   { border-color: rgba(225,29,72,0.3);  color: var(--rose);   background: rgba(225,29,72,0.07); }

        /* SECTION LABEL */
        .iad-section-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin: 4px 0;
          width: 100%;
          max-width: 860px;
        }
        .iad-section-label::before, .iad-section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--text-muted), transparent);
          opacity: 0.3;
        }

        /* WIRES */
        .iad-connector { display: flex; flex-direction: column; align-items: center; }
        .iad-wire-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          margin: 2px 0;
        }
        .iad-arrow { width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; margin-top: -1px; }

        .iad-wire {
          width: 2px;
          height: 28px;
          position: relative;
          overflow: hidden;
        }
        .iad-wire::after {
          content: '';
          position: absolute;
          inset: 0;
          height: 60%;
          animation: iad-dataFlow 1.8s linear infinite;
        }
        .iad-wire-purple { background: linear-gradient(to bottom, rgba(124,58,237,0.35), rgba(124,58,237,0.05)); }
        .iad-wire-purple::after { background: linear-gradient(to bottom, transparent, var(--purple), transparent); }
        .iad-arrow-purple { border-top: 7px solid rgba(124,58,237,0.5); }

        .iad-wire-amber { background: linear-gradient(to bottom, rgba(217,119,6,0.35), rgba(217,119,6,0.05)); }
        .iad-wire-amber::after { background: linear-gradient(to bottom, transparent, var(--amber), transparent); }
        .iad-arrow-amber { border-top: 7px solid rgba(217,119,6,0.5); }

        .iad-wire-green { background: linear-gradient(to bottom, rgba(5,150,105,0.35), rgba(5,150,105,0.05)); }
        .iad-wire-green::after { background: linear-gradient(to bottom, transparent, var(--green), transparent); }
        .iad-arrow-green { border-top: 7px solid rgba(5,150,105,0.5); }

        .iad-wire-rose { background: linear-gradient(to bottom, rgba(225,29,72,0.35), rgba(225,29,72,0.05)); }
        .iad-wire-rose::after { background: linear-gradient(to bottom, transparent, var(--rose), transparent); }
        .iad-arrow-rose { border-top: 7px solid rgba(225,29,72,0.5); }

        /* GRIDS */
        .iad-services-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 10px;
          width: 100%;
          max-width: 860px;
        }
        .iad-services-grid .iad-node { text-align: center; padding: 12px 10px; }
        .iad-services-grid .iad-node-title { font-size: 13px; }
        .iad-services-grid .iad-node-port { font-size: 10px; }

        .iad-data-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 14px; width: 100%; max-width: 540px; }
        .iad-two-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; max-width: 400px; width: 100%; }

        /* GATEWAY PILLS */
        .iad-gw-pills { display: flex; gap: 6px; margin-top: 10px; }
        .iad-gw-pill {
          flex: 1;
          background: rgba(79,70,229,0.05);
          border: 1px solid rgba(79,70,229,0.18);
          border-radius: 6px;
          padding: 6px 8px;
          text-align: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: var(--cyan-dim);
          transition: all 0.2s ease;
        }
        .iad-gw-pill:hover { background: rgba(79,70,229,0.1); color: var(--cyan); border-color: rgba(79,70,229,0.35); }

        /* KAFKA TOPICS */
        .iad-topics { display: flex; gap: 6px; margin-top: 10px; flex-wrap: wrap; justify-content: center; }
        .iad-topic {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          padding: 2px 8px;
          border-radius: 4px;
          background: rgba(225,29,72,0.06);
          border: 1px solid rgba(225,29,72,0.2);
          color: var(--rose-dim);
          letter-spacing: 0.05em;
          animation: iad-topicPulse 3s ease-in-out infinite;
        }
        .iad-topic:nth-child(2) { animation-delay: 0.5s; }
        .iad-topic:nth-child(3) { animation-delay: 1s; }
        .iad-topic:nth-child(4) { animation-delay: 1.5s; }
        .iad-topic:nth-child(5) { animation-delay: 2s; }
        .iad-topic:nth-child(6) { animation-delay: 2.5s; }

        /* FAN SVG */
        .iad-fan { width: 100%; height: 40px; }
        .iad-fan-wrap { width: 100%; max-width: 860px; height: 40px; }
        .iad-flow-path { stroke-dasharray: 8 4; animation: iad-dashFlow 1.5s linear infinite; }

        /* INFO PANELS */
        .iad-panels { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; width: 100%; margin-top: 44px; }
        .iad-panel {
          background: #ffffff;
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 12px;
          padding: 18px;
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
          animation: iad-fadeUp 0.6s ease both;
          box-shadow: 0 1px 4px rgba(99,102,241,0.06);
        }
        .iad-panel:hover { border-color: rgba(99,102,241,0.35); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(99,102,241,0.1); }
        .iad-panel:nth-child(1) { animation-delay: 0.3s; }
        .iad-panel:nth-child(2) { animation-delay: 0.4s; }
        .iad-panel:nth-child(3) { animation-delay: 0.5s; }
        .iad-panel-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .iad-panel-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .iad-dot-cyan  { background: var(--cyan);  box-shadow: 0 0 6px rgba(79,70,229,0.4); }
        .iad-dot-green { background: var(--green); box-shadow: 0 0 6px rgba(5,150,105,0.4); }
        .iad-dot-amber { background: var(--amber); box-shadow: 0 0 6px rgba(217,119,6,0.4); }
        .iad-panel-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 0;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
        }
        .iad-panel-row:last-child { border-bottom: none; }
        .iad-panel-key   { color: var(--text-dim); }
        .iad-panel-value { color: var(--text); font-weight: 500; }

        /* STAGGER */
        .iad-l1 { animation: iad-fadeDown 0.5s ease 0.1s  both; }
        .iad-l2 { animation: iad-fadeUp   0.5s ease 0.25s both; }
        .iad-l3 { animation: iad-fadeUp   0.5s ease 0.4s  both; }
        .iad-l4 { animation: iad-fadeUp   0.5s ease 0.55s both; }
        .iad-l5 { animation: iad-fadeUp   0.5s ease 0.7s  both; }
        .iad-l6 { animation: iad-fadeUp   0.5s ease 0.85s both; }
        .iad-l7 { animation: iad-fadeUp   0.5s ease 1.0s  both; }
        .iad-l8 { animation: iad-fadeUp   0.5s ease 1.15s both; }

        /* KEYFRAMES */
        @keyframes iad-fadeDown  { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes iad-fadeUp    { from { opacity:0; transform:translateY(20px);  } to { opacity:1; transform:translateY(0); } }
        @keyframes iad-dataFlow  { 0% { top:-100%; } 100% { top:100%; } }
        @keyframes iad-dashFlow  { to { stroke-dashoffset: -60; } }
        @keyframes iad-blink     { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        @keyframes iad-pulseBorder { 0%,100% { box-shadow:none; } 50% { box-shadow:0 0 12px rgba(79,70,229,0.15); } }
        @keyframes iad-topicPulse  { 0%,100% { opacity:0.5; } 50% { opacity:1; border-color:rgba(225,29,72,0.45); } }

        @media (max-width: 700px) {
          .iad-services-grid { grid-template-columns: repeat(3,1fr); }
          .iad-panels         { grid-template-columns: 1fr; }
          .iad-data-grid      { grid-template-columns: 1fr; }
        }
      `}</style>

      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div className="iad-root">
        {/* HEADER */}
        <div className="iad-header">
          <div className="iad-badge">
            <span className="iad-badge-dot" />
            LIVE SYSTEM · MICROSERVICES
          </div>
          {/* <h2 className="iad-h1">OpenGate IAM</h2> */}
          <p className="iad-subtitle">Architecture Overview · True Microservices · Event-Driven</p>
        </div>

        <div className="iad-main">
          <div className="iad-diagram">

            {/* CLIENT */}
            <div className="iad-l1" style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%',maxWidth:700}}>
              <div className="iad-section-label">Client Layer</div>
              <div className="iad-node iad-node-wide iad-client-node" style={{width:'100%',textAlign:'center'}}>
                <span className="iad-node-tag iad-tag-cyan">Entry</span>
                <div className="iad-node-label">Client Applications</div>
                <div className="iad-node-title">Browser · Mobile · Backend</div>
                <div className="iad-chips" style={{justifyContent:'center'}}>
                  <span className="iad-chip iad-chip-purple">SPA</span>
                  <span className="iad-chip iad-chip-purple">Native App</span>
                  <span className="iad-chip iad-chip-purple">Server-Side</span>
                  <span className="iad-chip iad-chip-purple">HTTPS :443</span>
                </div>
              </div>
            </div>

            {/* Wire 1 */}
            <div className="iad-connector iad-l2">
              <div className="iad-wire iad-wire-purple" />
              <span className="iad-wire-label" style={{color:'var(--purple-dim)'}}>HTTPS :443</span>
              <div className="iad-arrow iad-arrow-purple" />
            </div>

            {/* PROXY */}
            <div className="iad-l2" style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%',maxWidth:700}}>
              <div className="iad-node iad-proxy-node" style={{width:'100%',textAlign:'center'}}>
                <span className="iad-node-tag" style={{background:'rgba(217,119,6,0.08)',color:'var(--amber)',border:'1px solid rgba(217,119,6,0.25)'}}>PROXY / CDN</span>
                <div className="iad-node-label">Reverse Proxy</div>
                <div className="iad-node-title">Nginx · Traefik · ALB</div>
                <div className="iad-chips" style={{justifyContent:'center'}}>
                  <span className="iad-chip iad-chip-amber">SSL Termination</span>
                  <span className="iad-chip iad-chip-amber">Load Balancing</span>
                  <span className="iad-chip iad-chip-amber">CDN</span>
                </div>
              </div>
            </div>

            {/* Wire 2 */}
            <div className="iad-connector iad-l3">
              <div className="iad-wire iad-wire-amber" />
              <span className="iad-wire-label" style={{color:'var(--amber-dim)'}}>HTTP :8080</span>
              <div className="iad-arrow iad-arrow-amber" />
            </div>

            {/* GATEWAY */}
            <div className="iad-l3" style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%',maxWidth:860}}>
              <div className="iad-section-label">API Gateway</div>
              <div className="iad-node iad-gateway-node" style={{width:'100%'}}>
                <span className="iad-node-tag iad-tag-cyan">Spring Cloud Gateway · :8080</span>
                <div className="iad-node-label">opengate-gateway</div>
                <div className="iad-node-title">Single Entry Point · JWT Validation · CORS · Rate Limiting</div>
                <div className="iad-gw-pills">
                  {['CORS','Routing','Rate Limiting','Request Log','OAuth2 RS'].map(p => (
                    <div key={p} className="iad-gw-pill">{p}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Fan gateway → services */}
            <div className="iad-l4 iad-fan-wrap">
              <svg className="iad-fan" viewBox="0 0 860 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="iad-arr1" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L6,3 Z" fill="rgba(5,150,105,0.5)" />
                  </marker>
                </defs>
                {[72,215,358,501,644,787].map(x => (
                  <line key={x} x1="430" y1="0" x2={x} y2="38"
                    stroke="rgba(5,150,105,0.35)" strokeWidth="1.5"
                    markerEnd="url(#iad-arr1)" className="iad-flow-path" />
                ))}
              </svg>
            </div>

            {/* SERVICES */}
            <div className="iad-l4" style={{width:'100%',maxWidth:860}}>
              <div className="iad-section-label">Microservices</div>
              <div className="iad-services-grid">
                {[
                  {label:'auth',  title:'Auth',  port:':8081'},
                  {label:'user',  title:'User',  port:':8082'},
                  {label:'realm', title:'Realm', port:':8083'},
                  {label:'rbac',  title:'RBAC',  port:':8084'},
                  {label:'client',title:'Client',port:':8085'},
                  {label:'mfa',   title:'MFA',   port:':8086'},
                ].map(s => (
                  <div key={s.label} className="iad-node iad-service-node">
                    <div className="iad-node-label">{s.label}</div>
                    <div className="iad-node-title">{s.title}</div>
                    <div className="iad-node-port">{s.port}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wire → data */}
            <div className="iad-connector iad-l5">
              <div className="iad-wire iad-wire-green" />
              <div className="iad-arrow iad-arrow-green" />
            </div>

            {/* DATA LAYER */}
            <div className="iad-l5" style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%',maxWidth:540}}>
              <div className="iad-section-label">Persistence Layer</div>
              <div className="iad-data-grid">
                <div className="iad-node iad-data-node">
                  <div className="iad-node-label">Cache</div>
                  <div className="iad-node-title">Redis</div>
                  <div className="iad-node-port">:6379</div>
                  <div className="iad-chips">
                    <span className="iad-chip iad-chip-cyan">Sessions</span>
                    <span className="iad-chip iad-chip-cyan">OTPs</span>
                    <span className="iad-chip iad-chip-cyan">Blacklist</span>
                  </div>
                </div>
                <div className="iad-node iad-data-node">
                  <div className="iad-node-label">Database</div>
                  <div className="iad-node-title">PostgreSQL 16</div>
                  <div className="iad-chips">
                    {['_auth','_user','_realm','_rbac','_clients','_notif'].map(d => (
                      <span key={d} className="iad-chip iad-chip-cyan">{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Wire → kafka */}
            <div className="iad-connector iad-l6">
              <div className="iad-wire iad-wire-rose" />
              <div className="iad-arrow iad-arrow-rose" />
            </div>

            {/* KAFKA */}
            <div className="iad-l6" style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%',maxWidth:540}}>
              <div className="iad-section-label">Event Stream</div>
              <div className="iad-node iad-kafka-node" style={{width:'100%',textAlign:'center'}}>
                <span className="iad-node-tag" style={{background:'rgba(225,29,72,0.08)',color:'var(--rose)',border:'1px solid rgba(225,29,72,0.25)'}}>Message Bus</span>
                <div className="iad-node-label">Apache Kafka</div>
                <div className="iad-node-title">Event Stream · Async Communication</div>
                <div className="iad-topics">
                  {['user.created','auth.login.success','auth.login.failure','auth.logout','session.terminated','mfa.otp_sent'].map(t => (
                    <span key={t} className="iad-topic">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Fan kafka → consumers */}
            <div className="iad-l7" style={{width:'100%',maxWidth:400,height:40}}>
              <svg style={{width:'100%',height:40}} viewBox="0 0 400 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="iad-arr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L6,3 Z" fill="rgba(225,29,72,0.5)" />
                  </marker>
                </defs>
                <line x1="200" y1="0" x2="100" y2="38" stroke="rgba(225,29,72,0.35)" strokeWidth="1.5" markerEnd="url(#iad-arr2)" className="iad-flow-path" />
                <line x1="200" y1="0" x2="300" y2="38" stroke="rgba(225,29,72,0.35)" strokeWidth="1.5" markerEnd="url(#iad-arr2)" className="iad-flow-path" />
              </svg>
            </div>

            {/* CONSUMERS */}
            <div className="iad-l7" style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%',maxWidth:400}}>
              <div className="iad-section-label">Consumers</div>
              <div className="iad-two-grid">
                <div className="iad-node iad-kafka-node" style={{textAlign:'center'}}>
                  <div className="iad-node-label">session-service</div>
                  <div className="iad-node-title">Session</div>
                  <div className="iad-node-port">:8087</div>
                </div>
                <div className="iad-node iad-kafka-node" style={{textAlign:'center'}}>
                  <div className="iad-node-label">notification-service</div>
                  <div className="iad-node-title">Notification</div>
                  <div className="iad-node-port">:8088</div>
                </div>
              </div>
            </div>

            {/* Wire → outputs */}
            <div className="iad-connector iad-l8">
              <div className="iad-wire iad-wire-rose" />
              <div className="iad-arrow iad-arrow-rose" />
            </div>

            {/* OUTPUTS */}
            <div className="iad-l8" style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%',maxWidth:400}}>
              <div className="iad-section-label">Outputs</div>
              <div className="iad-two-grid">
                <div className="iad-node iad-out-node" style={{textAlign:'center'}}>
                  <div className="iad-node-label">Email</div>
                  <div className="iad-node-title">SMTP Server</div>
                  <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:9,color:'var(--text-muted)',marginTop:4}}>Notifications · Alerts</div>
                </div>
                <div className="iad-node iad-out-node" style={{textAlign:'center'}}>
                  <div className="iad-node-label">Management</div>
                  <div className="iad-node-title">Admin API</div>
                  <div className="iad-node-port" style={{color:'var(--text-muted)'}}>:8089</div>
                </div>
              </div>
            </div>

          </div>

          {/* INFO PANELS */}
          <div className="iad-panels">
            <div className="iad-panel">
              <div className="iad-panel-title"><span className="iad-panel-dot iad-dot-cyan" />Design Principles</div>
              {[['Isolation','DB per Service'],['Entry','Single Gateway'],['Services','Stateless'],['Consistency','Eventual (Kafka)'],['Tenancy','Multi (Realms)']].map(([k,v])=>(
                <div key={k} className="iad-panel-row"><span className="iad-panel-key">{k}</span><span className="iad-panel-value">{v}</span></div>
              ))}
            </div>
            <div className="iad-panel">
              <div className="iad-panel-title"><span className="iad-panel-dot iad-dot-green" />State Distribution</div>
              {[['PostgreSQL','Entities'],['Redis','Sessions · OTPs'],['Redis','Rate Counters'],['Redis','Token Blacklist'],['Kafka','Audit Trail']].map(([k,v],i)=>(
                <div key={i} className="iad-panel-row"><span className="iad-panel-key">{k}</span><span className="iad-panel-value">{v}</span></div>
              ))}
            </div>
            <div className="iad-panel">
              <div className="iad-panel-title"><span className="iad-panel-dot iad-dot-amber" />Security Model</div>
              {[['Gateway','JWT Validation'],['Services','permitAll'],['Realm scope','JWT claim'],['DB queries','realm_name pred'],['Auth Redis','TTL codes/tokens']].map(([k,v])=>(
                <div key={k} className="iad-panel-row"><span className="iad-panel-key">{k}</span><span className="iad-panel-value">{v}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}