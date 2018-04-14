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
        },
        openEditCmp() {
            placesService.openEditCmp();
        }
    },
    template: `
        <section class="places-list-container">
                <h2 class="menu-bar flex-bar">My Places:</h2>
                <ul class="places-list clean-list">
                    <li class="flex flex-column space-between":class="{selected: place.selected}"
                    v-for="place in places" @click="selectPlace(place.id)">
                        <div class="text-container">
                            <h1>{{ place.name }}</h1>
                            <p>{{ place.description.substr(0, 70) }}<p>
                        </div>
                        <div class="buttons-tags-container flex space-between">
                            <div>
                                <button v-show="place.selected" @click.stop="deletePlace(place.id)"><i class="far fa-trash-alt"></i></button>
                                <button v-show="place.selected" @click.stop="openEditCmp()"><i class="far fa-edit"></i></button>
                            </div>
                            <ul v-show="place.tags.length" class="tags-container flex space-between clean-list">
                                <div class="tag" v-for="tag in place.tags.slice(0, 3)">{{ tag }}</div>
                            </ul>
                        </div>
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