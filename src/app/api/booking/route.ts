import { NextRequest, NextResponse } from "next/server";
import { getMailer } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  const { name, celebrityName, address, country, email, phone, eventDate, eventPlace, message, figureName, figureSlug } =
    await req.json();

  if (!name || !email || !message || !celebrityName || !address || !country || !eventPlace) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  try {
    const transporter = getMailer();

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.BOOKING_TO_EMAIL,
      replyTo: email,
      subject: `Booking inquiry: ${figureName || "General"}`,
      text: `
New booking inquiry

Figure: ${figureName || "N/A"} (${figureSlug ? `/${figureSlug}` : "N/A"})
Name: ${name}
Celebrity Name: ${celebrityName}
Email: ${email}
Phone: ${phone || "N/A"}
Address: ${address}
Country: ${country}
Preferred event date: ${eventDate || "N/A"}
Preferred event place: ${eventPlace}

Message:
${message}
      `.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Booking email failed:", err);
    return NextResponse.json(
      { error: "Failed to send inquiry. Please try again." },
      { status: 500 }
    );
  }
}