import db from "@/lib/db";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { formData } = await req.json();

  try {
    await db.connectDb();
    const { title, description, features, icon, color } = formData;
    if (!title || !description || !features || !icon || !color) {
      await db.disconnectDb();
      return new NextResponse(
        JSON.stringify({
          message: "Please fill all the required fields.",
          success: false,
        }),
        { status: 400 }
      );
    }

    await new Service({
      title,
      description,
      features,
      icon,
      color,
    }).save();

    await db.disconnectDb();

    return new NextResponse(
      JSON.stringify({
        message: "Service created successfully.",
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
    const services = await Service.find();
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ services }), {
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
    const { title, description, features, icon, color } = formData;
    if (!title || !description || !features || !icon || !color) {
      await db.disconnectDb();
      return new NextResponse(
        JSON.stringify({
          message: "Please fill all the required fields.",
          success: false,
        }),
        { status: 400 }
      );
    }

    const service = await Service.findByIdAndUpdate(
      id,
      { title, description, features, icon, color },
      { new: true }
    );

    if (!service) {
      await db.disconnectDb();
      return new NextResponse(
        JSON.stringify({
          message: "Service not found.",
          success: false,
        }),
        { status: 404 }
      );
    }

    await db.disconnectDb();
    return new NextResponse(
      JSON.stringify({
        message: "Service updated successfully.",
        success: true,
        service,
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
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      await db.disconnectDb();
      return new NextResponse(
        JSON.stringify({
          message: "Service not found.",
          success: false,
        }),
        { status: 404 }
      );
    }

    await db.disconnectDb();
    return new NextResponse(
      JSON.stringify({
        message: "Service deleted successfully.",
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ message: "Server error", success: false }), { status: 500 });
  }
}