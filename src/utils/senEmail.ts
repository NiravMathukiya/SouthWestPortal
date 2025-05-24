import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

interface EmailSendParams {
  ToEmail: string | string[];
  Subject: string;
  emailBody: string;
  from_email?: string;
}

export const email_send = async (pars: EmailSendParams): Promise<any> => {
  try {
    const { ToEmail, Subject, emailBody, from_email } = pars;
    console.log(ToEmail, from_email)
    const toEmails = Array.isArray(ToEmail) ? ToEmail : [ToEmail];
    const senderEmail = from_email || process.env.FROM_EMAIL

    if (!senderEmail) {
      throw new Error('Missing sender email address');
    }

    const msg = {
      to: toEmails,
      from: senderEmail,
      subject: Subject,
      html: emailBody,
      replyTo: senderEmail,
    };
    const emailData = await sgMail.send(msg);
    return emailData;
  } catch (error: any) {
    console.error('SendGrid Error:', error?.response?.body || error.message);
    throw new Error('Failed to send email via SendGrid');
  }
};
