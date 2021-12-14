import Vue from "vue";
import App from "./App.vue";
import Cloudbase from "@cloudbase/vue-provider";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './router'

import auths from './assets/auth'

Vue.use(auths);// 注册使用 auth 插件
Vue.use(ElementUI);

// 注意更新此处的TCB_ENV_ID为你自己的环境ID
window._tcbEnv = window._tcbEnv || {TCB_ENV_ID:"hello-cloudbase-test"};

export const envId = window._tcbEnv.TCB_ENV_ID;
export const region = window._tcbEnv.TCB_REGION;



Vue.config.productionTip = false;

Vue.use(Cloudbase, {
  env: 'mycloud-1g1jv3t870135c18',
  region: 'ap-shanghai'
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
