import susPlacesService from '../../services/google-map.service.js';

export default {
    template: `
    <section>
        <input type="search" placeholder="Search location..." v-model="locationName" @input="findLocation" @change="findLocation"/>
        <ul class="autocomplete-list clean-list">
            <li v-for="location in autocompleteLocations" @click="setLocationName(location)">{{ location }}</li>
        </ul>
    </section>
    `,
    data() {
        return {
            locationName: '',
            currLocation: {},
            autocompleteLocations: []
        }
    },
    methods: {
        findLocation: _.debounce(function (e) {
            if (this.locationName) {
                console.log(`Looking for location: ${this.locationName} ...`);
                susPlacesService.getLocation(this.locationName)
                    .then(res => {
                        this.$emit('locationChanged', res)
                    });
                susPlacesService.getAutocompleteList(this.locationName)
                    .then(res => {
                        this.autocompleteLocations = res;
                        console.log(res)
                    });
            }
        }, 800),
        searchLocation() {
            susPlacesService.setCenter({
                lat: 32.3749831,
                lng: 34.9120554
            });
        },
        setLocationName(location) {
            this.locationName = location;
        },
    }
}