import { ReactNode } from 'react';
import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

type Variant = 'info' | 'warning' | 'success' | 'danger';

const config: Record<Variant, { icon: React.ElementType; bg: string; border: string; text: string }> = {
  info:    { icon: Info,          bg: 'bg-blue-50',   border: 'border-blue-200',  text: 'text-blue-800' },
  warning: { icon: AlertTriangle, bg: 'bg-yellow-50', border: 'border-yellow-200',text: 'text-yellow-800' },
  success: { icon: CheckCircle,   bg: 'bg-green-50',  border: 'border-green-200', text: 'text-green-800' },
  danger:  { icon: XCircle,       bg: 'bg-red-50',    border: 'border-red-200',   text: 'text-red-800' },
};

export function Callout({ children, variant = 'info', title }: { children: ReactNode; variant?: Variant; title?: string }) {
  const { icon: Icon, bg, border, text } = config[variant];
  return (
    <div className={`flex gap-3 p-4 rounded-xl border ${bg} ${border} my-4`}>
      <Icon size={18} className={`flex-shrink-0 mt-0.5 ${text}`} />
      <div className={`text-sm ${text}`}>
        {title && <p className="font-semibold mb-1">{title}</p>}
        {children}
      </div>
    </div>
  );
}
