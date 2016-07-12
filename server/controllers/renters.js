/* eslint-disable newline-per-chained-call, new-cap, no-param-reassign, consistent-return, no-underscore-dangle, array-callback-return, max-len */

import express from 'express';
import Renter from '../models/renter';
import Apartment from '../models/apartment';
import bodyValidator from '../validators/renters/body';
// import queryValidator from '../validators/bookmarks/query';
import paramsValidator from '../validators/renters/params';
const router = module.exports = express.Router();

// create
router.get('/', (req, res) => {
  Renter.find().exec((err, renters) => {
    res.send({ renters });
  });
});

// get
router.get('/:id', paramsValidator, (req, res) => {
  Renter.findById(req.params.id, (err, renter) => {
    res.send({ renter });
  });
});


// create
router.post('/', bodyValidator, (req, res) => {
  Renter.create(req.body, (err, renter) => {
    res.send({ renter });
  });
});

// delete
router.delete('/:id', paramsValidator, (req, res) => {
  Renter.findByIdAndRemove(req.params.id, (err, renter) => {
    if (renter) {
      res.send({ id: renter._id });
    } else {
      res.status(400).send({ messages: ['id not found'] });
    }
  });
});

// pay rent
// router.put('/:id/pay', paramsValidator, (req, res) => {
//   Apartment.find({ renter: req.params.id }, (err, apt) => {
//     if (apt) { apt.collectedRent += apt.rent; console.log(apt); }
//     else { res.send('APT NOT FOUND!'); return;}
//
//     apt.save((errSave) => {
//       if (errSave) {
//          console.log('PAID RENT');
//         res.send('EXCEPTION: PAY RENT FAILED!');
//       } else {
//         console.log('RENT PAY FAILED! Errors:', err );
//         res.send('SUCCESS: RENT PAID!');
//       }
//     });
//   });
// });


// update
router.put('/:id', paramsValidator, (req, res) => {
  Renter.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, renter) => {
    res.send({ renter });
  });
});
