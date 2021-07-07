<template>
  <div>
    <spinner v-if="isLoading"/>
    <div v-else>
      <h3>Edytuj użytkownika</h3>
      <user-form @formSubmitted="saveUser" :user="{...user,...user.user,type:'client'}"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Spinner from "../../../components/shared/Spinner";
import UserForm from "../../../components/users/UserForm";
import {NOTIFICATIONS_PUSH} from "@/store/mutations.type";


export default {
  name: "ClientEdit",
  components: {UserForm, Spinner},
  data() {
    return {
      isLoading: true,
      user: null
    }
  },
  mounted() {
    axios.get(`/clients/${this.$route.params.id}`)
        .then(response => {
          this.user = response.data;
          if (this.user.user.roles.includes('ROLE_CLIENT')) {
            this.user.type = 'client';
            if (this.user.user.client) {
              this.user.bornAt = this.user.client.bornAt;
            }
          }
        })
        .finally(() => this.isLoading = false);
  },
  methods: {
    saveUser(user) {
      axios.put(`/users/${user.id}`, user)
          .then(() => {
            this.$store.commit(NOTIFICATIONS_PUSH, {type: 'success', message: 'Poprawnie edytowano użytkownika'})
            this.$router.push({name: 'dashboard.clients.list'})
          })
          .catch(() => this.$store.commit(NOTIFICATIONS_PUSH, {type: 'danger', message: 'Użytkownik z podanym emailem istnieje'}))
          .finally(() => this.isLoading = false);
    }
  }
}
</script>

<style scoped>
</style>