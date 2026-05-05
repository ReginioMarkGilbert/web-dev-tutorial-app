declare module 'react-markdown' {
  import { ComponentType } from 'react';

  export interface ReactMarkdownProps {
    children: string;
    components?: Record<string, ComponentType<Record<string, unknown>>>;
    remarkPlugins?: unknown[];
    rehypePlugins?: unknown[];
    [key: string]: unknown;
  }

  const ReactMarkdown: ComponentType<ReactMarkdownProps>;

  export default ReactMarkdown;
}

declare module 'react-syntax-highlighter' {
  import { ComponentType } from 'react';

  export interface SyntaxHighlighterProps {
    children: string;
    style?: unknown;
    language?: string;
    PreTag?: string | ComponentType<Record<string, unknown>>;
    [key: string]: unknown;
  }

  export const Prism: ComponentType<SyntaxHighlighterProps>;
  export const Light: ComponentType<SyntaxHighlighterProps>;
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  export const oneDark: unknown;
  export const dark: unknown;
  export const prism: unknown;
  export const vscDarkPlus: unknown;
  export const atomDark: unknown;
  export const dracula: unknown;
}
