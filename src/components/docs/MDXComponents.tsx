'use client';
import { MDXProvider } from '@mdx-js/react';
import { ReactNode } from 'react';
import { Callout } from './Callout';
import { CodeBlock } from './CodeBlock';
import { ServiceCard } from './ServiceCard';

const components = { Callout, CodeBlock, ServiceCard };

export function MDXComponents({ children }: { children: ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
