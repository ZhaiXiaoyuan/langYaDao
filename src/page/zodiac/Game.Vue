<template>
    <div class="cm-page zodiac-game">
        <div class="content-wrap">
            <div class="panel session-panel">
                <div class="nav-block">
                    <span class="cm-btn btn exit-btn">退出房间</span>
                    <span class="cm-btn btn home-btn">高级房</span>
                </div>
                <div class="block result-block">
                    <div class="block-hd"><p class="title">战绩专区</p></div>
                    <div class="block-bd">
                        <div class="host-item">
                            本轮擂主：旗木卡卡西
                        </div>
                        <ul class="session-list">
                            <li>
                                <span class="label">第一局</span>
                                <div class="result">凤凰，丑牛，地</div>
                                <p class="score">个人战绩：+1234567</p>
                            </li>
                            <li>
                                <span class="label">第一局</span>
                                <div class="result">凤凰，丑牛，地</div>
                                <p class="score">个人战绩：+1234567</p>
                            </li>
                            <li>
                                <span class="label">第一局</span>
                                <div class="result">凤凰，丑牛，地</div>
                                <p class="score">个人战绩：+1234567</p>
                            </li>
                            <li>
                                <span class="label">第一局</span>
                                <div class="result">凤凰，丑牛，地</div>
                                <p class="score">个人战绩：+1234567</p>
                            </li>
                        </ul>
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
