import appMenu from '../general/navbar-cmps/app-menu.js';

export default {
    template: `
        <section class="navbar flex-nav">
            <h2 class="logo">susPlaces</h2>
            <ul class="navbar-links clean-list">
            </ul>
            <app-menu></app-menu>
        </section>
    `,
    components: {
        appMenu
    }
}