import db from "@/lib/db";
import Destination from "@/models/Destination";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { formData } = await req.json();

  try {
    await db.connectDb();
    const { name, description, significance, image, city } = formData;
    if (!name || !description || !significance || !image || !city) {
      await db.disconnectDb();
      return new NextResponse(
        JSON.stringify({
          message: "Please fill all the required fields.",
          success: false,
        }),
        { status: 400 }
      );
    }

    await new Destination({
      name,
      description,
      significance,
      image,
      city,
    }).save();

    await db.disconnectDb();

    return new NextResponse(
      JSON.stringify({
        message: "Destination created successfully.",
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
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const id = searchParams.get("id");

  try {
    await db.connectDb();
    if (id) {
      const destination = await Destination.findById(id);
      await db.disconnectDb();
      return new NextResponse(JSON.stringify(destination), { status: 200 });
    }
    const destinations = await Destination.find();
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ destinations }), {
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
    const { name, description, significance, image, city } = formData;
    if (!name || !description || !significance || !image || !city) {
      await db.disconnectDb();
      return new NextResponse(
        JSON.stringify({
          message: "Please fill all the required fields.",
          success: false,
        }),
        { status: 400 }
      );
    }

    const destination = await Destination.findByIdAndUpdate(
      id,
      { name, description, significance, image, city },
      { new: true }
    );

    if (!destination) {
      await db.disconnectDb();
      return new NextResponse(
        JSON.stringify({
          message: "Destination not found.",
          success: false,
        }),
        { status: 404 }
      );
    }

    await db.disconnectDb();
    return new NextResponse(
      JSON.stringify({
        message: "Destination updated successfully.",
        success: true,
        destination,
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
    const destination = await Destination.findByIdAndDelete(id);

    if (!destination) {
      await db.disconnectDb();
      return new NextResponse(
        JSON.stringify({
          message: "Destination not found.",
          success: false,
        }),
        { status: 404 }
      );
    }

    await db.disconnectDb();
    return new NextResponse(
      JSON.stringify({
        message: "Destination deleted successfully.",
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ message: "Server error", success: false }), { status: 500 });
  }
}