"use strict"

const express = require("express")
const app = express()
const fs = require("fs")
const bodyParser = require("body-parser")
const multer = require("multer")
const sharp = require("sharp")
const uuid = require("uuid/v1")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(multer({ dest: "./tmp/" }).single("file"))

app.get("/up.html", (req, res) => {
  res.sendFile(__dirname + "/" + "up.html")
})

app.post("/file_upload", async (req, res) => {
  let data = await fs.readFileSync(req.file.path)

  const fileName = `${uuid()}.jpg`

  await sharp(data)
    .rotate()
    .resize(120, 120)
    .background("white")
    .jpeg()
    .toFile(`${__dirname}/upload/${fileName}`)

  return res.end(
    JSON.stringify({
      message: "Success!",
      filename: fileName,
    })
  )
})

app.listen(5000)
