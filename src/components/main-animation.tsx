import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function MainAnimation({
  animationKey,
  children,
}: Readonly<{ animationKey: string; children: ReactNode }>) {
  return (
    <motion.div
      key={animationKey}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={'w-full h-full px-3'}
    >
      {children}
    </motion.div>
  );
}
