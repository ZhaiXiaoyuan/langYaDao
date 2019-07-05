<template>
    <div class="cm-page manor-game" :class="{'pc-page':!version.mobile&&displayType!='modal'}">
        <div class="cm-btn cm-scale-btn return-btn" @click="back()"></div>
        <i class="icon manor-logo-icon"></i>


        <div class="display-panel" v-if="displayFlag&&curAnimal">
            <div class="panel-bd">
                <div class="egg-block" :class="[curAnimal.animalId,curAnimal.hasEgg=='true'?'has':'']">
                    <div class="block-bd">
                        <i class="icon container-icon"></i>
                        <i class="icon outside-light-icon"></i>
                        <i class="icon inside-light-icon"></i>
                        <i class="icon egg-icon" @click="sellEgg()"></i>
                    </div>
                </div>
                <div class="animal-block" :class="{'active':curAnimal}">
                    <div class="block-bd">
                        <!--start:gif资源加载-->
                      <!--  <i class="animal bronze-turtle-animal resources-to-load"></i>-->
                        <!--end:gif资源加载-->
                        <i class="icon white-light-icon" v-if="curAnimal"></i>
                        <i class="icon red-light-icon" v-if="curAnimal"></i>
                        <div class="animal-box">
                            <i class="animal" :class="[curAnimal.animalId+'-'+curAnimal.animalName+'-animal',animalPost]"></i>
                        </div>
                        <i class="icon tree-icon left-tree"></i>
                        <i class="icon tree-icon right-tree"></i>
                        <div class="floor"></div>
                    </div>
                </div>
                <div class="tool-block">
                    <div class="cm-btn handle-btn feed-btn" :class="{'cm-disabled':!curAnimal}" @click="openDialogModal('feed')"></div>
                    <div class="cm-btn handle-btn sell-btn" :class="{'cm-disabled':!curAnimal}" @click="openDialogModal('sell')"></div>
                </div>
            </div>
        </div>

        <div class="level-modal" v-if="levelModalFlag">
            <div class="modal-body">
                <ul class="level-list">
                    <li v-for="(item,index) in levelList" :key="index" @click="selectLevel(item)">
                        <p>神兽：{{item.langyaCoinPrice|numFormat}}币</p>
                        <p>收成：<span class="strong">{{item.eggPrice|numFormat}}</span>币</p>
                    </li>
                </ul>
                <div class="rule-block">
                    <div class="block-bd">
                        领养神兽需向平台支付相应价值的游戏币，当不希望继续喂养领养的神兽时，平台将按原价值向玩家回购改神兽，喂养神兽饲料24小时后，神兽将会产蛋，平台会根据不同等级收成蛋的价值向玩家收购。
                    </div>
                </div>
            </div>
        </div>
        <div class="select-animal-modal" v-if="selectAnimalModalFlag">
            <div class="modal-content">
                <div class="modal-header">
                    <p class="title">请选择要领养的神兽</p>
                    <p class="info">（{{curLevel.name}}别&nbsp;&nbsp;价值{{curLevel.langyaCoinPrice|numFormat}}游戏币）</p>
                </div>
                <div class="modal-body">
                    <ul class="item-list">
                        <li v-for="(item,index) in animalList" :key="index">
                            <div class="item-hd">
                                <i class="icon name-icon" :class="item.type+'-name-icon'"></i>
                            </div>
                            <div class="item-bd">
                                <div class="pic-box">
                                    <i class="icon animal-icon" :class="item.type+'-icon '+curLevel.level+'-'+item.type+'-icon'"></i>
                                </div>
                                <div class="handle-btn" @click="openDialogModal('adopt',1,{selectedAnimal:item})"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <el-dialog custom-class="dialog-modal" :visible.sync="dialogModalFlag" center :modal-append-to-body="false" top="30vh">
            <div class="modal-content" v-if="dialogModalType=='adopt'">
                <div class="modal-header">
                    <span class="icon adopt-title-icon title"></span>
                    <span class="cm-btn close-btn" @click="closeDialogModal()"></span>
                </div>
                <div class="modal-body">
                    <div v-if="dialogModalStep==1">
                        <p class="text">
                            确定支付<span class="strong">{{curLevel.langyaCoinPrice}}游戏币</span>领养{{curLevel.name}}{{selectedAnimal.name}}神兽？
                        </p>
                    </div>
                    <div v-if="dialogModalStep==2">
                        <i class="icon tips-icon fail-icon"></i>
                        <p class="text">对不起，您的流动余额不足。</p>
                        <p class="text">领养失败!</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <span class="cm-btn handle-btn cancel-btn" @click="closeDialogModal()" v-if="dialogModalStep==1"></span>
                    <span class="cm-btn handle-btn ok-btn" @click="buyAnimal()" v-if="dialogModalStep==1"></span>
                    <span class="cm-btn handle-btn ok-btn" @click="closeDialogModal()" v-if="dialogModalStep==2"></span>
                </div>
            </div>
            <div class="modal-content" v-if="dialogModalType=='feed'">
                <div class="modal-header">
                    <span class="icon adopt-title-icon title"></span>
                    <span class="cm-btn close-btn" @click="closeDialogModal()"></span>
                </div>
                <div class="modal-body">
                    <div>
                        <p class="text">
                            确定向神兽喂养该饲料吗？
                        </p>
                        <p class="tips">喂养饲料后神兽将进入产蛋期，24小时后可获得产蛋收成。</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <span class="cm-btn handle-btn cancel-btn" @click="closeDialogModal()"></span>
                    <span class="cm-btn handle-btn ok-btn" @click="feedAnimal()"></span>
                </div>
            </div>
            <div class="modal-content" v-if="dialogModalType=='sell'&&curAnimal">
                <div class="modal-header">
                    <span class="icon sell-title-icon title"></span>
                    <span class="cm-btn close-btn" @click="closeDialogModal()"></span>
                </div>
                <div class="modal-body">
                    <div v-if="dialogModalStep==1">
                        <p class="text">
                            确定卖出该神兽吗？
                        </p>
                        <div class="animal-info">
                            <div class="pic-box">
                                <i class="icon animal-icon" :class="curAnimal.animalName+'-icon '+curAnimal.animalId+'-'+curAnimal.animalName+'-icon'"></i>
                            </div>
                            <p class="price">（售价<span class="strong">{{findPrice(curAnimal.animalId)}}</span>游戏币）</p>
                        </div>
                    </div>
                    <div v-if="dialogModalStep==2">
                        <i class="icon tips-icon fail-icon"></i>
                        <p class="text">{{dialogModalTips}}。</p>
                        <p class="text">卖出失败!</p>
                    </div>
                    <div v-if="dialogModalStep==3">
                        <i class="icon tips-icon success-icon"></i>
                        <p class="text">卖出成功，{{findPrice(curAnimal.animalId)}}游戏币已到账流动余额。</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <span class="cm-btn handle-btn cancel-btn" @click="closeDialogModal()" v-if="dialogModalStep==1"></span>
                    <span class="cm-btn handle-btn ok-btn" @click="sellAnimal()" v-if="dialogModalStep==1"></span>
                    <span class="cm-btn handle-btn ok-btn" @click="closeDialogModal()" v-if="dialogModalStep==2||dialogModalStep==3"></span>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<style lang="less" rel="stylesheet/less">

