import { NextResponse } from "next/server";
import { SITE_EMAIL, SITE_NAME } from "@/lib/constants";
import { escapeHtml, getMailTransporter } from "@/lib/mail";
import { createSupabaseAnonClient } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }

    const supabase = createSupabaseAnonClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database service not configured." }, { status: 503 });
    }

    const transporter = getMailTransporter();
    if (!transporter) {
      return NextResponse.json({ error: "Email service not configured." }, { status: 503 });
    }

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

    const { error: dbError } = await supabase.from("inquiries").insert({
      name,
      company,
      email,
      country,
      research_interest: researchInterest,
      message,
    });

    if (dbError) {
      console.error("Supabase insert failed:", dbError.message);
      return NextResponse.json({ error: "Failed to save inquiry." }, { status: 500 });
    }

    const productLine = productName
      ? `<p><b>Product:</b> ${escapeHtml(productName)}</p>`
      : "";
    const fromUser = process.env.EMAIL_USER || SITE_EMAIL;

    await transporter.sendMail({
      from: `${SITE_NAME} <${fromUser}>`,
      to: SITE_EMAIL,
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
