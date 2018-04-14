import storageService, {STORAGE_KEYS} from "./storage.service.js";
import utilService from "./util.service.js";
import filterMail, { FILTER_MODES, SORT_MODES } from "../cmps/sus-mail/inbox/filter-mail.js";

function query() {
    return storageService.load(STORAGE_KEYS.MAILS)
        .then(mails => {
            if (!mails) {
                var mails = genMails(5)
                storageService.save(STORAGE_KEYS.MAILS, mails);
                return mails;
            }
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
            date: getRandomDate(),
        }

        function getRandomDate() {
            return utilService.getRandomIntInclusive(100000000000, 1000000000000);
        }
    }
}

function saveMail(mailValues) {
    return storageService.load(STORAGE_KEYS.MAILS)
        .then(mails => {
            mails.push(createMailItem(mailValues));
            return storageService.save(STORAGE_KEYS.MAILS, mails)
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

function searchMails(mails, searchStr) {
    console.log(mails, searchStr);
    searchStr = searchStr.toLowerCase();
    return this.mails.filter(mail => {
        if (mail.title) {
            var title = mail.title.toLowerCase();
            return title.includes(searchStr);
        }
    });
}

export default {
    query,
    saveMail,
    filterMails,
    sortMails,
    searchMails
}