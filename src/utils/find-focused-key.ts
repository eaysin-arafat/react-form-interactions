import { FormState } from "../types";

export const findFocusedKey = <T>(state: FormState<T>): string | "" => {
  for (const key in state) {
    if (state[key].focused) {
      return key;
    }
  }
  return "";
};
