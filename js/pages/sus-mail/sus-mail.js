import navbar from '../../cmps/sus-mail/navbar.js';
import sideMenu from '../../cmps/sus-mail/side-menu.js';

export default {
    template: `
    <section class="sus-mail">
        <header>
            <navbar class="flex-navbar"  @toggleSideMenu="showSideMenu = !showSideMenu"></navbar>
        </header>  
        <main>
            <sideMenu :class="{ show: showSideMenu }"></sideMenu> 
            <router-view class="content-container padding">
            </router-view>
        </main>        
    </section>
     `,
    components: {
        navbar,
        sideMenu,
    },
    data() {
        return {
            showSideMenu: false,
        }
    },
}