var Alexa = require('alexa-sdk');
var request = require('request');

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context, callback);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  'LaunchRequest': function () {
    this.emit(':tell', 'Hello My House!');
  },
  'MyHouseTempIntent': function () {
    var self = this;
    self.emit(':tell', '22 degrees');
  },
  'MyHouseLightOffIntent': function () {
    var self = this;
    request('https://51a67dd5.ngrok.io/socket2Off', function (error, response, body) {
      self.emit(':tell', 'Light off');
    });
  },
  'MyHouseLightOnIntent': function () {
    var self = this;
    request('https://51a67dd5.ngrok.io/socket2On', function (error, response, body) {
      self.emit(':tell', 'Light on');
    });
  },
  'StopIntent': function() {
    this.emit(':tell', "Wait!");
  },
  'CancelIntent': function() {
    this.emit(':tell', "Wait!");
  }
};