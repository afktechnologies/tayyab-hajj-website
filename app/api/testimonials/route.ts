import db from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { formData } = await req.json();

  try {
    await db.connectDb();
    const { name, location, rating, feedback } = formData;
    if (!name || !location || !rating || !feedback) {
      await db.disconnectDb();
      return new NextResponse(
        JSON.stringify({
          message: "Please fill all the required fields.",
          success: false,
        }),
        { status: 400 }
      );
    }

    await new Testimonial({
      name,
      location,
      rating,
      feedback,
    }).save();

    await db.disconnectDb();

    return new NextResponse(
      JSON.stringify({
        message: "Thanks for your feedback, it has been submitted successfully.",
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ message: "Server error", success: false }), { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await db.connectDb();
    const testimonials = await Testimonial.find();
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ testimonials }), {
      status: 200,
    });
  } catch (error) {
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ message: "Server error", success: false }), { status: 500 });
  }
}