import Vue from 'vue'
import App from './App.vue'
import Contadores from './Contadores.vue'

Vue.config.productionTip = false

// Registro do componente 'Contadores' de forma global
// Assim, posos usá-lo em App.vue ou em qualuqer lugar
Vue.component('app-contadores', Contadores)

new Vue({
  render: h => h(App),
}).$mount('#app')
