import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes= [
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
const router= new Router({
    routes:routes,
    /*  mode: 'history',*/
    /* scrollBehavior: function (to, from, savedPosition) {
     return savedPosition || { x: 0, y: 0 }
     }*/
})

//注册全局导航守卫
/*let noLoginPage=['home'];
function safeLoginCheck(path,next) {
    let safeAccount=Vue.getSafeAccounInfo();
    if(path.indexOf('coin')>-1&&!safeAccount.token){
        alert(233);
        Vue.safeLogin({ok:()=>{
            next();
        }});
    }else{
        next();
    }
}*/
/*router.beforeEach((to, from,next) => {
    let name=to.name;
    let path=to.path;
    let toPath=from.path;
    console.log('path:',path);
    console.log('toPath',toPath);
    let account=Vue.getAccountInfo();
    if(noLoginPage.indexOf(name)==-1){
        if(!account.id){
            Vue.loginModal({open:true,ok:()=>{
                safeLoginCheck(path,next);
            }});
        }else{
            safeLoginCheck(path,next);
        }
    }else{
        next();
    }
   /!* next();*!/
})*/

//
export default router
