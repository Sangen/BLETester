(function(global) {
  'use strict';

  var util  = require('util');
  var bleno = require('bleno');

  // Class ------------------------------------------------
  function CKNAppControlCharact(app) {
    bleno.Characteristic.call(this, {
      uuid: 'C89E0001-A578-434B-88D2-0771CF635A0E',
      properties: ['read', 'write', 'writeWithoutResponse'],
    });

    this.app = app;
  }

  util.inherits(CKNAppControlCharact, bleno.Characteristic);

  CKNAppControlCharact.prototype.onReadRequest = function(offset, callback) {
    var data = new Buffer(2);
    data.writeUInt16LE(this.app.battery, 0);
    console.log('on [Read] app battery: ', data);
    callback(this.RESULT_SUCCESS, data);
  };

  CKNAppControlCharact.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
    var status = data.readUInt8(0);
    var type = withoutResponse ? 'WriteWithoutResponse' : 'Write';
    console.log('[' + type + '] to app test characteristic: ', data);
    if (status === 0) {
      console.log('  => SUCCESS');
      callback(this.RESULT_SUCCESS);
    }
    if (status === 1) {
      console.log('  => FAILURE with data length error');
      callback(this.RESULT_ATTR_NOT_LONG);
    }
    if (status === 2) {
      if (data.length === 1) {
        this.app.notifyContinuously(1);
        console.log('  => SUCCESS and notify once');
      } else {
        var num = data.readUInt8(1);
        this.app.notifyContinuously(num);
        console.log('  => SUCCESS and notify ' + num + 'times');
      }
      callback(this.RESULT_SUCCESS);
    }
  };

  // Exports ----------------------------------------------
  if ("process" in global) {
    module.exports = CKNAppControlCharact;
  }
})((this || 0).self || global);
