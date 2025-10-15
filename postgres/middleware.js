

const loggerMiddleware = (request, response, next) => {
    console.log("Nouvelle requête entrante");
    next();
}

module.exports = {
    loggerMiddleware
};