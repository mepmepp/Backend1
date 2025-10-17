const generateToken = (number) => {
    console.log('Commence la génération de token.')
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for(let i = 0; i < number; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    console.log('Token terminé.');
    return token;
}

const randomToken = [];

module.exports = { generateToken, randomToken };