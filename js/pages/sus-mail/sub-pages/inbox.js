import filterMail, { SORT_MODES } from '../../../cmps/sus-mail/inbox/filter-mail.js';
import mailList from '../../../cmps/sus-mail/inbox/mail-list.js';
import mailContent from '../../../cmps/sus-mail/general/mail-content.js';

import eventBusService, { EVENTS } from '../../../services/event-bus.service.js';
import storageService from '../../../services/storage.service.js';
import mailService from '../../../services/mail.service.js';

export default {
    created() {
        mailService.query().then(mails => {
            storageService.save('mails', mails);
            this.mails = this.mailsToShow = mails;
            mailService.sortMails(this.mails, SORT_MODES.DATE);
        });

        eventBusService.$on(EVENTS.MAIL_SENT, mailValues => {
            mailService.saveMail(mailValues)
                .then(modifiedMails => {
                    this.mails = modifiedMails;
                });
        })
    },
    methods: {
        filterMails(filterValue) {
            this.mailsToShow = mailService.filterMails(this.mails, filterValue)
        },
        sortMails(sortValue) {
            mailService.sortMails(this.mails, sortValue);
        },
        toggleRead(mailId) {
            var mailIdx = this.mails.findIndex(mail => {
                return mail.id === mailId;
            })
            this.mails[mailIdx].read = !this.mails[mailIdx].read;
            storageService.save(this.mails);
            this.mailsToShow = this.mails;
        },
    },
    data() {
        return {
            mails: null,
            mailsToShow: null,
        }
    },
    template: `
        <section class="inbox">
            <mail-content>

                <template class="hey" slot="header">
                    <filterMail @filter="filterMails($event)" 
                                @sort="sortMails($event)" ></filterMail>
                </template>

                <template slot="main">
                    <mailList slot="main"
                                :mails="mailsToShow" 
                                @toggleRead="toggleRead($event)"></mailList>
                                
                    <router-link slot="floating-btn" to="/sus-mail/new-mail">
                        <button class="floating-add-btn fas fa-plus"></button>
                    </router-link>
                </template>
            </mail-content>
        </section>
    `,
    components: {
        filterMail,
        mailList,
        mailContent
    }
}