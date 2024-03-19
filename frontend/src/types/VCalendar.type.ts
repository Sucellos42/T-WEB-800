export type DateModelPicker =
  | number
  | string
  | Date
  | null
  | {
      start?: number | string | Date | null;
      end?: number | string | Date | null;
    };
