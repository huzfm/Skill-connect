import mongoose from "mongoose";
type connectionObject = {
  isConnected?: number;
};
const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
  }
  try {
    const db = await mongoose.connect(process.env.DATABASE || "");
    connection.isConnected = db.connections[0].readyState;
    console.log("database connection sucessfull");
  } catch (err) {
    console.log("failed to connected");
    process.exit(1);
  }
}
export default dbConnect;
