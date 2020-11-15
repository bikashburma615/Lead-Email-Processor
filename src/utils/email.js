import nodemailer from 'nodemailer';
import config from 'config';
import smtpTransport from 'nodemailer-smtp-transport';

let MAIL_OPTION = {
  from: 'lakestarmailer@gmail.com',
  to: 'lakestarmailer@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!',
  html: ''
};

var transporter = nodemailer.createTransport(smtpTransport({
  service: config.mail.MAIL_SERVICE,
  host: 'smtp.gmail.com',
  secure: true,
  port: 465,
  auth: {
    user: config.mail.MAILER_EMAIL,
    pass: config.mail.MAILER_PASSWORD
  }
}));

export function sendMail(email, content, actionType){
  return new Promise((resolve, reject) => {
    let mailOption = MAIL_OPTION;

    mailOption.to = email;
    mailOption.subject = `Update Action Type: ${actionType}`;
    mailOption.html = `Hi,<br/>
        The followong email has been updated:<br/><br/>
        <p>${content.body}</p>
        <br/><br/>
        <p>Action type: ${actionType}</p>`;

    mailOption.html += `<br/>Thank You.`

    transporter.sendMail(mailOption, function (error, info) {
      if (error) {
        return reject(error);
      } else {
        return resolve(info);
      }
    });
  })
};
