import { RangeDateSelected } from '../date/rangeDateSelected.type.ts';
import { EventsSelected } from '../events/events.type.ts';

export type DataInput = {
  city: string;
  date: RangeDateSelected;
  events: EventsSelected;
  eventsTranslated: EventsSelected;
};
