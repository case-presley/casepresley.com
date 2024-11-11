// backend/utils/mailer.js
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
    url: 'https://api.mailgun.net' // default Mailgun API URL
});

const sendNotificationEmail = async (email, subject, message) => {
    const data = {
        from: 'Case Presley <no-reply@casepresley.com>',
        to: email,
        subject: subject,
        text: message,
    };

    try {
        const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
        console.log(`Email sent: ${response.message}`);
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
    }
};

module.exports = sendNotificationEmail;
