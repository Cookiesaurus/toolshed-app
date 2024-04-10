const nodemailer = require("nodemailer");
export const EMAIL = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;


export const transporter = nodemailer.createTransport({
    pool: true,
    service: "gmail",
    auth:{
        user: EMAIL,
        pass
    },
});