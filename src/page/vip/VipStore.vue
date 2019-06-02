<template>
    <div class="cm-page vip-store">
        <ul class="vip-list">
            <li v-for="(item,index) in entryList" :key="index">
                <div class="cover">
                    <img :src="basicConfig.imgBasicUrl+item.vipPic" alt="">
                </div>
                <div class="info">
                    <p class="title">{{item.vipName}}</p>
                    <div class="desc">
                        <p v-if="item.giftLangyaCoinState=='enable'">购买即送琅琊豆{{item.giftLangyaCoin}}颗</p>
                        <p v-if="item.dailyGiftLangyaCoinState=='enable'">每天赠送琅琊豆{{item.dailyGiftLangyaCoin}}颗</p>
                        <p v-if="item.kick=='enable'">可踢低级别会员</p>
                    </div>
                    <p class="price">
                        售价：￥<span class="num">{{(item.price/100).toFixed(2)}}</span>/月
                    </p>
                </div>
                <span class="cm-btn buy-btn" @click="selectEntry(item)">购买</span>
            </li>
        </ul>
        <div class="to-pay">
            <div class="payment-info" v-if="curEntry.id">
                <p class="info-row">您将获得：{{curEntry.vipName}}</p>
                <p class="info-row">您应支付：<span class="num">{{(curEntry.price/100).toFixed(2)}}</span>元</p>
                <div class="info-row">
                    <span>支付方式：</span>
                    <ul class="pay-type-list">
                        <li :class="{'active':payType=='weixin'}" @click="setPayType('weixin')">
                            <div class="item-bd"><i class="icon wechat-icon"></i></div>
                            <div class="item-ft">微信支付</div>
                        </li>
                        <li :class="{'active':payType=='zhifubao'}" v-if="version.mobile&&!version.weixin"  @click="setPayType('zhifubao')">
                            <div class="item-bd"><i class="icon ali-icon"></i></div>
                            <div class="item-ft">支付宝支付</div>
                        </li>
                    </ul>
                </div>
                <div class="info-row qrcode-info" v-if="order&&order.code_url">
                    <div class="qrcode-item">
                        <div class="img-box">
                            <qrcode :value="order.code_url" :options="{ width: 180 }"></qrcode>
                        </div>
                        <p class="tips">请打开微信扫一扫进行支付</p>
                    </div>
                </div>
                <div class="info-row alipay-info" v-if="payType=='zhifubao'&&order" v-html="order"></div>
                <div  class="handle">
                    <el-button type="primary" class="handle-btn" :class="{'cm-disabled':handling}" @click="createOrder()">确定</el-button>
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
                pager:{
                    pageIndex:1,
                    pageSize:20,
                    total:0,
                    loading:false
                },
                entryList:[],
                curEntry:{},
                payType:'weixin',//"zhifubao", "weixin"
                order:null,
                orderListener:null,
                version:Vue.tools.browserVersions(),
                requesting:false,
                handling:false,
            }
        },
        methods: {
            getList:function (pageIndex) {
                this.pager.pageIndex=pageIndex?pageIndex:1;
                let params={
                    pageIndex:this.pager.pageIndex,
                    pageSize:this.pager.pageSize,
                }
                this.pager.loading=true;
                Vue.api.getVipTypeList({apiParams:params}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        let list=typeof data.vipTypeList=='string'?JSON.parse(data.vipTypeList):data.vipTypeList;
                        this.entryList=list;
                        console.log('test:',this.entryList);
                        this.pager.total=data.count;
                    }
                    this.pager.loading=false;
                });
            },
            selectEntry:function (item) {
                this.curEntry=item;
            },
            createOrder:function () {
                if(this.handling){
                    return;
                }
                this.handling=true;
                let type='';
                if(this.payType=='weixin'){
                    if(this.version.mobile){
                        if(this.version.weixin){
                            type='JSAPI';
                        }else{
                            type='H5';
                        }
                    }else{
                        type='Native';
                    }
                }else if(this.payType=='zhifubao'){
                    if(this.version.mobile){
                        type='phoneWeb';
                    }else{
                        type='pcWeb';
                    }
                }
                let params={
                    vipTypeId:this.curEntry.id,
                    userId: this.account.id,
                    amount: this.selectedAmount*100,
                    payChannel:this.payType,//"zhifubao", "weixin"
                    type:type,//H5\JSAPI\Native
                    openId:type=='JSAPI'?this.account.peymentOpenId:'',//当type为JSAPI时必填
                    zhifubaoRedirect:this.payType=='zhifubao'?encodeURI(window.location.href+'?tipsType=alipaySuccess'):'',//当支付渠道payType是支付宝时必填、如果跳转不到的话完成后就会调回支付宝的某页面
                }
                let fb=Vue.operationFeedback({text:'订单生成中...'});
                Vue.api.addVipOrder({apiParams:params}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        if(this.payType=='zhifubao'){
                            this.order=resp.respMsg;
                        }else{
                            this.order=JSON.parse(resp.respMsg);
                        }
                        if(this.version.mobile){
                            fb.setOptions({type:"complete",text:'订单生成成功',delayForDelete:0});
                            if(this.payType=='weixin'){
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
                                    window.location.href=this.order.mweb_url;
                                }
                            }else if(this.payType=='zhifubao'){
                                this.handling=false;
                                setTimeout(()=>{
                                    let form=document.getElementsByName('punchout_form');
                                    form[0].submit();
                                },200)
                            }
                        }else{
                            if(this.payType=='zhifubao'){
                                this.handling=false;
                                setTimeout(()=>{
                                    let form=document.getElementsByName('punchout_form');
                                    form[0].submit();
                                },200)
                            }else{
                                fb.setOptions({type:"complete",text:'订单生成成功，请扫码支付'});
                                this.checkOrderStatus();
                            }
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
                Vue.api.checkVipOrderState({apiParams:{orderId:this.order.orderId}}).then((resp)=>{
                    this.requesting=false;
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        if(data.state=='notPay'){
                            this.orderStatusListener();
                        }else if(data.state=='success'){
                            this.order=null;
                            this.handling=false;
                            this.curEntry={};
                            Vue.operationFeedback({type:'complete',text:'支付成功'});
                        }else{
                            Vue.operationFeedback({type:'warn',text:'订单失效'});
                        }
                        /*console.log('orderStatus:',data);*/
                    }
                });
            },
            orderStatusListener:function () {
                this.orderListener=setTimeout(()=>{
                    this.checkOrderStatus();
                },3000);
            },
            onBridgeReady:function () {
                let that=this;
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
                    that.handling=false;
                });
            },
            setPayType:function (value) {
                this.payType=value;
            }
        },
        mounted () {
            //
            this.account=this.getAccountInfo();
            //
            this.getList();
        },
        beforeRouteEnter(to,from,next){
            Vue.weixinCheck(to,from,next,()=>{
                Vue.routeCheck(to,from,next);
            });
        },
        destroyed(){
            clearTimeout(this.orderListener);
        },
    }
</script>
