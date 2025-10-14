const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/some-html', (req, res) => {
  res.send('<html><body><h1>Bonjour html !</h1></body></html>');
});

app.get('/some-json', (req, res) => {
  const someJson = {
    'age': 22,
    'nom': 'Jane'
  };
  res.json(someJson);
});

app.get('/transaction', (req, res) => {
  const transaction = [100, 2000, 3000];
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  console.log(`Body: ${req.body}`);
  res.send(transaction);
});

app.get('/exo-query-string', (request, resultat) => {
  let age = request.query.age;
  let id = request.query.id;
  resultat.send(`<h1>AGE: ${age} / ID: ${id}</h1>`);
});

app.post('/data', (request, resultat) => {
  console.log(request.body);
  resultat.json(request.body);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});