const { getUsers, insertUser } = require('./db_utils.js');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let user1 = {
    'email': 'bieber@test.com'
}
let user2 = {
    'email': 'justin@test.com'
}

const main = () => {
    getUsers();
    // app.post('/insert-user', (request, response) => insertUser(user, request, response));
    insertUser(user1);
    insertUser(user2);

}

main();

app.listen(port, () => {
    console.log(`DB-Test listening on port ${port}`);
});
