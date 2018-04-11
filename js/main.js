import router from './routes.js'
import home from './pages/home/home.js';

new Vue({
    el: '#app',
    router,
    components: {
        home
    }

}) 