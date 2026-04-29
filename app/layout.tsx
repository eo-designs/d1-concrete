import type { Metadata } from 'next';
import { Manrope, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { site } from '@/lib/site';
import { buttonStyles } from '@/components/Button';

const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body'
});

const headingFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading'
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  metadataBase: new URL('https://www.d1concrete.com'),
  icons: {
    icon: [{ url: '/assets/brand/logo.png?v=20260413', type: 'image/png', sizes: '32x32' }],
    shortcut: '/assets/brand/logo.png?v=20260413',
    apple: '/assets/brand/logo.png?v=20260413'
  },
  openGraph: {
    title: site.title,
    description: site.description,
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body className="bg-white font-[var(--font-body)] text-[#0A2A66] antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <a href={site.phoneHref} className={`${buttonStyles('primary')} fixed bottom-5 right-4 z-40 sm:right-6 lg:right-10 xl:right-12 2xl:right-16 md:bottom-8`}>
          Call Now!
        </a>
      </body>
    </html>
  );
}