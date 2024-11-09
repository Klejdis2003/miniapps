import '@/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen.ts';
import { ThemeProvider } from '@/components/theme-provider.tsx';

const router = createRouter({ routeTree, basepath: '/miscellaneous' });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme={'system'} storageKey={'ui-theme'}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
