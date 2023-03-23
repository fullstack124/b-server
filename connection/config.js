

import mongoose from "mongoose";
import { config } from "dotenv";
config();
const connection = async () => {
  mongoose.connect(
      process.env.DATABASE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
    .then(() => {
      console.log("connection Successfully established");
    })
    .catch((err) => console.log(err.message));
};
export default connection;