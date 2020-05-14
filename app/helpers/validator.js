"use strict";

const mongoose = require("mongoose");




/* Database Validators and Error Handlers */



// Validates client-sent payload before querying database.
exports.prevalidate = (params, schema, attributeCheck = false) => {

    const paramKeys = Object.keys(params);
    const schemaKeys = Object.keys(schema);

    // Prevalidation Error Categories
    const category = {
        'missing': [],
        'extraneous': [],
        'invalid': {},
        'count': 0
    };

    // Check if there are specific attributes required, or if it's a whole schema check.
    var requirements;
    if (Array.isArray(attributeCheck)) {
        requirements = attributeCheck;
        requirements.push('is_active');
    } else {
        requirements = Object.keys(schema);
        requirements.push('_id');
    }

    // Convert id to _id.
    if (requirements.includes('id')) {
        const i = requirements.indexOf('id');
        requirements.splice(i, 1);
        requirements.push('_id');
    }
    
    // Check if valid id
    category.invalid = {};
    if (paramKeys.includes('_id') && requirements.includes('_id')) {
        if (!mongoose.Types.ObjectId.isValid(params._id)) {
            category.invalid.id = params.id;
            category.count++;
        } 
    }
    
    // Check for missing attributes.
    category.missing = requirements.filter(val => {
        return !paramKeys.includes(val);
    });
    if (category.missing.length > 0) category.count++;

    // Check for extraneous attributes.
    category.extraneous = paramKeys.filter(val => {
        return !requirements.includes(val);
    });
    if (category.extraneous.length > 0) category.count++;

    // TODO: Check type requirements of schema. 
    schemaKeys.forEach((attribute) => {
        const requiredType = schema[attribute].type;
    });

    // Compile errors.
    if (category.count > 0) {

        delete category.count;

        // Get categories.
        const categories = Object.keys(category);

        // Initialize final error holder object.
        const prevalidationErrors = {};
        prevalidationErrors.errors = {};

        var errorCount = 0;

        // Loop through valid categories.
        categories.forEach((categoryName) => {
            
            const elements = Array.isArray(category[categoryName]) ? category[categoryName] : Object.keys(category[categoryName]);

            if (elements.length > 0) {

                // Organize errors into parseable format.
                elements.forEach((attributeName) => {
                    prevalidationErrors.errors[errorCount] = {};
                    prevalidationErrors.errors[errorCount].name = "ValidationError";
                    prevalidationErrors.errors[errorCount].message = `Error: ${categoryName} '${attributeName}' attribute!`;
                    errorCount++;
                });

            }

        });

        //console.log(JSON.stringify(prevalidationErrors, null, 4));
        return {prevalidationErrors, isValid: false};
        
    }

    return {isValid: true};
}