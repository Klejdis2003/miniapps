import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { FileRoutesByTo } from '@/routeTree.gen.ts';
import RootLayout from '@/components/root-layout.tsx';

interface NavContext {
  from?: keyof FileRoutesByTo;
}

export const Route = createRootRouteWithContext<NavContext>()({
  component: RootComponent,
  onLeave: ({ context, pathname }) => {
    context.from = pathname as keyof FileRoutesByTo;
  },
});

export type NavRoute = keyof FileRoutesByTo;

function RootComponent() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}
