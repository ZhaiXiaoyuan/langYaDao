<!--滚动加载组件-->
<template>
  <div style="padding: 0.2rem 0rem;">
    <div class="cm-loading" v-show="page&&page.isLoading&&!page.isFinished">
      <!--<mt-spinner type="snake" color="#00CDB2" :size="25"></mt-spinner>-->
      <i class="icon loading-icon"></i>
    </div>
    <div class="cm-loading" v-show="page&&page.maxPage!=0&&!page.isLoading&&page.isFinished">
      <p class="no-more">{{noData}}</p>
    </div>
    <div class="cm-loading" v-show="page&&page.maxPage==0&&!page.isLoading&&page.isFinished">
      <p class="no-more">暂无数据</p>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
.cm-loading{
  text-align: center;
}
.icon{
  display: none;
  width:0.48rem;
  height: 0.48rem;
}
@-webkit-keyframes loading-animate {
  0% {
    -webkit-transform: rotate3d(0, 0, 1, 0deg);
    transform: rotate3d(0, 0, 1, 0deg);
  }
  100% {
    -webkit-transform: rotate3d(0, 0, 1, 360deg);
    transform: rotate3d(0, 0, 1, 360deg);
  }
}
@keyframes loading-animate {
  0% {
    -webkit-transform: rotate3d(0, 0, 1, 0deg);
    transform: rotate3d(0, 0, 1, 0deg);
  }
  100% {
    -webkit-transform: rotate3d(0, 0, 1, 360deg);
    transform: rotate3d(0, 0, 1, 360deg);
  }
}
.loading-icon{
  display: inline-block;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
  background-size: 100% 100%;
  -webkit-animation: loading-animate 1s steps(12, end) infinite;
  animation: loading-animate 1s steps(12, end) infinite;
}
</style>

<script>
    import Vue from 'vue'

    /*需要用@scrolling 传入滚动的回调函数*/
    export default {
        components: {

        },
        props: {
            /**
             * 需要传进来的分页参数
             * 格式：{isLoading:false, maxPage:10, pageNum:1}
             * */
            page: {
                type: Object,
                required: false,
            },
            /**
             * 滚动监听的窗口
             * */
            window: {
                required: false,
                default: function () {
                    return window;
                }
            },
            /**
             *滚动监听的内容
             * */
            document: {
                required: false,
                default: function () {
                    /*return document;*/
                    return document.body;
                }
            },
            noData:{
              required: false,
              default: '已经没有更多数据'
            }
        },
      watch:{
        'page.pageNum':function (newValue) {
          if(this.page.maxPage<newValue){
            this.page.isFinished = true;
          }
        },
      },
      methods:{
        getScrollTop:function () {
          let sTop=null;
          if (document.compatMode == "BackCompat")
          {
            sTop = document.body.scrollTop;
          }
          else
          {
            sTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
          }
          return sTop;
        }
      },
        mounted: function () {
          let that=this;
            if(!this.page){
                return;
            }
            //监听滚动事件
          this.window.addEventListener('scroll', function () {
            /*如果是加载中，则返回*/
            if(this.page.isLoading || this.page.isFinished) {
              return;
            }else{
              var winTop = that.getScrollTop();//当前滚动条的高度
              var docHeight = this.document.scrollHeight;   //页面总高度
              var winHeight = this.window.innerHeight ;     //窗口高度
              /*触发高度比*/
              var  scrolltrigger = 0.98;
              /*什么时候会触发翻页*/
              if  ((winTop/(docHeight-winHeight)) > scrolltrigger) {
                /*是否加载中的标志，防止重复请求*/
                this.page.isLoading = true;
                /*如果未到最后一页*/
                if(this.page.type=='noTotal'){//如果分页对象没有total、maxPage分页数据
                  if(this.page.resultLength==this.page.pageSize){
                    /*执行回调*/
                    this.$emit('scrolling');
                    /*如果是最后一页了*/
                  }else{
                    this.page.isLoading = false;
                    this.page.isFinished = true;
                  }
                }else{
                  if(this.page.maxPage == undefined || this.page.maxPage >= this.page.pageNum){
                    /*执行回调*/
                    this.$emit('scrolling');
                    /*如果是最后一页了*/
                  }else{
                    this.page.isLoading = false;
                    this.page.isFinished = true;
                  }
                }
              }
            }
          }.bind(this));
        }
    }


</script>
