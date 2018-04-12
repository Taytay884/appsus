import susPlacesService from '../../services/google-map.service.js';

export default {
    template: `
        <div id="map"></div>
    `,
    data() {
        return {}
    },
    mounted() {
        susPlacesService.initMap()
    },
}
