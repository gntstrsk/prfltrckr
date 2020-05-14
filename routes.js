"use strict";

// General Requirements
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const message = require('./app/helpers/message');

// Controllers
const PersonController = require('./app/controllers/PersonController');

// Routes

// Landing Page
/*
router.get('/', async (req, res, next) => {
  res.status(200).json({
    hello: "world"
  });
});
*/

// Get All Persons
router.get('/persons/', async (req, res, next) => {
  const persons = await PersonController.findAll();
  message.send(res, persons);
});

// Get Person By Id
router.get('/persons/:id', async (req, res, next) => {
  const persons = await PersonController.findOne(req.params);
  message.send(res, persons);
});

// Create Person
router.post('/persons/', jsonParser, async (req, res, next) => {
  const persons = await PersonController.create(req.body);
  message.send(res, persons);
});

// Update Person
router.put('/persons/', jsonParser, async (req, res, next) => {
  const persons = await PersonController.update(req.body);
  message.send(res, persons);
});

// Delete Person
router.delete('/persons/:id', jsonParser, async (req, res, next) => {
  const persons = await PersonController.deactivate(req.params);
  message.send(res, persons);
});

// Reactivate Person
router.patch('/persons/', jsonParser, async (req, res, next) => {
  const persons = await PersonController.activate(req.body);
  message.send(res, persons);
});

module.exports = router;
