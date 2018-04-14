import appMenu from './navbar-cmps/app-menu.js';

export default {
    props: {
        title: {
            type: String,
            required: false,
            default: 'title',
        }
    },
    components: {
        appMenu
    },
    template: `
        <section class="navbar">
            <div class="hamburger-slot">
                <slot name="hamburger"></slot>
            </div>
            <h2 class="logo">{{title}}</h2>
            <div class="slot-container">
                <slot></slot>
            </div>
            <app-menu></app-menu>
        </section>
    `
}