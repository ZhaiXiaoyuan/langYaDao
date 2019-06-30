<template>
    <div class="cm-page safe-box">
        <div class="balance-panel">
            <div class="balance-item total-balance-item">
                <p class="title">总资产：</p>
                <p class="value"><span class="num">{{account.balance+account.safeBoxBalance}}</span><span class="unit">游戏币</span></p>
            </div>
            <div class="items-wrap">
                <div class="balance-item liquidity-balance-item">
                    <p class="title">流动余额：</p>
                    <p class="value"><span class="num">{{account.balance}}</span><span class="unit">游戏币</span></p>
                    <div class="handle">
                        <router-link tag="span" :to="{ path: '/center/coin/charge'}" class="cm-btn btn">充值</router-link>
                    </div>
                </div>
                <div class="balance-item safety-balance-item">
                    <p class="title">保险箱余额：</p>
                    <p class="value"><span class="num">{{account.safeBoxBalance}}</span><span class="unit">游戏币</span></p>
                    <div class="handle">
                        <span class="cm-btn btn solid-btn" @click="openConvertModal('in')">从余额转入</span>
                        <span class="cm-btn btn" @click="openConvertModal('out')">转出到余额</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-panel">
            <div class="tab-list">
                <ul>
                    <li class="active">我的礼物</li>
                </ul>
            </div>
            <div class="filter">
                <div class="type-list">
                    <span>查看：</span>
                    <ul>
                        <li class="cm-btn" :class="{'active':state==''}" @click="setState('')">全部</li>
                        <li class="cm-btn" :class="{'active':state=='notExchanged'}" @click="setState('notExchanged')">未兑换</li>
                        <li class="cm-btn" :class="{'active':state=='exchanged'}" @click="setState('exchanged')">已兑换</li>
                    </ul>
                </div>
                <span class="cm-btn all-btn" @click="exchange()">一键兑换全部</span>
            </div>
            <div class="tab-content">
                <ul class="gift-list">
                    <li v-for="(item,index) in entryList" :class="{'disabled':item.giftMessage.state!='notExchanged'}">
                        <div class="cover"><img :src="basicConfig.imgBasicUrl+item.giftPic" alt=""></div>
                        <div class="info">
                            <p class="title-row"><span>{{item.giftName}}</span><span class="count">x{{item.giftMessage.count}}</span></p>
                            <p class="info-row">赠送人：{{item.buyerName}}（ID{{item.giftMessage.buyer}}）</p>
                            <p class="info-row">赠送事件编号：{{item.giftMessage.id}}</p>
                            <p class="info-row">赠送时间：{{item.giftMessage.createdAt|formatDate('yyyy-MM-dd hh:mm')}}</p>
                        </div>
                        <div class="handle">
                            <el-button class="exchange-btn" type="primary" plain @click="exchange(item)">兑换</el-button>
                            <div class="status">
                                <p>已兑换</p>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="cm-pagination-box">
                    <el-pagination
                        @current-change ="getList"
                        layout="prev, pager, next"
                        :page-size="pager.pageSize"
                        :total="pager.total">
                    </el-pagination>
                </div>
            </div>
        </div>

        <el-dialog class="coin-convert-modal" title="" :visible.sync="coinConvertModalFlag"top="10vh" :modal-append-to-body="false">
            <div class="modal-body">
                <el-form ref="form" :model="form" label-width="90px" v-if="convertModalType=='in'">
                    <el-form-item label="流动余额：">
                        <span class="num">{{account.balance}}</span><span>游戏币</span>
                    </el-form-item>
                    <el-form-item label="转入数额：">
                        <el-input v-model="form.count" class="input-item" @blur="blurAdjust($event)"></el-input><span>游戏币</span>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="form" label-width="100px" v-if="convertModalType=='out'">
                    <el-form-item label="保险箱余额：">
                        <span class="num">{{account.safeBoxBalance}}</span><span>游戏币</span>
                    </el-form-item>
                    <el-form-item label="转入数额：">
                        <el-input v-model="form.count" class="input-item" @blur="blurAdjust($event)"></el-input><span>游戏币</span>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeConvertModal()">取 消</el-button>
                <el-button type="primary" @click="convert()">确定转入</el-button>
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
        data: function(){
            return {
                account:{},
                state:'',//notExchanged:未兑换,exchanged:已兑换
                pager:{
                    pageIndex:1,
                    pageSize:10,
                    total:0,
                    loading:false
                },
                entryList:[],
                unreadList:[],

                coinConvertModalFlag:false,
                convertModalType:'',//in,out
                form:{
                    count:''
                },
                scrollWin:document.getElementById('page-content'),
                scrollPage:document.getElementsByClassName('center')[0],
            }
        },
        methods: {
            getUserInfo:function () {
                Vue.api.getUserInfo({apiParams:{id:this.account.id,type:'id'}}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.account={...this.account,...data.user};
                        console.log('this.account:',this.account);
                    }
                });
            },
            getList:function (pageIndex) {
                this.pager.pageIndex=pageIndex?pageIndex:1;
                let params={
                    userId:this.account.id,
                    state:this.state,
                    userType:'gainer',
                    pageIndex:this.pager.pageIndex,
                    pageSize:this.pager.pageSize,
                    readState:'',
                }
                this.pager.loading=true;
                Vue.api.getGiftMessageList({apiParams:params}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        let list=typeof data.giftMessageList=='string'?JSON.parse(data.giftMessageList):data.giftMessageList;
                        this.entryList=list;
                        this.pager.total=data.count;
                        //
                        this.unreadList=[];
                        this.entryList.forEach((item,index)=>{
                            if(item.giftMessage.readState=='notRead'){
                                this.unreadList.push({id:item.giftMessage.id});
                            }
                        });
                        if(this.unreadList.length>0){
                            Vue.api.readGiftMessageInBatch({apiParams:{idArray:this.unreadList}}).then((resp)=>{
                                if(resp.respCode=='2000'){

                                }
                            });
                        }
                    }
                    this.pager.loading=false;
                });
            },
            openConvertModal:function (type) {
                this.convertModalType=type;
                this.coinConvertModalFlag=true;
            },
            closeConvertModal:function () {
                this.coinConvertModalFlag=false;
                this.form={
                    count:''
                }
            },
            convert:function () {
                if(!this.form.count||!regex.pInt.test(this.form.count)){
                    Vue.operationFeedback({type:'warn',text:'数额有误，'+regex.pIntAlert});
                    return;
                }
                let params={
                    id:this.account.id,
                    direction:this.convertModalType=='in'?'balanceToSafeBox':'safeBoxToBalance',
                    amount:this.form.count,
                }
                let fb=Vue.operationFeedback({text:'操作中...'});
                Vue.api.transformUserBalance({apiParams:params}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.closeConvertModal();
                        this.getUserInfo();
                        fb.setOptions({type:"complete",text:'操作成功'});
                    }else{
                        fb.setOptions({type:"warn",text:resp.respMsg});
                    }
                });
            },
            exchange:function (item) {
                let list=[];
                if(item){
                    this.$confirm('确定将\"'+item.giftName+'×'+item.giftMessage.count+'\"兑换为游戏币？兑换得到的游戏币将自动转入保险箱内。', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info '
                    }).then(() => {
                        list.push({id:item.giftMessage.id});
                        this.exchangeGiftInBatch(list);
                    }).catch(() => {

                    });
                }else{
                    let params={
                        userId:this.account.id,
                        state:'notExchanged',
                        userType:'gainer',
                        pageIndex:1,
                        pageSize:200,
                    }
                    Vue.api.getGiftMessageList({apiParams:params}).then((resp)=>{
                        if(resp.respCode=='2000'){
                            let data=JSON.parse(resp.respMsg);
                            let giftList=typeof data.giftMessageList=='string'?JSON.parse(data.giftMessageList):data.giftMessageList;
                            if(giftList.length>0){
                                this.$confirm('确定将全部礼物兑换为游戏币？兑换得到的游戏币将自动转入保险箱内。', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'info '
                                }).then(() => {
                                    giftList.forEach((item)=>{
                                        list.push({id:item.giftMessage.id});
                                    });
                                    this.exchangeGiftInBatch(list);
                                }).catch(() => {

                                });
                            }else{
                                Vue.operationFeedback({type:'warn',text:'您没有可以兑换的礼物'});
                            }
                        }else{

                        }
                    });
                }
            },
            exchangeGiftInBatch:function (list) {
                let fb=Vue.operationFeedback({text:'兑换中...'});
                Vue.api.exchangeGiftMessageInBatch({apiParams:{idArray:list}}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        fb.setOptions({type:"complete",text:'兑换成功'});
                        this.getList();
                    }else{
                        fb.setOptions({type:"warn",text:resp.respMsg});
                    }
                });
            },
            setState:function (value) {
                this.state=value;
                this.getList();
            }
        },
        mounted () {
            //
            this.account=this.getAccountInfo();
            //
            this.getUserInfo();
            this.getList();
        },
        beforeRouteEnter(to,from,next){
            Vue.routeCheck(to,from,next)
        },
    }
</script>
