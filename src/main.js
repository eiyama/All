import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store/store'
import Verify from './common/verify' /* 校验文件 */
import Common from './common/common' /* 公共函数 */
import Vant from 'vant'
import MintUI from 'mint-ui'
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vant/lib/index.css'
import { Select, Option,Cascader,Row, Col  } from 'element-ui';
import 'mint-ui/lib/style.css'
import axios from './http.js'
import './assets/css/theme.scss' /*主题css*/
// import './assets/js/jquery.js' /* jQuery库文件 */
import './assets/js/jquery-1.10.2.min.js'
import "./assets/js/rem.js";
import '@vant/touch-emulator';
import { Lazyload } from 'vant';
// import BScroll from 'better-scroll'

// import echarts from 'echarts'
import vueTabbarSlide from 'vue-tabbar-slide';
// import ImgInputer from 'vue-img-inputer'
// import 'vue-img-inputer/dist/index.css'
// import vueSignature from "vue-signature"
// Vue.use(vueSignature)
// import 'signalr'
// import Viewer from 'v-viewer'//放大查看图片
// import 'viewerjs/dist/viewer.css'
// Vue.use(Viewer);
// Viewer.setDefaults({
//   Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
// });

// Vue.component('ImgInputer', ImgInputer)
// Vue.prototype.$echarts = echarts
Vue.use(vueTabbarSlide)
Vue.use(Select)
Vue.use(Cascader);
Vue.use(Option);
Vue.use(Row);
Vue.use(Col);

Vue.use(MintUI)
Vue.use(Vant)
// Vue.use(ElementUI)
Vue.use(Lazyload);


Vue.config.productionTip = false
Vue.prototype.Verify = Verify
Vue.prototype.Common = Common
Vue.prototype.$axios = axios
Vue.prototype.$event = new Vue();
Vue.prototype.center = new Vue({})
/* 数组去重 */
Array.prototype.unique = function() {
  var res = [this[0]];
  for (var i = 1; i < this.length; i++) {
    var repeat = false;
    for (var j = 0; j < res.length; j++) {
      if (this[i] == res[j]) {
        repeat = true;
        break;
      }
    }
    if (!repeat) {
      res.push(this[i]);
    }
  }
  return res;
}



new Vue({
  el: '#app',
  router,
  axios,
  store,
  template: '<App/>',
  components: { App },
  data: {
    eventHub: new Vue()
  }
})
