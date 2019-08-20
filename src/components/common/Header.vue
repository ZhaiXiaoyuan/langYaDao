<template>
    <div class="header" id="header" :class="{'active':showMenu,'inactive':!showMenu}">
        <div class="cm-container header-content">
            <i class="icon logo-icon" @click="go({name:'home'})"></i>
            <div class="nav-panel">
                <div class="panel-bd">
                    <ul class="nav-list">
                       <!-- <li class="cm-btn" @click="go({name:'home'})" :class="{'active':page=='home'}"><span>首页</span></li>-->
                     <!--   <li class="cm-btn"><span>琅琊谷</span></li>
                        <li class="cm-btn"><span>琅琊村</span></li>
                        <li class="cm-btn"><span>琅琊秀</span></li>-->
                    </ul>
                    <div class="fun-nav-list">
                        <li :class="{'active':page=='vipStore'}" class="vip-link" @click="go({name:'vipStore',params:{type:'vip'}})">
                            <i tag="i" class="icon vip-icon"></i>
                        </li>
                        <li @click="go({name:'charge',params:{type:'coin'}})" :class="{'active':page=='charge'}"><span>充值中心</span></li>
                        <li :class="{'new':msg.giftMessage}">
                            <span @click="msgBlockFlag=!msgBlockFlag">消息</span>
                            <div class="msg-block" v-if="msgBlockFlag" @click="goToMsgDetail()">
                                <p v-if="msg.giftMessage">
                                    您收到来自{{msg.buyerName}}（{{msg.giftMessage.buyer}}）的礼物 {{msg.giftName}}×{{msg.giftMessage.count}} ，点击消息到我的礼物查收
                                </p>
                            </div>
                        </li>
                        <li class="account-btn" v-if="!account.id"><span class="cm-btn" @click="registerModal({open:true});showMenu=!showMenu;">注册</span><span class="gap">/</span><span class="cm-btn" @click="loginModal({open:true});showMenu=!showMenu;">登录</span></li>
                        <li class="account-info" v-if="account.id">
                            <div class="wrap" @click="go({name:'userInfo',params:{type:'user'}})">
                                <img :src="account.headPic?account.headPic:defaultAvatar" alt="">
                                <span tag="span">{{account.name}}</span>
                                <span class="cmb-tn logout-btn" @click="logout();showMenu=!showMenu;">退出</span>
                            </div>
                        </li>
                    </div>
                </div>
                <div class="mask" @click="showMenu=false"></div>
            </div>
            <voice-switch></voice-switch>
            <div class="menu-btn" @click="showMenu=!showMenu">
                <i class="icon menu-icon"></i>
            </div>
        </div>
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
            z-index: 1;
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
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    padding: 0px 20px;
                    border-radius: 15px;
                }
                &.active{
                   span{
                       color: #fff;
                     /*  background: url("../../images/common/nav-active-icon.png") no-repeat center;
                       background-size: 100% 100%;*/
                       background: #0facff;
                   }
                }
            }
        }
        .fun-nav-list{
            position: relative;
            float: right;
            display: inline-block;
            height: 60px;
            >li{
                position: relative;
                display: inline-block;
                height: 100%;
                line-height: 56px;
                margin-left: 12px;
                font-size: 14px;
                color: #000;
                cursor: pointer;
                padding: 0px 13px;
                user-select: none;
                .gap{
                    padding: 0px 5px;
                }
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
                        border-radius: 50%;
                    }
                    .logout-btn{
                        margin-left: 5px;
                        text-decoration: underline;
                    }
                }
                &.account-btn{
                    position: relative;
                    top:1px;
                    font-size: 18px;
                    color: #0facff;
                    font-family: 'hytangmeiren';
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
            font-size: 12px;
            color: #666;
            padding: 17px 15px 10px 15px;
            line-height: 18px;
            word-break: break-all;
        }
        .menu-btn{
            display: none;
            position: absolute;
            top:0rem;
            right: 0.2rem;
            bottom: 0rem;
            margin: auto;
            width: 0.6rem;
            height:0.6rem;
            .menu-icon{
                background: url("../../images/common/menu-icon.png") no-repeat;
                width: 100%;
                height: 100%;
                background-size: 100% 100%;
            }
        }
        .voice-switch{
            right: -100px;
        }
    }
    @media screen and(max-width: 1000px){
        .header{
            height: 1.2rem;
            padding: 0rem 0.2rem;
            .logo-icon{
              /*  width: 1.83rem;
                height: 0.79rem;*/
            }

            .menu-btn{
                display: inline-block;
            }
            .nav-panel{
                /*display: none;*/
                position: fixed;
                z-index: 100;
                top:0rem;
                right: -100%;
                width: 100%;
                height: 100%;
                .nav-list{
                    margin: 0rem;
                    display: block;
                    height: auto;
                    padding-top: 0.4rem;
                    >li{
                        display: block;
                        text-align: center;
                        height: auto;
                        line-height: 1rem;
                    }
                }
                .fun-nav-list{
                    float: none;
                    width: 100%;
                    height: 1.2rem;
                    >li{
                        display: block;
                        height: auto;
                        text-align: center;
                        margin-left: 0rem;
                        line-height: 1rem;
                        &.active{
                            background-size: auto 55%;
                        }
                        &.vip-link{
                         /*   &.active{
                                background-size: auto 48%;
                            }*/
                        }
                        &.account-info{
                            .wrap{
                                padding-left: 0rem;
                                line-height: normal;
                            }
                            img{
                                display: inline-block;
                                position: relative;
                                width: 1.2rem;
                                height: 1.2rem;
                            }
                            span{
                                display: block;
                                line-height: 0.6rem;
                            }
                        }
                    }
                    &:before{
                        display: none;
                    }
                }
                .panel-bd{
                    position: absolute;
                    top:0rem;
                    right: -4rem;
                    z-index: 2;
                    background: rgba(255,255,255,1);
                    width: 4rem;
                    height: 100%;
                    transition: all 0.3s;
                    transition-delay: 0.2s;
                }
                .mask{
                    opacity: 0;
                    position: absolute;
                    z-index: 1;
                    top:0rem;
                    left: 0rem;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    transition: opacity 0.3s;
                }
            }
            .msg-block{
                top: 0.6rem;
                left: -0.2rem;
                z-index: 1000;
                width: 4.2rem;
                height: 2rem;
                background-size: 100% 100%;
                text-align: left;
                padding: 17px 15px 10px 15px;
                display: flex;
                align-items: center;
            }
            &.active{
                .nav-panel{
                  /*  display:block;*/
                    right: 0rem;
                    .panel-bd{
                        right: 0rem;
                    }
                    .mask{
                        opacity: 1;
                    }
                }
            }
            &.inactive{
                .nav-panel{
                    /*  display:block;*/
                    right: -100%;
                    transition: right 0.3s;
                    transition-delay: 0.5s;
                    .panel-bd{
                        right: -4rem;
                    }
                    .mask{
                        opacity: 0;
                    }
                }
            }
            .voice-switch{
                right: 1rem;
                z-index: 1;
            }
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
            go:function (options) {
                this.showMenu=false;
                this.$router.push(options);
            },
            logout:function () {
                this.$cookie.set('account','');
                bus.$emit('refreshAccount');
                this.$cookie.set('safeAccount','');
                bus.$emit('refreshSafeAccount');
                this.account={};
                Vue.operationFeedback({type:'complete',text:'退出成功'});
                this.$router.push({path:'/'});
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
                    }else if(resp.respCode=='4001'){
                        clearInterval(this.getMsgInterval);
                    }
                });
            },
            goToMsgDetail:function () {
                this.msgBlockFlag=false;
                this.go({name:'safeBox',params:{type:'coin'}});
            }
        },
        created(){
            //
            this.account=Vue.getAccountInfo();
            //
            this.page=this.$route.name;
            //
            //临时测试
           /* if(this.account.id){
                clearInterval(this.getMsgInterval);
                this.getMsgInterval=setInterval(()=>{
                    this.getList();
                },5000);
            }else{

            }*/
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
        },
        beforeDestroy:function () {
            clearInterval(this.getMsgInterval);
        }
    }
</script>
