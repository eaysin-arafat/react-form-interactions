/* eslint-disable @typescript-eslint/no-explicit-any */
export type ValidationRules<T> = {
  [fieldName in keyof T]: ValidationRule<T>[];
};

export interface ValidationRule<T> {
  required?: boolean;
  nullable?: boolean;
  optional?: boolean;
  allowEmpty?: boolean;
  message?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  email?: boolean;
  numeric?: boolean;
  alphanumeric?: boolean;
  matches?: string | number | { regex: RegExp; message?: string };
  trim?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
  startsWith?: string;
  endsWith?: string;
  phone?: boolean;
  creditCard?: boolean;
  password?: boolean;
  fieldMatch?: keyof T;
  alpha?: boolean;
  base32?: boolean;
  base58?: boolean;
  maxValue?: number;
  minValue?: number;
  lessThan?: number;
  moreThan?: number;
  positive?: boolean;
  negative?: boolean;
  integer?: boolean;
  truncate?: boolean;
  round?: "ceil" | "floor" | "round";
  decimalPlaces?: number;
  base?: number;
  evenOnly?: boolean;
  divisibleBy?: number;
  equals?: any;
  date?: boolean;
  dateTime?: boolean;
  time?: {
    hourFormat?: "hour12" | "hour24";
    mode?: "default" | "withSeconds";
  };
  fileType?: string[];
  fileSize?: number;
  boolean?: boolean;
  url?: boolean;
  checkboxRequired?: boolean;
  asyncCheck?: (value: any) => Promise<boolean>;
  custom?: (
    value: string | number | boolean,
    formState: T
  ) => boolean | Promise<boolean>;
  revalidateFields?: string[];
}
