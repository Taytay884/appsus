import home from './pages/home/home.js'

import susMail from './pages/sus-mail/sus-mail.js'
import inbox from './pages/sus-mail/sub-pages/inbox.js';
import newMail from './pages/sus-mail/sub-pages/new-mail.js';
import readMail from './pages/sus-mail/sub-pages/read-mail.js';

import mapView from './pages/sus-places/sub-pages/map-view.js';
import placeDetails from './pages/sus-places/sub-pages/place-details.js';
import susPlaces from './pages/sus-places/sus-places.js';

const routes = [
    { path: '/', component: home },
    {
        path: '/sus-mail', component: susMail,
        children: [
            { path: '', component: inbox },
            { path: 'new-mail', component: newMail },
            { path: 'read-mail/:mail?', component: readMail }
        ]
    },
    {
        path: '/sus-places', component: susPlaces,
        children: [
            { path: '', component: mapView },
            { path: 'place-details/:id', component: placeDetails }
        ]
    },
];

Vue.use(VueRouter);
var myRouter = new VueRouter({ routes })

export default myRouter;