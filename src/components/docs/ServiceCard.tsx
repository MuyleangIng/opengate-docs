import React from 'react';
import './ServiceCard.css';

interface ServiceCardProps {
  name: string;
  port: number;
  description: string;
  tech: string[];
}

const SERVICE_META: Record<string, { color: string; bg: string; border: string; icon: string; label: string }> = {
  'gateway':      { color: '#4f46e5', bg: 'rgba(79,70,229,0.07)',   border: 'rgba(79,70,229,0.18)',   icon: '⟶',  label: 'Gateway'      },
  'auth':         { color: '#059669', bg: 'rgba(5,150,105,0.07)',   border: 'rgba(5,150,105,0.18)',   icon: '🔐', label: 'Auth'         },
  'user':         { color: '#7c3aed', bg: 'rgba(124,58,237,0.07)',  border: 'rgba(124,58,237,0.18)',  icon: '👤', label: 'User'         },
  'realm':        { color: '#0891b2', bg: 'rgba(8,145,178,0.07)',   border: 'rgba(8,145,178,0.18)',   icon: '🏛',  label: 'Realm'        },
  'rbac':         { color: '#d97706', bg: 'rgba(217,119,6,0.07)',   border: 'rgba(217,119,6,0.18)',   icon: '🛡',  label: 'RBAC'         },
  'client':       { color: '#db2777', bg: 'rgba(219,39,119,0.07)',  border: 'rgba(219,39,119,0.18)',  icon: '🔗', label: 'Client'       },
  'mfa':          { color: '#dc2626', bg: 'rgba(220,38,38,0.07)',   border: 'rgba(220,38,38,0.18)',   icon: '🔑', label: 'MFA'          },
  'session':      { color: '#2563eb', bg: 'rgba(37,99,235,0.07)',   border: 'rgba(37,99,235,0.18)',   icon: '⏱',  label: 'Session'      },
  'notification': { color: '#7c3aed', bg: 'rgba(124,58,237,0.07)', border: 'rgba(124,58,237,0.18)',  icon: '✉',  label: 'Notification' },
  'admin':        { color: '#475569', bg: 'rgba(71,85,105,0.07)',   border: 'rgba(71,85,105,0.18)',   icon: '⚙',  label: 'Admin API'    },
};

const DEFAULT_META = { color: '#6366f1', bg: 'rgba(99,102,241,0.07)', border: 'rgba(99,102,241,0.18)', icon: '◈', label: 'Service' };

function resolveSlug(name: string): string {
  // opengate-gateway → gateway
  // opengate-auth-service → auth
  // opengate-admin-api → admin
  return name
    .replace(/^opengate-/, '')
    .replace(/-service$/, '')
    .replace(/-api$/, '');
}

export function ServiceCard({ name, port, description, tech }: ServiceCardProps) {
  const slug = resolveSlug(name);
  const meta = SERVICE_META[slug] ?? DEFAULT_META;

  return (
    <div
      className="sc-card"
      style={{
        '--sc-color':  meta.color,
        '--sc-bg':     meta.bg,
        '--sc-border': meta.border,
      } as React.CSSProperties}
    >
      <div className="sc-accent-bar" />

      <div className="sc-body">
        {/* Header */}
        <div className="sc-header">
          <div className="sc-identity">
            <div className="sc-icon">{meta.icon}</div>
            <div className="sc-name-block">
              <span className="sc-package">opengate / {slug}</span>
              <span className="sc-name">{meta.label}</span>
            </div>
          </div>
          <div className="sc-port-badge">
            <span className="sc-port-dot" />
            <span className="sc-port-text">:{port}</span>
          </div>
        </div>

        {/* Description */}
        <p className="sc-desc">{description}</p>

        {/* Tech chips */}
        <div className="sc-footer">
          {tech.map(t => (
            <span key={t} className="sc-chip">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}