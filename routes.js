"use strict";

// General Requirements
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

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
  res.status(200).json({
    hello: persons
  });
});

// Get Person By Id
router.get('/persons/:id', async (req, res, next) => {
  const persons = await PersonController.findOne(req.params);
  res.status(200).json({
    hello: persons
  });
});

// Create Person
router.post('/persons/', jsonParser, async (req, res, next) => {
  const persons = await PersonController.create(req.body);
  res.status(200).json({
    hello: persons
  });
});

// Update Person
router.patch('/persons/', async (req, res, next) => {
  const persons = await PersonController.update(req.params);
  res.status(200).json({
    hello: persons
  });
});

// Delete Person
router.delete('/persons/:id', async (req, res, next) => {
  const persons = await PersonController.remove(req.params);
  res.status(200).json({
    hello: persons
  });
});

module.exports = router;
