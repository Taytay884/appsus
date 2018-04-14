import navbar from '../../cmps/sus-places/navbar.js'
import placesList from '../../cmps/sus-places/places-list/places-list.js'
import mapView from '../../cmps/sus-places/map-view/map-view.js'

export default {
<<<<<<< HEAD
    // data() {
    //     return {
    //         currLocation: {}
    //     }
    // },
    // methods: {
    //     setLocation(newLocation) {
    //         this.currLocation = newLocation;
    //     }
    // },
=======
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
>>>>>>> 197ea882819e1da6e6ad9cfdaae24caed0f03fb8
    template: `
        <section class="sus-places">
            <header>
                <navbar class="flex-navbar"></navbar>
            </header>
            <main class="flex space-between">
                <places-list></places-list>
                <map-view></map-view>
            </main>
        </section>
        
        
    `,
    components: {
        navbar,
        placesList,
        mapView
    }
}