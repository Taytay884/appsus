import navbar from '../../cmps/sus-places/navbar.js'
import placesList from '../../cmps/sus-places/places-list.js'
import googleMap from '../../cmps/sus-places/google-map.js'

export default {
    template: `
        <section class="sus-places">
            <header>
                <navbar class="flex-navbar"></navbar>
            </header>
            <main class="flex space-between">
                <places-list></places-list>
                <googleMap></googleMap>
            </main>
        </section>
    `,
    components: {
        navbar,
        placesList,
        googleMap
    }
}