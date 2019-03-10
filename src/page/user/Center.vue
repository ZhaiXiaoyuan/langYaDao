<template>
    <div class="cm-page center">
        <div class="page-content">
            <div class="left-nav">
                <div class="nav-list">
                    <div class="list-hd">
                        个人中心
                    </div>
                    <div class="list-bd">
                        <ul>
                            <li class="active">个人资料</li>
                        </ul>
                    </div>
                </div>
                <div class="nav-list vip-nav-list">
                    <div class="list-hd">
                        会员中心
                    </div>
                    <div class="list-bd">
                        <ul>
                            <li>成为会员</li>
                        </ul>
                    </div>
                </div>
                <div class="nav-list vip-nav-list">
                    <div class="list-hd">
                        琅琊豆中心
                    </div>
                    <div class="list-bd">
                        <ul>
                            <li>保险箱</li>
                            <li>充值</li>
                            <li>赠送礼物</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="right-page-content">
                <router-view></router-view>
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
                type:'user',
            }
        },
        methods: {

        },
        mounted () {
            if(this.$route.params.type){
                this.type=this.$route.params.type;
                console.log('this.type:',this.type);
            }
        },
    }
</script>
