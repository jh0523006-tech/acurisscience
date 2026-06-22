import { NextResponse } from "next/server";
import { SITE_EMAIL, SITE_NAME } from "@/lib/constants";
import { escapeHtml, getMailTransporter } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }

    const transporter = getMailTransporter();
    if (!transporter) {
      return NextResponse.json({ error: "Email service not configured." }, { status: 503 });
    }

    const name = body.name.trim();
    const email = body.email.trim();
    const message = body.message.trim();
    const company = body.company?.trim() || "N/A";
    const country = body.country?.trim() || "N/A";
    const researchInterest = body.researchInterest?.trim() || "N/A";
    const productName = body.productName?.trim();
    const productLine = productName
      ? `<p><b>Product:</b> ${escapeHtml(productName)}</p>`
      : "";

    const fromUser = process.env.EMAIL_USER || SITE_EMAIL;

    await transporter.sendMail({
      from: `${SITE_NAME} <${fromUser}>`,
      to: SITE_EMAIL,
      replyTo: email,
      subject: "New Inquiry - Acuris Science",
      html: `<h2>New Inquiry</h2>${productLine}<p><b>Name:</b> ${escapeHtml(name)}</p><p><b>Company:</b> ${escapeHtml(company)}</p><p><b>Email:</b> ${escapeHtml(email)}</p><p><b>Country:</b> ${escapeHtml(country)}</p><p><b>Research Interest:</b> ${escapeHtml(researchInterest)}</p><p><b>Message:</b></p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send inquiry." }, { status: 500 });
  }
}
