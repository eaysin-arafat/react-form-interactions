`import React from "react";
import { useFormInteractions, ValidationRules } from "useFormInteractions";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

const initialValues: FormData = {
  firstName: "",
  lastName: "",
  email: "",
};

const validationRulesConfig: ValidationRules<FormData> = {
  firstName: [{ required: true }],
  lastName: [{ required: true }],
  email: [{ required: true, email: true }],
};

const BasicFormExample: React.FC = () => {
  const {
    formState,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    resetFormField,
    resetFormState,
    isValid,
    setErrors,
    setTouched,
    isSubmitting,
    setSubmitting,
  } = useFormInteractions<FormData>(initialValues, validationRulesConfig);

  const onSubmitHandler = (data: FormData) => {
    console.log(data);
    // Submit logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formState.values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className="error">{formState.errors.firstName}</div>
      </div>

      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formState.values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className="error">{formState.errors.lastName}</div>
      </div>

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

      <button type="submit" disabled={!isValid || isSubmitting}>
        Submit
      </button>
      <button type="button" onClick={resetFormState}>
        Reset
      </button>
    </form>
  );
};

export default BasicFormExample;
`;
