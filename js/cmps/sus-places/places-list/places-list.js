import eventBusService from "../../../services/event-bus.service.js";
import placesService from "../../../services/sus-places/places.service.js";

export default {
    data() {
        return {
            places: []
        }
    },
    created() {
        eventBusService.$on('markerClicked', markerId => {
            placesService.selectMarker(markerId);
        });
        eventBusService.$on('placeAdded', (placesDB) => {
            this.places = placesDB;
        });
        eventBusService.$on('mapLoaded', () => {
            this.loadPlaces();
        });
    },
    methods: {
        loadPlaces() {
            placesService.getPlaces().then((placesDB) => {
                this.places = placesDB;
                console.log(this.places);
            });
        },
        deletePlace(id) {
            console.log(id);
            placesService.deletePlace(id);
        },
        selectPlace(id) {
            placesService.selectPlace(id);
        }
    },
    template: `
        <section class="places-list-container">
                <h2 class="menu-bar flex-bar">My Places:</h2>
                <ul class="places-list clean-list">
                    <li :class="{selected: place.selected}" v-for="place in places" @click="selectPlace(place.id)">
                        <h1>{{ place.name }}</h1>
                        <h1>{{ place.description }}</h1>
                        <button @click="deletePlace(place.id)">x</button>
                        <!-- id: Date.now(),
                        name: mapData.results[0].formatted_address,
                        lat,
                        lng,
                        tags: [],
                        description: '',
                        photos: [] -->
                    </li>
                </ul>
        </section>
    `
}