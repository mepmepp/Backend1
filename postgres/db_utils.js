const { Client } = require('pg');
require('dotenv').config({path: '../variables.env'});

const getConnection = () => {
    return new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.HOST,
        port: 5432,
        database: process.env.DB,
    });
}

const getUsers = async(callback) => {
    const client = getConnection();
    await client.connect();
    
    const emails = await client.query('SELECT email FROM users;');
    console.log(`Emails: ${JSON.stringify(emails.rows)}`);    
    await client.end();
}

const insertUser = async(user, request, response) => {
    if (!user, !user.email) return "Invalid request";

    const client = getConnection();
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