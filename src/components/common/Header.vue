<template>
    <div class="header" id="header" :class="{'active':showMenu}">
        <div class="cm-container header-content">
            <i class="icon logo-icon"></i>
            <ul class="nav-list">
                <li class="cm-btn" @click="go('home')" :class="{'active':pageName=='home'}"><span>琅琊岛</span></li>
               <!-- <li class="cm-btn"><span>琅琊谷</span></li>
                <li class="cm-btn"><span>琅琊村</span></li>
                <li class="cm-btn"><span>琅琊秀</span></li>-->
            </ul>
            <div class="fun-nav-list">
                <li>
                    <i class="icon vip-icon"></i>
                </li>
                <li><span>琅琊豆中心</span></li>
                <li class="new"><span>消息</span></li>
                <li><span>注册/登录</span></li>
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
                margin-left: 35px;
                font-size: 14px;
                color: #000;
                cursor: pointer;
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
                pageName:'home',
                collapse: false,
                name: 'linxin',
                accountInfo:{},
                showMenu:false,
            }
        },
        watch:{
            '$route': function(to, from) {
                this.pageName=this.$route.name;
            },
        },
        methods:{
            go:function (page) {
                this.showMenu=false;
                this.$router.push({name:page});
            }
        },
        created(){
            //
            this.pageName=this.$route.name;
            //
        }
    }
</script>
