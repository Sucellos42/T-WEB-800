import type { Color } from '~/types/color.type';

export interface ButtonCommonInterface {
  value?: string;
  size?: Size;
  color?: Color;
  type?: ButtonCommonType;
  rounded?: Rounded;
  disabled?: boolean;
}

// Subtypes ------------------------------------------------------------------------------------------------------------
export type ButtonCommonType = 'button' | 'chips';
