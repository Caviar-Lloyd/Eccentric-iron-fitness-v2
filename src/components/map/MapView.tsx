'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import type { ServiceArea } from '@/lib/types';

/** Dark brutalist map styling */
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
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6B7280' }],
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
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6B7280' }],
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
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6B7280' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#455590' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#2A3050' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#1A2035' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0A0E1A' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#455590' }],
  },
];

/** BC center coordinates */
const BC_CENTER = { lat: 53.7, lng: -127.6 };
const BC_ZOOM = 5;

export type MapViewProps = {
  areas: ServiceArea[];
  filterMode?: 'all' | 'in-person' | 'online';
  onAreaSelect?: (area: ServiceArea) => void;
  selectedAreaId?: string | null;
};

export function MapView({
  areas,
  onAreaSelect,
  selectedAreaId,
}: MapViewProps) {
  const [hoveredAreaId, setHoveredAreaId] = useState<string | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

  const handleMarkerClick = useCallback(
    (area: ServiceArea) => {
      onAreaSelect?.(area);
    },
    [onAreaSelect]
  );

  if (!apiKey) {
    return <MapFallback />;
  }

  return (
    <div className="relative w-full border-3 border-border-hard bg-darker-bg shadow-[4px_4px_0px_#000]">
      <div className="h-[50vh] w-full lg:h-[600px]">
        <APIProvider apiKey={apiKey}>
          <Map
            defaultCenter={BC_CENTER}
            defaultZoom={BC_ZOOM}
            gestureHandling="cooperative"
            disableDefaultUI={false}
            mapTypeControl={false}
            streetViewControl={false}
            fullscreenControl={false}
            zoomControl={true}
            styles={DARK_MAP_STYLES}
            mapId="eccentric-iron-bc-map"
          >
            {areas.map((area) => {
              const isSelected = selectedAreaId === area.id;

              return (
                <AdvancedMarker
                  key={area.id}
                  position={{ lat: area.lat, lng: area.lng }}
                  onClick={() => handleMarkerClick(area)}
                  title={area.name}
                >
                  <div
                    className="relative cursor-pointer"
                    onMouseEnter={() => setHoveredAreaId(area.id)}
                    onMouseLeave={() => setHoveredAreaId(null)}
                  >
                    <Pin
                      background={isSelected ? '#FF6B35' : '#2DDBDB'}
                      glyphColor={isSelected ? '#FFFFFF' : '#0A0E1A'}
                      borderColor="#000000"
                      scale={isSelected ? 1.3 : 1}
                    />
                  </div>
                </AdvancedMarker>
              );
            })}

            {/* Tooltip for hovered area */}
            {hoveredAreaId && (() => {
              const hovered = areas.find((a) => a.id === hoveredAreaId);
              if (!hovered) return null;
              return (
                <InfoWindow
                  position={{ lat: hovered.lat, lng: hovered.lng }}
                  pixelOffset={[0, -40]}
                  headerDisabled
                >
                  <div className="bg-darker-bg px-3 py-2 font-mono text-xs font-medium uppercase tracking-widest text-text-primary">
                    {hovered.name}
                  </div>
                </InfoWindow>
              );
            })()}
          </Map>
        </APIProvider>
      </div>
    </div>
  );
}

function MapFallback() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center border-3 border-border-hard bg-card-surface lg:h-[600px]">
      <div className="text-center">
        <p className="font-heading text-xl font-bold uppercase tracking-widest text-text-primary">
          MAP UNAVAILABLE
        </p>
        <p className="mt-2 font-body text-sm text-text-secondary">
          Unable to load the interactive map.
        </p>
        <Link
          href="/coaches"
          className="mt-4 inline-flex min-h-[48px] items-center justify-center border-3 border-border-hard bg-cyan px-6 font-mono text-sm font-medium uppercase tracking-widest text-darker-bg shadow-[4px_4px_0px_#000] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] focus-visible:outline-3 focus-visible:outline-cyan focus-visible:outline-offset-2"
        >
          BROWSE ALL COACHES
        </Link>
      </div>
    </div>
  );
}
