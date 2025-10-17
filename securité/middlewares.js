const { randomToken } = require('./utils');

const logRouteType = (request, response, next) => {
    if (request.path.includes('restricted')) {
        console.log(`logRouteType - route privée : ${request.path}`);
    } else {
        console.log(`logRouteType - route publique : ${request.path}`);
    }
    next();
}

const logHeader = (request, response, next) => {
    console.log(request.headers);
    next();
}

const verifyAuthorization = (request, response, next, authorization) => {
    // if (!request.path.includes('restricted')) console.log(`Requête autorisée on ${request.path}`) && next();
    if (randomToken.length === 0) {
        console.log(`verifyAuthorization - randomToken is empty, no access possible`);
        return response.status(403).send('<h1>You can\'t access to this area because you didn\'t registered</h1>');
    }
    console.log(`verifyAuthorization - randomToken state: ${randomToken}`);

    // const authorization = request.headers['authorization'];
    console.log(`verifyAuthorization - authorization passed to function: ${authorization}`);
    let email = request.body.email;
    console.log(`verifyAuthorization - email in request.body: ${email}`);
    console.log(`verifyAuthorization - randomToken: ${randomToken}`);
    let isRegistered = randomToken[email].includes(authorization);
    console.log(`verifyAuthorization - authorization: ${authorization}, registered: ${isRegistered}`);

    if (isRegistered) {
        console.log(`verifyAuthorization - token d'authorization trouvé, requête autorisée.`);
        next();
    } else {
        return response.status(403).send('<h1>Authorization doesn\'t match: you don\'t have the right authorization.</h1>');
    }
}

const verifyToken = (request, response, next, token) => {

    console.log(`verifyToken - token passed to function: ${token}`);

    // if (!token) {
    //    return response.status(403).json({error: 'Token non reçu.'});
        
    // }

    if (Number(token) !== 42) {
        console.log(`verifyToken - requête non autorisée on ${request.path}`)
        return response.status(403).send('<h1>Token non identique.</h1>');
        
    } 

    console.log(`verifyToken - requête autorisée on ${request.path}`);
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
        console.log(`firewall - accès à un URL non-restraint: ${request.path}`);
        next();
    } else {
        console.log('firewall - check if we should verifyToken');
        const token = request.headers['token'];
        if (token) verifyToken(request, response, next, token);
        console.log('firewall - check if we should verifyAuthorization');
        const authorization = request.headers['authorization'];
        if (authorization) verifyAuthorization(request, response, next, authorization);
        if (!token && !authorization) {
            console.log('firewall - returning error 403 because no token nor authorization found');
            response.status(403).send('<h1>Problème d\'autorisation.</h1>');
        }
    }
}

module.exports = { logRouteType, logHeader, firewall };