import * as nodemailer from 'nodemailer';
import { layout, Template, templates } from '~src/emailTemplates';
import { env } from '~common/constants';

interface EmailTemplate {
  html: string;
  subject: string;
}

export class Mail {
  static transporter: nodemailer.Transporter;

  constructor() {
    if (!Mail.transporter) {
      Mail.transporter = nodemailer.createTransport({
        host: env.MAIL_HOST || env.MAILGUN_SMTP_SERVER,
        port: Number(env.MAIL_PORT || env.MAILGUN_SMTP_PORT),
        secure: false,
        auth: {
          user: env.MAIL_USERNAME || env.MAILGUN_SMTP_LOGIN,
          pass: env.MAIL_PASSWORD || env.MAILGUN_SMTP_PASSWORD,
        },
      });
    }
  }

  async renderTemplate(
    templateName: Template,
    data: GenericObject,
  ): Promise<EmailTemplate> {
    const template = templates[templateName];
    const html = layout(template.content(data), {
      ORIGIN: env.APP_URL,
    });

    const subject = (template.subject as (data: GenericObject) => string)(data);

    return {
      html,
      subject,
    };
  }

  async sendMail(opts: {
    template: Template;
    data: GenericObject;
    from?: string;
    to: string;
  }): Promise<nodemailer.SentMessageInfo> {
    const { html, subject } = await this.renderTemplate(
      opts.template,
      opts.data || {},
    );
    try {
      const res = await Mail.transporter.sendMail({
        from: opts.from || env.FROM_EMAIL || 'sohaib <support@trybonsai.com>',
        to: opts.to,
        subject,
        html,
      });
      return res;
    } catch (err) {
      return null;
    }
  }
}
