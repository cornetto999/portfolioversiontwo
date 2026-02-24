const DEFAULT_TO_EMAIL = "roayafrancisjake@gmail.com";
const DEFAULT_FROM_EMAIL = "Portfolio Contact <onboarding@resend.dev>";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    res.status(500).json({ success: false, error: "Missing RESEND_API_KEY" });
    return;
  }

  const body = typeof req.body === "string" ? safeJsonParse(req.body) : req.body;
  const name = sanitize(body?.name);
  const email = sanitize(body?.email);
  const message = sanitize(body?.message);

  if (!name || !email || !message) {
    res.status(400).json({ success: false, error: "Missing required fields" });
    return;
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM_EMAIL;

  const text = [
    "New message from portfolio contact form",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <h2>New message from portfolio contact form</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
  `;

  try {
    const upstream = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Portfolio Contact: ${name}`,
        text,
        html,
      }),
    });

    const raw = await upstream.text();
    const json = safeJsonParse(raw);

    if (!upstream.ok) {
      const reason =
        typeof json?.error?.message === "string"
          ? json.error.message
          : typeof json?.message === "string"
            ? json.message
            : raw || "Email provider request failed";
      res.status(upstream.status).json({ success: false, error: reason });
      return;
    }

    res.status(200).json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message || "Unexpected server error" });
  }
}

function safeJsonParse(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function sanitize(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
