'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Container } from '@/components/Container';

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  invert?: boolean;
};

export function PageHeader({ eyebrow, title, description, className, invert = false }: PageHeaderProps) {
  return (
    <motion.section
      className={cn('border-b pt-12 md:pt-14', invert ? 'border-white/15 bg-[#05070c]' : 'border-black/10 bg-white', className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <Container className="pt-8 pb-10 md:pt-9 md:pb-12">
        <motion.div
          className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2, margin: '0px 0px -12% 0px' }}
        >
          <div>
            <motion.div className={cn('inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.22em]', invert ? 'text-sky-300' : 'text-sky-500')} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.04 }} viewport={{ once: true, amount: 0.3 }}>
              <span>{eyebrow}</span>
              <span className={cn('h-px w-16', invert ? 'bg-sky-300/70' : 'bg-sky-500')} />
            </motion.div>
            <motion.h1
                className={cn('mt-6 w-full font-[var(--font-heading)] text-4xl font-bold uppercase leading-[0.96] md:text-6xl', invert ? 'text-white' : 'text-[#0A2A66]')}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              viewport={{ once: true, amount: 0.35 }}
            >
              {title}
            </motion.h1>
          </div>
          <motion.p
              className={cn('w-full pt-3 text-[1.16rem] leading-9 md:text-[1.5rem] md:leading-10', invert ? 'text-white/82' : 'text-black/74')}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            viewport={{ once: true, amount: 0.35 }}
          >
            {description}
          </motion.p>
        </motion.div>
      </Container>
    </motion.section>
  );
}