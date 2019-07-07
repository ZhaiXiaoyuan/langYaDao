<template>
    <div class="footer" id="footer">
        <p>© 2019 金华市盛赢网络科技有限公司 版权所有</p>
        <p>
            <span class="f-item">新广出审〔2018〕384号&nbsp;&nbsp;ISBN&nbsp;978-7-498-03856-291330703MA2E6H2R68</span>
            <span class="f-item">浙网文（2019）1837-201号&nbsp;&nbsp;浙ICP备案19007511号</span>
            <span class="f-item">电信增值&nbsp;&nbsp;文网游备字〔2016〕C-CBG 078&nbsp;<i class="icon g-icon"></i></span>
        </p>
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
                gIcon:require('../../images/common/g-icon.png'),
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
        .f-item{
            padding: 0px 5px;
            .g-icon{
                position: relative;
                top:2px;
                background: url("../../images/common/g-icon.png") no-repeat;
                width: 18px;
                height: 18px;
                background-size: 100% 100%;
            }
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
            .f-item{
                display: block;
            }
            p+p{
                margin-top: 0.1rem;
                line-height: 0.32rem;
                color: #999;
               /* transform: scale(0.95);*/
            }
        }
    }
</style>
