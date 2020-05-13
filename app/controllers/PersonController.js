"use strict";

const Person = require('../models/Person'); //TODO require all models programmatically
const util = require('../../utils');

exports.findAll = async () => {
    const persons = await Person.find();
    return util.formJsonResponse('success', "All Persons fetched!", persons);
};

exports.findOne = async (params) => {
    if (Object.keys(params.hasOwnProperty('id'))) {
        try {
            const person = await Person.findById(params.id);
        } catch (err) {
            //const errors = util.validationErrorHandler(err);
            if(err.name == 'CastError') {
                return util.formJsonResponse('error', "Error fetching person!", err);
            } else {
                console.log(err);
                // TODO: better error logging------ format this!
            }
            
        }
        return util.formJsonResponse('success', "Person fetched!", person);
    }
    return util.formJsonResponse('error', "No id given!");
};

exports.create = async (params) => {
    var errors = '';
    const person = new Person(params);
    await person.save(function (err, person) {
        if (err) {
            errors = util.validationErrorHandler(err);
        }
    });

    const errorCount = Object.keys(errors).length;
    if (errorCount > 0) {
        return util.formJsonResponse('error', "Person-creation error encountered!", errors);    
    }
    return util.formJsonResponse('success', "Person successfully created!", person);
}

exports.update = (params) => {
    return;
}

exports.remove = (params) => {
    return Person.findById(params.id);
}

/*

var wrapper = {};

wrapper.create = function(db, attributes){
    const Person = getModel(db);
    const person = new Person(attributes);

    person.save(function (err, person) {
        if (err) {
            // TODO make error logging better-- timestamps! 
            console.log(Object.values(err));
        }
        console.log(person);
    });

}

wrapper.findOneById = function(id){
    console.log("findOneById");
}

wrapper.getAll = function(){
    console.log("all");
}

module.exports = wrapper;
*/

/*
Person.getAll();
Person.findOneById(123);
Person.create(db, {name:"TEST123",fave:1});
*/