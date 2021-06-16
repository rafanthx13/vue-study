import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';

import './plugins/bootstrap-vue';

import './plugins/axios'; // vai ler p arquivo e registrar o prototype

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
