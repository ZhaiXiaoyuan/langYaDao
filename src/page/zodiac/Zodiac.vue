<template>
    <router-view></router-view>
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
                ws:{},
            }
        },
        methods: {
        },
        created(){
            //
            this.account=this.getAccountInfo();
            //
           //临时测试
            this.socketApi.initWebSocket("ws://api.linqi.tech:8600/"+this.account.id);
           /* this.socketApi.initWebSocket("ws://192.168.0.100:8600/"+this.account.id,{
                closeCallback:()=>{

                }
            });*/
            //
        },
        mounted () {

        },
        beforeRouteEnter(to,from,next){
            Vue.routeCheck(to,from,next)
        },
        beforeRouteLeave(to,from,next){
            this.socketApi.close();
            next();
        },
    }
</script>
