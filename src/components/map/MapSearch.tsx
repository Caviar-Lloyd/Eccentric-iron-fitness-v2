'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import type { ServiceArea } from '@/lib/types';

type MapSearchProps = {
  areas: ServiceArea[];
  onAreaSelect: (area: ServiceArea) => void;
};

export function MapSearch({ areas, onAreaSelect }: MapSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredAreas = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return areas.filter(
      (area) =>
        area.name.toLowerCase().includes(lower) ||
        area.province.toLowerCase().includes(lower)
    );
  }, [query, areas]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(area: ServiceArea) {
    setQuery(area.name);
    setIsOpen(false);
    onAreaSelect(area);
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <label
        htmlFor="map-search"
        className="mb-2 block font-mono text-xs font-medium uppercase tracking-widest text-text-muted"
      >
        SEARCH BY CITY
      </label>
      <input
        id="map-search"
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          if (query.trim()) setIsOpen(true);
        }}
        placeholder="Enter a city name..."
        className="min-h-[48px] w-full border-3 border-border-hard bg-darker-bg px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-3 focus-visible:outline-cyan focus-visible:outline-offset-2"
        autoComplete="off"
        role="combobox"
        aria-expanded={isOpen && filteredAreas.length > 0}
        aria-controls="map-search-results"
        aria-autocomplete="list"
      />

      {/* Search results dropdown */}
      {isOpen && filteredAreas.length > 0 && (
        <ul
          id="map-search-results"
          role="listbox"
          className="absolute z-50 mt-0 max-h-60 w-full overflow-y-auto border-3 border-t-0 border-border-hard bg-card-surface shadow-[4px_4px_0px_#000]"
        >
          {filteredAreas.map((area) => (
            <li key={area.id} role="option" aria-selected={false}>
              <button
                type="button"
                onClick={() => handleSelect(area)}
                className="w-full cursor-pointer px-4 py-3 text-left font-mono text-sm uppercase tracking-widest text-text-primary transition-colors duration-150 hover:bg-navy hover:text-cyan focus-visible:outline-3 focus-visible:outline-cyan focus-visible:outline-offset-2"
              >
                {area.name}
                <span className="ml-2 text-text-muted">{area.province}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* No results */}
      {isOpen && query.trim() && filteredAreas.length === 0 && (
        <div className="absolute z-50 mt-0 w-full border-3 border-t-0 border-border-hard bg-card-surface p-4 shadow-[4px_4px_0px_#000]">
          <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
            NO AREAS FOUND
          </p>
          <p className="mt-1 font-body text-sm text-text-secondary">
            Try searching for another city, or browse all coaches.
          </p>
        </div>
      )}
    </div>
  );
}
