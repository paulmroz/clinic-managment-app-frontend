<template>
  <div>
    <spinner v-if="isLoading"/>
    <div v-if="!isLoading" class="d-flex flex-row-reverse">
      <div style="margin-bottom: 10px;">
        <router-link class="btn btn-primary ml-3" :to="{name: 'dashboard.visits.create'}">
          <div class="d-flex flex-row align-items-center ">
            <b>&plus;</b>
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
          <th>Klient</th>
          <th>Lekarz</th>
          <th>Akcje</th>
        </tr>
        </thead>
        <tbody>
        <visit-list-item v-for="visit of visits" :key="`client-${visit.id}`" :visit="visit"/>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import Spinner from "../../../components/shared/Spinner";
import VisitListItem from "@/pages/dashboard/visits/VisitListItem";
export default {
  name: "VisitList",
  components: {VisitListItem, Spinner},
  data() {
    return {
      isLoading: true,
      visits: []
    }
  },
  mounted() {
    this.isLoading = true
    axios
        .get('visits')
        .then(response => this.visits = response.data)
        .finally(() => this.isLoading = false);
  }
}
</script>

<style scoped>
</style>