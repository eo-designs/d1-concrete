import { Building2, Hammer, Home, LayoutGrid, ShieldCheck, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';

const residential = [
  {
    title: 'Driveways and entry sequences',
    body: 'Fresh pours, widened access, replacement panels, and entry work designed to feel clean and proportional to the property.',
    icon: Home
  },
  {
    title: 'Patios and backyard concrete',
    body: 'Outdoor living surfaces built for real use, with layout and finish choices that stay sharp in full daylight.',
    icon: Sparkles
  },
  {
    title: 'Decorative and textured finishes',
    body: 'Stamped, broom, exposed aggregate, borders, and sawcut patterns handled with restraint and consistency.',
    icon: LayoutGrid
  }
];

const commercial = [
  {
    title: 'Site flatwork and access routes',
    body: 'Pads, sidewalks, ramps, and concrete areas that need to perform under regular traffic and inspection requirements.',
    icon: Building2
  },
  {
    title: 'Tenant improvement support',
    body: 'Concrete scopes that fit into active commercial work without creating unnecessary sequencing issues.',
    icon: Hammer
  },
  {
    title: 'Durability-first replacement work',
    body: 'Demo, prep, and replacement with attention to substrate condition, reinforcement, and long-term wear.',
    icon: ShieldCheck
  }
];

export default function ServicesPage() {
  return (
    <div className="theme-shell">
      <PageHeader
        eyebrow="Services"
        title="Concrete services designed for high visibility spaces and high consequence work."
        description="From backyard slabs to commercial site work, every scope is handled by the same crew, the same standards, and the same expectation of clean execution."
        className="theme-metal"
      />

      <Section className="theme-light" eyebrow="Residential" title="Residential concrete that lifts the whole property." description="Homeowners notice edge quality, finish consistency, slope, and how the work fits the house. These services are framed around that reality.">
        <div className="grid gap-5 md:grid-cols-3">
          {residential.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal key={item.title} delay={index * 0.06} className="h-full">
                <article className="panel theme-dark flex h-full flex-col border-white/15 p-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/8">
                    <Icon size={28} className="text-sky-400" />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold text-white">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-white">{item.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section className="theme-dark" invert eyebrow="Commercial" title="Commercial work that respects schedule, logistics, and finish standards." description="Commercial buyers are usually screening for predictability. The content here is structured to reinforce that, without pretending every project is identical.">
        <div className="grid gap-5 md:grid-cols-3">
          {commercial.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal key={item.title} delay={index * 0.06} className="h-full">
                <article className="panel theme-dark flex h-full flex-col border-white/15 p-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/8">
                    <Icon size={28} className="text-sky-400" />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold text-white">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-white">{item.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </div>
  );
}