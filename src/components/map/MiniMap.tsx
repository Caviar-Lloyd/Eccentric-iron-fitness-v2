'use client';

import Link from 'next/link';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import type { ServiceArea } from '@/lib/types';

/** Dark brutalist map styling for mini map */
const DARK_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#0A0E1A' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0A0E1A' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#6B7280' }] },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#2A3050' }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#111827' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#1A2035' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#2A3050' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1A2035' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#455590' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0A0E1A' }],
  },
];

type MiniMapProps = {
  serviceAreas: ServiceArea[];
  isOnlineOnly: boolean;
  className?: string;
};

export function MiniMap({ serviceAreas, isOnlineOnly, className = '' }: MiniMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

  // Online-only coaches get a text block instead of a map
  if (isOnlineOnly || serviceAreas.length === 0) {
    return (
      <Link
        href="/map"
        className={`group flex h-[300px] items-center justify-center border-3 border-border-hard bg-navy shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] focus-visible:outline-3 focus-visible:outline-cyan focus-visible:outline-offset-2 ${className}`}
      >
        <div className="text-center px-6">
          <p className="font-heading text-xl font-bold uppercase tracking-widest text-text-primary">
            AVAILABLE ONLINE PROVINCE-WIDE
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest text-cyan group-hover:underline">
            VIEW MAP →
          </p>
        </div>
      </Link>
    );
  }

  if (!apiKey) {
    return (
      <Link
        href="/map"
        className={`group flex h-[300px] items-center justify-center border-3 border-border-hard bg-card-surface shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] focus-visible:outline-3 focus-visible:outline-cyan focus-visible:outline-offset-2 ${className}`}
      >
        <div className="text-center">
          <p className="font-mono text-sm uppercase tracking-widest text-text-muted">
            VIEW SERVICE AREAS ON MAP →
          </p>
        </div>
      </Link>
    );
  }

  // Calculate center from service areas
  const center = {
    lat: serviceAreas.reduce((sum, a) => sum + a.lat, 0) / serviceAreas.length,
    lng: serviceAreas.reduce((sum, a) => sum + a.lng, 0) / serviceAreas.length,
  };

  // Choose zoom based on number of areas
  const zoom = serviceAreas.length === 1 ? 10 : 7;

  return (
    <Link
      href="/map"
      className={`group block border-3 border-border-hard shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] focus-visible:outline-3 focus-visible:outline-cyan focus-visible:outline-offset-2 ${className}`}
    >
      <div className="pointer-events-none h-[300px] w-full">
        <APIProvider apiKey={apiKey}>
          <Map
            defaultCenter={center}
            defaultZoom={zoom}
            gestureHandling="none"
            disableDefaultUI={true}
            styles={DARK_MAP_STYLES}
            mapId="eccentric-iron-mini-map"
          >
            {serviceAreas.map((area) => (
              <AdvancedMarker
                key={area.id}
                position={{ lat: area.lat, lng: area.lng }}
                title={area.name}
              >
                <Pin
                  background="#2DDBDB"
                  glyphColor="#0A0E1A"
                  borderColor="#000000"
                />
              </AdvancedMarker>
            ))}
          </Map>
        </APIProvider>
      </div>
      <div className="bg-card-surface px-4 py-3">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan group-hover:underline">
          VIEW FULL MAP →
        </p>
      </div>
    </Link>
  );
}
