'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Container } from '@/components/Container';

type SectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  invert?: boolean;
};

export function Section({ eyebrow, title, description, children, className, invert = false }: SectionProps) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <Container className="py-20 md:py-24">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {eyebrow ? (
            <motion.span
              className={cn('eyebrow', invert && 'text-sky-300')}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              viewport={{ once: true, amount: 0.4 }}
            >
              {eyebrow}
            </motion.span>
          ) : null}
          <motion.h2
            className={cn('section-title mt-5 font-[var(--font-heading)]', invert && 'text-white')}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            {title}
          </motion.h2>
          {description ? (
            <motion.p
              className={cn('mt-5 w-full text-base leading-7 md:text-lg', invert && 'text-white')}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              viewport={{ once: true, amount: 0.35 }}
            >
              {description}
            </motion.p>
          ) : null}
        </motion.div>
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06 }}
          viewport={{ once: true, amount: 0.12, margin: '0px 0px -10% 0px' }}
        >
          {children}
        </motion.div>
      </Container>
    </motion.section>
  );
}