import type { TempoPage, TempoStoryboard, TempoRouteStoryboard } from 'tempo-sdk';

const page: TempoPage = {
  name: "Listing detail",
};

export default page;

export const ListingAboveFold: TempoRouteStoryboard = {
  route: "/listing/lst-001",
  name: "Listing — above the fold (hero + title + price)",
  layout: { x: 0, y: 0, width: 1440, height: 900 },
};

export const ListingFullPage: TempoRouteStoryboard = {
  route: "/listing/lst-001",
  name: "Listing — full scroll (all sections)",
  layout: { x: 1490, y: 0, width: 1440, height: 2200 },
};

export const ListingRareFind: TempoRouteStoryboard = {
  route: "/listing/lst-002",
  name: "Listing — Rare find badge",
  layout: { x: 0, y: 2250, width: 1440, height: 900 },
};

export const ListingMobile: TempoRouteStoryboard = {
  route: "/listing/lst-003",
  name: "Listing — mobile 375px (bottom bar)",
  layout: { x: 0, y: 3200, width: 375, height: 812 },
};

export const BookingConfirmModal: TempoRouteStoryboard = {
  route: "/listing/lst-001",
  name: "Booking confirmation modal — default (Issue #4)",
  layout: { x: 0, y: 4062, width: 1440, height: 900 },
};
