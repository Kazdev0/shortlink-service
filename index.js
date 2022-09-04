const { Database } = require("ark.db");
const db = new Database();
const bodyParser = require("body-parser")

const express = require("express");
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
})
app.post("/", (req, res) => {
      
  try {
    db.set(req.body.shorter, req.body.url);
    return res.send("Successfully added shorter link <b>" + req.body.shorter + "</b>");
  } catch (e) {
    return res.send("Error "+ e)
  }
})
app.get("/:id", (req, res) => {
  var value = req.params.id;
  try {
    res.redirect(db.get(value))
  } catch (e) {
    res.send(e)
    console.log(e)
  }

})

app.get("/api/getAll", (req, res) => {
  res.json(db.all())
})
app.listen(3000)