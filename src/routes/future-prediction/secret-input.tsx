import * as React from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import SecretInputForm from '@/components/pages/secret-input-form.tsx';

export const Route = createFileRoute('/future-prediction/secret-input')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  return <SecretInputForm onSubmit={(secret) => onSubmit(secret)} />;

  async function onSubmit(value: string) {
    const base64Value = btoa(value);
    await router.navigate({
      to: '/future-prediction',
      search: { v: base64Value },
    });
  }
}
