/**
 * Created by Administrator on 2016/9/28 0028.
 */

/**
 * vue所需要的directives都放在这里
 * */
import Vue from 'vue'

/*输入框聚焦*/
Vue.directive('cmFocus', {
  bind: function (el) {
 /*   el.onfocus=()=>{
      let target=document.getElementsByClassName('cm-bottom-fixed')[0];
      target.classList.add('disabled');
    };*/
    el.onblur=()=>{
   /*   let target=document.getElementsByClassName('cm-bottom-fixed')[0];
      target.className=target.className.replace( new RegExp( "(\\s|^)" + 'disabled' + "(\\s|$)" ), " " );*/
        alert(233);
    };
  }
});

