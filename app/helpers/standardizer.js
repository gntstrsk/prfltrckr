"use strict";

/* Data Standardization */

// Converts id from payload to _id for db.
// Add is_active to params
exports.prepareForDB = (params) => {
    const newParams = params;
    if (params.id && params.hasOwnProperty('id')) {
        newParams._id = params.id;
        delete newParams.id;
    }
    newParams.is_active = true;

    return newParams;
}

// Formats errors for response readability.
exports.formatErrors = (json) => {
    
    // REFERENCE FOR DB ERRORS
    /*
    const wrapper = {"errors":{}};
    const keys = Object.keys(json.errors);
    //console.log(json);
    
    keys.forEach((val, key) => {
        wrapper.errors[key] = {};
        wrapper.errors[key].name = json.errors[val].name;
        wrapper.errors[key].message = json.errors[val].message;
        wrapper.errors[key].message = json.errors[val].message;
    });
    
    return wrapper;
    */

    const wrapper = {"errors":{}};
    const keys = Object.keys(json.errors);

    // Group errors by type.
    keys.forEach((val) => {
        const error = json.errors[val];
        const errorType = error.name;

        // Check if error name is already existing in the list.
        if (!wrapper.errors.hasOwnProperty(errorType)) {
            wrapper.errors[errorType] = {};
            wrapper.errors[errorType].count = 0;
        }

        // Append error description to the given error type/name.
        wrapper.errors[errorType].count++;
        wrapper.errors[errorType][wrapper.errors[errorType].count] = error.message;
        
    });

    return wrapper;
}