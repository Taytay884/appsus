import eventBusService from '../../../../services/event-bus.service.js';
import placesService from '../../../../services/sus-places/places.service.js';
import googleMapService from '../../../../services/sus-places/google-maps/google-map.service.js';
import imgUpload from './img-upload.js'

export default {
    created() {
        eventBusService.$on('placeSearched', (name, latLng) => {
            if (this.isEditMode) return;
            googleMapService.setCenter(latLng)
            let markerId = googleMapService.addMarker(latLng);
            this.selectedPlace = placesService.convertToPlace(name, markerId, latLng);
            this.useEditCmp();
        });
        eventBusService.$on('newPlaceClicked', (latLng) => {
            if (this.isEditMode) return;
            googleMapService.getLocationByPos(latLng.lat, latLng.lng)
                .then(placeData => {
                    googleMapService.setCenter(latLng)
                    let markerId = googleMapService.addMarker(latLng);
                    this.selectedPlace = placesService.convertToPlace(placeData, markerId, latLng);
                    this.useEditCmp();
                });
        });
        // EDIT MODE!
        eventBusService.$on('placeClicked', clickedPlaceData => {
            if(this.isEditMode) return;
            googleMapService.setCenter({
                lat: clickedPlaceData.lat,
                lng: clickedPlaceData.lng
            })
        })
        eventBusService.$on('placeEditClicked', clickedPlaceData => {
            this.editedPlace = clickedPlaceData;
            this.selectedPlace = JSON.parse(JSON.stringify(clickedPlaceData));
            this.useEditCmp();
            this.isEditMode = true;
            googleMapService.setCenter({
                lat: clickedPlaceData.lat,
                lng: clickedPlaceData.lng
            })
        });
        eventBusService.$on('placeDeleted', () => this.clearEditCmp());
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
        clearEditCmp() {
            this.isSelectedPlace = 0;
            this.isEditMode = false;
            this.currTag = '';
            document.querySelector('.file-upload-form input').value = '';
        },
        useEditCmp() {
            this.isSelectedPlace = true;
            this.currTag = '';
            document.querySelector('.file-upload-form input').value = '';
        },
        editPlace() {
            if (!this.isSelectedPlace) return;
            if (this.isEditMode) {
                console.log('Place editted!')
                placesService.editPlace(this.selectedPlace);
                Object.assign(this.editedPlace, this.selectedPlace);
            } else {
                placesService.addPlace(this.selectedPlace)
            }
            this.clearEditCmp();
        },
        cancelEdit() {
            if(this.isEditMode) {
                this.selectedPlace = this.editedPlace;
                // To unmark the selected place.
                placesService.selectPlace(this.selectedPlace.id);
            }
            this.clearEditCmp();
        },
        addTag() {
            this.selectedPlace.tags.push(this.currTag)
            console.log(this.selectedPlace)
        },
        addImg(url) {
            this.selectedPlace.imgs.push(url);
            console.log(this.selectedPlace)
        },
        removeImg(idx) {
            this.selectedPlace.imgs.splice(idx, 1);
            console.log(this.selectedPlace)
        }
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
                <img-upload @imageSynced="addImg" ></img-upload>
                <div>
                        <div v-for="img, idx in selectedPlace.imgs">
                            <img :src="img" width="40px" height="40px" />
                            <button type="button" @click.prevent.stop="removeImg(idx)">x</button>
                        </div>
                </div>
            <div>
                <input class="id" placeholder="id" v-model="selectedPlace.id" readonly="readonly" />
                <input class="lat" placeholder="lat" v-model="this.selectedPlace.lat" readonly="readonly" />
                <input class="lng" placeholder="lng" v-model="this.selectedPlace.lng" readonly="readonly" />
            </div>
            <button type="submit">{{(isEditMode)? 'Save' : 'Add' }}</button>
            <button @click="cancelEdit">Cancel</button>
            </form>
            
        </section>
    `,
    components: {
        imgUpload
    }


    // Name, Description, id, Photos(allow adding
    // photos), lat, lng, tag(fun / food / work / anything…)
}