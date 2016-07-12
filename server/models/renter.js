import mongoose from 'mongoose';
import Apartment from '../models/apartment';

const Schema = mongoose.Schema;

const renterSchema = new Schema({
  name: { type: String, required: true },
  money: { type: Number, required: true },
  apartment: { type: mongoose.Schema.ObjectId, ref: 'Apartment' },
  dateCreated: { type: Date, default: Date.now },
});

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
