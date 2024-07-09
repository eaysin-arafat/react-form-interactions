import { ChangeEvent } from "../types/event";

export const onChange = <T>(
  event: ChangeEvent,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValue: (fieldName: keyof T, value: any) => void,
  callback?: (value?: string, event?: ChangeEvent) => void
) => {
  const { name, value, type } = event.target;
  console.log({ name, value });

  const updateValue =
    type === "checkbox" ? (event.target as HTMLInputElement).checked : value;

  setFieldValue(name as keyof T, updateValue);

  if (callback) callback(value, event);
};

export default onChange;
