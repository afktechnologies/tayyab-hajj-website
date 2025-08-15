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

export async function PUT(req: Request) {
  const { id, formData } = await req.json();

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

    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      { name, location, rating, feedback },
      { new: true }
    );

    if (!testimonial) {
      await db.disconnectDb();
      return new NextResponse(
        JSON.stringify({
          message: "Testimonial not found.",
          success: false,
        }),
        { status: 404 }
      );
    }

    await db.disconnectDb();
    return new NextResponse(
      JSON.stringify({
        message: "Testimonial updated successfully.",
        success: true,
        testimonial,
      }),
      { status: 200 }
    );
  } catch (error) {
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ message: "Server error", success: false }), { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  try {
    await db.connectDb();
    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      await db.disconnectDb();
      return new NextResponse(
        JSON.stringify({
          message: "Testimonial not found.",
          success: false,
        }),
        { status: 404 }
      );
    }

    await db.disconnectDb();
    return new NextResponse(
      JSON.stringify({
        message: "Testimonial deleted successfully.",
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ message: "Server error", success: false }), { status: 500 });
  }
}