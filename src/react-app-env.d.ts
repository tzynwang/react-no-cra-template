/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.jpg?url' {
  const src: string;
  export default src;
}

declare module '*.png?url' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  export default ReactComponent;
}

declare module '*.svg?url' {
  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
