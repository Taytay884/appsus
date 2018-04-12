import eventBusService from '../../../services/event-bus.service.js';

export default {
    created(){
        eventBusService.$on('placeClicked', (clickedPlace) => this.selectedPlace = clickedPlace)
    },
    data() {
        return {
            selectedPlace: {},
            currTag: ''
        }
    },
    template: `
    <section class="place-edit">
        <form @submit.prevent="editPlace" class="edit">
            <input class="title" placeholder="Place title" v-model="selectedPlace.name" />
            <textarea rows="3"  class="description" placeholder="Description" v-model="selectedPlace.description" />
            <form class="tag flex" @submit.prevent="addTag">
                <input v-model="currTag" placeholder="tag" />
                <button type="submit">+</button>
                <ul class="clean-list flex">
                    <li v-for="tag in selectedPlace.tags">{{ tag }}</li>
                </ul>
            </form>
            <input type="file" class="photos" placeholder="photos" />
        <div>
            <input class="id" placeholder="id" v-model="selectedPlace.id" readonly="readonly" />
            <input class="lat" placeholder="lat" v-model="this.selectedPlace.lat" readonly="readonly" />
            <input class="lng" placeholder="lng" v-model="this.selectedPlace.lng" readonly="readonly" />
        </div>
        <button type="submit">Save</button>
        </form>
        
    </section>
    `,
    methods: {
        editPlace() {
            eventBusService.$emit('placeAdded', this.selectedPlace)
            console.log(this.selectedPlace);
        },
        addTag() {
            console.log(this.selectedPlace)
            this.selectedPlace.tags.push(this.currTag)
        }
    }
    
    // Name, Description, id, Photos(allow adding
            // photos), lat, lng, tag(fun / food / work / anything…)
}