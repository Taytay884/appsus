import appMenu from '../general/app-menu.js';

export default {
    template: `
        <section class="navbar flex-nav">
            <h2 class="logo">susPlaces</h2>
            <ul class="navbar-links clean-list">
            </ul>
            <app-menu hidden></app-menu>
        </section>
    `,
    components: {
        appMenu
    }
}