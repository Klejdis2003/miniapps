import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import RandomGeneratorHomepage from '@/components/pages/random-generator/homepage.tsx';

export const Route = createFileRoute('/random-generator/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <RandomGeneratorHomepage />;
}
