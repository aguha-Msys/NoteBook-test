const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongodbConnect = require("./server");
const appRoutes = require("./routes/appRoutes");

const PORT = 3000;
const app = express();
//app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
//app.set("views", path.join(__dirname, "views"));

app.use(appRoutes);
//app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
  mongodbConnect;
});
