import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServiceAreas, getServiceAreaBySlug } from '@/lib/db/areas';
import { getCoaches } from '@/lib/db/coaches';
import { Container } from '@/components/layout/Container';
import { CoachCard } from '@/components/coach/CoachCard';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { Tag } from '@/components/ui/Tag';
import { BrutalistLinkButton } from '@/components/ui/BrutalistButton';

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const areas = await getServiceAreas();
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = await getServiceAreaBySlug(slug);

  if (!area) {
    return {
      title: 'Area Not Found | Eccentric Iron Fitness',
    };
  }

  return {
    title: area.seo_title || `Personal Training in ${area.name} | Eccentric Iron Fitness`,
    description:
      area.seo_description ||
      `Find certified personal trainers in ${area.name}, ${area.province}. In-person and online coaching for fat loss, body recomposition, and nutrition.`,
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const area = await getServiceAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  const inPersonCoaches = area.coaches;
  const hasInPerson = inPersonCoaches.length > 0;

  // If no in-person coaches, fetch online coaches as fallback
  let onlineCoaches: typeof inPersonCoaches = [];
  if (!hasInPerson) {
    const allCoaches = await getCoaches();
    onlineCoaches = allCoaches.filter((c) => c.is_online);
  }

  return (
    <Container as="main" className="py-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted">
          <li>
            <Link
              href="/"
              className="transition-colors duration-150 hover:text-cyan focus-visible:outline-3 focus-visible:outline-cyan focus-visible:outline-offset-2"
            >
              HOME
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/map"
              className="transition-colors duration-150 hover:text-cyan focus-visible:outline-3 focus-visible:outline-cyan focus-visible:outline-offset-2"
            >
              AREAS
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <span className="text-text-primary">{area.name.toUpperCase()}</span>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <h1 className="font-heading text-4xl font-extrabold uppercase tracking-tight text-text-primary md:text-5xl">
        PERSONAL TRAINING IN {area.name.toUpperCase()}
      </h1>

      <div className="mt-4 flex flex-wrap gap-3">
        <Tag variant="filled">{area.province.toUpperCase()}</Tag>
      </div>

      <SectionDivider variant="heavy" />

      {/* City content */}
      {area.content && (
        <section className="mb-12">
          <div className="max-w-3xl">
            {area.content.split('\n').map((paragraph, i) =>
              paragraph.trim() ? (
                <p
                  key={i}
                  className="mb-4 font-body text-base leading-relaxed text-text-secondary"
                >
                  {paragraph}
                </p>
              ) : null
            )}
          </div>
        </section>
      )}

      {/* In-person coaches */}
      {hasInPerson && (
        <section>
          <SectionDivider variant="titled" title="COACHES IN THIS AREA" />
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {inPersonCoaches.map((coach) => (
              <CoachCard key={coach.id} coach={coach} variant="compact" />
            ))}
          </div>
        </section>
      )}

      {/* No in-person coaches — show online coaches */}
      {!hasInPerson && (
        <section>
          <div className="border-3 border-border-hard bg-card-surface p-6 shadow-[4px_4px_0px_#000]">
            <p className="font-heading text-xl font-bold uppercase tracking-widest text-text-primary">
              NO IN-PERSON COACHES YET
            </p>
            <p className="mt-3 font-body text-sm text-text-secondary">
              We do not currently have in-person coaches in {area.name}. However, our
              online coaching is available province-wide across British Columbia.
            </p>
          </div>

          {onlineCoaches.length > 0 && (
            <>
              <SectionDivider variant="titled" title="ONLINE COACHES AVAILABLE" />
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {onlineCoaches.map((coach) => (
                  <CoachCard key={coach.id} coach={coach} variant="compact" />
                ))}
              </div>
            </>
          )}

          <div className="mt-8">
            <BrutalistLinkButton href="/coaches" variant="primary" showArrow>
              BROWSE ALL COACHES
            </BrutalistLinkButton>
          </div>
        </section>
      )}

      {/* Back to map */}
      <SectionDivider variant="heavy" />
      <div className="flex justify-center">
        <BrutalistLinkButton href="/map" variant="secondary" showArrow>
          BACK TO MAP
        </BrutalistLinkButton>
      </div>
    </Container>
  );
}
