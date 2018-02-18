import mongoose from 'mongoose';
import crypto from 'crypto';
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const validateEmail = email => {
  const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regExp.test(email);
};

const validateUsername = username => {
  return username.length >= 3 && username.length <= 20;
};

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      validate: [
        validateUsername,
        'username should be between 3 and 20 characters'
      ]
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      validate: [validateEmail, 'Please fill a valid email address']
    },
    password: { type: String, trim: true, required: true },
    devices: [{
      device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
      permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }]
    }],
  },
  {
    timestamps: true
  }
);

UserSchema.pre('findOne', function (next) {
  if (this._conditions.password) {
    this._conditions.password = crypto.createHash('md5').update(this._conditions.password).digest("hex");
  }
  next();
});

UserSchema.pre('save', function (next) {
  if (this.password.length >= 1 && this.password.length != 32) {
    this.password = crypto.createHash('md5').update(this.password).digest("hex");
  }
  next();
});

UserSchema.plugin(deepPopulate);
mongoose.model('User', UserSchema);
