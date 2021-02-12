"use strict";

const mongoose = require("mongoose");
/*
const schema = {
    name: {
        type: String,
        description: "Name of persona."
     },
     nicknames: {
        type: [String],
        description: "Known nicknames of persona."
     },
     my_nicknames: {
        type: [String],
        description: "Nicknames I've given."
     },
     sexual_orientation: {
        type: String,
        description: "Known sexual orientation."
     },
     sex: {
        type: String,
        enum: [ "Male", "Female" ],
        description: "The ever-debated duality."
     },
     meeting_context: {
         type: Object,
         description: "When... where... why... how...",
         required: [ "when", "where", "why", "how" ],
         properties: {
             when: {
                 type: "date",
                 description: "Roughly the destined day."
             },
             where: {
                 type: String,
                 description: "The place of meeting."
             },
             why: {
                 type: String,
                 description: "Reason for meeting."
             },
             how: {
                 type: String,
                 description: "The manner in which fate happened."
             }
         }
     },
     relationship_history: {
         type: Object,
         description: "Relates history of togetherness.",
         required: [ "current" ],
         properties: {
             current: {
                 type: String,
                 description: "Currently..."
             }
         }
     },
     groups: {
         type: [Object],
         description: "Classifications... groupings... that make sense.",
         items: {
             type: "object"
         }
     },
     birthday: {
         type: Date,
         description: "Date of birth."
     },
     important_notes: {
         type: String,
         description: "More important details."
     },
     is_active: {
         type: Boolean,
         description: "Deletion is never permanent."
     }
};
*/
const schema = {
    name: {
        type: String,
        description: "Name of persona."
     },
     nicknames: {
        type: [String],
        description: "Known nicknames of persona."
     },
     my_nicknames: {
        type: [String],
        description: "Nicknames I've given."
     },
     is_active: {
        type: Boolean,
        description: "Deletion is never permanent."
    }
};

const Person = mongoose.model('Person', new mongoose.Schema(schema));
module.exports = {schema, Person};