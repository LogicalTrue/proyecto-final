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
    to: user.email,
    subject: "Verificación de correo electrónico RESPIRAR " + user.email,
    html: 'Bienvenido, ' + user.name + '. Haz clic en el siguiente enlace para verificar tu correo electrónico: <a href="http://localhost:3001/newpassword/' + user.id + '">aca</a>',
    text: "Bienvenido, " + user.name + " haz clic en el siguiente enlace para verificar tu correo electrónico: http://localhost:3001/activate-account",
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