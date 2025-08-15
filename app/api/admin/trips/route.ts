import db from "@/lib/db";
import Trip, { ITrip } from "@/models/Trip";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { destination, date, description, image, duration, price } = await req.json();

  try {
    await db.connectDb();
    if (
      !destination ||
      typeof destination !== "string" ||
      !date ||
      !description ||
      !image ||
      !image.src ||
      !image.alt ||
      !duration ||
      !price
    ) {
      await db.disconnectDb();
      return new NextResponse(
        JSON.stringify({ message: "All fields are required.", success: false }),
        { status: 400 }
      );
    }

    const existingTrip = await Trip.findOne({ destination });
    if (existingTrip) {
      await db.disconnectDb();
      return new NextResponse(
        JSON.stringify({ message: "Trip with this destination already exists.", success: false }),
        { status: 400 }
      );
    }

    const trip = await Trip.create({ destination, date, description, image, duration, price });
    await db.disconnectDb();
    return new NextResponse(
      JSON.stringify({ message: "Trip created successfully.", success: true, trip }),
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
      const trip = await Trip.findById(id);
      await db.disconnectDb();
      return new NextResponse(JSON.stringify(trip), { status: 200 });
    }
    const trips = await Trip.find();
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ trips }), { status: 200 });
  } catch (error) {
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ message: "Server error", success: false }), { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { id, destination, date, description, image, duration, price } = await req.json();

  try {
    await db.connectDb();
    if (
      !id ||
      !destination ||
      typeof destination !== "string" ||
      !date ||
      !description ||
      !image ||
      !image.src ||
      !image.alt ||
      !duration ||
      !price
    ) {
      await db.disconnectDb();
      return new NextResponse(
        JSON.stringify({ message: "All fields are required.", success: false }),
        { status: 400 }
      );
    }

    const existingTrip = await Trip.findOne({ destination, _id: { $ne: id } });
    if (existingTrip) {
      await db.disconnectDb();
      return new NextResponse(
        JSON.stringify({ message: "Trip with this destination already exists.", success: false }),
        { status: 400 }
      );
    }

    const trip = await Trip.findByIdAndUpdate(
      id,
      { destination, date, description, image, duration, price },
      { new: true }
    );

    if (!trip) {
      await db.disconnectDb();
      return new NextResponse(
        JSON.stringify({ message: "Trip not found.", success: false }),
        { status: 404 }
      );
    }

    await db.disconnectDb();
    return new NextResponse(
      JSON.stringify({ message: "Trip updated successfully.", success: true, trip }),
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
    const trip = await Trip.findByIdAndDelete(id);

    if (!trip) {
      await db.disconnectDb();
      return new NextResponse(
        JSON.stringify({ message: "Trip not found.", success: false }),
        { status: 404 }
      );
    }

    await db.disconnectDb();
    return new NextResponse(
      JSON.stringify({ message: "Trip deleted successfully.", success: true }),
      { status: 200 }
    );
  } catch (error) {
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ message: "Server error", success: false }), { status: 500 });
  }
}