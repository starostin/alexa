var alexa = require('alexa-app');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('hello_world');
app.id = require('./package.json').alexa.applicationId;

app.launch(function(req, res) {
  var stream = {
    url: 'https://cd4f4634.ngrok.io/dfm.m3u',
    token: 'https://cd4f4634.ngrok.io/dfm.m3u',
    offsetInMilliseconds: 0
  };
  res.audioPlayerPlayStream('REPLACE_ALL', stream);
  console.log(`${stream.url}.`);
  res.send();
});

app.intent('Max', {
  "utterances": ["who is Max"]
}, function(req, res) {
  res.say('Max is sobaka dikaya');
});

app.intent('PlayMfm', {
  "utterances": ["play mfm"]
}, function(req, res) {
    var stream = {
      url: 'https://cd4f4634.ngrok.io/mfm.m3u',
      token: 'https://cd4f4634.ngrok.io/mfm.m3u',
      offsetInMilliseconds: 0
    };
    res.audioPlayerPlayStream('REPLACE_ALL', stream);
    console.log(`${stream.url}.`);
    res.send();
});

app.intent('PlayDfm', {
  "utterances": ["play dfm"]
}, function(req, res) {
  var stream = {
    url: 'https://cd4f4634.ngrok.io/dfm.m3u',
    token: 'https://cd4f4634.ngrok.io/dfm.m3u',
    offsetInMilliseconds: 0
  };
  res.audioPlayerPlayStream('REPLACE_ALL', stream);
  console.log(`${stream.url}.`);
  res.send();
});

app.intent('AMAZON.NextIntent', function(req, res) {
  console.log('---------------NextIntent-----------')
  var stream = {
    url: 'https://cd4f4634.ngrok.io/dfm.m3u',
    token: 'https://cd4f4634.ngrok.io/dfm.m3u',
    offsetInMilliseconds: 0
  };
  res.audioPlayerPlayStream('REPLACE_ALL', stream);
  console.log(`${stream.url}.`);
  res.send();
});

app.intent('AMAZON.StopIntent', {}, function(req, res) {
  console.log('---------------StopIntent-----------')
  res.audioPlayerStop();
});

app.intent('AMAZON.CancelIntent', {}, function(req, res) {
  console.log('---------------CancelIntent-----------')
  res.audioPlayerStop();
  res.say('Bye');
});


module.exports = app;
