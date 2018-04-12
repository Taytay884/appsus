import {
    GoogleMapsApi
} from './gmap.class.js';

const GOOGLE_API_KEY = 'AIzaSyBLudm0GgFeS_-v7yAud09Wg4oAWJ4sLrg';

var map;

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

        console.log('Map has been loaded.', map);
    });


}

function getLocation(locationName) {
    return fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${locationName}&key=${GOOGLE_API_KEY}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (mapData) {
            setCenter(mapData.results[0].geometry.location);
            return mapData.results[0];
        });
}

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
    map.setCenter(pos);
}

export default {
    initMap,
    setCenter,
    getLocation,
    getAutocompleteList
}

// var markers = [];



// function addMarker(loc) {

//     var marker = new google.maps.Marker({
//         position: loc,
//         map: map,
//         title: 'Hello World!',
//     })
//     marker.setIcon('http://icons.iconarchive.com/icons/icons-land/vista-map-markers/64/Map-Marker-Marker-Inside-Azure-icon.png');
//     markers.push(marker);
//     console.log(markers);
// }




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