import { RangeDateSelected } from '../date/rangeDateSelected.type.ts';
import { EventsSelected } from '../events/events.type.ts';

export type InputCommonType = {
  city: string;
  date: RangeDateSelected;
  events: EventsSelected;
  eventsTranslated: EventsSelected;
  allCities: string[];
  isSelectedCity: boolean;
  isResponsive: boolean;
};
