import appMenu from '../general/app-menu.js';

export default {
    template: `
        <section class="navbar flex-nav">
            <h2 class="logo">Appsus</h2>
            <ul class="navbar-links clean-list">
                <li>about</li>
                <li>products</li>
            </ul>
            <app-menu></app-menu>
        </section>
    `,
    components: {
        appMenu
    }
}