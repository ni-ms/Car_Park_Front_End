import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import LoadScript from 'vue-plugin-load-script'

import Vuex from 'vuex'

Vue.use(Vuex)





Vue.use(LoadScript);
Vue.config.productionTip = false

new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')