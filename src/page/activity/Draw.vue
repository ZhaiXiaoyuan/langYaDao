<template>
    <div class="cm-page draw-activity">
        <div class="page-content">
            <i class="icon title-icon"></i>
            <div class="main-content">
              <!--  <div class="info-panel">
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
                                <tr v-for="(item,index) in entryList" :key="index">
                                    <td>{{item.createdAt|formatDate('yyyy-MM-dd hh:mm')}}</td>
                                    <td>{{item.bonus}}积分</td>
                                    <td>{{item.name=='谢谢惠顾'?'未中奖':item.name}}</td>
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
                </div>-->
                <div class="draw-panel">
                    <div class="draw-table">
                        <div class="disc" :style="rotateStyle">
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
                            <div class="start-btn" :class="{'cm-disabled':drawing}" @click="draw()">
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

        <el-dialog class="win-modal" title="" :visible.sync="winModalFlag"top="25vh">
            <div class="modal-body">
                <div class="img-box">
                    <img :src="basicConfig.imgBasicUrl+bonusLottery.prizePic" alt="">
                </div>
                <p class="title">恭喜您中了{{bonusLottery.name}}</p>
            </div>
            <div class="modal-footer">
                <span class="cm-btn handle-btn" @click="winModalFlag=false">确定</span>
            </div>
        </el-dialog>
        <el-dialog class="tips-modal" title="" :visible.sync="tipsModalFlag"top="25vh">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="status-block" v-if="tipsModalType=='fail'">
                        <i class="icon fail-icon"></i>
                        <p class="tips">很遗憾，您与大奖擦肩而过，再接再厉吧!</p>
                    </div>
                    <div class="status-block" v-if="tipsModalType=='noBonus'">
                        <i class="icon no-bonus-icon"></i>
                        <p class="tips">积分不足，无法抽奖!</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <el-button class="handle-btn" type="primary" @click="tipsModalFlag=false">确定</el-button>
                </div>
            </div>
        </el-dialog>

        <audio id="draw-audio" :src="drawVoice" preload="auto">
            您的浏览器不支持 audio 标签。
        </audio>
    </div>
</template>

<style lang="less" rel="stylesheet/less">

</style>
<script>
    import Vue from 'vue'
    import bus from '../../components/common/bus'

    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
        components:{

        },
        data: function(){
            return {
                account:{bonus:0},
                configData:{bonusLotteryPrice:1},
                typeList:[],
                rotateStyle:{
                    color:'red'
                },
                bonusLottery:{},
                oldAngle:0,
                oldRotateAngle:0,
                winModalFlag:false,
                tipsModalFlag:false,
                tipsModalType:'fail',//fail,noBonus
                drawing:false,

                drawVoice:require('../../voice/turntable.mp3'),
                drawAudio:null,

                pager:{
                    pageIndex:1,
                    pageSize:50,
                    total:0,
                    loading:false
                },
                entryList:[],
            }
        },
        computed: {
            drawCount() {
                return Math.floor(this.account.bonus/this.configData.bonusLotteryPrice);
            }
        },
        methods: {
            getList:function (pageIndex) {
                this.pager.pageIndex=pageIndex?pageIndex:1;
                let params={
                    pageIndex:this.pager.pageIndex,
                    pageSize:this.pager.pageSize,
                    userId:this.account.id
                }
                this.pager.loading=true;
                Vue.api.getBonusLotteryRecordList({apiParams:params}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        let list=typeof data.list=='string'?JSON.parse(data.giftList):data.list;
                        this.entryList=list;
                        this.pager.total=data.count;
                    }
                    this.pager.loading=false;
                });
            },
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
                            this.typeList[this.typeList.length-1-index].angle=22.5+index*45;
                        });
                    }
                });
            },
            draw:function () {
                if(this.drawCount<1){
                    this.tipsModalFlag=true;
                    this.tipsModalType='noBonus';
                    return;
                }
                this.drawing=true;
                Vue.api.drawABonusLottery({apiParams:{userId:this.account.id}}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.account={...this.account,...JSON.parse(data.user)};
                        this.bonusLottery=JSON.parse(data.BonusLottery);
                        this.typeList.forEach((item,index)=>{
                            if(item.name==this.bonusLottery.name){
                                this.rotate(index);
                            }
                        });
                    }else{
                        this.drawing=false;
                    }
                });
                this.drawAudio.play();
            },
            rotate:function (index) {
                let item=this.typeList[index];
                let gap=item.angle-this.oldAngle;
                let rotateAngle=this.oldRotateAngle+(gap>=0?gap:(360-Math.abs(gap)))+5*360;
                this.rotateStyle={transform:'rotate('+(rotateAngle)+'deg)',transition:'all 8s'};
                this.oldAngle=item.angle;
                this.oldRotateAngle=rotateAngle;
                setTimeout(()=>{
                    if(item.name=='谢谢惠顾'){
                        this.tipsModalFlag=true;
                        this.tipsModalType='fail';
                    }else{
                        this.winModalFlag=true;
                    }
                    this.drawing=false;
                    this.getList();
                },9000)
            },
        },
        mounted () {
            //
            this.account=this.getAccountInfo();
            //
            this.getList();
            this.getUserInfo();
            this.getConfigData();
            this.getTypeList();
            //
            this.drawAudio=this.initAudio('draw-audio');
            this.drawAudio.setSpeed(0.95);
            let voiceFlag=this.getVoiceFlag();
            this.drawAudio.setMuted(voiceFlag);
            bus.$on('refreshVoiceFlag', () => {
                voiceFlag=this.getVoiceFlag();
                this.drawAudio.setMuted(voiceFlag);
            });

           /* document.addEventListener("WeixinJSBridgeReady", ()=>{
                this.drawAudio.play()
            }, false);*/

        },
        beforeRouteEnter(to,from,next){
            Vue.routeCheck(to,from,next)
        },
    }
</script>
