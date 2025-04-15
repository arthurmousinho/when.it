import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

type SendEmailData = {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    public async sendEmail(data: SendEmailData) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: data.to,
            subject: data.subject,
            text: data.text,
            html: data.html,
        };

        return this.transporter.sendMail(mailOptions);
    }

}