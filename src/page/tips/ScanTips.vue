<template>
    <div class="cm-page scan-tips">
        <div class="page-content">
            <i class="icon el-icon-success"></i>
            <div class="text-block" v-if="!version.mobile">
                <p class="text">微信扫码授权成功</p>
                <p class="text">请在电脑上完成剩余操作</p>
            </div>
            <div class="text-block" v-if="version.mobile">
                <p class="text">获取微信信息成功</p>
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
            }
        },
        methods: {

        },
        mounted () {
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

                    }
            });
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
