const generateToken = (number) => {
    console.log('generateToken - commence la génération de token.')
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for(let i = 0; i < number; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    console.log('generateToken - terminé.');
    return token;
}

const randomToken = [];

module.exports = { generateToken, randomToken };