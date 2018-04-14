import googleMap from '../../../cmps/sus-places/map-view/google-map.js'
import mapSearchPlace from '../../../cmps/sus-places/map-view/map-search-place.js'
import locationDetails from '../../../cmps/sus-places/map-view/location-details.js'
import placeEdit from '../../../cmps/sus-places/map-view/place-edit/place-edit.js'

export default {
    data() {
        return {
            currLocation: {}
        }
    },
    methods: {
        setLocation(newLocation) {
            console.log(newLocation)
            this.currLocation = newLocation;
        }
    },
    template: `
                <section class="map-view">
                    <div class="menu-bar flex-bar">
                        <map-search-place @locationChanged="setLocation"></map-search-place>
                        <location-details :location="currLocation"></location-details>
                        <div></div>
                    </div>
                    <google-map></google-map>
                    <place-edit></place-edit>
                </section>
    `,
    components: {
        googleMap,
        mapSearchPlace,
        locationDetails,
        placeEdit
    }
}

