<template>
  <div>
    <spinner v-if="isLoading"/>
    <div v-if="!isLoading" >
      <h3>Dane Konta:</h3>
      <user-details :user="user"/>
      <router-link class="btn btn-info float-right" :to="{name: 'dashboard.profile.edit'}">Edytuj Profil</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Spinner from "../../components/shared/Spinner";
import UserDetails from "../../components/shared/UserDetails";
export default {
  name: "Profile",
  components: {UserDetails, Spinner},
  data() {
    return {
      user: null,
      isLoading: true
    }
  },
  mounted() {
    this.isLoading = true;
    axios
        .get('user/current')
        .then(response => this.user = response.data)
        .finally(() => this.isLoading = false)
  }
}
</script>

<style scoped>
</style>