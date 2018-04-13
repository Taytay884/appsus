import navbar from '../../cmps/sus-places/navbar.js'
import placesList from '../../cmps/sus-places/places-list.js'
import googleMap from '../../cmps/sus-places/google-map.js'
import mapSearchPlace from '../../cmps/sus-places/map-search-place.js'
import locationDetails from '../../cmps/sus-places/location-details.js'

export default {
    data() {
        return {
            currLocation: {}
        }
    },
    methods: {
        setLocation(newLocation) {
            this.currLocation = newLocation;
        }
    },
    template: `
        <section class="sus-places">
            <header>
                <navbar class="flex-navbar"></navbar>
            </header>
            <main class="flex space-between">
                <places-list></places-list>
                <section class="map-view">
                    <div class="menu-bar flex-bar">
                        <map-search-place @locationChanged="setLocation"></map-search-place>
                        <location-details :location="currLocation"></location-details>
                        <div></div>
                    </div>
                    <google-map></google-map>
                </section>
            </main>
        </section>
        
        
    `,
    components: {
        navbar,
        placesList,
        googleMap,
        mapSearchPlace,
        locationDetails
    }
}