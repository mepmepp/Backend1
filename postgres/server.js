const { getUsers, insertUser } = require('./db_utils.js');
const { loggerMiddleware } = require('./middleware.js');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use(loggerMiddleware);

let user1 = {
    'email': 'hey@test.com'
}
let user2 = {
    'email': 'soweird@test.com'
}

const main = () => {
    // app.post('/insert-user', (request, response) => insertUser(user, request, response));
    insertUser(user1);
    insertUser(user2);
    app.get('/', (request, response) => {
        response.send('<h1>Home</h1>');
    });
    getUsers();

}

main();

app.listen(port, () => {
    console.log(`DB-Test listening on port ${port}`);
});
