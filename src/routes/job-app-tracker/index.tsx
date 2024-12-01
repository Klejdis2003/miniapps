import { createFileRoute } from '@tanstack/react-router';
import Landing from '@/components/pages/job-app-tracker/homepage.tsx';

export const Route = createFileRoute('/job-app-tracker/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={'flex justify-center w-full'}>
      <Landing />
    </div>
  );
}
