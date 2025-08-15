import db from "@/lib/db";
import Trip from "@/models/Trip";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await db.connectDb();
    const trips = await Trip.find();
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ trips }), { status: 200 });
  } catch (error) {
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ message: "Server error", success: false }), { status: 500 });
  }
}
