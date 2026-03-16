'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ProgressPhoto } from '@/lib/types';

type Pose = ProgressPhoto['pose'];

const POSE_LABELS: Record<Pose, string> = {
  front: 'FRONT',
  back: 'BACK',
  lateral_left: 'LEFT SIDE',
  lateral_right: 'RIGHT SIDE',
};

type ProgressGalleryProps = {
  photos: ProgressPhoto[];
};

export function ProgressGallery({ photos }: ProgressGalleryProps) {
  // Group photos by date
  const dates = [...new Set(photos.map((p) => p.photo_date))].sort();

  // Find which poses are available
  const poses = [...new Set(photos.map((p) => p.pose))].sort(
    (a, b) =>
      ['front', 'back', 'lateral_left', 'lateral_right'].indexOf(a) -
      ['front', 'back', 'lateral_left', 'lateral_right'].indexOf(b)
  ) as Pose[];

  const [activePose, setActivePose] = useState<Pose>(poses[0] || 'front');

  if (dates.length < 2 || photos.length === 0) return null;

  // Format date label
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Get photo for a specific date + pose
  const getPhoto = (date: string, pose: Pose) =>
    photos.find((p) => p.photo_date === date && p.pose === pose);

  return (
    <div>
      {/* Pose selector */}
      <div className="flex flex-wrap gap-2">
        {poses.map((pose) => (
          <button
            key={pose}
            type="button"
            onClick={() => setActivePose(pose)}
            className={`border-3 px-4 py-2 font-mono text-xs font-medium uppercase tracking-widest transition-all duration-150 ${
              activePose === pose
                ? 'border-border-hard bg-cyan text-darker-bg shadow-[4px_4px_0px_#000]'
                : 'border-border bg-transparent text-text-secondary hover:border-border-hard hover:text-text-primary'
            }`}
          >
            {POSE_LABELS[pose]}
          </button>
        ))}
      </div>

      {/* Side-by-side comparison */}
      <div className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-4 md:gap-6">
        {dates.map((date) => {
          const photo = getPhoto(date, activePose);
          if (!photo) return null;

          return (
            <div key={date} className="flex flex-col">
              <div className="relative aspect-[3/4] w-full overflow-hidden border-3 border-border-hard bg-navy shadow-[4px_4px_0px_#000]">
                <Image
                  src={photo.image_url}
                  alt={`${POSE_LABELS[activePose]} view — ${formatDate(date)}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 280px"
                />
              </div>
              <p className="mt-2 text-center font-mono text-xs font-medium uppercase tracking-widest text-text-secondary">
                {formatDate(date)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
