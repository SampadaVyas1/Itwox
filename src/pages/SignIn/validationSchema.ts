import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "password must be at least 6 characheters")
    .required("password is required"),
});

export default validationSchema;
