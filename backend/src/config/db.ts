import colors from "colors";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const store =
      "mongodb+srv://chatApp123:chatApp123@chat.iqfqs8r.mongodb.net/test";
    const conn: any = await mongoose.connect(store, {});

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`error in conneecting ${error}`);
    process.exit(1);
  }
};

export default connectDB;
