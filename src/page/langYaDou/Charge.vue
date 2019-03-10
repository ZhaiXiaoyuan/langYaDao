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
                    <li class="cm-btn active">5元</li>
                    <li class="cm-btn">10元</li>
                    <li class="cm-btn">20元</li>
                    <li class="cm-btn">50元</li>
                    <li class="cm-btn">100元</li>
                    <li class="cm-btn">200元</li>
                </ul>
                <p class="info-row">您将获得：<span class="num">23901390</span>琅琊豆</p>
                <p class="info-row">您应支付：<span class="num">10</span>元</p>
                <div class="info-row">
                    <span>支付方式：</span>
                    <ul class="pay-type-list">
                        <li class="active">
                            <div class="item-bd"><i class="icon wechat-icon"></i></div>
                            <div class="item-ft">微信支付</div>
                        </li>
                        <li>
                            <div class="item-bd"><i class="icon ali-icon"></i></div>
                            <div class="item-ft">支付宝支付</div>
                        </li>
                    </ul>
                </div>
                <div  class="handle">
                    <el-button type="primary">确定</el-button>
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

            }
        },
        methods: {

        },
        mounted () {

        },
    }
</script>
