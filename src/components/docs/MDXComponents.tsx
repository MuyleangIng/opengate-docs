import { ReactNode } from 'react';
import { Callout } from './Callout';
import { CodeBlock } from './CodeBlock';
import { ServiceCard } from './ServiceCard';

export { Callout, CodeBlock, ServiceCard };

export function MDXComponents({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
