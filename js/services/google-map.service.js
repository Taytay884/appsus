import {
    GoogleMapsApi
} from './gmap.class.js';
import eventBusService from './event-bus.service.js';


const GOOGLE_API_KEY = 'AIzaSyBLudm0GgFeS_-v7yAud09Wg4oAWJ4sLrg';

var map;
var tempMarker;
var markers = [];

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
        google.maps.event.addListener(map, 'click', function (event) {
            // console.log(event) GET THE X, Y of the screen to make the PLACE DETAILS
            addMarker(event.latLng);
            getLocationByPos(+event.latLng.lat(), +event.latLng.lng());
            map.panTo({lat: +event.latLng.lat(), lng: +event.latLng.lng()})
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
            map.panTo(mapData.results[0].geometry.location);
            addMarker(mapData.results[0].geometry.location);
            return mapData.results[0];
        });
}

function getLocationByPos(lat, lng) {
    console.log('Getting place data...')
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (mapData) {
            let currPlace = {
                id: Date.now(),
                name: mapData.results[0].formatted_address,
                lat,
                lng,
                tags: [],
                description: '',
                photos: []
            }
            eventBusService.$emit('placeClicked', currPlace)
            console.log(mapData.results[0].formatted_address);
            
            // Name, Description, id, Photos(allow adding
            // photos), lat, lng, tag(fun / food / work / anything…)
        });
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

function setCenter (pos) {
    map.panTo(pos);
}

export default {
    initMap,
    setCenter,
    getLocation,
    getAutocompleteList
}

function addMarker(loc) {
    if(tempMarker)
        tempMarker.setMap(null)
        
    tempMarker = new google.maps.Marker({
        position: loc,
        map,
    })
    tempMarker.setIcon('https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png');
    // markers.push(marker);
    console.log(tempMarker);
}

// let removeMarkers = () => {
//     markers.forEach((marker) => {
//         marker.setMap(null);
//     })
//     markers = [];
// }

// export default {
//     initMap,
//     addMarker,
//     removeMarkers,
//     setCenter,
//     map
// }