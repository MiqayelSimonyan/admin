import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const defaultPermissions = ['start device', 'shut down device', 'restart device'];
const PermissionSchema = mongoose.Schema(
  {
    name: { type: String, trim: true }
  },
  {
    timestamps: true
  }
);

PermissionSchema.plugin(uniqueValidator);
mongoose.model('Permission', PermissionSchema);

let Permission = mongoose.model('Permission');