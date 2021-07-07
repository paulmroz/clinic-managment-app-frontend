<template>
  <div>
    <spinner v-if="isLoading"/>
    <div v-if="!isLoading">
      <div style="margin-top: 20px;">
        <div class="form-group">
          <label for="filter">Filtrowanie</label>
          <select class="form-control" id="filter" v-model="filter">
            <option :value="null">Wybierz...</option>
            <option value="actual">Aktualne</option>
            <option value="archived">Archiwalne</option>
          </select>
        </div>
      </div>
      <table class="table table-responsive">
        <thead>
        <tr class="thead-dark">
          <th>#ID</th>
          <th>Nazwa</th>
          <th>Data</th>
          <th>Klient</th>
          <th>Akcje</th>
        </tr>
        </thead>
        <tbody>
        <doctor-visit-list-item v-for="visit of visits" :key="`client-${visit.id}`" :visit="visit"/>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import Spinner from "../../../components/shared/Spinner";
import DoctorVisitListItem from "@/pages/dashboard/doctor/DoctorVisitListItem";

export default {
  name: "DoctorVisitsList",
  components: {DoctorVisitListItem,Spinner},
  data() {
    return {
      isLoading: true,
      visits: [],
      filter: null
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

      const url = this.filter ? `/doctor/visits?type=${this.filter}` : '/doctor/visits';

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

