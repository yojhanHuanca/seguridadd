import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { Button } from '@/design-system/primitives/Button';
import { Badge } from '@/design-system/primitives/Badge';
import { Avatar } from '@/design-system/primitives/Avatar';
import { Input } from '@/design-system/primitives/Input';
import { FilterChip } from '@/design-system/components/FilterChip';
import { HeartButton } from '@/design-system/components/HeartButton';
import { ListingCard } from '@/design-system/components/ListingCard';
import { RatingStars } from '@/design-system/components/RatingStars';
import { SearchBar } from '@/design-system/components/SearchBar';
import { BookingCard } from '@/design-system/components/BookingCard';
import { LISTINGS } from '@/data/listings';
import { TRIPS } from '@/data/trips';

const page: TempoPage = {
  name: "Design system",
};

export default page;

export const ButtonPrimary: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 32, background: "var(--paper)" }}>
      <Button variant="primary" size="md">Reserve</Button>
    </div>
  ),
  name: "Button — primary",
  layout: { x: 0, y: 0, width: 240, height: 100 },
};

export const ButtonSecondary: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 32, background: "var(--paper)" }}>
      <Button variant="secondary" size="md">Browse all</Button>
    </div>
  ),
  name: "Button — secondary",
  layout: { x: 260, y: 0, width: 240, height: 100 },
};

export const ButtonOutline: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 32, background: "var(--paper)" }}>
      <Button variant="outline" size="md">Share</Button>
    </div>
  ),
  name: "Button — outline",
  layout: { x: 520, y: 0, width: 240, height: 100 },
};

export const ButtonDestructive: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 32, background: "var(--paper)" }}>
      <Button variant="destructive" size="md">Confirm cancellation</Button>
    </div>
  ),
  name: "Button — destructive",
  layout: { x: 780, y: 0, width: 280, height: 100 },
};

export const BadgeSuccess: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 24, background: "var(--paper)" }}>
      <Badge variant="success">Confirmed</Badge>
    </div>
  ),
  name: "Badge — confirmed (success)",
  layout: { x: 0, y: 140, width: 200, height: 80 },
};

export const BadgeWarning: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 24, background: "var(--paper)" }}>
      <Badge variant="warning" pulse={true}>Check-in today</Badge>
    </div>
  ),
  name: "Badge — check-in today (pulsing)",
  layout: { x: 220, y: 140, width: 220, height: 80 },
};

export const BadgeAccent: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 24, background: "var(--paper)" }}>
      <Badge variant="accent">Guest favourite</Badge>
    </div>
  ),
  name: "Badge — guest favourite",
  layout: { x: 460, y: 140, width: 220, height: 80 },
};

export const AvatarPhoto: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 32, background: "var(--paper)" }}>
      <Avatar src={LISTINGS[0].host.avatar} alt={LISTINGS[0].host.name} size="lg" />
    </div>
  ),
  name: "Avatar — with photo",
  layout: { x: 0, y: 260, width: 140, height: 120 },
};

export const AvatarInitials: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 32, background: "var(--paper)" }}>
      <Avatar alt="Tom Chen" size="lg" />
    </div>
  ),
  name: "Avatar — initials fallback",
  layout: { x: 160, y: 260, width: 140, height: 120 },
};

export const InputDefault: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 32, background: "var(--paper)" }}>
      <Input label="Destination" placeholder="Search destinations" />
    </div>
  ),
  name: "Input — default",
  layout: { x: 0, y: 420, width: 400, height: 120 },
};

export const InputError: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 32, background: "var(--paper)" }}>
      <Input label="Email" placeholder="you@example.com" error="Please enter a valid email" />
    </div>
  ),
  name: "Input — error state",
  layout: { x: 420, y: 420, width: 400, height: 140 },
};

export const RatingDefault: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 24, background: "var(--paper)" }}>
      <RatingStars rating={4.97} count={184} />
    </div>
  ),
  name: "RatingStars — with count",
  layout: { x: 0, y: 580, width: 280, height: 80 },
};

export const FilterChipInactive: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 20, background: "var(--paper)" }}>
      <FilterChip label="Price" />
    </div>
  ),
  name: "FilterChip — inactive",
  layout: { x: 0, y: 680, width: 180, height: 80 },
};

export const FilterChipActiveCount: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 20, background: "var(--paper)" }}>
      <FilterChip label="Price" count={1} active={true} />
    </div>
  ),
  name: "FilterChip — active (count badge)",
  layout: { x: 200, y: 680, width: 200, height: 80 },
};

export const HeartDefault: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 32, background: "#888" }}>
      <HeartButton saved={false} size="lg" />
    </div>
  ),
  name: "HeartButton — unsaved",
  layout: { x: 0, y: 800, width: 120, height: 120 },
};

export const HeartSavedState: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 32, background: "#888" }}>
      <HeartButton saved={true} size="lg" />
    </div>
  ),
  name: "HeartButton — saved (terracotta)",
  layout: { x: 140, y: 800, width: 120, height: 120 },
};

export const ListingCardDefault: TempoStoryboard = {
  render: () => <ListingCard listing={LISTINGS[0]} />,
  name: "ListingCard — default",
  layout: { x: 0, y: 960, width: 320, height: 460 },
};

export const ListingCardBadge: TempoStoryboard = {
  render: () => <ListingCard listing={LISTINGS[1]} />,
  name: "ListingCard — with badge",
  layout: { x: 340, y: 960, width: 320, height: 460 },
};

export const ListingCardSaved: TempoStoryboard = {
  render: () => <ListingCard listing={LISTINGS[4]} saved={true} />,
  name: "ListingCard — saved state",
  layout: { x: 680, y: 960, width: 320, height: 460 },
};

export const SearchBarFull: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 32, background: "var(--paper)" }}>
      <SearchBar />
    </div>
  ),
  name: "SearchBar — full",
  layout: { x: 0, y: 1460, width: 800, height: 120 },
};

export const SearchBarCompact: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 24, background: "var(--paper)" }}>
      <SearchBar compact={true} defaultDestination="Marrakech" />
    </div>
  ),
  name: "SearchBar — compact (navbar)",
  layout: { x: 0, y: 1600, width: 400, height: 80 },
};

export const BookingCardConfirmed: TempoStoryboard = {
  render: () => <BookingCard trip={TRIPS[0]} />,
  name: "BookingCard — confirmed",
  layout: { x: 0, y: 1720, width: 480, height: 130 },
};

export const BookingCardCheckIn: TempoStoryboard = {
  render: () => <BookingCard trip={TRIPS[2]} />,
  name: "BookingCard — check-in today",
  layout: { x: 0, y: 1870, width: 480, height: 130 },
};
