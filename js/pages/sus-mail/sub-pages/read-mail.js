import utilService from "../../../services/util.service.js";
import eventBusService, {EVENTS} from '../../../services/event-bus.service.js';
import mailContent from '../../../cmps/sus-mail/general/mail-content.js';

export default {
    created() {
        this.mail = JSON.parse(this.$route.params.mail);
    },
    data() {
        return {
            mail: null
        }
    },
    components: {
        mailContent
    },
    template: `
        <section class="read-mail">

            <mail-content>
            
                <template slot="header">
                    <router-link to="/sus-mail/">
                        <button class="clean-btn fas fa-arrow-left"></button>
                    </router-link>

                    <h2>{{mail.title ? mail.title : 'Titless'}}</h2>
                    <small>{{formatedDate(mail.date)}}</small>
                </template>
                
                <template slot="main">
                    <h3>Dear User,</h3>
                    <p class="mail-txt">{{!mail.content ? '~ Empty mail ~' : mail.content}}</p>
                    <h3>Yours truly, {{mail.sentFrom}}</h3>
                </template>

            </mail-content>
            
        </section>
    `,
    methods: {
        formatedDate(mailDate) {
            return utilService.getDateFormated(mailDate);
        }
    },
}