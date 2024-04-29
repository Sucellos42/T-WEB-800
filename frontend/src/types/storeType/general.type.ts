type FavorisType = {
    city: string;
    events: string[] | string;
}

export type GeneralType = {
    isResponsive: boolean;
    favoris: FavorisType[];
}