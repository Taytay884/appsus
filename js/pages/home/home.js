import siteFrame from '../../cmps/general/site-frame.js'

export default {
    template: `
        <section class="home">
            <site-frame title="appsus" :hamburger="false">
                <div class="section-container about">
                    <div class="about-container">
                        <img class="apps-in-phone-full" 
                             src="../../img/home/apps-in-phone-full.png"/>
                        <div class="about-content">
                            <h2 class="headline">apsus mail \&</h2>
                            <h2 class="headline">apsus places</h2>
                            <p>
                                our brand new services from our app sweet
                                now more than ever blah blah lorem ipsum
                            </p>
                        </div>
                    </div>
                </div>

                <div class="section-container app-grid">
                    <div class="app-container">
                        <div class="app-details-container">
                            <img src="../../img/general/email.svg"/>
                            <h2 class="headline">appsus mail</h2>
                            <p>
                                the best way to xyz bla bla
                                this ap is bla bla bla bla1
                            </p>
                            <router-link to="/sus-mail"
                                        class="link-to-app">
                                go to app
                            </router-link>
                        </div>
                    </div>

                    <div class="app-container">
                        <div class="app-details-container">
                                
                            <img src="../../img/general/map.svg"/>
                            <h2 class="headline">appsus places</h2>
                            <p>
                                the best way to xyz bla bla
                                this ap is bla bla bla bla1
                            </p>
                            <router-link to="/sus-places"
                                        class="link-to-app">
                                go to app
                            </router-link>
                        </div>
                    </div>
                </div>

            </site-frame>
        </section>
    `,
    components: {
        siteFrame, 
    }
}