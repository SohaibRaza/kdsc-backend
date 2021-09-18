import { load } from 'ts-dotenv';

export const env = load({
  GOOGLE_AUTH_CLIENT_ID: { type: String, optional: true },

  NODE_ENV: String,
  JWT_SECRET: String,
  MONGO_URI: String,

  MAIL_HOST: { type: String, optional: true },
  MAIL_PORT: { type: String, optional: true },
  MAIL_USERNAME: { type: String, optional: true },
  MAIL_PASSWORD: { type: String, optional: true },

  MAILGUN_SMTP_SERVER: { type: String, optional: true },
  MAILGUN_SMTP_PORT: { type: String, optional: true },
  MAILGUN_SMTP_LOGIN: { type: String, optional: true },
  MAILGUN_SMTP_PASSWORD: { type: String, optional: true },
  FROM_EMAIL: { type: String, optional: true },

  PORT: { type: Number, default: 3000 },

  REDIS_URL: String,

  APP_URL: String,
});
