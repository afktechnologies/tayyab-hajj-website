import db from "@/lib/db";
import Leads from "@/models/Leads";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await db.connectDb();
    const leads = await Leads.find();
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ leads }), {
      status: 200,
    });
  } catch (error) {
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ message: "Server error", success: false }), { status: 500 });
  }
}

export async function POST(req: Request) {
  return new NextResponse(
    JSON.stringify({
      message: "Just to make GET request no-cacheable",
      success: true,
    }),
    { status: 200 }
  );
}