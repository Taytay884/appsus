import utilService from '../../../services/util.service.js';

export default {
    props: {
        'mails': {
            type: Array,
            default: 'hey'
        }
    },
    methods: {
        formatedDate(mailDate) {
            return utilService.getDateFormated(mailDate);
        },
        emitReadToggle(mailId) {
            this.$emit('toggleRead', mailId);
        },
        letterIcon(mailRead) {
            return mailRead ? 'open-letter' : 'letter'; 
        },
        readMail(mail) {
            this.$emit('mailOpened', mail.id);
            this.$router.push('/sus-mail/read-mail/'+ JSON.stringify(mail));
        }
    },
    template: `
        <section class="mail-list">
            <ul class="clean-list">
                <li v-for="mail in mails" 
                    @click="readMail(mail)"
                    class="mail-preview">

                    <button @click.stop="emitReadToggle(mail.id)"
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