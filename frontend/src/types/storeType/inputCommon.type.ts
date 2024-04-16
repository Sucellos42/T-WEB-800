import { RangeDateSelected } from '../date/rangeDateSelected.type.ts';
import { EventsSelected } from '../cardCommon/eventsSelected.type.ts';

export type InputCommonStoreType = {
    city: string;
    date: RangeDateSelected;
    events: EventsSelected;
    eventsTranslated: EventsSelected;
};
