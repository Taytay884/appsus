import home from './pages/home/home.js'
import susMail from './pages/sus-mail/sus-mail.js'
import susPlaces from './pages/sus-places/sus-places.js'


const routes = [
    { path: '/', component: home },
    { path: '/susMail', component: susMail },
    { path: '/susPlaces', component: susPlaces },
];

Vue.use(VueRouter);
var myRouter = new VueRouter({ routes })

export default myRouter;