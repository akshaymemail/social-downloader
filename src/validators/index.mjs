import { isRequestValidated } from "../configs/validator.mjs";
import socialValidator from "./social.mjs";

const validators = {
  isValid: isRequestValidated,
  social: socialValidator,
};

export default validators;
