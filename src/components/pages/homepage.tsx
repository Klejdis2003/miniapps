import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AppWindow, Settings, WandSparklesIcon, Zap } from 'lucide-react';
import { ComponentType, SVGProps } from 'react';
import { Link } from '@tanstack/react-router';
import { NavRoute } from '@/routes/__root.tsx';

interface App {
  name: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  path?: NavRoute;
}

export default function Homepage() {
  const apps: App[] = [
    {
      name: 'Future Predictor',
      description: 'Provide your details and you will see the future',
      icon: WandSparklesIcon,
      path: '/future-prediction',
    },
    { name: 'Quick Notes', description: 'Jot down ideas instantly', icon: Zap },
    {
      name: 'Settings Hub',
      description: 'Manage all app settings in one place',
      icon: Settings,
    },
  ];

  return (
    <div className="h-full bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
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
                <CardDescription>{app.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full" asChild>
                  <Link to={app.path}>Open App</Link>
                </Button>
              </CardContent>
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

      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Klejdis mini-apps. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
