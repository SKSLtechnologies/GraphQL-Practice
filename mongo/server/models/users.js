const mongoose = require('mongoose');
const crypto = require('crypto');

const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useCreateIndex', true);

const UserDetails =  new mongoose.Schema({
    name: {
        type: String, 
        lowercase: true, 
        unique: true, 
        required: [true, "can't be blank"], 
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
      },
      empcd: {
        type: String, 
        uppercase: true, 
        unique: true, 
        required: [true, "can't be blank"], 
        match: [/^[A-Z0-9]+$/, 'is invalid'], 
      },
      proj: {
        type: Number, 
      },
      email: {
          type: String, 
          lowercase: true, 
          unique: true, 
          required: [true, "can't be blank"], 
          match: [/\S+@\S+\.\S+/, 'is invalid'], 
        },
    isAdmin: {
        type: Boolean,
        default: false
    },
    hash: {
        type: String
    }, 
    salt: {
      type: String
    }, 
  }, {timestamps: true});
  

UserDetails.plugin(uniqueValidator, {message: 'is already taken.'});

UserDetails.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    };
UserDetails.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
    };

module.exports = mongoose.model('User', UserDetails);