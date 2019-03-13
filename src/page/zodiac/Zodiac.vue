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
           /* initWs:function () {
                // 打开一个 web socket
                this.ws = new WebSocket("ws://zyugoodluck.vicp.cc:15852/"+this.account.id);
                this.ws.onopen = function()
                {
                    // Web Socket 已连接上，使用 send() 方法发送数据
                    console.log('已连接');
                };
                this.ws.onmessage = (evt)=>
                {

                };
                this.ws.onclose = function()
                {
                    // 关闭 websocket
                    console.log('关闭');
                };
                this.ws.onerror = function () {
                    console.log("WebSocket连接发生错误");
                }
            },
            closeWs:function () {
                this.ws&&this.ws.close();
            },*/
        },
        created(){
            //
            this.account=this.getAccountInfo();
            this.account.id=1;
            //
            /*this.socketApi.initWebSocket("ws://zyugoodluck.vicp.cc:15852/"+this.account.id);*/
        },
        mounted () {

        },
        beforeRouteLeave(to,from,next){
            this.socketApi.close();
            next();
        },
    }
</script>
