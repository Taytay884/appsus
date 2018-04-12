import home from './pages/home/home.js'
import susMail from './pages/sus-mail/sus-mail.js'
import inbox from './pages/sus-mail/inbox.js';
import newMail from './pages/sus-mail/new-mail.js';
import readMail from './pages/sus-mail/read-mail.js';

const routes = [
    { path: '/', component: home },
    { path: '/sus-mail', component: susMail, 
        children: [
            { path: '', component: inbox},
            { path: 'new-mail', component: newMail },
            { path: 'read-mail', component: readMail }
        ] },
    // { path: '/susKeep', component: car },
    // { path: '/susPlaces', component: carEdit },
];

Vue.use(VueRouter);
var myRouter = new VueRouter({ routes })

export default myRouter;