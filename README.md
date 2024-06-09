# react-form-usecontrol

`react-form-usecontrol` is a lightweight and customizable npm package for managing form state in React applications. It provides a custom hook, `useForm`, which simplifies the process of handling form state, validation, and user interactions.

## Features

- **Custom Hook**: Utilize the `useForm` hook to manage form state effortlessly.
- **Validation Support**: Implement custom validation logic to validate form fields.
- **Easy Integration**: Seamlessly integrate with existing React applications.
- **Error Handling**: Handle form submission errors with ease.
- **Flexible Configuration**: Customize form behavior according to your specific requirements.

## Installation

You can install `react-form-usecontrol` via npm or yarn:

```
npm install react-form-usecontrol
```

or

```
yarn add react-form-usecontrol
```

## Usage

```
import React from 'react';
import { useForm } from 'react-form-usecontrol';

const FormComponent = () => {
  // Define initial form state and validation function
  const {
    formState,
    reset,
    handleBlur,
    handleFocus,
    handleChange,
    handleSubmit,
  } = useForm<FormState>({
    initialValue,
    validator,
  });

  // Handle form submission
  const onSubmit = ({
    hasError,
    errors,
    values,
    touched,
    focused,
    isDirty,
  }) => {
    if (hasError) {
      console.log({ errors });
    } else {
      console.log({ values, touched, focused, isDirty });
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
      <input
        type="text"
        name="firstName"
        placeholder="Bangladesh"
        value={state.firstName.value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {state.firstName.error && <p>{state.firstName.error}</p>}

      <input
        type="text"
        name="lastName"
        placeholder="Bangladesh"
        value={state.lastName.value}
        onChange={(e) =>
          handleChange(e, () => {
            console.log("onchange callback");
          })
        }
        onFocus={(e) =>
          handleFocus(e, () => {
            console.log("onfocus callback");
          })
        }
        onBlur={(e) =>
          handleBlur(e, () => {
            console.log("onblur callback");
          })
        }
      />
      {state.lastName.error && <p>{state.lastName.error}</p>}

      <button type="reset" onClick={reset}>Clear</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
```

# Documentation

## Defining `initialValue` and `validator`

When using the `useForm` hook from `react-form-usecontrol`, you need to provide two essential parameters: `initialValue` and `validator`.

#### `initialValue`

The `initialValue` parameter is an object that defines the initial state of your form fields. Each key in this object represents a form field name, and its corresponding value represents the initial value of that field.

For example, if you have a form with `firstName` and `lastName` fields, you can define `initialValue` like this:

```typescript
const initialValue = {
  firstName: "",
  lastName: "",
};
```

#### `Validator`

The validator parameter is a function that defines the validation logic for your form fields. It takes the current form values as input and returns an object containing validation errors, if any.

For example, if you want to require both firstName and lastName fields to be filled out, you can define a validator function like this:

```typescript
const validator = (values: FormState): FormErrors => {
  const errors: FormErrors = {};

  if (!values.firstName) {
    errors.firstName = "First name is required";
  }

  if (!values.lastName) {
    errors.lastName = "Last name is required";
  }

  return errors;
};
```

## Return Statement Details

### `formState`

- `values`: An object containing the current values of each form field.
- `touched`: An object indicating whether each form field has been touched (i.e., interacted with) by the user.
- `focused`: An object indicating whether each form field is currently focused.
- `isDirty`: An object indicating whether each form field has been modified from its initial value.

### `reset()`

A function that resets all form fields to their initial values.

### `handleBlur(callback?)`

A function that handles the blur event on form fields. It optionally takes a callback function that will be invoked with the event object.

### `handleFocus(callback?)`

A function that handles the focus event on form fields. It optionally takes a callback function that will be invoked with the event object.

### `handleChange(callback?)`

A function that handles the change event on form fields. It optionally takes a callback function that will be invoked with the event object.

### `handleSubmit(callback?)`

A function that handles form submission. It optionally takes a callback function that will be invoked with an object containing the form submission details, including whether there are any errors, the errors object, the form values, touched fields, focused fields, and dirty fields.

For detailed documentation and examples, visit the [GitHub repository](https://github.com/example/react-form-usecontrol).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize and expand upon this README to best fit your package's features and usage guidelines!
