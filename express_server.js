const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/some-html', (req, res) => {
  res.send('<html><body><h1>Bonjour html !</h1></body></html>');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});