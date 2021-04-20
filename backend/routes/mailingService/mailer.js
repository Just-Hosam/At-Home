const nodemailer = require('nodemailer');
const methods = {};

const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: 465,
	pool: true,
	secure: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

methods.letter = async function (name, recipient, subject, body) {
	var mailOptions = {
		from: process.env.EMAIL_USER + ` ${name}`,
		to: recipient,
		subject: subject,
		html: body,
		attachDataUrls: true,
	};

	transporter.sendMail(mailOptions, async function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
};

module.exports = methods;
