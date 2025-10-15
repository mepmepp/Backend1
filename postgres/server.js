const { requestEmails, insertUser } = require('./db_utils.js');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let user1 = {
    'email': 'someone@test.com'
}
let user2 = {
    'email': 'someoneelse@test.com'
}

const main = () => {
    requestEmails();
    // app.post('/insert-user', (request, response) => insertUser(user, request, response));
    insertUser(user1);
    insertUser(user2);

}

main();

app.listen(port, () => {
    console.log(`DB-Test listening on port ${port}`);
});
