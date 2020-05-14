"use strict";

/* Response-forming for client sending. */

// Creates JSON response to be sent back to client.
exports.buildJSON = (status, context, message = "") => {
    return {message_status: status, status_context: context, message: message};
}

// Creates HTTP Response to be sent back to client.
exports.send = (res, json) => {

    const response = {};
    response.json = json;

    if (json.message_status == 'error') {

        switch (json.status_context) {

            case 'ResourceNotFoundError':
                response.statusCode = 404;
                break;

            case '???Error':
                response.statusCode = 422
                break;

            case 'PrevalidationError':
            case 'ValidationError':
            default:
                response.statusCode = 400;
                break;
                
        }

    } else {
        switch (json.status_context) {

            case 'ResourceCreationSuccess':
                response.statusCode = 201;
                break;

            case 'ResourceDeletionSuccess':
                response.statusCode = 202;
                break;

            case 'ResourceUpdateSuccess':
            case 'ResourceReadSuccess':
            case 'ResourceActivationSuccess':
            default:
                response.statusCode = 200;
                break;
                
        }
    }
    
    res.status(response.statusCode).json(response.json);

}
