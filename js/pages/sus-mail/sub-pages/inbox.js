import filterMail, { SORT_MODES } from '../../../cmps/sus-mail/inbox/filter-mail.js';
import mailContent from '../../../cmps/sus-mail/general/mail-content.js';
import mailList from '../../../cmps/sus-mail/inbox/mail-list.js';

import eventBusService, { EVENTS } from '../../../services/event-bus.service.js';
import storageService, { STORAGE_KEYS } from '../../../services/storage.service.js';
import mailService from '../../../services/mail.service.js';

export default {
    created() {
        mailService.query().then(mails => {
            this.mails = this.mailsToShow = mails;
            mailService.sortMails(this.mails, SORT_MODES.DATE);
        });

        eventBusService.$on(EVENTS.MAIL_SENT, mailValues => {
            mailService.saveMail(mailValues)
                .then(updatedMails => {
                    this.mails = updatedMails;
                });
        })
    },
    methods: {
        searchMails(searchStr) {
            this.mailsToShow = mailService.searchMails(this.mails, searchStr);
        },
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
            this.mailsToShow = this.mails;
            storageService.save(STORAGE_KEYS.MAILS, this.mails);
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

                <filterMail slot="header"
                            @search="searchMails($event)"
                            @filter="filterMails($event)" 
                            @sort="sortMails($event)" >
                </filterMail>

                <mailList slot="main"
                            :mails="mailsToShow" 
                            @mailOpened="toggleRead($event)"
                            @toggleRead="toggleRead($event)"></mailList>

                <router-link to="/sus-mail/new-mail">
                    <button class="floating-add-btn fas fa-plus"></button>
                </router-link>

            </mail-content>

        </section>
    `,
    components: {
        mailContent,
        filterMail,
        mailList,
    }
}