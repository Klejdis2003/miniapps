import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dices, LucideCalendarClock, WandSparklesIcon } from 'lucide-react';
import { ComponentType, SVGProps } from 'react';
import { Link } from '@tanstack/react-router';
import { NavRoute } from '@/routes/__root.tsx';

interface App {
  name: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  path?: NavRoute;
}

const apps: App[] = [
  {
    name: 'Future Predictor',
    description: 'Provide your details and you will see the future',
    icon: WandSparklesIcon,
    path: '/future-prediction',
  },
  {
    name: 'Random Generator',
    description: 'Generate any random value you want',
    icon: Dices,
    path: '/random-generator',
  },
  {
    name: 'Job Application Tracker',
    description:
      'Track your job applications, interviews, and offers with secure cloud storage',
    icon: LucideCalendarClock,
    path: '/job-app-tracker',
  },
];

export default function Homepage() {
  return (
    <div className="h-full flex flex-col bg-background text-foreground">
      <main className="container flex-grow mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Your Mini-Apps Collection</h2>
          <p className="text-xl text-muted-foreground">
            A suite of efficient and user-friendly applications to boost your
            productivity.
          </p>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, index) => (
            <Card key={index}>
              <CardHeader>
                <app.icon className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>{app.name}</CardTitle>
                <CardDescription className={'min-h-10'}>
                  {app.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className={''}>
                <Button variant="secondary" className="w-full" asChild>
                  <Link to={app.path}>Open App</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>

        <section className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>About Klejdis mini-apps</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Klejdis mini-apps is a collection of small, focused applications
                designed to enhance your productivity. Each app is built with
                simplicity and efficiency in mind, allowing you to quickly
                accomplish tasks without unnecessary complexity.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t w-full">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Klejdis mini-apps. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
