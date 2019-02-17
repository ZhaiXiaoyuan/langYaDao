<template>
    <div class="cm-page home">
        <div class="page-content">
            <div class="banner-panel">
                <el-carousel height="100%" :interval="10000">
                    <el-carousel-item @click="toDetail(item)" v-for="(item,index) in bannerList" :key="index" :style="{background: 'url('+item.cover+') no-repeat center',backgroundSize: 'cover'}">

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
                            <li>
                                <div class="cover">
                                    <img :src="cover1" alt="">
                                </div>
                                <h3>琅琊岛欢乐运动会</h3>
                            </li>
                            <li>
                                <div class="cover">
                                    <img :src="cover2" alt="">
                                </div>
                                <h3>琅琊岛欢乐运动会</h3>
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
                cover1:require('../images/home/game-cover-1.jpg'),
                cover2:require('../images/home/game-cover-2.jpg'),
                bannerList:[
                    {
                        cover:require('../images/home/banner-1.png'),
                    },
                ],

            }
        },
        methods: {

        },
        mounted () {

        },
        beforeRouteLeave(to,from,next){
            next();
        },
    }
</script>
