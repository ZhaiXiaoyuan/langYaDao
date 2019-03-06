<template>
    <div class="footer">
        <p>© 2019 金华市盛赢网络科技有限公司 版权所有</p>
        <p>抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活</p>
    </div>
</template>
<script>
    import Vue from 'vue'
    export default {
        data() {
            return {

            }
        },
        computed:{

        },
        methods:{

        },
        created(){

        }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
    .footer{
        padding: 20px 10px;
    /*    position: absolute;
        left: 0px;
        bottom: 0px;*/
        text-align: center;
        width: 100%;
        background: #fff;
        font-size: 12px;
        color: #666;
        p+p{
            margin-top: 10px;
        }
    }
    @media screen and(max-width: 1000px){
        .footer{
              height: 0.88rem;
              line-height: 0.88rem;
              font-size: 0.24rem;
        }
    }
</style>
