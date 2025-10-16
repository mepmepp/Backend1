const logRouteType = (request, response, next) => {
    if (request.path.includes('restricted')) {
        console.log(`Route privée : ${request.path}`);
    } else {
        console.log(`Route publique : ${request.path}`);
    }
    next();
}

const verifyAuthorization = (request, response, next) => {
    if (!request.path.includes('restricted')) return next();

    const token = request.headers['token'];
    console.log('Token:', token);
    if (Number(token) !== 42) {
        console.log(`Requête non autorisée on ${request.path}`)
        return response.status(403).json({error: 'Requête non autorisée.'});
    } 
    
    console.log(`Requête autorisée on ${request.path}`);
    next();
}

module.exports = { logRouteType, verifyAuthorization };