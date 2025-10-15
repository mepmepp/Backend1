const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'postgres',
});

const requestEmails = async() => {
    await client.connect();
    
    const emails = await client.query('SELECT email FROM users;');
    console.log(`Emails: ${JSON.stringify(emails.rows)}`);    
    // await client.end();
}

const insertUser = async(user, request, response) => {
    if (!user, !user.email) return "Invalid request";

    // await client.connect();

    try {
        client.query('INSERT INTO users (email) VALUES ($1);', [user.email]);
        console.log(response);
    } catch (error) {
        console.error('error', error);
    }
}

module.exports = {
  requestEmails,
  insertUser,
};