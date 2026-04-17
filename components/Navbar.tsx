'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/Container';
import { buttonStyles } from '@/components/Button';
import { site } from '@/lib/site';

export function Navbar() {
  const pathname = usePathname();

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
              className="h-[4.4rem] w-auto object-contain object-left md:h-[4.8rem] lg:h-[5.1rem]"
              priority
              unoptimized
            />
          </Link>
          <div className="hidden md:block">
            <div className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-sky-500">Lodi, California</div>
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
            <a href={site.phoneHref} className="hidden items-center px-4 text-sm font-semibold text-[#0A2A66] md:flex">
              {site.phoneDisplay}
            </a>
            <a href={site.phoneHref} className={buttonStyles('primary')}>
              Call Now
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
}