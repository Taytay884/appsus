import googleMap from '../../../cmps/sus-places/map-view/google-map.js'
import placeEdit from '../../../cmps/sus-places/map-view/place-edit/place-edit.js'
import eventBusService from '../../../services/event-bus.service.js';
import placesService from '../../../services/sus-places/places.service.js';
import googleMapService from '../../../services/sus-places/google-maps/google-map.service.js';

export default {

    watch: {
        '$route' (to, from) {
            console.log('ID CHANGED!')
            this.currPlace = placesService.getPlaceById(+this.$route.params.id);
            console.log(this.currPlace);
        }
    },
    created() {
        // eventBusService.$on('placeClicked', clickedPlaceData => {
        //     console.log(clickedPlaceData);
        //     console.log(this.currPlace);
        //     this.currPlace = clickedPlaceData;
        //     console.log('this.currPlace', this.currPlace);
        //     console.log('DETAILS')
        //     googleMapService.setCenter({
        //         lat: clickedPlaceData.lat,
        //         lng: clickedPlaceData.lng
        //     })
        // })
    },
    data() {
        return {
            currPlace: {}
        }
    },
    template: `
        <section class="place-details">
            <div class="menu-bar flex-bar">
                <h1>PLACE DETAILS</h1>
            </div>
            <router-link to="/sus-places"><button><i class="clean-btn fas fa-arrow-left"></i></button></router-link>
            <h2 class="title"> {{ currPlace.name }}</h2>
            <p class="description"> {{ currPlace.description }} </p>
            <div class="tags-container">
                <ul v-if="currPlace.tags" class="tags-list clean-list" v-show="currPlace.tags.length">
                    <li class="tag" v-for="tag in currPlace.tags">{{ tag }}</li>
                </ul>
            </div>
            <div class="imgs-container">
                <ul v-if="currPlace.imgs" class="imgs-list clean-list" v-show="currPlace.imgs.length">
                    <li class="img-container" v-for="img in currPlace.imgs">
                        <img :src="img" width="40px" height="40px" />
                    </li>
                </ul>
            </div>
            <div class="static-details-container">
                <h5 class="id">{{ currPlace.id }}</h5>
                <h5 class="lat">{{ currPlace.lat }}</h5>
                <h5 class="lng">{{ currPlace.lng }}</h5>
            </div>
            <place-edit></place-edit>
        </section>
    `,
    components: {
        googleMap,
        placeEdit,
        eventBusService
    }
}