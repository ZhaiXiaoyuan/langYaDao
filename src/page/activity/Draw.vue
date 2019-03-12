<template>
    <div class="cm-page draw-activity">
        <div class="page-content">
            <i class="icon title-icon"></i>
            <div class="main-content">
                <div class="info-panel">
                    <div class="block">
                        <div class="block-hd">抽奖历史</div>
                        <div class="block-bd">
                            <table class="record-list">
                                <thead>
                                <tr>
                                    <td class="time">时间</td>
                                    <td class="cost">消耗积分</td>
                                    <td class="result">抽奖结果</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item,index) in 10" :key="index">
                                    <td>2019/02/03 15:30</td>
                                    <td>30积分</td>
                                    <td>未中奖</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="block">
                        <div class="block-hd">抽奖规则</div>
                        <div class="block-bd">
                            抽奖规则
                        </div>
                    </div>
                </div>
                <div class="draw-panel">
                    <div class="draw-table">
                        <div class="disc">
                            <div class="line"></div>
                            <div class="line line-2"></div>
                            <div class="line line-3"></div>
                            <div class="line line-4"></div>
                            <div class="prize-item-list">
                                <div class="prize-item item-1">
                                    <div class="item-content">
                                        <p class="name">话费卡150元</p>
                                        <div class="pic">
                                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552423152010&di=5fe222b873651df1183b08ab7e44090f&imgtype=0&src=http%3A%2F%2Fphoto.16pic.com%2F00%2F52%2F85%2F16pic_5285949_b.jpg" alt="">
                                        </div>
                                        <i class="icon point"></i>
                                    </div>
                                </div>
                                <div class="prize-item item-2">
                                    <div class="item-content">
                                        <p class="name">话费卡150元</p>
                                        <div class="pic">
                                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552423152010&di=5fe222b873651df1183b08ab7e44090f&imgtype=0&src=http%3A%2F%2Fphoto.16pic.com%2F00%2F52%2F85%2F16pic_5285949_b.jpg" alt="">
                                        </div>
                                        <i class="icon point"></i>
                                    </div>
                                </div>
                                <div class="prize-item item-3">
                                    <div class="item-content">
                                        <p class="name">话费卡150元</p>
                                        <div class="pic">
                                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552423152010&di=5fe222b873651df1183b08ab7e44090f&imgtype=0&src=http%3A%2F%2Fphoto.16pic.com%2F00%2F52%2F85%2F16pic_5285949_b.jpg" alt="">
                                        </div>
                                        <i class="icon point"></i>
                                    </div>
                                </div>
                                <div class="prize-item item-4">
                                    <div class="item-content">
                                        <p class="name">话费卡150元</p>
                                        <div class="pic">
                                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552423152010&di=5fe222b873651df1183b08ab7e44090f&imgtype=0&src=http%3A%2F%2Fphoto.16pic.com%2F00%2F52%2F85%2F16pic_5285949_b.jpg" alt="">
                                        </div>
                                        <i class="icon point"></i>
                                    </div>
                                </div>
                                <div class="prize-item item-5">
                                    <div class="item-content">
                                        <p class="name">话费卡150元</p>
                                        <div class="pic">
                                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552423152010&di=5fe222b873651df1183b08ab7e44090f&imgtype=0&src=http%3A%2F%2Fphoto.16pic.com%2F00%2F52%2F85%2F16pic_5285949_b.jpg" alt="">
                                        </div>
                                        <i class="icon point"></i>
                                    </div>
                                </div>
                                <div class="prize-item item-6">
                                    <div class="item-content">
                                        <p class="name">话费卡150元</p>
                                        <div class="pic">
                                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552423152010&di=5fe222b873651df1183b08ab7e44090f&imgtype=0&src=http%3A%2F%2Fphoto.16pic.com%2F00%2F52%2F85%2F16pic_5285949_b.jpg" alt="">
                                        </div>
                                        <i class="icon point"></i>
                                    </div>
                                </div>
                                <div class="prize-item item-7">
                                    <div class="item-content">
                                        <p class="name">话费卡150元</p>
                                        <div class="pic">
                                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552423152010&di=5fe222b873651df1183b08ab7e44090f&imgtype=0&src=http%3A%2F%2Fphoto.16pic.com%2F00%2F52%2F85%2F16pic_5285949_b.jpg" alt="">
                                        </div>
                                        <i class="icon point"></i>
                                    </div>
                                </div>
                                <div class="prize-item item-8">
                                    <div class="item-content">
                                        <p class="name">话费卡150元</p>
                                        <div class="pic">
                                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552423152010&di=5fe222b873651df1183b08ab7e44090f&imgtype=0&src=http%3A%2F%2Fphoto.16pic.com%2F00%2F52%2F85%2F16pic_5285949_b.jpg" alt="">
                                        </div>
                                        <i class="icon point"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <i class="icon light"></i>
                        <div class="start">
                            <div class="start-btn">
                                <i class="icon start-text-icon"></i>
                                <p class="cost">20积分/次</p>
                            </div>
                        </div>
                        <i class="icon pointer"></i>
                    </div>
                    <div class="score-block">
                        <p>您的积分：<span class="num">23423324</span></p>
                        <p>可抽奖数：<span class="num">20</span></p>
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

        },
        data: function(){
            return {

            }
        },
        methods: {

        },
        mounted () {

        },
    }
</script>
