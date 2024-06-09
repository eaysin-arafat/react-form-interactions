import { Callback } from "../types";

export const validateCallback = (
  callback: Callback,
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  if (typeof callback === "function") {
    callback(e);
  } else {
    throw new Error("callback must be a function");
  }
};
