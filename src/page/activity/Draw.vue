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
                        <div class="disc" :class="rotateClass">
                            <div class="line"></div>
                            <div class="line line-2"></div>
                            <div class="line line-3"></div>
                            <div class="line line-4"></div>
                            <div class="prize-item-list">
                                <div class="prize-item" v-for="(item,index) in typeList" :class="'item-'+(index+1)" :key="index">
                                    <div class="item-content">
                                        <p class="name">{{item.name}}</p>
                                        <div class="pic">
                                            <img :src="basicConfig.imgBasicUrl+item.prizePic"alt="">
                                        </div>
                                        <i class="icon point"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <i class="icon light"></i>
                        <div class="start">
                            <div class="start-btn" @click="draw()">
                                <i class="icon start-text-icon"></i>
                                <p class="cost">{{configData.bonusLotteryPrice}}积分/次</p>
                            </div>
                        </div>
                        <i class="icon pointer"></i>
                    </div>
                    <div class="score-block">
                        <p>您的积分：<span class="num">{{account.bonus}}</span></p>
                        <p>可抽奖数：<span class="num">{{drawCount}}</span></p>
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
                account:{bonus:0},
                configData:{bonusLotteryPrice:1},
                typeList:[],
                rotateClass:{},
            }
        },
        computed: {
            drawCount() {
                return Math.floor(this.account.bonus/this.configData.bonusLotteryPrice);
            }
        },
        methods: {
            getUserInfo:function () {
                Vue.api.getUserInfo({apiParams:{id:this.account.phone,type:'phone'}}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.account={...this.account,...data.user};
                        console.log('this.account:',this.account);
                    }
                });
            },
            getConfigData:function () {
                Vue.api.getBaseGlobalVariable({apiParams:{}}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.configData=JSON.parse(resp.respMsg);
                        console.log('this.configData:',this.configData);
                    }
                });
            },
            getTypeList:function () {
                Vue.api.getPrizeTypeList({apiParams:{pageIndex:1,pageSize:8}}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        let list=typeof data.bonusLotteryList=='string'?JSON.parse(data.bonusLotteryList):data.bonusLotteryList;
                        this.typeList=list;
                        this.typeList.forEach((item,index)=>{
                            item.angle=22.5+index*45+'deg';
                        });
                        console.log('typeList:', this.typeList);
                    }
                });
            },
            draw:function () {
                Vue.api.drawABonusLottery({apiParams:{userId:this.account.id}}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.account={...this.account,...JSON.parse(data.user)}
                        console.log('data:',data);
                    }
                });
            },
            roate:function (index) {
                this.rotateClass={transform:'rotate('+(this.typeList[index].angle+360*5)+')'}
            },
            test:function () {
                
            }
        },
        mounted () {
            //
            this.account=this.getAccountInfo();
            //
            this.getUserInfo();
            this.getConfigData();
            this.getTypeList();

        },
    }
</script>
