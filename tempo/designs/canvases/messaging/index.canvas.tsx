import type { TempoPage, TempoStoryboard, TempoRouteStoryboard } from 'tempo-sdk';

const page: TempoPage = {
  name: "Messaging",
};

export default page;

export const InboxUnread: TempoRouteStoryboard = {
  route: "/messages",
  name: "Inbox — with unread messages",
  layout: { x: 0, y: 0, width: 1200, height: 800 },
};

export const InboxAllRead: TempoRouteStoryboard = {
  route: "/messages",
  name: "Inbox — all read",
  layout: { x: 1250, y: 0, width: 1200, height: 800 },
};

export const InboxMobile: TempoRouteStoryboard = {
  route: "/messages",
  name: "Inbox — mobile 375px",
  layout: { x: 2500, y: 0, width: 375, height: 812 },
};

export const ThreadView: TempoRouteStoryboard = {
  route: "/messages",
  name: "Thread — conversation view",
  layout: { x: 0, y: 862, width: 1200, height: 800 },
};

export const ThreadMobile: TempoRouteStoryboard = {
  route: "/messages",
  name: "Thread — mobile 375px",
  layout: { x: 0, y: 1712, width: 375, height: 812 },
};
