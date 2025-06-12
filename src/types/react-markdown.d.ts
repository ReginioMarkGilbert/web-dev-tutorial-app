declare module 'react-markdown' {
  import { ComponentType } from 'react';

  export interface ReactMarkdownProps {
    children: string;
    components?: Record<string, ComponentType<any>>;
    remarkPlugins?: any[];
    rehypePlugins?: any[];
    [key: string]: any;
  }

  const ReactMarkdown: ComponentType<ReactMarkdownProps>;

  export default ReactMarkdown;
}

declare module 'react-syntax-highlighter' {
  import { ComponentType } from 'react';

  export interface SyntaxHighlighterProps {
    children: string;
    style?: any;
    language?: string;
    PreTag?: string | ComponentType<any>;
    [key: string]: any;
  }

  export const Prism: ComponentType<SyntaxHighlighterProps>;
  export const Light: ComponentType<SyntaxHighlighterProps>;
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  export const oneDark: any;
  export const dark: any;
  export const prism: any;
  export const vscDarkPlus: any;
  export const atomDark: any;
  export const dracula: any;
}