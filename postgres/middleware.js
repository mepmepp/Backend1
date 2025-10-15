

const loggerMiddleware = (request, response, next) => {
    console.log("Nouvelle requête entrante");
    next();
}

const verifyRequestBody = (request, response, next) => {
    let object = {
        name: 'I don\'t know',
        usage: 'Not sure what it is for',
        size: 'Somewhat variable',
        color: 'Unclear'
    }
    console.log(object);
    next();
}

module.exports = {
    loggerMiddleware,
    verifyRequestBody
};