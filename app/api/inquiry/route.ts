import { NextResponse } from "next/server";
console.log("🔥 INQUIRY ROUTE V2 ACTIVE");
import { SITE_NAME } from "@/lib/constants";
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

    const emailUser = process.env.EMAIL_USER!;
    const name = body.name.trim();
    const email = body.email.trim();
    const company = body.company?.trim() || null;
    const country = body.country?.trim() || null;
    const researchInterest = body.researchInterest?.trim() || null;
    const productName = body.productName?.trim();
    const baseMessage = body.message.trim();
    const message = productName
      ? `Product: ${productName}\n\n${baseMessage}`
      : baseMessage;

    const inquiry = { name, company, email, country, researchInterest, productName, message };
    console.log("New inquiry:", inquiry);

    const productLine = productName
      ? `<p><b>Product:</b> ${escapeHtml(productName)}</p>`
      : "";

    await transporter.sendMail({
      from: `${SITE_NAME} <${emailUser}>`,
      to: emailUser,
      replyTo: email,
      subject: "New Inquiry - Acuris Science",
      html: `<h2>New Inquiry</h2>${productLine}<p><b>Name:</b> ${escapeHtml(name)}</p><p><b>Company:</b> ${escapeHtml(company || "N/A")}</p><p><b>Email:</b> ${escapeHtml(email)}</p><p><b>Country:</b> ${escapeHtml(country || "N/A")}</p><p><b>Research Interest:</b> ${escapeHtml(researchInterest || "N/A")}</p><p><b>Message:</b></p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Inquiry submission failed:", error);
    return NextResponse.json({ error: "Failed to send inquiry." }, { status: 500 });
  }
}
