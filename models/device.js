import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const defaultDevices = ['camera', 'door', 'lamp'];
const DeviceSchema = mongoose.Schema(
  {
    name: { type: String, trim: true }
  },
  {
    timestamps: true
  }
);

DeviceSchema.plugin(uniqueValidator);
mongoose.model('Device', DeviceSchema);

let Device = mongoose.model('Device');