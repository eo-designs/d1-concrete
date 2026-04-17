import Image from 'next/image';
import { Container } from '@/components/Container';
import { PageHeader } from '@/components/PageHeader';
import { Reveal } from '@/components/Reveal';

const media = [
	{ title: 'Commercial Site Concrete', src: '/assets/brand/GX080905.MP4', type: 'video' },
	{ title: 'Flatwork In Progress', src: '/assets/brand/GX090905.MP4', type: 'video' },
	{ title: 'Driveway & Finish Work', src: '/assets/brand/GX100905.MP4', type: 'video' },
	{ title: 'Equipment & Crew Workflow', src: '/assets/brand/GX110905.MP4', type: 'video' },
	{ title: 'Site Detail Pass', src: '/assets/brand/GX120905.MP4', type: 'video' },
	{ title: 'Coverage Map', src: '/assets/brand/ca-map.png', type: 'image' }
];

export default function GalleryPage() {
	return (
		<div className="theme-shell">
			<PageHeader
				eyebrow="Gallery"
				title="Media gallery built to preview the visual direction fast."
				description="This page uses the GX media and supporting assets you added so you can judge the look and feel before any deeper content pass."
				className="theme-metal"
			/>
			<Container className="py-16 md:py-20">
				<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
					{media.map((item, index) => (
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
