import storageService from "./storage.service.js";
import utilService from "./util.service.js";
import filterMail from "../cmps/sus-mail/inbox/filter-mail.js";
import { FILTER_READ_MODES } from '../cmps/sus-mail/inbox/filter-mail.js';

function query() {
    return storageService.load('mails')
        .then(mails => {
            if (!mails) return genMails(5)
            else return mails;
        })
}

function genMails(mailCount) {
    var mails = [];
    for (let i = 0; i < mailCount; i++) {
        mails.push(genMail(i));
    }
    return Promise.resolve(mails);

    function genMail(idx) {
        return {
            id: idx,
            sentFrom: utilService.genRandomStr(5),
            title: utilService.genLorem(),
            content: utilService.genLorem(20),
            read: true,
        }
    }
}

function saveMail(mailValues) {
    return storageService.load('mails')
        .then(mails => {
            mails.push(createMailItem(mailValues));
            return storageService.save('mails', mails)
                .then(() => {
                    return mails;
                });
        })

    function createMailItem(mailValues) {
        mailValues.sentFrom = utilService.genRandomStr(5);
        mailValues.id = Date.now();
        mailValues.read = false;
        return mailValues;
    }
}

function filterMails(mails, filterValue) {
    console.log('really filtering', filterValue);
    console.log(FILTER_READ_MODES);
    if (filterValue === FILTER_READ_MODES.ALL) return mails
    else if (filterValue === FILTER_READ_MODES.READ) {
        return mails.filter(mail => {
            return mail.read === true;
        })
    } else {
        return mails.filter(mail => {
            return mail.read === false;
        })
    }
}

export default {
    query,
    saveMail,
    filterMails
}