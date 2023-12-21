
function sendJsonResponse(response, status = 200, data = {}, message = '', errors = {}) {
    const sendDataArr =  {
        status: status,
        message: message,
        data: data,
        errors: errors,
    };
    response.status(status).send(sendDataArr)
}

module.exports = {
    sendJsonResponse,
};
