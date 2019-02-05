import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  // E vez de usar o $mount, podemos usar da forma que faziamos
  // el: "#app", que funcionaria da mesma forma
  render: h => h(App),
}).$mount('#app')
