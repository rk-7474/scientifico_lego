const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

app.get('/image', async (req, res) => {
  const image_url = req.query.url;
  
  if (!image_url) res.sendStatus(404);

  console.log(image_url)

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

