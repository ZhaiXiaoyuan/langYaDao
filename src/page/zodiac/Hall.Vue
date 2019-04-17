<template>
    <div class="cm-page zodiac-hall">
        <div class="page-content">
            <i class="icon logo-icon logo" id="test-btn" @click="test()"></i>
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
            <div class="cm-btn desc-btn" @click="descModal()">玩法介绍</div>
            <div class="panel room-panel">
                <div class="block level-block">
                    <div class="block-hd">
                        <p class="title">选择游戏级别</p>
                    </div>
                    <div class="block-bd">
                        <ul class="room-list">
                            <li class="level1" @click="enterRoom('初级房')">
                                <p class="title">{{juniorRoom.name}}</p>
                                <p class="limit">入场条件：{{juniorRoom.进入门槛}}琅琊豆以上</p>
                                <p class="count">{{juniorRoom.curCount}}/{{juniorRoom.桌子数*11}}人</p>
                            </li>
                            <li class="level2"  @click="enterRoom('中级房')">
                                <p class="title">{{middleRoom.name}}</p>
                                <p class="limit">入场条件：{{middleRoom.进入门槛}}琅琊豆以上</p>
                                <p class="count">{{middleRoom.curCount}}/{{middleRoom.桌子数*11}}人</p>
                            </li>
                            <li class="level3"  @click="enterRoom('高级房')">
                                <p class="title">{{advanceRoom.name}}</p>
                                <p class="limit">入场条件：{{advanceRoom.进入门槛}}琅琊豆以上</p>
                                <p class="count">{{advanceRoom.curCount}}/{{advanceRoom.桌子数*11}}人</p>
                            </li>
                            <li class="level4"  @click="enterRoom('大师房')">
                                <p class="title">{{masterRoom.name}}</p>
                                <p class="limit">入场条件：{{masterRoom.进入门槛}}琅琊豆以上</p>
                                <p class="count">{{masterRoom.curCount}}/{{masterRoom.桌子数*11}}人</p>
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

        <audio id="hall-audio" :src="hallVoice" autoplay loop="true">
            您的浏览器不支持 audio 标签。
        </audio>

    </div>
</template>

<style lang="less" rel="stylesheet/less">

