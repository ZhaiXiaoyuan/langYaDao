<template>
    <div class="header" id="header" :class="{'active':showMenu}">
        <div class="cm-container header-content">
            <i class="icon logo-icon"></i>
            <ul class="nav-list">
                <li class="cm-btn" @click="go('home')" :class="{'active':page=='home'}"><span>琅琊岛</span></li>
               <!-- <li class="cm-btn"><span>琅琊谷</span></li>
                <li class="cm-btn"><span>琅琊村</span></li>
                <li class="cm-btn"><span>琅琊秀</span></li>-->
            </ul>
            <div class="fun-nav-list">
                <li :class="{'active':page=='vipStore'}" class="vip-link">
                    <router-link tag="i" :to="{ path: '/center/vip/vipStore'}" class="icon vip-icon"></router-link>
                </li>
                <router-link tag="li" :to="{ path: '/center/coin/charge'}" :class="{'active':page=='charge'}"><span>充值中心</span></router-link>
                <li :class="{'new':msg.giftMessage}">
                    <span @click="msgBlockFlag=!msgBlockFlag">消息</span>
                    <div class="msg-block" v-if="msgBlockFlag&&msg.giftMessage" @click="goToMsgDetail()">
                        您收到来自{{msg.buyerName}}（{{msg.giftMessage.buyer}}）的礼物 {{msg.giftName}}×{{msg.giftMessage.count}} ，点击消息到我的礼物查收
                    </div>
                </li>
                <li v-if="!account.id"><span class="cm-btn" @click="registerModal({open:true})">注册</span><span class="gap">/</span><span class="cm-btn" @click="loginModal({open:true})">登录</span></li>
                <li class="account-info" v-if="account.id">
                    <div class="wrap">
                        <img :src="account.headPic?basicConfig.imgBasicUrl+account.headPic:defaultAvatar" alt="">
                        <router-link tag="span" :to="{ path: '/center/user/userInfo'}" >{{account.name}}</router-link>
                        <span class="cmb-tn logout-btn" @click="logout()">退出</span>
                    </div>
                </li>
            </div>
        </div>
        <voice-switch></voice-switch>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    .header{
        position: fixed;
        z-index: 500;
        top:0px;
        left: 0px;
        height: 60px;
        width: 100%;
        background: #fff;
        transition: top 0.8s;
      /*  overflow: hidden;*/
        .header-content{
            position: relative;
            z-index: 200;
            height: 100%;
        }
        .logo-icon{
            position: absolute;
            top:0px;
            left: 0px;
            bottom: 0px;
            margin: auto;
        }
        .nav-list{
            margin-left: 190px;
            position: relative;
            z-index: 200;
            display: inline-block;
            height: 100%;
            li{
                display: inline-block;
                height: 100%;
                line-height: 60px;
                font-size: 16px;
                color: #000;
                span{
                    padding: 20px 15px;
                }
                &.active{
                    color: #fff;
                    background: url("../../images/common/nav-active-icon.png") no-repeat center;
                }
            }
        }
        .fun-nav-list{
            position: relative;
            float: right;
            display: inline-block;
            height: 100%;
            >li{
                display: inline-block;
                height: 100%;
                line-height: 60px;
                margin-left: 12px;
                font-size: 14px;
                color: #000;
                cursor: pointer;
                padding: 0px 13px;
                user-select: none;
                .gap{}
                &.new{
                    position: relative;
                    >span{
                        position: relative;
                        &:before{
                            content: '';
                            position: absolute;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background: #ff0000;
                            top:-2px;
                            right: -7px;
                        }
                    }
                }
                &.active{
                    color: #fff;
                    background: url("../../images/common/nav-active-md-icon.png") no-repeat center;
                    background-size: 100% 48%;
                }
                &.vip-link{
                    &.active{
                        color: #fff;
                        background: url("../../images/common/vip-nav-active-icon.png") no-repeat center;
                        background-size: 100% 48%;
                        .vip-icon{
                            background: url("../../images/common/vip-active-icon.png") no-repeat;
                        }
                    }
                }
                &.account-info{
                    .wrap{
                        position: relative;
                        width: 100%;
                        height: 100%;
                        padding-left: 45px;
                    }
                    img{
                        position: absolute;
                        width: 40px;
                        height: 40px;
                        top:0px;
                        left: 0px;
                        bottom: 0px;
                        margin: auto;
                    }
                    .logout-btn{
                        margin-left: 5px;
                        text-decoration: underline;
                    }
                }
            }
            &:before{
                position: absolute;
                width: 1px;
                height: 20px;
                content: '';
                background: #e3e3e3;
                top:0px;
                bottom: 0px;
                left: 0px;
                margin: auto;
            }
        }
        .msg-block{
            position: absolute;
            top: 37px;
            left: -128px;
            z-index: 1000;
            background: url("../../images/common/msg-block-bg.png") no-repeat;
            width: 300px;
            height: 65px;
            background-size: 100%;
            line-height: normal;
            font-size: 12px;
            color: #666;
            padding: 17px 15px 10px 15px;
            line-height: 18px;
        }
    }
</style>
<script>
    import Vue from 'vue'
    import bus from '../common/bus';
    export default {
        data() {
            return {
                page:'home',
                collapse: false,
                name: 'linxin',
                account:{},
                showMenu:false,
                defaultAvatar:require('../../images/common/default-avatar.png'),
                msgBlockFlag:false,
                entryList:[],
                msg:{},
                getMsgInterval:null,
            }
        },
        watch:{
            '$route': function(to, from) {
                this.page=this.$route.name;
            },
        },
        methods:{
            go:function (page) {
                this.showMenu=false;
                this.$router.push({name:page});
            },
            logout:function () {
                this.$cookie.set('account','');
                bus.$emit('refreshAccount');
                this.$cookie.set('safeAccount','');
                bus.$emit('refreshSafeAccount');
                this.account={};
                Vue.operationFeedback({type:'complete',text:'退出成功'});
                this.$router.push({name:'home'})
            },
            getList:function () {
                let params={
                    userId:this.account.id,
                    state:'notExchanged',
                    userType:'gainer',
                    pageIndex:1,
                    pageSize:1,
                    readState:'notRead'
                }
                Vue.api.getGiftMessageList({apiParams:params}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        let list=typeof data.giftMessageList=='string'?JSON.parse(data.giftMessageList):data.giftMessageList;
                        if(list.length>0){
                            this.msg=list[0];
                        }else{
                            this.msg={};
                        }
                    }
                });
            },
            goToMsgDetail:function () {
                this.msgBlockFlag=false;
                this.$router.push({name:'safeBox'});
            }
        },
        created(){
            //
            this.account=Vue.getAccountInfo();
            //
            this.page=this.$route.name;
            //
            /*刷新用户信息*/
            bus.$on('refreshAccount', () => {
                this.account=Vue.getAccountInfo();
                clearInterval(this.getMsgInterval);
                if(this.account.id&&!this.getMsgInterval){
                    this.getMsgInterval=setInterval(()=>{
                        this.getList();
                    },5000);
                }
            });
            if(this.account.id){
                clearInterval(this.getMsgInterval);
                this.getMsgInterval=setInterval(()=>{
                    this.getList();
                },10000);
            }
        },
        beforeDestroy:function () {
            clearInterval(this.getMsgInterval);
        }
    }
</script>
