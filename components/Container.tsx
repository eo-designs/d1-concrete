import { cn } from '@/lib/utils';

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16', className)}>{children}</div>;
}