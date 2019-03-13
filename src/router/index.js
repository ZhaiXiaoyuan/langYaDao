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
                {
                    path: 'safeBox',
                    name:'safeBox',
                    component: resolve => require(['../page/langYaDou/SafeBox.vue'], resolve)
                },
                {
                    path: 'charge',
                    name:'charge',
                    component: resolve => require(['../page/langYaDou/Charge.vue'], resolve)
                },
                {
                    path: 'gift',
                    name:'gift',
                    component: resolve => require(['../page/langYaDou/Gift.vue'], resolve)
                },
            ]
        },
        {
            path: '/zodiac',
            name:'zodiac',
            component: resolve => require(['../page/zodiac/Zodiac.vue'], resolve),
            children:[
                {
                    path: 'hall',
                    name:'zodiacHall',
                    component: resolve => require(['../page/zodiac/Hall.vue'], resolve),
                },
                {
                    path: 'game/:type?',
                    name:'zodiacGame',
                    component: resolve => require(['../page/zodiac/Game.vue'], resolve),
                },
            ]
        },
        {
            path: '/draw',
            name:'draw',
            component: resolve => require(['../page/activity/Draw.vue'], resolve)
        },
    ]
})
