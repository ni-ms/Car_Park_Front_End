import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        username: "",
        admin: "",
        currentuser: '',

    },
    mutations: {
        adduser(state, cuser) {
            state.username = cuser;

        },
        addcurrentuserid(state, cuserid) {
            state.currentuser = cuserid;
        },
        addadmin(state, cadmin) {
            state.admin = cadmin;

        }


    },
    actions: {},
    modules: {}
})