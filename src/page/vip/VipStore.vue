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
                        <p class="tips">请打开微信扫一扫进行支付</p>
                    </div>
                </div>
                <div  class="handle">
                    <el-button type="primary" class="handle-btn" :class="{'cm-disabled':order.orderId}" @click="createOrder()">确定</el-button>
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
                order:{},
                orderListener:null,
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
                let params={
                    vipTypeId:this.curEntry.id,
                    userId: this.account.id,
                    amount: this.selectedAmount*100,
                    type:'Native',//H5\JSAPI\Native
                    openId:'',//当type为JSAPI时必填
                }
                let fb=Vue.operationFeedback({text:'订单生成中...'});
                Vue.api.addVipOrder({apiParams:params}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        this.order=JSON.parse(resp.respMsg);
                        console.log('order:',this.order);
                        fb.setOptions({type:"complete",text:'订单生成成功，请扫码支付'});
                        this.checkOrderStatus();
                    }else{
                        fb.setOptions({type:"warn",text:resp.respMsg});
                    }
                });
            },
            checkOrderStatus:function () {
                Vue.api.checkVipOrderState({apiParams:{orderId:this.order.orderId}}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        if(data.state=='notPay'){
                            this.orderStatusListener();
                        }else if(data.state=='success'){
                            this.order={};
                            this.curEntry={};
                            Vue.operationFeedback({type:'complete',text:'支付成功'});
                        }else{
                            Vue.operationFeedback({type:'warn',text:'订单失效'});
                        }
                        console.log('orderStatus:',data);
                    }
                });
            },
            orderStatusListener:function () {
                this.orderListener=setTimeout(()=>{
                    this.checkOrderStatus();
                },3000);
            }
        },
        mounted () {
            //
            this.account=this.getAccountInfo();
            //
            this.getList();
        },
        destroyed(){
            clearTimeout(this.orderListener);
        }
    }
</script>
