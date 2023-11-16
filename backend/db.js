// to connect with mongo db serve
const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/inotebook";
mongoose.set("strictQuery", false);
// to connect with db
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected to mongo successfuly");
  });
};
module.exports = connectToMongo;
