import { Outlet, createRootRoute } from '@tanstack/react-router';
import { FileRoutesByTo } from '@/routeTree.gen.ts';
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
