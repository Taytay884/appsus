export default {
    data() {
        return {
            isOpen: false
        }
    },
    template:`
    <section class="app-menu">
        <div class="app-menu-btn fas fa-angle-down fa-3x"></div>
        <div>
            <ul class="clean-list apps-container">
                <li>
                    <router-link to="/">
                        <img src="./img/general/home.svg" alt="home" />
                        <p>hey</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/susMail">
                        <img src="./img/general/email.svg" alt="home" />
                        <p>hey</p>
                    </router-link>
                </li>
                <li><img src="./img/general/map.svg" alt="map" /></li>
                <li><img src="./img/general/notepad.svg" alt="notepad" /></li>
            </ul>
        </div>
    </section>
    `
}