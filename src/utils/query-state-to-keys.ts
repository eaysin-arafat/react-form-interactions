import { FormState } from "../types";

export const mapStateToKeys = <T, K extends keyof FormState<T>[keyof T]>(
  state: FormState<T>,
  key: K
): { [P in keyof T]: FormState<T>[P][K] } => {
  return Object.keys(state).reduce((acc, curr) => {
    acc[curr as keyof T] = state[curr as keyof T][key];
    return acc;
  }, {} as { [P in keyof T]: FormState<T>[P][K] });
};
