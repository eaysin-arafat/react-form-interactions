`import React from 'react';
import { useFormInteractions, ValidationRules } from 'useFormInteractions';

interface FormData {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
  age: string;
  phoneNumber: string;
  website: string;
}

const initialValues: FormData = {
  email: '',
  password: '',
  username: '',
  confirmPassword: '',
  age: '',
  phoneNumber: '',
  website: '',
};

const validationRulesConfig: ValidationRules<FormData> = {
  email: [
    { required: true, message: "Required" },
    { email: true, message: "Invalid email format" },
    {
      custom: (value) => value !== "000",
      message: "Cannot be '000'",
      dependencies: ["password"],
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
      dependencies: ["password"],
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
    { pattern: /^{10}$/, message: "Must be 10 digits" },
    {
      custom: (value) => value.startsWith("07"),
      message: "Must start with '07'",
    },
  ],
  website: [
    { url: true, message: "Must be a valid URL" },
  ],
};

const FormWithValidation: React.FC = () => {
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

      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formState.values.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className="error">{formState.errors.username}</div>
      </div>

      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formState.values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className="error">{formState.errors.confirmPassword}</div>
      </div>

      <div>
        <label>Age:</label>
        <input
          type="text"
          name="age"
          value={formState.values.age}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className="error">{formState.errors.age}</div>
      </div>

      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formState.values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className="error">{formState.errors.phoneNumber}</div>
      </div>

      <div>
        <label>Website:</label>
        <input
          type="text"
          name="website"
          value={formState.values.website}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className="error">{formState.errors.website}</div>
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

export default FormWithValidation;`;
