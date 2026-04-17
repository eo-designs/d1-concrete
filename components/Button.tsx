import { cn } from '@/lib/utils';

export function buttonStyles(variant: 'primary' | 'secondary' | 'ghost' = 'primary') {
	return cn(
		'inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] transition-colors duration-200',
		variant === 'primary' && 'border-sky-200 bg-sky-300 text-[#0A2A66] shadow-[0_16px_34px_rgba(79,179,255,0.42)] hover:bg-sky-200',
		variant === 'secondary' && 'border-sky-200 bg-sky-300 text-[#0A2A66] shadow-[0_16px_34px_rgba(79,179,255,0.42)] hover:bg-sky-200',
		variant === 'ghost' && 'border-transparent px-0 py-0 text-[#0A2A66] hover:text-sky-500'
	);
}
