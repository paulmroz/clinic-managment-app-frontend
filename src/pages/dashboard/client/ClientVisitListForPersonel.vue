<template>
  <div>
    <spinner v-if="isLoading"/>
    <div v-if="!isLoading">
      <!--      <div style="margin-top: 20px;">-->
      <!--        <div class="form-group">-->
      <!--          <label for="filter">Filtrowanie</label>-->
      <!--          <select class="form-control" id="filter" v-model="filter">-->
      <!--            <option :value="null">Wybierz...</option>-->
      <!--            <option value="actual">Aktualne</option>-->
      <!--            <option value="archived">Archiwalne</option>-->
      <!--          </select>-->
      <!--        </div>-->
      <!--      </div>-->
      <table class="table table-responsive">
        <thead>
        <tr class="thead-dark">
          <th>#ID</th>
          <th>Nazwa</th>
          <th>Data</th>
          <th>Doktor</th>
          <th>Szczegóły</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="visit of visits" :key="`client-${visit.id}`">
          <td>{{ visit.id }}</td>
          <td>{{ visit.name }}</td>
          <td>{{ visit.scheduledFor }}</td>
          <td>{{ visit.doctor.user.firstName }} {{ visit.doctor.user.lastName }}</td>
          <td>{{ visit.details }}</td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import Spinner from "../../../components/shared/Spinner";
import {API_URL} from "../../../common/config";

export default {
  name: "ClientVisitListForPersonel",
  components: {Spinner},
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

      const url = `/visits/client/${this.$route.params.id}`
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
