# image-file-upload

### info

server that can upload and acquire image files

### start
```
node server.js
```

open test image upload page
 * http://localhost:5000/up.html

### code

```
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

/*
// TODO: upload test page
app.get("/up.html", (req, res) => {
  res.sendFile(__dirname + "/" + "up.html")
})
*/

app.get("/images/:file", async (req, res) => {
  try {
    let data = await fs.readFileSync(`./upload/${req.params.file}`)
    await res.set("Content-Type", "image/jpeg")
    await res.send(data)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

app.post("/file_upload", async (req, res) => {
  let data = await fs.readFileSync(req.file.path)

  const { size } = req.query

  const fileName = `${uuid()}.jpg`

  try {
    await sharp(data)
      .rotate()
      .resize(Number(size) || 120)
      .background("white")
      .jpeg()
      .toFile(`./upload/${fileName}`)

    return res.end(
      JSON.stringify({
        message: "Success!",
        filename: fileName,
      })
    )
  } catch (e) {
    res.status(500).send(e.message)
  }
})

app.listen(5000)
```

### API

#### POST http:localhost:5000/file_upload
 * image Upload

##### quey

|name|Type|Description|
|:---|:---|:---|
|size|number|image size (default: 120px)|

##### response

|name|Type|Description|
|:---|:---|:---|
|filename|string|upload file name|

#### GET http:localhost:5000/image/:fileName
 * Acquire the uploaded image file

### docker build
```
docker build --tag="image-file-upload:latest" .
```
### docker run
```
docker run -d -p 5000:5000 file_upload:latest
```
