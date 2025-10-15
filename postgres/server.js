const { getUsers, insertUser } = require('./db_utils.js');
const { loggerMiddleware, verifyRequestBody } = require('./middleware.js');
const express = require('express');
const app = express();
const port = 3000;

app.use(verifyRequestBody);
app.use(loggerMiddleware);
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('templates'));


const randomNumber = Math.floor(Math.random() * 100);
let user1 = { 'email': `meh${randomNumber}@test.com` }

const main = () => {
    // app.post('/insert-user', (request, response) => insertUser(user, request, response));
    insertUser(user1);
    app.get('/', (request, response) => {
        response.send('<h1>Home</h1>');
    });
    app.post('/get-object', (request, response) => {
        console.log(request.body);
    })
    getUsers();

}

main();

app.listen(port, () => {
    console.log(`DB-Test listening on port ${port}`);
});
