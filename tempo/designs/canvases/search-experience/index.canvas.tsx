import type { TempoPage, TempoStoryboard, TempoRouteStoryboard } from 'tempo-sdk';
import { FilterChip } from '@/design-system/components/FilterChip';
import { SearchBar } from '@/design-system/components/SearchBar';

const page: TempoPage = {
  name: "Search experience",
};

export default page;

export const SearchResultsList: TempoRouteStoryboard = {
  route: "/search",
  name: "Search results — list view",
  layout: { x: 0, y: 0, width: 1440, height: 900 },
};

export const SearchResultsFiltered: TempoRouteStoryboard = {
  route: "/search?q=coastal",
  name: "Search results — filtered by 'coastal'",
  layout: { x: 1490, y: 0, width: 1440, height: 900 },
};

export const SearchBarEmpty: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 32, background: "var(--paper)" }}>
      <SearchBar />
    </div>
  ),
  name: "Search bar — empty",
  layout: { x: 0, y: 940, width: 720, height: 120 },
};

export const SearchBarFilled: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 32, background: "var(--paper)" }}>
      <SearchBar defaultDestination="Cinque Terre, Italy" />
    </div>
  ),
  name: "Search bar — destination typed",
  layout: { x: 0, y: 1080, width: 720, height: 120 },
};

export const FilterChipsNone: TempoStoryboard = {
  render: () => (
    <div style={{ display: "flex", gap: 8, padding: 20, background: "var(--paper)" }}>
      <FilterChip label="Price" />
    </div>
  ),
  name: "Filter chips — none active",
  layout: { x: 0, y: 1220, width: 160, height: 80 },
};

export const FilterChipPriceActive: TempoStoryboard = {
  render: () => (
    <div style={{ display: "flex", gap: 8, padding: 20, background: "var(--paper)" }}>
      <FilterChip label="Price" count={1} active={true} />
    </div>
  ),
  name: "Filters drawer — price chip active",
  layout: { x: 180, y: 1220, width: 200, height: 80 },
};

export const FilterChipMultiActive: TempoStoryboard = {
  render: () => (
    <div style={{ display: "flex", gap: 8, padding: 20, background: "var(--paper)" }}>
      <FilterChip label="Price" count={3} active={true} />
    </div>
  ),
  name: "Filters drawer — 3 active",
  layout: { x: 400, y: 1220, width: 200, height: 80 },
};
