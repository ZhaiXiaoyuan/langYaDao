<template>
    <div class="footer">
        <p> Copyright &copy; 世界妈祖交流协会2018. All rights reserved.</p>
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
        position: absolute;
        left: 0px;
        bottom: 0px;
        text-align: center;
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #fffef4;
        font-size: 14px;
        color: #000;
    }
    @media screen and(max-width: 1000px){
        .footer{
              height: 0.88rem;
              line-height: 0.88rem;
              font-size: 0.24rem;
        }
    }
</style>
