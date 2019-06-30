<template>
    <div class="footer" id="footer">
        <p>© 2019 金华市盛赢网络科技有限公司 版权所有</p>
        <p>抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活</p>
        <p class="certificate-list">
            <a class="certificate-item" href="http://si.trustutn.org/info?sn=702190624038280195790&certType=1" target="_blank">
                <img :src="shuiDiCertificateImg"/>
            </a>
        </p>
    </div>
</template>
<script>
    import Vue from 'vue'
    export default {
        data() {
            return {
                shuiDiCertificateImg:require('../../images/common/certificate-icon.png'),
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
        padding: 15px 10px;
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
        .certificate-list{
            .certificate-item{
                img{
                    max-height: 32px;
                }
            }
        }
    }
    @media screen and(max-width: 1000px){
        .footer{
            padding: 0.2rem 0.4rem;
           /* height: 1.2rem;*/
            line-height: 0.24rem;
            font-size: 0.24rem;
            p+p{
                margin-top: 0.1rem;
                line-height: 0.32rem;
                color: #999;
               /* transform: scale(0.95);*/
            }
        }
    }
</style>
