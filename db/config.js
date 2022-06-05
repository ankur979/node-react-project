const mongoose = require("mongoose");


const username = "ankurverma";
const password = "9793249914";
const dbname = "e-comm";
// let u = 'mongodb://localhost:27017/e-dashboard'
// mongoose.connect(u)
const mongoAtlasUri = `mongodb+srv://${username}:${password}@cluster0.tfqzb.mongodb.net/${dbname}?retryWrites=true&w=majority`


  try {
    // Connect to the MongoDB cluster
    mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected"),
    );
  } catch (e) {
    console.log("could not connect");
  }
  
  const dbConnection = mongoose.connection;
  dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
  dbConnection.once("open", () => console.log("Connected to DB!"))