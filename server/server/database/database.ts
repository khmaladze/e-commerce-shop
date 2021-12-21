import mongoose from "mongoose";

const URI = process.env.MONGODB_URL;

// Connect to MongoDB
try {
  mongoose
    .connect(`${URI}`, {
      //   useNewUrlParser: true,
      //   useCreateIndex: true,
      //   useFindAndModify: false,
      //   useUnifiedTopology: true,
    })
    .then(() => console.log("db connected"));
} catch (error) {
  console.log(error);
}
