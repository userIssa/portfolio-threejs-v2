import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New Portfolio Message from ${name}: ${subject || "No Subject"}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "-"}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; color: #15171C; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e7; border-radius: 8px;">
          <h2 style="margin-bottom: 16px; color: #804dee;">New Contact Form Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || "-"}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: #F4F4F5; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #804dee;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: err.message || "Something went wrong sending your message. Please try again." },
      { status: 500 }
    );
  }
}
