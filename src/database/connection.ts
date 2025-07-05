import { connect } from "mongoose";

const connectDB = async (uri: string): Promise<void> => {
  try {
    await connect(uri);
    console.log("Database connected..");
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Database connection failed: ${err.message}`);
    } else {
      console.error("Unknown error during DB connection:", err);
    }
    process.exit(1);
  }
};

export default connectDB;
