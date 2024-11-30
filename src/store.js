import { createStore } from 'vuex';

const store = createStore({
    state: {
        logged: false,
        rootURL: "http://localhost:8080",
        baseURL: "http://localhost:8080/api/v1",
        uploadURL: "http://localhost:8080/upload",
        user: null
    },
    mutations: {
        setLogged(state, newValue) {
            state.logged = newValue;
        },
        setUser(state, newValue) {
            state.user = newValue;
        }
    },
    actions: {
        setLoggedAction({ commit }, newValue ) {
            commit('setLogged', newValue);
        },
        setUserAction({ commit }, newValue ) {
            commit('setUser', newValue);
        }
    },
    getters: {
        getLogged: state => state.logged,
        getBaseURL: state => state.baseURL,
        getUploadURL: state => state.uploadURL,
        getRootURL: state => state.rootURL,
        getUser: state => state.user
    }
});

export default store;