export const { READ_MODE_TOGGLE } = 'read-mode-toggle'

export default {
    props: {
        'mails': {
            type: Array,
            default: 'hey'
        }
    },
    methods: {
        letterIcon(isRead) {
            return isRead ? 'fa-envelope-open' : 'fa-envelope';
        },
        toggleLetterIcon() {
            console.log('hey');
        }
    },
    template: `
        <section class="mail-list">
            <ul class="clean-list">
                <li class="mail-preview" v-for="mail in mails">
                    <div class="letter-icon fas fa-1x" 
                        :class="letterIcon(mail.read)"></div>
                    <h4 class="sent-from">{{mail.sentFrom}}</h4>
                    <h3 class="title">{{mail.title}}</h3>
                    <h4 class="content">{{mail.content}}</h4>
                </li>
            </ul>
        </section>
    `,
    listeners: {
        
    }
}