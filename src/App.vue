<template>
  <div id="app" class="bg-light mx-auto">
    <router-view v-if="isReady"/>
  </div>
</template>

<script>

//import authService from "./services/auth.service";
import {mapGetters} from "vuex";
import {CHECK_AUTH} from "@/store/actions.type";

export default {
  name: 'App',
  components: {},
  mounted() {
    this.$store.dispatch(CHECK_AUTH);
  },

  computed:{
    ...mapGetters(['isReady'])
  }
}
</script>

<style lang="sass">
  body, html
    height: 100%
    width: 100%

  body
    display: flex
    align-items: center
    justify-content: center

  #app
    width: 100%
    height: 100%
</style>
