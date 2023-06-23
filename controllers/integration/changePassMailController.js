const nodemailer = require("nodemailer");

async function changePassMailController(user) {
    console.log("Hola, entro:" + user.email);
  
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
      subject: "Cambio de contraseña RESPIRAR " + user.email,
      html: 'Bienvenido, ' + user.name + '. Haz clic en el siguiente enlace para modificar tu contraseña: <a href="http://localhost:3001/sucessregister/' + user.id + '">aca</a>',
      text: "Bienvenido, " + user.name + " haz clic en el siguiente enlace para modificar tu contraseña: http://localhost:3001/activate-account",
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
  
  module.exports = { changePassMailController };