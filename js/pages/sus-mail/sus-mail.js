import siteFrame from '../../cmps/general/site-frame.js';

export default {
    template: `
    <section class="sus-mail">
        <site-frame title="mail">
            
            <template slot="side-menu">
                <ul class="clean-list">
                    <li>
                        <router-link to="/sus-mail/new-mail" 
                                     class="new-mail-btn">        
                            new letter
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/sus-mail" >
                            Inbox
                        </router-link>
                    </li>
                </ul>
            </template>

            <router-view>
            </router-view>
        </site-frame>   
    </section>
     `,
    components: {
        siteFrame
    },
    data() {
        return {
            showSideMenu: false,
        }
    },
}