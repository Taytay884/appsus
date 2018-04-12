import filterMail from '../../cmps/sus-mail/inbox/filter-mail.js';
import mailList from '../../cmps/sus-mail/inbox/mail-list.js';

import eventBusService from '../../services/event-bus.service.js';
import storageService from '../../services/storage.service.js';
import mailService from '../../services/mail.service.js';

export default {
    created() {
        if (!this.mails) {
            mailService.query().then(mails => {
                storageService.save('mails', mails);
                this.mails = this.mailsToShow = mails;
            });
        }

        eventBusService.$on('mail-sent', mailValues => {
            console.log('im in');
            mailService.saveMail(mailValues)
                .then(modifiedMails => {
                    this.mails = modifiedMails;
                });
        })
    },
    methods: {
        filterMails(filterValue) {
            this.mailsToShow = mailService.filterMails(this.mails, filterValue) 
        }
    },
    data() {
        return {
            mails: null,
            mailsToShow: null,
        }
    },
    template: `
        <section class="inbox">
            <filterMail @filter="filterMails($event)"></filterMail>
            <mailList :mails="mailsToShow"></mailList>
            <router-link to="sus-mail/new-mail">
                <button class="floating-add-btn fas fa-plus-circle fa-4x"></button>
            </router-link>
        </section>
    `,
    components: {
        filterMail,
        mailList
    }
}