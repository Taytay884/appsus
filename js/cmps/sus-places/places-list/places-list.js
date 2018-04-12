import eventBusService from "../../../services/event-bus.service.js";
import placesService from "../../../services/sus-places/places.service.js";

export default {
    data() {
        return {
            places: []
        }
    },
    created() {
        eventBusService.$on('placeAdded', (place) => {
            this.places.push(place);
        })
    },
    methods: {
        deletePlace(index) {
            eventBusService.$emit('placeAdded', this.selectedPlace)
            console.log(this.selectedPlace);
        }
    },
    template: `
        <section class="places-list-container">
                <h2 class="menu-bar flex-bar">My Places:</h2>
                <ul class="places-list clean-list">
                    <li v-for="(place, idx) in places">
                        <h1>{{ place.name }}</h1>
                        <h1>{{ place.description }}</h1>
                        <button @click="deletePlace(idx)">x</button>
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