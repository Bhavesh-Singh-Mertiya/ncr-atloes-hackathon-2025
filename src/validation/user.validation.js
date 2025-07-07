import * as Yup from "yup";
import { validation } from "../constants/constant";

const nameRegex = /^(.*)?\S+(.*)?$/;

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email must be a valid email.")
    .required(validation.emptyEmailField),
  lastName: Yup.string()
    .required(validation.lastNameEmpty)
    .matches(nameRegex, validation.invalidName)
    .max(50, "You have reached maximum limit of 50 characters."),
  cpfNumber: Yup.string()
    // .matches(
    //   /^(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/g,
    //   validation.invalidCPFCNPJ
    // )
    .min(11, validation.invalidCPFCNPJ)
    .max(14, validation.invalidCPFCNPJ)
    .required(validation.CPFCNPJrequired),
  firstName: Yup.string()
    .required(validation.firstNameEmpty)
    .matches(nameRegex, validation.invalidName)
    .max(50, "You have reached maximum limit of 50 characters."),
});

export { validationSchema };
