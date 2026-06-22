import { NextRequest, NextResponse } from "next/server";

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

    return NextResponse.json({ success: true, ip, os });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
