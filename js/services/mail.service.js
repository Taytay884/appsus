import storageService from "./storage.service.js";
import utilService from "./util.service.js";
import filterMail, { FILTER_MODES, SORT_MODES } from "../cmps/sus-mail/inbox/filter-mail.js";

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
            date: utilService.getRandomIntInclusive(100000000000, 1000000000000),
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
        mailValues.date = Date.now();
        mailValues.read = false;
        return mailValues;
    }
}

function filterMails(mails, filterValue) {
    if (!filterValue || filterValue === FILTER_MODES.ALL) return mails
    else if (filterValue === FILTER_MODES.READ) {
        return mails.filter(mail => {
            return mail.read === true;
        })
    } else {
        return mails.filter(mail => {
            return mail.read === false;
        })
    }
}

function sortMails(mails, sortValue) {
    if (!sortValue) return
    else if (sortValue === SORT_MODES.TITLE) {
        mails.sort((mailA, mailB) => {
            return mailA.title < mailB.title;
        })
    } else {
        mails.sort((mailA, mailB) => {
            return mailA.date < mailB.date;
        })
    }
}

function toggleMailRead(mails, mailId) {
}

function getById(mailIdx) {
    return query()
        .then(mails => {
            return mails.find(mail => {
                return mail.id === mailIdx;
            })
        });
}

export default {
    query,
    saveMail,
    filterMails,
    sortMails,
    toggleMailRead,
    getById
}