import googleMapService from '../../../services/sus-places/google-maps/google-map.service.js';
import eventBusService from '../../../services/event-bus.service.js';

export default {
    created() {
        eventBusService.$on('detailsOpened', clickedPlaceData => {
            this.$router.push({ path: `/sus-places/place-details/${clickedPlaceData.id}` });
            googleMapService.setCenter({
                lat: clickedPlaceData.lat,
                lng: clickedPlaceData.lng
            })
        })
    },
    template: `
        <div @click.native id="map"></div>
    `,
    data() {
        return {}
    },
    mounted() {
        googleMapService.initMap()
    },
}
