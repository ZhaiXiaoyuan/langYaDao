<template>
    <div class="cm-page home">
        <div class="page-content">
            <div class="banner-panel">
                <el-carousel height="100%" :interval="10000">
                    <el-carousel-item @click="toDetail(item)" v-for="(item,index) in bannerList" :key="index" :style="{background: 'url('+basicConfig.coverBasicUrl+item.cover+') no-repeat center',backgroundSize: 'cover'}">
                        <div class="banner-item-content" @click="toDetail(item)">
                            <span class="link-tips">点击查看详情</span>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="cm-container">

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
                //defaultAvatar:require('../images/common/default-avatar.png'),
                //defaultLogoAvatar:require('../images/common/logo-icon.png'),
                bannerList:[],

            }
        },
        methods: {

        },
        mounted () {

        },
        beforeRouteLeave(to,from,next){
            next();
        },
    }
</script>
