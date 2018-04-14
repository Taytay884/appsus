import navbar from '../../cmps/sus-places/navbar.js'
import placesList from '../../cmps/sus-places/places-list/places-list.js'

import mapView from './sub-pages/map-view.js'
import placeDetails from './sub-pages/place-details.js'

import siteFrame from '../../cmps/general/site-frame.js';

// export default {
//     data() {
//         return {
//             currLocation: {}
//         }
//     },
//     methods: {
//         setLocation(newLocation) {
//             this.currLocation = newLocation;
//         }
//     },
//     template: `
//         <section class="sus-places">
//             <header>
//                 <navbar class="flex-navbar"></navbar>
//             </header>
//             <main class="flex space-between">
//                 <places-list></places-list>
//                 <!-- <router-link to="/sus-places/new-mail" 
//                             class="new-mail-btn">        
//                         new letter
//                 </router-link> -->
//                 <!-- <place-details></place-details> -->
//                 <router-view></router-view>
//                 <!-- <map-view></map-view> -->
//             </main>
//         </section>
        
        
//     `,
// }


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
        <site-frame title="Places">
            
            <template slot="side-menu">
                <!-- <div class="flex space-between"> -->
                    <places-list></places-list>
                <!-- </div> -->
            </template>

            <router-view></router-view>

        </site-frame>   
    </section>
     `,
    components: {
        navbar,
        placesList,
        mapView,
        placeDetails,
        siteFrame
    },
    data() {
        return {
            showSideMenu: false,
        }
    },
}