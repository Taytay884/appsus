import navbar from './navbar.js';
import sideMenu from './site-frame-cmps/side-menu.js';

// import eventBusService, {EVENTS} from '../../services/event-bus.service.js'; 

export default {
    props: {
        title: {
            type: String,
        }
    },
    components: {
        navbar,
        sideMenu
    },
    // created() {
        // eventBusService.$on(EVENTS.CLOSE_SIDE_MENU, () => {
        //     this.showSideMenu = false;
        // })
    // },
    watch: {
        $route() {
            this.showSideMenu = false;
            this.isHamburgerOpen = false;
        }
    },
    data() {
        return {
            showSideMenu: false,
            isHamburgerOpen: false
        }
    },
    methods: {
        toggleSideMenu() {
            this.isHamburgerOpen = !this.isHamburgerOpen;
            this.showSideMenu = !this.showSideMenu;
        }
    },
    template: `
        <section class="site-frame">
            <header>
                <navbar :title="title" 
                        @toggleSideMenu="showSideMenu = !showSideMenu">

                    <div slot="hamburger" 
                         class="hamburger-logo-container">
                        <div class="hamburger"
                            :class="{ open: isHamburgerOpen }" 
                            @click="toggleSideMenu()">
                            <div class="line-menu half start"></div>
                            <div class="line-menu"></div>
                            <div class="line-menu half end"></div>
                        </div>
                    </div>

                </navbar>
            </header>

            <main>
                <sideMenu :class="{ show: showSideMenu }">
                    <slot name="side-menu"></slot>
                </sideMenu>  
                <div class="content-container">
                    <slot></slot>
                </div>
            </main>    

            <slot name="floating-btn"></slot>
        </section>
    `
}