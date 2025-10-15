const { Client } = require('pg');

const username = 'postgres';
const password = 'postgres';
const database = 'postgres';

const getConnection = (username, password, database) => {
    return new Client({
        user: username,
        password: password,
        host: 'localhost',
        port: 5432,
        database: database,
    });
}

const getUsers = async(callback) => {
    const client = getConnection(username, password, database);
    await client.connect();
    
    const emails = await client.query('SELECT email FROM users;');
    console.log(`Emails: ${JSON.stringify(emails.rows)}`);    
    await client.end();
}

const insertUser = async(user, request, response) => {
    if (!user, !user.email) return "Invalid request";

    const client = getConnection(username, password, database);
    await client.connect();

    try {
        await client.query('INSERT INTO users (email) VALUES ($1);', [user.email]);
        console.log(response);
    } catch (error) {
        console.error('error', error);
    }
    await client.end();
}

module.exports = {
    getUsers,
    insertUser,
};