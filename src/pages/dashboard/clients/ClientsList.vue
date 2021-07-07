<template>
  <div>
    <spinner v-if="isLoading"/>
    <div v-if="!isLoading" class="d-flex flex-row-reverse">
      <div style="margin-bottom: 10px;">
        <router-link class="btn btn-primary" v-if="!isDoctor" :to="{name: 'dashboard.clients.create'}">
          <div class="d-flex flex-row align-items-center">
            <b>&plus;</b>
            <span>Nowy Klient</span>
          </div>
        </router-link>
      </div>
      <table class="table table-responsive">
        <thead>
        <tr class="thead-dark">
          <th>#ID</th>
          <th>Imie</th>
          <th>Nazwisko</th>
          <th>Data urodzenia</th>
          <th>Akcje</th>
        </tr>
        </thead>
        <tbody>
        <client-list-item v-for="client of clients" :key="`client-${client.id}`" :client="client"/>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import Spinner from "../../../components/shared/Spinner";
import {mapGetters} from "vuex";
import ClientListItem from "@/pages/dashboard/clients/ClientListItem";

export default {
  name: "ClientList",
  components: {ClientListItem,Spinner},
  data() {
    return {
      isLoading: true,
      clients: []
    }
  },
  mounted() {
    this.isLoading = true

    axios
        .get('clients')
        .then(response => this.clients = response.data)
        .finally(() => this.isLoading = false);
  },
  computed: {
    ...mapGetters(['authorities']),
    isDoctor() {
      return this.authorities.includes('ROLE_DOCTOR')
    }
  },
}
</script>

<style scoped>

</style>