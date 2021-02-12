"use strict";

const {schema, Person} = require('../models/Person'); //TODO require all models programmatically
const message = require('../helpers/message');
const validator = require('../helpers/validator');
const standardizer = require('../helpers/standardizer');

const find = async (params, isActive = true) => {
    params.is_active = isActive;
    const persons = await Person.find(params);
    return persons;
}

exports.findAll = async () => {

    try {

        const persons = await find({});

        return message.buildJSON('success', "ResourceReadSuccess", persons);

    } catch (err) {
        console.log(err); // TODO: alert!
        return ;
    }

}

exports.findOne = async (params) => {

    try {

        params = standardizer.prepareForDB(params);

        const requirements = ['id'];
        const screened = validator.prevalidate(params, schema, requirements);

        if (screened.isValid) {
            
            const query = {
                _id: params._id
            };

            const person = await find(query);
            
            return message.buildJSON('success', "ResourceReadSuccess", person);
        }

        return message.buildJSON('error', "No id given!", standardizer.formatErrors(screened.prevalidationErrors));

    } catch (err) {
        console.log(err); // TODO: alert!
        return ;
    }

}

exports.create = async (params) => {

    try {

        params = standardizer.prepareForDB(params); //check

        // TODO: Add prevalidator here

        var errors = '';
        const person = new Person(params);
        await person.save(function (err, person) {
            if (err) {
                errors = standardizer.formatErrors(err); // TODO: parse this
            }
        });

        const errorCount = Object.keys(errors).length;
        if (errorCount > 0) {
            return message.buildJSON('error', "ResourceCreationSuccess", errors);    
        }
        return message.buildJSON('success', "Person successfully created!", person);
        
    } catch (err) {
        console.log(err); // TODO: alert!
        return ;
    }

}

exports.update = async (params) => {

    try {

        params = standardizer.prepareForDB(params);

        const screened = validator.prevalidate(params, schema);

        if (screened.isValid) {

            const query = {
                _id: params._id
            };
            
            const person = await find(query);

            console.log(person);

            if (Array.isArray(person) && person.length) {

                const updatedPerson = await Person.update(query, params);

                return message.buildJSON('success', "ResourceUpdateSuccess", params);
            }
            
            return message.buildJSON('error', "ResourceNotFoundError", "id does not exist!");
        }

        return message.buildJSON('error', "PrevalidationError", standardizer.formatErrors(screened.prevalidationErrors));

    } catch (err) {
        console.log(err); // TODO: alert!
        return ;
    }

}

exports.deactivate = async (params) => {
    try {

        params = standardizer.prepareForDB(params);
        params.is_active = false;

        const requirements = ['id'];
        const screened = validator.prevalidate(params, schema, requirements);

        if (screened.isValid) {

            const query = {
                _id: params._id
            };

            const person = await find(query);

            if (Array.isArray(person) && person.length) {

                const updatedPerson = await Person.update(query, params);

                return message.buildJSON('success', "ResourceDeletionSuccess", params);
            }
            
            return message.buildJSON('error', "ResourceNotFoundError", "id does not exist!");
        }

        return message.buildJSON('error', "PrevalidationError", standardizer.formatErrors(screened.prevalidationErrors));

    } catch (err) {
        console.log(err); // TODO: alert!
        return ;
    }
}

exports.activate = async (params) => {
    try {

        console.log(params);

        params = standardizer.prepareForDB(params);

        console.log(params);

        const requirements = ['id'];
        const screened = validator.prevalidate(params, schema, requirements);

        if (screened.isValid) {

            const query = {
                _id: params._id
            };

            const person = await find(query, false);

            if (Array.isArray(person) && person.length) {

                const updatedPerson = await Person.update(query, { $set: {is_active: true} });

                return message.buildJSON('success', "ResourceActivationSuccess", params);
            }
            
            return message.buildJSON('error', "ResourceNotFoundError", "id does not exist!");
        }

        return message.buildJSON('error', "PrevalidationError", standardizer.formatErrors(screened.prevalidationErrors));

    } catch (err) {
        console.log(err); // TODO: alert!
        return ;
    }
}
