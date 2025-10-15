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
    await client.end();
}

requestEmails();