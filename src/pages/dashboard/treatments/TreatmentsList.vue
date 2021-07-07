<template>
  <div>
    <spinner v-if="isLoading"/>
    <div v-if="!isLoading" class="d-flex flex-row-reverse">
      <div class="mt-1">
        <router-link class="btn btn-primary" :to="{name: 'dashboard.treatments.create'}">
          <div class="d-flex flex-row align-items-center">
            <b>&plus;</b>
            <span>Nowy zabieg</span>
          </div>
        </router-link>
      </div>
      <table class="table table-responsive">
        <thead>
        <tr class="thead-dark">
          <th>#ID</th>
          <th>Nazwa</th>
          <th>Cena(zł)</th>
          <th>Akcje</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="treatment of treatments" :key="`treatment-${treatment.id}`">
          <td>{{ treatment.id }}</td>
          <td>{{ treatment.name }}</td>
          <td>{{ treatment.cost}}</td>
          <td>
            <router-link :to="{name: 'dashboard.treatments.edit', params: {id: treatment.id}}"
                         class="btn btn-warning">
              Edytuj
            </router-link>
            <button type="button" class="btn btn-danger ml-2" @click="deleteTreatment(treatment)">Usuń</button>
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
  name: "TreatmentsList",
  components: {Spinner},
  data() {
    return {
      isLoading: true,
      treatments: []
    }
  },
  mounted() {
    this.fetchTreatments();
  },
  methods: {
    deleteTreatment(treatment) {
      if (!confirm("Na pewno usunąć tą  usługę?")) {
        return;
      }
      axios.delete(`/treatments/${treatment.id}`)
          .then(() => this.$store.commit(NOTIFICATIONS_PUSH, {
            type: 'success',
            message: 'Pomyślnie usunięto opcję'
          }))
          .finally(this.fetchTreatments);
    },
    fetchTreatments() {
      this.isLoading = true;
      axios.get('/treatments')
          .then(response => this.treatments = response.data)
          .finally(() => this.isLoading = false)
    }
  }
}
</script>

<style scoped>
</style>