import { notFound } from 'next/navigation';

// TODO: Gallery page is under development — re-enable imports and body when ready
// import Image from 'next/image';
// import { Container } from '@/components/Container';
// import { PageHeader } from '@/components/PageHeader';
// import { Reveal } from '@/components/Reveal';
// import { media } from '@/lib/media';

// const mediaItems = [
// 	{ title: 'Gallery Image 1', src: media.galleryImage1, type: 'image' },
// 	{ title: 'Gallery Image 2', src: media.galleryImage2, type: 'image' },
// 	{ title: 'Gallery Image 3', src: media.galleryImage3, type: 'image' },
// 	{ title: 'Gallery Image 4', src: media.galleryImage4, type: 'image' },
// 	{ title: 'Gallery Image 5', src: media.galleryImage5, type: 'image' },
// 	{ title: 'Gallery Image 6', src: media.galleryImage6, type: 'image' }
// ];

export default function GalleryPage() {
	notFound();
	return (
		<div className="theme-shell">
			<PageHeader
				eyebrow="Gallery"
				title="Media gallery built to preview the visual direction fast."
				description="This page uses your temporary media placeholders so layout and interactions stay production-safe while you finalize naming."
				className="theme-metal"
			/>
			<Container className="py-16 md:py-20">
				<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
					{mediaItems.map((item, index) => (
						<Reveal key={item.title} delay={index * 0.05}>
							<article className={`overflow-hidden border ${index % 2 === 0 ? 'border-white/10 bg-[#05070c]' : 'border-black/10 bg-white'}`}>
								<div className="relative aspect-[4/5] bg-black">
									{item.type === 'video' ? (
										<video className="h-full w-full object-cover" src={item.src} autoPlay muted loop playsInline />
									) : (
										<Image src={item.src} alt={item.title} fill unoptimized className="object-contain bg-[#05070c] p-6" />
									)}
								</div>
								<div className="p-5">
									<div className={`text-lg font-semibold ${index % 2 === 0 ? 'text-white' : 'text-[#0A2A66]'}`}>{item.title}</div>
								</div>
							</article>
						</Reveal>
					))}
				</div>
			</Container>
		</div>
	);
}
