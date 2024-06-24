import { ChangeEvent } from "./event";

export type CallbackType = {
  event: ChangeEvent;
  callback?: (value?: string, event?: ChangeEvent) => void;
};
