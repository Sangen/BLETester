(function(global) {
  'use strict';

  var util  = require('util');
  var bleno = require('bleno');

  // Class ------------------------------------------------
  function CKNAppReceiveCharact(app) {
    bleno.Characteristic.call(this, {
      uuid: 'C89E0002-A578-434B-88D2-0771CF635A0E',
      properties: ['notify', 'indicate'],
    });

    this.app = app;

    this.app.on('postWithNotify', function(id) {
      if (this.updateValueCallback) {
        var data = new Buffer(20);
        for (var i = 0; i < 20; ++i) {
          data.writeUInt8(id, 0);
        }
        this.updateValueCallback(data);
        console.log('[notify] data: ', data);
      }
    }.bind(this));
  }

  util.inherits(CKNAppReceiveCharact, bleno.Characteristic);

  CKNAppReceiveCharact.prototype.onSubscribe = function() {
    console.log('[subscribe] => SUCCESS');
  };

  CKNAppReceiveCharact.prototype.onUnsubscribe = function() {
    console.log('[unsubscribe] => SUCCESS');
  };

  CKNAppReceiveCharact.prototype.onReadRequest = function(offset, callback) {
    if (offset) {
      callback(this.RESULT_ATTR_NOT_LONG, null);
    }
    else {
      var data = new Buffer(2);
      data.writeUInt16LE(this.app.battery, 0);
      console.log('onRead app battery: ', data);
      callback(this.RESULT_SUCCESS, data);
    }
  };

  // Exports ----------------------------------------------
  if ("process" in global) {
    module.exports = CKNAppReceiveCharact;
  }
})((this || 0).self || global);
