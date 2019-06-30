<template>
    <div class="cm-page center">
        <div class="page-content">
            <div class="left-nav">
                <div class="nav-list">
                    <div class="list-hd">
                        个人中心
                    </div>
                    <div class="list-bd">
                        <ul>
                            <router-link tag="li" :to="{ path: '/center/user/userInfo'}" :class="{'active':page=='userInfo'}">个人资料</router-link>
                        </ul>
                    </div>
                </div>
                <div class="nav-list vip-nav-list">
                    <div class="list-hd">
                        会员中心
                    </div>
                    <div class="list-bd">
                        <ul>
                            <router-link tag="li" :to="{ path: '/center/vip/vipStore'}" :class="{'active':page=='vipStore'}">成为会员</router-link>
                        </ul>
                    </div>
                </div>
                <div class="nav-list vip-nav-list">
                    <div class="list-hd">
                       充值中心
                    </div>
                    <div class="list-bd">
                        <ul>
                            <router-link tag="li" :to="{ path: '/center/coin/safeBox'}" :class="{'active':page=='safeBox'}">保险箱</router-link>
                            <router-link tag="li" :to="{ path: '/center/coin/charge'}" :class="{'active':page=='charge'}">充值</router-link>
                            <router-link tag="li" :to="{ path: '/center/coin/gift'}" :class="{'active':page=='gift'}">赠送礼物</router-link>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="right-page-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">

</style>
<script>
    import Vue from 'vue'

    export default {
        components:{

        },
        data: function(){
            return {
                type:'user',//user,vip,coin
                page:'',
            }
        },
        watch: {
            $route: {
                handler: function(val, oldVal){
                    if(val.name!=this.page){
                        this.page=val.name;
                    }
                },
                // 深度观察监听
                deep: true
            }
        },
        methods: {

        },
        mounted () {
            this.page=this.$route.name;
            if(this.$route.params.type){
                this.type=this.$route.params.type;
            }
        },
        beforeRouteEnter(to,from,next){
            Vue.routeCheck(to,from,next)
        },
    }
</script>
