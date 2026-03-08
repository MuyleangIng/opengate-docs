interface ServiceCardProps {
  name: string;
  port: number;
  description: string;
  tech?: string[];
}

export function ServiceCard({ name, port, description, tech = [] }: ServiceCardProps) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 hover:border-cyan-300 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-2">
        <p className="font-semibold text-gray-900">{name}</p>
        <span className="text-xs font-mono text-white px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: '#0D1B2A' }}>
          :{port}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      {tech.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tech.map(t => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}
