<template>
    <div class="cm-page gift-type">
        <div class="tab-panel">
            <div class="tab-list">
                <ul>
                    <li class="active">礼物列表</li>
                </ul>
            </div>
            <div class="tab-content">
                <ul class="gift-type-list">
                    <li v-for="(item,index) in 20">
                        <img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3297979354,2990477759&fm=58&bpow=655&bpoh=655" alt="">
                        <p class="title">浪漫钻石戒指</p>
                        <el-button class="handle-btn" type="primary" plain>赠送</el-button>
                    </li>
                </ul>
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
