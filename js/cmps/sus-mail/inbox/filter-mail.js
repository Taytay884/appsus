const FILTER_MODES = {
    READ: 'read',
    UNREAD: 'unread',
    ALL: 'all'
}

const SORT_MODES = {
    TITLE: 'title',
    DATE: 'date'
}

Object.freeze(FILTER_MODES);
Object.freeze(SORT_MODES);

export {FILTER_MODES};
export {SORT_MODES};

export default {
    created() {
        console.log(this.filter);
    },
    data() {
        return {
            search: '',
            filter: FILTER_MODES.ALL,
            sort: SORT_MODES.DATE,
        }
    },
    watch: {
        filter() {
            this.$emit('filter', this.filter);
        },
        sort() {
            this.$emit('sort', this.sort);
        },
    },
    template: `
        <section class="filter-mail">
            <form class="inbox-filters" @submit.prevent>
                <div class="txt-group-container search-container">
                    <input type="search" v-model="search" @input="$emit('search', search)" disabled/>
                    <img v-if="false" src="../../../../img/general/search.svg" />
                </div>

                <div class="txt-group-container">
                    <h4>filter :</h4> 
                    <div class="custom-radio-group"> 
                        <label :class="{ active: filter === 'all' }">
                            all <input type="radio" value="all" v-model="filter" hidden/>
                        </label>
                        <label :class="{ active: filter === 'unread' }">
                            unread <input type="radio" value="unread" v-model="filter" hidden/>
                        </label>
                        <label :class="{ active: filter === 'read' }">
                            read <input type="radio" value="read" v-model="filter" hidden/>
                        </label>
                    </div>
                </div>

                <div class="txt-group-container">
                    <h4>sort :</h4>
                    <div class="custom-radio-group"> 
                        <label :class="{ active: sort === 'date' }">
                            date <input type="radio" value="date" v-model="sort" hidden/>
                        </label>
                        <label :class="{ active: sort === 'title' }">
                            title <input type="radio" value="title" v-model="sort" hidden/>
                        </label>
                    </div>
                </div>
            </form>
        </section>
    `
}