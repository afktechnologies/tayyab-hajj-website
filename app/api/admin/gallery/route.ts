import db from "@/lib/db";
import GalleryItem, { IImage, IGalleryItem } from "@/models/GalleryItem";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { category, images } = await req.json();

  try {
    await db.connectDb();
    if (!category || typeof category !== "string" || !images || !Array.isArray(images) || images.length === 0) {
      await db.disconnectDb();
      return new NextResponse(
        JSON.stringify({ message: "Category (string) and images (non-empty array) are required.", success: false }),
        { status: 400 }
      );
    }

    // Check if category already exists
    const existingGalleryItem = await GalleryItem.findOne({ category });

    let galleryItem;
    if (existingGalleryItem) {
      // Append new images to existing category
      galleryItem = await GalleryItem.findOneAndUpdate(
        { category },
        { $push: { images: { $each: images } } },
        { new: true }
      );
    } else {
      // Create new category with images
      galleryItem = await GalleryItem.create({ category, images });
    }

    await db.disconnectDb();
    return new NextResponse(
      JSON.stringify({
        message: existingGalleryItem
          ? "Images added to existing category successfully."
          : "Gallery item created successfully.",
        success: true,
        galleryItem,
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
    const galleryItems = await GalleryItem.find();
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ galleryItems }), { status: 200 });
  } catch (error) {
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ message: "Server error", success: false }), { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { category, images } = await req.json();

  try {
    await db.connectDb();
    if (!category || typeof category !== "string" || !images || !Array.isArray(images) || images.length === 0) {
      await db.disconnectDb();
      return new NextResponse(
        JSON.stringify({ message: "Category (string) and images (non-empty array) are required.", success: false }),
        { status: 400 }
      );
    }

    // Check if category already exists
    const existingGalleryItem = await GalleryItem.findOne({ category });

    let galleryItem;
    if (existingGalleryItem) {
      // Replace the entire images array
      galleryItem = await GalleryItem.findOneAndUpdate(
        { category },
        { $set: { images } },
        { new: true }
      );
    } else {
      // Create new category with images
      galleryItem = await GalleryItem.create({ category, images });
    }

    await db.disconnectDb();
    return new NextResponse(
      JSON.stringify({
        message: existingGalleryItem
          ? "Gallery item updated successfully."
          : "Gallery item created successfully.",
        success: true,
        galleryItem,
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
    const galleryItem = await GalleryItem.findByIdAndDelete(id);

    if (!galleryItem) {
      await db.disconnectDb();
      return new NextResponse(
        JSON.stringify({ message: "Gallery item not found.", success: false }),
        { status: 404 }
      );
    }

    await db.disconnectDb();
    return new NextResponse(
      JSON.stringify({ message: "Gallery item deleted successfully.", success: true }),
      { status: 200 }
    );
  } catch (error) {
    await db.disconnectDb();
    return new NextResponse(JSON.stringify({ message: "Server error", success: false }), { status: 500 });
  }
}