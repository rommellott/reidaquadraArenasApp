/*global */
'use strict';
angular.module('main')
  .controller('ArenasCtrl', function ($scope, ArenasService) {
    var vm = this;
    vm.arenaService = ArenasService;
    vm.arenas = [];

    activate();

    function activate() {
      loadArenas();
    }

    function loadArenas() {
      vm.arenaService.getGeoQuery().then(function (geo) {

        vm.map = {
          center: {
            latitude: geo.center()[0],
            longitude: geo.center()[1]
          },
          zoom: 12,
          options: {
            disableDefaultUI: true,
            // styles: [{ 'stylers': [{ 'hue': '#ff1a00' }, { 'invert_lightness': true }, { 'saturation': -100 }, { 'lightness': 33 }, { 'gamma': 0.5 }] }, { 'featureType': 'water', 'elementType': 'geometry', 'stylers': [{ 'color': '#2D333C' }] }]
             styles: [{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#1c99ed"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#1f79b5"}]},{"featureType":"administrative.province","elementType":"labels.text.fill","stylers":[{"color":"#6d6d6d"},{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#555555"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#999999"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"poi.attraction","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#e1eddd"}]},{"featureType":"poi.place_of_worship","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"},{"lightness":"45"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#009688"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"on"},{"hue":"#009aff"},{"saturation":"100"},{"lightness":"5"}]},{"featureType":"road.highway.controlled_access","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.fill","stylers":[{"color":"#009688"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway.controlled_access","elementType":"labels.icon","stylers":[{"lightness":"1"},{"saturation":"100"},{"hue":"#009aff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#8a8a8a"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"lightness":"33"},{"saturation":"-100"},{"visibility":"on"}]},{"featureType":"transit.station.bus","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.rail","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#4db4f8"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]}]
          }
        };

        geo.on('key_entered', function (key, location, distance) {
          vm.arenaService.getArenaNoSync(key).then(function (snapshot) {
            $scope.$apply(function () {
              var arena = snapshot.val();
              arena.distance = distance;
              arena.id = key;
              arena.l = { latitude: location[0], longitude: location[1] };
              vm.arenas.push(arena);
            });
          });
        });
      });
    }

  });
