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
    if (!request.path.includes('restricted')) return console.log(`Requête autorisée on ${request.path}`) && next();

    const token = request.headers['token'];
    console.log('Token:', token);
    if (Number(token) !== 42) {
        console.log(`Requête non autorisée on ${request.path}`)
        return response.status(403).json({error: 'Requête non autorisée.'});
    } 

    console.log(`Requête autorisée on ${request.path}`);
    next();
}

const firewall = (request, response, next) => {
    const nonRestrictedUrls = [
        '/',
        '/hello',
        '/favicon.ico'
    ]
    

    if (nonRestrictedUrls.includes(request.path)) {
        console.log(`Accès à un URL non-restraint: ${request.path}`) 
        next();
    }

    verifyAuthorization(request, response, next);

}

module.exports = { logRouteType, logHeader, firewall };