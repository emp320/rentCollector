import mongoose from 'mongoose';
import Renter from '../models/renter';

const Schema = mongoose.Schema;

const aptSchema = new Schema({
  name: { type: String, required: true },
  sqft: { type: Number, required: true },
  bedrooms: { type: Number, default: 1 },
  floor: { type: Number },
  rent: { type: Number },
  renter: { type: mongoose.Schema.ObjectId, ref: 'Renter' },
  collectedRent: { type: Number, default: 0 },
  dateCreated: { type: Date, default: Date.now },
});

aptSchema.methods.lease = function (renterId, cb) {
  this.renter = renterId;
  this.save((err) => {
     if (err) return cb('EXCEPTION: APT LEASE FAILED!');
     Renter.findByIdAndUpdate(renterId, { apartment: this._id }, (err2) => {
          return cb('SUCCESS: APT LEASED!');
     });
  });
};

module.exports = mongoose.model('Apartment', aptSchema);
