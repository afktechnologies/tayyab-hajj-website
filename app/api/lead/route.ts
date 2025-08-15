import db from "@/lib/db";
import Leads from "@/models/Leads";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { formData } = await req.json();

  try {
    await db.connectDb();
    const { enquiryFor, name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      await db.disconnectDb();
      return new NextResponse(
        JSON.stringify({
          message: "Please fill all the required fields.",
          success: false,
        }),
        { status: 400 }
      );
    }

    await new Leads({
      enquiryFor,
      name,
      email,
      subject,
      message,
    }).save();

    await db.disconnectDb();

    return new NextResponse(
      JSON.stringify({
        message: "Thanks, we have got your details, we will get back to you soon",
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ message: "Server error", success: false }), { status: 500 });
  }
}