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
            this.socketApi.initWebSocket("ws://api.linqi.tech:8600/"+this.account.id);
            //
        },
        mounted () {

        },
        beforeRouteLeave(to,from,next){
            this.socketApi.close();
            next();
        },
    }
</script>
