import { createFileRoute, useParams, useSearch } from '@tanstack/react-router';
import { z } from 'zod';
import FuturePredictionDisplay from '@/components/pages/future-prediction-display.tsx';

const searchParamsSchema = z.object({
  v: z.string().base64().optional(), //named v to hide what it does from end users
});
export const Route = createFileRoute('/future-prediction/')({
  component: RouteComponent,
  validateSearch: searchParamsSchema,
});

function RouteComponent() {
  const { v } = Route.useSearch();
  const defaultMessage = 'You have a bright future ahead of you!';
  const message = v ? atob(v) : defaultMessage;
  return <FuturePredictionDisplay futurePrediction={message} />;
}
