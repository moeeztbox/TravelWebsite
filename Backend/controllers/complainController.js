import { sendContactEmail } from "./contactController.js";

export const sendComplainEmail = async (req, res, next) => {
  req.body = {
    ...(req.body || {}),
    type: "complain",
    message: req.body?.complaint ?? req.body?.message,
  };
  return sendContactEmail(req, res, next);
};

