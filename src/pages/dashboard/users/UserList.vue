<template>
  <div c>
    <spinner v-if="isLoading"/>
    <div v-if="!isLoading" class="d-flex flex-row-reverse">
      <div style="margin-bottom: 10px;">
        <router-link class="btn btn-primary float-right" :to="{name: 'dashboard.users.create'}">
          <div class="d-flex flex-row align-items-center">
            <b>&plus;</b>
            <span>Nowy Użytkownik</span>
          </div>
        </router-link>
      </div>
      <table class="table table-responsive table-hover">
        <thead>
        <tr class="thead-dark">
          <th>#ID</th>
          <th>Email</th>
          <th>Imie</th>
          <th>Nazwisko</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user of users" :key="`user-${user.id}`">
          <td scope="row">#{{ user.id }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td style="display: flex;flex-direction: row">
            <router-link :to="{name: 'dashboard.users.preview', params: {id: user.id}}"
                         class="btn btn-primary mr-1">
              Podgląd
            </router-link>
            <router-link :to="{name: 'dashboard.users.edit', params: {id: user.id}}"
                         class="btn btn-primary mr-1">
              Edytuj
            </router-link>
            <button type="button" class="btn btn-primary" @click="deleteUser(user)">Usuń</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Spinner from "../../../components/shared/Spinner";
import {NOTIFICATIONS_PUSH} from "@/store/mutations.type";
export default {
  name: "UserList",
  components: {Spinner},
  data() {
    return {
      isLoading: true,
      users: []
    }
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    deleteUser(user) {
      if (!confirm("Na pewno usunąć użytkownika?")) {
        return;
      }
      axios.delete(`/users/${user.id}`)
          .then(() => this.$store.commit(NOTIFICATIONS_PUSH, {
            type: 'success',
            message: 'Pomyślnie usunięto użytkownika'
          }))
          .finally(this.fetchUsers);
    },
    fetchUsers() {
      this.isLoading = true;
      axios.get('/users')
          .then(response => this.users = response.data)
          .finally(() => this.isLoading = false)
    }
  }
}
</script>

<style scoped>
</style>