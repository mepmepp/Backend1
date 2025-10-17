const { randomToken } = require('./utils');

const logRouteType = (request, response, next) => {
    if (request.path.includes('restricted')) {
        console.log(`Route privée : ${request.path}`);
    } else {
        console.log(`Route publique : ${request.path}`);
    }
    next();
}

const logHeader = (request, response, next) => {
    console.log(request.headers);
    next();
}

const verifyAuthorization = (request, response, next) => {
    if (!request.path.includes('restricted')) console.log(`Requête autorisée on ${request.path}`) && next();

    const authorization = request.headers['authorization'];
    let email = request.body.email;
    console.log(randomToken);
    let isRegistered = randomToken[email].includes(authorization);
    console.log(authorization,isRegistered);

    if (isRegistered) {
        console.log(`Token d'authorization trouvé, requête autorisée.`);
        return next();// on peut enlever ça si on cree des fonctions séparées (il passe par !token malgré un next nature)
    }  
    console.log("taatat");
    const token = request.headers['token'];

    if (!token) {
       return response.status(403).json({error: 'Token non reçu.'});
        
    }

    if (Number(token) !== 42) {
        console.log(`Requête non autorisée on ${request.path}`)
        return response.status(403).json({error: 'Token non identique.'});
        
    } 

    console.log(`Requête autorisée on ${request.path}`);
    next();
}

const firewall = (request, response, next) => {
    const nonRestrictedUrls = [
        '/',
        '/hello',
        '/favicon.ico',
        '/authenticate'
    ]
    

    if (nonRestrictedUrls.includes(request.path)) {
        console.log(`Accès à un URL non-restraint: ${request.path}`) 
        next();
    }

    verifyAuthorization(request, response, next);

}

module.exports = { logRouteType, logHeader, firewall };