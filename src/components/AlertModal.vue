<template>
    <el-dialog custom-class="alert-modal" :visible.sync="options.open" center>
        <div class="modal-header">
            <span class="title">{{options.title}}</span>
            <span class="cm-btn close-btn" @click="close()"></span>
        </div>
        <div class="modal-body" v-html="options.html">
        </div>
        <div class="modal-footer">
            <span class="cm-btn cancel-btn" @click="cancel()" v-if="options.type=='confirm'">{{options.no}}</span>
            <span class="cm-btn handle-btn" @click="ok()">{{options.yes}}</span>
        </div>
    </el-dialog>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
    .alert-modal{
        background: red;
        border-radius: 8px;
        background: url("../images/common/alert-modal-bg.png") no-repeat;
        width: 336px;
        height: 256px;
        font-family: 'hytangmeiren';
        box-shadow: none;
        .el-dialog__header{
            display: none;
        }
        .el-dialog__body{
            padding: 0px;
        }
        .modal-header{
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 100%;
            height: 40px;
            .title{
                font-size: 20px;
                color: #fff;
            }
            .close-btn{
                position: absolute;
                top:-6px;
                right: -6px;
                display: inline-block;
                background: url("../images/zodiac/close-btn.png") no-repeat;
                width: 36px;
                height: 36px;
                background-size: 100%;
            }
        }
        .modal-body{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 120px;
            font-size: 18px;
            color: #2096e0;
            text-align: center;
            padding: 10px 25px;
        }
        .modal-footer{
            margin-top: 10px;
            text-align: center;
            .handle-btn{
                display: inline-block;
                background: url("../images/common/sure-btn.png") no-repeat;
                width: 128px;
                height: 56px;
                background-size: 100%;
                font-size: 24px;
                color: #fff;
                text-align: center;
                line-height: 44px;
                text-shadow: #ff740b 0.1em 0.15em 0.1em;
            }
            .cancel-btn{
                display: inline-block;
                font-size: 18px;
                padding: 0px 20px;
            }
        }
    }
</style>
<script>
  import Vue from 'vue'
  import bus from '../components/common/bus';

  export default {
    components: {

    },
    props:{
      options:{
          open:true,
          type:'alert',//alert,confirm
          title: '温馨提示', //提示标题
          html: '',   //提示内容
          yes: '确 定',
          no: '取 消',
          ok:null,//确定的回调
          cancel:null,//取消的回调,
      }
    },
    data: function () {
      return {

      }
    },
    computed: {},
    watch: {

    },
    methods: {
        close:function () {
            this.options.open=false;
            this.$el.remove();
            this.$destroy();
        },
        ok:function () {
            this.options.ok&&this.options.ok();
            this.close();
        },
        cancel:function () {
            this.options.cancel&&this.options.cancel();
            this.close();
        }
    },
    created: function () {

    },
    mounted: function () {

    }
  };
</script>
