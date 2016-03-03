(function(global) {
  'use strict';

  var util = require('util');
  var bleno = require('bleno');

  var CKNApp        = require('./App/ckn-app.js');
  var CKNAppService = require('./App/ckn-app-service.js');


  // Class ------------------------------------------------
  function CKNPeripheral() {

    var app        = new CKNApp();
    var appService = null;
    var name       = 'edison';

    bleno.on('stateChange', function(state) {
      console.log('state change ', state);
      if (state === 'poweredOn') {
        // Initialize after bleno become poweredOn
        appService = new CKNAppService(app);

        bleno.startAdvertising(name, [ appService.uuid ], function(err) {
          if (err) {
            console.log(err);
          }
        });
      }
      else {
        bleno.stopAdvertising();
      }
    });

    bleno.on('advertisingStart', function(err) {
      if (!err) {
        console.log('advertising...');

        bleno.setServices([
          appService,
          ]);
      }
    });

    bleno.on('advertisingStop', function() {
      console.log('advertising stop');
    });

    bleno.on('advertisingStartError', function(err) {
      console.log('advertising error ', err);
    });

    bleno.on('accept', function(clientAddress) {
      console.log('accept ', clientAddress);
    });

    bleno.on('disconnect', function(clientAddress) {
      console.log('disconnect ', clientAddress);
    });

  }

  // Exports ----------------------------------------------
  if ('process' in global) {
    module.exports = CKNPeripheral;
  }

})((this || 0).self || global);
