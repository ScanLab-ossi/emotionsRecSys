

let express = require("express");
const app = express();
let cors = require("cors");
let mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
app.use("/",require("./routes/userRoute")); 

const path = require("path");

mongoose.Promise = global.Promise;

require("dotenv").config();

const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
console.log(uri); 
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const moviesRouter = require("./routes/movies");

app.use("/api/movies", moviesRouter);


// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder;
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);

});



// Old ATLAS URI connection string (do not erase!)
// ATLAS_URI="mongodb+srv://lenskit:lenskit@movie0-waiy9.gcp.mongodb.net/test?retryWrites=true&w=majority"

//package.json :   "proxy": "http://localhost:5000",