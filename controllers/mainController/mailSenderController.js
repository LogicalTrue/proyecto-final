const nodemailer = require("nodemailer");

async function mailSenderController(user) {
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
    to: user.email, // Utiliza el campo correcto que contiene el correo electrónico del usuario
    subject: "Verificación de correo electrónico",
    text: "Haz clic en el siguiente enlace para verificar tu correo electrónico: ",
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
