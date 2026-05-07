import type { TempoPage, TempoStoryboard, TempoRouteStoryboard } from 'tempo-sdk';
import { HeartButton } from '@/design-system/components/HeartButton';

const page: TempoPage = {
  name: "Wishlists",
};

export default page;

export const WishlistsGrid: TempoRouteStoryboard = {
  route: "/wishlists",
  name: "Wishlists grid — populated",
  layout: { x: 0, y: 0, width: 1280, height: 900 },
};

export const WishlistsEmpty: TempoRouteStoryboard = {
  route: "/wishlists",
  name: "Wishlists grid — empty state",
  layout: { x: 1330, y: 0, width: 1280, height: 600 },
};

export const HeartUnsaved: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 40, background: "#888", borderRadius: 16 }}>
      <HeartButton saved={false} size="lg" />
    </div>
  ),
  name: "HeartButton — unsaved",
  layout: { x: 0, y: 940, width: 120, height: 120 },
};

export const HeartSaved: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 40, background: "#888", borderRadius: 16 }}>
      <HeartButton saved={true} size="lg" />
    </div>
  ),
  name: "HeartButton — saved (terracotta fill + spring)",
  layout: { x: 140, y: 940, width: 120, height: 120 },
};

export const HeartOnDark: TempoStoryboard = {
  render: () => (
    <div style={{ padding: 40, background: "var(--ink)", borderRadius: 16 }}>
      <HeartButton saved={false} size="lg" />
    </div>
  ),
  name: "HeartButton — on dark bg",
  layout: { x: 280, y: 940, width: 120, height: 120 },
};
