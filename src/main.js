import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import '@/assets/iconfont.css'
import '@/assets/styles/main.scss'
import axios from 'axios'
import 'babel-polyfill'
import store from './vuex/store'
// import VideoPlayer from 'vue-video-player'
// require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')
// Vue.use(VideoPlayer)
Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.withCredentials = true;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
})