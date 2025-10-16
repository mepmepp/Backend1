require('dotenv').config({path: '../variables.env'});
const express = require('express');
const { logRouteType, logHeader, firewall } = require('./middlewares');
const app = express();
const port = process.env.PORT;

app.use(logRouteType);
app.use(logHeader);
app.use(firewall);

const main = () => {
    app.get('/', (request, response) => { response.send('<h1>Accueil</1>'); });
    app.get('/hello', (request, response) => { response.send('<h1>Hello!</1>'); });
    app.get('/restricted1', (request, response) => { response.send('<h1>Restricted Area</h1>'); });
    app.get('/restricted2', (request, response) => { response.send('<h1>Admin Space</h1>'); });
    app.post('/authenticate', (request, response) => {  });
}

app.listen(port, () => {
    console.log('Listening on port', port);
})

main();