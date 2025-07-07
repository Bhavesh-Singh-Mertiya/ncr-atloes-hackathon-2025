import * as Yup from "yup";
import { validation } from "../constants/constant";

// const FILE_SIZE = 160 * 1024;
//     const SUPPORTED_FORMATS = [
//       "image/jpg",
//       "image/jpeg",
//       "image/png"
//     ];

const nameRegex = /^(.*)?\S+(.*)?$/;

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("First Name is required.")
    .max(50, "You have reached maximum limit of 50 characters.")
    .matches(nameRegex, validation.invalidName),
  lastName: Yup.string()
    .required("Last Name is required.")
    .max(50, "You have reached maximum limit of 50 characters.")
    .matches(nameRegex, validation.invalidName),
  email: Yup.string().email().required("Email is required."),
  phoneNumber: Yup.string()
    // .matches(/^[0-9]+$/, "Phone Number must only contains digits")
    .min(13, "Phone Number must be 11 digits")
    .max(13, "Phone Number must be 11 digits")
    .required("Phone Number is required."),
  // image: Yup
  //     .mixed()
  //     .test(
  //       "fileSize",
  //       "File too large",
  //       value => value && value.size <= FILE_SIZE
  //     )
  //     .test(
  //       "fileFormat",
  //       "Unsupported Format",
  //       value => value && SUPPORTED_FORMATS.includes(value.type)
  //     )
});

export { validationSchema };
