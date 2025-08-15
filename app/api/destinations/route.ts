import db from "@/lib/db";
import Destination from "@/models/Destination";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await db.connectDb();
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
