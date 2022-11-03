import dotenv from "dotenv";
dotenv.config();
import formData from "form-data";
import Mailgun from "mailgun.js";
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_APIKEY,
});

const sendEmail = async ({ to, subject, html }) => {
  return mg.messages.create(process.env.MAILGUN_DOMAIN, {
    from: "Jinncy Co <jinncyco@outlook.com>",
    to,
    subject,
    html,
  });
};

export default sendEmail;
