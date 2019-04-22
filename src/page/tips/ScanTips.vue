<template>
    <div class="cm-page scan-tips">
        <div class="page-content">
            <i class="icon el-icon-success" @click="test()"></i>
            <div class="text-block" v-if="!version.mobile">
                <p class="text">微信扫码授权成功</p>
                <p class="text">请在电脑上完成剩余操作</p>
            </div>
            <div class="text-block" v-if="version.mobile">
                <p class="text" v-if="type!='wechatLogin'">获取微信信息成功</p>
                <p class="text" v-if="type=='wechatLogin'">微信登录成功</p>
            </div>
            <div class="handle" style="margin-top: 20px;" @click="close()">
                <el-button plain>关闭</el-button>
            </div>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    .scan-tips{
        text-align: center;
        .icon{
            font-size: 80px;
        }
        .el-icon-success{
            color: #67C23A;
        }
        .text-block{
            margin-top: 20px;
        }
        .text{
            font-size: 18px;
            color: #666;
            line-height: 30px;
        }
    }
</style>
<script>
    import Vue from 'vue'

    export default {
        components:{

        },
        data: function(){
            return {
                account:{},
                version:Vue.tools.browserVersions(),
                type:'getWechatInfo',//getWechatInfo、wechatLogin
            }
        },
        methods: {
            close:function () {
                //这个可以关闭安卓系统的手机
                document.addEventListener('WeixinJSBridgeReady', function(){ WeixinJSBridge.call('closeWindow'); }, false);
                //这个可以关闭ios系统的手机
                WeixinJSBridge.call('closeWindow');
            }
        },
        mounted () {
            //
            if(this.$route.params.type){
                this.type=this.$route.params.type;
                console.log('this.type:',this.type);
            }
            //
            let randomId=localStorage.getItem('randomId');
            if(randomId){
                localStorage.removeItem('randomId');
                Vue.api.getOpenIdInfo({apiParams:{"state":randomId}}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.account=this.getAccountInfo();
                        this.account.peymentOpenId=data.openId;
                        this.$cookie.set('account',JSON.stringify(this.account),7);
                        this.$router.go(-1);
                    }else{

                    }});
            }else if(this.type=='wechatLogin'){
                WeixinJSBridge.call("closeWindow");
            }
        },
        beforeRouteEnter(to,from,next){
            document.getElementById('header').style.display='none';
            document.getElementById('footer').style.display='none';
            next();
        },
        beforeRouteLeave(to,from,next){
            document.getElementById('header').style.display='block';
            document.getElementById('footer').style.display='block';
            next();
        },
    }
</script>
