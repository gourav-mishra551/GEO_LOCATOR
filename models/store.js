const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    storeId:{
        type: 'string',
        required: true,
        unique: true,
        trim: true,
        maxlength : [10 , "length should be less than 20"]

    },
    address: {
        type: 'string',
        required: [true , "please add an address"]

    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          index: '2dsphere',
          required: true
        },
        formattedAdress: String
      },
      createdAt : {
        type: Date,
        default: Date.now()

      }
      
})


// Geocode & create location
storeSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress
    };
  
    // Do not save address
    this.address = undefined;
    next();
  });


module.exports = mongoose.model('store' , storeSchema)