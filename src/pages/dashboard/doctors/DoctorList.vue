<template>
  <div>
    <spinner v-if="isLoading"/>
    <div v-if="!isLoading">
      <table class="table table-responsive">
        <thead>
        <tr class="thead-dark">
          <th>#ID</th>
          <th>Imie</th>
          <th>Nazwisko</th>
          <th>Numer telefonu</th>
          <th>Specjalizacja</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="doctor of doctors" :key="`doctor-${doctor.id}`">
          <td>{{ doctor.id }}</td>
          <td>{{doctor.user.firstName}}</td>
          <td>{{doctor.user.lastName}}</td>
          <td>{{doctor.user.phoneNumber}}</td>
          <td>{{doctor.specialization }}</td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import Spinner from "../../../components/shared/Spinner";

export default {
  name: "DoctorList",
  components: {Spinner},
  data() {
    return {
      isLoading: true,
      doctors: []
    }
  },
  mounted() {
    this.fetchDoctors();
  },
  methods: {
    fetchDoctors() {
      this.isLoading = true;
      axios.get('/doctors')
          .then(response => this.doctors = response.data)
          .finally(() => this.isLoading = false)
    }
  }
}
</script>

<style scoped>

</style>