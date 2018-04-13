import eventBusService from '../../../services/event-bus.service.js';
import placesService from '../../../services/sus-places/places.service.js';
import googleMapService from '../../../services/sus-places/google-maps/google-map.service.js';
import imgUpload from './img-upload.js'
export default {
    created() {
        eventBusService.$on('placeSearched', (name, latLng) => {
                if (this.isEditMode) return;
                googleMapService.setCenter(latLng)
                let markerId = googleMapService.addMarker(latLng);
                this.selectedPlace = placesService.convertToPlace(name, markerId, latLng);
                this.isSelectedPlace = true;
            }),
        eventBusService.$on('newPlaceClicked', (latLng) => {
                if (this.isEditMode) return;
                googleMapService.getLocationByPos(latLng.lat, latLng.lng)
                    .then(placeData => {
                        googleMapService.setCenter(latLng)
                        let markerId = googleMapService.addMarker(latLng);
                        this.selectedPlace = placesService.convertToPlace(placeData, markerId, latLng);
                        this.isSelectedPlace = true;
                    });
            }),
            // EDIT MODE!
            eventBusService.$on('placeClicked', clickedPlaceData => {
                this.editedPlace = clickedPlaceData;
                this.selectedPlace = JSON.parse(JSON.stringify(clickedPlaceData));
                this.isSelectedPlace = true;
                this.isEditMode = true;
                googleMapService.setCenter({
                    lat: clickedPlaceData.lat,
                    lng: clickedPlaceData.lng
                })
            });
    },
    data() {
        return {
            editedPlace: {},
            selectedPlace: {},
            isSelectedPlace: false,
            isEditMode: false,
            currTag: '',
        }
    },
    methods: {
        editPlace() {
            if (!this.isSelectedPlace) return;
            if (this.isEditMode) {
                console.log('Place editted!')
                placesService.editPlace(this.selectedPlace);
                Object.assign(this.editedPlace, this.selectedPlace);
            } else {
                placesService.addPlace(this.selectedPlace)
            }
            this.isSelectedPlace = false;
            this.isEditMode = false;
            this.currTag = '';
        },
        cancelEdit() {
            this.selectedPlace = this.editedPlace;
            this.isSelectedPlace = false;
            this.currTag = '';
            this.isEditMode = false;
            // To unmark the selected place.
            placesService.selectPlace(this.selectedPlace.id);
        },
        addTag() {
            console.log(this.selectedPlace)
            this.selectedPlace.tags.push(this.currTag)
        },
    },
    template: `
        <section v-show="isSelectedPlace" class="place-edit">
            <form @submit.prevent="editPlace" class="edit">
                <input class="title" placeholder="Place title" v-model="selectedPlace.name" />
                <textarea rows="3"  class="description" placeholder="Description" v-model="selectedPlace.description" />
                <form class="tag flex" @submit.prevent="addTag">
                    <input v-model="currTag" placeholder="tag" />
                    <button type="submit">+</button>
                    <ul class="clean-list flex">
                        <li v-for="tag in selectedPlace.tags">{{ tag }}</li>
                    </ul>
                </form>
                <img-upload></img-upload>
            <div>
                <input class="id" placeholder="id" v-model="selectedPlace.id" readonly="readonly" />
                <input class="lat" placeholder="lat" v-model="this.selectedPlace.lat" readonly="readonly" />
                <input class="lng" placeholder="lng" v-model="this.selectedPlace.lng" readonly="readonly" />
            </div>
            <button type="submit">{{(isEditMode)? 'Save' : 'Add' }}</button>
            <button v-show="isEditMode" @click="cancelEdit">Cancel</button>
            </form>
            
        </section>
    `,
    components: {
        imgUpload
    }


    // Name, Description, id, Photos(allow adding
    // photos), lat, lng, tag(fun / food / work / anything…)
}