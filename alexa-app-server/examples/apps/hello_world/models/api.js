var xapp = require('./xapp')
var Q = require('q');
var _ = require('underscore')
var superagent = require('superagent')

function Api(xappToken) {
  this.xappToken = xappToken;
  this.base_url = process.env["ARTSY_BASE_API_URL"];
}

Api.instance = function() {
  var deferred = Q.defer();
  xapp.token().then(function(token) {
    deferred.resolve(new Api(token));
  }).fail(function(error) {
    deferred.reject(error);
  });
  return deferred.promise;
}

Api.prototype.get = function(path, params) {
  var deferred = Q.defer();
  var request = superagent.get(`${this.base_url}${path}`).set('X-Xapp-Token', this.xappToken);
  if (params) request = request.query(params);
  request.end(function(error, results) {
    if (error || !results) {
      deferred.reject(error || 'Unexpected error.');
    } else {
      deferred.resolve(results.body);
    }
  });
  return deferred.promise;
}

Api.prototype.matchArtist = function(name) {
  var api = this;
  var deferred = Q.defer();
  // TODO: use APIv2 /search when it's backed by ElasticSearch
  api.get('/v1/match/artists', { term: name, size: 1 }).then(function(results) {
    var result = _.first(results)
    if (result) {
      deferred.resolve(api.get(`/v1/artist/${result._id}`, {}));
    } else {
      deferred.reject("No matching artists.")
    }
  }).fail(function(error) {
    deferred.reject(error);
  });
  return deferred.promise;
}

Api.prototype.findShows = function(lat, lon) {
  var api = this;
  var deferred = Q.defer();
  // TODO: use APIv2 /shows when it supports near param
  api.get('/v1/shows', { near: [lat, lon].join(','), sample: 1, sort: '-featured,-end_at', size: 1 }).then(function(results) {
    if (results) {
      deferred.resolve(results);
    } else {
      deferred.reject("No shows in this city.")
    }
  }).fail(function(error) {
    deferred.reject(error);
  });
  return deferred.promise;
}

module.exports = Api;
