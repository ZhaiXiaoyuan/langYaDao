<template>
    <div class="cm-page charge">
        <div class="tab-panel">
            <div class="tab-list">
                <ul>
                    <li class="active">充值金额</li>
                </ul>
            </div>
            <div class="tab-content">
                <ul class="price-list">
                    <li class="cm-btn" v-for="(item,index) in optionsList" :key="index" :class="{'active':selectedAmount==item}" @click="selectAmount(item)">{{item}}元</li>
                </ul>
                <div class="payment-info">
                    <p class="info-row">您将获得：<span class="num">{{coinCount}}</span>琅琊豆</p>
                    <p class="info-row">您应支付：<span class="num">{{selectedAmount}}</span>元</p>
                    <div class="info-row">
                        <span>支付方式：</span>
                        <ul class="pay-type-list">
                            <li class="active">
                                <div class="item-bd"><i class="icon wechat-icon"></i></div>
                                <div class="item-ft">微信支付</div>
                            </li>
                            <!--      <li>
                                      <div class="item-bd"><i class="icon ali-icon"></i></div>
                                      <div class="item-ft">支付宝支付</div>
                                  </li>-->
                        </ul>
                    </div>
                    <div class="info-row qrcode-info" v-if="order.code_url">
                        <div class="qrcode-item">
                            <div class="img-box">
                                <qrcode :value="order.code_url" :options="{ width: 180 }"></qrcode>
                            </div>
                            <p class="tips">请打开微信扫一扫进行支付，支付成功后请到保险箱页面查看余额</p>
                        </div>
                    </div>
                    <div  class="handle">
                        <el-button type="primary" class="handle-btn" :class="{'cm-disabled':handling}" @click="createOrder()">确定</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
                configData:{langyaCoinPerYuan:1},
                //临时测试
                optionsList:[0.01,10,20,50,100,200],
                selectedAmount:0.01,
                qrCodeDomain:Vue.appConfig.domain,
                order:{},
                orderListener:null,
                version:Vue.tools.browserVersions(),
                requesting:false,
                handling:false,
            }
        },
        computed: {
            coinCount() {
                return this.selectedAmount*this.configData.langyaCoinPerYuan;
            }
        },
        methods: {
            getConfigData:function () {
                Vue.api.getBaseGlobalVariable({apiParams:{}}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.configData=JSON.parse(resp.respMsg);
                    }
                });
            } ,
            selectAmount:function (value) {
                this.selectedAmount=value;
            },
            createOrder:function () {
                if(this.handling){
                    return;
                }
                this.handling=true;
                let type='Native';
                if(this.version.mobile){
                    if(this.version.weixin){
                        type='JSAPI';
                    }else{
                        type='H5';
                    }
                }
                let params={
                    userId: this.account.id,
                    amount: this.selectedAmount*100,
                    type:type,//H5\JSAPI\Native
                    openId:type=='JSAPI'?this.account.peymentOpenId:'',//当type为JSAPI时必填
                }
                let fb=Vue.operationFeedback({text:'订单生成中...'});
                Vue.api.addRechargeOrder({apiParams:params}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.order=JSON.parse(resp.respMsg);
                        if(this.version.mobile){
                            fb.setOptions({type:"complete",text:'订单生成成功',delayForDelete:0});
                            if(this.version.weixin){
                                if (typeof WeixinJSBridge == "undefined"){
                                    if( document.addEventListener ){
                                        document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
                                    }else if (document.attachEvent){
                                        document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
                                        document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
                                    }
                                }else{
                                    this.onBridgeReady();
                                }
                            }else{

                            }
                        }else{
                            fb.setOptions({type:"complete",text:'订单生成成功，请扫码支付'});
                            this.checkOrderStatus();
                        }
                    }else{
                        this.handling=false;
                        fb.setOptions({type:"warn",text:resp.respMsg});
                    }
                });
            },
            checkOrderStatus:function () {
                if(this.requesting){
                    return;
                }
                this.requesting=true;
                Vue.api.checkRechargeOrderState({apiParams:{orderId:this.order.orderId}}).then((resp)=>{
                    this.requesting=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        if(data.state=='notPay'){
                            this.orderStatusListener();
                        }else if(data.state=='success'){
                            this.handling=false;
                            Vue.operationFeedback({type:'complete',text:'支付成功'});
                        }else{
                            Vue.operationFeedback({type:'warn',text:'订单失效'});
                        }
                    /*    console.log('orderStatus:',data);*/
                    }
                });
            },
            orderStatusListener:function () {
                this.orderListener=setTimeout(()=>{
                    this.checkOrderStatus();
                },3000);
            },
            onBridgeReady:function () {
                WeixinJSBridge.invoke('getBrandWCPayRequest', {
                    "appId": this.order.appId,
                    "timeStamp": this.order.timeStamp,
                    "nonceStr":this.order.nonceStr,
                    "package":this.order.package,
                    "signType":this.order.signType,
                    "paySign":this.order.paySign
                }, function (payResult) {
                    var errMsg = payResult.err_msg;
                    if (errMsg == "get_brand_wcpay_request:ok") {
                     /*   Vue.operationFeedback({type:'complete',text:'支付成功'});*/
                    }else if (errMsg == "get_brand_wcpay_request:fail") {
                        Vue.operationFeedback({type:'warn',text:'支付失败，'+errMsg});
                    }else if ( errMsg == "get_brand_wcpay_request:cancel") {
                        /*Vue.operationFeedback({type:'warn',text:''});*/
                    }
                    this.handling=false;
                });
            }
        },
        mounted () {
            //
            this.account=this.getAccountInfo();
            //
           /* this.createOrder();*/
           //
           this.getConfigData();

        },
        destroyed(){
            clearTimeout(this.orderListener);
        },
        beforeRouteEnter(to,from,next){
            Vue.routeCheck(to,from,next);
            Vue.weixinCheck();
        },
    }
</script>
