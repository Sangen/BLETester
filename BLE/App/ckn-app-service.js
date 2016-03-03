(function(global) {
  'use strict';

  var util  = require('util');
  var bleno = require('bleno');

  var CKNAppControlCharact  = require('./ckn-app-control-charact.js');
  var CKNAppReceiveCharact = require('./ckn-app-receive-charact.js');

  // Class ------------------------------------------------
  function CKNAppService(app) {

    bleno.PrimaryService.call(this, {
      uuid: 'C89E0000-A578-434B-88D2-0771CF635A0E',
      characteristics: [
        new CKNAppControlCharact(app),
        new CKNAppReceiveCharact(app),
      ]
    });
  }

  util.inherits(CKNAppService, bleno.PrimaryService);

  // Exports ----------------------------------------------
  if ('process' in global) {
    module.exports = CKNAppService;
  }
})((this || 0).self || global);
