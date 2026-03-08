import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'OpenGate IAM', template: '%s | OpenGate IAM' },
  description: 'Open-source self-hosted Identity & Access Management — OAuth2.1, OIDC, PKCE, MFA, RBAC, Multi-Realm.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
