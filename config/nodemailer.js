import nodemailer from "nodemailer";
import { EMAIL_PASS } from "./env.js";

export const accountEmail = "jindalyash0909@gmail.com";
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: accountEmail,
    pass: EMAIL_PASS,
  },
});

export default transport;

