import db from "@/lib/db";
import GalleryItem, { IImage, IGalleryItem } from "@/models/GalleryItem";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await db.connectDb();
    const galleryItems = await GalleryItem.find();
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ galleryItems }), { status: 200 });
  } catch (error) {
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ message: "Server error", success: false }), { status: 500 });
  }
}
