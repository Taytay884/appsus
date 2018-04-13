import eventBusService from "../event-bus.service.js";
import storageService from "../storage.service.js";
import googleMapService from "./google-maps/google-map.service.js";

const PLACES_KEY = 'placesKey';
var placesDB = [];
var selectedPlace;

eventBusService.$on('markerClicked', (markerId) => {
})

function getPlaces() {
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
    togglePreview(false);
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
    storageService.save(PLACES_KEY, placesDB);
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
        selected: false
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

function togglePreview(isOpen) {
    if(selectedPlace) {
        selectedPlace.selected = isOpen;
        googleMapService.toggleMarker(selectedPlace.markerId, isOpen);
        if (isOpen) 
            eventBusService.$emit('placeClicked', selectedPlace)
    }
}

function selectMarker(markerId) {
    let placeIdx = placesDB.findIndex((place) => {
        return place.markerId === markerId;
    })
    togglePreview(false);
    if (placesDB[placeIdx] !== selectedPlace) {
        selectedPlace = placesDB[placeIdx];
        togglePreview(true);
    } else {
        selectedPlace = null;
    }
}

function selectPlace(id) {
    let placeIdx = placesDB.findIndex((place) => {
        return place.id === id;
    })
    togglePreview(false);
    if (placesDB[placeIdx] !== selectedPlace) {
        selectedPlace = placesDB[placeIdx];
        togglePreview(true);
    } else {
        selectedPlace = null;
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
}