<template>
  <div class="wrapper">
    <nav class="navbar navbar-expand navbar-dark bg-dark justify-content-between">
      <div class="container">
        <div class="nav navbar-nav flex flex-column nav-item:hover">
          <router-link class="navbar-brand" :to="{name: 'dashboard'}">
            Klinika weterynaryjna
          </router-link>
          <span class="bg-success text-white p-2 rounded text-center">{{ user.email }}</span>
        </div>
        <div class="nav navbar-nav h4">
          <router-link class="nav-item nav-link" :to="{name: 'dashboard.profile'}">
            Pokaż profil
          </router-link>
          <router-link class="nav-item nav-link" :to="{name: 'dashboard.profile.edit'}">
            Edytuj profil
          </router-link>

          <a class="nav-link bg-secondary rounded-pill pl-3 pr-3" style="cursor: pointer" @click="logout()">Wyloguj</a>
        </div>
      </div>
    </nav>

    <div class="container" style="margin-top: 30px;">
      <notifications-list/>

      <div class="row">

        <div class="col-md-3">
          <left-menu/>
        </div>

        <div class="col-md-9">
          <router-view/>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {LOGOUT} from "@/store/actions.type";
import {mapGetters} from "vuex";
import LeftMenu from "../../components/shared/LeftMenu";
import NotificationsList from "../../components/shared/notifications/NotificationsList";
//import store from "../../store";

export default {
  name: "Dashboard",
  components: {NotificationsList, LeftMenu},
  computed: {
    ...mapGetters(['user','isAuthenticated','authorities']),
  },

  mounted() {
    if(!this.isAuthenticated){
      this.$router.push({name:'auth.login'})
    }

    if (this.authorities.includes("FB_USER") && !this.user.city) {
      this.$router.push({name:'auth.filldata'})
    }
  },

  // beforeRouteEnter(to, from, next) {
  //   // store.getters['isAuthenticated'] ? next() : next({name: 'auth.login'})
  //
  //   if (!store.getters["isAuthenticated"]) {
  //     next({name: 'auth.login'});
  //   }
  //
  //   if (store.getters["authorities"].includes("FB_USER")) {
  //     return next({name: 'auth.filldata'})
  //   } else {
  //     return next();
  //   }
  // },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT)
          .then(() => this.$router.push({name: 'auth.login'}));
    }
  }
}
</script>

<style scoped>
</style>