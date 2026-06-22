import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function getOSFromUserAgent(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes("win")) return "Windows";
  if (ua.includes("mac")) {
    if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) return "iOS";
    return "macOS";
  }
  if (ua.includes("android")) return "Android";
  if (ua.includes("linux")) return "Linux";
  return "Unknown OS";
}

export async function POST(req: NextRequest) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(/, /)[0] : (req as any).ip || "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "";
    const os = getOSFromUserAgent(userAgent);

    console.log(`[HACK TRIGGER] IP: ${ip} | OS: ${os}`);

    // Create SMTP nodemailer transporter using portfolio SMTP env keys
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send the alert email
    await transporter.sendMail({
      from: `"Portfolio Security Alert" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      subject: `🚨 Hacker Event Alert: hack Command Triggered!`,
      text: `Alert: Someone typed "hack" in the terminal.\n\nIP Address: ${ip}\nOperating System: ${os}\nUser Agent: ${userAgent}\nTime: ${new Date().toISOString()}`,
      html: `
        <div style="font-family: monospace; color: #ff2a85; background-color: #08090f; padding: 24px; border: 1px solid #ff2a85; border-radius: 8px; max-width: 600px; margin: 0 auto; box-shadow: 0 0 15px rgba(255, 42, 133, 0.2);">
          <h2 style="color: #ff2a85; border-bottom: 1px solid rgba(255, 42, 133, 0.3); padding-bottom: 8px; margin-top: 0;">[SYSTEM ALERT: BYPASS DETECTED]</h2>
          <p style="color: #ffffff; font-size: 14px;">The <strong>hack</strong> command directive was triggered on your portfolio site terminal.</p>
          <div style="background-color: rgba(255, 255, 255, 0.05); padding: 16px; border-radius: 4px; border-left: 4px solid #ff2a85; margin: 16px 0;">
            <p style="margin: 4px 0; color: #ffffff;"><strong style="color: #10b981;">NODE IP:</strong> ${ip}</p>
            <p style="margin: 4px 0; color: #ffffff;"><strong style="color: #10b981;">NODE OS:</strong> ${os}</p>
            <p style="margin: 4px 0; color: #ffffff;"><strong style="color: #10b981;">TIMESTAMP:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p style="color: #888888; font-size: 11px; margin-bottom: 0;">User-Agent: ${userAgent}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, ip, os });
  } catch (err: any) {
    console.error("Failed to send security alert email:", err);
    // Return success to the client anyway to not break the UI experience if SMTP fails
    return NextResponse.json({ success: true, ip: "Unknown", os: "Unknown", mailError: err.message });
  }
}
