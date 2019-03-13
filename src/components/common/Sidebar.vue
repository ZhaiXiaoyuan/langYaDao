<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="item.icon"></use>
                            </svg>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item  v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" :class="{'active':item.index.indexOf(pageName)>-1}">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="item.icon"></use>
                        </svg>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        z-index: 2;
        left: 0;
        top: 70px;
        bottom:0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
        background-color: #fff !important;
    }
    .icon{
        width: 18px;
        height: 18px;
        margin-right: 5px;
        vertical-align: middle;
    }
    .el-menu-item{
        background-color: #fff !important;
        color: rgba(122, 205, 244, 1) !important;
    }
    .el-menu-item.active{
        background-color: rgba(122, 205, 244, 0.9) !important;
        color: #fff !important;
    }
</style>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                pageName:null,
                collapse: false,
                itemsConfig:[

                ],
                items: []
            }
        },
        computed:{
            onRoutes(){
                this.pageName=this.$route.name;
                return this.$route.path.replace('/','');
            }
        },
        created(){
            //
            this.pageName=this.$route.name;
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });
            //
            this.accountInfo=this.getAccountInfo();
            this.accountAccess=null;
            if(this.accountInfo.type=='superManager'){
                this.accountAccess=['01','02','03','04','05','06','07'];
               /* this.accountAccess='all';*/
            }else if(this.accountInfo.type=='marketManager'){
                this.accountAccess=['01','02','10'];
            }else if(this.accountInfo.type=='accountantManager'){
                this.accountAccess=['03'];
            }else if(this.accountInfo.type=='userManager'){
                this.accountAccess=['06','07','08'];
            } else if(this.accountInfo.type=='shopManager'){
               /* this.accountAccess=['07','08'];*/
            }
            if(this.accountAccess=='all'){
                this.items=this.itemsConfig;
            }else if(this.accountAccess&&this.accountAccess.length>0){
                this.accountAccess.forEach((value,index)=>{
                    for(let i=0;i<this.itemsConfig.length;i++){
                        if(value==this.itemsConfig[i].code){
                            this.items.push(this.itemsConfig[i]);
                        }
                    }
                })
            }
        }
    }
</script>
