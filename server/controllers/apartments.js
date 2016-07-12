import express from 'express';
import Apartment from '../models/apartment';

import bodyValidator from '../validators/apartments/body';
// import queryValidator from '../validators/bookmarks/query';
import paramsValidator from '../validators/apartments/params';

const router = module.exports = express.Router();

// create
router.get('/', (req, res) => {
  Apartment.find().exec((err, apartments) => {
    res.send({ apartments });
  });
});

// create
router.post('/', bodyValidator, (req, res) => {
  Apartment.create(res.locals, (err, apartment) => {
    res.send({ apartment });
  });
});

// get
router.get('/:id', paramsValidator, (req, res) => {
  Apartment.findById(req.params.id, (err, apartment) => {
    res.send({ apartment });
  });
});

// delete
router.delete('/:id', paramsValidator, (req, res) => {
  Apartment.findByIdAndRemove(req.params.id, (err, apartment) => {
    if (apartment) {
      res.send({ id: apartment._id });
    } else {
      res.status(400).send({ messages: ['id not found'] });
    }
  });
});

// update
router.put('/:id/lease', paramsValidator, (req, res) => {
  Apartment.findById(req.params.id, (err, apartment) => {
    apartment.lease(req.body.renterId, (status) => {
      res.send({ status });
    });
  });
});

// update
router.put('/:id', paramsValidator, (req, res) => {
  Apartment.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, apartment) => {
    res.send({ apartment });
  });
});
