import Link from 'next/link';
import { Container } from '@/components/Container';
import { site } from '@/lib/site';

export function Footer() {
	return (
		<footer className="border-t border-black/10 bg-white">
			<Container className="pb-0 pt-8 md:pt-9">
				<div className="grid items-start gap-8 border-b border-black/10 pb-7 md:grid-cols-[1.1fr_0.75fr_0.75fr]">
					<div>
						<div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-sky-500">Service Region</div>
						<p className="mt-3 max-w-3xl text-sm leading-7 text-black/72 md:text-base">{site.serviceArea}</p>
					</div>
					<div>
						<div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-sky-500">Contact</div>
						<div className="mt-3 grid gap-1.5 text-sm leading-7 text-black/72 md:text-base">
							<a href={site.phoneHref} className="transition hover:text-[#0A2A66]">
								{site.phoneDisplay}
							</a>
							<a href={`mailto:${site.email}`} className="transition hover:text-[#0A2A66]">
								{site.email}
							</a>
							<div className="mt-3 border-t border-black/10 pt-3">
								<div className="font-semibold text-[#0A2A66]">Luis Sandoval</div>
								<div className="text-xs font-semibold uppercase tracking-[0.14em] text-black/50 md:text-[0.72rem]">Chief Executive Officer</div>
							</div>
							<div className="mt-2">
								<div className="font-semibold text-[#0A2A66]">Rafael Mendez</div>
								<div className="text-xs font-semibold uppercase tracking-[0.14em] text-black/50 md:text-[0.72rem]">Project Manager</div>
							</div>
							<Link href="/contact" className="font-semibold uppercase tracking-[0.14em] text-[#0A2A66] transition hover:text-sky-500">
								Request An Estimate
							</Link>
						</div>
					</div>
					<div>
						<div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-sky-500">Follow</div>
						<div className="mt-3 flex flex-wrap gap-3">
							<a href={site.social.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#0A2A66] transition hover:border-[#0A2A66] hover:bg-sky-50">
								<InstagramBrandIcon />
								Instagram
							</a>
							<a href={site.social.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#0A2A66] transition hover:border-[#0A2A66] hover:bg-sky-50">
								<FacebookBrandIcon />
								Facebook
							</a>
						</div>
					</div>
				</div>
			</Container>
			<div className="bg-white px-6 py-4 text-center text-xs uppercase tracking-[0.18em] text-black/62">
				<div>Copyright © 2026 D1 Concrete. All Rights Reserved.</div>
			</div>
		</footer>
	);
}

function InstagramBrandIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
			<defs>
				<linearGradient id="ig-gradient-footer" x1="0%" y1="100%" x2="100%" y2="0%">
					<stop offset="0%" stopColor="#f58529" />
					<stop offset="50%" stopColor="#dd2a7b" />
					<stop offset="100%" stopColor="#515bd4" />
				</linearGradient>
			</defs>
			<rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-gradient-footer)" />
			<circle cx="12" cy="12" r="4.25" fill="none" stroke="#fff" strokeWidth="2" />
			<circle cx="17.2" cy="6.8" r="1.2" fill="#fff" />
		</svg>
	);
}

function FacebookBrandIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
			<rect x="2" y="2" width="20" height="20" rx="5" fill="#1877F2" />
			<path d="M13.3 20v-6.2h2.1l.4-2.5h-2.5V9.7c0-.8.3-1.3 1.4-1.3h1.2V6.2c-.2 0-.9-.1-1.8-.1-1.8 0-3.1 1.1-3.1 3.3v1.9H9v2.5h2.1V20h2.2Z" fill="#fff" />
		</svg>
	);
}
