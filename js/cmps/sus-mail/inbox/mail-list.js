import utilService from '../../../services/util.service.js';
import eventBusService, { EVENTS } from '../../../services/event-bus.service.js';

export default {
    created() {
        console.log(mails);
    },
    props: {
        'mails': {
            // type: Array,
        }
    },
    methods: {
        formatedDate(mailDate) {
            return utilService.getDateFormated(mailDate);
        },
        readMail(mail) {
            this.$router.push('/sus-mail/read-mail/'+mail.id);
            this.$emit('mailOpened', mail.id);
        }
    },
    template: `
        <section class="mail-list">
            <ul class="clean-list">
                <li v-for="mail in mails" 
                    @click="readMail(mail)"
                    class="mail-preview">

                    <button @click.stop="$emit('toggleRead', mail.id);"
                            class="letter-icon-btn clean-btn"
                            :class="{ openLetter: mail.read }">
                    </button>
                    <h4 class="sent-from">{{mail.sentFrom }}</h4>
                    <h3 class="title">{{mail.title ? mail.title : 'no title' }}</h3>
                    <h4 class="content">{{mail.content ? mail.content : 'no content'}}</h4>
                    <small class="date">{{formatedDate(mail.date)}}</small>
                </li>
            </ul>
        </section>
    `,
}