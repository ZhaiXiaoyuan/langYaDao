import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name:'home',
            component: resolve => require(['../page/Home.vue'], resolve),
        },
        {
            path: '/zodiac/hall',
            name:'zodiacHall',
            component: resolve => require(['../page/zodiac/Hall.vue'], resolve),
        },
    ]
})
