export default {
    data() {
        return {
            isInbox: this.$route.path === '/sus-mail'
        }
    },
    template: `
        <section class="side-menu">
            <slot></slot>
        </section>
    `
}