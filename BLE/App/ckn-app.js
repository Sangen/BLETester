(function(global) {
  'use strict';

  var util   = require('util');
  var events = require('events');
  var conf   = require('config');

  // Class ------------------------------------------------
  function CKNApp() {
    events.EventEmitter.call(this);

    this.appVersion = 1;
    this.isPaired = false;
    this.position = 0;
    this.battery = 1024;

    this.getFlags = function() {
      var pairedFlag = this.isPaired ? 1 : 0;
      var positionFlag = (this.position << 1);
      return pairedFlag + positionFlag;
    };
   }

  util.inherits(CKNApp, events.EventEmitter);


  CKNApp.prototype.postWithNotify = function(id) {
    this.emit('postWithNotify', id);
  };

  CKNApp.prototype.notifyContinuously = function(num) {
    for (var i = 0; i <= num; ++i) {
      this.postWithNotify(i);
      for (var j = 0; j < 100000000; ++j) {
        // wait
      }
    }
  };

  // Exports ----------------------------------------------
  if ('process' in global) {
    module.exports = CKNApp;
  }
})((this || 0).self || global);
