import { useReducer } from 'react';

const initialInputState = { value: '', isTouched: false };
const inputStateReducer = (
  state: { value: string; isTouched: boolean },
  action: any
) => {
  if (action.type == 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type == 'BLUR') {
    return { value: state.value, isTouched: true };
  }
  if (action.type == 'RESET') {
    return initialInputState;
  }
  return initialInputState;
};
const useInput = (checkIfValid: (value: string) => boolean) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );
  const enteredValueIsValid = checkIfValid(inputState.value);
  const enteredValueHasErrors = !enteredValueIsValid && inputState.isTouched;

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };
  const valueBlurHandler = () => {
    dispatch({ type: 'BLUR' });
  };
  const reset = () => {
    dispatch({ type: 'RESET' });
  };
  return {
    value: inputState.value,
    valueBlurHandler,
    valueChangeHandler,
    reset,
    hasErrors: enteredValueHasErrors,
    isValid: enteredValueIsValid,
  };
};
export default useInput;
