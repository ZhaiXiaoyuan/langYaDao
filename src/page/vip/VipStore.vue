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
                <span class="cm-btn buy-btn">购买</span>
            </li>
        </ul>
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
                        let list=data.vipTypeList;
                        this.entryList=list;
                        console.log('test:',this.entryList);
                        this.pager.total=data.count;
                    }
                    this.pager.loading=false;
                });
            },
        },
        mounted () {
            //
            this.account=this.getAccountInfo();
            //
            this.getList();
        },
    }
</script>
