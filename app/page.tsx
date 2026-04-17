import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, HardHat, Home, MapPinned, ShieldCheck, Sparkles, Waves } from 'lucide-react';
import { Hero } from '@/components/Hero';
import { Container } from '@/components/Container';
import { buttonStyles } from '@/components/Button';
import { Reveal } from '@/components/Reveal';

const serviceGrid = [
  { title: 'Brick & Block Masonry Installation', icon: Home },
  { title: 'Concrete Repair & Restoration', icon: HardHat },
  { title: 'Custom Finish Concrete', icon: Sparkles },
  { title: 'Retaining Wall Construction', icon: MapPinned },
  { title: 'Commercial Concrete Services', icon: ShieldCheck },
  { title: 'Decorative & Detail Finishes', icon: Waves }
];

const servicedCounties = [
  'San Joaquin County',
  'Sacramento County',
  'Stanislaus County',
  'Solano County',
  'Alameda County',
  'Contra Costa County',
  'Yolo County'
];

const eyebrowClassName = 'inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.22em] text-sky-500';
const sectionHeadingClassName = 'mt-6 w-full font-[var(--font-heading)] text-4xl font-bold uppercase leading-[0.96] text-[#0A2A66] md:text-5xl';
const leadCopyClassName = 'w-full text-[1.375rem] leading-[1.45] text-black/84 md:text-[1.75rem]';
const bodyCopyClassName = 'mt-6 w-full text-base leading-8 text-black/72 md:text-lg';
export default async function HomePage() {
  return (
    <>
      <Reveal>
        <Hero />
      </Reveal>

      <section id="service-areas" className="bg-white">
        <Container className="py-20 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div>
                <div className={eyebrowClassName}>
                  <span>About Us</span>
                  <span className="h-px w-16 bg-sky-500" />
                </div>
                <h2 className={sectionHeadingClassName}>
                  About
                  <br />
                  D1 Concrete
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div>
                <p className={leadCopyClassName}>
                  D1 Concrete proudly serves Northern California specializing in expert residential and commercial concrete solutions.
                </p>
                <p className={bodyCopyClassName}>
                  With experienced field crews and dependable project coordination, we bring the manpower and discipline serious concrete work demands. From commercial buildings and site walls to driveways, patios, and custom residential upgrades, our team is committed to delivering durable, clean concrete work that meets schedule and exceeds expectations.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-20 text-center" delay={0.12}>
            <Image
              src="/assets/brand/logo.png?v=20260413"
              alt="D1 Concrete logo"
              width={310}
              height={128}
              sizes="(min-width: 768px) 310px, 250px"
              className="mx-auto h-28 w-[250px] object-contain md:h-32 md:w-[310px]"
              unoptimized
            />
            <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm font-semibold uppercase tracking-[0.16em] text-sky-500">
              {[
                'Gas Stations',
                'Single-Family Backyards',
                'Warehouses',
                'Commercial Building Sites',
                'Home Foundations',
                'Schools',
                'Stadiums',
                'Public City Sidewalks',
                'Amtrak Stations'
              ].map((item, index) => (
                <Reveal key={item} delay={index * 0.04}>
                  <span>{item}</span>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-[#05070c] text-white">
        <Container className="pt-20 pb-6 md:pt-24 md:pb-8">
          <Reveal>
            <div className="inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
              <span>Across California</span>
              <span className="h-px w-[48rem] max-w-[65vw] bg-white/20" />
            </div>
          </Reveal>
          <div className="mt-8 grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
            <Reveal>
              <div className="flex items-end justify-center">
                <div className="relative w-full max-w-[500px] lg:max-w-[540px]">
                  <Image src="/assets/brand/ca-map.png" alt="California service map" width={720} height={720} className="h-auto w-full" unoptimized />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col justify-between gap-10 text-center lg:items-center">
                <div>
                  <p className="max-w-4xl text-base font-semibold uppercase tracking-[0.2em] text-white md:text-[1.15rem]">
                    {servicedCounties.map((area, index) => (
                      <span key={area}>
                        {index > 0 ? ' • ' : ''}
                        {area}
                      </span>
                    ))}
                  </p>
                  <p className="mt-5 max-w-3xl text-base leading-7 text-white md:text-[1.15rem] md:leading-8">
                    Serving commercial sites, public works corridors, transportation properties, and residential neighborhoods throughout the region.
                  </p>
                </div>
                <div className="grid w-full gap-5 sm:grid-cols-2 sm:gap-6 lg:max-w-[44rem]">
                  <Reveal>
                    <div className="rounded-[2rem] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(143,163,191,0.09)_42%,rgba(255,255,255,0.05)_100%)] px-6 py-8 backdrop-blur-md">
                      <div className="text-7xl font-bold leading-none text-sky-400 md:text-8xl">55+</div>
                      <div className="mt-4 text-base font-semibold uppercase tracking-[0.18em] text-white md:text-[1.05rem]">Projects Completed</div>
                    </div>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <div className="rounded-[2rem] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(143,163,191,0.09)_42%,rgba(255,255,255,0.05)_100%)] px-6 py-8 backdrop-blur-md">
                      <div className="text-7xl font-bold leading-none text-sky-400 md:text-8xl">15+</div>
                      <div className="mt-4 text-base font-semibold uppercase tracking-[0.18em] text-white md:text-[1.05rem]">Business Partners</div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-[#05070c] text-white">
        <Container className="py-20 md:py-24">
          <Reveal>
            <div className="grid gap-10 border-b border-white/10 pb-14 md:grid-cols-[1fr_auto] md:items-end">
              <h2 className="max-w-3xl font-[var(--font-heading)] text-4xl font-bold uppercase leading-[0.96] text-sky-400 md:text-5xl">
                Concrete Experts.
                <br />
                Built On Precision.
              </h2>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#0A2A66] shadow-[0_16px_34px_rgba(79,179,255,0.42)] transition hover:bg-sky-200">
                Contact Us
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>

          <div className="border-b border-white/10 py-10">
            <div className="grid gap-5 md:grid-cols-3 md:gap-6">
              {['Licensed & insured across Northern California', 'Residential and commercial project support', 'Free estimates and direct communication'].map((item, index) => (
                <Reveal key={item} delay={index * 0.08}>
                  <div className="flex h-full items-start gap-4 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] px-6 py-7 text-lg font-medium leading-8 text-white/90 backdrop-blur-sm transition hover:border-white/18 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.05))] md:min-h-[148px] md:px-7 md:py-8 md:text-[1.2rem]">
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-sky-400" />
                    <span>{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="grid gap-y-12 border-b border-white/10 py-14 md:grid-cols-2 lg:grid-cols-3">
            {serviceGrid.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.08}>
                  <div className="px-6 text-center">
                    <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sky-400">
                      <Icon size={48} />
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold leading-tight text-white md:text-[1.75rem]">{item.title}</h3>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="grid gap-10 pt-10 pb-4 md:grid-cols-2">
            <Reveal>
              <div className="text-center">
                <div className="text-3xl font-semibold text-white md:text-[2rem]">All Services</div>
                <Link href="/services" className="mt-4 inline-block text-sm text-white/70 transition hover:text-sky-300">
                  Browse our full list of services
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="text-center">
                <div className="text-3xl font-semibold text-white md:text-[2rem]">Service Areas</div>
                <Link href="/#service-areas" className="mt-4 inline-block text-sm text-white/70 transition hover:text-sky-300">
                  Browse our service areas
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}