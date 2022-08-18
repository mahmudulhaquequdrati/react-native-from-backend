const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");
const { json } = require("express");
require("dotenv").config();

app.use(cors({ origin: true, credentials: true }));
app.use(json());

app.post("/send-email", (req, res) => {
  const { name, phone, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "picowf@gmail.com",
      pass: process.env.APP_PASS,
    },
  });

  // email should be changed
  // info@redpositive.in

  const mailOptions = {
    from: "picowf@gmail.com",
    to: "info@redpositive.in",
    subject: "Sending Email using nodeMailer & Node.js For Task",
    html: `<h2 >Email From ${name}</h2> <br/> <p>${email}</p> <br/> <p>${phone}</p> <br/>  <p>${message}</p>  `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send("Email sent");
    }
  });
});

app.get("/", (req, res) => res.send("server is running!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
