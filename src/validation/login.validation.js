import * as Yup from "yup";
import { validation } from "../constants/constant";

const nameRegex = /^[A-Z a-z]+$/g;

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email must be a valid email.")
    .required(validation.emptyEmailField),
  password: Yup.string().required(validation.emptyPasswordField),
  captcha: Yup.string().required(validation.captchaRequired),
});

export { validationSchema };
