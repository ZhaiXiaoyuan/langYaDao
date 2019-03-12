<template>
    <div class="cm-page home">
        <div class="page-content">
            <div class="banner-panel">
                <el-carousel height="100%" :interval="10000">
                    <el-carousel-item @click="toDetail(item)" v-for="(item,index) in bannerList" :key="index" :style="{background: 'url('+basicConfig.coverBasicUrl+item.image+') no-repeat center',backgroundSize: 'cover'}">
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
                                        <img :src="basicConfig.coverBasicUrl+item.gamePic" alt="">
                                    </div>
                                    <h3>琅琊岛欢乐运动会</h3>
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
                        <div class="draw-item">
                            <div class="cm-btn draw-btn"></div>
                            <p class="score">您的积分余额：xxx</p>
                        </div>
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

    export default {
        components:{

        },
        data: function(){
            return {
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
                        this.gameList=data.gameList;
                        console.log('this.gameList:',this.gameList);
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
                        console.log('this.bannerList:',this.bannerList);
                    }
                });
            },
        },
        mounted () {
            //
            this.getBannerList();
            this.getGameList();
            //临时测试
         /*   Vue.registerModal({open:true});*/
         /*   Vue.loginModal({open:true});*/
        },
        beforeRouteLeave(to,from,next){
            next();
        },
    }
</script>
