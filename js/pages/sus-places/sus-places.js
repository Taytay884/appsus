import navbar from '../../cmps/sus-places/navbar.js'
import placesList from '../../cmps/sus-places/places-list/places-list.js'
import mapView from '../../cmps/sus-places/map-view/map-view.js'

export default {
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