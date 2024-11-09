import {
  Outlet,
  createRootRoute,
  Link,
  useLocation,
} from '@tanstack/react-router';
import ThemeToggle from '@/components/theme-toggle.tsx';
import { FileRoutesByTo } from '@/routeTree.gen.ts';
import { Button } from '@/components/ui/button.tsx';
import RootLayout from '@/components/root-layout.tsx';

export const Route = createRootRoute({
  component: RootComponent,
});

export type NavRoute = keyof FileRoutesByTo;

function RootComponent() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}
