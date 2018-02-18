import express from 'express';
import mongoose from 'mongoose';
import Permissions from '../src/reducers/permission';

const router = (module.exports = express.Router());
const User = mongoose.model('User');
const Device = mongoose.model('Device');
const Permission = mongoose.model('Permission');

/* user */
router.get('/users', (req, res, next) => {
  User.find({}, { password: false })
    .deepPopulate('devices devices.device devices.permissions')
    .exec()
    .then(users => {
      res.send({ status: 200, users });
    })
    .catch(err => {
      return next(err);
    });
});

router.post('/user', (req, res, next) => {
  new User(req.body).save((err, user) => {
    if (err)
      return next({
        type: 'error',
        status: 400,
        message: err
      });

    User.findOne({ _id: user._id }, { password: false })
      .deepPopulate('devices devices.device devices.permissions')
      .exec((err, user) => {
        res.send({
          type: 'success',
          status: 200,
          message: 'User created',
          _id: user._id,
          username: user.username,
          email: user.email,
          permissions: user.permissions,
          devices: user.devices
        });
      });
  });
});

router.get('/user/:id', (req, res, next) => { });

router.put('/user/:id', (req, res, next) => {
  const user = req.body;
  User.findByIdAndUpdate({ _id: user._id },
    {
      $set: {
        username: user.username,
        email: user.email,
        devices: user.devices
      }
    },
    { runValidators: true })
    .deepPopulate('devices devices.device devices.permissions')
    .exec()
    .then(data => {
      User.findOne({ _id: user._id }, { password: false })
        .deepPopulate('devices devices.device devices.permissions')
        .exec((err, user) => {
          res.send({
            type: 'success',
            status: 200,
            message: 'User updated',
            _id: user._id,
            username: user.username,
            email: user.email,
            permissions: user.permissions,
            devices: user.devices
          });
        });
    })
    .catch(err => {
      return next({
        type: 'error',
        status: 400,
        message: err
      });
    });
});

router.delete('/user/:id/permission/:permission_id', (req, res, next) => {
  let { id, permission_id } = req.params;

  User.update({ _id: id, 'devices.permissions': permission_id },
    { $pull: { 'devices.$.permissions': permission_id } },
    { multi: true })
    .exec()
    .then(user => {
      User.findOne({ _id: id }, { password: false })
        .deepPopulate('devices devices.device devices.permissions')
        .exec((err, user) => {
          res.send({
            type: 'success',
            status: 200,
            message: 'User updated',
            _id: id,
            permissionId: permission_id,
            username: user.username,
            email: user.email,
            permissions: user.permissions,
            devices: user.devices
          });
        });
    })
    .catch(err => {
      return next({
        type: 'error',
        status: 400,
        message: err
      });
    })
});

router.delete('/user/:id/device/:device_id', (req, res, next) => {
  let { id, device_id } = req.params;

  User.update({ _id: id }, { $pull: { devices: { device: device_id } } })
    .exec()
    .then(user => {
      User.findOne({ _id: id }, { password: false })
        .deepPopulate('devices devices.device devices.permissions')
        .exec((err, user) => {
          res.send({
            type: 'success',
            status: 200,
            message: 'User updated',
            _id: id,
            deviceId: device_id,
            username: user.username,
            email: user.email,
            permissions: user.permissions,
            devices: user.devices
          });
        });
    })
    .catch(err => {
      return next({
        type: 'error',
        status: 400,
        message: err
      });
    })
});

router.delete('/user/:id', (req, res, next) => {
  User.remove({ _id: req.params.id })
    .exec()
    .then(user => {
      res.send({
        status: 200,
        message: 'User removed',
        _id: req.params.id
      });
    })
    .catch(err => {
      return next(err);
    });
});

/* device */
router.get('/devices', (req, res, next) => {
  Device.find({})
    .exec()
    .then(devices => {
      res.send({ status: 200, devices });
    })
    .catch(err => {
      return next(err);
    });
});

router.post('/device', (req, res, next) => {
  new Device(req.body).save((err, device) => {
    if (err)
      return next({
        type: 'error',
        status: 400,
        message: err
      });

    res.send({
      type: req.body.type,
      status: 200,
      message: 'Device created',
      _id: device._id,
      name: device.name
    });
  });
});

router.get('/device/:id', (req, res, next) => { });

router.put('/device/:id', (req, res, next) => {
  const device = req.body;

  Device.findOneAndUpdate({ _id: device.id }, { name: device.name }, { runValidators: true })
    .exec()
    .then(device => {
      res.send({
        status: 200,
        message: 'Device updated',
        _id: device.id,
        name: device.name
      });
    })
    .catch(err => {
      return next({
        type: 'error',
        status: 400,
        message: err
      });
    });
});

router.delete('/device/:id', (req, res, next) => {
  Device.remove({ _id: mongoose.Types.ObjectId(req.params.id) })
    .exec()
    .then(data => {
      User.update(
        { 'devices.device': mongoose.Types.ObjectId(req.params.id) },
        { $pull: { devices: { device: mongoose.Types.ObjectId(req.params.id) } } },
        { multi: true }
      )
        .exec()
        .then(data => {
          res.send({
            status: 200,
            message: 'Device removed',
            _id: req.params.id
          });
        })
        .catch(err => {
          return next(err);
        });
    });
});

/* permission */
router.get('/permissions', (req, res, next) => {
  Permission.find({})
    .exec()
    .then(permissions => {
      res.send({ status: 200, permissions });
    })
    .catch(err => {
      return next(err);
    });
});

router.post('/permission', (req, res, next) => {
  const { permissions } = req.body;
  let permissionsFilter = permissions.map(permission => permission.name);

  Permission.insertMany(permissions)
    .then(() => {
      Permission.find({ name: { $in: permissionsFilter } })
        .exec()
        .then(items => {
          res.send({
            status: 200,
            message: 'Permission created',
            permissions: items
          });
        })
        .catch(err => {
          return next(err);
        });
    })
    .catch(err => {
      return next({
        type: 'error',
        status: 400,
        message: err
      });
    })
});

router.put('/permission/:id', (req, res, next) => {
  const permission = req.body;

  Permission.findOneAndUpdate({ _id: permission.id }, { name: permission.name }, { runValidators: true })
    .exec()
    .then(permission => {
      res.send({
        status: 200,
        message: 'Permission updated',
        _id: permission.id,
        name: permission.name
      });
    })
    .catch(err => {
      return next({
        type: 'error',
        status: 400,
        message: err
      });
    });
});

router.delete('/permission/:id', (req, res, next) => {
  const { id } = req.params;

  Permission.remove({ _id: mongoose.Types.ObjectId(id) })
    .exec()
    .then(data => {
      User.update(
        { 'devices.permissions': mongoose.Types.ObjectId(id) },
        { $pull: { 'devices.$.permissions': mongoose.Types.ObjectId(id) } },
        { multi: true }
      )
        .exec()
        .then(data => {
          res.send({
            status: 200,
            message: 'Permission removed',
            _id: id
          });
        })
        .catch(err => {
          return next(err);
        });
    });
});