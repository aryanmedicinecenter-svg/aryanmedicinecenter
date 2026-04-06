const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// get orders
app.get("/orders", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  res.json(data);
});

// add order
app.post("/order", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  data.push(req.body);
  fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
  res.send("Order added");
});

// delete order
app.delete("/order/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  data.splice(req.params.id, 1);
  fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
  res.send("Deleted");
});

// update order
app.put("/order/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  data[req.params.id] = req.body;
  fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
  res.send("Updated");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});