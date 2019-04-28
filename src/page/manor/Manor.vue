<template>
    <div class="cm-page manor-game">
        <div class="page-content">
            <div class="cm-btn cm-scale-btn return-btn"></div>
            <i class="icon manor-logo-icon"></i>
        </div>

        <div class="level-modal" v-if="levelModalFlag">
            <div class="modal-body">
                <ul class="level-list">
                    <li>
                        <p>神兽：300豆</p>
                        <p>收成：<span class="strong">300</span>豆</p>
                    </li>
                    <li>
                        <p>神兽：300豆</p>
                        <p>收成：<span class="strong">300</span>豆</p>
                    </li>
                    <li>
                        <p>神兽：300豆</p>
                        <p>收成：<span class="strong">300</span>豆</p>
                    </li>
                    <li>
                        <p>神兽：300豆</p>
                        <p>收成：<span class="strong">300</span>豆</p>
                    </li>
                </ul>
                <div class="rule-block">
                    <div class="block-bd">
                        领养神兽需向平台支付相应价值的琅琊豆，当不希望继续喂养领养的神兽时，平台将按原价值向玩家回购改神兽，喂养神兽饲料24小时后，神兽将会产蛋，平台会根据不同等级收成蛋的价值向玩家收购。
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
                levelModalFlag:true,
            }
        },
        methods: {
        },
        created(){

        },
        mounted () {

        },
        beforeRouteEnter(to,from,next){
            document.getElementById('footer').style.display='none';
            Vue.routeCheck(to,from,next);
        },
        beforeRouteLeave(to,from,next){
            document.getElementById('footer').style.display='block';
            next();
        },
    }
</script>
