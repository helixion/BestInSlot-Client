import axios from 'axios';

'use strict';

// axios.interceptors.response.use(res => {
//     return res;
// }, 
// err => {
//     let originalRequest = err.config;
//     let currentToken = localStorage.getItem('bis_access_token');
//     if (err.response.status === 401 && err.config && !err.config._retry && currentToken) {
//         actions.invalidate();
//         return axios.post('/refreshToken')
//             .then(res => {
//                 actions.authenticate(res.data['access_token']);
//                 err.config._retry = true;
//                 return axios(err.config);
//             })
//             .catch(e => {
//                 console.log(e);
//                 throw e;
//             })
//     }
//     throw err;
// })

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('bis_access_token');

export const state = {
    isAuthenticated: null,
    currentUser: null
}

export const getters = {
    isAuthenticated: state => state.isAuthenticated,
    currentUser: state => state.currentUser
}

export const mutations = {
    SET_AUTHENTICATION(state, bool) {
        state.isAuthenticated = bool;
    },

    SET_CURRENT_USER(state, user) {
        state.currentUser = user;
    }
}

export const actions = {
     authenticate({dispatch, commit}, {email, password}) {
        dispatch('toggleSending', true); 
        return axios.post('/users/login', { email, password })
        .then(res => {
           if (res.status >= 200 && res.status < 300) {
               const token = res.data['access_token'];
               localStorage.setItem('bis_access_token', token);
               axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
               dispatch('setAuthentication', true);
               dispatch('setCurrentUser');
           }
            
        })
    },

    invalidate({dispatch, commit}) {
        if (localStorage.getItem('bis_access_token')) {
            localStorage.removeItem('bis_access_token');
            dispatch('setAuthentication', false);
        }
        if (state.currentUser) {
            commit('SET_CURRENT_USER', null);
        }
        axios.defaults.headers.common['Authorization'] = '';
    },

    setAuthentication({commit}, bool) {
        commit('SET_AUTHENTICATION', bool)
    },

    setCurrentUser({state, commit, dispatch}, payload) {
        axios.get('/users')
            .then(res => {
                if (res.status >= 200 && res.status < 400) {
                    commit('SET_CURRENT_USER', res.data.user);
                }
            })
            .catch(e => {
                if (e.response) {
                    const status = e.response.status === 401;
                    const expired = e.response.data.token_expired;
                    if (status && expired) {
                        if (state.isAuthenticated) {
                            dispatch('invalidate');
                        }
                    } else {
                        Object.keys(e.response)
                            .forEach(err => console.log(err + ': ' + e.response[err]));
                    }
                }
                console.log(e.config);
            })
        
    }
}



// export default {
//     state,
//     mutations,
//     actions
// }