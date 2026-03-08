import type { MDXComponents } from 'mdx/types';
import { Callout } from '@/components/docs/Callout';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { ServiceCard } from '@/components/docs/ServiceCard';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Callout,
    CodeBlock,
    ServiceCard,
  };
}
