<template>
    <div class="cm-page zodiac-hall">
        <div class="page-content">
            <i class="icon logo-icon logo"></i>
            <div class="carousel-block">
                <!-- <div class="view-box">
                     <ul class="zodiac-list">
                         <li class="zodiac-item" v-for="(item,index) in zodiacList" :key="index" v-bind:style="{left:-11*index+'px'}">
                             <i class="icon" :class="item"></i>
                         </li>
                     </ul>
                 </div>-->

                <div class="swiper-box" style="width: 520px;">
                    <!-- swiper -->
                    <swiper :options="swiperOption">
                        <swiper-slide v-for="(item,index) in zodiacList" :key="index">
                            <div class="zodiac-item icon" :class="item">
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
            <div class="panel room-panel">
                <div class="block level-block">
                    <div class="block-hd">
                        <p class="title">选择游戏级别</p>
                    </div>
                    <div class="block-bd">
                        <ul class="room-list">
                            <li v-for="(item,index) in roomList" :key="index" :class="'level'+(index+1)">
                                <p class="title">{{item.name}}</p>
                                <p class="limit">入场条件：{{item.limit}}琅琊豆以上</p>
                                <p class="count">{{item.curCount}}/{{item.count}}人</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="block introduce-block">
                    <div class="block-hd">
                        <p class="title">玩法介绍</p>
                    </div>
                    <div class="block-bd">
                        <div class="text-content">
                            我是玩法介绍我是玩法介绍我是玩法介我
                            是玩法介绍我是玩法介绍我是玩法介我是
                            玩法介绍我是玩法介绍绍绍我是玩法介绍
                            我是玩法介绍我是玩法介我是玩法介绍我
                            是玩法介绍我是玩法介我是玩法介绍我是
                            我是玩法介绍我是玩法介绍我是玩法介我
                            是玩法介绍我是玩法介绍我是玩法介我是
                            玩法介绍我是玩法介绍绍绍我是玩法介绍
                            我是玩法介绍我是玩法介我是玩法介绍我
                            是玩法介绍我是玩法介我是玩法介绍我是
                            我是玩法介绍我是玩法介绍我是玩法介我
                            是玩法介绍我是玩法介绍我是玩法介我是
                            玩法介绍我是玩法介绍绍绍我是玩法介绍
                            我是玩法介绍我是玩法介我是玩法介绍我
                            是玩法介绍我是玩法介我是玩法介绍我是
                            我是玩法介绍我是玩法介绍我是玩法介我
                            是玩法介绍我是玩法介绍我是玩法介我是
                            玩法介绍我是玩法介绍绍绍我是玩法介绍
                            我是玩法介绍我是玩法介我是玩法介绍我
                            是玩法介绍我是玩法介我是玩法介绍我是
                            我是玩法介绍我是玩法介绍我是玩法介我
                            是玩法介绍我是玩法介绍我是玩法介我是
                            玩法介绍我是玩法介绍绍绍我是玩法介绍
                            我是玩法介绍我是玩法介我是玩法介绍我
                            是玩法介绍我是玩法介我是玩法介绍我是
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">

</style>
<script>
    import Vue from 'vue'
    import 'swiper/dist/css/swiper.css'

    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
        components:{
            swiper,
            swiperSlide
        },
        data: function(){
            return {
                swiperOption: {
                    slidesPerView: 5,
                    spaceBetween: 0,
                    freeMode: true,
                    loop: true,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false
                    },
                },
                zodiacList:['tiger-zodiac-icon','rabbit-zodiac-icon','cow-zodiac-icon','sheep-zodiac-icon','chicken-zodiac-icon','dog-zodiac-icon','monkey-zodiac-icon','pig-zodiac-icon','mouse-zodiac-icon','horse-zodiac-icon','snake-zodiac-icon','dragon-zodiac-icon'],
                roomList:[
                    {
                        name:'初级房',
                        limit:10,
                        count:100,
                        curCount:99,
                    },
                    {
                        name:'中级房',
                        limit:100,
                        count:100,
                        curCount:80,
                    },
                    {
                        name:'高级房',
                        limit:1000,
                        count:100,
                        curCount:50,
                    },
                    {
                        name:'大师房',
                        limit:10000,
                        count:100,
                        curCount:30,
                    }
                ]
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
