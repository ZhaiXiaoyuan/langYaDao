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
                <div class="info-row payment-info" v-if="order.code_url">
                    <div class="qrcode-item">
                        <div class="img-box">
                            <qrcode :value="order.code_url" :options="{ width: 180 }"></qrcode>
                        </div>
                        <p class="tips">请打开微信扫一扫进行支付，支付成功后请到保险箱页面查看余额</p>
                    </div>
                </div>
                <div  class="handle">
                    <el-button type="primary" class="handle-btn" @click="createOrder()">确定</el-button>
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
                let params={
                    userId: this.account.id,
                    amount: this.selectedAmount*100,
                    type:'Native',//H5\JSAPI\Native
                    openId:'',//当type为JSAPI时必填
                }
                let fb=Vue.operationFeedback({text:'订单生成中...'});
                Vue.api.addRechargeOrder({apiParams:params}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.order=JSON.parse(resp.respMsg);
                        console.log('order:',this.order);
                        fb.setOptions({type:"complete",text:'订单生成成功，请扫码支付'});
                    }else{
                        fb.setOptions({type:"warn",text:resp.respMsg});
                    }
                });
            },
        },
        mounted () {
            //
            this.account=this.getAccountInfo();
            console.log('test:',this.account);
            //
           /* this.createOrder();*/
           //
           this.getConfigData();
        },
    }
</script>
