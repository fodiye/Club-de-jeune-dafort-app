import nodemailer from 'nodemailer';

export default {
  async afterCreate(event: any) {
    const { result } = event;

    const smtpKey = process.env.SMTP_KEY;
    if (!smtpKey) {
      console.warn('⚠️ SMTP_KEY non configurée, email non envoyé');
      return;
    }

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_LOGIN,
          pass: smtpKey,
        },
      });

      await transporter.sendMail({
        from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_EMAIL}>`,
        to: process.env.MAIL_TO_EMAIL,
        replyTo: result.email,
        subject: `Nouveau message de ${result.nom} - ${result.sujet || 'Sans sujet'}`,
        text: `Nouveau message reçu via le site web :\n\nNom : ${result.nom}\nEmail : ${result.email}\nSujet : ${result.sujet || 'Non renseigné'}\n\nMessage :\n${result.message}\n\n---\nEnvoyé depuis le formulaire de contact du site Jeunes en Action de Dafort.`,
        html: `
<h2>Nouveau message reçu</h2>
<table style="border-collapse:collapse;width:100%;max-width:600px;">
  <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Nom</td><td style="padding:8px;border-bottom:1px solid #eee;">${result.nom}</td></tr>
  <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${result.email}">${result.email}</a></td></tr>
  <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Sujet</td><td style="padding:8px;border-bottom:1px solid #eee;">${result.sujet || 'Non renseigné'}</td></tr>
</table>
<h3>Message :</h3>
<p style="background:#f5f5f5;padding:16px;border-radius:8px;">${result.message.replace(/\n/g, '<br>')}</p>
<hr>
<p style="color:#888;font-size:12px;">Envoyé depuis le formulaire de contact du site Jeunes en Action de Dafort.</p>`,
      });

      console.log(`✅ Email envoyé pour le message de ${result.nom}`);
    } catch (err) {
      console.error('❌ Erreur envoi email:', err);
    }
  },
};
