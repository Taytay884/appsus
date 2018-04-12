import eventBusService from "../event-bus.service.js";
import storageService from "../storage.service.js";

const PLACES_KEY = 'placesKey';
var places = [];

function getPlaces() {
    places = storageService.load(PLACES_KEY);
}

function addPlace(place) {
    places.push(place);
    storageService.save(PLACES_KEY, places);
}

export default {
}