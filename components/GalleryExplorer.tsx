'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Reveal } from '@/components/Reveal';
import type { GalleryItem, ProjectCategory } from '@/lib/types';
import { cn } from '@/lib/utils';

type Props = {
  initialItems: GalleryItem[];
  initialTags: string[];
};

export function GalleryExplorer({ initialItems, initialTags }: Props) {
  const [category, setCategory] = useState<ProjectCategory | 'all'>('all');
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return initialItems.filter((item) => {
      if (category !== 'all' && item.category !== category) {
        return false;
      }

      if (selectedTags.length > 0 && !selectedTags.every((tag) => item.tags.includes(tag))) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack = [item.title, item.location, item.scope, item.tags.join(' ')].join(' ').toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [category, initialItems, query, selectedTags]);

  function toggleTag(tag: string) {
    setSelectedTags((current) => (current.includes(tag) ? current.filter((value) => value !== tag) : [...current, tag]));
  }

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="panel p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'All Work', value: 'all' },
              { label: 'Residential', value: 'residential' },
              { label: 'Commercial', value: 'commercial' }
            ].map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setCategory(tab.value as ProjectCategory | 'all')}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-semibold transition',
                  category === tab.value ? 'bg-steel text-white' : 'border border-steel/20 bg-white text-ink hover:border-steel/40'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <input
            className="field w-full lg:max-w-sm"
            placeholder="Search by finish, project type, location, or tag"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {initialTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={cn('tag-chip', selectedTags.includes(tag) && 'border-clay/40 bg-clay/10 text-clay')}
            >
              {tag}
            </button>
          ))}
        </div>
        </div>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.04}>
            <article className="panel overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={item.image} alt={item.alt} fill unoptimized className="object-cover transition duration-300 hover:scale-[1.03]" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
                  <span className="rounded-full bg-steel/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone">{item.category}</span>
                </div>
                <p className="mt-3 text-sm leading-6">{item.scope}</p>
                <div className="mt-4 text-sm font-medium text-ink">{item.location}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <Reveal>
          <div className="panel p-8 text-center">
            <h3 className="text-xl font-semibold text-ink">No matches yet</h3>
            <p className="mt-3 text-sm">Try fewer tags or a broader search phrase.</p>
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}