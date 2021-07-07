import {CHECK_AUTH, LOGIN, LOGOUT} from "../actions.type";
import authService from "../../services/auth.service";
import {NOTIFICATIONS_PUSH, PURGE_AUTH, SET_AUTH} from "../mutations.type";

const authModule = {
  state: {
    user:null,
    isReady:false,
  },
  getters: {
    user(state){
      return state.user;
    },

    isReady(state){
      return state.isReady;
    },
    email(state) {
      return state.user?.email;
    },
    isAuthenticated(state) {
      return !!state.user;
    },
    authorities(state) {
      if(state.user == null){
        return [];
      }

      return state.user.roles.split(",");
    }
  },
  actions: {
    [LOGIN](context, credentials) {
      return authService.login(credentials.email, credentials.password)
        .then(response =>{
          console.log(response)
          context.commit(SET_AUTH, {
            user:response.data,
          })
        })
        .catch(() => context.commit(NOTIFICATIONS_PUSH, {type: 'danger', message: 'Niepoprawne dane'}))
    },

    [CHECK_AUTH](context) {
      return authService.check()
        .then(response => {
          console.log(response)
          context.commit(SET_AUTH, {
            user:response.data,
          })
        })
        .catch(() => {
          context.commit(PURGE_AUTH)
        });
    },
    [LOGOUT](context) {
      return authService.logout()
        .then(() => context.commit(PURGE_AUTH))
    }
  },
  mutations: {
    [SET_AUTH](state, {user}) {
      state.user = user;
      state.isReady = true;
    },
    [PURGE_AUTH](state) {
      state.user = null;
      state.isReady = true;
    }
  },
};

export default authModule;

