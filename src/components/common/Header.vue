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
                <router-link tag="li" :to="{ path: '/center/coin/charge'}" :class="{'active':page=='charge'}"><span>琅琊豆中心</span></router-link>
                <li class="new"><span>消息</span></li>
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
        overflow: hidden;
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
                .gap{}
                &.new{
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
                Vue.cookie.set('account','');
                this.account={};
                Vue.operationFeedback({type:'complete',text:'退出成功'});
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
                console.log('this.account:',this.account);
            });
        }
    }
</script>
