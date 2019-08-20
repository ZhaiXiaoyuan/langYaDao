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
                <div class="left-part">
                    <div class="block horizontal-block">
                        <div class="block-hd">
                            <i class="icon game-icon"></i>
                            <span class="title">31ENT游戏</span>
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
                </div>
                <div class="right-part">
                    <div class="block vertical-block game-center-block">
                        <div class="block-hd">
                            <i class="icon line-icon"></i>
                            <span class="title">游戏中心</span>
                            <!--<span class="sub-title"></span>-->
                        </div>
                        <div class="block-bd">
                            <div class="info-row flex-row">
                                <a class="item btn-item" href="http://wpa.qq.com/msgrd?v=3&uin=992311113&site=qq&menu=yes" target="_blank">
                                    <div class="icon-wrap">
                                        <i class="icon customer-service-icon"></i>
                                    </div>
                                    <p class="text">QQ客服</p>
                                </a>
                                <div class="item qrcode">
                                    <div class="img-wrap">
                                        <img :src="wechatQrcode" alt="">
                                    </div>
                                    <p class="text">扫码关注微信公众号</p>
                                </div>
                            </div>
                            <div class="info-row">
                              <!--  <a class="text-item" href="tencent://message/?uin=992311113&Site=http://vps.shuidazhe.com&Menu=yes" target="_blank">
                                    <span class="label">QQ客服：</span><span class="value">992311113</span>
                                </a>-->
                                <a class="text-item" tel="0579-82311113">
                                    <span class="label">客服电话：</span><span class="value">0579-82311113</span>
                                </a>
                            </div>
                            <div class="info-row flex-row">
                              <!--  <a class="item down-load-btn" href="http://www.31ent.com/web/31ENTGame.exe" target="_blank">
                                    <span>PC客户端下载</span>
                                </a>-->
                                <div class="item qrcode">
                                    <div class="img-wrap padding">
                                        <img :src="appQrcode" alt="">
                                    </div>
                                    <p class="text">扫码下载手机客户端</p>
                                </div>
                            </div>
                          <!--  <ul class="info-row download-btn-list" v-if="!bVersion.mobile">
                                <li>
                                    <a href="http://www.31ent.com/web/31ENTGame安装包.exe" target="_blank">
                                        <i class="icon download-icon"></i>
                                        <span>PC客户端下载</span>
                                    </a>
                                </li>
                            </ul>-->
                        </div>
                    </div>
                    <div class="block vertical-block">
                        <div class="block-hd">
                          <!--  <i class="icon gift-icon"></i>-->
                            <i class="icon line-icon"></i>
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
                </div>
            </div>
            <div class="more-tips">
                -&nbsp;精彩内容即将上线，请耐心等候&nbsp;-
            </div>
            <div class="tool-panel">
                <ul class="btn-list">
                    <li class="cm-btn"><a href="http://wpa.qq.com/msgrd?v=3&uin=992311113&site=qq&menu=yes" target="_blank"><i class="icon service-icon"></i></a></li>
                    <li class="cm-btn" @click="goAnchor('#header')"><i class="icon to-top-icon"></i></li>
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
                wechatQrcode:require('../images/home/wechat-qrcode.jpg'),
                appQrcode:require('../images/home/app-qrcode.png'),
                bVersion:Vue.tools.browserVersions(),
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

        /*    this.safeLogin({});*/
        /*    this.forget({type:'bindPhone'});*/
          /*  this.safeBoxLogin({});*/
         /*   this.alertModal({});*/
        /*    Vue.registerModal({open:true});*/
         /*   Vue.loginModal({open:true});*/

        },
    }
</script>
