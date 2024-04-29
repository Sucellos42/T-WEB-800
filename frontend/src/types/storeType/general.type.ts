export type FavorisType = {
    city: string;
    events: string[] | string;
    eventsTranslated: string[] | string;
}

export type GeneralType = {
    isResponsive: boolean;
    favoris: FavorisType[];
}