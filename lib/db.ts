import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL!, {
      dbName: "whatsapp_templates",
    });
    isConnected = true;
  } catch {
    throw new Error("Erro connecting to database");
  }
};