</style>
<script>
    import Vue from 'vue'

    export default {
        components:{

        },
        props:{
            options:{
              closeCallback:null,
            }
        },
        data: function(){
            return {
                displayType:'',//modal
                justEntry:false,
                account:{},
                levelModalFlag:false,
                displayFlag:false,
                levelList:[],
                curLevel:null,
                selectAnimalModalFlag:false,
                animalList:[{type:'turtle',name:'神龟'},{type:'pixiu',name:'貔貅'},{type:'kirin',name:'麒麟'},{type:'phoenix',name:'凤凰'}],
                selectedAnimal:null,
                curAnimal:null,
                postCounter:0,
                animalPost:'right',//left,right

                dialogModalFlag:false,
                dialogModalType:'',//adopt、tips、feed、sell
                dialogModalStep:1,
                dialogModalTips:'',
                version:Vue.tools.browserVersions(),
                monitorInterval:null,
            }
        },
        methods: {
            getUserAnimalInfo:function () {
                Vue.api.getUserAnimalInfo({apiParams:{userId:this.account.id}}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.curAnimal=data;
                        this.displayFlag=true;
                        if(this.postCounter==0){
                            this.setAnimalPost();
                        }
                    }else if(resp.respCode=='4007'){
                        if(!this.dialogModalFlag&&this.dialogModalType!='sell'){
                            this.curAnimal=null;
                        }
                        this.postCounter=0;
                        this.displayFlag=false;
                        if(!this.justEntry){
                            this.justEntry=true;
                            this.openSelectLevelModal();
                        }
                    }
                });
            },
            animalMonitor:function () {
                this.monitorInterval=setInterval(()=>{
                        this.getUserAnimalInfo();
                    },3000);
            },
            getLevelList:function () {
                Vue.api.getAnimalLevelList({apiParams:{}}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        let list=data.animalList;
                        let bronze=null;
                        let silver=null;
                        let gold=null;
                        let diamond=null;
                        list.forEach((item,i)=>{
                            if(item.id=='bronze'){
                                bronze=item;
                            }else if(item.id=='silver'){
                                silver=item;
                            }else if(item.id=='gold'){
                                gold=item;
                            }else if(item.id=='diamond'){
                                diamond=item;
                            }
                        });
                        this.levelList=[bronze,silver,gold,diamond];
                        console.log('this.levelList:',this.levelList);
                      /*  //临时测试
                        this.selectLevel(this.levelList[0]);*/
                    }
                });
            },
            openSelectLevelModal:function () {
                this.levelModalFlag=true;
            },
            closeSelectLevelModal:function () {
                this.levelModalFlag=false;
            },
            selectLevel:function (item) {
                this.curLevel=item;
                this.closeSelectLevelModal();
                this.openSelectAnimalModal();
            },
            openSelectAnimalModal:function () {
                this.selectAnimalModalFlag=true;
            },
            closeSelectAnimalModal:function () {
                this.selectAnimalModalFlag=false;
            },
            buyAnimal:function () {
                let params={
                    userId:this.account.id,
                    animalId:this.curLevel.level,
                    animalName:this.selectedAnimal.type
                };
              /*  let fb=Vue.operationFeedback({text:'操作中...'});*/
                Vue.api.addUserAnimal({apiParams:params}).then((resp)=>{
                    if(resp.respCode=='2000'){
                       /* fb.setOptions({type:'complete',text:'领养成功'});*/
                        Vue.operationFeedback({type:'complete',text:'领养成功'});
                        this.closeSelectAnimalModal();
                        this.closeDialogModal();
                        this.closeSelectLevelModal();
                    }else{
                        this.setDialogModalStep(2);
                       /* fb.setOptions({type:'warn',text:'领养失败，'+resp.respMsg});*/
                    }
                });
            },
            sellAnimal:function () {
                let params={
                    userId:this.account.id,
                };
                Vue.api.removeUserAnimal({apiParams:params}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.justEntry=false;
                        this.setDialogModalStep(3);
                    }else if(resp.respCode=='4001'){
                        this.dialogModalTips=resp.respMsg;
                        this.setDialogModalStep(2);
                    }
                });
            },
            feedAnimal:function (item) {
                let params={
                    userId:this.account.id,
                };
                let fb=Vue.operationFeedback({text:'操作中...'});
                Vue.api.feedUserAnimal({apiParams:params}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        fb.setOptions({type:'complete',text:'喂养成功'});
                        this.closeDialogModal();
                    }else{
                        fb.setOptions({type:'warn',text:'喂养失败，'+resp.respMsg});
                    }
                });
            },
            setAnimalPost:function () {
                let mValue=this.postCounter%2;
                switch (mValue){
                    case 0:
                        this.animalPost='right';
                        break;
                    case 1:
                        this.animalPost='left';
                        break;
                }
                this.postCounter++;
                setTimeout(()=>{
                    this.setAnimalPost();
                },10000)
            },
            sellEgg:function () {
                let params={
                    userId:this.account.id,
                };
                let fb=Vue.operationFeedback({text:'操作中...'});
                Vue.api.sellEgg({apiParams:params}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.curAnimal.hasEgg='false';
                        fb.setOptions({type:'complete',text:'售卖成功'});
                    }else{
                        fb.setOptions({type:'warn',text:'售卖失败，'+resp.respMsg});
                    }
                });
            },
            openDialogModal:function (type,step,options) {
                this.dialogModalType=type;
                this.dialogModalStep=step?step:1;
                this.dialogModalFlag=true;
                if(options&&options.selectedAnimal){
                    this.selectedAnimal=options.selectedAnimal;
                }
            },
            closeDialogModal:function () {
                this.dialogModalFlag=false;
            },
            setDialogModalStep:function (value) {
                this.dialogModalStep=value;
            },
            findPrice:function (type) {
                let price=this.levelList.find((item,i)=>{
                    return type==item.level;
                }).langyaCoinPrice;
                return price;
            },
            back:function () {
                this.options&&this.options.closeCallback&&this.options.closeCallback();
                this.$router.go(-1);
            }
        },
        created(){

        },
        mounted () {
            if(this.$route.params.displayType){
                this.displayType=this.$route.params.displayType
            }
            console.log('this.displayType:',this.displayType);
            //
            this.account=this.getAccountInfo();
            //
            if(this.account.id){
                this.getUserAnimalInfo();
                this.animalMonitor();
            }
            //
            this.getLevelList();
        },
        beforeRouteEnter(to,from,next){
            document.getElementById('footer').style.display='none';
            Vue.routeCheck(to,from,next);
        },
        beforeRouteLeave(to,from,next){
            clearInterval(this.monitorInterval);
            if(this.displayType!='modal'){
                document.getElementById('footer').style.display='block';
            }
            next();
        },
    }
</script>
