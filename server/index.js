const express = require('express')
const path = require('path');
const cors = require('cors')
const app = express()
const db = require('./database.js')
const port = 3000

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cors())
app.use('/', express.static(path.join(__dirname, 'client')));

app.get('/rooms', async (req, res) => {
  res.render(path.join(__dirname, "index.html"))
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
  console.log(`Example app listening on port ${port}`)
})

