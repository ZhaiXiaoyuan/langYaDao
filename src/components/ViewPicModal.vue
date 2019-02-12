<template>
  <div class="view-pic-modal">
    <div class="mask" @click="close()"></div>
    <div class="modal-content">
      <div class="modal-body">
          <span class="cm-btn last-btn" :class="{'cm-disabled':options.index<=0}" @click="last()"><i class="icon last-icon"></i></span>
        <div class="view-win">
            <img :src="imgUrl" alt="">
            <el-button primary class="close-btn" icon="el-icon-circle-close" @click="close()">关闭</el-button>
        </div>
          <span class="cm-btn next-btn" :class="{'cm-disabled':options.index>=options.imgList.length-1}"  @click="next()"><i class="icon next-icon"></i></span>
      </div>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .view-pic-modal{
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    top:0px;
    left: 0px;
    user-select: none;
  }
  .mask{
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    top:0px;
    left: 0px;
    background: rgba(0,0,0,0.5);
  }
  .modal-content{
      position: fixed;
      z-index: 1001;
    width: 100%;
    height: 100%;
  }
  .modal-body{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .view-win{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      height: 85%;
      img{
       max-height: 100%;
      }
        .close-btn{
            position: absolute;
            left: 50%;
            bottom: 0%;
            -webkit-transform: translate3d(-50%,-100%,0);
            transform: translate3d(-50%,-100%,0);
        }
    }
    .last-btn{
        position: absolute;
        top:0px;
        left: 2%;
        bottom: 0px;
        margin: auto;
        width: 50px;
        height: 50px;
        background: rgba(0,0,0,0.5);
        border-radius: 50%;
        text-align: center;
        line-height: 50px;

        display: flex;
        justify-content: center;
        align-items: center;
    }
      .last-icon{
          position: relative;
          left: -2px;
          background: url("../images/common/last-icon.png");
          width: 30px;
          height: 30px;
          background-size: 100% 100%;
      }
    .next-btn{
        position: absolute;
        top:0px;
        right: 2%;
        bottom: 0px;
        margin: auto;
        width: 50px;
        height: 50px;
        background: rgba(0,0,0,0.5);
        border-radius: 50%;
        text-align: center;
        line-height: 50px;

        display: flex;
        justify-content: center;
        align-items: center;
      }
      .next-icon{
          position: relative;
          right: -2px;
          background: url("../images/common/next-icon.png");
          width: 30px;
          height: 30px;
          background-size: 100% 100%;
      }
  }
  @media screen and(max-width: 1000px){
      .modal-body{
          .view-win{
              img{
                  max-width: 100%;
                  max-height: none;
              }
          }
      }
  }
</style>
<script>
  import Vue from 'vue'
  export default {
    components: {

    },
    props:{
      options:{
          index:0,
          imgList:[],
      }
    },
    data: function () {
      return {
          imgUrl:null,
      }
    },
    computed: {},
    watch: {

    },
    methods: {
        last:function () {
            if(this.options.index>0){
                this.options.index--;
                this.imgUrl=this.options.imgList[this.options.index].imgUrl;
            }
        },
        next:function () {
            if(this.options.index<this.options.imgList.length-1){
                this.options.index++;
                this.imgUrl=this.options.imgList[this.options.index].imgUrl;
            }
        },
      close:function () {
        this.$el.remove();
        this.$destroy();
      },
    },
    created: function () {

    },
    mounted: function () {
        if(this.options.imgList.length>0){
            this.imgUrl=this.options.imgList[this.options.index?this.options.index:0].imgUrl;
        }
    }
  };
</script>
