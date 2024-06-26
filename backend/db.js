// to connect with mongo db serve
const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://adilavirk:adilavirk6083109@cluster0.xi41hsp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.set("strictQuery", false);
// to connect with db
const connectToMongo = () => {
  try {
    mongoose.connect(mongoURI, () => {
      console.log("connected to mongo successfuly");
    });
  } catch (error) {
    console.log("error in connecting to mongo", error);
  }
};
module.exports = connectToMongo;
