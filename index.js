const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const port = 5000 || process.env.PORT;
require("dotenv").config();
const cors = require("cors");
const { json } = require("express");

app.use(cors({ origin: true, credentials: true }));
app.use(json());

// // password
// ujoamahkyifjlnon
// app.post("/post", (req, res) => {
//   console.log(req.body);
//   res.send("ok");
// });
app.post("/send-email", (req, res) => {
  const { name, phone, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "picowf@gmail.com",
      pass: process.env.APP_PASS,
    },
  });
  // formybusiness455@gmail.com

  const mailOptions = {
    from: "picowf@gmail.com",
    to: "formybusiness455@gmail.com",
    subject: "Sending Email using Node.js",
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

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
