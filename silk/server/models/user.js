const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


mongoose.set('useCreateIndex', true);

const User =  new mongoose.model({
    username: {
        type: String, 
        lowercase: true, 
        unique: true, 
        required: [true, "can't be blank"], 
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
      },
      email: {
          type: String, 
          lowercase: true, 
          unique: true, 
          required: [true, "can't be blank"], 
          match: [/\S+@\S+\.\S+/, 'is invalid'], 
        },
    checkAdmin: {
        type: Boolean,
        default: false
    },
  }, {timestamps: true});
  
  


UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('User', User);