</style>
<script>
    import Vue from 'vue'
    import bus from '../../components/common/bus';
    import 'swiper/dist/css/swiper.css'

    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
        components:{
            swiper,
            swiperSlide
        },
        data: function(){
            return {
                account:{},
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
                juniorRoom:{
                    name:'初级房',
                    curCount:0,
                    桌子数:0,
                },
                middleRoom:{
                    name:'中级房',
                    curCount:0,
                    桌子数:0,
                },
                advanceRoom:{
                    name:'高级房',
                    curCount:0,
                    桌子数:0,
                },
                masterRoom:{
                    name:'大师房',
                    curCount:0,
                    桌子数:0,
                },

                ws:null,
                requestInterval:null,

                selectedRoomLevel:'',

                hallVoice:require('../../voice/hall.mp3'),
                hallAudio:null,
                requesting:false,

            }
        },
        methods: {
            getRoomInfo:function (type) {
                Vue.api.getGameConfigInfo({apiParams:{property:type+'配置'}}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        let roomObj={};
                        data.forEach((item)=>{
                            roomObj[item.configName]=parseInt(item.configValue);
                        });
                        switch (type){
                            case '初级房':
                                this.juniorRoom={...this.juniorRoom,...roomObj};
                                break;
                            case '中级房':
                                this.middleRoom={...this.middleRoom,...roomObj};
                                break;
                            case '高级房':
                                this.advanceRoom={...this.advanceRoom,...roomObj};
                                break;
                            case '大师房':
                                this.masterRoom={...this.masterRoom,...roomObj};
                                break;
                        }
                    }else{

                    }
                });
            } ,
            getRoomData:function () {
                this.socketApi.sendSock({api:'getLobbyInfo',apiParams:{}});
            },
            roomDataFb:function (data) {
                if(!data.state){
                    this.juniorRoom.curCount=data.juniorRoomPlayerCount;
                    this.middleRoom.curCount=data.middleRoomPlayerCount;
                    this.advanceRoom.curCount=data.advancedRoomPlayerCount;
                    this.masterRoom.curCount=data.masterRoomPlayerCount;
                }
            },
            enterRoom:function (type) {
                this.selectedRoomLevel=type;
                this.socketApi.sendSock({api:'entryRoom',apiParams:{roomProperty:type}});
            },
            enterRoomFb:function (data) {
                console.log('data:',data);
                this.$router.push({path:'/zodiac/game?roomLevel='+this.selectedRoomLevel});
            },
            fullScreen:function () {
                var docElm = document.documentElement;
                //W3C
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                }
                //FireFox
                else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                }
                //Chrome等
                else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                }
                //IE11
                else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                }
            },
            partScree:function () {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
                else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
                else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
                else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            },
            switchChange:function (flag) {
                if(flag){
                    this.hallAudio.play();
                }else{
                    this.hallAudio.pause();
                }
            },
            descModal:function () {
                this.alertModal({html:'我是玩法介绍我是玩法介绍我是玩法介我是玩法介绍我是玩法介绍我是玩法介我是玩法介绍我是玩法介绍绍绍我是玩法介绍我是玩法介绍我是玩法介我是玩法介绍我是玩法介绍我是玩法介我是玩法介绍我是我是玩法介绍我是玩法介绍我是玩法介我是玩法介绍我是玩法介绍我是玩法介我是玩法介绍我是玩法介绍绍绍我是玩法介绍我是玩法介绍我是玩法介我是玩法介绍我是玩法介绍我是玩法介我是玩法介绍我是我是玩法介绍我是玩法介绍我是玩法介我是玩法介绍我是玩法介绍我是玩法介我是玩法介绍我是玩法介绍绍绍我是玩法介绍我是玩法介绍我是玩法介我是玩法介绍是玩法介绍我是玩法介我是玩法介绍我是我是玩法介绍我是玩法介绍我是玩法介我是玩法介绍我是玩法介绍我是玩法介我是玩法介绍我是玩法介绍绍绍我是玩法介绍我是玩法介绍我是玩法介我是玩法介绍我是玩法介绍我是玩法介我是玩法介绍我是我是玩法介绍我是玩法介绍我是玩法介我是玩法介绍我是玩法介绍我是玩法介我是玩法介绍我是玩法介绍绍绍我是玩法介绍我是玩法介绍我是玩法介我是玩法介绍我是玩法介绍我是玩法介我是玩法介绍我是',
                    yes:null,
                    type:'scroll',
                });
            },
            autoPlayAudio:function (audio) {
                if (window.WeixinJSBridge) {
                    WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                        audio.play();
                    }, false);
                } else {
                    document.addEventListener("WeixinJSBridgeReady", function () {
                        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                            audio.play();
                        });
                    }, false);
                }
                audio.play();
            }
        },
        created (){
            this.socketApi.setListener((e)=>{
                let resp=JSON.parse(e.data);
               /* console.log('respHall:',resp);*/
                if(resp.respCode=='2000'){
                    let data={};
                    try{
                        data=JSON.parse(resp.respMsg);
                        data.data=JSON.parse(data.data);
                    }catch (err){

                    }
                    if(data.api=='entryRoom'){
                        console.log('respHall:',resp);
                        this.enterRoomFb(data.data);
                    }else if(data.api=='getLobbyInfo'){
                        this.roomDataFb(data.data);
                    }
                }else if(resp.respCode=='4000'){
                    if(resp.respMsg!='用户未进入房间'){
                        this.alertModal({html:resp.respMsg});
                    }
                    //
                 /*   this.alertModal({html:resp.respMsg});*/
                    console.log('respHall:',resp);
                }
            });
        },
        mounted () {
        /*    this.fullScreen();*/
            //
            this.account=this.getAccountInfo();
            console.log('this.account:',this.account);
            //
            this.getRoomInfo('初级房');
            this.getRoomInfo('中级房');
            this.getRoomInfo('高级房');
            this.getRoomInfo('大师房');
            //
            this.hallAudio=this.initAudio('hall-audio');
            this.hallAudio.setMuted(this.getVoiceFlag());
            bus.$on('refreshVoiceFlag', () => {
                this.hallAudio.setMuted(this.getVoiceFlag());
            });
            this.autoPlayAudio(this.hallAudio);
            //
            this.getRoomData();
            this.requestInterval=setInterval(()=>{
                this.getRoomData();
                },2000);
            //
            this.speckText('德玛西亚');
          /*  this.descModal()*/

        },
        beforeDestroy(){
            clearInterval(this.requestInterval);
        },
        beforeRouteEnter(to,from,next){
            Vue.routeCheck(to,from,next)
        },

    }
</script>
