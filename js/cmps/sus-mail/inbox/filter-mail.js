const FILTER_READ_MODES = {
    READ: 'read',
    UNREAD: 'unread',
    ALL: 'all'
}
export {FILTER_READ_MODES};
Object.freeze(FILTER_READ_MODES);

export default {
    data() {
        return {
            readFilter: 'all'
        }
    },
    methods: {
        emitFilter() {
            this.$emit('filter', this.readFilter);
        }
    },
    template: `
        <section>
            <form>
                filter
                <select v-model="readFilter" @change="emitFilter()">
                    <option value="all">all</option>
                    <option value="unread">unread</option>
                    <option value="read">read</option>
                </select>
                <!-- <input type="select" /> -->
            </form>
        </section>
    `
}