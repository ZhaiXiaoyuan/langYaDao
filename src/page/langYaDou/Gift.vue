<template>
    <div class="cm-page gift-type">
        <div class="tab-panel">
            <div class="tab-list">
                <ul>
                    <li class="active">礼物列表</li>
                </ul>
            </div>
            <div class="tab-content">
                <ul class="gift-type-list">
                    <li v-for="(item,index) in entryList" :key="index">
                        <img :src="basicConfig.imgBasicUrl+item.giftPic" alt="">
                        <p class="title">{{item.giftName}}</p>
                        <el-button class="handle-btn" type="primary" plain @click="openGiveModal(item)">赠送</el-button>
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

        <el-dialog class="give-modal" title="" :visible.sync="giveModalFlag"top="25vh" @close="closeGiveModal">
            <div class="modal-content" v-if="giveStep==1">
                <div class="modal-header"><span class="title-label">赠送礼物</span></div>
                <div class="modal-body">
                    <el-form ref="form" :model="form" class="form" label-width="70px">
                        <el-form-item label="受赠人：">
                            <el-input v-model="form.keyword" class="input-item" placeholder="输入受赠人ID或手机号码"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="modal-footer">
                    <el-button type="primary" @click="getUserInfo()">搜索用户</el-button>
                </div>
            </div>
            <div class="modal-content" v-if="giveStep==2">
                <div class="modal-body">
                    <div class="user-info-block">
                        <img :src="form.targetUser.headPic?basicConfig.imgBasicUrl+form.targetUser.headPic:defaultAvatar"alt="">
                        <div class="text-info">
                            <p>{{form.targetUser.name}}</p>
                            <p>ID:{{form.targetUser.id}}</p>
                        </div>
                    </div>
                    <el-form ref="form" :model="form" class="form" label-width="60px">
                        <el-form-item label="数量：">
                            <el-input-number v-model="form.count" :min="1" :max="1000" label=""></el-input-number>
                        </el-form-item>
                        <el-form-item label="消耗：">
                           <span class="num">{{coinCount}}</span><span>琅琊豆</span>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="modal-footer">
                    <el-button class="handle-btn" plain @click="setGiveStep(1)">重新搜索</el-button>
                    <el-button class="handle-btn" type="primary" @click="giveGift()">确定</el-button>
                </div>
            </div>
            <div class="modal-content" v-if="giveStep==3">
                <div class="modal-body">
                    <div class="status-block">
                        <i class="icon fail-icon"></i>
                        <p class="tips">对不起，保险箱余额不足，赠送礼物失败!</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <el-button class="handle-btn" type="primary" @click="closeGiveModal()">确定</el-button>
                </div>
            </div>
            <div class="modal-content" v-if="giveStep==4">
                <div class="modal-body">
                    <div class="status-block">
                        <i class="icon success-icon"></i>
                        <p class="tips">赠送成功！</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <el-button class="handle-btn" type="primary" @click="closeGiveModal()">确定</el-button>
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
        data: function(){
            return {
                defaultAvatar:require('../../images/common/default-avatar.png'),
                account:{},
                pager:{
                    pageIndex:1,
                    pageSize:20,
                    total:0,
                    loading:false
                },
                entryList:[],
                selectedEntry:{},

                giveModalFlag:false,
                giveStep:1,
                form:{keyword:'',count:1},
            }
        },
        computed: {
            coinCount() {
                return this.selectedEntry.langyaCoin*this.form.count;
            }
        },
        methods: {
            getList:function (pageIndex) {
                this.pager.pageIndex=pageIndex?pageIndex:1;
                let params={
                    pageIndex:this.pager.pageIndex,
                    pageSize:this.pager.pageSize,
                }
                this.pager.loading=true;
                Vue.api.getGiftList({apiParams:params}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        let list=typeof data.giftList=='string'?JSON.parse(data.giftList):data.giftList;
                        this.entryList=list;
                        this.pager.total=data.count;
                    }
                    this.pager.loading=false;
                });
            },
            getUserInfo:function () {
                if(this.form.keyword==this.account.id||this.form.keyword==this.account.phone){
                    Vue.operationFeedback({type:'warn',text:'不能给自己赠送礼物'});
                    return;
                }
                if(!this.form.keyword){
                    Vue.operationFeedback({type:'warn',text:'请输入受赠人ID或手机号码'});
                    return;
                }
                Vue.api.getUserInfo({apiParams:{id:this.form.keyword,type:this.form.keyword.length>10?'phone':'uuid'}}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.form.targetUser=data.user;
                        this.setGiveStep(2);
                    }else{
                        Vue.operationFeedback({type:'warn',text:resp.respMsg});
                    }
                });
            },
            openGiveModal:function (item) {
                this.selectedEntry=item;
                console.log('test:',this.selectedEntry);
                this.giveModalFlag=true;
                this.setGiveStep(1);
            },
            closeGiveModal:function () {
                this.giveModalFlag=false;
                this.form={keyword:'',count:1};
                this.selectedEntry={};
            },
            setGiveStep:function (value) {
                this.giveStep=value;
                if(value==1){
                    this.form.keyword='';
                }else if(value==2){
                    this.form.count=1;
                }
            },
            giveGift:function () {
                if(!regex.pInt.test(this.form.count+'')){
                    Vue.operationFeedback({type:'warn',text:'数量有误，'+regex.pIntAlert});
                    return;
                }
                console.log('test:',this.form);
                let params={
                    giftId:this.selectedEntry.id,
                    count:this.form.count,
                    buyer:this.account.id,
                    gainer:this.form.targetUser.id,
                }
                Vue.api.addGiftMessage({apiParams:params}).then((resp)=>{
                    if(resp.respCode=='2000'){
                       this.setGiveStep(4);
                    }else{
                        this.setGiveStep(3);
                    }
                });
            }
        },
        mounted () {
            //
            this.account=this.getAccountInfo();
            console.log('account:',this.account);
            //
            this.getList();
        },
    }
</script>
