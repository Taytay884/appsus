import home from './pages/home/home.js'
import susMail from './pages/sus-mail/sus-mail.js'
// import about from './pages/susKeep/susKeep.js'
// import car from './pages/car/car.js'
// import carDetails from './pages/car/car-details.js'
// import carEdit from './pages/car/car-edit.js'

const routes = [
    { path: '/', component: home },
    { path: '/susMail', component: susMail },
    // { path: '/susKeep', component: car },
    // { path: '/susPlaces', component: carEdit },
];

Vue.use(VueRouter);
var myRouter = new VueRouter({ routes })

export default myRouter;