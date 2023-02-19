const nodemailer = require('nodemailer');


async function SendMail(message){

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'hri.naina.me@gmail.com',
      pass: 'GQ@rtY4017#x',
      clientId: '235392296251-97al1bf1thso901qknncq7hfeiufv091.apps.googleusercontent.com',
      clientSecret: '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',
      refreshToken: '1//04duJmAYBETALCgYIARAAGAQSNwF-L9IruYsIX3Q2vgMrxINJ2A9tSVrLrbn4gTVBJgPG8ctpwwe5mggo9jy_JutaakyffbcaEnE'
    }
  });

    const mailData = {
        from: 'hri.naina.me@gmail.com',  // sender address
          to: 'humansofruralindia@gmail.com',   // list of receivers
          subject: `Issue from ${message.email}`,
          html:`<h1>Query/Issue</h1>
                <h3>Name: ${message.name}</h3>
                <h3>Email: ${message.email} </h3>
                <h3>Message: ${message.message}<h3>`
        };
    
        transporter.sendMail(mailData, function(error, info){
            if (error) {
              return error
            } else {
                return info.response
            }
          });
        }

    module.exports = {SendMail}