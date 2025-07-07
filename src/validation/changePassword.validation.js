
import * as Yup from "yup";

const validationSchema = Yup.object({
    current_password: Yup.string().required("Current Password is required."),
    new_password: Yup.string().required("New Password is required.").matches(
        /(?=^.{8,32}$)(?=.*[a-zA-Z])[a-zA-Z0-9](?=.*[-+_!@#$%^&*., ?])/g,
        "Password must contain Digit, Lower case, Upper case, special Characters and min 8 char max 32 char."
    ),

    retype_new_password: Yup.string().required("Confirm New Password is required.")
        .oneOf([Yup.ref('new_password'), null], "Password doesn't match"),
});

export { validationSchema };