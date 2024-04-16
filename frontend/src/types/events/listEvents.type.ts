import { EventsSelected } from '../cardCommon/eventsSelected.type';

type ParentEvents = {
  icon: string;
  children: EventsSelected;
  childrenUK: EventsSelected;
};

export type ListEvents = {
  [key: string]: ParentEvents;
};
