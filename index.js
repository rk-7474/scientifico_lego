const express = require('express')
const path = require('path');
const cors = require('cors')
const upload = require('./multer.js')
const app = express()
const db = require('./database.js')
const port = 3000

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cors())

app.use('/roomsdata', express.static(path.join(__dirname, 'rooms')));

app.get('/rooms/:id', async (req, res) => {
  res.sendFile(path.join(__dirname, "rooms/index.html"))
});

app.use('/create', express.static(path.join(__dirname, 'create')));

app.post('/api/file', upload.single("file"), async (req, res) => {
  const room_id = req.body.id;

  res.redirect('/');
});

app.get('/api/image', async (req, res) => {
  const image_url = req.query.url;
  if (!image_url) res.sendStatus(404);

  try {
    const response = await fetch(image_url)
    const blob = await response.blob()
    res.type(blob.type)
    blob.arrayBuffer().then((buf) => {
        res.send(Buffer.from(buf))
    })
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
})

app.get('/api/rooms', async (req, res) => {
  try {
    const data = await db.get(req.query.id);
    console.log("Getted "+JSON.stringify(data))
    res.send(data);
  } catch (e) {
    console.log(e)
    res.sendStatus(500);
  }
});

app.post('/api/rooms', async (req, res) => {
  try {
    await db.update(req.query.id, JSON.stringify(req.body))
    res.sendStatus(200);
  } catch (e) {
    console.log(e)
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening aaaaaaaaa port ${port}`)
})

