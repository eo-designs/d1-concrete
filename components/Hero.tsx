import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { media } from '@/lib/media';

export function Hero() {
	return (
		<section className="relative h-[calc(100svh-78px)] min-h-[38rem] overflow-hidden bg-white text-white md:h-[calc(100svh-82px)] md:min-h-[44rem]">
			{media.homeBackgroundVideo ? (
				<video className="absolute inset-0 h-full w-full object-cover" src={media.homeBackgroundVideo} poster={media.heroPosterImage} autoPlay muted loop playsInline preload="auto" />
			) : (
				<div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${media.heroPosterImage})` }} />
			)}
			<div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.46),rgba(0,0,0,0.18)_50%,rgba(0,0,0,0.5))]" />
			<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0)_32%,rgba(5,7,12,0.24)_100%)]" />
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_34%,rgba(79,179,255,0.22),transparent_34%),radial-gradient(circle_at_66%_78%,rgba(95,143,214,0.16),transparent_36%)]" />
			<Container className="relative flex h-full flex-col justify-between py-12 md:py-16">
				<div className="grid flex-1 items-center gap-10 pt-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
					<Reveal className="lg:justify-self-center">
						<div className="text-center lg:text-left">
							<div className="inline-flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-sky-200/90 md:text-xs">
								<span className="h-px w-10 bg-sky-200/70" />
								Northern California Concrete
								<span className="h-px w-10 bg-sky-200/70" />
							</div>
							<h1 className="mt-5 space-y-2 font-[var(--font-heading)] text-[3.6rem] font-extrabold uppercase leading-[1.04] md:text-[5.8rem] md:leading-[1.06]">
								<span className="block bg-[linear-gradient(130deg,#ffffff_0%,#dff1ff_48%,#7fb6f0_100%)] bg-clip-text text-transparent [-webkit-text-fill-color:transparent] [text-shadow:0_10px_32px_rgba(3,7,18,0.35)]">Exceptional</span>
								<span className="block bg-[linear-gradient(130deg,#ffffff_0%,#f4f9ff_50%,#b8d5f5_100%)] bg-clip-text text-transparent [-webkit-text-fill-color:transparent] [text-shadow:0_10px_32px_rgba(3,7,18,0.35)]">Quality &amp;</span>
								<span className="block bg-[linear-gradient(130deg,#ffffff_0%,#e8f4ff_48%,#4fb3ff_100%)] bg-clip-text text-transparent [-webkit-text-fill-color:transparent] [text-shadow:0_10px_32px_rgba(3,7,18,0.35)]">Experience</span>
							</h1>
						</div>
					</Reveal>
					<Reveal className="pt-1 lg:justify-self-center" delay={0.08}>
						<div className="max-w-4xl text-center lg:text-left">
							<p className="text-[1.58rem] font-semibold leading-[1.9] text-white md:text-[2.25rem] md:leading-[1.85]">
								Exceptional Quality &amp; Experience
							</p>
							<p className="mt-4 text-[1.16rem] leading-10 text-white md:text-[1.5rem] md:leading-[2.05]">
								From residential upgrades to demanding commercial scopes, we deliver durable concrete craftsmanship, immaculate execution, and dependable project support that earns trust through the finished work.
							</p>
							<div className="mt-5 h-px w-full animate-pulse-line bg-gradient-to-r from-transparent via-sky-200/80 to-transparent" />
						</div>
					</Reveal>
				</div>
				<Reveal className="flex justify-center pb-1 md:pb-4" delay={0.15} onLoad>
					<Link
						href="/contact"
						className="group inline-flex items-center gap-4 rounded-full border border-white/35 bg-white/12 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-[0_20px_48px_rgba(0,0,0,0.24)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-[#0A2A66]/78 sm:px-7 sm:py-4 sm:text-sm"
					>
						<span className="whitespace-nowrap">Get Your Free Estimate Today</span>
						<span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0A2A66] transition group-hover:bg-sky-300">
							<ArrowRight size={18} />
						</span>
					</Link>
				</Reveal>
			</Container>
		</section>
	);
}
