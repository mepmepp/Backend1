require('dotenv').config({path: '../variables.env'});
const express = require('express');
const { logRouteType, logHeader, firewall } = require('./middlewares');
const { generateToken } = require('./utils');
let { randomToken } = require('./utils');
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(logRouteType);
app.use(logHeader);
app.use(firewall);

const main = () => {
    app.get('/', (request, response) => { response.send('<h1>Accueil</1>'); });
    app.get('/hello', (request, response) => { response.send('<h1>Hello!</1>'); });
    app.get('/restricted1', (request, response) => { response.send('<h1>Restricted Area</h1>'); });
    app.get('/restricted2', (request, response) => { response.send('<h1>Admin Space</h1>'); });

    app.post('/authenticate', (request, response) => {
        const { email, password } = request.body; 
        if (!email || !password) {
            response.status(404).send('Error fetching email et password');
        };
        console.log(`Tentative de login : ${email} -> ******* `);

        randomToken[email] = generateToken(30);
        console.log(randomToken[email]);
        response.set('Authorization', randomToken[email]);


    });
}

app.listen(port, () => {
    console.log('Listening on port', port);
});

main();