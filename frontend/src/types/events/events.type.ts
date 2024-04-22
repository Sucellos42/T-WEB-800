type ParentEvents = {
  icon: string;
  children: EventsSelected;
  childrenUK: EventsSelected;
};

// type JSON Events
export type ListEventsJSON = {
  [key: string]: ParentEvents;
};

// for cardCommon to selects events
export type EventsSelected = string[];

// Event for store
export type Event = {
  address: string;
  city: string;
  description: string;
  event_type: string;
  id: number;
  identifier: string;
  label: string;
  latitude: number;
  longitude: number;
  photo_url: string;
};

// all events for store
export type AllEvents = Event[];
