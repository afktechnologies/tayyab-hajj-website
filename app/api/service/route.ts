import db from "@/lib/db";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

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