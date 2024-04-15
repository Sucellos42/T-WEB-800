import { RangeDateSelected } from '../rangeDateSelected.type.ts';
import { EventsSelected } from '../cardCommon/eventsSelected.type.ts';

export type DataInput = {
  city: string;
  date: RangeDateSelected;
  events: EventsSelected;
};
