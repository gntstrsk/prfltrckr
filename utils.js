"use strict";

exports.formJsonResponse = (type, description, message="") => {
    return {message_type: type, message_type_description: description, message: message};
}

exports.formHttpResponse = (json) => {
    if (json.type == 'error') {
        
    }
}

exports.validationErrorHandler = (json) => {
    const wrapper = {"errors":{}};
    const keys = Object.keys(json.errors);
    console.log(json);
    
    keys.forEach((val, key) => {
        wrapper.errors[key] = {};
        wrapper.errors[key].name = json.errors[val].name;
        wrapper.errors[key].message = json.errors[val].message;
        wrapper.errors[key].message = json.errors[val].message;
    });
    
    return wrapper;
}