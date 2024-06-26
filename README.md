# react-form-interactions

## Features

- **Form State Management**: Manage and maintain state for form `values`, `errors`, and `touched` fields.
- **Validation Rules**: Define comprehensive validation rules for form fields including required fields, minimum/maximum lengths, patterns, and more.
- **Dynamic Validation**: Support dynamic validation rules that depend on other form values or external conditions.
- **Async Validation**: Asynchronously validate form fields using `custom validation functions` or `promises`.
- **Field Interactions**: Handle user interactions such as `onChange` and `onBlur` events for form fields.
- **Submission Handling**: Manage form submission with integrated validation to prevent invalid data from being submitted.
- **Form Reset**: Provide functionality to `reset` form fields to their `initial values` and clear validation errors.
- **Extensible**: Easily extend with `custom validation rules` and behaviors tailored to specific application requirements.
- **Integration with React**: Designed for seamless integration with React applications `using hooks` and `functional components`.
- **Error Messaging**: Automatically `manage and display error messages` associated with form fields `based on validation rules`.

## Installation

To install the `useFormInteractions` package, use npm or yarn:

```
npm install useFormInteractions
```

or

```
yarn add useFormInteractions
```

## Examples

```
import React from 'react';
import { useFormInteractions, ValidationRules } from 'useFormInteractions';

interface FormData {
  email: string;
  password: string;
}

const initialValues: FormData = {
  email: '',
  password: '',
};

const validationRulesConfig: ValidationRules<FormData> = {
  email: [{ required: true, email: true }],
  password: [{ required: true, minLength: 8 }],
};

const FormWithValidationExample = () => {
  const {
    formState,
    handleChange,
    handleBlur,
    handleSubmit,
    resetFormState,
    isValid,
    isSubmitting,
  } = useFormInteractions<FormData>(initialValues, validationRulesConfig);

  const onSubmitHandler = (data: FormData) => {
    console.log(data);
    // Submit logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formState.values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className="error">{formState.errors.email}</div>
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formState.values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className="error">{formState.errors.password}</div>
      </div>

      <button type="submit" disabled={!isValid || isSubmitting}>
        Submit
      </button>
      <button type="button" onClick={resetFormState}>
        Reset
      </button>
    </form>
  );
};

export default FormWithValidationExample;
```

# API

### useFormInteractions(initialValues, validationRulesConfig)

### Parameters

- `initialValues`: Object containing initial values for form fields.
- `validationRulesConfig`: Configuration object defining validation rules for each form field.

# Returns

**An object containing the following methods and properties:**

- `formState`: Object with `values`, `errors`, and `touched` properties representing current form state.
- `setFieldValue`: Function to update a specific field's value in the form state.
- `handleChange`: Function to handle changes in form field values.
- `handleBlur`: Function to handle blur events on form fields.
- `handleSubmit`: Function to handle form submission with validation.
- `resetFormField`: Function to reset a specific field's value and errors to its initial state.
- `resetFormState`: Function to reset all form values and errors to their initial state.
- `isValid`: Boolean indicating if the entire form is currently valid based on validation rules.
- `setErrors`: Function to manually set validation errors for specific fields.
- `setTouched`: Function to manually set the `touched` state for specific fields.
- `isSubmitting`: Boolean indicating if the form is currently being submitted.
- `setSubmitting`: Function to manually set the submitting state of the form.

# Validation Guide

### **Usage Examples**

**Note**: When specifying multiple validation rules with messages, each rule should be in its own object. For example, use <br/>
`{ required: true }, { pattern: /^\d{10}$/, message: "Phone number must be 10 digits" }` <br/>
instead of <br/>
`{ required: true, pattern: /^\d{10}$/, message: "Phone number must be 10 digits" }`.

### Simple Validation Rule

```
const validationConfig: ValidationRules<FormData> = {
  email: [{ required: true, email: true, lowercase: true }]
};
```

### Validation Rule with Custom Messages

```
const validationConfig: ValidationRules<FormData> = {
  email: [
    { required: true, message: "Email is required" },
    { email: true, message: "Must be a valid email" },
    { lowercase: true, message: "Must be in lowercase" }
  ]
};
```

### Custom Validation Rule

```
const validationConfig: ValidationRules<FormData> = {
  password: [
    {
      custom: (value, formValues) => formValues.email !== "000" || value !== "000",
      message: "Password cannot be '000' if email is '000'"
    },
    { required: true }
  ]
};
```

### Custom Validation Rule without Message

```
const validationConfig: ValidationRules<FormData> = {
  password: [
    {
      custom: (value, formValues) => formValues.email !== "000" || value !== "000"
    },
    { required: true }
  ]
};
```

