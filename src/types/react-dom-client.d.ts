// This file provides type declarations for react-dom/client
declare module 'react-dom/client' {
  import React from 'react';
  
  export interface Root {
    render(children: React.ReactNode): void;
    unmount(): void;
  }
  
  export function createRoot(container: Element | DocumentFragment | null): Root;
  export function hydrateRoot(
    container: Element | DocumentFragment,
    initialChildren: React.ReactNode
  ): Root;
}
