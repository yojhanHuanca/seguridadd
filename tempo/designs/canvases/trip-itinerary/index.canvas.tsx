import type { TempoPage, TempoStoryboard, TempoRouteStoryboard } from 'tempo-sdk';
import { BookingCard } from '@/design-system/components/BookingCard';
import { TRIPS } from '@/data/trips';

const page: TempoPage = {
  name: "Trip itinerary",
};

export default page;

export const TripsList: TempoRouteStoryboard = {
  route: "/trips",
  name: "Trips list — upcoming",
  layout: { x: 0, y: 0, width: 700, height: 900 },
};

export const TripsListMobile: TempoRouteStoryboard = {
  route: "/trips",
  name: "Trips list — mobile 375px ← Bug #8 here",
  layout: { x: 750, y: 0, width: 375, height: 812 },
};

export const TripDetailFull: TempoRouteStoryboard = {
  route: "/trips/trp-001",
  name: "Itinerary — full (all sections)",
  layout: { x: 1175, y: 0, width: 700, height: 1200 },
};

export const TripDetailCheckIn: TempoRouteStoryboard = {
  route: "/trips/trp-003",
  name: "Itinerary — check-in today (banner + amber badge)",
  layout: { x: 1925, y: 0, width: 700, height: 900 },
};

export const TripDetailPast: TempoRouteStoryboard = {
  route: "/trips/trp-004",
  name: "Itinerary — past trip (no cancel link)",
  layout: { x: 0, y: 1250, width: 700, height: 900 },
};

export const TripDetailMobile: TempoRouteStoryboard = {
  route: "/trips/trp-001",
  name: "Itinerary — mobile 375px ← Bug #8: check cancel tap target",
  layout: { x: 0, y: 2200, width: 375, height: 812 },
};

export const CancellationStep1Full: TempoRouteStoryboard = {
  route: "/trips/trp-001",
  name: "Cancellation — step 1 (full refund)",
  layout: { x: 0, y: 3062, width: 700, height: 900 },
};

export const CancellationStep1Strict: TempoRouteStoryboard = {
  route: "/trips/trp-002",
  name: "Cancellation — step 1 (strict — no refund)",
  layout: { x: 0, y: 4012, width: 700, height: 900 },
};

export const BookingCardConfirmed: TempoStoryboard = {
  render: () => <BookingCard trip={TRIPS[0]} />,
  name: "BookingCard — confirmed",
  layout: { x: 750, y: 4012, width: 560, height: 130 },
};

export const BookingCardCheckInToday: TempoStoryboard = {
  render: () => <BookingCard trip={TRIPS[2]} />,
  name: "BookingCard — check-in today (pulsing)",
  layout: { x: 750, y: 4162, width: 560, height: 130 },
};

export const BookingCardCompleted: TempoStoryboard = {
  render: () => <BookingCard trip={TRIPS[3]} />,
  name: "BookingCard — completed",
  layout: { x: 750, y: 4312, width: 560, height: 130 },
};
