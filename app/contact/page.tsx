import { Mail, Phone } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Container } from '@/components/Container';
import { buttonStyles } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { site } from '@/lib/site';

export default function ContactPage() {
  return (
    <div className="theme-shell">
      <PageHeader
        eyebrow="Contact"
        title="The site keeps the next step obvious."
        description="For prompt assistance, please call our office directly. You may also submit your project scope by email, and our team will respond with informed next steps."
        className="theme-metal"
      />
      <Container className="py-16 md:py-20">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <section className="panel theme-light p-6 md:p-8">
              <h2 className="text-3xl font-semibold text-ink">Reach D1 Concrete</h2>
              <div className="mt-6 grid gap-4">
                <Reveal>
                  <a href={site.phoneHref} className="block rounded-3xl border border-black/10 bg-white p-5 transition hover:border-[#0A2A66]">
                    <div className="flex items-center gap-3 text-sky-500">
                      <Phone size={18} />
                      <span className="text-sm font-semibold uppercase tracking-[0.2em]">Phone</span>
                    </div>
                    <div className="mt-4 pl-[1.9rem] text-xl font-semibold leading-tight text-[#0A2A66]">{site.phoneDisplay}</div>
                  </a>
                </Reveal>
                <Reveal delay={0.05}>
                  <a href={`mailto:${site.email}`} className="block rounded-3xl border border-black/10 bg-white p-5 transition hover:border-[#0A2A66]">
                    <div className="flex items-center gap-3 text-sky-500">
                      <Mail size={18} />
                      <span className="text-sm font-semibold uppercase tracking-[0.2em]">Email</span>
                    </div>
                    <div className="mt-4 break-all pl-[1.9rem] text-xl font-semibold leading-tight text-[#0A2A66] sm:break-normal">{site.email}</div>
                  </a>
                </Reveal>
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.07}>
            <section className="panel theme-dark p-6 md:p-8">
              <h2 className="text-3xl font-semibold text-white">Get a Free Quote!</h2>
              <form className="mt-6 grid gap-4 md:grid-cols-2">
                <input className="field" placeholder="Full name" />
                <input className="field" placeholder="Phone number" />
                <input className="field md:col-span-2" placeholder="Email address" />
                <select className="field">
                  <option>Residential project</option>
                  <option>Commercial project</option>
                  <option>Not sure yet</option>
                </select>
                <input className="field" placeholder="City / area" />
                <textarea className="field min-h-40 md:col-span-2" placeholder="Tell us about the project, timeline, and what kind of finish you want." />
                <div className="md:col-span-2 flex flex-wrap gap-3">
                  <a href={site.phoneHref} className={buttonStyles('primary')}>
                    Call Now!
                  </a>
                  <a href={`mailto:${site.email}`} className={buttonStyles('primary')}>
                    Email Inquiry
                  </a>
                </div>
              </form>
            </section>
          </Reveal>
        </div>

        <Reveal className="mt-8 md:mt-10" delay={0.12}>
          <section className="panel theme-light p-6 md:p-8">
            <div className="inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-sky-500">
              <span>Company Leadership</span>
              <span className="h-px w-12 bg-sky-300" />
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-ink md:text-3xl">Meet Our Team</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <article className="rounded-3xl border border-black/10 bg-white p-5">
                <div className="text-lg font-semibold leading-tight text-[#0A2A66]">Luis Sandoval</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/52">Chief Executive Officer</div>
              </article>
              <article className="rounded-3xl border border-black/10 bg-white p-5">
                <div className="text-lg font-semibold leading-tight text-[#0A2A66]">Rafael Mendez</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/52">Project Manager</div>
              </article>
              <article className="rounded-3xl border border-black/10 bg-white p-5">
                <div className="text-lg font-semibold leading-tight text-[#0A2A66]">Jose Luis Sandoval</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/52">Officer</div>
              </article>
            </div>
          </section>
        </Reveal>
      </Container>
    </div>
  );
}