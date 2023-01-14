import Vue from 'vue'
import App from './App.vue'

import myCore from './core/myCore';
import axios from 'axios';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.baseURL = 'https://cors-anywhere.herokuapp.com/'+ process.env.VUE_APP_API_BINANCE;
Vue.use(myCore);
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
