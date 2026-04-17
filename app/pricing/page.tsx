import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';
import { buttonStyles } from '@/components/Button';

const pricingCards = [
  {
    name: 'Small Scope',
    price: 'Custom Quote',
    description: 'For repair work, compact residential pours, and tightly defined replacements.',
    points: ['Fast site review', 'Straightforward scope alignment', 'Good fit for single-area upgrades']
  },
  {
    name: 'Property Upgrade',
    price: 'Custom Quote',
    description: 'For more visible residential improvements where finish quality and layout matter.',
    points: ['Driveways, patios, pool decks, and walkways', 'Design-minded finish options', 'Clear estimate expectations'],
    featured: true
  },
  {
    name: 'Commercial Scope',
    price: 'Bid / Estimate',
    description: 'For commercial and multi-phase work with scheduling, access, or coordination considerations.',
    points: ['Site walkthrough or plan review', 'Scope coordination', 'Built for evolving project needs']
  }
];

export default function PricingPage() {
  return (
    <div className="theme-shell">
      <PageHeader
        eyebrow="Pricing"
        title="Pricing is framed honestly: concrete work is scoped first, then quoted properly."
        description="Because exact pricing depends on prep, access, finish, demolition, reinforcement, and site conditions, this page uses structured guidance instead of fake flat rates. That reads more credible and converts better for serious buyers."
        className="theme-metal"
      />

      <Section className="theme-light" eyebrow="Guide" title="A quote usually moves with five main variables." description="This gives prospects context without boxing the company into made-up numbers.">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {['Square footage and thickness', 'Removal or demo requirements', 'Finish level and decorative details', 'Site access, slope, and staging', 'Reinforcement and drainage needs'].map((item, index) => (
            <Reveal key={item} delay={index * 0.05}>
              <article className="panel p-5">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">Factor</div>
                <h2 className="mt-4 text-xl font-semibold text-[#0A2A66]">{item}</h2>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="theme-dark" invert eyebrow="Estimate Paths" title="Use pricing content to qualify, not to trap the business." description="These cards position the company well while leaving room for real-world site conditions.">
        <div className="grid gap-5 lg:grid-cols-3">
          {pricingCards.map((card, index) => (
            <Reveal key={card.name} delay={index * 0.06} className="h-full">
              <article className={`panel theme-dark flex h-full flex-col border-white/15 p-6 md:p-8 ${card.featured ? 'border-sky-300/60' : ''}`}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-2xl font-semibold text-white">{card.name}</h2>
                  {card.featured ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/55 bg-emerald-300/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                      Popular
                    </span>
                  ) : null}
                </div>
                <div className="mt-4 text-3xl font-semibold text-white">{card.price}</div>
                <p className="mt-4 text-sm leading-7 text-white">{card.description}</p>
                <div className="mt-5 grid gap-3">
                  {card.points.map((point) => (
                    <div key={point} className="flex items-start gap-3 text-sm text-white">
                      <CheckCircle2 size={18} className="mt-0.5 text-sky-500" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <Link href="/contact" className={buttonStyles('primary')}>
            Request A Quote
          </Link>
        </Reveal>
      </Section>
    </div>
  );
}