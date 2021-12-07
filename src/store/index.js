import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        username: "",
        admin: "",

    },
    mutations: {
        adduser(state, cuser) {
            state.username = cuser;
        },
        addadmin(state, cadmin) {
            state.admin = cadmin;

        }


    },
    actions: {},
    modules: {}
})