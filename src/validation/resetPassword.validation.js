import * as Yup from "yup";
import { validation } from "../constants/constant";

const validationSchema = Yup.object({
  password: Yup.string()
    .required(validation.emptyPasswordField)
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      validation.invalidPassword
    ),
  confirmPassword: Yup.string()
    .required(validation.emptyConfirmPasswordField)
    .oneOf([Yup.ref("password"), null], validation.confirmPasswordNotMatched),
});

export { validationSchema };
