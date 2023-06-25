const nodemailer = require("nodemailer");

async function mailSenderController(user, subject, html, text) {
  console.log("Hola, entro:" + user.id);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "respirarnoreply@gmail.com",
      pass: "etzgbwnzwnvkpebw",
    },
  });

  const mailOptions = {
    from: "respirarnoreply@gmail.com",
    to: user.email,
    subject: subject,
    html: html,
    text: text,
    body: user.id,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      // Manejar el error de manera apropiada
    } else {
      console.log("Correo electrónico enviado: " + info.response);
      // Realizar acciones adicionales después de enviar el correo electrónico
    }
  });
}

module.exports = { mailSenderController };