import eventBusService from "../event-bus.service.js";
import storageService from "../storage.service.js";
import googleMapService from "./google-maps/google-map.service.js";

const PLACES_KEY = 'placesKey';
var placesDB = [];
var selectedPlace;

eventBusService.$on('markerClicked', (markerId) => {
})

function getPlaces() {
    if(placesDB.length) return;
    return storageService.load(PLACES_KEY).then((places) => {
        if (places) {
            places.forEach((place) => {
                // reset the selected places.
                place.selected = false;
                addPlace(place);
            })
        }
        return placesDB;
    });
}

function addPlace(place) {
    placesDB.push(place);
    eventBusService.$emit('placeAdded', placesDB);
    googleMapService.addMarker({lat: place.lat, lng: place.lng}, place.markerId);
    googleMapService.saveMarker(place.markerId);
    storageService.save(PLACES_KEY, placesDB);
    return Promise.resolve();
}

function editPlace(editedPlace) {
    let placeIdx = placesDB.findIndex((place) => {
        return place.id === editedPlace.id;
    })
    editedPlace.selected = false;
    highlightPlace(false);
    placesDB[placeIdx] = editedPlace;
    storageService.save(PLACES_KEY, placesDB);
}

function deletePlace(id) {
    let placeIdx = placesDB.findIndex((place) => {
        return place.id === id;
    })
    console.log(placeIdx);
    console.log(placesDB[placeIdx].markerId)
    googleMapService.removeMarker(placesDB[placeIdx].markerId);
    placesDB.splice(placeIdx, 1);
    eventBusService.$emit('placeDeleted')
    storageService.save(PLACES_KEY, placesDB);
}

function getPlaceById(id) {
    let placeIdx = placesDB.findIndex((place) => {
        return place.id === id;
    })
    if(placeIdx === -1) return;
    return placesDB[placeIdx];
}

function convertToPlace(placeData, markerId, latLng) {
    let place = {
        id: Date.now(),
        name: '',
        lat: latLng.lat,
        lng: latLng.lng,
        tags: [],
        description: '',
        photos: [],
        markerId,
        selected: false,
        imgs: []
    }
    if(placeData.length) {
        console.log(Array.isArray(placeData))
        if (Array.isArray(placeData))
            place.name = placeData[0].formatted_address;
        else 
            place.name = placeData;
    }
    return place;
}



function selectMarker(markerId) {
    let placeIdx = placesDB.findIndex((place) => {
        return place.markerId === markerId;
    })
    highlightPlace(false);
    if (placesDB[placeIdx] !== selectedPlace) {
        selectedPlace = placesDB[placeIdx];
        highlightPlace(true);
    } else {
        selectedPlace = null;
    }
}

function selectPlace(id) {
    let placeIdx = placesDB.findIndex((place) => {
        return place.id === id;
    })
    highlightPlace(false);
    if (placesDB[placeIdx] !== selectedPlace) {
        selectedPlace = placesDB[placeIdx];
        highlightPlace(true);
    } else {
        selectedPlace = null;
    }
}

function highlightPlace(isOpen) {
    if (selectedPlace) {
        selectedPlace.selected = isOpen;
        googleMapService.toggleMarker(selectedPlace.markerId, isOpen);
        if (isOpen)
            eventBusService.$emit('placeClicked', selectedPlace)
        // eventBusService.$emit('placeEditClicked', selectedPlace)
    }
}

function openEditCmp() {
    if (selectedPlace) {
        console.log('SELECTEDPLACE:', selectedPlace)
        eventBusService.$emit('placeEditClicked', selectedPlace)
    }
}

export default {
    getPlaces,
    addPlace,
    editPlace,
    convertToPlace,
    deletePlace,
    selectMarker,
    selectPlace,
    openEditCmp,
    getPlaceById
}