import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    mongoose.connection.on("error", (error: mongoose.Error) => {
      console.log("MongoDB error" + error);
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
}