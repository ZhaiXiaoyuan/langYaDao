<template>
    <div class="voice-switch">
        <span class="field">音效</span>
        <el-switch
            v-model="voiceFlag"
            active-color="#469ae1"
            @change="change"
        >
        </el-switch>
    </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
    .voice-switch{
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 2;
        top:0px;
        bottom: 0px;
        margin: auto;
        right: 20px;
        font-family: 'hytangmeiren';
        background: rgba(255,255,255,0.8);
        height: 30px;
        padding: 0px 10px;
        border-radius: 15px;
        .field{
            position: relative;
            top:-2px;
            color: #469ae1;
            font-size: 16px;
            padding-right: 5px;
        }
    }
</style>
<script>
  import Vue from 'vue'
  import bus from './common/bus';
  export default {
    components: {

    },
    props:{
      options:{
          type:Object,
      }
    },
    data: function () {
      return {
          voiceFlag:false,
      }
    },
    computed: {},
    watch: {

    },
    methods: {
        change:function () {
            localStorage.setItem('voiceFlag',this.voiceFlag);
            console.log('this.voiceFlag:',this.voiceFlag);
            bus.$emit('refreshVoiceFlag');
        },
    },
    created: function () {

    },
    mounted: function () {
        //
        this.voiceFlag=this.getVoiceFlag();

    }
  };
</script>