### Validation Rule with revalidateFields

```
const validationConfig: ValidationRules<FormData> = {
  email: [
    {
      custom: (value) => value !== "000",
      message: "Email cannot be '000'",
      revalidateFields: ["password"]
    }
  ],
  password: [
    {
      custom: (value, formValues) => formValues.email !== "000" || value !== "000",
      message: "Password cannot be '000' if email is '000'"
    },
    { required: true }
  ]
};
```

**Note** : In the above example, the password input field's validation depends on the email field. When the email field is updated, the password validation error will be updated as well.

### Full Validation Config Example

```
const validationRulesConfig: ValidationRules<FormData> = {
  email: [
    { required: true, message: "Required" },
    { email: true, message: "Invalid email format" },
    {
      custom: (value) => value !== "000",
      message: "Cannot be '000'",
      revalidateFields: ["password"],
    },
  ],
  password: [
    { required: true, message: "Required" },
    {
      custom: (value, formValues) => formValues.email !== "000" || value !== "000",
      message: "Cannot be '000' if email is '000'",
    },
  ],
  username: [
    { required: true, message: "Required" },
    {
      custom: (value) => new Promise((resolve) => setTimeout(() => resolve(value !== "takenUsername"), 300)),
      message: "Already taken",
    },
  ],
  confirmPassword: [
    { required: true, message: "Required" },
    {
      custom: (value, formValues) => value === formValues.password,
      message: "Passwords must match",
      revalidateFields: ["password"],
    },
  ],
  age: [
    { required: true, message: "Required" },
    { numeric: true, message: "Must be a number" },
    { minValue: 18, message: "Must be at least 18" },
    { maxValue: 100, message: "Must be at most 100" },
    {
      custom: (value) => parseInt(value, 10) % 2 === 0,
      message: "Must be even",
    },
  ],
  phoneNumber: [
    { required: true, message: "Required" },
    { pattern: /^\d{10}$/, message: "Must be 10 digits" },
    {
      custom: (value) => value.startsWith("07"),
      message: "Must start with '07'",
    },
  ],
  website: [
    { url: true, message: "Must be a valid URL" },
  ],
};
```

## Built-in Validation Rules

### Basic Validation

- `required`: Field must have a value.
- `nullable`: Field can be null or undefined.
- `optional`: Field is not required.
- `allowEmpty`: Field can be empty ("").

### Text Validation

- `maxLength`: Maximum length of input.
- `minLength`: Minimum length of input.
- `pattern`: Regular expression pattern for validation.
- `email`: Must be a valid email format.
- `numeric`: Must be a numeric value.
- `alphanumeric`: Must be alphanumeric.

### String Manipulation

- `trim`: Remove leading and trailing whitespace.
- `lowercase`: Convert input to lowercase.
- `uppercase`: Convert input to uppercase.
- `startsWith`: Input must start with a specified string.
- `endsWith`: Input must end with a specified string.

### Specialized Input

- `phone`: Must be a valid phone number format.
- `creditCard`: Must be a valid credit card number.
- `password`: Must meet password strength criteria.
- `fieldMatch`: Must match another field in the form (keyof T).

### Numeric Constraints

- `maxValue`: Maximum numeric value allowed.
- `minValue`: Minimum numeric value allowed.
- `lessThan`: Must be less than a specified number.
- `moreThan`: Must be more than a specified number.
- `positive`: Must be a positive number.
- `negative`: Must be a negative number.
- `integer`: Must be an integer.
- `truncate`: Truncate decimal places.
- `round`: Round to a specified precision.

### Date and Time

- `date`: Must be a valid date format.
- `dateTime`: Must be a valid date and time format.
- `time`: Additional options for time validation (hourFormat, mode).

### File Validation

- `fileType`: Allowed file types.
- `fileSize`: Maximum file size in bytes.

### Boolean and URL

- `boolean`: Must be a boolean value (true or false).
- `url`: Must be a valid URL format.
- `checkboxRequired`: Checkbox must be checked.

### Form Interactions

- `asyncCheck`: Asynchronously validate using a custom function.
- `custom`: Synchronous or asynchronous custom validation function.

### revalidateFields

- `revalidateFields`: Array of field names that this validation rule depends on. When any of the dependent fields are updated, the validation rule will re-run.

## Summary

This validation guide provides an overview of the built-in validation rules available in the useFormInteractions package, along with examples of how to configure and use these rules in your React forms. The package offers a flexible and comprehensive way to manage form validation, ensuring data integrity and improving the user experience.
