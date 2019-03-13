<template>
    <div class="cm-page safe-box">
        <div class="balance-panel">
            <div class="balance-item total-balance-item">
                <p class="title">总资产：</p>
                <p class="value"><span class="num">{{account.balance+account.safeBoxBalance}}</span><span class="unit">琅琊豆</span></p>
            </div>
            <div class="items-wrap">
                <div class="balance-item liquidity-balance-item">
                    <p class="title">流动余额：</p>
                    <p class="value"><span class="num">{{account.balance}}</span><span class="unit">琅琊豆</span></p>
                    <div class="handle">
                        <router-link tag="span" :to="{ path: '/center/coin/charge'}" class="cm-btn btn">充值</router-link>
                    </div>
                </div>
                <div class="balance-item safety-balance-item">
                    <p class="title">保险箱余额：</p>
                    <p class="value"><span class="num">{{account.safeBoxBalance}}</span><span class="unit">琅琊豆</span></p>
                    <div class="handle">
                        <span class="cm-btn btn solid-btn">从余额转入</span>
                        <span class="cm-btn btn">转出到余额</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-panel">
            <div class="tab-list">
                <ul>
                    <li class="active">我的礼物</li>
                </ul>
            </div>
            <div class="filter">
                <div class="type-list">
                    <span>查看：</span>
                    <ul>
                        <li class="cm-btn active">全部</li>
                        <li class="cm-btn">未兑换</li>
                        <li class="cm-btn">已兑换</li>
                    </ul>
                </div>
                <span class="cm-btn all-btn">一键兑换全部</span>
            </div>
            <div class="tab-content">
                <ul class="gift-list">
                    <li>
                       <div class="cover"><img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3297979354,2990477759&fm=58&bpow=655&bpoh=655" alt=""></div>
                        <div class="info">
                            <p class="title-row"><span>浪漫求婚钻戒</span><span class="count">x2</span></p>
                            <p class="info-row">赠送人：用户名用户名（userID）</p>
                            <p class="info-row">赠送事件编号：shfajfoajfg463636</p>
                            <p class="info-row">赠送时间：2018-12-30   16:56:54</p>
                        </div>
                        <div class="handle">
                            <el-button class="exchange-btn" type="primary" plain>兑换</el-button>
                        </div>
                    </li>
                    <li class="disable">
                        <div class="cover"><img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3297979354,2990477759&fm=58&bpow=655&bpoh=655" alt=""></div>
                        <div class="info">
                            <p class="title-row"><span>浪漫求婚钻戒</span><span class="count">x2</span></p>
                            <p class="info-row">赠送人：用户名用户名（userID）</p>
                            <p class="info-row">赠送事件编号：shfajfoajfg463636</p>
                            <p class="info-row">赠送时间：2018-12-30   16:56:54</p>
                        </div>
                        <div class="handle">
                            <el-button class="exchange-btn" type="primary" plain>兑换</el-button>
                        </div>
                    </li>
                </ul>
                <scroll-load :page="pager" @scrolling="getList()"></scroll-load>
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
                state:'',//notExchanged:未兑换,exchanged:已兑换
                pager:{
                    pageNum: 1,
                    pageSize: 20,
                    isLoading:false,
                    isFinished:false
                },
                entryList:[],
            }
        },
        methods: {
            getUserInfo:function () {
                Vue.api.getUserInfo({apiParams:{id:this.account.phone,type:'phone'}}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        this.account={...this.account,...data};
                        console.log('this.account:',this.account);
                    }
                });
            },
            getList:function (isInit) {
                if(isInit){
                    this.pager.pageNum = 1;
                    this.entryList = [];
                }
                let params={
                    userId:this.account.id,
                    state:this.state,
                    userType:'gainer',
                    pageIndex:this.pager.pageNum,
                    pageSize:this.pager.pageSize,
                }
                this.pager.loading=true;
                Vue.api.getGiftMessageList({apiParams:params}).then((resp)=>{
                    if(resp.respCode=='2000'){
                        let data=JSON.parse(resp.respMsg);
                        console.log('data:',data);
                        let list=data.giftMessageList;

                        this.pager.pageNum=this.pager.pageNum+1;
                        this.pager.maxPage=Math.ceil(data.count/this.pager.pageSize);
                        this.pager.isLoading=false;
                        this.pager.isFinished=false;
                        this.entryList=this.entryList.concat(list);
                        console.log('test:',this.entryList);
                    }else{

                    }
                });
            },
        },
        mounted () {
            //
            this.account=this.getAccountInfo();
            //
            this.getUserInfo();
            this.getList();
        },
    }
</script>
