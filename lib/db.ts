// File: lib/db.ts
import mongoose from "mongoose";

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

async function connectDb(): Promise<void> {
  if (connection.isConnected) {
    return;
  }

  if (mongoose.connection.readyState >= 1) {
    connection.isConnected = mongoose.connection.readyState;
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.MONGODB_URL as string, {
    dbName: "tayyab",
  });

  connection.isConnected = db.connections[0].readyState;
}

async function disconnectDb(): Promise<void> {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = undefined;
    }
  }
}

const db = { connectDb, disconnectDb };
export default db;