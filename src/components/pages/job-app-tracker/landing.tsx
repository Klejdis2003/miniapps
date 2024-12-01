import { Button } from '@/components/ui/button.tsx';
import { ArrowRight } from 'lucide-react';
import FeatureCard from '@/components/ui/feature-card.tsx';
import featureFlags, { ConditionalFeature } from '@/feature-flags.tsx';

interface LandingProps {
  onGuestClick: () => void;
  onLoginClick: () => void;
}

export default function Landing({ onGuestClick, onLoginClick }: LandingProps) {
  return (
    <div className="flex flex-col min-h-screen w-full items-center">
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Track Your Job Applications with Ease
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Stay organized, never miss a deadline, and land your dream job
                  with our intuitive job application tracker.
                </p>
              </div>
              <div className="space-x-4">
                <Button onClick={onGuestClick}>
                  Continue as Guest <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <ConditionalFeature
                  flag={featureFlags.login}
                  inDevChildrenProps={{ disabled: true }}
                >
                  <Button variant="outline" onClick={onLoginClick}>
                    Log In
                  </Button>
                </ConditionalFeature>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="py-12 md:py-24 lg:py-32 bg-zinc-100 dark:bg-zinc-900 flex justify-center"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Features
            </h2>
            <div className="flex flex-col gap-y-7 items-center md:flex-row md:justify-between">
              <FeatureCard
                title="Track Applications"
                description="Keep all your job applications in one place, with status updates and deadlines."
              />
              <ConditionalFeature flag={featureFlags.login}>
                <FeatureCard
                  title="Cloud Sync"
                  description="Access your data from any device when you log in (or keep it local as a guest)."
                />
              </ConditionalFeature>
              <ConditionalFeature flag={featureFlags.reminders}>
                <FeatureCard
                  title="Reminders"
                  description="Never miss an interview or application deadline with built-in reminders."
                />
              </ConditionalFeature>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
