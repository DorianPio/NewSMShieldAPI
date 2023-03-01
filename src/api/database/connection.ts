import mongoose from "mongoose";

export const connectToTheDatabase = async (): Promise<void> => {
  await mongoose
    .connect(
      process.env.DATABASE_CONNECT_URL
        ? process.env.DATABASE_CONNECT_URL
        : "mongodb://localhost:27017"
    )
    .then((): void => {
      console.log("Database connection successful");
    })
    .catch((error: any) => {
      throw new Error("Database error: " + error.message);
    });
};
