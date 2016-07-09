/*global GeoFire*/
'use strict';
angular.module('main')
  .factory('ArenasService', function (Ref, $firebaseArray, $firebaseObject, $cordovaGeolocation, FilteredArray) {
    var service = {
      getRef: getRef,
      getGeoQuery: getGeoQuery,
      getArenas: getArenas,
      getArena: getArena,
      getArenaNoSync: getArenaNoSync,
      getQuadrasArena: getQuadrasArena,
      getAlbum: getAlbum,
      getEstrutura: getEstrutura,
      arenaSelecionada: null
      //createGeo: createGeo
    };

    return service;

    function getRef() {
      return Ref.child('arenas');
    }

    function getGeoQuery() {
      var geoFire = new GeoFire(Ref.child('arenasLocalizacao'));
      return $cordovaGeolocation.getCurrentPosition().then(function (position) {
        return geoFire.query({
          center: [position.coords.latitude, position.coords.longitude],
          radius: 20
        });
      });
    }

    function getArena(id) {
      return $firebaseObject(getRef().child(id));
    }

    function getArenaNoSync(key) {
      return getRef().child(key).once('value');
    }

    function getArenas() {
      return $firebaseArray(getRef());
    }

    function getQuadrasArena(arena) {
      return $firebaseArray(Ref.child('arenasQuadras/' + arena));
    }

    function getAlbum(arena) {
      return $firebaseArray(Ref.child('arenasAlbuns/' + arena));
    }

    function getEstrutura(arena) {
      var ref = Ref.child('arenasEstrutura/' + arena).orderByChild('ordem');
      return new FilteredArray(ref, estruturaFilterFunc);
    }

    // function getEstrutura(arena) {
    //   return $firebaseArray(Ref.child('arenasEstrutura/' + arena).orderByChild('ordem').startAt(true).endAt(true));
    // }

    function estruturaFilterFunc(rec) {
      return rec.ativo;
    }

  })

  .factory('FilteredArray', function ($firebaseArray) {
   /*jshint -W004 */
        function FilteredArray(ref, filterFn) {
            this.filterFn = filterFn;
            return $firebaseArray.call(this, ref);
        }
        FilteredArray.prototype.$$added = function (snap) {
            var rec = $firebaseArray.prototype.$$added.call(this, snap);
            if (!this.filterFn || this.filterFn(rec)) {
                return rec;
            }
        };
        return $firebaseArray.$extend(FilteredArray);

  });