import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  answerOptionId: Yup.number()
    .min(2, "Please enter a name with at least 2 characters.")
    .max(255, "You have reached max capacity")
    .required("Required"),
  resourceId: Yup.number()
    .min(2, "Please enter a name with at least 2 characters.")
    .max(255, "You have reached max capacity")
    .required("Required")
});

export default ValidationSchema;
