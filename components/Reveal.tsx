'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  onLoad?: boolean;
}>;

export function Reveal({ children, className, delay = 0, onLoad = false }: RevealProps) {
  const pathname = usePathname();

  if (onLoad) {
    return (
      <motion.div
        key={`${pathname}-${delay}`}
        className={className}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      key={`${pathname}-${delay}`}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -10% 0px' }}
    >
      {children}
    </motion.div>
  );
}