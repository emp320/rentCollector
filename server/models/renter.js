import mongoose from 'mongoose';
import Apartment from '../models/apartment';

const Schema = mongoose.Schema;

const renterSchema = new Schema({
  name: { type: String, required: true },
  money: { type: Number, required: true },
  apartment: { type: mongoose.Schema.ObjectId, ref: 'Apartment' },
  dateCreated: { type: Date, default: Date.now },
});

 // Apartment.findById(this.apartment)
 //   .populate('renters')
 //   .lean(true)
 //   .exec( (err, apartment) => {
 //     if (err) return cb(500, err);
 //     if (!apartment) return cb(404, {
  //      message: 'no apartment found for ID ' + this.apartment
 //     });
//      apartment.collectedRent += apartment.rent;
//      apartment.save((errSave) => {
//      if (errSave) return cb(405,'EXCEPTION: PAY RENT FAILED!');
//      return cb(200,'SUCCESS: RENT PAID!');
 //   });

renterSchema.methods.pay = function (cb) {
  Apartment.findById(this.apartment, (err, apt) => {
    if (err) return cb('FAILED');
    const rc = apt.collectedRent + apt.rent;
    apt.collectedRent = rc;
    apt.save((errSave) => {
      if (errSave) return cb('EXCEPTION: PAY RENT FAILED!');
      return cb('SUCCESS: RENT PAID!');
    });
  });
};

module.exports = mongoose.model('Renter', renterSchema)
