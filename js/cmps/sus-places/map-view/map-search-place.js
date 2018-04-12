import susPlacesService from '../../../services/sus-places/google-maps/google-map.service.js';

export default {
    template: `
    <section class="map-search-place">
        <form @submit.prevent="searchLocation" class="search-bar-container">
            <input type="search" placeholder="Search location..." v-model="locationName" @input="findLocation" @change="findLocation"/>
            <ul v-show="autocompleteShow" class="autocomplete-list clean-list">
                <button type="submit" class="clear-btn" v-for="location in autocompleteLocations" @click="setLocationName(location)">{{ location }}</button>
            </ul>
            <button type="submit"><i class="fas fa-search"></i></button>
        </form>
    </section>
    `,
    data() {
        return {
            locationName: '',
            currLocation: {},
            autocompleteLocations: [],
            autocompleteShow: false,
            isSubmitted: false
        }
    },
    methods: {
        findLocation: _.debounce(function (e) {
                susPlacesService.getAutocompleteList(this.locationName)
                    .then(res => {
                        setTimeout(() => this.autocompleteShow = false, 6000)
                        this.autocompleteLocations = res;
                        if(this.isSubmitted) {
                            this.autocompleteShow = false;
                            this.isSubmitted = false;
                        } else {
                            this.autocompleteShow = true;
                        }
                    });
        }, 800),
        searchLocation() {
            if(this.locationName) {
                console.log(`Looking for location: ${this.locationName} ...`);
                this.autocompleteShow = false;
                this.isSubmitted=true;
                susPlacesService.getLocation(this.locationName)
                    .then(res => {
                        this.$emit('locationChanged', res)
                    });
            }
        },
        setLocationName(location) {
            this.locationName = location;
        },
    }
}