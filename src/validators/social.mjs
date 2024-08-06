import { body, query } from "express-validator";

// validates login endpoint
const mediaList = [
  body("url").notEmpty().withMessage("url is required!"),
  body("url").isString().withMessage("url should be string!"),
];
const mediaDownload = [
  query("url").notEmpty().withMessage("url is required!"),
  query("url").isString().withMessage("url should be string!"),
  query("id").notEmpty().withMessage("id is required!"),
];

const socialValidator = {
  mediaList,
  mediaDownload,
};

export default socialValidator;
