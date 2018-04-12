import susPlacesService from '../../services/google-map.service.js';

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
