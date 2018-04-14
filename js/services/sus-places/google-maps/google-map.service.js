import {
    GoogleMapsApi
} from './gmap.class.js';
import eventBusService from '../../event-bus.service.js';

const GOOGLE_API_KEY = 'AIzaSyBLudm0GgFeS_-v7yAud09Wg4oAWJ4sLrg';

var map;
var gTempMarker;
var gMarkers = [];
// google.maps.event.addListenerOnce(map, 'idle', function () {
//     // do something only the first time the map is loaded
// });

function initMap(lat = 32.0749831, lng = 34.9120554) {

    const gmapApi = new GoogleMapsApi();
    return gmapApi.load().then(() => {
        map = new google.maps.Map(
            document.querySelector('#map'), {
                center: {
                    lat,
                    lng
                },
                zoom: 15
            })
        // Sending an event that map loaded to start render places' markers on it.
        eventBusService.$emit('mapLoaded');
        google.maps.event.addListener(map, 'click', function (event) {
            let latLng = {lat: +event.latLng.lat(), lng: +event.latLng.lng()}
            eventBusService.$emit('newPlaceClicked', latLng);
        });
        console.log('Map has been loaded.', map);
    });
}

function getLocation(locationName) {
    return fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${locationName}&key=${GOOGLE_API_KEY}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (mapData) {
            let latLng = mapData.results[0].geometry.location;
            eventBusService.$emit('placeSearched', locationName, latLng);
            return mapData.results[0];
        })
}

function getLocationByPos(lat, lng) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (placeData) {
            // console.log(placeData.results.length)
            if (!placeData.results.length)
                return Error('No results!');
            return placeData.results;
        })
}

// 

function getAutocompleteList(locationName) {
    return fetch(`https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=${GOOGLE_API_KEY}&input=${locationName}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (mapData) {
            let locations = [];
            mapData.predictions.forEach(location => {
                locations.push(location.description);
            })
            return locations;
        });
}

function setCenter(pos) {
    map.panTo(pos);
}

function addMarker(loc, id) {
    // Deletes the previous marker if it was not saved.
    if (gTempMarker && !gTempMarker.get('saved')) {
        gTempMarker.setMap(null);
    }
    gTempMarker = new google.maps.Marker({
        position: loc,
        map,
    })
    gTempMarker.set('id', (id) ? id : Date.now());
    gTempMarker.setIcon('../../../.././img/sus-places/new-place-icon.png');
    return gTempMarker.get('id');
}

function removeMarker(id) {
    let marker = gMarkers.find(marker => {
        console.log(marker);
        console.log(marker.id);
        return marker.id === id;
    });
    marker.setMap(null)
    marker.set('saved', false);
}

function saveMarker(id) {
    if (gTempMarker) {
        let markerId = gTempMarker.get('id');
        gMarkers.push(gTempMarker);
        gTempMarker.setMap(map);
        gTempMarker.set('saved', true);
        gTempMarker.setIcon('../../../.././img/sus-places/saved-place-icon.png');
        gTempMarker.addListener('click', () => {
            eventBusService.$emit('markerClicked', markerId);
        });
        return Promise.resolve();
    }
}

function toggleMarker(id, toSelect) {
    let marker = gMarkers.find((marker) => {
        return marker.id === id;
    });
    if (toSelect) {
        marker.setIcon('../../../.././img/sus-places/clicked-place-icon.png');
    } else {
        marker.setIcon('../../../.././img/sus-places/saved-place-icon.png');
    }
}

export default {
    initMap,
    setCenter,
    getLocation,
    getLocationByPos,
    getAutocompleteList,
    addMarker,
    saveMarker,
    removeMarker,
    toggleMarker
}