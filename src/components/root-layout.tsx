import { ReactNode } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import MainAnimation from '@/components/main-animation.tsx';
import Navbar from '@/components/navbar.tsx';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const currentPath = useLocation().pathname;
  return (
    <>
      <div
        className={
          'flex flex-col w-screen h-screen p-3 bg-background text-foreground'
        }
      >
        <Navbar />
        <AnimatePresence mode={'wait'}>
          <MainAnimation animationKey={currentPath}>{children}</MainAnimation>
        </AnimatePresence>
      </div>
    </>
  );
}
