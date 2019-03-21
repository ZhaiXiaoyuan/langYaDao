<template>
    <div class="cm-page home">
        <div class="page-content">
            <div class="banner-panel">
                <el-carousel height="100%" :interval="10000">
                    <el-carousel-item @click="toDetail(item)" v-for="(item,index) in bannerList" :key="index" :style="{background: 'url('+basicConfig.imgBasicUrl+item.image+') no-repeat center',backgroundSize: 'cover'}">
                        <a :href="item.url" target="_blank" class="banner-link"></a>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="cm-container content-panel">
                <div class="block horizontal-block">
                    <div class="block-hd">
                        <i class="icon game-icon"></i>
                        <span class="title">琅琊岛游戏</span>
                    </div>
                    <div class="block-bd">
                        <ul class="item-list">
                            <li v-for="(item,index) in gameList" :key="index">
                                <a :href="item.gameUrl">
                                    <div class="cover">
                                        <img :src="basicConfig.imgBasicUrl+item.gamePic" alt="">
                                    </div>
                                    <h3>{{item.gameName}}</h3>
                                </a>
                            </li>
                            <li class="waiting-item">
                                <div class="cover">
                                   <div class="icon-wrap">
                                       <i class="icon hourglass-icon"></i>
                                       <p>敬请期待</p>
                                   </div>
                                </div>
                                <h3>更多游戏敬请期待</h3>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="block vertical-block">
                    <div class="block-hd">
                        <i class="icon gift-icon"></i>
                        <span class="title">欢乐大转盘</span>
                        <span class="sub-title">（积分赢好礼）</span>
                    </div>
                    <div class="block-bd">
                        <router-link tag='div' :to="{ path: '/draw'}" class="draw-item">
                            <div class="cm-btn draw-btn"></div>
                            <p class="score" v-if="account.id">您的积分余额：{{account.bonus}}</p>
                            <p class="score" v-if="!account.id">马上前往</p>
                        </router-link>
                    </div>
                </div>
                <div class="more-tips">
                    -&nbsp;精彩内容即将上线，请耐心等候&nbsp;-
                </div>
            </div>
            <div class="tool-panel">
                <ul class="btn-list">
                    <li><i class="icon service-icon"></i></li>
                    <li><i class="icon to-top-icon"></i></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">

</style>
<script>
    import Vue from 'vue'
    import bus from '../components/common/bus'

    export default {
        components:{

        },
        data: function(){
            return {
                account:{},
                bannerList:[],
                gameList:[],
            }
        },
        methods: {
            getGameList:function () {
                let params={
                    pageIndex:1,
                    pageSize:50,
                    state:'enable'
                }
                Vue.api.getGameList({apiParams:params}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.gameList=typeof data.gameList=='string'?JSON.parse(data.gameList):data.gameList;
                    }
                });
            },
            getBannerList:function () {
                let params={
                    pageIndex:1,
                    pageSize:10,
                }
                Vue.api.getBannerList({apiParams:params}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.bannerList=data.bannerList;
                    }
                });
            },
        },
        mounted () {
            //
            this.account=this.getAccountInfo();
            /*刷新用户信息*/
            bus.$on('refreshAccount', () => {
                this.account=Vue.getAccountInfo();
            });
            //
            this.getBannerList();
            this.getGameList();
            //临时测试
          /*  this.forget({});*/
           /* this.safeBoxLogin({});*/
         /*   this.alertModal({});*/
           /* Vue.registerModal({open:true});*/
         /*   Vue.loginModal({open:true});*/

        },
        beforeRouteLeave(to,from,next){
            next();
        },
    }
</script>
