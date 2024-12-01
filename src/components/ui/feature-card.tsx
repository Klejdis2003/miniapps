import { CheckCircle } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <CheckCircle className="h-12 w-12 mb-4 text-primary" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}
