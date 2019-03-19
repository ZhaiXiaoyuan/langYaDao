<template>
    <div class="cm-page zodiac-game">
        <div class="page-content" id="container">
            <div class="panel session-panel">
                <div class="nav-block">
                    <span class="cm-btn btn exit-btn" @click="exitRoom()">退出房间</span>
                    <span class="cm-btn btn home-btn">{{roomLevel}}</span>
                </div>
                <div class="block result-block">
                    <div class="block-hd"><p class="title">战绩专区</p></div>
                    <div class="block-bd">
                        <div class="host-item">
                            本轮擂主：
                            <span v-if="deskInfo.deskState!='waitingBanker'&&curHost.user.name">{{curHost.user.name}}</span>
                            <span v-if="deskInfo.deskState=='waitingBanker'">等待擂主</span>
                        </div>
                        <ul class="session-list">
                            <li v-for="(item,index) in recordList" :key="index">
                                <span class="label">{{item.title}}</span>
                                <div v-if="item.result&&((index!=deskInfo.currentRount-1)||showResult)">
                                    <div class="result">{{item.result-1|resultDict}}</div>
                                    <p class="score">
                                        个人战绩：<span v-if="item.langyaRecord>0">+</span>{{item.langyaRecord}}
                                    </p>
                                </div>
                                <div class="non-content" v-if="!item.result||(index==deskInfo.currentRount-1&&!showResult)">
                                    <i class="icon tips"></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="panel turntable-panel">
                <div class="table-block" :class="{'show-result':deskInfo.deskState=='betweenRound'}">
                    <div class="block-bd">
                        <div class="layers">
                            <div class="line"></div>
                            <div class="line line-2"></div>
                            <div class="line line-3"></div>
                            <div class="line line-4"></div>
                            <div class="line line-5"></div>
                            <div class="line line-6"></div>
                            <div class="outside-layer">
                                <div class="layer-bd">
                                    <div class="item item-1" :class="{'current':runningIndex==1}">
                                       <div class="item-content">
                                           <div class="current-mask"></div>
                                           <i class="point" id="target-point-1"></i>
                                           <i class="icon mouse-icon"></i>
                                       </div>
                                    </div>
                                    <div class="item item-2"  :class="{'current':runningIndex==2}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <i class="point" id="target-point-2"></i>
                                            <i class="icon cow-icon"></i>
                                        </div>
                                    </div>
                                    <div class="item item-3"  :class="{'current':runningIndex==3}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <i class="point" id="target-point-3"></i>
                                            <i class="icon tiger-icon"></i>
                                        </div>
                                    </div>
                                    <div class="item item-4"  :class="{'current':runningIndex==4}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <i class="point" id="target-point-4"></i>
                                            <i class="icon rabbit-icon"></i>
                                        </div>
                                    </div>
                                    <div class="item item-5"  :class="{'current':runningIndex==5}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <i class="point" id="target-point-5"></i>
                                            <i class="icon dragon-icon"></i>
                                        </div>
                                    </div>
                                    <div class="item item-6"  :class="{'current':runningIndex==6}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <i class="point" id="target-point-6"></i>
                                            <i class="icon snake-icon"></i>
                                        </div>
                                    </div>
                                    <div class="item item-7"  :class="{'current':runningIndex==7}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <i class="point" id="target-point-7"></i>
                                            <i class="icon horse-icon"></i>
                                        </div>
                                    </div>
                                    <div class="item item-8"  :class="{'current':runningIndex==8}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <i class="point" id="target-point-8"></i>
                                            <i class="icon sheep-icon"></i>
                                        </div>
                                    </div>
                                    <div class="item item-9"  :class="{'current':runningIndex==9}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <i class="point" id="target-point-9"></i>
                                            <i class="icon monkey-icon"></i>
                                        </div>
                                    </div>
                                    <div class="item item-10"  :class="{'current':runningIndex==10}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <i class="point" id="target-point-10"></i>
                                            <i class="icon chicken-icon"></i>
                                        </div>
                                    </div>
                                    <div class="item item-11"  :class="{'current':runningIndex==11}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <i class="point" id="target-point-11"></i>
                                            <i class="icon dog-icon"></i>
                                        </div>
                                    </div>
                                    <div class="item item-12"  :class="{'current':runningIndex==12}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <i class="point" id="target-point-12"></i>
                                            <i class="icon pig-icon"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="middle-layer">
                                <div class="layer-bd">
                                    <div class="item item-1" :class="{'current':this.runningCount==-1&&(runningIndex==12||runningIndex==1||runningIndex==2)}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <i class="point" id="target-point-13"></i>
                                            <i class="icon turtle-icon"></i>
                                            <span class="name">神龟</span>
                                        </div>
                                    </div>
                                    <div class="item item-2" :class="{'current':this.runningCount==-1&&(runningIndex==3||runningIndex==4||runningIndex==5)}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <i class="point" id="target-point-14"></i>
                                            <i class="icon kirin-icon"></i>
                                            <span class="name">麒麟</span>
                                        </div>
                                    </div>
                                    <div class="item item-3"  :class="{'current':this.runningCount==-1&&(runningIndex==6||runningIndex==7||runningIndex==8)}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <i class="point" id="target-point-15"></i>
                                            <i class="icon phoenix-icon"></i>
                                            <span class="name">凤凰</span>
                                        </div>
                                    </div>
                                    <div class="item item-4"  :class="{'current':this.runningCount==-1&&(runningIndex==9||runningIndex==10||runningIndex==11)}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <i class="point" id="target-point-16"></i>
                                            <i class="icon pixiu-icon"></i>
                                            <span class="name">貔貅</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inside-layer">
                                <div class="layer-bd">
                                    <div class="item item-1" :class="{'current':this.runningCount==-1&&runningIndex==1}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <span class="name">乾</span>
                                            <i class="point"></i>
                                        </div>
                                    </div>
                                    <div class="item item-2"  :class="{'current':this.runningCount==-1&&runningIndex==2}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <span class="name">坤</span>
                                            <i class="point"></i>
                                        </div>
                                    </div>
                                    <div class="item item-3"  :class="{'current':this.runningCount==-1&&runningIndex==3}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <span class="name">乾</span>
                                            <i class="point"></i>
                                        </div>
                                    </div>
                                    <div class="item item-4"  :class="{'current':this.runningCount==-1&&runningIndex==4}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <span class="name">坤</span>
                                            <i class="point"></i>
                                        </div>
                                    </div>
                                    <div class="item item-5"  :class="{'current':this.runningCount==-1&&runningIndex==5}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <span class="name">乾</span>
                                            <i class="point" id="target-point-17"></i>
                                        </div>
                                    </div>
                                    <div class="item item-6"  :class="{'current':this.runningCount==-1&&runningIndex==6}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <span class="name">坤</span>
                                            <i class="point"></i>
                                        </div>
                                    </div>
                                    <div class="item item-7"  :class="{'current':this.runningCount==-1&&runningIndex==7}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <span class="name">乾</span>
                                            <i class="point"></i>
                                        </div>
                                    </div>
                                    <div class="item item-8"  :class="{'current':this.runningCount==-1&&runningIndex==8}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <span class="name">坤</span>
                                            <i class="point" id="target-point-18"></i>
                                        </div>
                                    </div>
                                    <div class="item item-9"  :class="{'current':this.runningCount==-1&&runningIndex==9}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <span class="name">乾</span>
                                            <i class="point"></i>
                                        </div>
                                    </div>
                                    <div class="item item-10"  :class="{'current':this.runningCount==-1&&runningIndex==10}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <span class="name">坤</span>
                                            <i class="point"></i>
                                        </div>
                                    </div>
                                    <div class="item item-11"  :class="{'current':this.runningCount==-1&&runningIndex==11}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <span class="name">乾</span>
                                            <i class="point"></i>
                                        </div>
                                    </div>
                                    <div class="item item-12"  :class="{'current':this.runningCount==-1&&runningIndex==12}">
                                        <div class="item-content">
                                            <div class="current-mask"></div>
                                            <span class="name">坤</span>
                                            <i class="point"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tips-layer" v-if="deskInfo.deskState=='bankerSetting'">
                                <p class="index">擂主设置中</p>
                                <p class="time"><span>请等候</span>{{timer}}s</p>
                            </div>
                            <div class="timer-layer">
                                <div class="waiting" v-if="deskInfo.deskState=='leisure'">
                                    <p class="index">空闲</p>
                                </div>
                                <div class="waiting" v-if="deskInfo.deskState=='waitingBanker'">
                                    <p class="index">等待擂主</p>
                                </div>
                                <div class="waiting" v-if="deskInfo.deskState=='bankerSetting'">
                                    <p class="index">擂主设置中</p>
                                </div>
                                <div class="waiting" v-if="deskInfo.deskState=='countdown'||deskInfo.deskState=='settlement'||deskInfo.deskState=='betweenRound'">
                                    <p class="index">第{{deskInfo.currentRount-1|numToCn}}局</p>
                                    <p class="time">
                                        <span v-if="deskInfo.deskState=='countdown'">下注中</span><span v-if="deskInfo.deskState=='betweenRound'">开奖中</span>{{timer}}s</p>
                                </div>
                                <i class="point" id="inside-layer-point"></i>
                            </div>
                            <div class="result-layer ani-item" :class="showResultClass">
                                <div class="layer-bd">
                                    <i class="icon radiation-icon"></i>
                                    <i class="icon fuzzy-icon"></i>
                                    <i class="icon zodiac-icon" :class="curResult.icon"></i>
                                    <div class="result-items">
                                        <div class="item middle-result-item">
                                            <i class="icon" :class="curResult.middleIcon+'-min-icon'"></i>
                                            <span class="name">{{curResult.middleName}}</span>
                                        </div>
                                        <div class="item outside-result-item">
                                            <span class="name">{{curResult.outsideName}}</span>
                                        </div>
                                        <div class="item inside-result-item">
                                            <span class="name">{{curResult.insideName}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="handle-btn-list">
                    <span class="cm-btn handle-btn apply-btn" v-if="type=='player'" @click="applyToHost()">申请成为擂主</span>
                    <span class="cm-btn handle-btn entrance-btn" @click="test()">我的庄园</span>
                </div>
            </div>
            <div class="panel bet-panel">
                <div class="block bet-block">
                    <div class="block-hd"><p class="title">竞猜区</p></div>
                    <div class="block-bd">
                        <div class="balance">琅琊豆余额:{{curPlayer.user.balance}}</div>
                        <ul class="choice-list" v-if="type=='player'">
                            <li v-for="(item,index) in roomConfig.chipList" :key="index" class="cm-btn" :class="{'selected':selectedChip==item}" @click="selectChip(item)">{{item}}</li>
                        </ul>
                        <div class="area options-area" v-if="type=='player'">
                            <div class="area-hd">
                                <span class="title">-&nbsp;竞猜&nbsp;-</span>
                            </div>
                            <div class="area-bd">
                                <ul class="item-list">
                                    <li v-for="(item,index) in optionsList" :key="index" class="item" :class="item.type" @click="setBet(item)">
                                        <i class="icon" :class="item.icon"></i>
                                        <div class="item-hd">
                                            <span class="name">{{item.name}}</span>
                                        </div>
                                        <div class="item-bd">
                                            <p>竞猜率:{{parseInt(rateConfig[item.type])}}</p>
                                            <p>竞猜额:{{curBetInfo[item.id]}}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!--start:擂主竞猜区内容-->
                        <div class="area options-area host-options-area" :class="{'cm-disabled':deskInfo.deskState!='bankerSetting'}" v-if="type=='host'">
                            <div class="area-hd">
                                <span class="title">-&nbsp;竞猜结果&nbsp;-</span>
                            </div>
                            <div class="area-bd">
                                <ul class="item-list">
                                    <li v-for="(item,index) in hostOptionsList" :key="index" class="item" @click="selectPresetOption(item)">
                                        <i class="icon" :class="item.icon"></i>
                                        <div class="item-hd">
                                            <span class="name">{{item.outsideName}}</span>
                                        </div>
                                        <div class="item-bd">
                                          <p>
                                              <span>{{item.middleName}}</span>
                                              <span>{{item.insideName}}</span>
                                          </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="area options-area host-options-area reset-area" :class="{'cm-disabled':deskInfo.deskState!='bankerSetting'}" v-if="type=='host'">
                            <div class="area-hd">
                                <span class="title">-&nbsp;设置竞猜结果&nbsp;-</span>
                            </div>
                            <div class="area-bd">
                                <ul class="item-list">
                                    <li v-for="(item,index) in presetList" :key="index" class="item preset-item" :class="{'to-set':!item.value,'cur-item':deskInfo.deskState=='bankerSetting'&&curPreset.title==item.title}" @click="toPreset(item)">
                                        <div class="item-hd">
                                            <span class="name">{{item.title}}</span>
                                        </div>
                                        <div class="item-bd">
                                            <p v-if="item.value">
                                                {{item.middleName}},{{item.outsideName}},{{item.insideName}}
                                            </p>
                                            <p class="to-set-btn">点击设置</p>
                                            <p class="setting-tips">设置中</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="handle">
                                <div class="cm-btn apply-btn" @click="savePreset()">提交结果</div>
                            </div>
                        </div>
                        <!--start:擂主竞猜区内容-->
                    </div>
                </div>
            </div>
            <div class="panel data-panel">
                <div class="block player-block">
                    <div class="block-hd">
                        <table>
                            <thead>
                            <tr>
                                <td class="name">昵称</td>
                                <td class="level">等级</td>
                                <td class="count">战绩</td>
                                <td class="balance">余额</td>
                            </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="block-bd">
                        <table>
                            <tbody>
                            <tr v-for="(item,index) in playerList" :key="index">
                                <td class="name">{{item.user.name}}</td>
                                <td class="level">{{item.vipType?'vip'+item.vipType:'非vip'}}</td>
                                <td class="count"><span class="win" :class="{'lose':item.langyaRecord<0}"><span v-if="item.langyaRecord>0">+</span>{{item.langyaRecord|numFormat}}</span></td>
                                <td class="balance">{{item.user.balance|numFormat}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="block host-block">
                    <div class="block-hd"><span class="title">擂主候选区</span></div>
                    <div class="block-bd">
                        <table>
                            <tbody>
                            <tr v-for="(item,index) in hostList" :key="index">
                                <td class="index">{{index+1}}</td>
                                <td class="name">{{item.user.name}}</td>
                                <td class="count"><span class="win" :class="{'lose':item.langyaRecord<0}"><span v-if="item.langyaRecord>0">+</span>{{item.langyaRecord}}</span></td>
                                <td class="balance">{{item.user.balance|numFormat}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="block personal-block">
                    <div class="block-hd"><span class="title">个人战绩</span></div>
                    <div class="block-bd">
                        <p>参与局数：{{curPlayer.round}}</p>
                        <p>房内战绩：{{curPlayer.langyaRecord}}</p>
                        <p>单局最大胜利：{{curPlayer.maxWin}}</p>
                    </div>
                </div>
            </div>
            <!--start:琅琊豆效果-->
            <span class="coin-item" v-for="(item,index) in coinList" :key="index" :style="item.from"><i class="icon coin-icon"></i></span>
        </div>
        <!--end:琅琊豆效果-->
        <!--结果弹窗-->
        <el-dialog class="result-modal" title="" :visible.sync="resultModalFlag" center top="25vh">
            <div class="modal-header">
                <div class="title">本局结算</div>
                <span class="cm-btn close-btn" @click="resultModalFlag=false"></span>
            </div>
            <div class="modal-body" style="border-top: none;">
                <div class="result-list">
                    <div class="list-hd">
                        <table>
                            <thead>
                            <tr>
                                <td class="type">身份</td>
                                <td class="name">昵称</td>
                                <td class="score">积分</td>
                                <td class="count">琅琊豆</td>
                            </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="list-bd">
                        <table>
                            <tbody>
                            <tr v-for="(item,index) in resultList" :key="index">
                                <td class="type">{{item.id==curHost.userId?'擂主':'挑战者'}}</td>
                                <td class="name">{{item.name}}</td>
                                <td class="score">{{item.bonus}}</td>
                                <td class="count"><span class="win" :class="{'lose':item.langyaRecord<0}"><span v-if="item.langyaRecord>0">+</span>{{item.langyaRecord}}</span></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <span class="cm-btn handle-btn" @click="resultModalFlag=false">关闭({{resultModalTimer}}s)</span>
            </div>
        </el-dialog>

        <!--音频-->
        <!--<audio src="someaudio.wav">
            您的浏览器不支持 audio 标签。
        </audio>-->
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
                account:{},
                type:'player',//player:'玩家',host:'擂主'
                roomLevel:null,
                optionsList:[
                    {
                        id:12,
                        name:'亥猪',
                        type:'outside',
                        icon:'pig-icon',
                    },
                    {
                        id:1,
                        name:'子鼠',
                        type:'outside',
                        icon:'mouse-icon',
                    },
                    {
                        id:2,
                        name:'丑牛',
                        type:'outside',
                        icon:'cow-icon',
                    },
                    {
                        id:3,
                        name:'寅虎',
                        type:'outside',
                        icon:'tiger-icon',
                    },
                    {
                        id:4,
                        name:'卯兔',
                        type:'outside',
                        icon:'rabbit-icon',
                    },
                    {
                        id:5,
                        name:'辰龙',
                        type:'outside',
                        icon:'dragon-icon',
                    },
                    {
                        id:6,
                        name:'巳蛇',
                        type:'outside',
                        icon:'snake-icon',
                    },
                    {
                        id:7,
                        name:'午马',
                        type:'outside',
                        icon:'horse-icon',
                    },
                    {
                        id:8,
                        name:'未羊',
                        type:'outside',
                        icon:'sheep-icon',
                    },
                    {
                        id:9,
                        name:'申猴',
                        type:'outside',
                        icon:'monkey-icon',
                    },
                    {
                        id:10,
                        name:'酉鸡',
                        type:'outside',
                        icon:'chicken-icon',
                    },
                    {
                        id:11,
                        name:'戍狗',
                        type:'outside',
                        icon:'dog-icon',
                    },
                    {
                        id:13,
                        name:'麒麟',
                        type:'middle',
                        icon:'kirin-icon',
                    },
                    {
                        id:14,
                        name:'凤凰',
                        type:'middle',
                        icon:'phoenix-icon',
                    },
                    {
                        id:15,
                        name:'貔貅',
                        type:'middle',
                        icon:'pixiu-icon',
                    },
                    {
                        id:16,
                        name:'神龟',
                        type:'middle',
                        icon:'turtle-icon',
                    },
                    {
                        id:17,
                        name:'乾',
                        type:'inside',
                    },
                    {
                        id:18,
                        name:'坤',
                        type:'inside',
                    },
                ],
                selectedOption:{},

                hostOptionsList:[
                    {
                        outsideName:'亥猪',
                        middleName:'神龟',
                        insideName:'坤',
                        icon:'pig-icon',
                        resultText:'',
                        value:12
                    },
                    {
                        outsideName:'子鼠',
                        middleName:'神龟',
                        insideName:'乾',
                        icon:'mouse-icon',
                        resultText:'',
                        value:1
                    },
                    {
                        outsideName:'丑牛',
                        middleName:'神龟',
                        insideName:'坤',
                        icon:'pig-icon',
                        resultText:'',
                        value:2
                    },
                    {
                        outsideName:'寅虎',
                        middleName:'麒麟',
                        insideName:'乾',
                        icon:'tiger-icon',
                        resultText:'',
                        value:3
                    },
                    {
                        outsideName:'卯兔',
                        middleName:'麒麟',
                        insideName:'坤',
                        icon:'rabbit-icon',
                        resultText:'',
                        value:4
                    },
                    {
                        outsideName:'辰龙',
                        middleName:'麒麟',
                        insideName:'乾',
                        icon:'dragon-icon',
                        resultText:'',
                        value:5
                    },
                    {
                        outsideName:'巳蛇',
                        middleName:'凤凰',
                        insideName:'坤',
                        icon:'snake-icon',
                        resultText:'',
                        value:6
                    },
                    {
                        outsideName:'午马',
                        middleName:'凤凰',
                        insideName:'乾',
                        icon:'horse-icon',
                        resultText:'',
                        value:7
                    },
                    {
                        outsideName:'未羊',
                        middleName:'凤凰',
                        insideName:'坤',
                        icon:'sheep-icon',
                        resultText:'',
                        value:8
                    },
                    {
                        outsideName:'申猴',
                        middleName:'貔貅',
                        insideName:'乾',
                        icon:'monkey-icon',
                        resultText:'',
                        value:9
                    },
                    {
                        outsideName:'酉鸡',
                        middleName:'貔貅',
                        insideName:'坤',
                        icon:'chicken-icon',
                        resultText:'',
                        value:10
                    },
                    {
                        outsideName:'戍狗',
                        middleName:'貔貅',
                        insideName:'乾',
                        icon:'dog-icon',
                        resultText:'',
                        value:11
                    },
                ],
                presetList:[],
                curPreset:{},

                roomConfig:{
                    chipList:[],
                },
                deskInfo:{},
                deskCoinList:[],
                playerList:[],
                curPlayer:{user:{}},
                curHost:null,
                curBetInfo:{},
                rateConfig:{},
                selectedChip:0,
                hostList:[],
                timer:0,
                recordList:[],
                resultModalFlag:false,
                resultModalTimer:5,
                curResult:{},
                resultList:[],

                runningIndex:-1,
                runningCount:-1,
                long:0,
                speed:400,
                showResult:false,
                showResultClass:'',
                switchSession:false,

                originalPosition:{},
                containerPosition:{},
                centerPosition:{},
                coinList:[],
            }
        },
        methods: {
            getConfigData:function (type) {
                Vue.api.getGameConfigInfo({apiParams:{property:type}}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                      /*  console.log(type+':',data);*/
                        if(type=='赔率'){
                            data.forEach((item)=>{
                                switch (item.configName){
                                    case '生肖':
                                        this.rateConfig.outside=item.configValue;
                                        break;
                                    case '神兽':
                                        this.rateConfig.middle=item.configValue;
                                        break;
                                    case '天地':
                                        this.rateConfig.inside=item.configValue;
                                        break;
                                }
                            });
                        }else if(type.indexOf('房配置')){
                            data.forEach((item)=>{
                                this.roomConfig[item.configName]=item.configValue;
                            });
                            for(let i=1;i<=6;i++){
                                this.roomConfig.chipList.push(parseInt(this.roomConfig['筹码'+i]));
                            }
                            this.roomConfig.chipList.sort();
                        }
                    }
                });
            },
            exitRoom:function () {
                this.socketApi.sendSock({"api":"exitRoom","apiParams":{}});
                console.log('*********exitRoom*********');
            },
            gameRender:function (data) {
                this.deskInfo=data.deskInfoJSONObject;
                if(this.deskInfo.deskState=='countdown'){
                    for(let i=0;i<this.deskCoinList.length;i++){
                        let increment=this.deskInfo.currentRountJettonStatistics[i+1]-this.deskCoinList[i];
                        if(increment>0&&(!this.selectedOption||this.selectedOption.id!=i+1)){
                            this.originalPosition.increment=increment;
                            this.originalPosition.id=i+1;
                            this.putCoin(i+1,this.originalPosition)
                        }
                        this.deskCoinList[i]=this.deskInfo.currentRountJettonStatistics[i+1];
                    };
                }
                //
                this.playerList=data.playerInfoJSONArray;
                let temHostList=data.bankerSequenceJSONArray;
                this.timer=data.deskTimer;
                this.hostList=[];
                this.playerList.forEach((item,index)=>{
                    if(item.user.id==this.account.id){
                        this.curPlayer=item;
                    }
                    if(item.userId==this.deskInfo.currentBankerId){
                        this.curHost=item;
                    }

                    temHostList.forEach((hostItem)=>{
                        if(hostItem.userId==item.userId){
                            this.hostList.push(item);
                        }
                    });

                });
                //擂主更换时重置相关数据
                if(this.curHost.userId!=this.deskInfo.currentBankerId){
                    this.initData();
                }
                //
                if(this.curHost.userId==this.curPlayer.userId){
                    this.type='host';
                }else{
                    this.type='player';
                }
                this.curBetInfo= this.curPlayer.currentRountBetInfo;
                this.curPlayer.roundRecord.forEach((item)=>{
                    Object.assign(this.recordList[item.currentRount-1],item);
                });
                //
                if(this.deskInfo.deskState=='settlement'){
                    this.collectCoin();
                }
                //结算
                if(this.deskInfo.deskState=='betweenRound'){
                    //局号变换，说明新开奖，更新相关数据
                    if(this.curResult.round!=this.deskInfo.currentRount){
                        console.log('this.curResult.round:',this.curResult.round);
                        console.log('this.deskInfo.currentRount:',this.deskInfo.currentRount);
                        this.curResult=this.$options.filters.resultDict(this.curPlayer.roundRecord[this.curPlayer.roundRecord.length-1].result-1,'all');
                        this.curResult.round=this.deskInfo.currentRount;
                        this.runningIndex=-1;

                        this.resultList=[];
                        this.playerList.forEach((item,index)=>{
                            let curRoundResult=item.roundRecord.length>0?item.roundRecord[item.roundRecord.length-1]:{};
                            this.resultList.push({
                                ...item.user,
                                ...curRoundResult
                            });
                        });
                        console.log('this.resultList:',this.resultList);
                        this.runTurntable(this.curResult.value);
                    }
                }
               /* console.log('***状态:'+this.deskInfo.deskState+'**擂主:'+this.deskInfo.currentBankerId+'**计时:'+this.timer+'***');*/
                /*console.log('recordList:',this.recordList);*/
                /*   console.log('this.hostList:',this.hostList);*/
                /*    console.log('this.curHost:',this.curHost);*/
              /*  console.log('this.deskInfo:',this.deskInfo);*/
             /*   console.log('this.hostList:',this.hostList);*/
                /* console.log('this.curPlayer:',this.curPlayer);*/
            /*    console.log('test:',this.playerList);*/
            },
            setBet:function (item) {
                if(this.deskInfo.deskState=='countdown'){
                    if(!this.selectedChip){
                        Vue.operationFeedback({type:'warn',text:'请先选择筹码'});
                        return;
                    }
                    this.selectedOption=item;
                    this.socketApi.sendSock({"api":"gamble","apiParams":{kind:item.id,jetton:this.selectedChip}});
                }else{
                    Vue.operationFeedback({type:'warn',text:'现在还不能下注，请稍作等待'});
                }
            },
            setBetCallback:function () {
                this.putCoin(this.selectedOption.id);
            },
            applyToHost:function () {
                this.socketApi.sendSock({"api":"applyForBanker","apiParams":{}});
            },
            applyToHostCallback:function () {

            },
            selectChip:function (value) {
                this.selectedChip=value;
            },
            toPreset:function (item) {
                if(this.deskInfo.deskState!='bankerSetting'){
                    Vue.operationFeedback({type:'warn',text:'现在还不能设置竞猜结果'});
                    return;
                }
                this.curPreset=item;
            },
            selectPresetOption:function (item) {
                this.curPreset.value=item.value;
                this.curPreset.outsideName=item.outsideName;
                this.curPreset.middleName=item.middleName;
                this.curPreset.insideName=item.insideName;
            },
            savePreset:function () {
                if(this.deskInfo.deskState!='bankerSetting'){
                    Vue.operationFeedback({type:'warn',text:'现在还不能设置竞猜结果'});
                    return;
                }
                let list=[];
                this.presetList.forEach((item)=>{
                    if(item.value){
                        list.push({result:item.value});
                    }
                });
                if(list.length<6){
                    Vue.operationFeedback({type:'warn',text:'请设置好所有竞猜结果'});
                    return;
                }
                this.socketApi.sendSock({"api":"presetResult","apiParams":{presetResultJSONArrayString:list}});
            },

            initData:function () {
                this.curHost={ user:{}};
                this.presetList=[
                    {
                        title:'第一局',
                    },
                    {
                        title:'第二局',
                    }
                    ,
                    {
                        title:'第三局',
                    }
                    ,
                    {
                        title:'第四局',
                    }
                    ,
                    {
                        title:'第五局',
                    }
                    ,
                    {
                        title:'第六局',
                    }
                ];
                this.recordList=[{title:'第一局'},{title:'第二局'},{title:'第三局'},{title:'第四局'},{title:'第五局'},{title:'第六局'}];
            },
            runTurntable:function (value) {
                setTimeout(()=>{
                    if(this.runningCount==-1){
                        this.long=value-1+3*12;
                    }
                    this.runningCount++;
                    this.runningIndex=this.runningCount%12+1;
                    if(this.runningCount<this.long){
                        this.runTurntable();
                    }else{
                        this.runningCount=-1;
                        setTimeout(()=>{
                            this.showResult=true;
                            this.showResultClass='animated bounceIn';
                            this.initdeskCoinList();
                        },1000);
                        setTimeout(()=>{
                            this.showResult=false;
                            this.showResultClass='animated bounceOut';
                            this.resultModalFlag=true;
                            let resultModalTimerInterval=setInterval(()=>{
                                this.resultModalTimer--;
                                if(!this.resultModalTimer){
                                    this.resultModalFlag=false;
                                    this.resultModalTimer=5;
                                    clearInterval(resultModalTimerInterval);
                                }
                            },1000);
                        },7000);

                    }
                    if(this.runningCount>parseInt((1/12)*this.long)){
                        this.speed=100;
                    }if(this.runningCount>parseInt((11/12)*this.long)){
                        this.speed=300;
                    }else if(this.runningCount>=this.long){

                    }
                },this.speed);
            },
            getPosition:function (element) {
                var actualLeft=element.offsetLeft;
                var actualTop=element.offsetTop;
                var parent=element.offsetParent;
                while(parent!=null){
                    actualLeft+=parent.offsetLeft+(parent.offsetWidth-parent.clientWidth)/2;
                    actualTop+=parent.offsetTop+(parent.offsetHeight-parent.clientHeight)/2;
                    parent=parent.offsetParent;
                }
                return {x:actualLeft,y:actualTop};
            },
            putCoin:function (id,fromPositionObj) {
                let unit='px';
                //
                let fromPosition=null;
                if(fromPositionObj){
                    fromPosition=fromPositionObj;
                    id=fromPositionObj.id;
                }else{
                    fromPosition=this.getPosition(document.getElementsByClassName('selected')[0]);
                    fromPosition.x=fromPosition.x-this.containerPosition.x;
                    fromPosition.y=fromPosition.y-this.containerPosition.y;
                }

                //
                let topPosition=this.getPosition(document.getElementById('target-point-'+id));
                topPosition.x=topPosition.x-this.containerPosition.x;
                topPosition.y=topPosition.y-this.containerPosition.y;
                //
                let rMin=-25;
                let rMax=10;
                if(id>=17){
                    rMin=-15;
                    rMax=-5;
                }

                //
                let count=Math.ceil((fromPositionObj?fromPositionObj.increment:this.selectedChip)/this.roomConfig.chipList[0])*1;
                /*console.log('******count:'+count+'*****');*/
                for(let i=0;i<count;i++){
                    let xRandom=this.randomNum(rMin,rMax);
                    let yRandom=this.randomNum(rMin,rMax);
                    let delayRandom=this.randomNum(1,10);
                    let item={from:{transform:'translate('+fromPosition.x+unit+', '+fromPosition.y+unit+')'},to:{transform:'translate('+(topPosition.x+xRandom)+unit+', '+(topPosition.y+yRandom)+unit+')',opacity:1,transitionDelay:0.1*i+'s'},end:{transform:'translate('+(this.centerPosition.x-10)+unit+', '+(this.centerPosition.y-10)+unit+')',transitionDelay:0.05*delayRandom+'s',transitionDuration:'0.5s'}};
                    this.coinList.push(item);
                    setTimeout(()=>{
                        item.from=item.to;
                    },200);
                };
            },
            collectCoin:function () {
                this.coinList.forEach((item)=>{
                    item.from=item.end;
                });
                setTimeout(()=>{
                    this.coinList=[];
                },1500);
            },
            randomNum:function (minNum,maxNum) {
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
            },
            initdeskCoinList:function () {
                this.deskCoinList=[];
                for(let i=0;i<18;i++){
                    this.deskCoinList.push(0);
                }
            }
        },
        created (){
            //初始化数据
            this.initData();
        },
        mounted () {
            this.account=this.getAccountInfo();
          /*  console.log(' this.account:', this.account);*/
            //
            this.roomLevel=this.$route.query.roomLevel;
            if(this.$route.params.type){
                this.type=this.$route.params.type;
            }
            //
            this.getConfigData('赔率');
            this.getConfigData(this.roomLevel+'配置');
            //
            this.originalPosition={x:0,y:0};
            this.containerPosition=this.getPosition(document.getElementById('container'));
            this.centerPosition=this.getPosition(document.getElementById('inside-layer-point'));
            this.centerPosition.x=this.centerPosition.x-this.containerPosition.x;
            this.centerPosition.y=this.centerPosition.y-this.containerPosition.y;
            this.initdeskCoinList();
            //
            this.socketApi.setListener((e)=>{
                let resp=JSON.parse(e.data);
              /*  console.log('game:',resp);*/
               if(resp.respCode){
                   if(resp.respCode=='2000'){
                       let data={};
                       try{
                           data=JSON.parse(resp.respMsg);
                       }catch (err){

                       }
                       try{
                           data.data=JSON.parse(data.data);
                       }catch (err){

                       }
                       console.log('data:',data);
                       if(data.api=='applyForBanker'){
                          this.applyToHostCallback();
                       }else if(data.api=='gamble'){
                           this.setBetCallback();
                       }
                   }else{
                       Vue.operationFeedback({type:'warn',text:resp.respMsg});
                   }
                   console.log('gameHandle:',resp);
               }else if(resp.api=='deskFrame'){
                   let data=JSON.parse(resp.data);
                   this.gameRender(data);
                  /* console.log('data:',data);*/
               }
            });

            //临时测试
          /*  setTimeout(()=>{
                this.runTurntable(1);
            },2000)*/
          /*  let ele=document.getElementById('target-point-1');
            let position=this.getPosition(ele);
            let containerPosition=this.getPosition(document.getElementById('container'));
            console.log('position:',position);
            console.log('containerPosition:',containerPosition);
            console.log('test:',{x:position.x-containerPosition.x,y:position.y-containerPosition.y});*/
        },
        beforeRouteLeave(to,from,next){
            this.exitRoom();
            next();
        },
    }
</script>
