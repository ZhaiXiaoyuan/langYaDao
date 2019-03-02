<template>
    <div class="cm-page zodiac-hall">
        <div class="content-wrap">
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
