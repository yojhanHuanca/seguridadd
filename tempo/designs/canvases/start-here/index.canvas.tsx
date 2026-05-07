import type { TempoPage, TempoStoryboard, TempoRouteStoryboard } from 'tempo-sdk';
import { ListingCard } from '@/design-system/components/ListingCard';
import { FilterChip } from '@/design-system/components/FilterChip';
import { HeartButton } from '@/design-system/components/HeartButton';
import { SearchBar } from '@/design-system/components/SearchBar';
import { LISTINGS } from '@/data/listings';

const page: TempoPage = {
  name: "Start here",
};

export default page;

export const Homepage: TempoRouteStoryboard = {
  route: "/",
  name: "Homepage — hero + featured listings",
  layout: { x: 0, y: 0, width: 1440, height: 900 },
};

export const SearchBarDefault: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 32, background: "var(--paper)" }}>
      <SearchBar />
    </div>
  ),
  name: "Search bar — default",
  layout: { x: 1480, y: 0, width: 700, height: 120 },
};

export const ListingCardDefault: TempoStoryboard = {
  render: () => <ListingCard listing={LISTINGS[0]} />,
  name: "ListingCard — default",
  layout: { x: 1480, y: 160, width: 320, height: 460 },
};

export const ListingCardSaved: TempoStoryboard = {
  render: () => <ListingCard listing={LISTINGS[1]} saved={true} />,
  name: "ListingCard — saved",
  layout: { x: 1820, y: 160, width: 320, height: 460 },
};

export const HeartUnsaved: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 40, background: "#888" }}>
      <HeartButton saved={false} size="lg" />
    </div>
  ),
  name: "HeartButton — unsaved",
  layout: { x: 1480, y: 660, width: 120, height: 120 },
};

export const HeartSaved: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 40, background: "#888" }}>
      <HeartButton saved={true} size="lg" />
    </div>
  ),
  name: "HeartButton — saved",
  layout: { x: 1620, y: 660, width: 120, height: 120 },
};

export const FilterChipDefault: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 20, background: "var(--paper)" }}>
      <FilterChip label="Price" />
    </div>
  ),
  name: "FilterChip — inactive",
  layout: { x: 1480, y: 820, width: 200, height: 80 },
};

export const FilterChipActive: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 20, background: "var(--paper)" }}>
      <FilterChip label="Price" count={1} active={true} />
    </div>
  ),
  name: "FilterChip — active",
  layout: { x: 1700, y: 820, width: 200, height: 80 },
};
