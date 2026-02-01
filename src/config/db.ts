// import mongoose from "mongoose";

// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect(process.env.MONGO_URI || "");
//   console.log("Connect to mongodb");

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

// export default main;

import mongoose from "mongoose";

// import { DATABASE_URL } from "./env";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "db-pmapp",
    });
    return Promise.resolve("Database connected!");
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connect;
