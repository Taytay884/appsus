export default {
    data() {
        return {
            displayApps: false,
        }
    },
    template: `
    <section class="app-menu">
        <button @click="displayApps = !displayApps"
                class="clean-btn">
            <span class="app-menu-btn fas fa-angle-down fa-3x"></span>
        </button>
        
        <ul class="clean-list apps-container" v-if="displayApps">
            <li>
                <router-link to="/">
                    <img src="./img/general/home.svg" alt="home" />
                </router-link>
            </li>
            <li>
                <router-link to="/sus-mail">
                    <img src="./img/general/email.svg" alt="email" />
                </router-link>
            </li>
            <li>
                <router-link to="/sus-places">
                    <img src="./img/general/map.svg" alt="map" />
                </router-link>
            </li>
            <li>
                <router-link to="/sus-keep">
                     <img src="./img/general/notepad.svg" alt="notepad" />
                </router-link>
            </li>
        </ul>
    </section>
    `
}   