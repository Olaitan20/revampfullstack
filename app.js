const express = require('express');
const path = require('path');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const app = express();

if (app.get('env') !== 'production') {
  require('dotenv').config();
}

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_SECRET,
  url: process.env.MAILGUN_ENDPOINT,
});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/sendmail', async (req, res) => {
  const { email, name, message } = req.body;
  const data = {
    from: `${name} <${email}>`,
    to: process.env.MAIL_RECIPIENT,
    subject: 'Contact Form Submission',
    text: message,
  };

  try {
    const msg = await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
    console.log(msg);

    return res.redirect('/contact.html');
  } catch (err) {
    console.log(err);
    return res.redirect(500, '/contact.html');
  }
});

module.exports = app;