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
            path: '/center/:type',
            name:'center',
            component: resolve => require(['../page/user/Center.vue'], resolve),
            children:[
                {
                    path: 'userInfo',
                    name:'userInfo',
                    component: resolve => require(['../page/user/UserInfo.vue'], resolve)
                },
                {
                    path: 'vipStore',
                    name:'vipStore',
                    component: resolve => require(['../page/vip/VipStore.vue'], resolve)
                },
            ]
        },
        {
            path: '/zodiac/hall',
            name:'zodiacHall',
            component: resolve => require(['../page/zodiac/Hall.vue'], resolve),
        },
        {
            path: '/zodiac/game',
            name:'zodiacGame',
            component: resolve => require(['../page/zodiac/Game.vue'], resolve),
        },
    ]
})
