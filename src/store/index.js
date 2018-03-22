import Vue from 'vue';
import Vuex from 'vuex';
import * as auth from './modules/auth';

Vue.use(Vuex);

const modules = {
    auth
};

export default new Vuex.Store({
    state: {
        modalIsActive: false
    },
    getters: {
        modal: state => state.modalIsActive
    },
    mutations: {
        'SET_MODAL_STATE'(state, bool) {
            state.modalIsActive = bool;
        }
    },
    actions: {
        setModal({commit}, payload) {
            commit('SET_MODAL_STATE', payload);
        }
    },
    modules
})