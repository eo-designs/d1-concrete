'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Container } from '@/components/Container';
import { buttonStyles } from '@/components/Button';
import { site } from '@/lib/site';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
      <Container className="flex items-center justify-between gap-3 py-2.5 md:py-3">
        <div className="flex shrink-0 items-center gap-2">
          <Link href="/" className="shrink-0">
            <Image
              src="/assets/brand/logo.png?v=20260413"
              alt="D1 Concrete"
              width={1575}
              height={900}
              sizes="(min-width: 1024px) 172px, (min-width: 768px) 156px, 128px"
              className="h-[5rem] w-auto object-contain object-left md:h-[5.4rem] lg:h-[5.8rem]"
              priority
              unoptimized
            />
          </Link>
          <div className="hidden md:block text-left">
            <div className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-sky-500">Serving California</div>
            <div className="mt-1.5 font-[var(--font-heading)] text-[1.02rem] font-bold uppercase leading-[0.95] text-[#0A2A66]">Concrete. Clean. Built Right.</div>
            <div className="mt-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-black/62">Commercial • Public Works • Residential</div>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <nav className="hidden items-center gap-5 md:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                className={
                  pathname === item.href
                    ? 'border-b-2 border-[#0A2A66] pb-1 text-sm font-semibold text-[#0A2A66]'
                    : 'border-b-2 border-transparent pb-1 text-sm font-medium text-black/75 transition hover:text-[#0A2A66]'
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-site-menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[#0A2A66] transition hover:border-[#0A2A66] md:hidden"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <a href={site.phoneHref} className="hidden items-center px-4 text-sm font-semibold text-[#0A2A66] md:flex">
              {site.phoneDisplay}
            </a>
            <a href={site.phoneHref} className={`${buttonStyles('primary')} hidden md:inline-flex`}>
              Call Now
            </a>
          </div>
        </div>
      </Container>
      {isMobileMenuOpen && (
        <div id="mobile-site-menu" className="border-t border-black/10 bg-white md:hidden">
          <Container className="py-4">
            <nav className="grid gap-2">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={
                    pathname === item.href
                      ? 'rounded-2xl bg-[#0A2A66] px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white'
                      : 'rounded-2xl border border-black/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#0A2A66] transition hover:border-[#0A2A66]'
                  }
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 grid gap-2">
              <a href={site.phoneHref} className="rounded-2xl border border-black/10 px-4 py-3 text-sm font-semibold text-[#0A2A66]">
                {site.phoneDisplay}
              </a>
              <a href={site.phoneHref} className={buttonStyles('primary')}>
                Call Now
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}