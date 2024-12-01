import * as React from 'react';
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '@/globals.ts';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast.ts';
import { useTheme } from '@/components/theme-provider.tsx';
import LoginForm from '@/components/pages/auth/login-page.tsx';

const searchParamsSchema = z.object({
  reason: z.string().optional(),
  origin: z.string().optional(),
});
export const Route = createFileRoute('/auth/login/')({
  component: RouteComponent,
  validateSearch: searchParamsSchema,
});

function RouteComponent() {
  const { reason, origin } = Route.useSearch();

  const router = useRouter();
  if (reason) toast({ title: 'Login Required', description: reason });
  return (
    <div className={'flex w-full h-full items-center justify-center '}>
      <LoginForm
        onSuccessfulLogin={async () => {
          if (origin) await router.navigate({ to: origin });
        }}
      />
    </div>
  );
}
