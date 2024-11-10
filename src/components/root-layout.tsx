import { ReactNode } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import MainAnimation from '@/components/main-animation.tsx';
import Navbar from '@/components/navbar.tsx';
import { NavRoute } from '@/routes/__root.tsx';
import ExtendedBreadcrumb from '@/components/ui/extended-breadcrumb.tsx';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const currentPath = useLocation().pathname;
  return (
    <>
      <div
        className={
          'flex flex-col justify-center items-center  w-screen h-screen p-3 gap-2 bg-background text-foreground'
        }
      >
        <Navbar />
        <ExtendedBreadcrumb
          pathname={currentPath as NavRoute}
          className={'w-fit'}
        />
        <AnimatePresence mode={'wait'}>
          <MainAnimation animationKey={currentPath}>{children}</MainAnimation>
        </AnimatePresence>
      </div>
    </>
  );
}
