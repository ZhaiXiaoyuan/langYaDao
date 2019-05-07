<template>
    <div class="cm-page payment-tips">
        <div class="page-content">
            <i class="icon el-icon-success"></i>
            <div class="text-block" v-if="!version.mobile">
                <p class="text">微信扫码授权成功</p>
                <p class="text">请在电脑上完成剩余操作</p>
            </div>
            <div class="text-block" v-if="version.mobile">
                <p class="text"></p>
            </div>
         <!--   <div class="handle" style="margin-top: 20px;" @click="close()">
                <el-button plain>关闭</el-button>
            </div>-->
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
                type:'',//
            }
        },
        methods: {
        },
        mounted () {
            //
            if(this.$route.params.type){
                this.type=this.$route.params.type;
                console.log('this.type:',this.type);
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
