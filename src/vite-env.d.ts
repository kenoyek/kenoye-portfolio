/// <reference types="vite/client" />

declare module "*.mjs" {
  export const canonicalOrigin: string;
  export const publicRoutes: Array<{
    path: string;
    title: string;
    description: string;
    image: string;
    type: string;
    priority: string;
    changefreq: string;
  }>;
  export const absoluteUrl: (path: string) => string;
}
