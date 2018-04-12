import appMenu from '../general/app-menu.js';

export default {
    template: `
        <section class="navbar flex-nav">
            <div class="hamburger-logo-container" @click="$emit('toggleSideMenu')">
                <button class="hamburger fas fa-bars fa-3x" alt="hamburger"></button>           
                <h2 class="logo">Mail</h2>
            </div>
            <!-- <app-menu></app-menu> -->
        </section>
    `,
    components: {
        appMenu
    }
}