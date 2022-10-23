export type SendEmailDto = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  cc?: string;
  bcc?: string;
  template?: string;
  data?: any;
  html?: string;
};
