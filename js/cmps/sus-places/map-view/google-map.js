import susPlacesService from '../../../services/sus-places/google-maps/google-map.service.js';

export default {
    template: `
        <div @click.native id="map"></div>
    `,
    data() {
        return {}
    },
    mounted() {
        susPlacesService.initMap()
    },
}
