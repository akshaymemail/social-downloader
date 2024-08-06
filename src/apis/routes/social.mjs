import express from "express";
import socialController from "../controllers/social.mjs";
import validators from "../../validators/index.mjs";

const socialRouter = express.Router();

socialRouter.post(
  `/media-list/`,
  validators.social.mediaList,
  validators.isValid,
  socialController.mediaList
);
socialRouter.get(
  `/media-download/`,
  validators.social.mediaDownload,
  validators.isValid,
  socialController.mediaDownload
);

export default socialRouter;
