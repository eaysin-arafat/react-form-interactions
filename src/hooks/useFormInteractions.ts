/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { onBlur, onChange, onFocus, onSubmit } from "../handle-event";
import {
  Callback,
  ChangeEventType,
  FormEventType,
  FormState,
  OnSubmitCallbackType,
  UseFormParams,
} from "../types";
import {
  deepClone,
  findFocusedKey,
  getErrorsFromParams,
  mapValuesToState,
} from "../utils";

const useFormInteractions = <T extends Record<string, any>>({
  initialValue,
  validator,
}: UseFormParams<T>) => {
  const [state, setState] = useState<FormState<T>>(
    mapValuesToState(initialValue)
  );

  const focusedKey = findFocusedKey(state);
  const getErrors = getErrorsFromParams(state, validator);

  const handleChange = useCallback(
    (e: ChangeEventType, callback?: Callback) => {
      onChange(e, callback, setState);
    },
    []
  );

  const handleFocus = useCallback((e: ChangeEventType, callback?: Callback) => {
    onFocus(e, useState, callback);
  }, []);

  const handleBlur = useCallback(
    (e: ChangeEventType, callback?: Callback) => {
      onBlur(e, setState, getErrors, callback);
    },
    [getErrors]
  );

  const handleSubmit = useCallback(
    (e: FormEventType, cb: (formState: OnSubmitCallbackType<T>) => void) => {
      onSubmit(e, cb, state, setState, getErrors);
    },
    [getErrors, state]
  );

  const reset = useCallback(() => {
    setState(mapValuesToState(initialValue, true));
  }, [initialValue]);

  useEffect(() => {
    if (!focusedKey) return;

    const prevState = deepClone(state);
    const { errors } = getErrors;
    const isError =
      prevState[focusedKey].touched &&
      prevState[focusedKey].isDirty &&
      errors[focusedKey];

    if (isError) {
      prevState[focusedKey].error = errors[focusedKey] || "";
    } else {
      prevState[focusedKey].error = "";
    }

    setState(prevState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state[focusedKey]?.value]);

  return {
    formState: state,
    handleSubmit,
    handleChange,
    handleFocus,
    handleBlur,
    reset,
  };
};

export default useFormInteractions;
