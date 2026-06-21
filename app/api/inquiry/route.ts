import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE_EMAIL, SITE_NAME } from "@/lib/constants";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }
    const key = process.env.RESEND_API_KEY;
    if (!key) return NextResponse.json({ error: "Email service not configured." }, { status: 503 });

    const resend = new Resend(key);
    const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const product = body.productName ? `<p><b>Product:</b> ${body.productName}</p>` : "";
    const interest = body.researchInterest ? `<p><b>Research Interest:</b> ${body.researchInterest}</p>` : "";

    await resend.emails.send({
      from: `${SITE_NAME} <${from}>`,
      to: SITE_EMAIL,
      replyTo: body.email,
      subject: "New Inquiry - Acuris Science",
      html: `<h2>New Inquiry</h2>${product}<p><b>Name:</b> ${body.name}</p><p><b>Company:</b> ${body.company || "N/A"}</p><p><b>Email:</b> ${body.email}</p><p><b>Country:</b> ${body.country || "N/A"}</p>${interest}<p><b>Message:</b></p><p>${body.message}</p>`,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send inquiry." }, { status: 500 });
  }
}
