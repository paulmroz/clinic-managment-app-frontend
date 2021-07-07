<template>
  <div>
    <spinner v-if="isLoading"/>
    <div v-if="!isLoading">
      <div style="margin-top: 5px;">
        <div class="form-group">
          <label for="filter">Filtrowanie</label>
          <select class="form-control" id="filter" v-model="filter">
            <option :value="null">Wybierz...</option>
            <option value="actual">Aktualne</option>
            <option value="archived">Archiwalne</option>
          </select>
        </div>
      </div>
      <div class="d-flex flex-row-reverse">
        <div style="margin-bottom: 10px;">
          <router-link class="btn btn-primary ml-2" :to="{name: 'dashboard.visits.create'}">
            <div class="d-flex flex-row align-items-center ">
              <span>Nowa wizyta</span>
            </div>
          </router-link>
        </div>
        <table class="table table-responsive">
          <thead>
          <tr class="thead-dark">
            <th>#ID</th>
            <th>Nazwa</th>
            <th>Data</th>
            <th>Lekarz</th>
            <th>Cena(zł)</th>
            <th>Opłacona</th>
            <th>Akcje</th>
          </tr>
          </thead>
          <tbody>
          <client-visit-list-item v-for="visit of visits" :key="`client-${visit.id}`" :visit="visit"/>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import Spinner from "../../../components/shared/Spinner";
import {API_URL} from "../../../common/config";
import ClientVisitListItem from "@/pages/dashboard/client/ClientVisitListItem";

export default {
  name: "ClientVisitList",
  components: {ClientVisitListItem, Spinner},
  data() {
    return {
      isLoading: true,
      visits: [],
      filter: null,
      apiUrl: API_URL
    }
  },
  watch: {
    filter() {
      this.fetchVisits();
    }
  },
  mounted() {
    this.fetchVisits();
  },
  methods: {
    fetchVisits() {
      this.isLoading = true

      const url = this.filter ? `/clients/visits?type=${this.filter}` : '/clients/visits';

      axios
          .get(url)
          .then(response => this.visits = response.data)
          .finally(() => this.isLoading = false);
    }
  }
}
</script>

<style scoped>

</style>
