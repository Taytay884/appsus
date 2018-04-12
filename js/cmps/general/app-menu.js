export default {
    data() {
        return {
            isOpen: false
        }
    },
    template: `
    <section class="app-menu">
        <i class="fas fa-angle-down fa-3x">
        </i>
        <ul class="clean-list apps-container">
            <li>
                <router-link to="/">
                    <img src="./img/general/home.svg" alt="home" />
                </router-link>
            </li>
            <li>
                <router-link to="/susMail">
                    <img src="./img/general/email.svg" alt="email" />
                </router-link>
            </li>
            <li>
                <router-link to="/susPlaces">
                    <img src="./img/general/map.svg" alt="map" />
                </router-link>
            </li>
            <li><img src="./img/general/notepad.svg" alt="notepad" /></li>
        </ul>
    </section>
    `
}